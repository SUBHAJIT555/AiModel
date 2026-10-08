import { contactOffice } from "@/data/contact";
import { siteConfig } from "@/lib/site";

export type LegalSection = {
  title: string;
  body: string[];
  points?: string[];
};

export type LegalDoc = {
  slug: "terms" | "privacy" | "cookies" | "acceptable-use";
  title: string;
  description: string;
  summary: string;
  updated: string;
  sections: LegalSection[];
};

const name = siteConfig.name;
const updated = "8 October 2026";
const office = `${contactOffice.company}, ${contactOffice.address}`;

export const legalDocs: Record<LegalDoc["slug"], LegalDoc> = {
  terms: {
    slug: "terms",
    title: "Terms",
    description: `The rules for using the ${name} site, catalog, and demonstration checkout.`,
    summary: `These terms cover the ${name} website, the model catalog, and the checkout you can walk on this site. They do not sign you up for a live gateway.`,
    updated,
    sections: [
      {
        title: "Who these terms bind",
        body: [
          `These terms are between you and ${name}. By opening the site, browsing the catalog, or stepping through checkout, you agree to them.`,
          `If you use the site for a company, you confirm that you can accept these terms for that company.`,
        ],
      },
      {
        title: "What this site is",
        body: [
          `${name} is a gateway shown on this website: one place to compare models, read a route, and see a bill in rupees. The pages, prices, and receipts are a product demonstration.`,
          `Model names belong to their providers. A listing in the catalog does not mean that provider has endorsed ${name}, and it does not promise that the model is reachable from this site today.`,
        ],
      },
      {
        title: "Plans and the bill",
        body: [
          `The plans on the pricing page are Route, Volume, and Command. There is no free plan. Amounts are in Indian rupees. Volume follows ₹80 for each million tokens, up to the top of the slider.`,
          `A bill addressed to India shows CGST at 9% and SGST at 9%, added on top of the plan. A bill addressed anywhere else shows IGST at 0% and is labeled as an export of services.`,
          `Prices on the site can change. A figure on a page is the figure for that demonstration, not a quote that locks a later contract.`,
        ],
      },
      {
        title: "Checkout does not take payment",
        body: [
          `The checkout writes a draft in your browser so you can see the receipt. It does not charge a card, open a workspace, or start a subscription.`,
          `A paid gateway, if ${name} offers one later, will have its own order step and its own confirmation. Until that exists, nothing on this site is an invoice you have to pay.`,
        ],
      },
      {
        title: "Your requests",
        body: [
          `You keep whatever rights you already have in the text, files, and instructions you type into a form or a demo. ${name} does not claim them.`,
          `This frontend does not forward that material to a model provider. If a live route is added later, the request you send will go to the provider you select, under that provider’s own terms as well as these.`,
        ],
      },
      {
        title: "The site itself",
        body: [
          `The ${name} name, the mark, the page design, and the copy on this site belong to ${name}, except for provider names and marks, which stay with their owners.`,
          `You may look, quote a short passage, and share a link. You may not copy the site, resell the catalog as your own gateway, or present the demonstration as a live service you operate.`,
        ],
      },
      {
        title: "Acceptable use",
        body: [
          `Traffic on the site has to follow the acceptable use page. ${name} may block a browser session or refuse a later workspace when that page is broken.`,
        ],
      },
      {
        title: "No promise of a particular model",
        body: [
          `Models answer in their own way. ${name} does not warrant that an output is true, safe, or fit for a decision you make with it. Availability, speed, and price shown beside a model are for the demonstration.`,
          `The site is offered as it appears. Where the law allows a limit, ${name} is not liable for lost profit, lost data, or a decision you take from a catalog page or a sample receipt.`,
        ],
      },
      {
        title: "Changes and the end of use",
        body: [
          `${name} may update these terms by publishing a new copy on this page. The date at the top is the date of the copy you are reading. If you keep using the site after that date, you are using it under the new copy.`,
          `You can stop using the site at any time. ${name} can withdraw the demonstration without notice.`,
        ],
      },
      {
        title: "Law and contact",
        body: [
          `These terms follow the law of India. Disputes that are not settled by a note to us are for the courts in ${contactOffice.city}.`,
          `Write to ${contactOffice.email}. The office on this page is ${office}.`,
        ],
      },
    ],
  },
  privacy: {
    slug: "privacy",
    title: "Privacy",
    description: `What ${name} collects on this site, what stays in your browser, and how to reach the office.`,
    summary: `This notice describes the ${name} website as it works today. The contact form and the checkout draft stay in your browser. They are not sent to an inbox.`,
    updated,
    sections: [
      {
        title: "Who this notice is about",
        body: [
          `This notice is for people who open ${name}, read the catalog, fill the contact form, or walk through checkout. ${name} is the operator named at the office below.`,
        ],
      },
      {
        title: "What you type",
        body: [
          `The contact form asks for a first name, a last name, an email, an optional phone number, a message, and a topic. Submitting it shows a confirmation on the page. The message is not emailed and is not stored on a server.`,
          `Checkout asks for a name, a company, an email, and a country so the receipt can show a bill. That draft is kept in session storage in your browser and cleared when the browsing session ends. It is not a customer record.`,
        ],
      },
      {
        title: "What the site sees on its own",
        body: [
          `Like most websites, the host that serves these pages can see a request log: the address of the page, the time, and a coarse network address. ${name} uses that only to keep the site up and to spot abuse.`,
          `This frontend does not run an advertising network, does not sell personal information, and does not build a profile of the models you click.`,
        ],
      },
      {
        title: "Model providers",
        body: [
          `The catalog names providers so you can compare them. Opening a model page does not send your prompt to that provider. This site does not have a live route that forwards your text.`,
          `If a live gateway is offered later, a request you choose to send will be shared with the provider that serves it, and that provider’s privacy terms will apply to the processing they do.`,
        ],
      },
      {
        title: "How long anything is kept",
        body: [
          `A checkout draft lasts for the browser session. A contact message is not kept after you leave the confirmation. Server logs, if the host keeps them, are kept only as long as the host needs them to operate the site.`,
        ],
      },
      {
        title: "Cookies",
        body: [
          `The cookie page lists what this site stores in the browser. There is no advertising cookie.`,
        ],
      },
      {
        title: "Children",
        body: [
          `The site is written for people who build with models. It is not directed at anyone under 18, and ${name} does not knowingly collect information from a child.`,
        ],
      },
      {
        title: "Your requests to us",
        body: [
          `You can ask what this page says we hold, ask for a correction, or ask us to delete a message if one was ever stored. Write to ${contactOffice.email}. Because the forms on this site do not create an account, there is often nothing on a server to return.`,
          `If you are in India, you may also complain to the authority named under the Digital Personal Data Protection Act once a live service is in place. This demonstration does not run that service yet.`,
        ],
      },
      {
        title: "Changes",
        body: [
          `${name} will change this notice on this page when the practice changes, and will move the date at the top. A live gateway, if it collects accounts or payment details, will need a new notice before that collection starts.`,
        ],
      },
      {
        title: "Contact",
        body: [`Privacy notes go to ${contactOffice.email}. The office is ${office}.`],
      },
    ],
  },
  cookies: {
    slug: "cookies",
    title: "Cookies",
    description: `What ${name} stores in the browser. No advertising cookies are set.`,
    summary: `${name} does not set advertising or analytics cookies. The only draft this site keeps is the checkout note in your browser, and it ends with the session.`,
    updated,
    sections: [
      {
        title: "What is stored",
        body: [
          `A cookie is a small file a site asks your browser to keep. This site does not use cookies to follow you across other websites, and it does not load an ad network.`,
          `Checkout saves one draft under the key aimodel-demo-checkout in session storage. Session storage is not a cookie, but it is the same idea: a note your browser holds for this site. It contains the plan, the billing period, the model if you chose one, and the name, company, email, and country you typed.`,
        ],
      },
      {
        title: "Why that draft exists",
        body: [
          `The draft lets the receipt and the payment steps show the same order while you move between those pages. It is not sent to ${name}, and it is not used to recognize you on a later visit.`,
        ],
      },
      {
        title: "What is not used",
        body: [
          `${name} does not set a marketing cookie, a retargeting pixel, or a third-party analytics cookie on these pages.`,
        ],
        points: [
          "No advertising cookies",
          "No cross-site tracking",
          "No analytics cookie on this frontend",
        ],
      },
      {
        title: "How long it lasts",
        body: [
          `Session storage is dropped when you close the browser session. You can also clear it yourself from the browser’s site settings. Clearing it removes the checkout draft and the receipt will no longer find that order.`,
        ],
      },
      {
        title: "Your choice",
        body: [
          `You can browse the catalog, the plans, and these legal pages without starting checkout. If you do not want the draft, do not open the payment step, or clear site data afterward.`,
          `Questions go to ${contactOffice.email}.`,
        ],
      },
    ],
  },
  "acceptable-use": {
    slug: "acceptable-use",
    title: "Acceptable use",
    description: `What you may and may not do on the ${name} site and, later, on a live gateway.`,
    summary: `Use the catalog and the demonstration in good faith. Do not attack the site, misuse a model route, or present the demo as a service you run.`,
    updated,
    sections: [
      {
        title: "The short version",
        body: [
          `You may read the catalog, compare plans, and walk through checkout. You may not use ${name} to harm someone, to break the site, or to pretend a demonstration receipt is a live account.`,
        ],
      },
      {
        title: "Do not attack the site",
        body: [
          `Do not probe, scan, or flood the site. Do not try to reach another visitor’s checkout draft, bypass a control, or interfere with the host that serves these pages.`,
        ],
      },
      {
        title: "Do not misuse a route",
        body: [
          `If a live gateway is opened later, the same rules apply to traffic you send through it. You may not use a route for any of the following.`,
        ],
        points: [
          "Malware, phishing, or fraud",
          "Sexual content involving anyone under 18",
          "Content that is illegal where you are, or where the office is",
          "Attempts to extract, copy, or resell a provider’s model",
          "Traffic that hides who you are in order to evade a limit or a ban",
        ],
      },
      {
        title: "Providers stay themselves",
        body: [
          `Do not remove provider marks from a comparison and present those models as yours. Do not tell a customer that a receipt from this demonstration is a contract with the provider named on it.`,
        ],
      },
      {
        title: "Volume and fairness",
        body: [
          `The pages are a public demonstration. Scripts that hammer the catalog, the pricing slider, or checkout are not allowed. A live plan, if one is sold later, will have its own rate limits, and working around them is a breach of that plan.`,
        ],
      },
      {
        title: "What happens if this page is broken",
        body: [
          `${name} may refuse a request, end a demo session, or decline a later workspace. Where the law requires it, ${name} may also keep a log and share it with a provider or an authority.`,
          `If you think someone is misusing the site, write to ${contactOffice.email}.`,
        ],
      },
    ],
  },
};

export const legalNav = [
  { href: "/legal/terms", label: "Terms", slug: "terms" },
  { href: "/legal/privacy", label: "Privacy", slug: "privacy" },
  { href: "/legal/cookies", label: "Cookies", slug: "cookies" },
  { href: "/legal/acceptable-use", label: "Acceptable use", slug: "acceptable-use" },
] as const;
