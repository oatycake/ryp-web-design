export type GemMedia =
  | { id: string; type: "image"; label: string }
  | { id: string; type: "video"; label: string };

export type Gemstone = {
  id: string;
  name: string;
  note: string;
  /** Deterministic hue for placeholder washes (0–360) */
  hue: number;
  media: GemMedia[];
};

export type GemSection = {
  id: "cabochon" | "freeform";
  label: string;
  short: string;
  /** Lines joined with intentional breaks in the section header */
  description: string[];
  stones: Gemstone[];
};

const CAB_NAMES = [
  "Amethyst dome",
  "Lapis oval",
  "Malachite round",
  "Turquoise cab",
  "Jasper blush",
  "Carnelian disc",
  "Moonstone glow",
  "Onyx black",
  "Rose quartz",
  "Tiger eye",
  "Labradorite flash",
  "Chrysocolla",
  "Amazonite soft",
  "Bloodstone",
  "Sodalite night",
  "Aventurine",
  "Obsidian mirror",
  "Agate band",
  "Prehnite pale",
  "Garnet cab",
  "Peridot drop",
  "Iolite oval",
  "Sunstone spark",
  "Fluorite mint",
  "Rhodonite blush",
  "Howlite white",
  "Serpentine",
  "Unakite blend",
  "Kyanite blade",
  "Apophyllite",
  "Citrine warm",
  "Smoky quartz",
  "Aquamarine cab",
  "Emerald soft",
  "Opal milk",
  "Coral pink",
  "Jade classic",
  "Spinel red",
  "Zircon ice",
  "Topaz blue",
  "Sapphire cab",
  "Ruby cab",
  "Tanzanite glow",
  "Tourmaline green",
  "Morganite blush",
  "Heliodor",
  "Chalcedony",
  "Variscite",
];

const FREE_NAMES = [
  "Raw amethyst",
  "Turquoise nugget",
  "Malachite slab",
  "Lapis chunk",
  "Jasper freeform",
  "Carnelian shard",
  "Moonstone flake",
  "Obsidian blade",
  "Rose quartz rough",
  "Tiger eye strip",
  "Labradorite slab",
  "Chrysocolla swirl",
  "Amazonite chip",
  "Bloodstone rough",
  "Sodalite block",
  "Aventurine flake",
  "Agate freeform",
  "Prehnite cluster",
  "Garnet crystal",
  "Peridot grain",
  "Iolite shard",
  "Sunstone flake",
  "Fluorite cube",
  "Rhodonite rough",
  "Howlite nugget",
  "Serpentine twist",
  "Unakite chunk",
  "Kyanite spear",
  "Apophyllite tip",
  "Citrine point",
  "Smoky shard",
  "Aquamarine rough",
  "Emerald chip",
  "Opal freeform",
  "Coral branch",
  "Jade pebble",
  "Spinel grain",
  "Zircon flake",
  "Topaz shard",
  "Sapphire rough",
  "Ruby grain",
  "Tanzanite chip",
  "Tourmaline wand",
  "Morganite flake",
  "Heliodor tip",
  "Chalcedony blob",
  "Variscite nugget",
  "Pyrite cube",
];

const CAB_NOTES = [
  "Smooth dome, ready to set",
  "Even polish, quiet face",
  "Deep color, soft crown",
  "Classic oval cut",
  "Warm field, cool rim",
  "High dome, clean girdle",
];

const FREE_NOTES = [
  "Natural outline kept",
  "One face polished",
  "Display piece",
  "As found, lightly cleaned",
  "Statement silhouette",
  "Hand-selected shape",
];

function mediaFor(prefix: string, name: string): GemMedia[] {
  return [
    { id: `${prefix}-main`, type: "image", label: `${name} — face` },
    { id: `${prefix}-a`, type: "image", label: `${name} — angle` },
    { id: `${prefix}-b`, type: "image", label: `${name} — reverse` },
    { id: `${prefix}-c`, type: "image", label: `${name} — detail` },
    { id: `${prefix}-vid`, type: "video", label: `${name} — spin` },
  ];
}

function buildStones(
  prefix: string,
  names: string[],
  notes: string[],
  hueBase: number,
): Gemstone[] {
  return names.map((name, i) => ({
    id: `${prefix}-${String(i + 1).padStart(2, "0")}`,
    name,
    note: notes[i % notes.length],
    hue: (hueBase + i * 17) % 360,
    media: mediaFor(`${prefix}-${String(i + 1).padStart(2, "0")}`, name),
  }));
}

export const gemSections: GemSection[] = [
  {
    id: "cabochon",
    label: "Cabochons",
    short: "Cabochons",
    description: [
      "Domed, polished faces\u00A0—",
      "set-ready stones sized to a square\u00A0thumb.",
    ],
    stones: buildStones("cab", CAB_NAMES, CAB_NOTES, 280),
  },
  {
    id: "freeform",
    label: "Freeforms",
    short: "Freeforms",
    description: [
      "Natural outlines kept\u00A0—",
      "same grid, wilder silhouettes, full\u00A0attitude.",
    ],
    stones: buildStones("ff", FREE_NAMES, FREE_NOTES, 160),
  },
];

export function sectionById(id: string): GemSection | undefined {
  return gemSections.find((s) => s.id === id);
}
