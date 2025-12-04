import Image from "next/image";

import img1 from "../../../assets/home/hero1.jpg";
import img2 from "../../../assets/home/hero2.jpg";
import img3 from "../../../assets/home/hero3.jpg";

const Hero = () => {
  return (
    <section className="relative bg-leaner-to-r from-[#F7DADF] to-[#F4E4EA] py-24 overflow-hidden">
      {/* Left Light Glow */}
      <div className="absolute left-0 top-20 w-80 h-80 bg-white/20 blur-3xl rounded-full"></div>

      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* LEFT CONTENT */}
        <div className="space-y-4">
          {/* Date */}
          <div className="flex items-center gap-2 text-[#C6003D] font-medium">
            <span>📅</span>
            <p>
              January <span className="font-bold">21, 2021</span>
            </p>
          </div>

          {/* Heading */}
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
            EVENTS, MEETUPS & <br />
            <span className="text-primary">CONFERENCES</span>
          </h1>

          {/* Details Row */}
          <div className="flex flex-wrap gap-6 text-gray-700 text-sm font-medium pt-3">
            <div className="flex items-center gap-2">
              <span>👥</span>
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
            <button className="bg-[#a70133] text-white font-medium px-6 py-3 rounded shadow-lg hover:bg-[#a10033]">
              Book Now
            </button>
            <button className="border border-[#b30036cb] text-[#a70133] px-6 py-3 font-medium rounded hover:bg-[#c6003d1a]">
              View Details
            </button>
          </div>
        </div>

        {/* RIGHT IMAGES */}
        <div className="relative flex justify-center">
          {/* Background Blob Shape */}
          <div className="absolute w-[420px] h-[420px] bg-[#E8CBD3] rounded-[55%_45%_50%_50%/60%_55%_35%_45%]"></div>

          

          {/* Main Image */}
          <Image
            src={img1}
            alt="main"
            className="relative z-10 w-[420px] h-[420px] object-cover"
            style={{
              clipPath:
                "polygon(20% 0%, 80% 0%, 100% 25%, 100% 70%, 75% 100%, 30% 100%, 0% 75%, 0% 30%)",
              borderRadius: "30px",
            }}
          />

          {/* Small Image Left */}
          <Image
            src={img2}
            alt="small1"
            className="absolute left-0 top-20 w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
          />

          {/* Small Image Right */}
          <Image
            src={img3}
            alt="small2"
            className="absolute right-4 bottom-20 w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
