import { Download, Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";

export const dockItems = [
  {
    label: "CV İndir",
    href: "https://drive.google.com/uc?export=download&id=1w5ud_9eNKENjMGPmdjUq61-D89K-cW-I",
    target: "_blank",
    rel: "noopener noreferrer",
    download: "Ibrahim-Basmaci-CV.pdf",
    Icon: Download,
  },
  {
    label: "GitHub",
    href: "https://github.com/ibrbsmc",
    Icon: FaGithub,
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ibrahimbasmaci/",
    Icon: FaLinkedinIn,
    external: true,
  },
  { label: "E-posta Gönder", href: "mailto:ibrbsmc@gmail.com", Icon: Mail },
];
