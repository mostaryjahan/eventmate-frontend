import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";

const ContactInfo = () => {
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      content: "hello@eventmate.com",
      description: "We'll respond within 24 hours",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      content: "+880182382191",
      description: "Mon-Fri, 9AM-6PM EST",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Office",
      content: "123 Event Street",
      description: "Dhaka, Bangladesh",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Support Hours",
      content: "24/7 Community Support",
      description: "Live chat available",
    },
  ];

  const socialLinks = [
    { icon: <Instagram className="w-5 h-5" />, label: "Instagram", url: "#" },
    { icon: <Facebook className="w-5 h-5" />, label: "Facebook", url: "#" },
    { icon: <Twitter className="w-5 h-5" />, label: "Twitter", url: "#" },
    { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", url: "#" },
  ];

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <Card className="border-0 shadow">
        <CardHeader>
          <CardTitle className="text-2xl font-primary">Contact Information</CardTitle>
          <CardDescription className="font-secondary"> 
            Choose your preferred method to reach us
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="p-3 rounded-xl bg-[#a11f65]/10 text-[#a11f65]">
                {info.icon}
              </div>
              <div className="font-secondary">
                <h3 className="font-semibold text-gray-900">{info.title}</h3>
                <p className="text-gray-900 font-medium">{info.content}</p>
                <p className="text-sm text-gray-500 mt-1">{info.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card className="border-0 shadow font-secondary">
        <CardHeader>
          <CardTitle>Follow Us</CardTitle>
          <CardDescription>Stay updated with our latest events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            {socialLinks.map((social, index) => (
              <Button
                key={index}
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-xl hover:border-[#a11f65] hover:text-[#a11f65] hover:bg-[#a11f65]/5"
                asChild
              >
                <a href={social.url} aria-label={social.label}>
                  {social.icon}
                </a>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactInfo;
