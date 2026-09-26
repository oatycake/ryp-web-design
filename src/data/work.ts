export type Format = {
  id: string;
  label: string;
  width: number;
  height: number;
};

export type WorkItem = {
  id: string;
  title: string;
  note: string;
};

export type Category = {
  id: string;
  label: string;
  short: string;
  description: string;
  formats: Format[];
  items: WorkItem[];
};

const five = (prefix: string, titles: [string, string][]): WorkItem[] =>
  titles.map(([title, note], i) => ({
    id: `${prefix}-${String(i + 1).padStart(2, "0")}`,
    title,
    note,
  }));

export const categories: Category[] = [
  {
    id: "landing",
    label: "Landing pages",
    short: "Landings",
    description:
      "Full-page stories sized for desktop canvas and portrait phone capture.",
    formats: [
      { id: "desktop", label: "Desktop", width: 1080, height: 930 },
      { id: "mobile", label: "Mobile", width: 390, height: 844 },
    ],
    items: five("lp", [
      ["Product launch", "Hero → proof → CTA"],
      ["Event RSVP", "Date-forward scroll"],
      ["Waitlist", "Single ask, quiet type"],
      ["Case study", "Outcome first"],
      ["Offer page", "Price without noise"],
    ]),
  },
  {
    id: "email",
    label: "Emails",
    short: "Emails",
    description:
      "Modular mail — desktop preview frames and mobile crop of the same send.",
    formats: [
      { id: "desktop", label: "Desktop", width: 600, height: 930 },
      { id: "mobile", label: "Mobile", width: 390, height: 844 },
    ],
    items: five("em", [
      ["Launch announce", "Hero + modules"],
      ["Lifecycle nudge", "Short, one link"],
      ["Editorial digest", "Story stack"],
      ["Cart recovery", "Product + urgency"],
      ["Welcome series", "Brand onboarding"],
    ]),
  },
  {
    id: "siderail",
    label: "Siderail ads",
    short: "Siderails",
    description: "Wide companion units — 1050 × 300, built to ride with content.",
    formats: [{ id: "unit", label: "Unit", width: 1050, height: 300 }],
    items: five("sr", [
      ["Brand stretch", "Logo lock + line"],
      ["Offer strip", "Price in the fold"],
      ["Story row", "Three beats across"],
      ["App download", "QR + device"],
      ["Event reminder", "Date run"],
    ]),
  },
  {
    id: "interstitial",
    label: "Interstitials",
    short: "Motion",
    description:
      "Shortform motion graphics — 450 × 404 interstitial frames, loop-ready.",
    formats: [{ id: "unit", label: "Motion", width: 450, height: 404 }],
    items: five("ix", [
      ["Logo sting", "2s mark hit"],
      ["Product spin", "Object loop"],
      ["Type reveal", "Kinetic headline"],
      ["Offer flash", "Price pop"],
      ["End card", "CTA hold"],
    ]),
  },
  {
    id: "banner",
    label: "Banner ads",
    short: "Banners",
    description: "Wide leaderboard-style banners — 1080 × 200.",
    formats: [{ id: "unit", label: "Banner", width: 1080, height: 200 }],
    items: five("bn", [
      ["Wordmark run", "Type only"],
      ["Icon row", "Mark + claim"],
      ["Countdown", "Date ticks"],
      ["Color field", "Brand wash"],
      ["CTA spike", "One verb"],
    ]),
  },
];

export function formatSpec(f: Format) {
  return `${f.width} × ${f.height}`;
}
