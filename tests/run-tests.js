/* DigiPath platform jsdom harness. Run: node tests/run-tests.js */
const fs = require('fs');
const path = require('path');
const { JSDOM, requestInterceptor } = require('jsdom');

const html = fs.readFileSync(path.join(__dirname, '..', 'learn.html'), 'utf8');
const pageUrl = 'https://digipath-website.vercel.app/learn.html';
const localResources = {
  interceptors: [
    requestInterceptor((request) => {
      try {
        const u = new URL(request.url);
        if (u.hostname === 'digipath-website.vercel.app') {
          const file = path.join(__dirname, '..', decodeURIComponent(u.pathname));
          if (fs.existsSync(file)) return new Response(fs.readFileSync(file), { headers: { 'Content-Type': u.pathname.endsWith('.js') ? 'text/javascript' : 'text/html' } });
        }
      } catch (e) { /* fall through */ }
      return new Response('', { headers: { 'Content-Type': 'text/plain' } });
    })
  ]
};

let pass = 0, fail = 0;
const failures = [];
function assert(name, cond, extra) {
  if (cond) { pass++; console.log('  PASS ' + name); }
  else { fail++; failures.push(name); console.log('  FAIL ' + name + (extra ? ' :: ' + extra : '')); }
}
function submit(window, form) { form.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true })); }
function click(el) { el.dispatchEvent(new (el.ownerDocument.defaultView).MouseEvent('click', { bubbles: true, cancelable: true })); }

async function loadPage(snapshot) {
  const dom = new JSDOM(html, {
    url: pageUrl, runScripts: 'dangerously', resources: localResources, pretendToBeVisual: true,
    beforeParse(window) {
      if (snapshot) for (const k of Object.keys(snapshot)) window.localStorage.setItem(k, snapshot[k]);
    }
  });
  const start = Date.now();
  while (Date.now() - start < 15000) {
    if (dom.window.DigiPathApp && dom.window.document.querySelector('.course-card')) break;
    await new Promise(r => setTimeout(r, 100));
  }
  if (!dom.window.DigiPathApp) throw new Error('DigiPathApp did not initialise');
  return dom;
}
function snapshotOf(window) {
  const out = {};
  for (let i = 0; i < window.localStorage.length; i++) { const k = window.localStorage.key(i); out[k] = window.localStorage.getItem(k); }
  return out;
}

(async () => {
  console.log('— Window 1: catalog, auth, enroll, lesson, quiz, mentor, supporter, admin —');
  let dom = await loadPage();
  let { window } = dom;
  let doc = window.document;
  let app = window.DigiPathApp;

  // 1. Catalog
  const cards = doc.querySelectorAll('.course-card');
  assert('catalog renders >=15 courses', cards.length >= 15, 'got ' + cards.length);
  const tracks = new Set([...cards].map(c => c.getAttribute('data-track')));
  assert('catalog covers all 5 tracks', ['Conversational English', 'Basic Math', 'Digital Literacy', 'Financial Literacy', 'Health Literacy'].every(t => tracks.has(t)), [...tracks].join(','));
  const courses = app.getCourses();
  assert('every course has >=4 lessons', courses.every(c => c.lessons.length >= 4));
  assert('every course quiz has >=5 questions', courses.every(c => c.quiz.length >= 5));
  assert('every lesson has real content + steps', courses.every(c => c.lessons.every(l => l.body.length > 150 && l.steps.length >= 3)));

  // 2. Guest enroll prompts login
  click(doc.querySelector('.enroll-btn'));
  assert('guest enroll prompts login (auth view shown)', !doc.getElementById('view-auth').hidden);

  // 3. Register
  doc.getElementById('register-name').value = 'Test Learner';
  doc.getElementById('register-email').value = 'test.learner@example.com';
  doc.getElementById('register-password').value = 'testpass1';
  submit(window, doc.getElementById('register-form'));
  assert('register creates session', !!app.currentUser() && app.currentUser().email === 'test.learner@example.com');
  assert('namespaced storage keys used', !!window.localStorage.getItem('digipath_auth_v1') && !!window.localStorage.getItem('digipath_state_v1'));

  // 4. Enroll -> dashboard
  app.showView('catalog');
  const firstId = courses[0].id;
  click(doc.querySelector('.enroll-btn[data-id="' + firstId + '"]'));
  app.showView('dashboard');
  assert('enrolled course appears in dashboard', doc.querySelectorAll('.dash-course').length === 1 && doc.getElementById('my-courses').textContent.includes(courses[0].title));

  // 5. Lesson complete -> progress increases
  app.openCourse(firstId);
  click(doc.querySelector('.lesson-btn[data-idx="0"]'));
  assert('lesson view shows content', doc.getElementById('lesson-title').textContent.length > 3 && doc.getElementById('lesson-body').textContent.length > 150);
  click(doc.getElementById('mark-complete-btn'));
  const pct1 = app.progressFor(app.currentUser().email, app.getCourse(firstId));
  assert('mark complete increases progress %', pct1 > 0, 'pct=' + pct1);
  app.showView('dashboard');
  assert('dashboard shows progress %', doc.querySelector('.dash-progress').textContent.includes(pct1 + '%'));

  // 6. Quiz: all correct = 100, stored; some wrong scores lower, stored
  app.openQuiz(firstId);
  const course = app.getCourse(firstId);
  course.quiz.forEach((q, i) => { doc.querySelector('input[name="q' + i + '"][value="' + q.answer + '"]').checked = true; });
  submit(window, doc.getElementById('quiz-form'));
  assert('all-correct quiz = 100%', doc.getElementById('quiz-score').textContent.includes('100%'), doc.getElementById('quiz-score').textContent);
  let results = app.getState().quizResults.filter(r => r.email === 'test.learner@example.com');
  assert('quiz result stored in history', results.length === 1 && results[0].pct === 100);
  app.openQuiz(firstId);
  course.quiz.forEach((q, i) => { const wrong = (q.answer + 1) % q.options.length; doc.querySelector('input[name="q' + i + '"][value="' + wrong + '"]').checked = true; });
  submit(window, doc.getElementById('quiz-form'));
  assert('all-wrong quiz scores lower than 100', doc.getElementById('quiz-score').textContent.includes('0%'), doc.getElementById('quiz-score').textContent);
  results = app.getState().quizResults.filter(r => r.email === 'test.learner@example.com');
  assert('second quiz result stored', results.length === 2 && results[1].pct === 0);

  // 7. Mentor message stored + inbox thread with reply
  app.showView('mentors');
  doc.getElementById('mentor-select').value = app.MENTORS[0].id;
  doc.getElementById('mentor-message').value = 'I finished lesson 1. What should I practise next?';
  submit(window, doc.getElementById('mentor-form'));
  const msgs = app.getState().mentorMessages.filter(m => m.email === 'test.learner@example.com');
  assert('mentor message stored', msgs.length === 1 && msgs[0].text.includes('lesson 1'));
  app.showView('dashboard');
  assert('mentor inbox shows message + seeded reply', doc.getElementById('mentor-inbox').textContent.includes('What should I practise next') && doc.getElementById('mentor-inbox').textContent.includes('replied'));

  // 8. Chatbot FAQ + fallback
  assert('chatbot answers cost question with free-forever', app.chatAnswer('How much does it cost?').includes('FREE forever'));
  assert('chatbot graceful fallback', app.chatAnswer('zzzqqq nonsense').includes('I can answer questions about'));

  // 9. Logout + login (demo account)
  click(doc.getElementById('logout-btn'));
  assert('logout clears session', !app.currentUser());
  doc.getElementById('login-email').value = 'demo@digipath.learn';
  doc.getElementById('login-password').value = 'demo1234';
  submit(window, doc.getElementById('login-form'));
  assert('demo login works', !!app.currentUser() && app.currentUser().email === 'demo@digipath.learn');
  assert('demo credentials shown on login view', doc.getElementById('view-auth').textContent.includes('demo@digipath.learn'));

  // 10. Supporter checkout flips account
  app.showView('supporter');
  click(doc.querySelector('.supporter-plan-btn[data-plan="Supporter"]'));
  assert('checkout view opens with demo label', !doc.getElementById('view-checkout').hidden && doc.getElementById('view-checkout').textContent.includes('Demo checkout: no real payment'));
  doc.getElementById('checkout-name').value = 'Demo Student';
  doc.getElementById('checkout-card').value = '4242 4242 4242 4242';
  submit(window, doc.getElementById('checkout-form'));
  const demoUser = app.getAuth().users.find(u => u.email === 'demo@digipath.learn');
  assert('checkout flips account to Supporter', demoUser.supporter === true && demoUser.plan === 'Supporter');
  assert('checkout success shown', !doc.getElementById('checkout-success').hidden);
  app.showView('dashboard');
  assert('supporter badge on dashboard', !!doc.getElementById('supporter-badge'));

  // 11. Certificate at 100%
  const certCourse = app.getCourse('eng-everyday');
  app.enrollIn('eng-everyday');
  certCourse.lessons.forEach((l, i) => app.completeLesson('eng-everyday', i));
  assert('progress reaches 100%', app.progressFor(app.currentUser().email, certCourse) === 100);
  app.showView('dashboard');
  assert('certificate button appears at 100%', !!doc.querySelector('.cert-btn'));
  click(doc.querySelector('.cert-btn'));
  assert('certificate view names learner + course', doc.getElementById('certificate-area').textContent.includes('Demo Student') && doc.getElementById('certificate-area').textContent.includes('Everyday Conversations'));

  // Snapshot for reload test
  const snap = snapshotOf(window);
  window.close();

  console.log('— Window 2: simulated reload — persistence —');
  dom = await loadPage(snap); window = dom.window; doc = window.document; app = window.DigiPathApp;
  doc.getElementById('login-email').value = 'test.learner@example.com';
  doc.getElementById('login-password').value = 'testpass1';
  submit(window, doc.getElementById('login-form'));
  assert('after reload, login restores account', !!app.currentUser());
  const afterPct = app.progressFor(app.currentUser().email, app.getCourse(firstId));
  assert('progress persists across simulated reload', afterPct === pct1, pct1 + ' vs ' + afterPct);
  app.showView('dashboard');
  assert('quiz history persists across reload', doc.getElementById('quiz-history').textContent.includes('100%'));
  window.close();

  console.log('— Window 3: admin —');
  dom = await loadPage(); window = dom.window; doc = window.document; app = window.DigiPathApp;
  doc.getElementById('login-email').value = 'admin@digipath.learn';
  doc.getElementById('login-password').value = 'admin1234';
  submit(window, doc.getElementById('login-form'));
  assert('admin demo login works', app.isAdmin());
  app.showView('admin');
  assert('admin stats render', !!doc.getElementById('admin-stats') && !!doc.getElementById('admin-enrollments'));
  assert('admin enrollment list has seeded rows', doc.getElementById('admin-enrollments').textContent.includes('asha.k@example.org'));
  doc.getElementById('admin-title').value = 'Spoken Telugu Basics';
  doc.getElementById('admin-track').value = 'Conversational English';
  doc.getElementById('admin-level').value = 'Beginner';
  doc.getElementById('admin-duration').value = '2 weeks';
  doc.getElementById('admin-desc').value = 'A test course added by admin CRUD.';
  submit(window, doc.getElementById('admin-course-form'));
  assert('admin-added course in course list', app.getCourses().some(c => c.title === 'Spoken Telugu Basics'));
  app.showView('catalog');
  assert('admin-added course appears in catalog', [...doc.querySelectorAll('.course-card')].some(c => c.textContent.includes('Spoken Telugu Basics')));
  const added = app.getCourses().find(c => c.title === 'Spoken Telugu Basics');
  app.adminDeleteCourse(added.id);
  assert('admin delete removes course', !app.getCourses().some(c => c.id === added.id));
  window.close();

  console.log('\nTOTAL: ' + pass + ' passed, ' + fail + ' failed');
  if (failures.length) console.log('Failures: ' + failures.join(' | '));
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('HARNESS ERROR', e); process.exit(2); });
