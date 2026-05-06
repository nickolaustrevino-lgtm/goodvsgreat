/**
 * One-time script: insert the "From Clicks to Citations" article into the posts table.
 * Run from the project root: node scripts/insert-post.mjs
 * DATABASE_URL must be set in the environment (injected by the dev server).
 */
import mysql from "mysql2/promise";

const DB_URL = process.env.DATABASE_URL;
if (!DB_URL) {
  console.error("DATABASE_URL not set");
  process.exit(1);
}

const COVER_URL = "/manus-storage/cover-clicks-to-citations_18b010cb.png";
const TABLE_URL = "/manus-storage/table-source-divide_2f66beae.png";

const content = `AI search is not changing how people find links; it is changing how people form opinions. By the time a user clicks your ad, the model may already have framed the decision.

With Google AI Overviews, ChatGPT-style search, Perplexity, and Copilot, users increasingly resolve questions inside the interface itself, rather than on destination sites.

Visibility no longer guarantees a click. Influence now happens inside the answer.

---

## From Paid Clicks to Citation Equity

Paid media's mandate is not only to drive measurable performance but also to build citation equity in the sources AI platforms trust. This requires rethinking allocations across three immediate levers:

**1. Direct Response (Bottom-Funnel Protection)**: Defend high-intent queries where transactional behavior still drives clicks and revenue.

**2. Citation-Weighted Platforms**: Invest in environments AI disproportionately references.

- Reddit: Community authority
- LinkedIn: B2B credibility
- High-authority editorial ecosystems
- Structured marketplace and directory listings

**3. Earned Media & PR Amplification**: Analyses suggest that most citations driving brand visibility in LLMs come from earned media. Invest in PR campaigns, expert positioning, and third-party content creation that results in citations from authoritative sources.

---

## The Source Divide by AI Platform

AI platforms don't value every source equally, and neither should your KPI framework or budget allocation strategy.

Take fashion and apparel: Semrush's [analysis](https://www.semrush.com/blog/ai-visibility-index/) of ChatGPT and Google AI Mode reveals stark differences in which sources each platform prioritizes.

![Top Sources Analysis: Fashion & Apparel — ChatGPT vs Google AI Mode](${TABLE_URL})

*Source: AI Visibility Index Study by Semrush (2025)*

**But AI visibility can shift overnight, making diversification essential.** In mid-September 2025, for instance, ChatGPT dramatically reduced citations from Reddit, which is a reminder that relying on any single source is risky.

---

## A KPI Framework for the AI Era

To succeed in the AI era, marketing teams must pivot from measuring traffic volume to measuring brand influence. Here are the four strategic pillars of the new measurement framework:

1. **Brand Signal Share:** How often does your brand appear in AI-generated responses for priority prompts versus competitors?
2. **AI Citation Rate:** How frequently are you cited in the AI response "Sources" layers?
3. **AI Referral Performance:** Segment and measure AI traffic independently, and treat it as a premium audience, not an anomaly.
4. **Context & Sentiment Accuracy:** Presence is not enough. How is your brand described? Is the model using outdated, incomplete, or competitor-framed narratives?

The methodology for measuring these new KPIs should be repeatable and easily adaptable, allowing it to evolve alongside the rapidly changing landscape of AI-generated content.

---

## What This Means for Agency Leaders

For CMOs, Chief Digital Officers, performance leaders, and agency heads, the shift is structural:

Traffic volume is becoming a more secondary KPI.

- AI citation visibility must be included to measure and grow competitive presence.
- Paid media strategy must account for pre-click perception shaping.
- Attribution models need to expand beyond the auction.

If you are a CMO, performance lead, or agency head and you suspect your metrics are undervaluing AI traffic and overvaluing legacy search, this is exactly the inflection point to act.

Send me a DM or comment 'AI KPIs' if you would like to pressure-test your current KPI stack or co-create an AI-era measurement framework tailored to your organization or your clients' businesses.`;

const conn = await mysql.createConnection(DB_URL);

const slug = "from-clicks-to-citations-redesigning-paid-media-kpis-for-ai-search";
const title = "From Clicks to Citations: Redesigning Paid Media KPIs for AI Search";
const excerpt = `AI platforms won't eliminate paid media; they will eliminate agencies that fail to answer: "Are we the AI answer for our category, and how do we measure it?"`;
const publishedAt = new Date("2026-02-08T00:00:00.000Z");

const [existing] = await conn.execute("SELECT id FROM posts WHERE slug = ?", [slug]);

if (existing.length > 0) {
  await conn.execute(
    `UPDATE posts SET title=?, excerpt=?, content=?, coverUrl=?, status='published', publishedAt=?, authorId=1, updatedAt=NOW() WHERE slug=?`,
    [title, excerpt, content, COVER_URL, publishedAt, slug]
  );
  console.log("✓ Post updated (id:", existing[0].id, ")");
} else {
  const [result] = await conn.execute(
    `INSERT INTO posts (title, slug, excerpt, content, coverUrl, status, publishedAt, authorId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, 'published', ?, 1, NOW(), NOW())`,
    [title, slug, excerpt, content, COVER_URL, publishedAt]
  );
  console.log("✓ Post inserted (id:", result.insertId, ")");
}

await conn.end();
console.log("Done.");
