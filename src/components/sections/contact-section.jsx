import { contactLinks } from "../../data/contact-links"; // E-posta, GitHub ve LinkedIn bağlantılarının bulunduğu dizi
import AnimatedContent from "../ui/animated-content";
import ContactForm from "../ui/contact-form";

function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-zinc-200 bg-white text-zinc-900"
    >
      <div className="section-title-band">
        <div className="section-title-band-inner mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 lg:px-8">
          <h2 className="section-title">İletişim</h2>

          <AnimatedContent delay={100} onScroll>
            <div className="flex gap-3">
              {contactLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  aria-label={label}
                  className="icon-link icon-link-dark"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </AnimatedContent>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 pt-6 pb-10 lg:px-8 lg:pt-8 lg:pb-14">
        <p className="about-text max-w-2xl">
          Mesajınızı aşağıdaki form aracılığıyla iletebilir veya diğer iletişim
          kanalları üzerinden bana doğrudan ulaşabilirsiniz.
        </p>

        <div className="mt-14 max-w-xl">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
