// Static mock data (no backend). Content is drawn from the real interview
// so the UI reads like a genuine Fireflies workspace rather than lorem.

export const meeting = {
  title: "Philson K Philip and Venu Madhav Ravi",
  channel: "My Meetings",
  date: "Jun 09 2026, 3:01 PM",
  language: "English (US)",
  source: "Google Meet",
  duration: "01:15:53",
  durationSeconds: 4553,
  host: { name: "Venu Madhav Ravi" },
  otherCount: 1,
};

export const participants = [
  { name: "Venu Madhav Ravi", role: "Host" },
  { name: "Philson Philip", role: "Guest" },
];

export const summary = [
  {
    label: "Candidate experience",
    text: "6.5 years at BigBinary focused on UI/UX and building component libraries across 20+ products.",
  },
  {
    label: "Design philosophy",
    text: "Leads with customer feedback for UX improvements; favors collaborative design reviews and mentoring junior engineers.",
  },
  {
    label: "Product preferences",
    text: "Likes clean, effective products such as Calendly and Stripe; tracks competitors like Marvin AI and Zoom.",
  },
  {
    label: "AI tools usage",
    text: "Uses Claude and Figma daily, while keeping human oversight on AI-driven design reviews.",
  },
  {
    label: "Working style",
    text: "Balanced remote routine, async-first communication, strong team collaboration and user-focused hiring.",
  },
];

export const notes = [
  {
    heading: "Candidate background",
    items: [
      { text: "Bangalore-based, extensive remote experience.", at: "04:07" },
      { text: "6.5 years at BigBinary on the Neeto suite, UI/UX focus.", at: "04:30" },
      { text: "Early interest in software and design from 4th grade.", at: "06:38" },
      { text: "Started as a designer, moved into front-end engineering.", at: "07:31" },
    ],
  },
  {
    heading: "Systems & impact",
    items: [
      { text: "Built NeetoUI, used across 20+ products.", at: "08:08" },
      { text: "Cut frontend development time by ~70%.", at: "09:10" },
      { text: "Values customer feedback to drive UX decisions.", at: "16:00" },
    ],
  },
];

// Transcript turns. Consecutive turns by the same speaker are grouped in the
// UI so the speaker header is not repeated for every line.
export const transcript = [
  { id: 1, speaker: "Venu Madhav Ravi", at: "00:01", text: "Hello. Hi. Yeah, how are you?" },
  { id: 2, speaker: "Philson Philip", at: "00:04", text: "Yeah, I'm doing great." },
  {
    id: 3,
    speaker: "Venu Madhav Ravi",
    at: "00:05",
    text: "Just a second, let me get our credit side. Okay, good. Thank you for joining. And is it Philson? Am I pronouncing your name right?",
  },
  { id: 4, speaker: "Philson Philip", at: "00:17", text: "Yeah, my name is." },
  {
    id: 5,
    speaker: "Venu Madhav Ravi",
    at: "00:17",
    text: "Fantastic. So before we start, I want to bring your attention to the third participant in the call, Fred. Our bot has just joined and Fred is going to listen to the call. At the end, both of us get the summary and the transcript. Are you okay with Fred being on the call?",
  },
  {
    id: 6,
    speaker: "Philson Philip",
    at: "00:35",
    text: "Totally. Yeah. I used this tool in my previous company during Zoom meetings. We have used Fireflies.",
  },
  { id: 7, speaker: "Venu Madhav Ravi", at: "00:48", text: "Got it. Thank you. Welcome. So Philson, where are you calling from today?" },
  { id: 8, speaker: "Philson Philip", at: "00:54", text: "Yeah, I'm calling from Bangalore." },
  { id: 9, speaker: "Venu Madhav Ravi", at: "00:55", text: "You're in Bangalore? I'm calling from Hyderabad, just an hour away." },
  {
    id: 10,
    speaker: "Philson Philip",
    at: "04:07",
    text: "For the past six and a half years I've been working remotely. My first company was a startup we built in college, called I/O Developers.",
  },
  {
    id: 11,
    speaker: "Philson Philip",
    at: "04:40",
    text: "It was a tool similar to Typeform, a survey platform. After about a year there I moved to a consulting company, BigBinary, and worked on the Neeto suite — 20-plus products.",
  },
  {
    id: 12,
    speaker: "Venu Madhav Ravi",
    at: "10:03",
    text: "So your undergrad was computer science, and you went mostly into UI/UX. How did you get interested in design out of a CS background?",
  },
  {
    id: 13,
    speaker: "Philson Philip",
    at: "10:27",
    text: "I had a natural interest in drawing and creating something new. Building new UIs or animations gives me satisfaction, so I leaned into design during college.",
  },
  {
    id: 14,
    speaker: "Philson Philip",
    at: "13:23",
    text: "I was on the initial team at SurveySparrow. It started chat-based, then turned into a survey platform similar to Typeform, because at that time the chat-based idea was not that popular.",
    highlight: true,
  },
  {
    id: 15,
    speaker: "Philson Philip",
    at: "14:14",
    text: "There are a lot of usability issues in Typeform. The onboarding and the results view felt clearer in SurveySparrow.",
  },
];

export const insights = {
  sentiments: [
    { label: "Positive", value: 50, tone: "success" },
    { label: "Neutral", value: 49, tone: "info" },
    { label: "Negative", value: 2, tone: "danger" },
  ],
  filters: [
    { label: "Questions", count: 107 },
    { label: "Metrics", count: 7 },
    { label: "Tasks", count: 30 },
    { label: "Date & time", count: 2 },
  ],
  talktime: [
    { name: "Philson Philip", wpm: 175, pct: 69 },
    { name: "Venu Madhav Ravi", wpm: 250, pct: 31 },
  ],
};
