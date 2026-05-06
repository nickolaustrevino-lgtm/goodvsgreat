/**
 * Updates the "From Clicks to Citations" post to match the Substack version exactly.
 * Run: npx tsx scripts/update-post-clicks.mjs
 */
import mysql from "mysql2/promise";

const COVER_URL = "/manus-storage/cover-clicks-to-citations_4e4eb5e5.png";
const TABLE_IMG = "/manus-storage/data-table-clicks-to-citations_4a55da5b.png";

const content = `<p>AI search is not changing how people find links; it is changing how people form opinions. By the time a user clicks your ad, the model may already have framed the decision.</p>

<p>With Google AI Overviews, ChatGPT-style search, Perplexity, and Copilot, users increasingly resolve questions inside the interface itself, rather than on destination sites.</p>

<p>Visibility no longer guarantees a click. Influence now happens inside the answer.</p>

<hr>

<h2>From Paid Clicks to Citation Equity</h2>

<p>Paid media's mandate is not only to drive measurable performance but also to build citation equity in the sources AI platforms trust. This requires rethinking allocations across three immediate levers:</p>

<ol>
  <li><p><strong>Direct Response (Bottom-Funnel Protection)</strong>: Defend high-intent queries where transactional behavior still drives clicks and revenue.</p></li>
  <li>
    <p><strong>Citation-Weighted Platforms</strong>: Invest in environments AI disproportionately references.</p>
    <ul>
      <li>Reddit: Community authority</li>
      <li>LinkedIn: B2B credibility</li>
      <li>High-authority editorial ecosystems</li>
      <li>Structured marketplace and directory listings</li>
    </ul>
  </li>
  <li><p><strong>Earned Media &amp; PR Amplification</strong>: Analyses suggest that most citations driving brand visibility in LLMs come from earned media. Invest in PR campaigns, expert positioning, and third-party content creation that results in citations from authoritative sources.</p></li>
</ol>

<h2>The Source Divide by AI Platform</h2>

<p>AI platforms don't value every source equally, and neither should your KPI framework or budget allocation strategy.</p>

<p>Take fashion and apparel: Semrush's <a href="https://www.semrush.com/blog/ai-visibility-index/" target="_blank" rel="noopener">analysis</a> of ChatGPT and Google AI Mode reveals stark differences in which sources each platform prioritizes.</p>

<figure>
  <img src="${TABLE_IMG}" alt="Top Sources Analysis: Fashion &amp; Apparel — ChatGPT vs Google AI Mode" style="width:100%;border-radius:8px;" />
  <figcaption><em>Source: AI Visibility Index Study by Semrush (2025)</em></figcaption>
</figure>

<p><strong>But AI visibility can shift overnight, making diversification essential.</strong> In mid-September 2025, for instance, ChatGPT dramatically reduced citations from Reddit, which is a reminder that relying on any single source is risky.</p>

<h2>A KPI Framework for the AI Era</h2>

<p>To succeed in the AI era, marketing teams must pivot from measuring traffic volume to measuring brand influence. Here are the four strategic pillars of the new measurement framework:</p>

<ul>
  <li><strong>Brand Signal Share</strong>: How often does your brand appear in AI-generated responses for priority prompts versus competitors?</li>
  <li><strong>AI Citation Rate</strong>: How frequently are you cited in the AI response "Sources" layers?</li>
  <li><strong>AI Referral Performance</strong>: Segment and measure AI traffic independently, and treat it as a premium audience, not an anomaly.</li>
  <li><strong>Context &amp; Sentiment Accuracy</strong>: Presence is not enough. How is your brand described? Is the model using outdated, incomplete, or competitor-framed narratives?</li>
</ul>

<p>The methodology for measuring these new KPIs should be repeatable and easily adaptable, allowing it to evolve alongside the rapidly changing landscape of AI-generated content.</p>

<h2>What This Means for Agency Leaders</h2>

<p>For CMOs, Chief Digital Officers, performance leaders, and agency heads, the shift is structural:</p>

<ul>
  <li>Traffic volume is becoming a more secondary KPI.</li>
  <li>AI citation visibility must be included to measure and grow competitive presence.</li>
  <li>Paid media strategy must account for pre-click perception shaping.</li>
  <li>Attribution models need to expand beyond the auction.</li>
</ul>

<p>If you are a CMO, performance lead, or agency head and you suspect your metrics are undervaluing AI traffic and overvaluing legacy search, this is exactly the inflection point to act.</p>

<p>Send me a DM or comment <em>'AI KPIs'</em> if you would like to pressure-test your current KPI stack or co-create an AI-era measurement framework tailored to your organization or your clients' businesses.</p>`;

const db = await mysql.createConnection(process.env.DATABASE_URL);

const [rows] = await db.execute(
  "SELECT id, title FROM posts WHERE slug = ?",
  ["from-clicks-to-citations-redesigning-paid-media-kpis-for-ai-search"]
);

if (!rows.length) {
  console.error("Post not found!");
  process.exit(1);
}

const post = rows[0];
console.log("Found post:", post.id, post.title);

await db.execute(
  `UPDATE posts SET
    content = ?,
    coverUrl = ?,
    excerpt = ?,
    status = 'published',
    publishedAt = '2026-02-08 00:00:00',
    updatedAt = NOW()
  WHERE id = ?`,
  [
    content,
    COVER_URL,
    "AI platforms won't eliminate paid media; they will eliminate agencies that fail to answer: \"Are we the AI answer for our category, and how do we measure it?\"",
    post.id,
  ]
);

console.log("Post updated successfully!");
await db.end();
