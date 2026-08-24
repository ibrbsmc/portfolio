import { Award, Download, Milestone } from "lucide-react";
import { certificates } from "../../data/certificates"; // Sertifikalar ve detayları
import { journey } from "../../data/journey"; // Yolculuk ve deneyim geçmişi
import AnimatedContent from "../ui/animated-content";
import AnimatedShinyButton from "../ui/animated-shiny-button";
import PixelCard from "../ui/pixel-card";
import Timeline from "../ui/timeline";

// Hakkımda bölümü: tanıtım, yolculuk ve sertifikalar.
function AboutSection() {
  return (
    <section
      id="about"
      className="about-section relative overflow-hidden border-t border-zinc-200 text-zinc-900"
    >
      <div className="section-title-band">
        <div className="section-title-band-inner mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 lg:px-8">
          <h2 className="section-title">Hakkımda</h2>

          <AnimatedContent delay={120} onScroll>
            <AnimatedShinyButton
              href="https://drive.google.com/uc?export=download&id=1w5ud_9eNKENjMGPmdjUq61-D89K-cW-I"
              target="_blank"
              rel="noopener noreferrer"
              download="Ibrahim-Basmaci-CV.pdf"
            >
              <Download size={15} />
              CV İndir
            </AnimatedShinyButton>
          </AnimatedContent>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 pt-6 lg:px-8 lg:pt-8">
        <div className="max-w-3xl space-y-5">
          <p className="about-text">
            Merhaba, ben İbrahim Basmacı. 23 yaşındayım ve İstanbul Gelişim
            Üniversitesi Yazılım Mühendisliği bölümünden mezun oldum.
            Teknolojiyle uğraşmak benim için bir işten çok bir tutku; bilgisayar
            ekranının karşısında geçirdiğim her anı yeni bir şeyler üretmek ve
            kendimi geliştirmek için bir fırsat olarak görüyorum.
          </p>

          <p className="about-text">
            Ağırlıklı olarak React ve JavaScript kullanarak modern, kullanıcı
            dostu ve ölçeklenebilir web arayüzleri geliştiren bir Yazılım
            Mühendisiyim. Geliştirme sürecimde sadece kodun çalışmasına değil;
            temiz kod yazılmasına ve iyi tasarlanmış olmasına da büyük özen
            gösteriyorum. Kendimi tek bir alanla sınırlamayı sevmediğim için
            back-end ve yapay zeka gibi alanlarda da kendimi geliştirmeye devam
            ediyorum.
          </p>
        </div>
      </div>

      <AnimatedContent onScroll>
        <SubsectionHeading icon={Milestone} title="Yolculuğum" />
      </AnimatedContent>

      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <AnimatedContent onScroll className="mt-6">
          <Timeline data={journey} />
        </AnimatedContent>
      </div>

      <AnimatedContent onScroll>
        <SubsectionHeading icon={Award} title="Sertifikalar" />
      </AnimatedContent>

      <div className="mx-auto w-full max-w-6xl px-6 pb-5 lg:px-8 lg:pb-7">
        <div className="certificate-list mt-6">
          {/* Sertifikalar 2 sütunlu bir grid olduğu için her kart kendi
              sütunundan (soldaki soldan, sağdaki sağdan) yatay kayarak
              girer; satırlar arasında da hafif bir kademe (stagger) var. */}
          {certificates.map((certificate, index) => (
            <AnimatedContent
              key={certificate.name}
              onScroll
              direction="horizontal"
              reverse={index % 2 === 1}
              delay={Math.floor(index / 2) * 90}
            >
              <PixelCard
                as="a"
                gap={6}
                speed={30}
                href={certificate.href}
                target="_blank"
                rel="noreferrer"
                className="certificate-item"
              >
                <Award size={17} strokeWidth={1.8} />
                <span>
                  {certificate.name}
                  <small>{certificate.issuer}</small>
                </span>
              </PixelCard>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}

// Alt başlık bileşeni: ikon ve başlık ile birlikte alt bölümleri tanımlar.
function SubsectionHeading({ icon: Icon, title }) {
  return (
    <div className="mx-auto mt-14 w-full max-w-6xl px-6 lg:px-8">
      <div className="subsection-heading-row">
        <span className="subsection-heading-icon" aria-hidden="true">
          <Icon size={16} strokeWidth={2} />
        </span>
        <h3 className="subsection-heading">{title}</h3>
        <span className="subsection-heading-line" aria-hidden="true" />
      </div>
    </div>
  );
}

export default AboutSection;
