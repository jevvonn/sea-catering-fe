import Image from "next/image";
import React from "react";
import { Badge } from "../ui/badge";
import {
  ArrowUpRightIcon,
  CalendarCheck,
  MapPinHouseIcon,
  MinusIcon,
  SaladIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative pb-10">
      <Image
        src="/utils/circle.svg"
        alt="Circle Decoration"
        width={400}
        height={400}
        draggable={false}
        className="absolute bottom-0 -z-10 left-0"
      />
      <Image
        src="/utils/circle.svg"
        alt="Circle Decoration"
        width={400}
        height={400}
        draggable={false}
        className="absolute top-0 -z-10 right-0"
      />

      <div className="text-center space-y-8  md:space-y-10 z-0">
        <div>
          <Badge variant="default" className="text-xl sm:text-3xl mb-2 py-2">
            SEA Catering
          </Badge>
          <h1 className="font-bold text-4xl sm:text-5xl leading-14 sm:leading-20 text-gray-800">
            Healthy Meals, Anytime, <br /> and Anywhere
          </h1>
        </div>

        <div className="flex justify-center gap-4 text-gray-800">
          <SaladIcon size={80} />
          <MinusIcon size={80} />
          <CalendarCheck size={80} />
          <MinusIcon size={80} />
          <MapPinHouseIcon size={80} />
        </div>

        <p className="text-gray-600 text-sm sm:text-lg mt-6">
          <span className="italic text-primary">SEA Catering</span> offers
          healthy, customizable meals designed to match your lifestyle, <br />
          and delivered fresh to every corner of Indonesia.
        </p>

        <Link href="/menus">
          <Button className="md:px-4 py-6 lg:mt-14" variant="outline">
            <span className="md:text-lg">See Our Menu</span>
            <ArrowUpRightIcon />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
