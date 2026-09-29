import { motion } from "motion/react";
import SearchBox from "./SearchBox";
import Herocar from "../assets/Herocar.png";


const Hero = () => {
  return (
    <section className="relative overflow-visible bg-ink text-white">

      {/* Hero content */}
      <div className="mx-auto max-w-7xl px-6 pb-36 pt-20 md:px-8 md:pb-40 md:pt-28">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >

          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Premium car rental
          </p>

          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            Find your perfect
            <br />
            <span className="text-primary">
              ride.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/50">
            Rent premium vehicles with flexible locations,
            simple booking and transparent pricing.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <button className="rounded-full bg-primary px-7 py-3.5 font-semibold text-white transition hover:bg-primary/90">
              Browse cars
            </button>

            <button className="rounded-full border border-white/20 px-7 py-3.5 font-semibold text-white transition hover:bg-white/5">
              Explore destinations
            </button>

          </div>

        </motion.div>


        {/* CAR IMAGE */}
  <div className="absolute right-0 top-1/2 hidden w-[48%] -translate-y-1/2 lg:block">
    <img
      src={Herocar}
      alt="hero car"
      className="w-full object-contain"
    />
  </div>

        {/* Search box */}
        <SearchBox />

      </div>
    </section>
  );
};

const SearchField = ({ icon, label, value }) => (
  <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
    <div className="flex items-center gap-2 text-gray-400">
      {icon}
      <span className="text-xs">{label}</span>
    </div>

    <p className="mt-1 text-sm font-semibold text-ink">
      {value}
    </p>
  </div>
);

export default Hero;