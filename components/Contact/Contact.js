import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Button from "../Button/Button";
import { MENULINKS } from "../../constants";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);

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

  const mailto = `mailto:deonbaiju878@gmail.com?subject=Contact%20from%20Website`;

  return (
    <section
      ref={sectionRef}
      id={MENULINKS[2].ref}
      className="mt-30 w-full relative select-none bg-black pt-20 sm:pt-10 md:pt-5 lg:pt-1 pb-20"
    >
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
          <p className="mb-6">Or email me directly at <a className="link" href="mailto:deonbaiju878@gmail.com">deonbaiju878@gmail.com</a></p>
          <Button href={mailto} classes="link" type="primary">
            Email Me
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
