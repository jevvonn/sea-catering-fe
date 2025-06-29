"use client";

import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import RatingInput from "../ui/rating-input";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { testimonialSchema } from "@/schema/testimonial";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useEffect, useState } from "react";
import { useSession } from "@/hooks/use-auth";
import { createTestimonial, getTestimonials } from "@/services/testimonial";
import { toast } from "sonner";
import { Testimonial } from "@/types/testimonial";

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[] | null>(null);

  const fetchTestimonials = async () => {
    const response = await getTestimonials();

    if (response.data) {
      setTestimonials(response.data.testimonials);
    } else {
      console.error("failed to fetch Testimonials:", response.errors);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <>
      <section className="mt-10">
        <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl">
          What People Say?
        </h2>

        <div className="mt-10 cursor-default">
          {testimonials && (
            <>
              <InfiniteMovingCards
                items={testimonials.filter((_, idx) => idx < 5)}
                direction="right"
                speed="slow"
              />
              <InfiniteMovingCards
                items={testimonials.filter((_, idx) => idx > 5)}
                direction="left"
                speed="slow"
              />
            </>
          )}
        </div>
      </section>

      <section className="mt-10 pb-10 relative">
        <Image
          src="/utils/circle.svg"
          alt="Circle Decoration"
          width={400}
          height={400}
          draggable={false}
          className="absolute top-0 -z-10 hidden md:block left-0"
        />

        <Image
          src="/utils/circle.svg"
          alt="Circle Decoration"
          width={400}
          height={400}
          draggable={false}
          className="absolute bottom-0 -z-10 hidden md:block right-0"
        />

        <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl">
          Share Your Experience!
        </h2>

        <TestimonialForm className="mt-10" />
      </section>
    </>
  );
};

function TestimonialForm({ className, ...props }: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false);
  const { session } = useSession();

  const form = useForm<z.infer<typeof testimonialSchema>>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      name: "",
      message: "",
      rating: 5,
    },
  });

  async function onSubmit(data: z.infer<typeof testimonialSchema>) {
    setIsLoading(true);
    const result = await createTestimonial(data);

    console.log("Testimonial submission result:", result);

    if (!result.errors) {
      form.reset();
      toast.success("Testimonial submitted successfully!");
    } else {
      toast.error(result.errors);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    if (session) {
      form.setValue("name", session.user?.name || "");
    }
  }, [session, form]);

  return (
    <div className={cn("flex justify-center ", className)} {...props}>
      <Card className="shadow-none border-0 md:border p-0 w-full md:w-3/4 lg:w-1/2">
        <CardContent className="grid p-0">
          <Form {...form}>
            <form className="md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex-1 w-full md:w-auto">
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="Jevon Mozart"
                              required
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-sm" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    name="message"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex-1 w-full md:w-auto">
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Textarea
                              id="message"
                              className="resize-none min-h-[200px]"
                              placeholder="Share your experience with SEA Catering..."
                              required
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-sm" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-3">
                  <FormField
                    name="rating"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex-1 w-full md:w-auto">
                        <FormLabel>Rating</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <RatingInput {...field} maxRating={5} allowHalf />
                          </div>
                        </FormControl>
                        <FormMessage className="text-sm" />
                      </FormItem>
                    )}
                  />
                </div>
                <Button disabled={isLoading} type="submit" className="w-full">
                  Send Testimonial
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default TestimonialsSection;
