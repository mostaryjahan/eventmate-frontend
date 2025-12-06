import PageHeader from "@/components/shared/PageHeader";
import aboutBg from "../../../assets/contact.jpeg";

const ContactHero = () => {
  return (
    <section className=" ">
     <PageHeader 
        title="Contact Us" 
        path="Contact" 
        bgImage={aboutBg.src}
      />
    </section>
  );
};

export default ContactHero;
