interface Priorities {
  id: number;
  tagLabel: string;
  icon: string;
  title: string;
}

export const prioritiesInfo: Priorities[] = [
  {
    id: 1,
    tagLabel: "Resources",
    icon: "resources",
    title: "Eco-urban development",
  },
  {
    id: 2,
    tagLabel: "Manegement",
    icon: "manegement",
    title: "Conservation technologies",
  },
  {
    id: 3,
    tagLabel: "Development",
    icon: "development",
    title: "Restore our oceans",
  },
];
