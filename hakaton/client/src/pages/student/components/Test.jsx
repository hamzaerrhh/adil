import React, { useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const Test = () => {
  const animation = useGSAP(({ target }) => {
    gsap.from(target, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
    });
  });

  useEffect(() => {
    gsap.to("#heroOverlay", {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      duration: 1,
      delay: 0.5,
    });
  }, []);

  return (
    <section className=" mt-6 px-6 relative h-screen overflow-hidden">
      <img
        src="https://th.bing.com/th/id/R.87aac0064137b216b218be72ca2cd4ce?rik=y86suX1tescYgA&pid=ImgRaw&r=0&sres=1&sresct=1"
        alt="Hero"
        className="object-cover w-full h-full"
      />
      <div
        id="heroOverlay"
        className="absolute inset-0 flex flex-col justify-center items-center px-4 text-center bg-gray-900 bg-opacity-0"
      >
        <div className="max-w-4xl mx-auto text-white" ref={animation}>
          <h1 className="text-4xl font-bold md:text-6xl mb-4">
            University of Excellence
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Learning. Leadership. Legacy.
          </p>
          <a
            href="#"
            className="inline-block px-8 py-3 bg-white text-gray-900 font-medium rounded-md shadow-md transition-colors hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default Test;
