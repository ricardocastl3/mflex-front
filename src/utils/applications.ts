import { localImages } from "./images";

export const ausoftApplications: {
  id: number;
  name: string;
  url: string;
  logo: string;
  workspace: "suite" | "panel";
  active: boolean;
}[] = [
  {
    id: 1,
    logo: localImages.logos.lora,
    name: "Lora",
    url: "https://lora.ausoftdevelop.com",
    workspace: "suite",
    active: true,
  },
  {
    id: 2,
    logo: localImages.logos.ausoftLight,
    name: "TuaTurma",
    url: "#",
    workspace: "suite",
    active: false,
  },
  {
    id: 3,
    logo: localImages.logos.ausoftLight,
    name: "YourQuest",
    url: "#",
    workspace: "suite",
    active: false,
  },
  {
    id: 3,
    logo: localImages.logos.ausoftLight,
    name: "Motion Image",
    url: "https://motion.ausoftdevelop.com",
    workspace: "suite",
    active: false,
  },
  {
    id: 4,
    logo: "https://meraki.ausoftdevelop.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmerakilogo.812c6cdd.png&w=96&q=75",
    name: "Meraki AO",
    url: "https://meraki.ausoftdevelop.com",
    workspace: "panel",
    active: true,
  },
];
