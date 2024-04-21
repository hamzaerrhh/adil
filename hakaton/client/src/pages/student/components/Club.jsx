import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import bg from "../assets/bg.png";
import { logo } from "../assets";

const Club = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slides = sliderRef.current.querySelectorAll(".slide");
    const totalSlides = slides.length;
    let currentIndex = 0;

    // Hide all slides except the first one
    gsap.set(slides, { display: "none" });
    gsap.set(slides[0], { display: "block" });

    const tl = gsap.timeline({ defaults: { duration: 1 } });

    const nextSlide = () => {
      const currentSlide = slides[currentIndex];
      const nextIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
      const nextSlide = slides[nextIndex];

      tl.to(currentSlide, { opacity: 0, x: "-100%" })
        .to(nextSlide, { opacity: 1, x: "0%" }, "-=1")
        .set(currentSlide, { display: "none" })
        .set(nextSlide, { display: "block" });

      currentIndex = nextIndex;
    };

    sliderRef.current.addEventListener("click", nextSlide);

    return () => {
      sliderRef.current.removeEventListener("click", nextSlide);
    };
  }, []);
  return (
    <div ref={sliderRef} className="slider pt-10">
      <div className="slide">
        <div className="relative w-full h-60">
          <div
            className="absolute inset-0 bg-cover bg-center rounded-lg"
            style={{ backgroundImage: `url(${bg})` }}
          >
            <div className="absolute items-center  justify-center top-0 right-0 mt-4 mr-4">
              <div className="relative bg-white rounded-full w-24 h-24 p-2 border-2 border-black">
                <img src={logo} alt="Logo" className="w-20 h-20" />
              </div>
              <div className="mt-2">
                <h1 className="text-white text-xl">university</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="slide">
        <div className="relative w-full h-60">
          <div
            className="absolute inset-0 bg-cover bg-center rounded-lg"
            style={{ backgroundImage: `url(${bg})` }}
          >
            <div className="absolute items-center  justify-center top-0 right-0 mt-4 mr-4">
              <div className="relative bg-white rounded-full w-24 h-24 p-2 border-2 border-black">
                <img src={logo} alt="Logo" className="w-20 h-20" />
              </div>
              <div className="mt-2">
                <h1 className="text-white text-xl">university1</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="slide">
        <div className="relative w-full h-60">
          <div
            className="absolute inset-0 bg-cover bg-center rounded-lg"
            style={{ backgroundImage: `url(${bg})` }}
          >
            <div className="z absolute items-center  justify-center top-0 left-0 mt-4 mr-4">
              <div>
                <p>here i will add the description of the clube</p>
              </div>
            </div>
            <div className="absolute items-center  justify-center top-0 right-0 mt-4 mr-4">
              <div className="relative bg-white rounded-full w-24 h-24 p-2 border-2 border-black">
                <img src={logo} alt="Logo" className="w-20 h-20" />
              </div>
              <div className="mt-2">
                <h1 className="text-white text-xl">university2</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Club;
