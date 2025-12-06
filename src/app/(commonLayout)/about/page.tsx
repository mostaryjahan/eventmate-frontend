import AboutHero from "@/components/modules/AboutPage/AboutHero";
import OurMission from "@/components/modules/AboutPage/OurMission";
import WhyChooseUs from "@/components/modules/AboutPage/WhyChooseUs";
import OurStory from "@/components/modules/AboutPage/OurStory";
import Head from "next/head";

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>About - EventMate</title>
        <meta
          name="description"
          content="Learn more about EventMate - Simple and smart event management for everyone."
        />
      </Head>
      <main>
        <AboutHero />
        <OurMission />
        <WhyChooseUs />
        <OurStory />
      </main>
    </>
  );
};

export default AboutPage;