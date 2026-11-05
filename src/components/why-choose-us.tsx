import Image from "next/image";
import { Playfair_Display } from "next/font/google";

const headingFont = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

const features = [
  {
    icon: "/images/ShieldCheck.png",
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: "/images/MapTrifold.png",
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: "/images/Headset.png",
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-[#e8f6f9] px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2
            className={`${headingFont.className} text-4xl font-bold text-gray-900 md:text-5xl`}
          >
            Why Choose Wanderlust
          </h2>
          <p className="mt-3 text-sm text-gray-500">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg bg-white p-8 shadow-sm"
            >
              <Image
                src={feature.icon}
                alt=""
                width={40}
                height={40}
                className="size-10"
              />
              <h3
                className={`${headingFont.className} mt-6 text-2xl font-normal text-gray-900`}
              >
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
