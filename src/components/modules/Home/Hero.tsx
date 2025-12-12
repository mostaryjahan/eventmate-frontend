import Image from "next/image";

import img1 from "../../../assets/home/main.png";
// import img3 from "../../../assets/home/img-2.jpg";
// import img2 from "../../../assets/about/about-1.jpg";
import { CalendarSearchIcon, HeadsetIcon, MegaphoneIcon } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative bg-linear-to-r from-[#F7DADF] to-[#F4E4EA] overflow-hidden pb-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-14">
        <div className="space-y-2">
          {/* Date */}
          <div className="flex items-center gap-2 text-primary font-primary">
            <span>
              <CalendarSearchIcon />
            </span>
            <p>
              Since, <span className="font-bold"> 2020</span>
            </p>
          </div>

          {/* Heading */}
          <h1 className="text-4xl lg:text-5xl font- leading-tight font-primary font-medium text-gray-900">
            EVENTS, MEETUPS & <br />
            <span className="text-primary">CONFERENCES</span>
          </h1>
          <p className="text-gray-700 font-medium">Making Events Simpler</p>
          {/* Details Row */}
          <div className="flex flex-wrap gap-6 text-gray-700 text-sm font-medium font-secondary pt-2">
            <div className="flex items-center gap-2">
              <HeadsetIcon />
              <span>
                <strong>500+</strong> Seats
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span>
                <MegaphoneIcon />
              </span>
              <span>
                <strong>50+</strong> Events
              </span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4 pt-4 text-secondary">
            <Link href="/events">
              <button className="bg-primary text-white font-medium font-secondary px-6 py-2 rounded shadow-lg hover:bg-primary/90 cursor-pointer">
                Book Now
              </button>
            </Link>
            <Link href="/events">
              <button className="border border-primary text-primary px-6 py-2 font-secondary font-medium rounded hover:bg-primary/10 cursor-pointer ">
                View Details
              </button>
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGES */}
        <div className="relative flex justify-center">
          {/* Main Image */}
          <Image
            src={img1}
            alt="main"
            className="relative  object-cover"
            width={600}
            height={600}
            loading="eager"
          />

          {/* Small Image Left */}
          {/* <Image
            src={img2}
            alt="small1"
            className="absolute left-2 xs:left-4 sm:left-12 md:left-16 lg:left-20 top-16 xs:top-20 sm:top-28 md:top-32 lg:top-36 w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-2 border-white shadow-lg object-cover"
            width={120}
            height={120}
            loading="eager"
          /> */}

          {/* Small Image Right */}
          {/* <Image
            src={img3}
            alt="small2"
            className="absolute right-2 xs:right-4 sm:right-8 md:right-12 lg:right-16 top-16 xs:top-20 sm:top-28 md:top-32 lg:top-36 w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-2 border-white shadow-lg object-cover"
            width={120}
            height={120}
            loading="eager"
          /> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
