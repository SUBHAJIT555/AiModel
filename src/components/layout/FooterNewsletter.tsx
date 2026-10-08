"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";

export function FooterNewsletter() {
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email") ?? "").trim();
    if (!email.includes("@")) {
      setError("Add an email address.");
      return;
    }
    setError("");
    setDone(true);
  }

  if (done) {
    return <p className="text-sm text-muted">Noted on this page. The note is not sent.</p>;
  }

  return (
    <div className="w-full max-w-sm">
      <form onSubmit={submit} className="flex items-center gap-2">
        <label className="sr-only" htmlFor="footer-email">
          Email address
        </label>
        <input
          id="footer-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Email address"
          className="h-9 min-w-0 flex-1 rounded-[10px] border border-border bg-surface px-3 text-sm text-foreground outline-none placeholder:text-muted focus:border-primary"
        />
        <Button type="submit">Join</Button>
      </form>
      {error ? <p className="mt-2 text-sm text-danger">{error}</p> : null}
    </div>
  );
}
