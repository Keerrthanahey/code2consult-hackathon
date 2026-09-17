export const SITE = {
  name: "CODE2CONSOLE",
  tagline: "DON'T BUILD FROM SCRATCH. IMPROVE WHAT ALREADY EXISTS.",
  description:
    "An 8-hour open-source challenge where participants improve real repositories across consulting-aligned domains and ship meaningful contributions.",
  organizer: "180 Degrees Consulting VIT Chennai",
  eventDate: "[EVENT DATE]",
  registrationUrl: "[REGISTRATION LINK]",
  registrationDeadline: "[REGISTRATION DEADLINE]",
  venue: "[VENUE]",
  teamSize: "2–4 MEMBERS",
  hours: 8,
} as const;

export const SPLINE_SCENE_URL = "" as const;

export const REGISTRATION_PATH = "/register" as const;

export function isRegistrationOpen(): boolean {
  return /^https?:\/\/.+\..+/.test(SITE.registrationUrl);
}

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Repositories", href: "#repositories" },
  { label: "Issues", href: "#issues" },
  { label: "Timeline", href: "#timeline" },
  { label: "Evaluation", href: "#evaluation" },
  { label: "FAQ", href: "#faq" },
  { label: "Recruitment", href: "/recruitments" },
] as const;

export const STATS = [
  { value: 8, label: "Hour Challenge", suffix: "" },
  { value: 10, label: "Repositories", suffix: "" },
  { value: 10, label: "Issue Types", suffix: "" },
  { value: 5, label: "Consulting Domains", suffix: "" },
] as const;

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "BUSINESS PROBLEM",
    description: "Understand the client's problem and business context.",
  },
  {
    step: "02",
    title: "EXISTING REPOSITORY",
    description: "Every team receives a living, documented codebase.",
  },
  {
    step: "03",
    title: "INVESTIGATE",
    description: "Read the README, architecture docs and existing source.",
  },
  {
    step: "04",
    title: "CHOOSE AN ISSUE",
    description: "Pick a genuine engineering challenge that matters.",
  },
  {
    step: "05",
    title: "BUILD",
    description: "Implement your solution with clean, tested code.",
  },
  {
    step: "06",
    title: "TEST",
    description: "Validate correctness, security and performance.",
  },
  {
    step: "07",
    title: "PULL REQUEST",
    description: "Ship a production-quality, meaningful Pull Request.",
  },
  {
    step: "08",
    title: "IMPACT",
    description: "Your contribution lives on beyond the hackathon.",
  },
] as const;

export interface Repository {
  name: string;
  description: string;
  issues: string[];
}

export interface Domain {
  id: string;
  name: string;
  icon: string;
  color: string;
  repositories: Repository[];
}

export const DOMAINS: Domain[] = [
  {
    id: "marketing",
    name: "MARKETING",
    icon: "Megaphone",
    color: "#10b981",
    repositories: [
      {
        name: "CampaignOS",
        description: "Campaign planning, content management and analytics.",
        issues: [
          "Campaign scheduling",
          "Content calendar",
          "UTM generation",
          "Campaign analytics",
          "Lead attribution",
          "A/B testing",
          "Duplicate-content detection",
          "API integrations",
        ],
      },
      {
        name: "BrandPulse",
        description: "Brand monitoring and sentiment analysis.",
        issues: [
          "Sentiment analysis",
          "Keyword tracking",
          "Trend detection",
          "Spam filtering",
          "Competitor comparison",
          "AI-assisted classification",
          "Large-scale data processing",
        ],
      },
    ],
  },
  {
    id: "strategy",
    name: "BUSINESS STRATEGY",
    icon: "Target",
    color: "#34d399",
    repositories: [
      {
        name: "StrategyLab",
        description: "Strategic analysis for market and business decisions.",
        issues: [
          "SWOT analysis",
          "TAM/SAM/SOM",
          "Competitor scoring",
          "Scenario analysis",
          "Decision matrices",
          "AI-assisted research",
          "Data visualization",
        ],
      },
      {
        name: "MarketMap",
        description: "Competitive intelligence and market mapping.",
        issues: [
          "Competitor scoring",
          "Market segmentation",
          "Opportunity detection",
          "Growth projections",
          "Competitive positioning",
          "Automated reports",
        ],
      },
    ],
  },
  {
    id: "finance",
    name: "FINANCE & LEGAL",
    icon: "Shield",
    color: "#0d9488",
    repositories: [
      {
        name: "FinGuard",
        description: "Financial management platform.",
        issues: [
          "Budget tracking",
          "Expense categorization",
          "Approval workflows",
          "Fraud/anomaly detection",
          "Forecasting",
          "Role-based access",
          "Audit logs",
          "Database optimization",
        ],
      },
      {
        name: "ContractLens",
        description: "Contract analysis platform.",
        issues: [
          "Clause extraction",
          "Deadline detection",
          "Risk scoring",
          "Contract comparison",
          "Version tracking",
          "PII redaction",
          "Access control",
          "Audit trail",
        ],
      },
    ],
  },
  {
    id: "operations",
    name: "OPERATIONS",
    icon: "Workflow",
    color: "#65a30d",
    repositories: [
      {
        name: "OpsFlow",
        description: "Operations workflow engine.",
        issues: [
          "Workflow builder",
          "Task dependencies",
          "SLA tracking",
          "Approval systems",
          "Automated escalation",
          "Notifications",
          "Workflow analytics",
        ],
      },
      {
        name: "ResourceHub",
        description: "Resource and vendor management system.",
        issues: [
          "Resource allocation",
          "Conflict detection",
          "Inventory forecasting",
          "Vendor scoring",
          "Procurement workflow",
          "Optimization algorithms",
        ],
      },
    ],
  },
  {
    id: "client",
    name: "CLIENT RELATIONSHIP",
    icon: "Users",
    color: "#059669",
    repositories: [
      {
        name: "ClientOS",
        description: "Client lifecycle and relationship management.",
        issues: [
          "Lead scoring",
          "Client segmentation",
          "Follow-up automation",
          "Pipeline analytics",
          "Interaction history",
          "Email integration",
          "Duplicate-client detection",
          "Permission management",
        ],
      },
      {
        name: "ClientPulse",
        description: "Client health and retention analytics.",
        issues: [
          "Health-score algorithm",
          "Churn prediction",
          "Feedback sentiment analysis",
          "NPS calculation",
          "Alert system",
          "Client segmentation",
          "Retention recommendations",
        ],
      },
    ],
  },
];

export const ISSUE_TYPES = [
  {
    title: "BUG",
    description: "Fix broken functionality and edge cases.",
    icon: "Bug",
  },
  {
    title: "PERFORMANCE",
    description: "Optimize queries, algorithms, memory or throughput.",
    icon: "Zap",
  },
  {
    title: "SECURITY",
    description:
      "Fix vulnerabilities, strengthen permissions and protect sensitive data.",
    icon: "Lock",
  },
  {
    title: "AI / ML",
    description:
      "Add classification, prediction, NLP or intelligent automation.",
    icon: "Brain",
  },
  {
    title: "FEATURE",
    description:
      "Implement a new user-facing or backend capability.",
    icon: "Plus",
  },
  {
    title: "TESTING",
    description:
      "Add unit, integration, regression or load tests.",
    icon: "TestTube",
  },
  {
    title: "ANALYTICS",
    description: "Improve metrics, dashboards and reporting.",
    icon: "BarChart3",
  },
  {
    title: "ARCHITECTURE",
    description:
      "Refactor or redesign components for maintainability and scale.",
    icon: "Layers",
  },
  {
    title: "DOCUMENTATION",
    description:
      "Improve API documentation, setup guides and contributor documentation.",
    icon: "FileText",
  },
  {
    title: "LANGUAGE CONVERSION",
    description:
      "Port a module to another programming language while preserving behavior.",
    icon: "ArrowRightLeft",
  },
] as const;

export const LANGUAGE_CONVERSIONS = [
  { from: "Node.js", to: "Go" },
  { from: "Python", to: "Java" },
  { from: "TypeScript", to: "Rust" },
  { from: "JavaScript", to: "TypeScript" },
];

export const TIMELINE = [
  { time: "09:00", label: "OPENING CEREMONY", description: "Welcome and introduction" },
  { time: "09:30", label: "CHALLENGE REVEAL", description: "Repositories and problem statements unveiled" },
  { time: "10:00", label: "REPO EXPLORATION", description: "Explore codebases, pick your issue" },
  { time: "10:30", label: "BUILD BEGINS", description: "Start implementing your solution" },
  { time: "13:00", label: "MENTOR CHECKPOINT", description: "Mid-hackathon guidance and review" },
  { time: "15:00", label: "FINAL DEVELOPMENT", description: "Polish, test, and document" },
  { time: "16:30", label: "PR FREEZE", description: "Submit your Pull Request" },
  { time: "17:00", label: "DEMO + PITCH", description: "Present your contribution" },
  { time: "17:30", label: "JUDGING", description: "Evaluation by panel" },
  { time: "18:00", label: "RESULTS", description: "Winners announced" },
];

export const EVALUATION = [
  { category: "Business Problem Understanding", points: 15 },
  { category: "Technical Solution", points: 20 },
  { category: "Code Quality", points: 15 },
  { category: "Functionality", points: 15 },
  { category: "Testing", points: 10 },
  { category: "Scalability / Performance", points: 10 },
  { category: "Business Impact", points: 10 },
  { category: "Documentation", points: 5 },
];

export const FAQ = [
  {
    question: "What is Code2Console?",
    answer:
      "Code2Console is an 8-hour open-source hackathon where participants improve existing software repositories by solving real-world engineering problems through GitHub issues, pull requests, and production-quality contributions.",
  },
  {
    question: "How is this different from a normal hackathon?",
    answer:
      "Most hackathons ask you to build something from scratch in 8 hours. Code2Console gives you an existing codebase and asks you to make it better — fix bugs, add features, improve performance, or enhance security. Your work lives on after the event.",
  },
  {
    question: "What will we actually build?",
    answer:
      "You won't build from scratch. You'll work on pre-existing repositories aligned to real business problems in marketing, strategy, finance, operations, and client management. Choose an issue, fix it, and submit a Pull Request.",
  },
  {
    question: "Do we start with an empty repository?",
    answer:
      "No. You receive an existing repository with curated issues, architecture docs, and test suites. Your job is to improve it.",
  },
  {
    question: "What repositories are available?",
    answer:
      "10 repositories across 5 business domains: Marketing (CampaignOS, BrandPulse), Business Strategy (StrategyLab, MarketMap), Finance & Legal (FinGuard, ContractLens), Operations (OpsFlow, ResourceHub), and Client Relationship (ClientOS, ClientPulse).",
  },
  {
    question: "Do I need open-source experience?",
    answer:
      "No. This is a great opportunity to learn. The repositories come with documentation to help you get started, and mentors will guide you throughout.",
  },
  {
    question: "Can beginners participate?",
    answer:
      "Absolutely. Beginners can explore the codebase, pick a documentation or testing issue, and make their first meaningful open-source contribution. Different skill levels can contribute in different ways.",
  },
  {
    question: "Can I use AI coding tools?",
    answer:
      "Yes, you can use AI tools to assist your development. The focus is on the quality and correctness of your contribution, not whether you typed every character manually.",
  },
  {
    question: "What programming languages can I use?",
    answer:
      "Each repository specifies its tech stack. There's also a Language Conversion track where you can port an entire module to a different language (e.g., Node.js to Go, Python to Java, TypeScript to Rust).",
  },
  {
    question: "What is a Pull Request?",
    answer:
      "A Pull Request (PR) is how you propose changes to a codebase. It's the primary submission format for Code2Console — your PR is what gets evaluated.",
  },
  {
    question: "How will submissions be judged?",
    answer:
      "Evaluation covers: Business Problem Understanding (15), Technical Solution (20), Code Quality (15), Functionality (15), Testing (10), Scalability/Performance (10), Business Impact (10), Documentation (5). Total: 100 points.",
  },
  {
    question: "What do we submit?",
    answer:
      "A production-quality Pull Request to the assigned repository, including your code changes, tests, and documentation updates.",
  },
  {
    question: "How long is the hackathon?",
    answer:
      "8 hours. From opening ceremony to final results.",
  },
  {
    question: "What is the team size?",
    answer:
      "[TEAM SIZE TO BE ANNOUNCED]. Recommended composition: Developer, Product/Strategy, Designer, AI/Data — but not every role is required.",
  },
  {
    question: "Where do I register?",
    answer:
      "Register from the homepage or visit the Register page. Registration links, deadlines and event details are announced on the official Code2Console page.",
  },
];

export const PARTICIPANTS = [
  {
    title: "DEVELOPERS",
    description: "Build features and backend systems.",
    icon: "Code2",
  },
  {
    title: "AI / ML ENTHUSIASTS",
    description: "Build intelligent capabilities.",
    icon: "Brain",
  },
  {
    title: "SECURITY ENTHUSIASTS",
    description: "Find and fix vulnerabilities.",
    icon: "ShieldCheck",
  },
  {
    title: "PRODUCT THINKERS",
    description: "Translate business problems into technical solutions.",
    icon: "Lightbulb",
  },
  {
    title: "DESIGNERS",
    description: "Improve product experience and usability.",
    icon: "Palette",
  },
  {
    title: "OPEN-SOURCE BEGINNERS",
    description:
      "Explore a real repository and make your first meaningful contribution.",
    icon: "Sprout",
  },
] as const;

export const TEAM_COMPOSITION = [
  { role: "Developer", color: "#10b981" },
  { role: "Product / Strategy", color: "#34d399" },
  { role: "Designer", color: "#0d9488" },
  { role: "AI / Data", color: "#65a30d" },
];

export const REPOSITORY_STRUCTURE = [
  { name: "README.md", description: "Project overview and getting started" },
  { name: "CONTRIBUTING.md", description: "Contribution guidelines" },
  { name: "ARCHITECTURE.md", description: "System design and codebase overview" },
  { name: "src/", description: "Application source code" },
  { name: "tests/", description: "Unit, integration, and regression tests" },
  { name: "benchmarks/", description: "Performance benchmarks" },
  { name: "issues/", description: "Curated issue descriptions" },
];

export const SOCIAL_LINKS = {
  website: "[180DC WEBSITE]",
  registration: "[REGISTRATION LINK]",
  github: "[GITHUB URL]",
  linkedin: "[LINKEDIN URL]",
  instagram: "[INSTAGRAM URL]",
} as const;
