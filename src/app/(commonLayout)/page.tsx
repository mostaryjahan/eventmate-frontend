import EventCategories from "@/components/modules/Home/EventCategories";
import FAQ from "@/components/modules/Home/FAQ";
import Hero from "@/components/modules/Home/Hero";
import HowItWorks from "@/components/modules/Home/HowItWorks";
import PopularEvents from "@/components/modules/Home/PopularEvents";
import Testimonials from "@/components/modules/Home/Testimonials";
import TopRatedHosts from "@/components/modules/Home/TopRatedHosts";
import WhyChooseUs from "@/components/modules/Home/WhyChooseUs";
import Head from "next/head";

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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Hero />
        <EventCategories/>
        <PopularEvents/>
        <HowItWorks/>
        <TopRatedHosts/>
        <Testimonials />
        <WhyChooseUs/>
        <FAQ/>
      </main>
    </>
  );
};

export default HomePage;
