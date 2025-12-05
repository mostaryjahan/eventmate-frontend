import Image from "next/image";
import Link from "next/link";

interface PageHeaderProps {
  title: string;
  path: string;
  bgImage: string;
}

const PageHeader = ({ title, path, bgImage }: PageHeaderProps) => {
  return (
    <div className="relative w-full h-80 flex items-center justify-center text-center overflow-hidden">
      <Image
        src={bgImage}
        alt={title}
        width={2000}
        height={1000}
        className="absolute inset-0 object-cover w-full h-full"
      />
      {/* Base linear Background */}
      <div className="absolute inset-0 bg-linear-to-br from-[#F7DADF]/90 via-[#e7dae0]/80 to-[#F4E4EA]/90" />

      {/* Soft gradient mesh overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-linear-to-r from-pink-200/20 via-purple-200/15 to-rose-200/20" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/5 to-transparent" />
      </div>

      {/* Subtle noise texture for modern feel */}
      <div className="absolute inset-0 opacity-[0.02] bg-noise-pattern"></div>

      {/* Soft layered linear for depth */}
      <div className="absolute inset-0 opacity-50 mix-blend-overlay">
        <div className="absolute w-[500px] h-[500px] bg-linear-to-r from-pink-300/30 to-transparent rounded-full -top-40 -left-40 blur-3xl" />
        <div className="absolute w-[500px] h-[500px] bg-linear-to-l from-purple-300/20 to-transparent rounded-full -bottom-40 -right-40 blur-3xl" />
        <div className="absolute w-[300px] h-[300px] bg-linear-to-br from-rose-200/40 to-transparent rounded-full top-1/2 left-1/4 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-white px-4">
        <h1 className="text-3xl lg:text-5xl text-primary font-primary font-semibold mt-2">
          {title}
        </h1>

        <p className="relative z-10 flex justify-center items-center mt-3 text-sm gap-1">
          <Link href="/" className="text-primary hover:underline">
            Home
          </Link>
          <span className="text-primary/60 mx-1">/</span>
          <span className="text-primary/90">{path}</span>
        </p>
      </div>
    </div>
  );
};

export default PageHeader;
