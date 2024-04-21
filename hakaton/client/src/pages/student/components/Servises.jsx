import React, { useState } from "react";
import Lottie from "lottie-react";
import gsap from "gsap/gsap-core";
import student from "../../../data/student-fly.json";
import { useGSAP } from "@gsap/react";
import zaman from "../../../data/application.png";
import { servicesInfo } from "../data/data";

// Avatar component
const Services = () => {
  const avatar =
    "https://www.laformation.ma/images/300/eco-kpckyi51pm4vfrxwu4safg10gw4vsy01022016013052.jpg";

  const [hoveredIndex, setHoveredIndex] = useState(null);

  useGSAP(() => {
    gsap.from("#container", {
      scale: 0,
      duration: 1,
      ease: "power2.inOut",
    });
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div id="container" className="container-services">
        <div className="absolute inset-0 flex justify-center items-center">
          <div className=" w-56 h-56 md:w-96 md:h-96 ">
            <Lottie
              animationData={student}
              loop={true}
              className={`${hoveredIndex && "-translate-y-6"} " w-full h-full"`}
            />

            {hoveredIndex !== null && (
              <p className="text-white justify-center flex w-full  bg-gray-600  p-1">
                {hoveredIndex}
              </p>
            )}
          </div>
        </div>
        <div className="icon-services">
          {servicesInfo.map((service, index) => (
            <div
              className="img-services relative"
              style={{ "--i": index }}
              key={index}
              onMouseEnter={() => setHoveredIndex(service.name)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <a href={service.link}>
                <img
                  src={service.src}
                  alt={`Avatar ${index}`}
                  className="w-10 h-10 md:w-12 md:h-12"
                />
              </a>

              <p className="flex-center  bottom-0 left-0 text-white bg-black p-1 opacity-0 transition-opacity duration-300 pointer-events-none">
                {index}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
