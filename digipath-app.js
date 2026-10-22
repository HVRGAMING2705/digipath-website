/* DigiPath Learning Platform — demo-grade, all client-side.
   Storage: digipath_auth_v1 (accounts/session), digipath_state_v1 (learning state).
   Core learning is FREE forever. Supporter plans sponsor learners; they never gate content. */
(function () {
'use strict';
var AUTH_KEY = 'digipath_auth_v1';
var STATE_KEY = 'digipath_state_v1';

function L(title, body, steps, practice) {
  return { title: title, body: body + '\n\nTry this today: ' + practice, steps: steps };
}
function Q(q, options, answer) { return { q: q, options: options, answer: answer }; }
function C(id, track, title, level, duration, desc, learn, lessons, quiz) {
  return { id: id, track: track, title: title, level: level, duration: duration, description: desc, learn: learn, lessons: lessons, quiz: quiz };
}

var TRACKS = [
  { name: 'Conversational English', blurb: 'Speak with confidence in everyday situations.' },
  { name: 'Basic Math', blurb: 'Numbers for daily life, work and exams.' },
  { name: 'Digital Literacy', blurb: 'Use phones, apps and the internet safely.' },
  { name: 'Financial Literacy', blurb: 'Budget, save, bank and borrow wisely.' },
  { name: 'Health Literacy', blurb: 'Understand everyday health, medicines and wellbeing.' }
];

var SEED_COURSES = [
/* ---------------- Conversational English ---------------- */
C('eng-everyday', 'Conversational English', 'Everyday Conversations', 'Beginner', '3 weeks',
  'Greetings, shopping, directions and small talk, the English you need from day one.',
  ['Greet people and introduce yourself', 'Ask polite questions', 'Shop and bargain in English', 'Talk about your day and family'],
  [
    L('Greetings and introductions', 'A good conversation starts with a warm greeting. "Good morning" fits before noon, "Good afternoon" until evening, and "Hello, my name is Asha. I am from Hyderabad" tells people who you are in one breath. End a first meeting with "Nice to meet you" and a smile. It leaves a friendly last impression.', ['Say "Hello, my name is ___" and add your place: "I am from ___."', 'Ask "What is your name?" and listen carefully to the answer.', 'Close politely: "Nice to meet you. See you soon!"'], 'Introduce yourself out loud five times, changing your name, place and job each time.'),
    L('Asking questions politely', 'Polite questions open doors. Start with "Excuse me" to get attention, use "Can you help me, please?" for requests, and "Where is the bus stop?" for places. Adding "please" and "thank you" makes any question sound respectful, even when your grammar is simple.', ['Begin with "Excuse me" before asking a stranger anything.', 'Use "Can you…?" for help and "Where is…?" for places.', 'Always finish with "Thank you so much."'], 'Write three questions you ask every week, at a shop, at work, on the road, and say each one politely in English.'),
    L('Shopping conversations', 'At a shop you mainly need prices, sizes and choices. Ask "How much is this?", compare with "Do you have a smaller size?" and, if the price is high, smile and say "That is too expensive. What is your best price?" Numbers matter here, so listen for rupees and repeat the price back to confirm it.', ['Ask the price first: "How much is this?"', 'Ask for options: size, colour or a cheaper one.', 'Confirm before paying: repeat the price and say "Okay, I will take it."'], 'Practise a two-minute shop conversation with a friend: greet, ask a price, bargain once, and pay.'),
    L('Talking about your day and family', 'People love small talk about daily life. Use simple present sentences: "I wake up at six. I work in a shop. I have one brother." The pattern subject + verb ("I work", "She studies") builds almost every everyday sentence you will ever need.', ['Describe your morning in three "I…" sentences.', 'Talk about family with "I have…" and "He/She is…".', 'Ask back: "And you? What do you do?" to keep the talk going.'], 'Record a 30-second voice note about your day and listen to it once.')
  ],
  [ Q('Someone says "Nice to meet you." You reply…', ['Nice to meet you too', 'How much is this?', 'Thank you, goodbye only', 'Where is it?'], 0),
    Q('"How much is this?" is used to ask about…', ['Time', 'Price', 'Distance', 'Weather'], 1),
    Q('Which sentence is a polite request?', ['Give me water', 'Can you help me, please?', 'You help me now', 'Water, fast'], 1),
    Q('Complete: "I ___ a student."', ['is', 'are', 'am', 'be'], 2),
    Q('The best reply to "Thank you" is…', ['Sorry', 'You are welcome', 'Please', 'Excuse me'], 1) ]),

C('eng-work', 'Conversational English', 'English for Work and Interviews', 'Intermediate', '4 weeks',
  'Introduce yourself professionally, write simple emails and answer interview questions calmly.',
  ['Give a 30-second self-introduction', 'Write short, clear work emails', 'Answer common interview questions', 'Make polite requests in meetings'],
  [
    L('Introducing yourself in 30 seconds', 'A strong introduction has four parts: name, background, one skill, and what you want. "My name is Ravi. I completed my ITI course last year. I am good at electrical fitting. I am looking for a trainee role." Practise until it flows without reading. Interviewers judge confidence in the first half minute.', ['Write your four parts in short sentences.', 'Time yourself: aim for 25–35 seconds.', 'End with a smile and "Thank you for this opportunity."'], 'Say your introduction to a mirror three times today.'),
    L('Simple professional emails', 'Good work emails are short: a clear subject ("Leave application for 12 May"), a greeting ("Dear Sir/Madam"), two or three lines of message, and a polite close ("Thank you, Ravi"). Read it once before sending. One careful minute prevents most mistakes.', ['Write the subject first so you never send a blank one.', 'Keep the body under five short lines.', 'End with your name and phone number.'], 'Draft one real email you need this month using the subject–greeting–body–close pattern.'),
    L('Common interview questions', 'Most interviews reuse the same questions: "Tell me about yourself", "Why should we hire you?" and "What is your strength?" Prepare one honest example for each. "I am a fast learner. I taught myself Excel in two weeks" beats a big claim with no story behind it.', ['Prepare your self-introduction (lesson 1).', 'Pick one strength and one real example that proves it.', 'Prepare one question to ask them, like "What training do you provide?"'], 'Practise answers with a friend playing the interviewer.'),
    L('Polite requests and meetings', 'At work, soft words get faster help: "Could you please share the file?" sounds better than "Send the file." In meetings, useful lines are "I agree", "I have one suggestion", and "Could you repeat that, please?" when you miss something, asking is always better than guessing.', ['Use "Could you please…?" for requests to seniors.', 'Say "Let me check and confirm" instead of guessing.', 'Close tasks clearly: "I will finish this by 5 pm."'], 'Rewrite three direct messages from your phone into polite "Could you please…?" versions.')
  ],
  [ Q('A professional introduction should include…', ['Only your name', 'Name, background, a skill and your goal', 'Your full family history', 'Your salary demand first'], 1),
    Q('The first line of a work email should be…', ['A joke', 'A clear subject line', 'Your life story', 'Nothing, leave it blank'], 1),
    Q('"Why should we hire you?" is best answered with…', ['"Because I need money"', 'A skill plus a real example', '"I have no weaknesses"', 'Silence'], 1),
    Q('Which is the most polite request?', ['Send it now', 'You must send it', 'Could you please share the file?', 'File. Now.'], 2),
    Q('In a meeting, if you did not understand, say…', ['Nothing and guess', '"Could you repeat that, please?"', '"This is boring"', '"Speak loudly"'], 1) ]),

C('eng-confidence', 'Conversational English', 'Speak with Confidence', 'Beginner', '3 weeks',
  'Pronunciation, sentence building and storytelling, move from single words to flowing speech.',
  ['Pronounce common sounds clearly', 'Build correct simple sentences', 'Make friendly small talk', 'Tell a short story in the past tense'],
  [
    L('Sounds and pronunciation basics', 'English has sounds Telugu, Hindi and other Indian languages do not use the same way, like the "v" in "very" (top teeth on lower lip) versus "w" in "west" (round lips). Slow, clear speech beats fast speech every time; listeners forgive grammar, not mumbling.', ['Practise pairs: "very–west", "ship–sheep", "bat–bet".', 'Read one paragraph aloud slowly every day.', 'Record yourself weekly and notice one sound improving.'], 'Read today\'s first lesson paragraph aloud twice, slowly.'),
    L('Building sentences: subject, verb, object', 'English sentences follow a reliable order: who + action + what. "Priya (who) reads (action) a book (what)." If your sentence feels broken, check for a missing verb first: "I market" is wrong, "I go to the market" is right. This one pattern fixes most beginner mistakes.', ['Find the verb in every sentence you say today.', 'Build five sentences about your home using who–action–what.', 'Add when/where at the end: "…in the morning", "…at home."'], 'Write five true sentences about your family using the pattern.'),
    L('Small talk that works', 'Small talk is short, friendly talk about safe topics: weather ("It is very hot today"), work, festivals and travel. Ask open questions: "How was your weekend?" gets a real answer, while yes/no questions end conversations. Listen, react ("That sounds nice!"), then ask one follow-up.', ['Keep three opener questions ready.', 'React before your next question: "Great!", "Oh really?"', 'Avoid personal topics like salary or age with new people.'], 'Start one small-talk conversation today and keep it going for two minutes.'),
    L('Telling a short story', 'Stories use the past: "Yesterday I went to the market. I bought vegetables. Then it rained!" Learn the past forms of ten common verbs, went, saw, bought, ate, said, took, gave, came, made, met, and you can narrate almost any day of your life.', ['Start with "Yesterday…" or "Last week…".', 'Chain events with "then" and "after that".', 'End with a feeling: "I was very happy."'], 'Tell a friend a one-minute story about yesterday using at least five past verbs.')
  ],
  [ Q('The usual English sentence order is…', ['Verb, object, subject', 'Subject, verb, object', 'Object, subject, verb', 'Any random order'], 1),
    Q('"I ___ to the market yesterday."', ['go', 'goes', 'went', 'going'], 2),
    Q('A good small-talk opener is…', ['"What is your salary?"', '"How was your weekend?"', '"How old are you?"', '"Why are you late?"'], 1),
    Q('For clear speech, it is better to speak…', ['Very fast', 'Slowly and clearly', 'Very quietly', 'Without verbs'], 1),
    Q('The past form of "buy" is…', ['buyed', 'buys', 'bought', 'buying'], 2) ]),

/* ---------------- Basic Math ---------------- */
C('math-everyday', 'Basic Math', 'Numbers That Work Every Day', 'Beginner', '3 weeks',
  'Place value, addition, subtraction, multiplication and division, practised with real-life numbers.',
  ['Read and write large numbers', 'Add and subtract without errors', 'Multiply using simple tricks', 'Divide and share equally'],
  [
    L('Place value and big numbers', 'Every digit has a place: in 4,382 the 4 means 4,000, the 3 means 300, the 8 means 80 and the 2 is just 2. Reading a number in groups, "four thousand, three hundred eighty-two", makes bank amounts, salaries and bills easy to check instead of scary.', ['Read numbers group by group from the left.', 'Compare two prices digit by digit from the left.', 'Write one big number from your life (rent, salary, phone price) in words.'], 'Read three prices or amounts aloud today using place value.'),
    L('Adding and subtracting with carrying', 'Add column by column from the right. 478 + 265: units 8+5=13, write 3 carry 1; tens 7+6+1=14, write 4 carry 1; hundreds 4+2+1=7, answer 743. For subtraction, check your answer by adding it back: if 743 − 265 = 478, then 478 + 265 must equal 743.', ['Always start from the units (right) column.', 'Write carries small above the next column.', 'Verify subtraction by adding the result back.'], 'Add your last three purchases and check the total against what you paid.'),
    L('Multiplication made simple', 'Multiplication is fast adding: 6 × 7 means six sevens. Break hard ones into easy ones: 6 × 7 = 6 × 5 + 6 × 2 = 30 + 12 = 42. Learn tables up to 10 in small daily doses; they quietly power percentages, discounts and measurements later.', ['Split one factor: ×7 = ×5 + ×2.', 'Learn one table line per day, out loud.', 'Use fingers for the 9 table: fold a finger, read tens and ones.'], 'Practise the 6, 7 and 8 tables once each, out loud.'),
    L('Division and sharing equally', 'Division answers "how many in each share?" ₹840 shared by 4 people: 84 ÷ 4 = 21, so ₹210 each. If a remainder is left (₹850 ÷ 4 = 212 remainder 2), decide fairly what happens to the extra, in money problems, remainders are real rupees someone keeps or returns.', ['Divide the big part first, then the rest.', 'Check by multiplying back: share × people ≈ total.', 'Say clearly what happens to any remainder.'], 'Split a real group expense (tea, travel, food) equally on paper.')
  ],
  [ Q('In 4,382, the digit 3 stands for…', ['3', '30', '300', '3,000'], 2),
    Q('478 + 265 = ?', ['733', '743', '753', '643'], 1),
    Q('6 × 7 = ?', ['36', '42', '48', '54'], 1),
    Q('₹840 shared equally by 4 people gives each…', ['₹200', '₹210', '₹240', '₹180'], 1),
    Q('To check a subtraction, you should…', ['Subtract again randomly', 'Add the answer back', 'Multiply by 10', 'Ignore it'], 1) ]),

C('math-money', 'Basic Math', 'Money Math', 'Beginner', '3 weeks',
  'Change, percentages, discounts and interest, the math behind every rupee decision.',
  ['Count money and return correct change', 'Calculate percentages step by step', 'Compare discounts and find the best price', 'Understand simple interest'],
  [
    L('Counting money and change', 'When you pay ₹500 for a ₹365 item, count change upward: from 365 to 400 is ₹35, from 400 to 500 is ₹100: total change ₹135. Counting up is how shopkeepers do it fast, and it protects you from the most common daily money mistake: accepting wrong change.', ['Count up from the bill amount to the note you gave.', 'Check coins and notes before leaving the counter.', 'For UPI, read the amount digit by digit before confirming.'], 'Practise counting-up change for three imaginary purchases today.'),
    L('Percentages without fear', 'Percent means "out of 100". To find 10% of anything, move the decimal one place left: 10% of ₹850 is ₹85. From that one skill you get 20% (double it), 5% (half of 10%) and 15% (10% + 5%). Most shop and salary percentages are built from these blocks.', ['Find 10% first, move the decimal left.', 'Build 20%, 5% and 15% from the 10% block.', 'Remember: percentage of a number shrinks it unless it is over 100%.'], 'Find 10% and 20% of your monthly income or pocket money.'),
    L('Discounts and best price', 'A discount is a percentage taken off. A ₹800 shirt at 25% off: 25% of 800 is ₹200, so you pay ₹600. Compare offers properly: "50% + 20% off" is NOT 70% off (it is 60% total). Always ask: what do I finally pay?', ['Calculate the final price, not just the % off.', 'Compare final prices across shops, including delivery.', 'Beware doubled discounts, apply them one after another.'], 'Take one product you want and compute its real final price under two offers.'),
    L('Simple interest and saving goals', 'Banks pay simple interest on savings: Interest = Principal × Rate × Time ÷ 100. ₹10,000 at 6% for 2 years earns 10,000 × 6 × 2 ÷ 100 = ₹1,200. The same formula, reversed, shows what a loan costs you, which is why comparing rates matters more than comparing EMIs.', ['Write P, R and T before calculating.', 'Interest grows with time. Longer loans cost more total.', 'Compare the total repayment, not only the monthly EMI.'], 'Calculate interest on ₹5,000 at 5% for 3 years on paper.')
  ],
  [ Q('You pay ₹500 for a ₹365 item. Your change is…', ['₹125', '₹135', '₹145', '₹165'], 1),
    Q('10% of ₹850 is…', ['₹8.50', '₹85', '₹850', '₹95'], 1),
    Q('A ₹800 shirt at 25% off costs…', ['₹200', '₹775', '₹600', '₹550'], 2),
    Q('Simple interest on ₹10,000 at 6% for 2 years is…', ['₹600', '₹1,200', '₹2,000', '₹120'], 1),
    Q('"50% off + extra 20% off" equals…', ['70% off total', '60% off total', '100% off', '20% off total'], 1) ]),

C('math-exams', 'Basic Math', 'Math for Exams and Work', 'Intermediate', '4 weeks',
  'Fractions, ratios, measurement and data reading, the topics that appear in tests and on the job.',
  ['Use fractions in recipes, work and exams', 'Solve ratio and sharing problems', 'Convert length, weight and time units', 'Read charts and tables accurately'],
  [
    L('Fractions in real life', 'A fraction names part of a whole: 3/4 of a pizza is 3 of its 4 equal pieces. To compare fractions, make denominators equal: 1/2 (2/4) is bigger than 1/4. Half, quarter and three-quarters appear in cooking, construction, tailoring and every competitive exam.', ['Picture the whole divided into equal parts first.', 'Convert to a common denominator to compare.', 'Simplify: 4/8 is the same as 1/2, divide top and bottom by 4.'], 'Cut a paper circle into halves, quarters and eighths and label each piece.'),
    L('Ratios and proportions', 'A ratio compares quantities: juice mixed 1:3 means 1 part syrup to 3 parts water. Scale both sides equally: for 8 glasses you need 2 parts syrup and 6 parts water. Ratios run recipes, cement mixing, maps and salary sharing.', ['Keep the order of the ratio fixed.', 'Multiply or divide both sides by the same number.', 'Check the total parts match the total quantity.'], 'Scale a 1:3 juice mix up to serve 12 glasses.'),
    L('Measuring: length, weight and time', 'Conversions to memorise: 1 km = 1,000 m; 1 m = 100 cm; 1 kg = 1,000 g; 1 litre = 1,000 ml; 1 hour = 60 minutes. Convert before you calculate, adding 1.5 kg and 700 g works only after both are in grams (1,500 + 700 = 2,200 g).', ['Convert all values to one unit first.', 'Write the unit in every step, not just the answer.', 'Estimate first: is the answer roughly sensible?'], 'Convert your height to centimetres and your travel time today to minutes.'),
    L('Reading charts and tables', 'Charts compress information: read the title first, then the axes labels, then find your value. In a bar chart of monthly sales, the tallest bar is the best month, but the numbers on the axis tell you by how much. Tables reward the same habit: find the right row, then the right column, then intersect.', ['Read title and labels before any numbers.', 'Trace row and column with a finger or ruler.', 'State answers with units: "March — 450 units".'], 'Find one chart in a newspaper or app and write two facts from it.')
  ],
  [ Q('Which is bigger: 1/2 or 1/4?', ['1/4', '1/2', 'They are equal', 'Cannot say'], 1),
    Q('A 1:3 syrup-to-water mix for 8 total parts needs syrup…', ['1 part', '2 parts', '3 parts', '4 parts'], 1),
    Q('1.5 kg + 700 g = ?', ['2.2 kg', '701.5 g', '8.5 kg', '1.57 kg'], 0),
    Q('In a bar chart, the tallest bar shows…', ['The smallest value', 'The largest value', 'The average', 'An error'], 1),
    Q('4/8 simplified is…', ['1/4', '2/3', '1/2', '4/4'], 2) ]),

/* ---------------- Digital Literacy ---------------- */
C('dig-first-steps', 'Digital Literacy', 'Your First Steps with a Smartphone', 'Beginner', '3 weeks',
  'Settings, calls, internet search, photos and files, take calm control of your phone.',
  ['Set up your phone and key settings', 'Manage calls, contacts and messages', 'Search the internet effectively', 'Organise photos, files and storage'],
  [
    L('Turning on, charging and settings basics', 'Your Settings app is the control room: brightness and font size under Display, sounds under Sound, and battery health under Battery. Charge between 20% and 90% for a longer battery life, and turn on automatic updates so the phone fixes itself overnight on Wi-Fi.', ['Increase font size if reading feels tiring, no shame, just comfort.', 'Turn on auto-brightness and check battery usage once.', 'Set a screen lock (PIN or fingerprint) today if you have none.'], 'Open Settings and find Display, Sound and Battery without help.'),
    L('Calls, contacts and messages', 'Save every important number with a full name: "Ravi Electrician" beats three different "Ravi"s. In Messages and WhatsApp, a long-press usually reveals reply, forward and delete. Star or pin your most important chats so family and work are always one tap away.', ['Rename two confusing contacts with name + role/city.', 'Pin your most important chat.', 'Practise blocking one spam number from your call list.'], 'Clean up five contacts today: full names, no duplicates.'),
    L('Using the internet and search', 'Search works best with specific words: "bus Hyderabad to Guntur tomorrow morning" beats "bus". The first results with "Ad" or "Sponsored" labels are paid adverts, useful sometimes, but scroll to the natural results too. End questions with words like "timings", "price" or "near me" to get practical answers.', ['Use 4–6 specific words per search.', 'Notice which results are adverts.', 'Open at least two sources before trusting a big claim.'], 'Search for one real thing you need and compare two results.'),
    L('Photos, files and storage', 'When storage fills up, the phone slows down and updates fail. Photos and videos are usually the biggest users: move old ones to Google Photos or a computer, and delete blurry duplicates. In a Files app, Downloads is where PDFs and images from the browser collect dust; clear it monthly.', ['Check Storage in Settings and note the biggest category.', 'Delete ten useless photos or screenshots.', 'Create one folder called "Documents" for important files.'], 'Free up space today until at least 2 GB is available.')
  ],
  [ Q('Automatic updates should be turned…', ['Off forever', 'On, preferably over Wi-Fi', 'Only for games', 'Never, updates break phones'], 1),
    Q('A good contact name is…', ['Ravi', 'Ravi Electrician Hyderabad', 'Number 5', 'AAA Ravi'], 1),
    Q('Search results labelled "Ad" or "Sponsored" are…', ['The most trusted results', 'Paid adverts', 'Government results', 'Always scams'], 1),
    Q('When phone storage is nearly full, first check…', ['Wallpaper', 'Photos and videos', 'Font size', 'Ringtone'], 1),
    Q('A screen lock protects you when…', ['The battery dies', 'The phone is lost or picked up by someone else', 'You travel', 'It rains'], 1) ]),

C('dig-safety', 'Digital Literacy', 'Stay Safe Online', 'Beginner', '3 weeks',
  'Passwords, OTPs, scams and privacy, the safety habits that protect your money and identity.',
  ['Create strong passwords and protect OTPs', 'Spot scam messages and fake offers', 'Set privacy controls that matter', 'Pay safely with UPI and cards'],
  [
    L('Strong passwords and OTP safety', 'A strong password is long and unique: a phrase like "blue-bus-rain-42" beats "rahul123". Never reuse your bank password anywhere else. And the golden rule: an OTP is only for the screen you requested it on. No bank, police or company caller ever needs your OTP. Anyone asking is a thief, every time.', ['Make one long passphrase password today and change a reused one.', 'Turn on fingerprint/PIN lock for payment apps.', 'Memorise: OTP asked by a caller = fraud, hang up.'], 'Check two accounts and make sure they do not share the same password.'),
    L('Spotting scams and fake messages', 'Scams create panic or greed: "Your account will be blocked today!", "You won ₹25,000, pay ₹500 to claim!" Real organisations do not threaten by SMS or ask fees for prizes. Check the sender name, look for spelling errors, and never click payment links from unknown messages. Open the official app yourself instead.', ['Pause: panic + hurry is the scam fingerprint.', 'Verify in the official app or helpline number from the card/website.', 'Show a suspicious message to a family member before acting.'], 'Find one old spam message and list three warning signs in it.'),
    L('Privacy settings that matter', 'On WhatsApp and social apps, set profile photo and "last seen" to "My contacts", and turn on two-step verification. Review which apps can access your location, contacts and photos. A torch app needs none of them. Privacy is mostly three settings menus visited once a season.', ['Set WhatsApp profile visibility to "My contacts".', 'Turn on two-step verification with a PIN you remember.', 'Remove location permission from two apps that do not need it.'], 'Do a five-minute privacy check on your most-used app today.'),
    L('Safe payments and UPI safety', 'Enter your UPI PIN only when YOU are paying. Receiving money never needs a PIN, and anyone saying otherwise is scamming you. Before confirming, read the name shown on the payment screen; it must match the person or shop you intend to pay. Keep payment notifications on so every transaction is visible immediately.', ['Receiving money = no PIN, ever.', 'Verify the payee name on screen before paying.', 'Check one past payment notification against your memory.'], 'Review your last five UPI transactions and confirm each one is yours.')
  ],
  [ Q('A bank caller asks for your OTP. You should…', ['Share it quickly', 'Hang up, it is a fraud attempt', 'Share only half', 'Call them back and share'], 1),
    Q('The strongest password here is…', ['rahul123', '12345678', 'blue-bus-rain-42', 'Your birth date'], 2),
    Q('To RECEIVE money on UPI you need to enter your PIN…', ['Always', 'Only for big amounts', 'Never, receiving needs no PIN', 'Twice'], 2),
    Q('A message says "You won ₹25,000, pay ₹500 to claim." This is…', ['A government scheme', 'A classic scam pattern', 'A bank offer', 'Always genuine'], 1),
    Q('Two-step verification adds…', ['Extra data charges', 'A second security check beyond your password', 'Faster typing', 'More adverts'], 1) ]),

C('dig-work-tools', 'Digital Literacy', 'Digital Tools for Work', 'Intermediate', '4 weeks',
  'Email, documents, spreadsheets, video calls and cloud files, the office basics, on your phone or laptop.',
  ['Write email that gets read and answered', 'Create documents and simple spreadsheets', 'Join video calls and fill online forms confidently', 'Store and share files with cloud storage'],
  [
    L('Email that gets read', 'Busy people scan email: a clear subject ("Application for Data Entry Post — Suresh K."), the main point in the first line, short paragraphs, and one clear request at the end. Attach files before writing "attached", and check the attachment is really there before pressing send.', ['Write the subject last if it helps you focus.', 'Put your request in the first two lines.', 'Attach first, write second, send third.'], 'Send one properly structured email this week, even a practice one to a friend.'),
    L('Documents and spreadsheets basics', 'A document (Docs/Word) is for words; a spreadsheet (Sheets/Excel) is for numbers in rows and columns. In a spreadsheet, formulas start with "=": =SUM(B2:B6) adds a column of numbers automatically. Learn typing, bold, saving and SUM, AVERAGE first; those four skills cover most beginner office work.', ['Practise =SUM on a list of five expenses.', 'Save files with clear names: "March-expenses".', 'Use one sheet per topic instead of one giant sheet.'], 'Build a tiny spreadsheet of this week\'s spending with a SUM total.'),
    L('Video calls and online forms', 'For video calls: test your camera and mic in the app settings, sit facing light (not with a window behind you), and mute when not speaking. For government and job forms online, keep photos of your Aadhaar, photo and certificates ready in one folder, fill slowly, and save the application number shown at the end. Screenshot it.', ['Do a 2-minute test call with a friend before an important call.', 'Keep a "Form documents" folder ready on your phone.', 'Screenshot every confirmation/application number.'], 'Create your form-documents folder with at least three documents today.'),
    L('Cloud storage and sharing files', 'Cloud storage (Google Drive, OneDrive) keeps files safe even if the phone is lost, and lets you share a link instead of a heavy attachment. Right-click or long-press a file → Share → copy link. Choose "viewer" access for most people; "editor" only for people who must change the file with you.', ['Upload your three most important documents to Drive today.', 'Practise sharing one file as a viewer link.', 'Check "Shared with me" and remove anything unknown.'], 'Back up one folder from your phone to the cloud now.')
  ],
  [ Q('In a spreadsheet, a formula begins with…', ['#', '=', '@', '%'], 1),
    Q('=SUM(B2:B6) does what?', ['Deletes the cells', 'Adds the numbers in B2 to B6', 'Sorts names', 'Prints the sheet'], 1),
    Q('Before an important video call you should…', ['Sit with a bright window behind you', 'Test camera and mic, face the light', 'Keep mic on always', 'Use the worst network spot'], 1),
    Q('Sharing a cloud file as "viewer" means the person can…', ['Edit everything', 'Only view/download, not edit', 'Delete your account', 'See your password'], 1),
    Q('After submitting an online form, always save…', ['The advert banners', 'The application/confirmation number', 'Nothing', 'The full webpage colour'], 1) ])
];

/* ---------------- Financial Literacy ---------------- */
SEED_COURSES.push(
C('fin-budget', 'Financial Literacy', 'Budgeting Basics', 'Beginner', '3 weeks',
  'Track spending, separate needs from wants and build a weekly budget that survives real life.',
  ['Track where your money actually goes', 'Separate needs, wants and savings', 'Build a simple weekly budget', 'Plan for irregular income and surprises'],
  [
    L('Know where your money goes', 'Most money leaks invisibly: small snacks, autos, recharges. For one week, write every expense in a notebook or notes app, even ₹10 tea. At the end, group them: food, travel, phone, fun, other. People are usually shocked by one category. That shock is the start of control.', ['Write every expense for seven days, no exceptions.', 'Group expenses into five simple categories.', 'Circle the one category that surprises you most.'], 'Start your seven-day expense diary today with everything you have spent since morning.'),
    L('Needs, wants and the 50-30-20 idea', 'Needs keep life running (food, rent, travel to work); wants make life fun (eating out, new shoes). A gentle guide is 50-30-20: about 50% of income for needs, 30% for wants, 20% for saving. Your numbers may differ. The point is deciding the split BEFORE the month spends it for you.', ['List your monthly needs with amounts.', 'List wants honestly, no guilt, just truth.', 'Compare your real split with 50-30-20 and pick one small shift.'], 'Write your current needs/wants/saving split as percentages.'),
    L('Building a weekly budget', 'Monthly budgets feel far away; weekly budgets are close enough to control. Divide monthly money by 4.3 for a weekly amount, set a cap for flexible spending (food extras, travel, fun), and check every Sunday: under the cap, the extra moves to savings; over it, next week trims gently, no panic, just adjustment.', ['Convert your monthly plan into weekly caps.', 'Pick one fixed check-in day (Sunday works well).', 'Move any leftover straight to savings on check-in day.'], 'Set this week\'s flexible-spending cap and write it where you will see it daily.'),
    L('Handling surprises and irregular income', 'Rickshaw drivers, freelancers and daily-wage workers rarely get the same income monthly. Budget from your WORST recent month, not your best: cover needs from that base, and treat better months as bonus for savings and advance bills. One month of needs kept aside is the shield that turns a crisis into an inconvenience.', ['Find your lowest income month in the last six.', 'Build your needs budget on that number.', 'In good months, save the difference first, spend later.'], 'Calculate your "bad month" needs total and how much shield you have today.')
  ],
  [ Q('The first step to controlling money is…', ['Buying a budget app', 'Tracking every expense for a week', 'Stopping all fun spending', 'Taking a loan'], 1),
    Q('In 50-30-20, the 20 stands for…', ['Wants', 'Rent', 'Savings', 'Travel'], 2),
    Q('A weekly budget check-in helps you…', ['Feel guilty weekly', 'Adjust gently before the month escapes', 'Spend more', 'Avoid all records'], 1),
    Q('With irregular income, budget your needs from…', ['Your best month', 'An average of dreams', 'Your worst recent month', 'Next month\'s hope'], 2),
    Q('Which of these is a NEED?', ['Movie tickets', 'Travel to work', 'New headphones', 'Eating out with friends'], 1) ]),

C('fin-saving-banking', 'Financial Literacy', 'Saving and Banking', 'Beginner', '3 weeks',
  'Bank accounts, small regular saving, digital payments and your first emergency fund.',
  ['Open and use a bank account confidently', 'Save small amounts regularly', 'Use UPI and cards while avoiding charges', 'Build an emergency fund step by step'],
  [
    L('Opening and using a bank account', 'A savings account keeps money safe and earns interest. To open one you typically need Aadhaar, PAN (or Form 60), a photo and a phone number. Jan Dhan accounts need no minimum balance. Always collect your passbook/statement habit: update or check it monthly so every entry is familiar.', ['Carry originals + one photocopy set to the bank.', 'Link your mobile number for SMS alerts.', 'Never share your PIN, OTP or passwords with "bank callers".'], 'Check your latest bank statement and identify every entry this week.'),
    L('Saving small, saving often', 'Saving is a habit, not an amount. ₹50 a day is ₹1,500 a month, more than most people save by "waiting for a big amount". Save FIRST when money arrives (pay yourself first), keep savings in a separate account or wallet so spending it needs a deliberate transfer, and celebrate milestones to keep the habit warm.', ['Fix a daily or weekly saving amount, however small.', 'Move it to a separate place on the day income arrives.', 'Write your first milestone: ₹1,000, then ₹5,000.'], 'Transfer your first small saving amount today, even ₹20 counts.'),
    L('UPI, cards and bank charges', 'UPI payments are free for personal use, but banks charge for some things: ATM use beyond free limits, minimum-balance shortfalls in regular accounts, and cash handling. Know your account\'s two or three main charges. On cards, a debit card spends YOUR money; a credit card spends the BANK\'S money that you must repay. Treat them very differently.', ['Find your bank\'s charges list in the app or branch poster.', 'Use your own bank\'s ATM when possible.', 'Check statements for one unknown charge and ask the bank about it.'], 'Locate the charges page for your account type today.'),
    L('Emergency fund step by step', 'An emergency fund covers job loss, illness or a broken phone without borrowing at high interest. Build it in stages: first ₹5,000, then one month of needs, then three months. Keep it in a savings account you can reach in a day, not locked in investments, not mixed with daily spending.', ['Set stage one: ₹5,000, with a weekly saving amount.', 'Keep the fund separate and label it "Emergency only".', 'Rebuild it first after any emergency use, no guilt, that was its job.'], 'Write your stage-one target and the date you will reach it at your current saving rate.')
  ],
  [ Q('"Pay yourself first" means…', ['Buy yourself a gift first', 'Move savings aside as soon as income arrives', 'Pay all friends first', 'Spend, then save leftovers'], 1),
    Q('₹50 saved daily becomes roughly… per month', ['₹150', '₹500', '₹1,500', '₹5,000'], 2),
    Q('A credit card spends…', ['Your savings directly', 'The bank\'s money, which you must repay', 'Free money', 'Government money'], 1),
    Q('An emergency fund should be kept…', ['As cash under the mattress only', 'In an easy-to-reach savings account, separate from daily money', 'Locked for 10 years', 'With a friend'], 1),
    Q('Jan Dhan accounts are known for…', ['High minimum balance', 'No minimum balance requirement', 'Only for businesses', 'No ATM card ever'], 1) ]),

C('fin-borrow-grow', 'Financial Literacy', 'Borrowing Wisely and Growing Money', 'Intermediate', '4 weeks',
  'Loans and EMIs in plain words, credit traps, insurance basics and honest first steps to investing.',
  ['Understand loans, interest and EMIs', 'Avoid common credit traps', 'Know what insurance actually protects', 'Take safe first steps toward investing'],
  [
    L('Loans, interest and EMIs in plain words', 'An EMI is not the price of a loan. The total of all EMIs is. A ₹50,000 loan at high interest can quietly cost ₹65,000 back. Before borrowing, ask three questions in writing: total repayment, interest rate per year, and charges for late or early payment. If a lender avoids these answers, walk away.', ['Always compute total repayment = EMI × months + fees.', 'Compare annual interest rates, not monthly "flat" claims.', 'Borrow for needs and income-growing tools before lifestyle items.'], 'Take any loan offer you have seen and calculate its true total cost.'),
    L('Credit traps to avoid', 'Traps share a pattern: money feels free today and expensive tomorrow. Minimum-due payments on credit cards (interest piles on the rest), "no-cost EMI" with hidden processing fees, and quick-loan apps charging huge daily interest all work this way. The defence is boring and total: read the total cost, and sleep one night before any borrowing decision.', ['Never pay only the minimum due if you can avoid it.', 'Ask "what is the total amount I will repay?" for every offer.', 'Avoid loan apps that need access to your contacts and photos.'], 'Review one "easy money" offer you have received and find its hidden cost.'),
    L('Insurance: what it protects', 'Insurance is not investment. It is a shield. Term insurance protects your family\'s income if you die; health insurance protects savings when hospital bills arrive. Buy pure protection first, keep it separate from schemes that mix insurance with investment, and always tell the full truth on health questions. Hidden facts void claims when you need them most.', ['List who depends on your income. That is who insurance protects.', 'Prefer simple term + health cover over bundled schemes.', 'Note renewal dates so a policy never lapses silently.'], 'Check whether your family has any health cover today and write down what it includes.'),
    L('First steps to investing', 'Investing comes AFTER an emergency fund and clearing costly debt, in that order. Start boring: a bank RD or a simple index mutual fund SIP with money you will not need for 5+ years. Anyone promising to double money quickly, guaranteed, is describing a scam, not an investment. Slow, regular and understood beats exciting every time.', ['Clear high-interest debt before investing.', 'Start with a small SIP you can continue in a bad month.', 'Ignore tips promising quick doubling, guaranteed.'], 'Write your personal order: emergency fund target, debts, then first investment amount.')
  ],
  [ Q('The true cost of a loan is…', ['The EMI amount', 'Total of all EMIs plus fees', 'Only the first payment', 'The interest rate name'], 1),
    Q('Paying only the minimum due on a credit card…', ['Clears your debt fast', 'Leaves the rest growing with interest', 'Is always free', 'Improves savings'], 1),
    Q('Insurance is best understood as…', ['An investment to double money', 'A shield that protects income and savings', 'A lottery', 'A tax'], 1),
    Q('Before investing, you should first…', ['Take a quick loan to invest', 'Build an emergency fund and clear costly debt', 'Follow hot tips', 'Buy the most advertised scheme'], 1),
    Q('"Guaranteed to double your money in 3 months" is…', ['A government promise', 'A classic scam sign', 'Normal banking', 'Always safe'], 1) ]),

/* ---------------- Health Literacy ---------------- */
C('health-basics', 'Health Literacy', 'Everyday Health Basics', 'Beginner', '3 weeks',
  'Food, sleep, hygiene and knowing when to see a doctor, the foundations of staying well.',
  ['Build a balanced everyday plate', 'Sleep and move for real energy', 'Use hygiene habits that prevent illness', 'Recognise when home care is not enough'],
  [
    L('Food, water and balanced plates', 'A balanced plate is roughly half vegetables and fruits, a quarter grains (rice, roti, millets) and a quarter protein (dal, eggs, curd, chicken, soya). You do not need expensive foods. Seasonal and local wins. Drink water through the day; thirst, dark yellow urine and headaches are your body\'s low-water warnings.', ['Fill half your plate with vegetables first at one meal today.', 'Add a protein to every meal, dal counts fully.', 'Carry a water bottle and finish it twice.'], 'Rebuild tomorrow\'s lunch plate using the half–quarter–quarter rule.'),
    L('Sleep, movement and rest', 'Adults need 7–9 hours of sleep; it is when the brain files learning and the body repairs itself. Movement matters just as much: 30 minutes of brisk walking most days protects heart, mood and weight. Short on time? Three 10-minute walks work nearly as well as one long one.', ['Fix a regular sleep and wake time, even on Sundays.', 'Walk briskly 10 minutes after one meal today.', 'Keep screens away for the last 30 minutes before sleep.'], 'Set tonight\'s lights-out time and protect it like an appointment.'),
    L('Hygiene that prevents illness', 'Most common infections travel hand-to-mouth. Wash hands with soap for 20 seconds after the toilet, before eating and after returning home. This single habit prevents a large share of stomach and cold illnesses. Add: cover coughs, do not share towels or razors, and keep drinking water covered and clean.', ['Time a full 20-second handwash once to feel how long it is.', 'Place soap where it is actually easy to reach.', 'Wash hands before your next meal without being reminded.'], 'Teach the 20-second handwash to one younger person today.'),
    L('When to see a doctor', 'Home care is fine for mild colds and small aches, but some signs need a doctor quickly: fever above 102°F or lasting 3 days, breathing difficulty, chest pain, severe stomach pain, confusion, or any symptom that keeps getting worse. When in doubt, go earlier. Treatment is simpler and cheaper at the start of an illness.', ['Save your nearest clinic/hospital number in your phone now.', 'Note symptoms with dates when someone is ill at home.', 'Never wait out chest pain or breathing trouble at home.'], 'Write your family\'s emergency health contacts on paper for the fridge.')
  ],
  [ Q('A balanced plate is roughly…', ['All rice', 'Half vegetables/fruit, quarter grains, quarter protein', 'Only protein', 'Half sweets'], 1),
    Q('Adults generally need how much sleep?', ['3–4 hours', '5 hours', '7–9 hours', '12+ hours'], 2),
    Q('Hands should be washed with soap for about…', ['2 seconds', '20 seconds', '2 minutes', 'No soap needed'], 1),
    Q('Which sign needs a doctor quickly?', ['Mild cold for one day', 'Chest pain or breathing difficulty', 'A small appetite drop', 'Feeling sleepy at night'], 1),
    Q('A simple daily movement goal is…', ['No movement on weekdays', 'About 30 minutes of brisk walking', 'Running 20 km daily', 'Exercise once a year'], 1) ]),

C('health-medicines', 'Health Literacy', 'Understanding Medicines and Reports', 'Beginner', '3 weeks',
  'Read prescriptions, follow dosage safely and understand common health checks like BP and sugar.',
  ['Read a prescription and medicine label', 'Follow dosage and finish prescribed courses', 'Understand BP, sugar and common test values', 'Store medicines safely at home'],
  [
    L('Reading a prescription', 'A prescription lists the medicine name, strength (like 500 mg), how often (1-0-1 means morning and night), and for how many days. If handwriting confuses you, ask the pharmacist to write the schedule in your language on the packet. That is your right, and good pharmacists do it happily.', ['Check name, strength and schedule before leaving the pharmacy.', 'Ask: "Before food or after food?" for every medicine.', 'Keep prescriptions filed. They are your health history.'], 'Take one old prescription at home and decode its full schedule.'),
    L('Dosage, timing and finishing courses', 'Medicines work at the right dose and time. Antibiotics especially must be finished for the full course even when you feel better in two days. Stopping early lets the strongest germs survive and return harder to treat. Never take someone else\'s leftover medicine for a "similar" illness.', ['Use phone alarms for dose times.', 'Finish antibiotic courses fully, always.', 'If a medicine causes a rash or swelling, stop and contact a doctor.'], 'Set alarms for any medicine anyone in your home is currently taking.'),
    L('Common tests: blood pressure and sugar', 'Normal blood pressure is around 120/80; repeated readings above 140/90 need a doctor\'s plan. Fasting blood sugar is usually healthy below 100 mg/dL. One odd reading is information, not a verdict. Note the date, time and conditions (after food? stressed?) and repeat as advised.', ['Sit quietly 5 minutes before a BP reading for accuracy.', 'Write readings in a small health diary with dates.', 'Ask what YOUR target range is, it varies by person.'], 'Start a one-page health diary with today\'s date and any recent readings.'),
    L('Storing medicines safely', 'Heat and bathroom moisture damage medicines. Store them cool, dry and away from children: a closed box in a bedroom cupboard beats the bathroom cabinet. Check expiry dates every few months; expired medicines go back to a pharmacy or safely in waste, never shared or sold.', ['Move medicines out of the bathroom today.', 'Check expiry dates and remove expired ones.', 'Keep children\'s medicines clearly separated and labelled.'], 'Do a 10-minute medicine-box clean-up this week.')
  ],
  [ Q('"1-0-1" on a prescription usually means…', ['One tablet in the morning and one at night', 'One tablet total', 'Take with 101 ml water', 'Medicine number 101'], 0),
    Q('Feeling better after 2 days of antibiotics, you should…', ['Stop them and save the rest', 'Finish the full prescribed course', 'Share the rest with family', 'Double the dose'], 1),
    Q('A repeated BP reading above about 140/90 means…', ['Perfect health', 'See a doctor for a plan', 'Drink more coffee', 'Ignore forever'], 1),
    Q('Medicines are best stored…', ['In the steamy bathroom', 'Cool, dry and away from children', 'In direct sunlight', 'Loose in a pocket'], 1),
    Q('Fasting blood sugar is usually healthy below…', ['200 mg/dL', '300 mg/dL', '100 mg/dL', '50 mg/dL always'], 2) ]),

C('health-mind-firstaid', 'Health Literacy', 'Mental Wellbeing and First Aid', 'Beginner', '3 weeks',
  'Simple tools for stress, honest conversation about feelings, and calm first aid for common injuries.',
  ['Understand stress and reset it simply', 'Talk about feelings and ask for help', 'Give first aid for cuts, burns and fever', 'Build healthier phone and screen habits'],
  [
    L('Stress: what it is and simple resets', 'Stress is the body\'s alarm system, useful in short bursts, exhausting when it never switches off. Signs include poor sleep, irritability and body tension. Simple resets that genuinely help: slow breathing (in for 4 counts, out for 6), a short walk, talking to someone, and fixing one small problem instead of circling all of them.', ['Try 4-in, 6-out breathing for two minutes now.', 'Name your biggest stressor in one written sentence.', 'Pick the smallest useful action toward it today.'], 'Use the breathing reset once today before a tense moment.'),
    L('Talking about feelings and asking for help', 'Feelings are information, not weakness. Saying "I have been feeling low for two weeks" to a trusted person is a health action, exactly like seeing a doctor for fever. If low mood, loss of interest or hopelessness lasts beyond two weeks, please reach out to a counsellor, doctor or helpline. Support works best early.', ['Choose one trusted person you could talk to honestly.', 'Ask "How are you, really?" and listen without fixing.', 'Save a local helpline number in your phone.'], 'Have one honest five-minute conversation this week.'),
    L('First aid for cuts, burns and fever', 'Cuts: wash under clean running water, press with a clean cloth until bleeding stops, cover with a bandage. Burns: cool running water for 10–20 minutes. Never ice, toothpaste or oil. Fever: rest, fluids, light clothing; see a doctor for very high fever, fever in small babies, or fever lasting over 3 days.', ['Assemble a mini first-aid kit: bandages, antiseptic, thermometer.', 'Remember burn rule: cool water, long and gentle.', 'Check the kit location is known to everyone at home.'], 'Put together or update your home first-aid kit this week.'),
    L('Healthy phone and screen habits', 'Screens steal sleep and attention quietly. Three habits restore balance: no phone for the first 30 minutes after waking, charge the phone outside arm\'s reach at night, and take a 5-minute eye-and-body break every hour of screen work (look far away, stretch, walk). Your attention is a health resource. Spend it deliberately.', ['Set a nightly phone parking spot away from the bed.', 'Turn off notifications for two non-essential apps.', 'Take one screen-free break in your next work hour.'], 'Try the 30-minute phone-free morning tomorrow.')
  ],
  [ Q('A simple breathing reset for stress is…', ['Hold breath for 2 minutes', 'Breathe in 4 counts, out 6 counts, slowly', 'Breathe as fast as possible', 'Stop breathing exercises entirely'], 1),
    Q('Low mood lasting beyond about two weeks means you should…', ['Hide it always', 'Reach out to a trusted person, counsellor or doctor', 'Feel ashamed', 'Wait a year silently'], 1),
    Q('For a burn, first aid is…', ['Apply toothpaste', 'Apply ice directly', 'Cool running water for 10–20 minutes', 'Cover with oil'], 2),
    Q('For a cut, the correct first steps are…', ['Ignore it', 'Wash with clean water, press with a clean cloth, bandage', 'Apply mud', 'Use someone else\'s medicine'], 1),
    Q('A healthy night screen habit is…', ['Phone in hand until sleep', 'Charge the phone away from the bed', 'All notifications on loud', 'Videos at full brightness in the dark'], 1) ])
);

var MENTORS = [
  { id: 'm-ananya', name: 'Ananya Sharma', track: 'Conversational English', blurb: 'English coach who helps beginners speak in week one, small sentences, zero fear of mistakes.' },
  { id: 'm-rohit', name: 'Rohit Verma', track: 'Basic Math', blurb: 'Maths mentor for daily-life numbers, exam basics and money calculations, explained with real examples.' },
  { id: 'm-priya', name: 'Priya Nair', track: 'Digital Literacy', blurb: 'Digital safety specialist: smartphones, UPI safety, privacy and work tools, patiently step by step.' },
  { id: 'm-arjun', name: 'Arjun Mehta', track: 'Financial Literacy', blurb: 'Personal-finance mentor covering budgets, banking, loans and first investments in plain language.' },
  { id: 'm-kavitha', name: 'Dr. Kavitha Rao', track: 'Health Literacy', blurb: 'Community-health mentor who explains medicines, reports and everyday wellbeing without jargon.' },
  { id: 'm-sneha', name: 'Sneha Patel', track: 'Conversational English', blurb: 'Career-communication mentor: interviews, workplace English and confident self-introduction.' }
];

var FAQS = [
  { keys: ['cost', 'price', 'free', 'pay', 'fee', 'charge'], a: 'DigiPath core learning is FREE forever. Every course, lesson and quiz costs nothing. Supporter plans (₹499/mo, ₹4,999/yr) are only for people who want to sponsor a learner; they are not needed to access lessons.' },
  { keys: ['start', 'begin', 'enroll', 'enrol', 'join', 'register', 'sign up', 'signup'], a: 'To start: create a free account from the Login view (or use the demo account shown there), open the Catalog, pick a course and tap Enroll. Then open the course and start Lesson 1.' },
  { keys: ['certificate', 'certificat'], a: 'Complete 100% of a course\'s lessons and your Dashboard shows a "View certificate" button. The certificate view is printable. Use its Print button.' },
  { keys: ['mentor', 'help', 'doubt', 'teacher', 'guide'], a: 'Open the Mentors view, pick a mentor for your track and send your question with the "Ask a mentor" form. Replies appear in the mentor inbox on your Dashboard.' },
  { keys: ['quiz', 'test', 'exam', 'score'], a: 'Every course has a quiz with at least 5 questions. Open a course and tap "Take quiz". Scoring is instant and your results are saved in your Dashboard history.' },
  { keys: ['login', 'log in', 'password', 'account', 'forgot'], a: 'Use the Login view at the top. Demo student: demo@digipath.learn / demo1234. Admin demo: admin@digipath.learn / admin1234. Accounts are demo-grade and stored only in this browser.' },
  { keys: ['supporter', 'sponsor', 'donate', 'patron', 'support'], a: 'Supporter (₹499/mo) and Patron (₹4,999/yr) plans sponsor a learner. They fund data, devices and mentor time. Checkout is a labelled demo: no real payment happens, and learning stays free for students.' },
  { keys: ['course', 'track', 'english', 'math', 'digital', 'financial', 'health', 'learn'], a: 'There are 5 tracks: Conversational English, Basic Math, Digital Literacy, Financial Literacy and Health Literacy, with 15 courses in the catalog. Use the track filters at the top of the Catalog to browse.' },
  { keys: ['progress', 'streak', 'dashboard', 'continue'], a: 'Your Dashboard shows enrolled courses, progress % per course, a Continue Learning button for your last unfinished lesson, quiz history, lessons completed and your streak.' },
  { keys: ['language', 'telugu', 'hindi'], a: 'Courses are currently written in simple English, designed for beginners. Regional-language versions are on the DigiPath roadmap.' }
];
var FALLBACK_ANSWER = 'I can answer questions about courses, cost (learning is free), certificates, mentors, quizzes, accounts and supporter plans. Try asking "How do I get a certificate?" or "Is DigiPath free?", or use the Ask a Mentor form for personal help.';

var SEED_ENROLLMENTS = [
  { name: 'Asha K.', email: 'asha.k@example.org', course: 'Everyday Conversations' },
  { name: 'Mohammed I.', email: 'md.imran@example.org', course: 'Stay Safe Online' },
  { name: 'Lakshmi T.', email: 'lakshmi.t@example.org', course: 'Budgeting Basics' },
  { name: 'Ravi S.', email: 'ravi.s@example.org', course: 'Numbers That Work Every Day' }
];

/* ---------------- storage ---------------- */
function loadJSON(key, fallback) { try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; } }
function saveJSON(key, v) { localStorage.setItem(key, JSON.stringify(v)); }

function defaultAuth() {
  return { users: [
    { id: 'u-demo', name: 'Demo Student', email: 'demo@digipath.learn', password: 'demo1234', role: 'student', supporter: false, plan: null },
    { id: 'u-admin', name: 'DigiPath Admin', email: 'admin@digipath.learn', password: 'admin1234', role: 'admin', supporter: false, plan: null }
  ], session: null, roleOverride: null };
}
function loadAuth() { var a = loadJSON(AUTH_KEY, null); if (!a || !a.users) { a = defaultAuth(); saveJSON(AUTH_KEY, a); } return a; }
function defaultState() { return { enrollments: {}, progress: {}, quizResults: [], mentorMessages: [], completions: [], lastLesson: {}, customCourses: [], courseOverrides: {}, deletedIds: [] }; }
function loadState() { var s = loadJSON(STATE_KEY, null); if (!s) { s = defaultState(); saveJSON(STATE_KEY, s); } return s; }

var auth = loadAuth();
var state = loadState();
function persist() { saveJSON(AUTH_KEY, auth); saveJSON(STATE_KEY, state); }
function currentUser() { if (!auth.session) return null; return auth.users.find(function (u) { return u.email === auth.session; }) || null; }
function isAdmin() { var u = currentUser(); return !!((u && u.role === 'admin') || auth.roleOverride === 'admin'); }

function getCourses() {
  var base = SEED_COURSES.filter(function (c) { return state.deletedIds.indexOf(c.id) === -1; }).map(function (c) {
    var o = state.courseOverrides[c.id]; return o ? Object.assign({}, c, o) : c;
  });
  var custom = (state.customCourses || []).filter(function (c) { return state.deletedIds.indexOf(c.id) === -1; });
  return base.concat(custom);
}
function getCourse(id) { return getCourses().find(function (c) { return c.id === id; }) || null; }
function progressFor(email, course) {
  if (!email || !course) return 0;
  var p = (state.progress[email] || {})[course.id] || {};
  var done = Object.keys(p).filter(function (k) { return p[k]; }).length;
  return course.lessons.length ? Math.round((done / course.lessons.length) * 100) : 0;
}
function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (ch) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]; }); }
function todayStr() { return new Date().toISOString().slice(0, 10); }
function streakFor(email) {
  var days = {}; state.completions.forEach(function (c) { if (c.email === email) days[c.date] = true; });
  var streak = 0, d = new Date();
  if (!days[d.toISOString().slice(0, 10)]) d.setDate(d.getDate() - 1);
  while (days[d.toISOString().slice(0, 10)]) { streak++; d.setDate(d.getDate() - 1); }
  return streak;
}

/* ---------------- views ---------------- */
var VIEWS = ['catalog', 'course', 'lesson', 'quiz', 'auth', 'dashboard', 'mentors', 'supporter', 'checkout', 'admin', 'certificate'];
function showView(name) {
  VIEWS.forEach(function (v) { var el = document.getElementById('view-' + v); if (el) el.hidden = v !== name; });
  if (name === 'dashboard') renderDashboard();
  if (name === 'admin') renderAdmin();
  window.scrollTo(0, 0);
}
function toast(text) { var t = document.getElementById('toast'); t.textContent = text; t.hidden = false; setTimeout(function () { t.hidden = true; }, 2600); }

var activeTrack = 'All', searchTerm = '';
function renderCatalog() {
  var grid = document.getElementById('course-grid'); if (!grid) return;
  var courses = getCourses().filter(function (c) {
    return (activeTrack === 'All' || c.track === activeTrack) && (c.title + ' ' + c.track + ' ' + c.description).toLowerCase().indexOf(searchTerm) > -1;
  });
  document.getElementById('catalog-count').textContent = courses.length + ' courses · ' + TRACKS.length + ' tracks · free forever';
  grid.innerHTML = courses.map(function (c) {
    var u = currentUser(); var enrolled = u && (state.enrollments[u.email] || []).indexOf(c.id) > -1;
    var pct = u ? progressFor(u.email, c) : 0;
    return '<article class="card course-card" data-course-id="' + c.id + '" data-track="' + esc(c.track) + '">' +
      '<div class="meta"><span class="chip track">' + esc(c.track) + '</span><span class="chip">' + esc(c.level) + '</span><span class="chip">' + esc(c.duration) + '</span><span class="chip">' + c.lessons.length + ' lessons</span></div>' +
      '<h3>' + esc(c.title) + '</h3><p>' + esc(c.description) + '</p>' +
      (enrolled ? '<div class="progress-wrap"><div class="progress-bar" style="width:' + pct + '%"></div></div><p>' + pct + '% complete</p>' : '') +
      '<div class="card-actions"><button class="btn btn-small view-course-btn" data-id="' + c.id + '" type="button">View course</button>' +
      (enrolled ? '<button class="btn btn-small btn-outline" data-id="' + c.id + '" type="button" disabled>Enrolled ✓</button>' : '<button class="btn btn-small btn-orange enroll-btn" data-id="' + c.id + '" type="button">Enroll free</button>') +
      '</div></article>';
  }).join('');
  grid.querySelectorAll('.view-course-btn').forEach(function (b) { b.addEventListener('click', function () { openCourse(b.getAttribute('data-id')); }); });
  grid.querySelectorAll('.enroll-btn').forEach(function (b) { b.addEventListener('click', function () { enrollIn(b.getAttribute('data-id')); }); });
}

function enrollIn(courseId) {
  var u = currentUser();
  if (!u) { document.getElementById('auth-msg').innerHTML = '<span class="err">Please login or register (free) to enroll. Guests can browse the full catalog.</span>'; showView('auth'); return false; }
  state.enrollments[u.email] = state.enrollments[u.email] || [];
  if (state.enrollments[u.email].indexOf(courseId) === -1) state.enrollments[u.email].push(courseId);
  persist(); toast('Enrolled. Find it in your Dashboard'); renderCatalog(); return true;
}

function openCourse(courseId) {
  var c = getCourse(courseId); if (!c) return;
  var u = currentUser(); var enrolled = u && (state.enrollments[u.email] || []).indexOf(c.id) > -1;
  var prog = (state.progress[(u || {}).email] || {})[c.id] || {};
  var pct = u ? progressFor(u.email, c) : 0;
  document.getElementById('course-detail').innerHTML =
    '<button class="btn btn-small btn-outline" id="back-catalog" type="button">← Catalog</button>' +
    '<div class="kicker" style="margin-top:18px">' + esc(c.track) + '</div><h2 class="display" style="font-size:clamp(2rem,5vw,3.6rem)">' + esc(c.title) + '</h2>' +
    '<div class="meta"><span class="chip">' + esc(c.level) + '</span><span class="chip">' + esc(c.duration) + '</span><span class="chip">Free forever</span></div>' +
    '<p style="color:var(--muted);max-width:65ch">' + esc(c.description) + '</p>' +
    '<div class="two-col"><div class="panel"><h3>What you\'ll learn</h3><ul>' + c.learn.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
    (enrolled ? '<div class="progress-wrap"><div class="progress-bar" style="width:' + pct + '%"></div></div><p>' + pct + '% complete</p>' : '<button class="btn btn-orange enroll-btn-detail" type="button">Enroll free</button>') +
    '<p><button class="btn btn-aqua take-quiz-btn" type="button">Take the course quiz</button></p></div>' +
    '<div class="panel"><h3>Syllabus</h3>' + c.lessons.map(function (l, i) {
      return '<div class="lesson-row"><span>' + (i + 1) + '. ' + esc(l.title) + (prog[i] ? ' <span class="done">✓ complete</span>' : '') + '</span><button class="btn btn-small lesson-btn" data-idx="' + i + '" type="button">' + (prog[i] ? 'Review' : 'Start') + '</button></div>';
    }).join('') + '</div></div>';
  showView('course');
  document.getElementById('back-catalog').addEventListener('click', function () { showView('catalog'); });
  var eb = document.querySelector('.enroll-btn-detail'); if (eb) eb.addEventListener('click', function () { if (enrollIn(c.id)) openCourse(c.id); });
  document.querySelector('.take-quiz-btn').addEventListener('click', function () { openQuiz(c.id); });
  document.querySelectorAll('.lesson-btn').forEach(function (b) { b.addEventListener('click', function () { openLesson(c.id, parseInt(b.getAttribute('data-idx'), 10)); }); });
}

var currentLesson = { courseId: null, idx: 0 };
function openLesson(courseId, idx) {
  var c = getCourse(courseId); if (!c) return;
  var u = currentUser();
  if (!u) { document.getElementById('auth-msg').innerHTML = '<span class="err">Please login or register (free) to open lessons.</span>'; showView('auth'); return; }
  if ((state.enrollments[u.email] || []).indexOf(c.id) === -1) { toast('Enroll free first to start lessons'); openCourse(c.id); return; }
  currentLesson = { courseId: courseId, idx: idx };
  state.lastLesson[u.email] = state.lastLesson[u.email] || {}; state.lastLesson[u.email][c.id] = idx; persist();
  var l = c.lessons[idx]; var done = ((state.progress[u.email] || {})[c.id] || {})[idx];
  var paras = l.body.split('\n\n').map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('');
  document.getElementById('lesson-detail').innerHTML =
    '<button class="btn btn-small btn-outline" id="back-course" type="button">← ' + esc(c.title) + '</button>' +
    '<div class="kicker" style="margin-top:18px">Lesson ' + (idx + 1) + ' of ' + c.lessons.length + ' · ' + esc(c.track) + '</div>' +
    '<h2 class="display" id="lesson-title" style="font-size:clamp(1.8rem,4.5vw,3rem)">' + esc(l.title) + '</h2>' +
    '<div class="panel" id="lesson-body">' + paras + '<h3>Step by step</h3><ol class="steps">' + l.steps.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ol></div>' +
    '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:18px">' +
    '<button class="btn btn-outline" id="prev-lesson-btn" type="button" ' + (idx === 0 ? 'disabled' : '') + '>← Previous lesson</button>' +
    '<button class="btn btn-orange" id="mark-complete-btn" type="button">' + (done ? '✓ Completed' : 'Mark complete') + '</button>' +
    '<button class="btn btn-outline" id="next-lesson-btn" type="button" ' + (idx >= c.lessons.length - 1 ? 'disabled' : '') + '>Next lesson →</button>' +
    '<button class="btn btn-aqua" id="lesson-quiz-btn" type="button">Take course quiz</button></div>' +
    '<p id="lesson-progress-note">Course progress: ' + progressFor(u.email, c) + '%</p>';
  showView('lesson');
  document.getElementById('back-course').addEventListener('click', function () { openCourse(c.id); });
  document.getElementById('mark-complete-btn').addEventListener('click', function () { completeLesson(courseId, idx); });
  var pv = document.getElementById('prev-lesson-btn'); if (pv) pv.addEventListener('click', function () { openLesson(courseId, idx - 1); });
  var nx = document.getElementById('next-lesson-btn'); if (nx) nx.addEventListener('click', function () { openLesson(courseId, idx + 1); });
  document.getElementById('lesson-quiz-btn').addEventListener('click', function () { openQuiz(courseId); });
}
function completeLesson(courseId, idx) {
  var u = currentUser(); if (!u) return false;
  state.progress[u.email] = state.progress[u.email] || {}; state.progress[u.email][courseId] = state.progress[u.email][courseId] || {};
  if (!state.progress[u.email][courseId][idx]) {
    state.progress[u.email][courseId][idx] = true;
    state.completions.push({ email: u.email, courseId: courseId, lessonIdx: idx, date: todayStr() });
  }
  persist(); openLesson(courseId, idx); toast('Lesson complete. Progress saved'); return true;
}

function openQuiz(courseId) {
  var c = getCourse(courseId); if (!c) return;
  document.getElementById('quiz-detail').innerHTML =
    '<button class="btn btn-small btn-outline" id="back-course2" type="button">← ' + esc(c.title) + '</button>' +
    '<h2 class="display" style="font-size:clamp(1.8rem,4.5vw,3rem);margin-top:16px">' + esc(c.title) + ': Quiz</h2>' +
    '<form id="quiz-form">' + c.quiz.map(function (q, qi) {
      return '<fieldset class="quiz-q"><p>' + (qi + 1) + '. ' + esc(q.q) + '</p>' + q.options.map(function (o, oi) {
        return '<label><input type="radio" name="q' + qi + '" value="' + oi + '" /> ' + esc(o) + '</label>';
      }).join('') + '</fieldset>';
    }).join('') + '<button class="btn btn-orange" id="quiz-submit" type="submit">Submit quiz</button></form>' +
    '<div id="quiz-result" aria-live="polite"></div>';
  showView('quiz');
  document.getElementById('back-course2').addEventListener('click', function () { openCourse(c.id); });
  document.getElementById('quiz-form').addEventListener('submit', function (e) { e.preventDefault(); submitQuiz(c); });
}
function gradeQuiz(course, answers) {
  var score = 0; course.quiz.forEach(function (q, i) { if (answers[i] === q.answer) score++; });
  return { score: score, total: course.quiz.length, pct: Math.round((score / course.quiz.length) * 100) };
}
function submitQuiz(course) {
  var answers = course.quiz.map(function (q, i) { var r = document.querySelector('input[name="q' + i + '"]:checked'); return r ? parseInt(r.value, 10) : -1; });
  var res = gradeQuiz(course, answers);
  var u = currentUser();
  var record = { email: u ? u.email : 'guest', courseId: course.id, courseTitle: course.title, score: res.score, total: res.total, pct: res.pct, date: todayStr() };
  state.quizResults.push(record); persist();
  document.getElementById('quiz-result').innerHTML = '<div class="panel" style="margin-top:18px"><h3 id="quiz-score">You scored ' + res.score + ' / ' + res.total + ': ' + res.pct + '%</h3><p>' + (res.pct === 100 ? 'Perfect score. Outstanding!' : res.pct >= 60 ? 'Good work. Review the lessons and try again to hit 100%.' : 'Keep going. Re-read the lessons and try again. Learning is free forever.') + '</p><p>Result saved to your history' + (u ? ' (see Dashboard)' : ' as guest') + '.</p></div>';
  return res;
}

/* ---------------- auth ---------------- */
function renderAuthArea() {
  var area = document.getElementById('auth-area'); var u = currentUser();
  if (!u) { area.innerHTML = '<button class="btn btn-orange btn-small" id="nav-login-btn" type="button">Login / Register</button>'; document.getElementById('nav-login-btn').addEventListener('click', function () { showView('auth'); }); }
  else {
    area.innerHTML = '<span id="nav-user">Hi, ' + esc(u.name) + (u.supporter ? ' <span class="badge-supporter" id="nav-supporter-badge">' + esc(u.plan || 'Supporter') + '</span>' : '') + (isAdmin() ? ' <span class="chip">Admin</span>' : '') + '</span> <button class="btn btn-small btn-outline" id="logout-btn" type="button">Logout</button>';
    document.getElementById('logout-btn').addEventListener('click', function () { auth.session = null; auth.roleOverride = null; persist(); renderAuthArea(); renderCatalog(); toast('Logged out'); showView('catalog'); });
  }
}
function doLogin(email, password) {
  var u = auth.users.find(function (x) { return x.email === email; });
  if (!u || u.password !== password) return null;
  auth.session = u.email; persist(); return u;
}
function doRegister(name, email, password) {
  if (auth.users.some(function (x) { return x.email === email; })) return null;
  var u = { id: 'u-' + Date.now(), name: name, email: email, password: password, role: 'student', supporter: false, plan: null };
  auth.users.push(u); auth.session = u.email; persist(); return u;
}

/* ---------------- dashboard ---------------- */
function renderDashboard() {
  var box = document.getElementById('dashboard-content'); var u = currentUser();
  if (!u) { box.innerHTML = '<h2 class="display">Student Dashboard</h2><p>Please <a href="#" id="dash-login-link">login</a> to see your courses, progress and quiz history.</p>'; var l = document.getElementById('dash-login-link'); if (l) l.addEventListener('click', function (e) { e.preventDefault(); showView('auth'); }); return; }
  var enrolledIds = state.enrollments[u.email] || [];
  var myCourses = enrolledIds.map(getCourse).filter(Boolean);
  var lessonsDone = state.completions.filter(function (x) { return x.email === u.email; }).length;
  var myQuizzes = state.quizResults.filter(function (x) { return x.email === u.email; });
  var myMsgs = state.mentorMessages.filter(function (x) { return x.email === u.email; });
  var continueHtml = '<p>No course in progress yet. Pick one from the catalog.</p>';
  var lastMap = state.lastLesson[u.email] || {};
  for (var cid in lastMap) { var cc = getCourse(cid); if (cc && progressFor(u.email, cc) < 100) { var li = lastMap[cid]; if (((state.progress[u.email] || {})[cid] || {})[li]) li = Math.min(li + 1, cc.lessons.length - 1); continueHtml = '<p>Continue <strong>' + esc(cc.title) + '</strong> at Lesson ' + (li + 1) + ': ' + esc(cc.lessons[li].title) + '</p><button class="btn btn-orange continue-btn" data-course="' + cid + '" data-idx="' + li + '" type="button">Continue learning</button>'; break; } }
  box.innerHTML =
    '<div class="kicker">Student dashboard</div><h2 class="display" style="font-size:clamp(2rem,5vw,3.4rem)">Welcome, ' + esc(u.name) + '</h2>' +
    (u.supporter ? '<p><span class="badge-supporter" id="supporter-badge">' + esc(u.plan || 'Supporter') + ', thank you for sponsoring a learner</span></p>' : '<p style="color:var(--muted)">Not a supporter yet. Learning is free either way. <a href="#" id="dash-supporter-link">See supporter plans</a></p>') +
    '<div class="stats-row"><div class="stat-tile"><strong id="stat-courses">' + myCourses.length + '</strong>Courses enrolled</div>' +
    '<div class="stat-tile"><strong id="stat-lessons">' + lessonsDone + '</strong>Lessons completed</div>' +
    '<div class="stat-tile"><strong id="stat-streak">' + streakFor(u.email) + '</strong>Day streak</div>' +
    '<div class="stat-tile"><strong id="stat-quizzes">' + myQuizzes.length + '</strong>Quizzes taken</div></div>' +
    '<div class="panel"><h3>Continue learning</h3><div id="continue-learning">' + continueHtml + '</div></div>' +
    '<h3 style="margin-top:28px">My courses</h3><div class="grid" id="my-courses">' + (myCourses.length ? myCourses.map(function (c) {
      var pct = progressFor(u.email, c);
      return '<article class="card dash-course" data-course-id="' + c.id + '"><h3>' + esc(c.title) + '</h3><p>' + esc(c.track) + ' · ' + esc(c.level) + '</p><div class="progress-wrap"><div class="progress-bar" style="width:' + pct + '%"></div></div><p class="dash-progress">' + pct + '% complete</p><div class="card-actions"><button class="btn btn-small open-course-btn" data-id="' + c.id + '" type="button">Open course</button>' + (pct === 100 ? '<button class="btn btn-small btn-aqua cert-btn" data-id="' + c.id + '" type="button">View certificate</button>' : '') + '</div></article>';
    }).join('') : '<p>No enrollments yet.</p>') + '</div>' +
    '<div class="two-col" style="margin-top:24px"><div class="panel"><h3>Quiz score history</h3><ul id="quiz-history">' + (myQuizzes.length ? myQuizzes.map(function (r) { return '<li>' + esc(r.courseTitle || r.courseId) + ', ' + r.score + '/' + r.total + ' (' + r.pct + '%) · ' + esc(r.date) + '</li>'; }).join('') : '<li>No quizzes yet.</li>') + '</ul></div>' +
    '<div class="panel"><h3>Mentor inbox</h3><div id="mentor-inbox">' + (myMsgs.length ? myMsgs.map(function (m) { return '<div style="border-top:1px solid var(--line);padding:10px 0"><p><strong>You → ' + esc(m.mentorName) + ':</strong> ' + esc(m.text) + '</p><p><strong>' + esc(m.mentorName) + ' replied:</strong> ' + esc(m.reply) + '</p></div>'; }).join('') : '<p>No mentor messages yet. Ask one from the Mentors view.</p>') + '</div></div></div>';
  box.querySelectorAll('.open-course-btn').forEach(function (b) { b.addEventListener('click', function () { openCourse(b.getAttribute('data-id')); }); });
  box.querySelectorAll('.cert-btn').forEach(function (b) { b.addEventListener('click', function () { openCertificate(b.getAttribute('data-id')); }); });
  var cb = box.querySelector('.continue-btn'); if (cb) cb.addEventListener('click', function () { openLesson(cb.getAttribute('data-course'), parseInt(cb.getAttribute('data-idx'), 10)); });
  var sl = document.getElementById('dash-supporter-link'); if (sl) sl.addEventListener('click', function (e) { e.preventDefault(); showView('supporter'); });
}
function openCertificate(courseId) {
  var u = currentUser(); var c = getCourse(courseId); if (!u || !c) return;
  document.getElementById('certificate-area').innerHTML =
    '<div class="cert" id="certificate"><p class="kicker" style="justify-content:center">DigiPath — an initiative by Crevanta Ventures</p><h2>Certificate of Completion</h2><p>This certifies that</p><p class="display" style="font-size:2.2rem;color:#111">' + esc(u.name) + '</p><p>has completed 100% of the course</p><p style="font-size:1.3rem"><strong>' + esc(c.title) + '</strong></p><p>' + esc(c.track) + ' · ' + esc(c.level) + ' · ' + esc(todayStr()) + '</p><p>Signed: Vikranth Reddy, DigiPath Lead &amp; Founder/CEO, Crevanta Ventures</p></div>' +
    '<div class="no-print" style="margin-top:16px;display:flex;gap:10px"><button class="btn btn-orange" id="print-cert-btn" type="button">Print certificate</button><button class="btn btn-outline" id="cert-back" type="button" style="color:var(--ink)">Back to dashboard</button></div>';
  showView('certificate');
  document.getElementById('print-cert-btn').addEventListener('click', function () { window.print(); });
  document.getElementById('cert-back').addEventListener('click', function () { showView('dashboard'); });
}

/* ---------------- mentors & chatbot ---------------- */
function renderMentors() {
  document.getElementById('mentor-grid').innerHTML = MENTORS.map(function (m) {
    return '<article class="card mentor-card" data-mentor-id="' + m.id + '"><div class="meta"><span class="chip track">' + esc(m.track) + '</span></div><h3>' + esc(m.name) + '</h3><p>' + esc(m.blurb) + '</p></article>';
  }).join('');
  document.getElementById('mentor-select').innerHTML = MENTORS.map(function (m) { return '<option value="' + m.id + '">' + esc(m.name) + ': ' + esc(m.track) + '</option>'; }).join('');
}
function sendMentorMessage(mentorId, text) {
  var u = currentUser(); if (!u) return null;
  var mentor = MENTORS.find(function (m) { return m.id === mentorId; }) || MENTORS[0];
  var msg = { email: u.email, mentorId: mentor.id, mentorName: mentor.name, text: text, date: todayStr(), reply: 'Thank you for your question! This is ' + mentor.name + ' (' + mentor.track + '). Keep going lesson by lesson, practise the "Try this today" step after each lesson, and write back with what felt hard. We will work on it together in your next message.' };
  state.mentorMessages.push(msg); persist(); return msg;
}
function chatAnswer(text) {
  var t = ' ' + String(text || '').toLowerCase() + ' ';
  for (var i = 0; i < FAQS.length; i++) { for (var j = 0; j < FAQS[i].keys.length; j++) { if (t.indexOf(FAQS[i].keys[j]) > -1) return FAQS[i].a; } }
  return FALLBACK_ANSWER;
}

/* ---------------- supporter checkout ---------------- */
var pendingPlan = null;
function startCheckout(plan, price) {
  var u = currentUser();
  if (!u) { document.getElementById('auth-msg').innerHTML = '<span class="err">Please login first so the supporter badge can be saved on your account.</span>'; showView('auth'); return; }
  pendingPlan = { plan: plan, price: price };
  document.getElementById('checkout-plan').textContent = plan + ': ' + price + ' (sponsor a learner)';
  document.getElementById('checkout-success').hidden = true;
  showView('checkout');
}
function completeCheckout() {
  var u = currentUser(); if (!u || !pendingPlan) return false;
  u.supporter = true; u.plan = pendingPlan.plan; persist();
  document.getElementById('checkout-success-plan').textContent = pendingPlan.plan;
  document.getElementById('checkout-success').hidden = false;
  renderAuthArea(); return true;
}

/* ---------------- admin ---------------- */
function renderAdmin() {
  var box = document.getElementById('admin-content');
  if (!isAdmin()) {
    box.innerHTML = '<h2 class="display">Admin</h2><p>Admin is demo-grade. Login with the admin demo account (admin@digipath.learn / admin1234), or use the role toggle:</p><button class="btn btn-orange" id="admin-toggle" type="button">Toggle role: view as Admin (demo)</button>';
    document.getElementById('admin-toggle').addEventListener('click', function () { auth.roleOverride = auth.roleOverride === 'admin' ? null : 'admin'; persist(); renderAuthArea(); renderAdmin(); });
    return;
  }
  var courses = getCourses();
  var totalLessonsDone = state.completions.length;
  var learners = Object.keys(state.enrollments).length + SEED_ENROLLMENTS.length;
  var supporters = auth.users.filter(function (x) { return x.supporter; });
  var enrollRows = [];
  Object.keys(state.enrollments).forEach(function (email) { state.enrollments[email].forEach(function (cid) { var usr = auth.users.find(function (x) { return x.email === email; }); var cc = getCourse(cid); enrollRows.push({ name: usr ? usr.name : email, email: email, course: cc ? cc.title : cid }); }); });
  SEED_ENROLLMENTS.forEach(function (r) { enrollRows.push(r); });
  box.innerHTML =
    '<div class="kicker">Admin · demo</div><h2 class="display" style="font-size:clamp(2rem,5vw,3.4rem)">Impact &amp; management</h2>' +
    '<div class="stats-row" id="admin-stats"><div class="stat-tile"><strong id="admin-stat-learners">' + learners + '</strong>Learners enrolled</div><div class="stat-tile"><strong id="admin-stat-lessons">' + totalLessonsDone + '</strong>Lessons completed</div><div class="stat-tile"><strong id="admin-stat-courses">' + courses.length + '</strong>Courses live</div><div class="stat-tile"><strong>' + supporters.length + '</strong>Supporters</div></div>' +
    '<div class="panel"><h3>Add / edit a course</h3><form id="admin-course-form"><input type="hidden" id="admin-editing-id" value="" />' +
    '<div class="field"><label for="admin-title">Title</label><input id="admin-title" required /></div>' +
    '<div class="field"><label for="admin-track">Track</label><select id="admin-track">' + TRACKS.map(function (t) { return '<option>' + esc(t.name) + '</option>'; }).join('') + '</select></div>' +
    '<div class="field"><label for="admin-level">Level</label><input id="admin-level" value="Beginner" required /></div>' +
    '<div class="field"><label for="admin-duration">Duration</label><input id="admin-duration" value="3 weeks" required /></div>' +
    '<div class="field"><label for="admin-desc">Description</label><textarea id="admin-desc" rows="2" required></textarea></div>' +
    '<button class="btn btn-orange" type="submit">Save course</button> <button class="btn btn-outline" type="button" id="admin-form-reset" style="color:var(--ink)">Clear</button></form></div>' +
    '<div class="panel" style="margin-top:18px"><h3>Courses</h3><div id="admin-course-list">' + courses.map(function (c) { return '<div class="lesson-row"><span>' + esc(c.title) + ' · ' + esc(c.track) + '</span><span><button class="btn btn-small admin-edit-btn" data-id="' + c.id + '" type="button">Edit</button> <button class="btn btn-small btn-outline admin-delete-btn" data-id="' + c.id + '" type="button" style="color:var(--ink)">Delete</button></span></div>'; }).join('') + '</div></div>' +
    '<div class="two-col" style="margin-top:18px"><div class="panel"><h3>Enrollments</h3><table id="admin-enrollments"><tr><th>Learner</th><th>Email</th><th>Course</th></tr>' + enrollRows.map(function (r) { return '<tr><td>' + esc(r.name) + '</td><td>' + esc(r.email) + '</td><td>' + esc(r.course) + '</td></tr>'; }).join('') + '</table></div>' +
    '<div class="panel"><h3>Supporters</h3><ul id="admin-supporters">' + (supporters.length ? supporters.map(function (s) { return '<li>' + esc(s.name) + ' (' + esc(s.email) + '), ' + esc(s.plan || 'Supporter') + '</li>'; }).join('') : '<li>No supporters yet.</li>') + '</ul><button class="btn btn-small btn-outline" id="admin-toggle-off" type="button" style="color:var(--ink)">Role toggle: back to student view</button></div></div>';
  document.getElementById('admin-course-form').addEventListener('submit', function (e) { e.preventDefault(); adminSaveCourse(); });
  document.getElementById('admin-form-reset').addEventListener('click', function () { document.getElementById('admin-course-form').reset(); document.getElementById('admin-editing-id').value = ''; });
  var tg = document.getElementById('admin-toggle-off'); if (tg) tg.addEventListener('click', function () { auth.roleOverride = null; persist(); renderAuthArea(); renderAdmin(); });
  box.querySelectorAll('.admin-edit-btn').forEach(function (b) { b.addEventListener('click', function () { var c = getCourse(b.getAttribute('data-id')); if (!c) return; document.getElementById('admin-editing-id').value = c.id; document.getElementById('admin-title').value = c.title; document.getElementById('admin-track').value = c.track; document.getElementById('admin-level').value = c.level; document.getElementById('admin-duration').value = c.duration; document.getElementById('admin-desc').value = c.description; window.scrollTo(0, 0); }); });
  box.querySelectorAll('.admin-delete-btn').forEach(function (b) { b.addEventListener('click', function () { adminDeleteCourse(b.getAttribute('data-id')); }); });
}
function adminSaveCourse() {
  var id = document.getElementById('admin-editing-id').value;
  var data = { title: document.getElementById('admin-title').value.trim(), track: document.getElementById('admin-track').value, level: document.getElementById('admin-level').value.trim(), duration: document.getElementById('admin-duration').value.trim(), description: document.getElementById('admin-desc').value.trim() };
  if (!data.title) return null;
  if (id) {
    var existing = getCourse(id);
    if (existing && state.customCourses.some(function (c) { return c.id === id; })) { var cc = state.customCourses.find(function (c) { return c.id === id; }); Object.assign(cc, data); }
    else { state.courseOverrides[id] = Object.assign({}, state.courseOverrides[id] || {}, data); }
  } else {
    id = 'custom-' + Date.now();
    state.customCourses.push({ id: id, track: data.track, title: data.title, level: data.level, duration: data.duration, description: data.description, learn: ['Understand the basics of ' + data.title, 'Practise with guided steps', 'Apply it in daily life'], lessons: [L('Getting started with ' + data.title, 'This first lesson introduces ' + data.title + ' in simple language, with one idea at a time and a short practice step. Work slowly and repeat the examples out loud.', ['Read the lesson once fully.', 'Repeat the example in your own words.', 'Do the practice step below.'], 'Spend ten minutes practising the first example today.')], quiz: [Q('What is the best way to start learning ' + data.title + '?', ['Skip all lessons', 'Start with lesson 1 and practise daily', 'Only take the quiz', 'Wait a year'], 1)] });
  }
  persist(); renderAdmin(); renderCatalog(); toast('Course saved'); return id;
}
function adminDeleteCourse(id) { if (state.deletedIds.indexOf(id) === -1) state.deletedIds.push(id); persist(); renderAdmin(); renderCatalog(); }

/* ---------------- init & events ---------------- */
function init() {
  renderAuthArea(); renderCatalog(); renderMentors();
  document.querySelectorAll('[data-nav]').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); showView(a.getAttribute('data-nav')); }); });
  document.querySelectorAll('[data-track-filter]').forEach(function (b) { b.addEventListener('click', function () { activeTrack = b.getAttribute('data-track-filter'); document.querySelectorAll('[data-track-filter]').forEach(function (x) { x.classList.toggle('active', x === b); }); renderCatalog(); }); });
  document.getElementById('catalog-search').addEventListener('input', function (e) { searchTerm = e.target.value.toLowerCase(); renderCatalog(); });
  document.getElementById('login-form').addEventListener('submit', function (e) { e.preventDefault(); var u = doLogin(document.getElementById('login-email').value.trim(), document.getElementById('login-password').value); var m = document.getElementById('auth-msg'); if (!u) { m.innerHTML = '<span class="err">Login failed. Check email and password, or use the demo account.</span>'; return; } m.innerHTML = '<span class="msg">Welcome back, ' + esc(u.name) + '.</span>'; renderAuthArea(); renderCatalog(); showView('dashboard'); });
  document.getElementById('register-form').addEventListener('submit', function (e) { e.preventDefault(); var u = doRegister(document.getElementById('register-name').value.trim(), document.getElementById('register-email').value.trim(), document.getElementById('register-password').value); var m = document.getElementById('auth-msg'); if (!u) { m.innerHTML = '<span class="err">That email is already registered. Please login.</span>'; return; } m.innerHTML = '<span class="msg">Account created. Welcome, ' + esc(u.name) + '!</span>'; renderAuthArea(); renderCatalog(); showView('dashboard'); });
  document.getElementById('mentor-form').addEventListener('submit', function (e) { e.preventDefault(); var u = currentUser(); var fm = document.getElementById('mentor-form-msg'); if (!u) { fm.innerHTML = '<span class="err">Please login to ask a mentor.</span>'; showView('auth'); return; } var msg = sendMentorMessage(document.getElementById('mentor-select').value, document.getElementById('mentor-message').value.trim()); if (msg) { fm.innerHTML = '<span class="msg">Sent to ' + esc(msg.mentorName) + '. See the reply thread in your Dashboard mentor inbox.</span>'; document.getElementById('mentor-message').value = ''; } });
  document.querySelectorAll('.supporter-plan-btn').forEach(function (b) { b.addEventListener('click', function () { startCheckout(b.getAttribute('data-plan'), b.getAttribute('data-price')); }); });
  document.getElementById('checkout-form').addEventListener('submit', function (e) { e.preventDefault(); completeCheckout(); });
  document.getElementById('checkout-to-dashboard').addEventListener('click', function () { showView('dashboard'); });
  var panel = document.getElementById('chatbot-panel'), toggle = document.getElementById('chatbot-toggle');
  toggle.addEventListener('click', function () { var open = panel.hidden; panel.hidden = !open; toggle.setAttribute('aria-expanded', String(open)); if (open && !document.getElementById('chatbot-messages').children.length) { addChat('bot', 'Hi! I am the DigiPath help assistant. Ask me about courses, cost, certificates, mentors or quizzes.'); } });
  document.getElementById('chatbot-form').addEventListener('submit', function (e) { e.preventDefault(); var input = document.getElementById('chatbot-input'); var text = input.value.trim(); if (!text) return; addChat('user', text); addChat('bot', chatAnswer(text)); input.value = ''; });
  function addChat(who, text) { var d = document.createElement('div'); d.className = 'chat-msg ' + who; d.textContent = text; document.getElementById('chatbot-messages').appendChild(d); }
}

window.DigiPathApp = { getCourses: getCourses, getCourse: getCourse, getState: function () { return state; }, getAuth: function () { return auth; }, currentUser: currentUser, isAdmin: isAdmin, enrollIn: enrollIn, completeLesson: completeLesson, gradeQuiz: gradeQuiz, doLogin: doLogin, doRegister: doRegister, sendMentorMessage: sendMentorMessage, chatAnswer: chatAnswer, completeCheckout: completeCheckout, startCheckout: startCheckout, adminSaveCourse: adminSaveCourse, adminDeleteCourse: adminDeleteCourse, showView: showView, openCourse: openCourse, openLesson: openLesson, openQuiz: openQuiz, progressFor: progressFor, TRACKS: TRACKS, MENTORS: MENTORS, AUTH_KEY: AUTH_KEY, STATE_KEY: STATE_KEY };

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
