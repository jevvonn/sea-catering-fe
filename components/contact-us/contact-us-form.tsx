"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ContactUsForm = () => {
  return (
    <Card className="w-full shadow-none border-none">
      <CardContent className="px-0 md:px-6">
        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="flex items-center gap-2">
              Message
            </Label>
            <Textarea
              id="message"
              placeholder="Enter your message here..."
              className="min-h-[120px] resize-none"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactUsForm;
