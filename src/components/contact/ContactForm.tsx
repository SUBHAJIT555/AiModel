"use client";

import { useState, type FormEvent } from "react";
import { contactOffice, contactTopics } from "@/data/contact";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { submitToMailer } from "@/lib/forms/submitToMailer";

const fieldClass =
  "w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-[14px] text-foreground outline-none placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary/30";

const labelClass = "mb-1.5 block text-[14px] font-medium";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const first = String(formData.get("firstName") ?? "").trim();
    const last = String(formData.get("lastName") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const topics = formData.getAll("topic").map(String).filter(Boolean);
    if (!first || !last || !message || !email.includes("@")) {
      setError("Add your name, email, and a message.");
      return;
    }
    setError("");
    setPending(true);
    try {
      await submitToMailer({
        formType: "contact",
        name: `${first} ${last}`,
        email,
        phone,
        subject: topics.length ? topics.join(", ") : "Contact",
        message,
      });
      setSent(true);
    } catch (sendError) {
      setError(sendError instanceof Error ? sendError.message : "Unable to send message.");
    } finally {
      setPending(false);
    }
  }

  return (
    <section id="message" className="scroll-mt-28 bg-surface">
      <div className="home-frame border-t border-border px-6 py-8 md:px-8 md:py-10">
        <div className="grid items-end gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.12] font-medium tracking-[-0.03em]">
              Tell us about the route
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-muted">
              You can also write{" "}
              <a
                href={`mailto:${contactOffice.email}`}
                className="font-medium text-primary underline decoration-primary/40 decoration-dotted underline-offset-4"
              >
                {contactOffice.email}
              </a>
              .
            </p>
            {sent ? (
              <p className="mt-8 max-w-md text-[16px] leading-7">
                The note was sent. A reply goes to the email you entered.
              </p>
            ) : (
              <form onSubmit={submit} className="mt-8 space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className={labelClass}>
                      First name <span className="text-primary">*</span>
                    </span>
                    <input name="firstName" required autoComplete="given-name" placeholder="First name" className={fieldClass} />
                  </label>
                  <label className="block">
                    <span className={labelClass}>
                      Last name <span className="text-primary">*</span>
                    </span>
                    <input name="lastName" required autoComplete="family-name" placeholder="Last name" className={fieldClass} />
                  </label>
                </div>
                <label className="block">
                  <span className={labelClass}>
                    Email <span className="text-primary">*</span>
                  </span>
                  <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={fieldClass} />
                </label>
                <label className="block">
                  <span className={labelClass}>Phone number</span>
                  <span className="flex overflow-hidden rounded-lg border border-border focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/30">
                    <span className="inline-flex shrink-0 items-center border-r border-border bg-[#f6f7f9] px-3 text-[14px] font-medium text-muted">
                      +91
                    </span>
                    <input
                      name="phone"
                      type="tel"
                      autoComplete="tel-national"
                      placeholder="80 0000 0000"
                      className="min-w-0 flex-1 border-0 bg-surface px-3.5 py-2.5 text-[14px] outline-none placeholder:text-muted"
                    />
                  </span>
                </label>
                <label className="block">
                  <span className={labelClass}>
                    Message <span className="text-primary">*</span>
                  </span>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Which model, or which plan."
                    className={cn(fieldClass, "min-h-28 resize-y")}
                  />
                </label>
                <fieldset>
                  <legend className={labelClass}>What is this about?</legend>
                  <div className="mt-1 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                    {contactTopics.map((topic) => (
                      <label key={topic} className="flex cursor-pointer items-center gap-2.5 text-[14px]">
                        <input
                          type="checkbox"
                          name="topic"
                          value={topic}
                          className="size-4 shrink-0 appearance-none rounded-[3px] border border-border bg-surface checked:border-primary checked:bg-primary checked:bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20stroke%3D%22white%22%20stroke-width%3D%222.2%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M3.5%208.5%206.5%2011.5%2012.5%204.5%22%2F%3E%3C%2Fsvg%3E')] checked:bg-center checked:bg-no-repeat"
                        />
                        {topic}
                      </label>
                    ))}
                  </div>
                </fieldset>
                {error ? <p className="text-[14px] text-danger">{error}</p> : null}
                <Button type="submit" disabled={pending} className="h-11 w-full justify-center">
                  {pending ? "Sending…" : "Leave a note"}
                </Button>
              </form>
            )}
          </div>
          <img
            src="/figures/contact.svg"
            alt=""
            width={752}
            height={880}
            className="mx-auto hidden w-full max-w-md object-contain object-bottom lg:block"
          />
        </div>
      </div>
    </section>
  );
}
