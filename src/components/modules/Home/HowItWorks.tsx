// app/components/HowItWorks.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Search, Rocket } from "lucide-react";

type Step = {
  number: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

const steps: Step[] = [
  {
    number: 1,
    title: "Sign Up",
    description:
      "Create your account in a few simple steps and unlock access to all our event tools.",
    icon: UserPlus,
  },
  {
    number: 2,
    title: "Choose Service",
    description:
      "Browse through our available services and pick the one that matches your event needs.",
    icon: Search,
  },
  {
    number: 3,
    title: "Get Started",
    description:
      "Begin managing your event with ease and enjoy a smooth, hassle-free experience.",
    icon: Rocket,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-primary/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 mask-[linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
        
          <h2 className="text-3xl md:text-4xl font-medium font-primary bg-black bg-clip-text text-transparent mb-3">
            How It Works
          </h2>
          <p className="text-lg font-secondary text-slate-600 max-w-2xl mx-auto">
            Get started with EventMate in three simple steps and transform your event experience
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative group">
               

                <Card className="relative bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-1 z-10">
                  <CardHeader className="flex flex-col items-center pb-1">
                    <div className="relative mb-4 py-2">
                      <div className="w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                     
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-primary transition-colors font-secondary -mt-8">
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-slate-600 leading-relaxed group-hover:text-primary transition-colors font-secondary -mt-4 mb-4">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        
      </div>
    </section>
  );
}
