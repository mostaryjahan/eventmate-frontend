import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function Testimonial() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* LEFT TEXT AREA */}
        <div>
          <p className="text-red-500 font-semibold tracking-wide mb-2">Testimonial</p>
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight mb-5">
            WHAT PEOPLE SAY<br />ABOUT EVENTLAB.
          </h2>
          <p className="text-gray-500 leading-relaxed">
            Cras semper, massa vel aliquam luctus, eros odio tempor turpis, ac placerat metus 
            tortor eget magna. Donec mattis posuere pharetra. Donec vestibulum ornare velit 
            ut sollicitudin ut sollicitudin.
          </p>
        </div>

        {/* RIGHT CARD */}
        <div>
          {/* TOP ROW WITH COUNT + ARROWS */}
          {/*  */}
          <div className="flex items-center justify-between mb-4">
            <p className="tracking-widest text-sm font-medium text-gray-600">03 — 03</p>

            <div className="flex gap-3">
              <button className="border border-gray-300 rounded-full p-2 hover:bg-gray-100 transition">
                ←
              </button>
              <button className="border border-gray-300 rounded-full p-2 hover:bg-gray-100 transition">
                →
              </button>
            </div>
          </div>

          <Card className="border border-red-200 shadow-sm">
            <CardContent className="p-6 flex gap-6 items-center">

              {/* IMAGE */}
              <div className="w-28 h-28 rounded-lg overflow-hidden">
                <Image
                  src="/test/user.png"
                  alt="User Image"
                  width={120}
                  height={120}
                  className="object-cover"
                />
              </div>

              {/* TEXT CONTENT */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Scarlett Eleanor</h3>
                <p className="text-gray-500 text-sm mb-3">Marketing</p>

                <p className="text-gray-600 leading-relaxed text-sm">
                  Cras semper, massa vel aliquam luctus, eros odio tempor turpis, ac placerat metus 
                  tortor eget magna. Donec mattis posuere pharetra. Donec vestibulum ornare velit ut.
                </p>
              </div>

            </CardContent>
          </Card>
        </div>

      </div>
    </section>
  );
}
