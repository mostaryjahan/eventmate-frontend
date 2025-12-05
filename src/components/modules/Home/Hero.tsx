import Image from "next/image";

import img1 from "../../../assets/home/hero.png";
import img2 from "../../../assets/home/img-1.jpg";
import img3 from "../../../assets/home/img-3.jpg";
import { HeadsetIcon } from "lucide-react";
import HeroFilter from "./HeroFilter";


const Hero = () => {
  return (
    <section className="relative bg-linear-to-r from-[#F7DADF] to-[#F4E4EA] overflow-hidden pb-20">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-20">
        {/* LEFT CONTENT */}
        <div className="space-y-4">
          {/* Date */}
          <div className="flex items-center gap-2 text-primary font-secondary">
            <span>📅</span>
            <p>
              January <span className="font-bold">21, 2021</span>
            </p>
          </div>

          {/* Heading */}
          <h1 className="text-4xl lg:text-5xl font- leading-tight font-primary font-medium text-gray-900">
            EVENTS, MEETUPS & <br />
            <span className="text-primary">CONFERENCES</span>
          </h1>

          {/* Details Row */}
          <div className="flex flex-wrap gap-6 text-gray-700 text-sm font-medium font-secondary pt-3">
            <div className="flex items-center gap-2">
              <span><HeadsetIcon/></span>
              <span>
                <strong>500</strong> Seat
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span>📣</span>
              <span>
                <strong>10</strong> Speaker
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span>📍</span>
              <span>1356 Broadway, New York</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4 pt-6">
            <button className="bg-primary text-white font-medium font-secondary px-6 py-3 rounded shadow-lg hover:bg-primary/90">
              Book Now
            </button>
            <button className="border border-primary text-primary px-6 py-3 font-secondary font-medium rounded hover:bg-primary/10 ">
              View Details
            </button>
          </div>
        </div>

        {/* RIGHT IMAGES */}
        <div className="relative flex justify-center">
          
          {/* Main Image */}
          <Image
            src={img1}
            alt="main"
            className="relative  object-cover"
            width={500}
            height={500}
            loading="eager"
            
          />

          {/* Small Image Left */}
          <Image
            src={img2}
            alt="small1"
            className="absolute left-2 sm:left-20 top-20 sm:top-36 w-18 sm:w-28 h-18 sm:h-28 rounded-full border border-white shadow-lg object-cover"
            width={112}
            height={112}
            loading="lazy"
          />

          {/* Small Image Right */}
          <Image
            src={img3}
            alt="small2"
            className="absolute right-0 sm:right-16 top-20 sm:top-36 w-18 sm:w-28 h-18 sm:h-28  rounded-full border border-white shadow-lg object-cover"
             width={112}
            height={112}
            loading="lazy"
          />
        </div>
      </div>
    

    {/* filter */}
    <div className="hidden md:block absolute w-full max-w-5xl mx-auto left-1/2 -translate-x-1/2 -bottom-4">
     <HeroFilter/>
    </div>
  
    
    </section>
  );
};

export default Hero;
