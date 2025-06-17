import { Phone, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ContactSection = () => {
  return (
    <section className="w-full mt-4 py-12 md:py-24 lg:py-32 bg-muted/50 mb-12 rounded-md">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Get in Touch
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Ready to get started? Contact our team and we&apos;ll help you
              find the perfect meal plans.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-2xl mt-12">
          <Card className="border-0">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl">Contact Information</CardTitle>
              <CardDescription>
                Reach out to our team for any inquiries or support
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex items-center space-x-4 p-4 rounded-lg bg-muted/50">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Manager
                    </p>
                    <p className="text-lg font-semibold">Brian</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 rounded-lg bg-muted/50">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Phone Number
                    </p>
                    <a
                      href="tel:08123456789"
                      className="text-lg font-semibold hover:text-primary transition-colors"
                    >
                      +62 8123456789
                    </a>
                  </div>
                </div>
              </div>

              <div className="text-center pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Available Monday to Friday, 9:00 AM - 6:00 PM
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
