import Logo from "@/assets/logo/logo";
import {
  Clock,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  Mail,
  MapPinIcon,
  PhoneCall,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="relative bg-[#1C1C1C] text-gray-300">
      {/* Curve Top */}
      <div className="sm:block hidden  absolute -top-6 left-1/2 -translate-x-1/2 w-[450px] h-[50%] bg-[#1C1C1C] rounded-t-full"></div>

      <footer className="relative z-10 pt-14 pb-10 px-6 md:px-12 lg:px-14 font-secondary">
        {/* Logo Section */}
        <div className="flex justify-center mb-12">
          <div className="text-center">
            <div className="flex items-center justify-center">
              <Logo />
              <h2
                className="text-2xl font-semibold font-primary
              "
              >
                EventMate
              </h2>
            </div>
            <p className="text-sm mt-1 text-gray-400">Making Events Simpler</p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12  justify-items-center mx-auto">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-1 border-primary">
              About EventMate
            </h3>
            <div className="border-t w-10 mb-4 pl-2 border-2 border-primary"></div>

            <p className="font-semibold mb-2">The Events Specialists!</p>
            <p className="text-sm leading-relaxed mb-4 text-gray-400">
              EventMate helps you discover, plan, and experience events with
              ease. From meetups to large conferences, we bring organizers and
              attendees together through a simple and reliable platform.
            </p>
            
          </div>

          {/* Keep In Touch */}
          <div className="md:pl-4">
            <h3 className="text-lg font-semibold mb-1">Keep In Touch</h3>
            <div className="border-t w-10 mb-4 pl-2 border-2 border-primary"></div>

            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex gap-2">
                <span>
                  <MapPinIcon size={20}/>
                </span>{" "}
                38-2 Dhaka, Bangladesh
              </li>
              <li className="flex gap-2">
                <PhoneCall size={20}/> +8801729283578
              </li>
              <li className="flex gap-2">
                <Mail size={20}/>
                info@dvents.org
              </li>
              <li className="flex gap-2">
                <Clock size={20}/> Mon - Fri 9.00 am - 6.00 pm
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="pl-8 md:pl-16">
            <h3 className="text-lg font-semibold mb-1 border-primary">
              Quick Links
            </h3>
            <div className="border-t w-10 mb-4 pl-2 border-2 border-primary"></div>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
              <ul className="space-y-2">
                <li>
                  <Link href="/events"> Our Events</Link>
                </li>
                <li>
                  <Link href="/about"> About Us</Link>
                </li>
                <li>
                  <Link href="/become-host"> Become a Host</Link>
                </li>

                <li>
                  <Link href="/contact"> Get In Touch</Link>
                </li>
              </ul>
             
            </div>
          </div>

           {/*  */}
          <div className="pr-1">
            <div className="pr-1">
              <h3 className="text-lg font-semibold mb-1 border-primary">
              Discover
            </h3>
            <div className="border-t w-10 mb-4 pl-2 border-2 border-primary"></div>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
           
              <ul className="space-y-2">
                <li> Our Team</li>
                <li> Clients List</li>
                <li> Brochure</li>
              </ul>
              
            </div>
            </div>
            <div className="flex gap-4 mt-4">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center cursor-pointer">
                <FacebookIcon />
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center cursor-pointer">
                <Mail />
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center cursor-pointer">
                <InstagramIcon />
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center cursor-pointer">
                <LinkedinIcon />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-500">
          {new Date().getFullYear()} ©
          <span className="text-white font-semibold"> EventMate</span> — The
          Events Specialists. All Rights Reserved.
          <span className="ml-4">Terms of Use</span> |
          <span className="ml-2">Privacy Policy</span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
