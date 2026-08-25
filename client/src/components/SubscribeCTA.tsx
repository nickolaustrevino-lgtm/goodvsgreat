/* ============================================================
   SubscribeCTA - editorial email capture for blog articles
   ============================================================ */
import { useState } from "react";
import { trpc } from "@/lib/trpc";

interface SubscribeCTAProps {
  source?: string;
}

export default function SubscribeCTA({ source = "blog" }: SubscribeCTAProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);

  const subscribe = trpc.subscribers.subscribe.useMutation({
    onSuccess: (data) => {
      setSubmitted(true);
      setAlreadySubscribed(data.alreadySubscribed);
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim()) return;
    subscribe.mutate({
      email: email.trim(),
      name: name.trim() || undefined,
      source,
      baseUrl: window.location.origin,
    });
  };

  return (
    <section className="subscribe-editorial-card" aria-labelledby="subscribe-editorial-title">
      <div className="subscribe-editorial-card__signal" aria-hidden="true" />
      {submitted ? (
        <div className="subscribe-editorial-card__success" role="status">
          <span>{alreadySubscribed ? "Already subscribed" : "Subscription confirmed"}</span>
          <p>
            {alreadySubscribed
              ? "You are already on the list. New thinking will arrive when it is useful."
              : "You are in. Expect frameworks, case studies, and decision-making perspectives without cadence pressure."}
          </p>
        </div>
      ) : (
        <>
          <div className="subscribe-editorial-card__content">
            <span className="subscribe-editorial-card__eyebrow">Continue the briefing</span>
            <h2 id="subscribe-editorial-title">Get the next piece in your inbox.</h2>
            <p>Frameworks and case studies on measurement, attribution, and AI-era media strategy. No noise. No cadence pressure.</p>
          </div>

          <form className="subscribe-editorial-card__form" onSubmit={handleSubmit}>
            <label>
              <span className="sr-only">First name</span>
              <input
                type="text"
                placeholder="First name, optional"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="given-name"
              />
            </label>
            <label>
              <span className="sr-only">Email address</span>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
              />
            </label>
            <button type="submit" disabled={subscribe.isPending || !email.trim()}>
              {subscribe.isPending ? "Subscribing" : "Subscribe"} <span aria-hidden="true">→</span>
            </button>
            {subscribe.isError && <p className="subscribe-editorial-card__error">Something went wrong. Please try again.</p>}
            <p className="subscribe-editorial-card__note">No spam. Unsubscribe any time.</p>
          </form>
        </>
      )}
    </section>
  );
}
