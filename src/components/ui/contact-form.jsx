import { Loader2, Send } from "lucide-react";
import { useState } from "react";
import AnimatedShinyButton from "./animated-shiny-button";

const WEB3FORMS_ACCESS_KEY = "9c9bb3dd-0210-4350-93b3-b5a913a497e3";

const initialFormData = { firstName: "", lastName: "", email: "", message: "" };

function ContactForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState("idle");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (event.target.botcheck.checked) return;

    setStatus("submitting");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "Portfolyo üzerinden yeni mesaj",
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setFormData(initialFormData);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {}
      <input
        type="checkbox"
        name="botcheck"
        className="contact-honeypot"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="contact-field-row">
        <div className="contact-field">
          <label htmlFor="firstName">Ad</label>
          <div className="border-glow-field">
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Adınız"
            />
          </div>
        </div>

        <div className="contact-field">
          <label htmlFor="lastName">Soyad</label>
          <div className="border-glow-field">
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Soyadınız"
            />
          </div>
        </div>
      </div>

      <div className="contact-field">
        <label htmlFor="email">E-posta</label>
        <div className="border-glow-field">
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="ornek@eposta.com"
          />
        </div>
      </div>

      <div className="contact-field">
        <label htmlFor="message">Mesaj</label>
        <div className="border-glow-field">
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder="Mesajınızı buraya yazın..."
          />
        </div>
      </div>

      <AnimatedShinyButton
        type="submit"
        disabled={status === "submitting"}
        className="contact-submit"
      >
        {status === "submitting" ? (
          <Loader2 size={15} className="contact-spin" />
        ) : (
          <Send size={15} />
        )}
        {status === "submitting" ? "Gönderiliyor..." : "Mesajı Gönder"}
      </AnimatedShinyButton>

      {status === "success" && (
        <p className="contact-status contact-status-success">
          Mesajınız başarıyla gönderildi, teşekkürler!
        </p>
      )}
      {status === "error" && (
        <p className="contact-status contact-status-error">
          Mesaj gönderilemedi, lütfen daha sonra tekrar deneyin.
        </p>
      )}
    </form>
  );
}

export default ContactForm;
