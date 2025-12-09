import "./Contact.css";

function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-wrapper">
        <p className="contact-title-small">Get in touch</p>
        <h2 className="contact-title">
          Contact <span>Me</span>
        </h2>

        <div className="contact-grid">
          {/* LEFT INFO CARD */}
          <div className="contact-info">
            <h3>
              Let&apos;s work <span>together</span>
            </h3>

            <p className="contact-description">
              Have an idea, project, or just want to say hi?
              Drop me a message and I&apos;ll get back to you as soon as I can.
            </p>

            <div className="contact-details">
              <p>
                <span className="contact-label">Email:</span>
                <span className="contact-value">
                  rajaramsiva19@gmail.com
                </span>
              </p>
              <p>
                <span className="contact-label">Location:</span>
                <span className="contact-value"> India</span>
              </p>
            </div>
          </div>

          {/* RIGHT FORM CARD */}
          <div className="contact-form-card">
  <form
    className="contact-form"
    onSubmit={(e) => {
      e.preventDefault();

      const name = e.target.name.value;
      const email = e.target.email.value;
      const message = e.target.message.value;

      const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=m.sanjeevmuniraj@gmail.com&su=Portfolio Contact from ${encodeURIComponent(
        name
      )}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      )}`;

      window.open(gmailLink, "_blank");
    }}
  >
    <label>Your Name</label>
    <input type="text" name="name" required placeholder="Enter your name" />

    <label>Your Email</label>
    <input type="email" name="email" required placeholder="Enter your email" />

    <label>Message</label>
    <textarea
      name="message"
      rows="4"
      required
      placeholder="Your message..."
    />

    <button type="submit">Send Message</button>
  </form>
</div>

        </div>
      </div>
    </section>
  );
}

export default Contact;
