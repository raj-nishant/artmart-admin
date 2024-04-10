import React, { useState, useEffect } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

export const Carousel = ({ data }) => {
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide(slide === data.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? data.length - 1 : slide - 1);
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 2500);
    return () => clearInterval(slideInterval);
  }, [slide, data.length]);

  return (
    <div className="relative flex justify-center items-center w-full h-[400px] overflow-hidden mt-9">
      <BsArrowLeftCircleFill
        onClick={prevSlide}
        className="absolute filter drop-shadow-lg w-8 h-8 text-white left-4 cursor-pointer z-10"
      />
      {data.map((item, idx) => (
        <img
          src={item.src}
          alt={item.alt}
          key={idx}
          className={`${
            slide === idx ? "opacity-100" : "opacity-0"
          } absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg transition-opacity duration-700 ease-linear`}
        />
      ))}
      <BsArrowRightCircleFill
        onClick={nextSlide}
        className="absolute filter drop-shadow-lg w-8 h-8 text-white right-4 cursor-pointer z-10"
      />
      <span className="flex absolute bottom-4">
        {data.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setSlide(idx)}
            className={`h-2 w-2 rounded-full ${
              slide === idx ? "bg-white" : "bg-gray-500"
            } shadow-lg m-1 cursor-pointer transition-all duration-300 ease-in-out`}
          ></button>
        ))}
      </span>
    </div>
  );
};
