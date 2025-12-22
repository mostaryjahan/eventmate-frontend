import CTA from "@/components/modules/Home/CTA";
import EventCategories from "@/components/modules/Home/EventCategories";
import FAQ from "@/components/modules/Home/FAQ";
import Hero from "@/components/modules/Home/Hero";
import HowItWorks from "@/components/modules/Home/HowItWorks";
import PopularEvents from "@/components/modules/Home/PopularEvents";
import Testimonials from "@/components/modules/Home/Testimonials";
// import TopRatedHosts from "@/components/modules/Home/TopRatedHosts";
import WhyChooseUs from "@/components/modules/Home/WhyChooseUs";
import Head from "next/head";

export const dynamic = "force-dynamic";

const HomePage = () => {
  return (
    <>
      <Head>
        <title>EventMate</title>
        <meta
          name="description"
          content="Simple and smart event management for everyone."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Hero />
        <PopularEvents />
        <EventCategories />
        <HowItWorks />
        <Testimonials />
        {/* <TopRatedHosts /> */}

        <WhyChooseUs />
        <FAQ />
        <CTA />
      </main>
    </>
  );
};

export default HomePage;
