const Footer = () => {
  return (
    <div className="relative bg-[#1C1C1C] text-gray-300">
      {/* Curve Top */}
      <div
        className="sm:block hidden  absolute -top-6 left-1/2 -translate-x-1/2 
                      w-[450px] h-[50%] bg-[#1C1C1C] rounded-t-full"
      ></div>

      <footer className="relative z-10 pt-20 pb-10 px-6 md:px-12 lg:px-20">
        {/* Logo Section */}
        <div className="flex justify-center mb-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2">
              <div className="h-6 w-6 rounded-full bg-primary"></div>
              <h2 className="text-2xl font-semibold">EventMate</h2>
            </div>
            <p className="text-sm mt-1 text-gray-400">Making Events Simpler</p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-l-4 border-primary pl-2">
              About Dvents
            </h3>

            <p className="font-semibold mb-2">The Events Specialists!</p>
            <p className="text-sm leading-relaxed mb-4 text-gray-400">
              Aorem ipsum dolor sit amet elit sed lum tempor incididunt ut
              labore et dolore alg minim veniam quis nostrud lorem psum dolor
              sit amet.
            </p>

            <button className="bg-white text-black text-sm px-5 py-2 rounded shadow hover:bg-gray-200">
              Read More
            </button>
          </div>

          {/* Keep In Touch */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-l-4 border-primary pl-2">
              Keep In Touch
            </h3>

            <ul className="space-y-3 text-sm text-gray-400">
              <li>📍 38-2 Hilton Street, California, USA</li>
              <li>📞 (+01) 123 456 7890</li>
              <li>✉ info@dvents.org</li>
              <li>⏰ Mon - Fri 9.00 am - 6.00 pm</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-l-4 border-primary pl-2">
              Quick Links
            </h3>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
              <ul className="space-y-2">
                <li>▶ Our Services</li>
                <li>▶ About Dvents</li>
                <li>▶ News Blog</li>
                <li>▶ Get In Touch</li>
              </ul>
              <ul className="space-y-2">
                <li>▶ Our Team</li>
                <li>▶ Clients List</li>
                <li>▶ Brochure</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-500">
          © 2017 <span className="text-white font-semibold">Dvents</span> — The
          Events Specialists. All Rights Reserved.
          <span className="ml-4 underline cursor-pointer">Terms of Use</span> |
          <span className="ml-2 underline cursor-pointer">Privacy Policy</span>
          <div className="flex justify-center gap-4 mt-4">
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center cursor-pointer">
              🔵
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center cursor-pointer">
              🐦
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center cursor-pointer">
              📘
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center cursor-pointer">
              📷
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
