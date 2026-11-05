import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const headingFont = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

const testimonials = [
  {
    quote:
      "The Bali trip was absolutely magical! Every detail was perfectly planned. The resorts were luxurious and the cultural experiences were unforgettable.",
    name: "Michael Chen",
    location: "Singapore",
    image: "/images/person2.png",
  },
  {
    quote:
      "Swiss Alps adventure exceeded all expectations. The mountain views were breathtaking and our guide was incredibly knowledgeable. Highly recommend!",
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/images/person1.png",
  },
  {
    quote:
      "Our family trip to Kyoto was seamless from start to finish. The kids loved every activity and we finally got the relaxation we needed.",
    name: "Emily Carter",
    location: "London, UK",
    image: "/images/person1.png",
  },
  {
    quote:
      "The safari package was worth every penny. Spotting the big five at sunrise is a memory our whole family will treasure forever.",
    name: "David Kim",
    location: "Toronto, Canada",
    image: "/images/person2.png",
  },
];

export function Testimonials() {
  return (
    <section className="bg-white px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <Carousel className="mt-10">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h2
                className={`${headingFont.className} text-4xl font-bold text-gray-900 md:text-5xl`}
              >
                What Travelers Say
              </h2>
              <p className="mt-3 text-sm text-gray-500">
                Real experiences from our happy travelers
              </p>
            </div>
            <div className="hidden shrink-0 gap-3 md:flex">
              <CarouselPrevious className="static my-0 size-10 rounded-full border-gray-300 text-gray-500 hover:border-gray-900 hover:text-gray-900" />
              <CarouselNext className="static my-0 size-10 rounded-full border-gray-300 text-gray-500 hover:border-gray-900 hover:text-gray-900" />
            </div>
          </div>

          <CarouselContent className="-ml-6 mt-10">
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.name}
                className="pl-6 md:basis-1/2"
              >
                <figure className="flex h-full items-start justify-between gap-6 rounded-lg border border-gray-200 p-6">
                  <div className="flex h-full flex-col justify-between gap-6">
                    <blockquote className="text-lg leading-snug text-gray-900">
                      &quot;{testimonial.quote}&quot;
                    </blockquote>
                    <figcaption>
                      <p className="text-sm font-medium text-[#0097b2]">
                        — {testimonial.name}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {testimonial.location}
                      </p>
                    </figcaption>
                  </div>
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={140}
                    height={184}
                    className="h-auto w-32 shrink-0 rounded-md object-cover md:w-36"
                  />
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
