const SYSTEM_PROMPT = `ROLE
You are a Bali-based fishing charter captain and content writer who has spent 15+ years running charters out of Serangan, Denpasar. You write blog posts for BaliFishBoat.com that read like they came from someone who's spent thousands of hours on the water — not an AI, not a generic travel copywriter.

BUSINESS CONTEXT
- BaliFishBoat runs fishing charters departing from Serangan, Denpasar, South Bali
- Trip types: half-day and full-day deep-sea and inshore charters — trolling, bottom fishing, jigging
- Common target species in the area: Yellowfin Tuna, Mahi Mahi (Dorado), Giant Trevally, Wahoo, Marlin, Snapper, Grouper, Dogtooth Tuna
- Differentiators — fill in the real ones (captain's name, boat name/type, years running, gear, family-friendly, catch-and-release policy, etc.): [ ]

AUDIENCE
English-speaking travelers (Australia, Europe, North America) researching Bali fishing charters or things to do in Bali — ranges from complete beginners to serious anglers, most booking 1–4 weeks out.

VOICE & STYLE
- First person plural ("we") or close third person, like a knowledgeable local talking to a friend — never robotic or corporate
- Banned: "nestled," "hidden gem," "paradise awaits," "unforgettable adventure," "in today's world," "when it comes to," a rule-of-three list every other paragraph, heavy em-dash use
- Concrete detail beats vague superlatives — name real spots, species, conditions instead of "stunning views" and "abundant marine life"
- Vary sentence length; mix short punchy lines with longer ones
- A little personal opinion is good ("honestly, sunrise trips out-fish sunset trips for tuna")

SEO REQUIREMENTS
- One primary keyword + 2–3 secondary keywords per post — I'll give the topic, you pick the best fit from the bank below unless I specify otherwise
- Primary keyword in: H1, first 100 words, one H2, and the meta description
- Meta description: 150–160 characters, includes primary keyword, ends on a soft CTA
- H2/H3 structure throughout — no walls of text
- 800–1,200 words unless told otherwise
- Add a 3–4 question FAQ near the end where it fits naturally — helps with featured snippets and voice search
- Flag 1–2 internal link opportunities as [INTERNAL LINK: anchor text]

KEYWORD BANK (starting point — swap in real rank-tracking data once you have it)
- Core: Bali fishing charter, deep sea fishing Bali, Bali fishing trip, Serangan fishing charter, Bali sport fishing, fishing charter Denpasar
- Species: Mahi Mahi Bali fishing, Giant Trevally Bali, Yellowfin Tuna Bali, Marlin fishing Bali, Wahoo fishing Bali
- Location: Benoa Harbour fishing, Nusa Penida fishing charter, South Bali fishing, Serangan Denpasar boat charter
- Informational / long-tail: best time to fish in Bali, what fish can you catch in Bali, Bali fishing season by month, traditional Balinese fishing boat jukung, is fishing in Bali good for beginners

SOFT PROMOTION RULES
- Name BaliFishBoat 2–3 times max: once naturally in the body, maybe once more mid-post, once in the closing CTA
- Position it as the natural next step, not a hard sell — "if you want to try this yourself, we run half-day charters out of Serangan," not "BOOK NOW!!"
- Never invent prices, catch guarantees, review quotes, or stats — use [PRICE] or [STAT] as a placeholder if one's needed and not supplied
- No fabricated testimonials

AVOID
- Keyword stuffing or unnatural repetition
- Overpromising ("guaranteed catch," "best fishing in the world")
- Mirroring competitor phrasing — FishingBooker, Viator, Pulau Private Charters, and various TripAdvisor listings all rank for the same terms; keep this genuinely original
- Inventing marine biology facts, records, or regulations you're not certain of
- NEVER use ### (triple hash) for subheadings — use only ## for H2 headings
- NEVER use *** or --- (horizontal rules / thematic breaks) — they are banned
- NEVER use bold (**text**) as section headers — use proper ## headings instead

OUTPUT FORMAT
Clean markdown only, no preamble:
Meta description: [text]

# [H1 Title]
[body with ## / ### headers]
## FAQ
[if applicable]
[closing CTA line]`;

export interface BlogTopic {
  title: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  angle?: string;
}

// 24 topics — enough for 6 months at 4/month, then it rotates
export const BLOG_TOPICS: BlogTopic[] = [
  {
    title: "What Fish Can You Catch in Bali? A Local Captain's Guide",
    primaryKeyword: "what fish can you catch in Bali",
    secondaryKeywords: ["Bali fishing trip", "Yellowfin Tuna Bali", "Mahi Mahi Bali fishing"],
    angle: "Species-by-season breakdown from someone who's out there every week",
  },
  {
    title: "Best Time to Fish in Bali: Month-by-Month Breakdown",
    primaryKeyword: "best time to fish in Bali",
    secondaryKeywords: ["Bali fishing season by month", "deep sea fishing Bali", "Bali fishing charter"],
    angle: "Honest take on peak vs off-peak, weather patterns, what runs when",
  },
  {
    title: "Deep Sea Fishing in Bali: What to Expect on Your First Trip",
    primaryKeyword: "deep sea fishing Bali",
    secondaryKeywords: ["Bali fishing charter", "Serangan fishing charter", "Bali sport fishing"],
    angle: "Beginner-friendly, demystifies the experience, sets realistic expectations",
  },
  {
    title: "Why Serangan Is the Best Launch Point for Bali Fishing Charters",
    primaryKeyword: "Serangan fishing charter",
    secondaryKeywords: ["fishing charter Denpasar", "South Bali fishing", "Bali fishing trip"],
    angle: "Logistics, proximity to deep water, less crowded than Benoa",
  },
  {
    title: "Mahi Mahi Fishing in Bali: When, Where, and How We Target Dorado",
    primaryKeyword: "Mahi Mahi Bali fishing",
    secondaryKeywords: ["deep sea fishing Bali", "Bali fishing charter", "what fish can you catch in Bali"],
    angle: "Species-specific deep dive — techniques, seasons, fight characteristics",
  },
  {
    title: "Giant Trevally in Bali: Hunting the Gangster of the Reef",
    primaryKeyword: "Giant Trevally Bali",
    secondaryKeywords: ["Bali sport fishing", "Serangan fishing charter", "Bali fishing trip"],
    angle: "Respect for the species, where to find them, light tackle approaches",
  },
  {
    title: "Yellowfin Tuna Fishing Off Bali's South Coast",
    primaryKeyword: "Yellowfin Tuna Bali",
    secondaryKeywords: ["deep sea fishing Bali", "Bali fishing charter", "best time to fish in Bali"],
    angle: "Sunrise trips, live bait vs trolling, why the south coast fires",
  },
  {
    title: "Marlin Fishing in Bali: Is It Worth the Hype?",
    primaryKeyword: "Marlin fishing Bali",
    secondaryKeywords: ["Bali sport fishing", "deep sea fishing Bali", "Bali fishing charter"],
    angle: "Honest — they're rare but real, what to expect, catch-and-release ethic",
  },
  {
    title: "Fishing Charter Denpasar: Everything You Need to Know Before Booking",
    primaryKeyword: "fishing charter Denpasar",
    secondaryKeywords: ["Bali fishing charter", "Serangan fishing charter", "Bali fishing trip"],
    angle: "Practical booking guide, what's included, what to bring, price ranges",
  },
  {
    title: "Wahoo Fishing in Bali: Speed Demons of the Indian Ocean",
    primaryKeyword: "Wahoo fishing Bali",
    secondaryKeywords: ["deep sea fishing Bali", "Bali fishing charter", "Bali sport fishing"],
    angle: "When they show up, trolling techniques, why they're a favorite catch",
  },
  {
    title: "Bali Fishing Trip for Beginners: No Experience Needed",
    primaryKeyword: "Bali fishing trip",
    secondaryKeywords: ["is fishing in Bali good for beginners", "Bali fishing charter", "Serangan fishing charter"],
    angle: "Reassurance, what the crew handles, family-friendly angle",
  },
  {
    title: "Nusa Penida Fishing Charter: A Day Trip Worth Taking",
    primaryKeyword: "Nusa Penida fishing charter",
    secondaryKeywords: ["deep sea fishing Bali", "Bali fishing charter", "Bali sport fishing"],
    angle: "The crossing, what's different about fishing around Nusa Penida, currents",
  },
  {
    title: "Bali Sport Fishing: Trolling, Jigging, and Popping Compared",
    primaryKeyword: "Bali sport fishing",
    secondaryKeywords: ["deep sea fishing Bali", "Bali fishing charter", "Serangan fishing charter"],
    angle: "Technique breakdown — what each is, who it suits, what you catch",
  },
  {
    title: "Traditional Balinese Fishing Boats: The Jukung and Modern Charters",
    primaryKeyword: "traditional Balinese fishing boat jukung",
    secondaryKeywords: ["Bali fishing trip", "Serangan fishing charter", "Bali fishing charter"],
    angle: "Cultural context, how jukungs work, why we use modern boats for charters",
  },
  {
    title: "Benoa Harbour Fishing vs Serangan: Which Is Better for Charters?",
    primaryKeyword: "Benoa Harbour fishing",
    secondaryKeywords: ["Serangan fishing charter", "fishing charter Denpasar", "South Bali fishing"],
    angle: "Compare the two departure points honestly, pros and cons",
  },
  {
    title: "South Bali Fishing Spots the Tourists Don't Know About",
    primaryKeyword: "South Bali fishing",
    secondaryKeywords: ["Bali fishing charter", "Serangan fishing charter", "Bali fishing trip"],
    angle: "Inshore spots, reef fishing, local knowledge angle",
  },
  {
    title: "Bali Fishing Season by Month: When to Book Your Charter",
    primaryKeyword: "Bali fishing season by month",
    secondaryKeywords: ["best time to fish in Bali", "Bali fishing charter", "deep sea fishing Bali"],
    angle: "Calendar-style breakdown, booking strategy, shoulder season tips",
  },
  {
    title: "Is Fishing in Bali Good for Beginners? An Honest Answer",
    primaryKeyword: "is fishing in Bali good for beginners",
    secondaryKeywords: ["Bali fishing trip", "Bali fishing charter", "Serangan fishing charter"],
    angle: "Directly addresses the question, sets expectations, encourages first-timers",
  },
  {
    title: "What to Bring on a Bali Fishing Charter: The Real Packing List",
    primaryKeyword: "Bali fishing charter",
    secondaryKeywords: ["Bali fishing trip", "deep sea fishing Bali", "fishing charter Denpasar"],
    angle: "Practical gear list from a captain who's seen it all",
  },
  {
    title: "Dogtooth Tuna in Bali: The Underdog Species Anglers Love",
    primaryKeyword: "what fish can you catch in Bali",
    secondaryKeywords: ["Bali sport fishing", "deep sea fishing Bali", "Serangan fishing charter"],
    angle: "Species spotlight, why dogtooth are underrated, where to find them",
  },
  {
    title: "Sunrise vs Sunset Fishing in Bali: Which Trip Catches More?",
    primaryKeyword: "Bali fishing trip",
    secondaryKeywords: ["best time to fish in Bali", "Bali fishing charter", "deep sea fishing Bali"],
    angle: "Personal opinion backed by experience, data-driven comparison",
  },
  {
    title: "Family Fishing in Bali: Taking Kids on a Charter",
    primaryKeyword: "Bali fishing charter",
    secondaryKeywords: ["Bali fishing trip", "is fishing in Bali good for beginners", "Serangan fishing charter"],
    angle: "Family-friendly focus, safety, shorter trip options, keeping kids engaged",
  },
  {
    title: "Snapper and Grouper Fishing in Bali's Inshore Reefs",
    primaryKeyword: "Bali fishing charter",
    secondaryKeywords: ["South Bali fishing", "what fish can you catch in Bali", "Serangan fishing charter"],
    angle: "Bottom fishing techniques, reef species diversity, sustainable practices",
  },
  {
    title: "How to Choose a Bali Fishing Charter: Red Flags and Green Lights",
    primaryKeyword: "Bali fishing charter",
    secondaryKeywords: ["fishing charter Denpasar", "Serangan fishing charter", "Bali fishing trip"],
    angle: "Buyer's guide — what to look for, what to avoid, questions to ask",
  },
];

export function getNextTopic(): BlogTopic {
  // Use month (1-12) and week-of-month to pick topic deterministically
  const now = new Date();
  const month = now.getMonth(); // 0-11
  const weekOfMonth = Math.floor(now.getDate() / 7); // 0-4

  // 4 posts per month, rotating through 24 topics over 6 months
  const topicIndex = (month * 4 + weekOfMonth) % BLOG_TOPICS.length;
  return BLOG_TOPICS[topicIndex];
}

export function buildUserPrompt(topic: BlogTopic): string {
  const parts = [
    `Write a blog post with this topic: "${topic.title}"`,
    `Primary keyword: ${topic.primaryKeyword}`,
    `Secondary keywords: ${topic.secondaryKeywords.join(", ")}`,
    "Target word count: 1,000",
  ];
  if (topic.angle) {
    parts.push(`Angle: ${topic.angle}`);
  }
  parts.push(
    "Remember: clean markdown output only. Start with the meta description line, then the H1, then the body."
  );
  return parts.join("\n");
}

export async function generateBlogPost(topic: BlogTopic): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY is not set");

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildUserPrompt(topic) },
      ],
      max_tokens: 4096,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Groq API error: ${response.status} — ${err}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content ?? "";
}

export function parseBlogMarkdown(raw: string): {
  metaDescription: string;
  title: string;
  body: string;
  internalLinks: { anchor: string; note: string }[];
} {
  const lines = raw.trim().split("\n");

  // Extract meta description
  let metaDescription = "";
  let bodyStart = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].toLowerCase().startsWith("meta description:")) {
      metaDescription = lines[i].replace(/^meta description:\s*/i, "").trim();
      bodyStart = i + 1;
      break;
    }
  }

  // Skip blank lines after meta
  while (bodyStart < lines.length && lines[bodyStart].trim() === "") bodyStart++;

  // Extract H1 title
  let title = "";
  if (bodyStart < lines.length && lines[bodyStart].startsWith("# ")) {
    title = lines[bodyStart].replace(/^#\s+/, "").trim();
    bodyStart++;
  }

  // Extract body (everything after H1)
  const bodyLines = lines.slice(bodyStart);
  let body = bodyLines.join("\n").trim();

  // Sanitize: strip ### (promote to ##), remove *** and ---
  body = body
    .replace(/^###\s+/gm, "## ")
    .replace(/\*\*\*/g, "")
    .replace(/^---+$/gm, "");

  // Extract internal link markers
  const internalLinks: { anchor: string; note: string }[] = [];
  const linkRegex = /\[INTERNAL LINK:\s*(.+?)\]/g;
  let match;
  const fullText = bodyLines.join("\n");
  while ((match = linkRegex.exec(fullText)) !== null) {
    internalLinks.push({ anchor: match[1], note: "Add link to relevant page" });
  }

  return { metaDescription, title, body, internalLinks };
}
