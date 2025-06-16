"use client";

import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import RatingInput from "../ui/rating-input";

const testimonials: {
  quote: string;
  name: string;
  title: string;
}[] = [
  {
    quote:
      "Makanannya enak, sehat, dan bisa diatur sesuai kebutuhan dietku. Totally recommended!",
    name: "Siti Aulia",
    title: "Ibu Rumah Tangga, Jakarta",
  },
  {
    quote:
      "I love how I can customize my meal plan and get it delivered right to my door.",
    name: "Andre Pratama",
    title: "Software Engineer, Bandung",
  },
  {
    quote:
      "Pilihan makanannya banyak dan semuanya sehat. Cocok banget buat yang sibuk kerja.",
    name: "Dina Kartika",
    title: "Marketing Executive, Surabaya",
  },
  {
    quote:
      "SEA Catering changed the way I eat. It's convenient, healthy, and surprisingly affordable.",
    name: "Rizky Ramadhan",
    title: "Fitness Trainer, Bali",
  },
  {
    quote:
      "Semenjak pakai SEA Catering, berat badan jadi lebih terkontrol tanpa harus masak sendiri.",
    name: "Intan Lestari",
    title: "Mahasiswi, Yogyakarta",
  },
  {
    quote:
      "The nutrition breakdown on the app helps me track my calories and macros easily.",
    name: "David Santoso",
    title: "UI/UX Designer, Tangerang",
  },
  {
    quote: "Delivery-nya selalu tepat waktu dan makanannya masih fresh!",
    name: "Galih Permana",
    title: "Karyawan Swasta, Malang",
  },
  {
    quote:
      "With SEA Catering, eating healthy is no longer a hassle. I just tap and it's done.",
    name: "Anisa Nurhaliza",
    title: "Content Creator, Jakarta",
  },
  {
    quote:
      "Akhirnya nemu catering yang bisa disesuaikan dengan alergi dan pantangan makanan saya.",
    name: "Yosep Hadiman",
    title: "Dokter Umum, Semarang",
  },
  {
    quote:
      "Very user-friendly service and the app makes everything even easier!",
    name: "Clara Wijaya",
    title: "Entrepreneur, Medan",
  },
];

const TestimonialsSection = () => {
  return (
    <>
      <section className="mt-10">
        <h2 className="text-3xl font-semibold text-center">
          What People Say ?
        </h2>

        <div className="mt-10 cursor-default">
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
        </div>
      </section>

      <section className="mt-10 pb-10">
        <h2 className="text-3xl font-semibold text-center">
          Share Your Experience
        </h2>

        <TestimonialForm className="mt-10" />
      </section>
    </>
  );
};

function TestimonialForm({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex justify-center ", className)} {...props}>
      <Card className="shadow-none border-0 md:border p-0 w-full md:w-3/4 lg:w-1/2">
        <CardContent className="grid p-0">
          <form className="md:p-8">
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="name"
                  placeholder="Jevon Mozart"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  className="resize-none min-h-[200px]"
                  placeholder="Share your experience with SEA Catering..."
                  required
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="message">Rating</Label>
                <RatingInput maxRating={5} />
              </div>
              <Button type="submit" className="w-full">
                Send Testimonial
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default TestimonialsSection;
