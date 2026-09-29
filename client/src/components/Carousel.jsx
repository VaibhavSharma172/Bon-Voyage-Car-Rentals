import React from "react";
import { motion } from "motion/react";
import { MapPin, ArrowUpRight } from "lucide-react";
import Title from "./Title";

import delhi from "../assets/cities/delhi.jpg";
import mumbai from "../assets/cities/mumbai.jpg";
import goa from "../assets/cities/goa.jpg";
import jaipur from "../assets/cities/jaipur.jpg";
import bangalore from "../assets/cities/bangalore.jpg";
import chennai from "../assets/cities/chennai.jpg";
import hyderabad from "../assets/cities/hyderabad.jpg";
import kolkata from "../assets/cities/kolkata.jpg";

const destinations = [
  {
    city: "Delhi",
    image: delhi,
    tagline: "Historic Capital",
  },
  {
    city: "Mumbai",
    image: mumbai,
    tagline: "City of Dreams",
  },
  {
    city: "Goa",
    image: goa,
    tagline: "Beach Paradise",
  },
  {
    city: "Jaipur",
    image: jaipur,
    tagline: "Pink City",
  },
  {
    city: "Bengaluru",
    image: bangalore,
    tagline: "Tech Capital",
  },
  {
    city: "Chennai",
    image: chennai,
    tagline: "Cultural Gateway",
  },
  {
    city: "Hyderabad",
    image: hyderabad,
    tagline: "City of Pearls",
  },
  {
    city: "Kolkata",
    image: kolkata,
    tagline: "Cultural Capital",
  },
];

const DestinationCard = ({ destination }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="
        group
        relative
        h-[400px]
        w-[280px]
        flex-shrink-0
        overflow-hidden
        rounded-3xl
        bg-[#0B0B0B]
        shadow-lg
        sm:h-[430px]
        sm:w-[320px]
        md:h-[450px]
        md:w-[360px]
        cursor-pointer
      "
    >
      {/* Image */}
      <img
        src={destination.image}
        alt={`${destination.city} destination`}
        loading="lazy"
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          transition-transform
          duration-700
          ease-out
          group-hover:scale-110
        "
      />

      {/* Gradient */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-[#0B0B0B]
          via-[#0B0B0B]/30
          to-transparent
        "
      />

      {/* Location badge */}
      <div className="absolute left-5 top-5">
        <div
          className="
            flex
            items-center
            gap-2
            rounded-full
            bg-white/90
            px-4
            py-2
            text-xs
            font-semibold
            text-[#0B0B0B]
            shadow-sm
            backdrop-blur-sm
          "
        >
          <MapPin size={13} className="text-[#4F46E5]" />
          India
        </div>
      </div>

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-6">

        <p
          className="
            mb-2
            text-xs
            font-semibold
            uppercase
            tracking-[0.2em]
            text-[#F59E0B]
          "
        >
          {destination.tagline}
        </p>

        <h3
          className="
            text-3xl
            font-bold
            tracking-tight
            text-white
            sm:text-4xl
          "
        >
          {destination.city}
        </h3>

        <div className="mt-5 flex items-center justify-between gap-4">

          <p className="text-sm leading-relaxed text-white/70">
            Discover cars available in {destination.city}
          </p>

          <div
            className="
              flex
              h-11
              w-11
              flex-shrink-0
              items-center
              justify-center
              rounded-full
              bg-[#4F46E5]
              text-white
              transition-all
              duration-300
              group-hover:bg-[#F59E0B]
              group-hover:rotate-45
            "
          >
            <ArrowUpRight size={18} />
          </div>

        </div>

      </div>
    </motion.div>
  );
};

const Carousel = () => {
  // Duplicate the destinations to create the seamless loop.
  const carouselItems = [...destinations, ...destinations];

  return (
    <section className="overflow-hidden bg-[#F5F5F5] py-24">

      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        <Title
          title="Popular Destinations Across India"
          subTitle="Explore India's most loved road-trip destinations with complete freedom and comfort."
        />

      </div>

      {/* Carousel viewport */}
      <div className="relative mt-16 overflow-hidden">

        {/* Left fade */}
        <div
          className="
            pointer-events-none
            absolute
            left-0
            top-0
            z-10
            h-full
            w-16
            bg-gradient-to-r
            from-[#F5F5F5]
            to-transparent
            sm:w-24
          "
        />

        {/* Right fade */}
        <div
          className="
            pointer-events-none
            absolute
            right-0
            top-0
            z-10
            h-full
            w-16
            bg-gradient-to-l
            from-[#F5F5F5]
            to-transparent
            sm:w-24
          "
        />

        <motion.div
          className="flex w-max gap-5 sm:gap-6"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            x: {
              duration: 35,
              repeat: Infinity,
              ease: "linear",
            },
          }}
          whileHover={{
            animationPlayState: "paused",
          }}
        >
          {carouselItems.map((destination, index) => (
            <DestinationCard
              key={`${destination.city}-${index}`}
              destination={destination}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Carousel;