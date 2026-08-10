export const SITE = {
  name: "Technical Journals",
  tagline: "Journal Hosting Platform",
  subtagline: "Exclusive to Universities",
  url: "https://www.technicaljournals.org",
  email: "info@technicaljournals.org",
  supportEmail: "support@technicaljournals.org",
  phone: "+44 20 7946 0958",
  address: "71-75 Shelton Street, Covent Garden, London WC2H 9JQ, United Kingdom",
  hours: "Mon - Fri: 9:00 AM - 6:00 PM (GMT)",
  social: {
    facebook: "https://facebook.com/technicaljournals",
    linkedin: "https://linkedin.com/company/technicaljournals",
    twitter: "https://twitter.com/technicaljournals",
    youtube: "https://youtube.com/technicaljournals",
  },
};

export const STATS = [
  { label: "University Journals", sub: "Hosted", value: "100+", icon: "BookOpen", color: "text-blue-600 bg-blue-100" },
  { label: "Articles Published", sub: "High Quality Research", value: "10,000+", icon: "FileText", color: "text-green-600 bg-green-100" },
  { label: "Countries", sub: "Worldwide", value: "50+", icon: "Globe2", color: "text-orange-600 bg-orange-100" },
  { label: "Universities", sub: "Trust Us", value: "500+", icon: "Landmark", color: "text-purple-600 bg-purple-100" },
  { label: "Uptime & Reliable", sub: "Performance", value: "99.9%", icon: "ShieldCheck", color: "text-blue-600 bg-blue-100" },
];

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Journals", to: "/journals" },
  { label: "Conferences", to: "/conferences" },
  { label: "Services", to: "/services" },
  { label: "For Universities", to: "/for-universities" },
  
  { label: "Contact", to: "/contact" },
];

export const FOOTER_LINKS = {
  quickLinks: [
    { label: "Journals", to: "/journals" },
    { label: "Conferences", to: "/conferences" },
    { label: "Services", to: "/services" },
    { label: "For Universities", to: "/for-universities" },
    { label: "About Us", to: "/about" },
    { label: "Contact Us", to: "/contact" },
  ],
  resources: [
    { label: "Author Guidelines", to: "/author-guidelines" },
    { label: "Review Process", to: "/review-process" },
    { label: "Publication Ethics", to: "/publication-ethics" },
    { label: "Indexing & Abstracting", to: "/indexing" },
    { label: "FAQs", to: "/faq" },
    { label: "Blog", to: "/blog" },
  ],
  support: [
    { label: "Help Center", to: "/help-center" },
    { label: "Contact Us", to: "/contact" },
    { label: "Terms of Use", to: "/terms" },
    { label: "Privacy Policy", to: "/privacy-policy" },
  ],
};

export const UNIVERSITIES = [
  { name: "University of Oxford", country: "United Kingdom", journals: 12, abbr: "OXFORD", sub: "" },
  { name: "National University of Singapore", country: "Singapore", journals: 8, abbr: "NUS", sub: "National University of Singapore" },
  { name: "The University of Melbourne", country: "Australia", journals: 9, abbr: "MELBOURNE", sub: "" },
  { name: "University of Toronto", country: "Canada", journals: 15, abbr: "TORONTO", sub: "" },
  { name: "Technical University of Munich", country: "Germany", journals: 7, abbr: "TUM", sub: "TECHNISCHE UNIVERSITÄT" },
  { name: "University of Cape Town", country: "South Africa", journals: 6, abbr: "CAPE TOWN", sub: "" },
  { name: "University of Sydney", country: "Australia", journals: 5, abbr: "SYDNEY", sub: "" },
  { name: "King's College London", country: "United Kingdom", journals: 7, abbr: "KING'S", sub: "College London" },
];

export const JOURNALS = [
  { id: "int-j-computer-science", title: "International Journal of Computer Science and Engineering", field: "Computer Science", issn: "2454-9940", index: "Scopus", freq: "Quarterly", color: "from-sky-900 to-slate-900", icon: "Cpu" },
  { id: "j-environmental-studies", title: "Journal of Environmental Studies", field: "Environmental Science", issn: "2455-8821", index: "Scopus", freq: "Bi-Monthly", color: "from-green-800 to-green-950", icon: "Leaf" },
  { id: "j-electrical-electronics", title: "Journal of Electrical and Electronics Engineering", field: "Electrical Engineering", issn: "2454-4782", index: "Scopus", freq: "Quarterly", color: "from-amber-700 to-orange-950", icon: "Zap" },
  { id: "int-j-mechanical-engineering", title: "International Journal of Mechanical Engineering", field: "Mechanical Engineering", issn: "2456-1290", index: "WoS", freq: "Bi-Monthly", color: "from-red-800 to-red-950", icon: "Cog" },
  { id: "j-advanced-materials-research", title: "Journal of Advanced Materials Research", field: "Materials Science", issn: "2455-5999", index: "Scopus", freq: "Quarterly", color: "from-violet-800 to-purple-950", icon: "Atom" },
  { id: "int-j-biotechnology-research", title: "International Journal of Biotechnology Research", field: "Biotechnology", issn: "2456-7741", index: "UGC", freq: "Bi-Monthly", color: "from-cyan-800 to-blue-950", icon: "Dna" },
  { id: "j-information-technology-systems", title: "Journal of Information Technology and Systems", field: "Information Technology", issn: "2455-0300", index: "Scopus", freq: "Quarterly", color: "from-slate-800 to-slate-950", icon: "Network" },
  { id: "int-j-civil-engineering", title: "International Journal of Civil Engineering", field: "Civil Engineering", issn: "2454-8642", index: "UGC", freq: "Bi-Monthly", color: "from-blue-900 to-slate-900", icon: "Building2" },
  { id: "j-mathematics-applied-sciences", title: "Journal of Mathematics and Applied Sciences", field: "Mathematics", issn: "2456-1963", index: "Scopus", freq: "Quarterly", color: "from-emerald-800 to-green-950", icon: "Sigma" },
  { id: "int-j-chemical-engineering", title: "International Journal of Chemical Engineering", field: "Chemical Engineering", issn: "2455-9983", index: "Scopus", freq: "Quarterly", color: "from-teal-800 to-cyan-950", icon: "FlaskConical" },
];

export const CONFERENCES = [
  { id: "icai-2025", code: "ICAI 2025", type: "International Conference", title: "International Conference on Artificial Intelligence and Applications (ICAI 2025)", org: "University of Oxford", desc: "Exploring the latest breakthroughs and applications in Artificial Intelligence and Machine Learning.", topics: ["Artificial Intelligence", "Machine Learning", "Data Science", "Robotics"], date: "15 - 17 July, 2025", location: "Oxford, United Kingdom", color: "bg-blue-900" },
  { id: "icce-2025", code: "ICCE 2025", type: "International Conference", title: "International Conference on Civil Engineering (ICCE 2025)", org: "Technical University of Munich", desc: "Innovations and sustainable practices in civil engineering for a resilient future.", topics: ["Structural Engineering", "Sustainability", "Transportation", "Geotechnics"], date: "10 - 12 September, 2025", location: "Munich, Germany", color: "bg-green-800" },
  { id: "icet-2025", code: "ICET 2025", type: "International Conference", title: "International Conference on Electrical Technology (ICET 2025)", org: "University of Melbourne", desc: "Advancements in electrical technologies and power systems for modern world.", topics: ["Power Systems", "Smart Grid", "Renewable Energy", "Control Systems"], date: "22 - 24 October, 2025", location: "Melbourne, Australia", color: "bg-purple-800" },
  { id: "iccs-2025", code: "ICCS 2025", type: "International Conference", title: "International Conference on Computer Science (ICCS 2025)", org: "National University of Singapore", desc: "Cutting-edge research in computer science and its real-world applications.", topics: ["Algorithms", "Computer Networks", "Cyber Security", "Software Engineering"], date: "5 - 7 November, 2025", location: "Singapore", color: "bg-orange-700" },
  { id: "icme-2026", code: "ICME 2025", type: "International Conference", title: "International Conference on Mechanical Engineering (ICME 2026)", org: "University of Toronto", desc: "Innovative technologies and materials shaping the future of mechanical engineering.", topics: ["Thermal Engineering", "Materials Science", "Manufacturing", "Mechatronics"], date: "14 - 16 January, 2026", location: "Toronto, Canada", color: "bg-teal-800" },
];

export const FAQ_CATEGORIES = [
  { id: "all", label: "All Questions", icon: "List" },
  { id: "journals", label: "Journals", icon: "BookOpen" },
  { id: "conferences", label: "Conferences", icon: "CalendarDays" },
  { id: "submissions", label: "Submissions", icon: "Send" },
  { id: "peer-review", label: "Peer Review", icon: "Users" },
  { id: "publication", label: "Publication", icon: "FileText" },
  { id: "services", label: "Services", icon: "Settings" },
  { id: "universities", label: "For Universities", icon: "Landmark" },
];

export const FAQS = [
  { id: 1, cat: "journals", q: "What is Technical Journals?", a: "Technical Journals is a secure, scalable, and feature-rich platform exclusively for hosting peer-reviewed journals of universities worldwide. It provides end-to-end management for submissions, peer review, editorial workflow, and online publication." },
  { id: 2, cat: "submissions", q: "How do I submit my manuscript?", a: "Create an author account, choose the relevant journal, and follow the guided submission wizard to upload your manuscript, metadata, and supporting files. You can track your submission status from your author dashboard." },
  { id: 3, cat: "submissions", q: "What are the submission guidelines?", a: "Each journal publishes its own author guidelines covering formatting, word count, referencing style, and ethical requirements. You can find these on the journal's individual page under Author Guidelines." },
  { id: 4, cat: "submissions", q: "Is there a submission fee?", a: "Submission is free for all university-affiliated authors. Some journals may apply an article processing charge (APC) only after acceptance, which varies by plan and journal policy." },
  { id: 5, cat: "peer-review", q: "How does the peer review process work?", a: "We support single blind, double blind, and open review models. Editors assign qualified reviewers who evaluate the manuscript and provide structured feedback before a publication decision is made." },
  { id: 6, cat: "peer-review", q: "How long does the review process take?", a: "Most journals complete an initial review within 4 to 8 weeks, though timelines vary by discipline, reviewer availability, and the complexity of the manuscript." },
  { id: 7, cat: "submissions", q: "How will I know the status of my submission?", a: "You can track every stage of your submission, from editorial screening to final decision, in real time through your author dashboard." },
  { id: 8, cat: "publication", q: "What types of articles can be submitted?", a: "Journals on our platform accept original research articles, review papers, short communications, case studies, and conference extensions, depending on each journal's scope." },
  { id: 9, cat: "submissions", q: "Can I submit to more than one journal at the same time?", a: "Yes, provided the manuscript is not simultaneously under review elsewhere and each submission complies with the individual journal's scope and originality policy." },
  { id: 10, cat: "peer-review", q: "How do I register as a reviewer?", a: "Create a reviewer account from the Register page and select your subject expertise. Editors will invite you to review manuscripts that match your specialization." },
  { id: 11, cat: "universities", q: "How can I host a journal with Technical Journals?", a: "Universities can get started by selecting a plan on our Pricing page and requesting a demo. Our onboarding team will help configure branding, editorial workflows, and migration of existing content." },
  { id: 12, cat: "universities", q: "What support do you provide for universities?", a: "We provide dedicated onboarding, editorial workflow configuration, indexing assistance, analytics dashboards, and ongoing technical support for every hosted journal." },
  { id: 13, cat: "services", q: "Is my data secure on the platform?", a: "Yes. We use enterprise-grade encryption, regular backups, and strict access controls, and we comply with recognised global data protection standards." },
  { id: 14, cat: "services", q: "Can I integrate my existing journal website?", a: "Yes, our team can help migrate your existing journal content, archives, and branding into the Technical Journals platform with minimal disruption." },
  { id: 15, cat: "conferences", q: "Can I organize a conference on this platform?", a: "Yes. Universities and academic bodies can partner with us to list, manage registrations for, and promote their conferences to a global research audience." },
  { id: 16, cat: "conferences", q: "What types of conferences can be listed?", a: "We support international conferences, national conferences, workshops, symposiums, and webinars across all major research disciplines." },
  { id: 17, cat: "services", q: "Who can I contact for further assistance?", a: "Our support team is available through the Contact page, live chat, phone, or email, Monday to Friday, 9:00 AM to 6:00 PM GMT." },
];

export const SERVICES = [
  { icon: "FileText", title: "Journal Hosting", desc: "Secure and reliable hosting for peer-reviewed journals with custom domains, branding, and unlimited scalability.", color: "text-blue-600 bg-blue-100" },
  { icon: "Settings2", title: "Editorial Workflow", desc: "Streamline submission, peer review, editing, and publication with automated and transparent editorial workflows.", color: "text-green-600 bg-green-100" },
  { icon: "BarChart3", title: "Indexing & Visibility", desc: "Get indexed in major databases and directories to increase the visibility and impact of your research.", color: "text-orange-600 bg-orange-100" },
  { icon: "ShieldCheck", title: "Security & Compliance", desc: "Enterprise-grade security, regular backups, and compliance with global publishing standards and ethics.", color: "text-purple-600 bg-purple-100" },
  { icon: "Users", title: "Author & Reviewer Tools", desc: "Intuitive dashboards and tools for authors, reviewers, and editors to collaborate efficiently and seamlessly.", color: "text-sky-600 bg-sky-100" },
  { icon: "PieChart", title: "Reports & Analytics", desc: "Real-time insights on submissions, reviews, publications, citations, and performance with advanced analytics.", color: "text-pink-600 bg-pink-100" },
  { icon: "CloudUpload", title: "Digital Preservation", desc: "Long-term digital preservation and archiving to ensure the integrity and accessibility of scholarly content.", color: "text-blue-600 bg-blue-100" },
  { icon: "GraduationCap", title: "Consulting & Training", desc: "Capacity building, training, and consulting for universities to strengthen research and publishing excellence.", color: "text-green-600 bg-green-100" },
];

export const PROCESS_STEPS = [
  { step: "01", title: "Consultation", desc: "Understand your requirements and recommend the best solution for your journal.", icon: "FileEdit" },
  { step: "02", title: "Setup & Configuration", desc: "We set up your journal with custom branding, workflows, and essential tools.", icon: "Settings" },
  { step: "03", title: "Data Migration", desc: "Migrate existing content securely and organize for seamless access.", icon: "CloudUpload" },
  { step: "04", title: "Launch", desc: "Go live with your journal and start receiving submissions from authors worldwide.", icon: "Rocket" },
  { step: "05", title: "Ongoing Support", desc: "Continuous support, updates, and improvements to ensure your journal's success.", icon: "BarChart3" },
];

export const PRICING_PLANS = [
  { name: "Starter", tagline: "Ideal for new journals getting started.", price: "199", popular: false, color: "text-blue-700 border-blue-200", btn: "border border-blue-600 text-blue-600 hover:bg-blue-50", features: ["1 Journal", "Up to 500 Submissions / year", "Single Blind Review", "Editorial Workflow", "Basic Reports", "Email Support"] },
  { name: "Professional", tagline: "Perfect for growing journals and teams.", price: "499", popular: false, color: "text-green-700 border-green-200", btn: "border border-green-600 text-green-600 hover:bg-green-50", features: ["1 Journal", "Up to 2,000 Submissions / year", "Single & Double Blind Review", "Advanced Editorial Workflow", "Detailed Reports", "Priority Email Support"] },
  { name: "Advanced", tagline: "For established journals with high volume.", price: "899", popular: true, color: "text-purple-700 border-purple-300", btn: "bg-purple-700 text-white hover:bg-purple-800", features: ["Up to 3 Journals", "Up to 5,000 Submissions / year", "Single, Double Blind & Direct Review", "Advanced Workflow & Automation", "Reviewer Database & Invitations", "Advanced Analytics & Reports", "API Access", "Priority Support"] },
  { name: "Enterprise", tagline: "For universities and publishers with custom needs.", price: "Custom", popular: false, color: "text-orange-700 border-orange-200", btn: "border border-orange-600 text-orange-600 hover:bg-orange-50", features: ["Unlimited Journals", "Unlimited Submissions", "All Review Types", "Custom Workflows", "SSO & Domain Access", "Dedicated Account Manager", "Training & Onboarding", "24/7 Premium Support"] },
];

export const TESTIMONIALS = [
  { quote: "Technical Journals has transformed the way we manage our publications. The platform is secure, easy to use, and has significantly increased our global visibility.", name: "Prof. Sarah Johnson", org: "University of Oxford" },
  { quote: "The editorial workflow is seamless, and the support team is exceptional. Highly recommended for any university looking to elevate its research publishing.", name: "Dr. Michael Tan", org: "National University of Singapore" },
  { quote: "A robust and reliable platform built exclusively for universities. It supports our mission to disseminate research for a better world.", name: "Prof. Anika Patel", org: "University of Toronto" },
];

export const PLATFORM_FEATURES = [
  { icon: "FileText", title: "Journal Management", desc: "Manage editorial board, reviewers, and workflows seamlessly." },
  { icon: "Users", title: "Peer Review System", desc: "Advanced peer review with automated and transparent workflows." },
  { icon: "Award", title: "DOI & Indexing", desc: "DOI assignment and indexing in major databases." },
  { icon: "BarChart3", title: "Analytics Dashboard", desc: "Real-time insights on submissions, publications, and impact." },
  { icon: "Monitor", title: "Custom Branding", desc: "Custom domain, logo, and branding for your journal." },
  { icon: "Users2", title: "Multiple Access", desc: "Role-based access for editors, authors, reviewers, and admins." },
];

export const REVIEW_TYPES = [
  {
    title: "1. Single Blind Review", color: "blue",
    desc: "In single blind review, the identities of the reviewers are kept confidential from the authors, but the reviewers know who the authors are.",
    steps: ["Author submits the manuscript.", "The editor assigns the manuscript to reviewers.", "Reviewers evaluate the manuscript knowing the author's identity.", "Reviewers provide feedback and recommendations.", "The editor makes a decision based on the reviews."],
    note: "Best suited for disciplines where reviewer anonymity is prioritized while author transparency is acceptable.",
  },
  {
    title: "2. Double Blind Review", color: "green",
    desc: "In double blind review, the identities of both authors and reviewers are kept confidential from each other.",
    steps: ["Author submits the manuscript (author details removed).", "The editor assigns the manuscript to reviewers.", "Reviewers evaluate the manuscript without knowing the author's identity.", "Reviewers provide feedback and recommendations.", "The editor makes a decision based on the reviews."],
    note: "Ensures impartiality and minimizes bias by keeping both authors and reviewers anonymous.",
  },
  {
    title: "3. Direct Review (Open Review)", color: "purple",
    desc: "In direct review, the identities of both authors and reviewers are known to each other.",
    steps: ["Author submits the manuscript.", "The editor assigns the manuscript to reviewers.", "Reviewers evaluate the manuscript knowing the author's identity.", "Authors may also know the identities of the reviewers.", "Reviewers provide feedback and recommendations.", "The editor makes a decision based on the reviews."],
    note: "Promotes transparency, accountability, and academic dialogue among researchers.",
  },
];

export const REVIEW_WORKFLOW = [
  { step: "1", title: "Submission", desc: "Author submits the manuscript through our platform.", icon: "FileUp" },
  { step: "2", title: "Editorial Screening", desc: "The editor checks the manuscript for scope, format, and originality.", icon: "UserCheck" },
  { step: "3", title: "Reviewer Assignment", desc: "Suitable reviewers are selected based on expertise.", icon: "Users" },
  { step: "4", title: "Review & Feedback", desc: "Reviewers evaluate and provide constructive feedback.", icon: "MessageSquare" },
  { step: "5", title: "Decision", desc: "The editor communicates the decision to the author.", icon: "CheckCircle2" },
];

export const CONTACT_INFO = {
  address: "71-75 Shelton Street, Covent Garden, London WC2H 9JQ, United Kingdom",
  email: "info@technicaljournals.org",
  phone: "+44 20 7946 0958",
};
