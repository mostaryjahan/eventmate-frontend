import PageHeader from "@/components/shared/PageHeader";
import aboutBg from "../../../assets/about/about.jpg";

const AboutHero = () => {
  return (
    <section className=" ">
     <PageHeader 
        title="Who We Are" 
        path="About" 
        bgImage={aboutBg.src}
      />
    </section>
  );
};

export default AboutHero;