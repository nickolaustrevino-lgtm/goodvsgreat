/**
 * InstagramFeedSection — live Instagram feed grid for the homepage.
 * Fetches recent posts via trpc.instagram.feed, renders a 3-column mosaic
 * with caption preview, like count, and a direct link to each post.
 * Falls back gracefully with a skeleton loader while fetching.
 */

import React from "react";
import { trpc } from "@/lib/trpc";
import { useFadeUp } from "@/hooks/useFadeUp";

function PostSkeleton() {
  return (
    <div
      style={{
        aspectRatio: "1 / 1",
        background: "rgba(255,255,255,0.04)",
        borderRadius: "10px",
        border: "1px solid rgba(255,255,255,0.06)",
        animation: "pulse 1.8s ease-in-out infinite",
      }}
    />
  );
}

function truncateCaption(caption: string, maxLen = 90): string {
  if (!caption) return "";
  const first = caption.split("\n")[0];
  if (first.length <= maxLen) return first;
  return first.slice(0, maxLen).trimEnd() + "…";
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return "";
  }
}

export default function InstagramFeedSection() {
  const ref = useFadeUp<HTMLElement>();
  const { data, isLoading } = trpc.instagram.feed.useQuery({ limit: 9 });

  const posts = data?.posts ?? [];

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="gvg-fadeup"
      id="instagram-feed"
      style={{
        backgroundColor: "#0D0D1A",
        padding: "5rem 0 4rem",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="container">
        {/* Section header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "2.5rem",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.625rem",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "rgba(255,255,255,0.3)",
                margin: "0 0 0.5rem",
              }}
            >
              Follow along
            </p>
            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 700,
                color: "#FFFFFF",
                margin: 0,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              Latest from Instagram
            </h2>
          </div>
          <a
            href="https://www.instagram.com/goodvsgreat.ai/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "#2979FF",
              textDecoration: "none",
              transition: "opacity 0.15s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.7"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
          >
            @goodvsgreat.ai →
          </a>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
          }}
        >
          {isLoading
            ? Array.from({ length: 9 }).map((_, i) => <PostSkeleton key={i} />)
            : posts.length === 0
            ? (
              <div
                style={{
                  gridColumn: "1 / -1",
                  textAlign: "center",
                  padding: "3rem 0",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.875rem",
                  color: "rgba(255,255,255,0.3)",
                }}
              >
                No posts available right now.{" "}
                <a
                  href="https://www.instagram.com/goodvsgreat.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#2979FF", textDecoration: "none" }}
                >
                  View on Instagram →
                </a>
              </div>
            )
            : posts.map((post: { id: string; type: string; caption: string; link: string; likes: number; comments: number; postedAt: string; thumbnailUrl?: string }) => (
              <a
                key={post.id}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  position: "relative",
                  aspectRatio: "1 / 1",
                  borderRadius: "10px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "#1A1A2E",
                  textDecoration: "none",
                  transition: "transform 0.22s ease, border-color 0.22s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.transform = "scale(1.025)";
                  el.style.borderColor = "rgba(41,121,255,0.4)";
                  const overlay = el.querySelector(".ig-overlay") as HTMLElement | null;
                  if (overlay) overlay.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.transform = "scale(1)";
                  el.style.borderColor = "rgba(255,255,255,0.06)";
                  const overlay = el.querySelector(".ig-overlay") as HTMLElement | null;
                  if (overlay) overlay.style.opacity = "0";
                }}
              >
                {/* Background: thumbnail or gradient placeholder */}
                {post.thumbnailUrl ? (
                  <img
                    src={post.thumbnailUrl}
                    alt={truncateCaption(post.caption, 60)}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "linear-gradient(135deg, #1A1A2E 0%, #0D0D1A 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "1.25rem",
                    }}
                  >
                    {/* Caption preview for text-only posts */}
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.75rem",
                        lineHeight: 1.6,
                        color: "rgba(255,255,255,0.6)",
                        margin: 0,
                        textAlign: "center",
                        display: "-webkit-box",
                        WebkitLineClamp: 6,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {truncateCaption(post.caption, 160)}
                    </p>
                  </div>
                )}

                {/* Hover overlay */}
                <div
                  className="ig-overlay"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(13,13,26,0.92) 0%, rgba(13,13,26,0.4) 55%, transparent 100%)",
                    opacity: 0,
                    transition: "opacity 0.22s ease",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "1rem",
                    gap: "0.375rem",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.75rem",
                      lineHeight: 1.5,
                      color: "rgba(255,255,255,0.85)",
                      margin: 0,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {truncateCaption(post.caption)}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: "0.6rem",
                        color: "rgba(255,255,255,0.35)",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {formatDate(post.postedAt)}
                    </span>
                    {post.likes > 0 && (
                      <span
                        style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: "0.6rem",
                          color: "rgba(255,255,255,0.35)",
                          letterSpacing: "0.06em",
                        }}
                      >
                        ♥ {post.likes}
                      </span>
                    )}
                    {/* Video badge */}
                    {post.type === "VIDEO" && (
                      <span
                        style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: "0.55rem",
                          color: "#2979FF",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                        }}
                      >
                        Reel
                      </span>
                    )}
                  </div>
                </div>

                {/* Type badge — top right */}
                {post.type === "VIDEO" && (
                  <div
                    style={{
                      position: "absolute",
                      top: "0.5rem",
                      right: "0.5rem",
                      background: "rgba(41,121,255,0.85)",
                      borderRadius: "4px",
                      padding: "2px 6px",
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "0.55rem",
                      color: "#FFFFFF",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    ▶
                  </div>
                )}
              </a>
            ))}
        </div>

        {/* Mobile: show fewer columns */}
        <style>{`
          @media (max-width: 640px) {
            #instagram-feed .container > div:last-child {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 0.7; }
          }
        `}</style>
      </div>
    </section>
  );
}
