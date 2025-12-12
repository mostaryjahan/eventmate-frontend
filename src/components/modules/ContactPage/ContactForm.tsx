"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Send, User, Mail, MessageSquare, AlertCircle, CheckCircle, Loader2 } from "lucide-react";

interface ContactFormProps {
  title?: string;
  description?: string;
  showTitle?: boolean;
  variant?: "default" | "minimal" | "inline";
  className?: string;
  onSuccess?: () => void;
}

const ContactForm = ({
  title = "Send us a Message",
  description = "Fill out the form below and we'll get back to you soon",
  showTitle = true,
  className = "",
  onSuccess
}: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields", {
        icon: <AlertCircle className="w-5 h-5" />,
        duration: 3000,
      });
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast.error("Please enter a valid email address", {
        icon: <AlertCircle className="w-5 h-5" />,
        duration: 3000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Show success toast
      toast.success("Message sent successfully!", {
        description: "We'll get back to you within 24 hours",
        icon: <CheckCircle className="w-5 h-5" />,
        duration: 5000,
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });

      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.", {
        icon: <AlertCircle className="w-5 h-5" />,
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

 

 

  // Default variant
  return (
    <Card className={`border-0 shadow overflow-hidden max-w-xl ${className}`}>
      {showTitle && (
        <CardHeader className="">
          <CardTitle className="text-2xl flex items-center gap-2 font-primary">
            <Send className="w-6 h-6" />
            {title}
          </CardTitle>
          <CardDescription className="text-gray-600 font-secondary">
            {description}
          </CardDescription>
        </CardHeader>
      )}
      
      <CardContent className={`${showTitle ? 'pt-2' : 'pt-2'}`}>
        <form onSubmit={handleSubmit} className="space-y-4 font-secondary">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name *
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="h-12"
                required
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="h-12"
                required
              />
            </div>
          </div>

          {/* Subject Field */}
          <div className="space-y-2">
            <Label htmlFor="subject">
              Subject
            </Label>
            <Input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="How can we help you?"
              className="h-12"
            />
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <Label htmlFor="message" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Your Message *
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your inquiry..."
              className="min-h-[150px] resize-none"
              required
            />
            <p className="text-sm text-gray-500">
              Please provide as much detail as possible
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 hover:from-[#8a1a55] hover:to-purple-700 text-white text-lg font-medium shadow hover:shadow-xl transition-all"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </>
            )}
          </Button>

          <p className="text-center text-gray-500 text-sm">
            By submitting this form, you agree to our{" "}
            <a href="#" className="text-[#a11f65] hover:underline">
              Privacy Policy
            </a>
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;