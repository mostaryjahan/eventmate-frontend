
import { Users, Shield, Target, Zap, Heart } from 'lucide-react';

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
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Why people choose <span className="text-[#a11f65]">EventMate</span>
          </h2>
          <p className="text-gray-600 text-lg">
            The modern way to find companions for your favorite activities
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-6 rounded-xl border border-gray-200 hover:border-[#a11f65] transition-colors group hover:shadow-md"
            >
              <div className="w-12 h-12 rounded-lg bg-[#a11f65]/10 text-[#a11f65] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gray-50 rounded-2xl p-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-[#a11f65] mb-4">
              <Heart className="w-5 h-5" />
              <span className="font-semibold">Community Verified</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">
              Join thousands who've found their perfect event companions
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button className="px-6 py-3 bg-[#a11f65] text-white rounded-lg font-medium hover:bg-[#8a1a55] transition-colors">
                Get Started Free
              </button>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:border-[#a11f65] transition-colors">
                See How It Works
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;