import Link from "next/link";

const CTA = () => {
  return (
    <div className="mt-16 bg-[#F4E4EA] p-12">
      <div className="container mx-auto text-center mb-20">
        <h3 className="text-3xl md:text-4xl font-medium font-primary mb-3 mt-8">
          Want to join as a Host?
        </h3>
        <p className="text-gray-600 font-secondary max-w-3xl text-center leading-relaxed mx-auto">
          Join EventMate as a host and earn by managing events, welcoming
          guests, and ensuring everything runs smoothly. Create great
          experiences while building your reputation in the event industry.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            href={"/become-host"}
            className="px-5 py-2 bg-primary text-white rounded font-medium font-secondary hover:bg-[#8a1a55] transition-colors"
          >
            Join as a Host?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CTA;
