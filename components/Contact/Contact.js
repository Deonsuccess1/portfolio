import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Toaster, toast } from "react-hot-toast";
import mail from "./mailer";
import Button from "../Button/Button";
import { MENULINKS } from "../../constants";
import styles from "./Contact.module.scss";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill all fields");
      return;
    }

    setIsSending(true);
    try {
      await mail(formData);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "none" } });

    tl.from(
      sectionRef.current.querySelectorAll(".staggered-reveal"),
      { opacity: 0, duration: 0.5, stagger: 0.5 },
      "<"
    );

    ScrollTrigger.create({
      trigger: sectionRef.current.querySelector(".contact-wrapper"),
      start: "100px bottom",
      end: "center center",
      scrub: 0,
      animation: tl,
    });

    return () => tl.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={MENULINKS[2].ref}
      className="mt-30 w-full relative select-none bg-black pt-20 sm:pt-10 md:pt-5 lg:pt-1 pb-20"
    >
      <Toaster />
      <div className="section-container flex flex-col justify-center">
        <div className="flex flex-col contact-wrapper">
          <div className="flex flex-col">
            <p className="uppercase tracking-widest text-gray-light-1 staggered-reveal">
              CONTACT
            </p>
            <h1 className="text-6xl mt-2 font-medium text-gradient w-fit staggered-reveal">
              Contact
            </h1>
          </div>
          <h2 className="text-[1.65rem] font-medium md:max-w-lg w-full mt-2 staggered-reveal">
            I&apos;d love to hear from you — send me a message.
          </h2>
        </div>

        <div className="pt-10 sm:mx-auto sm:w-[30rem] md:w-[35rem] staggered-reveal text-center">
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className={styles.input}
              required
            />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              type="email"
              className={styles.input}
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              className={styles.textarea}
              required
            />
            <Button
              onClick={handleSubmit}
              classes={`link ${isSending ? "opacity-50 cursor-not-allowed" : ""}`}
              type="primary"
            >
              {isSending ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
