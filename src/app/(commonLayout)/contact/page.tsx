import ContactForm from "@/components/modules/ContactPage/ContactForm";
import ContactHero from "@/components/modules/ContactPage/ContactHero";
import ContactInfo from "@/components/modules/ContactPage/ContactInfo";
import Head from "next/head";

const ContactPage = () => {
  return (
    <>
      <Head>
        <title>Contact - EventMate</title>
        <meta
          name="description"
          content="Get in touch with EventMate team. We're here to help with your event planning needs."
        />
      </Head>
      <main>
        <ContactHero />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 py-20">
          <ContactInfo />
          <ContactForm />
        </div>
      </main>
    </>
  );
};

export default ContactPage;
