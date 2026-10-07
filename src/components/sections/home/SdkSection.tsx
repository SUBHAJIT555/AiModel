"use client";

import { useState } from "react";
import { sdkInstall } from "@/data/home";
import { HairlineFigure } from "@/components/figures/HairlineFigure";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { HomeHeading } from "./HomeHeading";

const languages = Object.keys(sdkInstall);

export function SdkSection() {
  const [language, setLanguage] = useState(languages[0] ?? "JavaScript");

  return (
    <Section dividerBottom spacing="normal">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div>
            <HomeHeading eyebrow="SDKs" title="Build in the stack you already use.">
              Sample install lines for common languages. Packages shown here are placeholders.
            </HomeHeading>
            <div className="mt-6 flex flex-wrap gap-2">
              {languages.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`h-8 border px-3 text-[13px] ${item === language ? "border-foreground" : "border-border text-muted"}`}
                  onClick={() => setLanguage(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <p className="mt-4 border border-border bg-surface px-4 py-3 font-mono text-[13px]">{sdkInstall[language]}</p>
          </div>
          <HairlineFigure
            name="terminal"
            label="Line drawing of a terminal, standing in for the SDK."
            intensity={0.45}
            className="mx-auto w-full max-w-[260px]"
          />
        </div>
      </Container>
    </Section>
  );
}
