/* AboutSection — Good vs. Great Brand Guidelines Applied
   Background: Off White (#F5F5F5) — light section
   H2: Space Mono 700, 36px — charcoal (name)
   H3: IBM Plex Sans 600, 24px — sub-headings
   Body: IBM Plex Sans 400, 16px
   Caption: IBM Plex Mono
   Portrait: circular, matches original site
   Divider: Electric Blue */

const PORTRAIT_URL = "/manus-storage/portrait_7d6c2a03.jpg";

const credentials = [
  "12 Years Experience",
  "$100M+ Media Managed",
  "Search · Social · Programmatic · CTV",
  "Retail · SaaS · Entertainment · Tech",
  "MMM & Incrementality",
  "AI Workflow Design",
];

export default function AboutSection() {
  return (
    <section
      id="about"
      style={{
        backgroundColor: "#F5F5F5",
        padding: "5rem 0",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "4rem",
            alignItems: "start",
          }}
        >
          {/* Portrait column */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "1rem" }}>
            <img
              src={PORTRAIT_URL}
              alt="Nickolaus Trevino"
              style={{
                width: "160px",
                height: "160px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "3px solid #2979FF",
              }}
            />
            <div>
              <h2
                className="gvg-h2"
                style={{ color: "#2D2D2D", marginBottom: "0.25rem" }}
              >
                Nickolaus Trevino
              </h2>
              <p
                className="gvg-caption"
                style={{ color: "rgba(45,45,45,0.5)", letterSpacing: "0.08em" }}
              >
                New York, NY · Remote
              </p>
            </div>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: "0.9rem",
                color: "#2979FF",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
                transition: "color 0.15s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#5B9BFF"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#2979FF"; }}
            >
              LinkedIn →
            </a>
          </div>

          {/* Bio column */}
          <div>
            <span className="gvg-caption gvg-section-label">
              Built and Led by Nickolaus Trevino
            </span>

            <div className="gvg-divider" />

            <p className="gvg-body" style={{ color: "#2D2D2D", marginBottom: "1.25rem" }}>
              Good vs Great exists because too many companies are deploying serious media budgets without the infrastructure to know whether those budgets are working.
            </p>

            <p className="gvg-body" style={{ color: "#2D2D2D", marginBottom: "1.25rem" }}>
              Nickolaus Trevino has managed more than $100M in media budgets across global markets and worked across Search, Social, Programmatic, and CTV in retail, SaaS, entertainment, and technology.
            </p>

            <p className="gvg-body" style={{ color: "#2D2D2D", marginBottom: "2rem" }}>
              This isn't about making campaigns look better in reports. It's about helping leadership make better calls with more confidence.
            </p>

            {/* Credentials grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.75rem",
              }}
            >
              {credentials.map((cred, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div
                    style={{
                      width: "5px",
                      height: "5px",
                      backgroundColor: "#2979FF",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    className="gvg-caption"
                    style={{ color: "rgba(45,45,45,0.65)", letterSpacing: "0.04em" }}
                  >
                    {cred}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
