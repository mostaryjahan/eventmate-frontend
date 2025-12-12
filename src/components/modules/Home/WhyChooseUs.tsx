
import { Users, Shield, Target, Zap } from 'lucide-react';
import Link from 'next/link';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Shield />,
      title: "Verified Community",
      description: "Every member is verified for a safe experience"
    },
    {
      icon: <Target />,
      title: "Smart Matching",
      description: "Connect with people who share your exact interests"
    },
    {
      icon: <Zap />,
      title: "Instant Access",
      description: "Find events happening today or plan for tomorrow"
    },
    {
      icon: <Users />,
      title: "Real Connections",
      description: "Focus on building genuine, lasting friendships"
    }
  ];

  return (
    <div className="py-16 container mx-auto px-4">
      <div className="">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-medium font-primary mb-3">
            Why people choose us?
          </h2>
          <p className="text-gray-600 font-secondary text-lg">
            The modern way to find companions for your favorite activities
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-6 rounded-xl border border-gray-200  transition-colors group hover:shadow-md items-center"
            >
              <div className="w-12 h-12 rounded-lg bg-[#a11f65]/10 text-[#a11f65] items-center mb-4 group-hover:scale-110 transition-transform font-secondary flex justify-center mx-auto">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-center text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-center text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-[#F4E4EA] rounded-2xl p-12">
          <div className="container mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-[#a11f65] mb-2">
              <span className="font-medium font-secondary">Community Verified</span>
            </div>
            <h3 className="text-2xl font-medium font-primary mb-3">
              Join thousands who&apos;ve found their perfect event companions
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href={"/login"} className="px-5 py-2 bg-primary text-white rounded font-medium hover:bg-[#8a1a55] transition-colors">
                Get Started Free
              </Link>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;