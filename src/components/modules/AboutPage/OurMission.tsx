import Image from "next/image";
import img1 from "../../../assets/about/about-1.jpg";
import img2 from "../../../assets/about/about-2.jpg";
import img3 from "../../../assets/about/about-4.jpg";

const OurMission = () => {
  return (
    <section className="bg-primary/5 ">
      <div className="py-16 container mx-auto px-4 flex justify-between items-center gap-10">
        {/* left side */}
        <div className="w-1/2">
          <p className="text-primary font-secondary font-medium">
            About EventMate
          </p>

          <h2 className="text-3xl font-medium font-primary leading-snug mt-2">
            Creating Memorable Events That <br /> Bring People Together
          </h2>

          <p className="text-gray-700 font-secondary mt-4 max-w-lg">
            EventMate is your trusted partner in creating exceptional events. We
            specialize in bringing people together through carefully crafted
            experiences that leave lasting impressions. From intimate gatherings
            to large-scale activities, we help hosts create meaningful moments
            and make it easier for people to connect and enjoy events they truly
            care about.
          </p>

          {/* Stats */}
          <div className="flex gap-10 mt-8 font-primary">
            <div>
              <p className="text-3xl font-medium">100+</p>
              <p className="text-gray-600 text-sm">Speaker</p>
            </div>
            <div>
              <p className="text-3xl font-medium">400+</p>
              <p className="text-gray-600 text-sm">Event</p>
            </div>
            <div>
              <p className="text-3xl font-medium">100+</p>
              <p className="text-gray-600 text-sm">Schedule</p>
            </div>
          </div>
        </div>

        {/* IMAGE GRID */}
        <div className="w-1/2 col-span-2 grid grid-cols-2 gap-2 h-[500px]">
          {/* Left image */}
          <div className="flex items-center">
            <Image
              src={img3}
              width={400}
              height={400}
              alt="img3"
              className="rounded-lg object-cover w-full h-[300px]"
            />
          </div>

          {/* Right images */}
          <div className="grid grid-rows-2 gap-2">
            <Image
              src={img2}
              width={400}
              height={250}
              alt="img2"
              className="rounded-lg object-cover w-full h-full"
            />
            <Image
              src={img1}
              width={400}
              height={250}
              alt="img1"
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurMission;
