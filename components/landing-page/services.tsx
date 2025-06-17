import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowUpRightIcon } from "lucide-react";

const ServicesSection = () => {
  return (
    <section className="pb-10 md:px-12 relative space-y-10 md:space-y-16">
      <Image
        src="/utils/circle.svg"
        alt="Circle Decoration"
        width={400}
        height={400}
        draggable={false}
        className="absolute top-1/2 -translate-y-1/2 -z-10 left-0"
      />
      <Image
        src="/utils/circle.svg"
        alt="Circle Decoration"
        width={400}
        height={400}
        draggable={false}
        className="absolute top-0 -z-10 right-0"
      />

      <Image
        src="/utils/circle.svg"
        alt="Circle Decoration"
        width={400}
        height={400}
        draggable={false}
        className="absolute bottom-0 -z-10 right-0"
      />

      <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl">
        What We Provides?
      </h2>

      <div className="flex flex-col-reverse md:flex-row justify-between gap-10">
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <h3 className="text-3xl font-bold">Meal Customization</h3>
            <p className="text-gray-600 mt-4 text-justify">
              Customize your meals to fit your dietary needs and preferences.
              Choose from a variety of ingredients and meal plans that suit your
              lifestyle. Enjoy flexible portion sizes, allergen-friendly
              options, and a rotating menu to keep your meals exciting. Our
              nutrition experts are here to help you make the best choices for
              your health and taste preferences.
            </p>
          </div>

          <div className="mt-4">
            <Button className="px-6 py-6" variant="outline">
              <span>Plans Your Meals</span>
              <ArrowUpRightIcon />
            </Button>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <Image
            src={"/images/services-healthy-meals.jpg"}
            alt="Healthy Meals"
            width={800}
            height={600}
            className="w-auto md:w-[450px] md:max-h-[300px] lg:max-h-[400px] lg:max-h- h-auto mt-6 rounded-lg"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-10">
        <div className="w-full flex justify-center">
          <Image
            src={"/images/services-easy-delivery.jpg"}
            alt="Easy Delivery"
            width={800}
            height={600}
            className="w-auto md:w-[450px] md:max-h-[300px] lg:max-h-[400px] h-auto mt-6 rounded-lg"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <h3 className="text-3xl font-bold">
              Easy Delivery to Major Cities
            </h3>
            <p className="text-gray-600 mt-4 text-justify">
              Enjoy the convenience of our meal delivery service, available in
              major cities across Indonesia. We ensure that your meals are
              delivered fresh and on time, so you can focus on what matters
              most. Whether you&apos;re at home or at work, our reliable
              delivery team is here to bring healthy meals right to your
              doorstep.
            </p>
          </div>

          <div className="flex justify-end mt-4">
            <Button className="p-6" variant="outline">
              <span>Order Your Meals</span>
              <ArrowUpRightIcon />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row justify-between gap-10">
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <h3 className="text-3xl font-bold">
              Detailed Nutritional Information
            </h3>
            <p className="text-gray-600 mt-4 text-justify">
              Stay informed about what you eat with our detailed nutritional
              information for every meal. We provide clear labels on calories,
              and ingredients, so you can make informed choices that align with
              your health goals. Our commitment to transparency ensures that you
              know exactly what goes into your meals.
            </p>
          </div>

          <div className="mt-4">
            <Button className="px-6 py-6" variant="outline">
              <span>See Our Menu</span>
              <ArrowUpRightIcon />
            </Button>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <Image
            src={"/images/services-detailed-information.jpg"}
            alt="Detailed Nutritional Information"
            width={800}
            height={600}
            className="w-auto md:w-[450px] md:max-h-[300px] lg:max-h-[400px] lg:max-h- h-auto mt-6 rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
