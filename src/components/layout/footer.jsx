import { Mail, MapPin, Phone } from "lucide-react";
import Aurora from "../ui/aurora";

function Footer() {
  return (
    <footer className="site-footer">
      <Aurora
        className="absolute inset-0"
        colorStops={["#67e8f9", "#93c5fd", "#22d3ee"]}
        amplitude={1}
        blend={0.5}
        speed={1}
      />
      <div className="footer-overlay" aria-hidden="true" />

      <div className="footer-content mx-auto w-full max-w-6xl px-6 py-10 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="footer-name">İbrahim Basmacı</p>
            <p className="footer-role">Yazılım Mühendisi</p>
          </div>

          <div className="footer-contact">
            <a href="tel:+905428247506" className="footer-contact-item">
              <Phone size={15} />
              0542 824 75 06
            </a>
            <a href="mailto:ibrbsmc@gmail.com" className="footer-contact-item">
              <Mail size={15} />
              ibrbsmc@gmail.com
            </a>
            <span className="footer-contact-item">
              <MapPin size={15} />
              İstanbul, Türkiye
            </span>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} İbrahim Basmacı. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
