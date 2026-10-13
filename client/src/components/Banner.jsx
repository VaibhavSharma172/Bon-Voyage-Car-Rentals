import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react'

const Banner = () => {
  return (
    <section className="bg-canvas px-6 py-24">

      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-ink">

        <div className="grid items-center gap-10 px-8 py-14 md:grid-cols-2 md:px-16">

          <div>

            <p className="text-sm font-semibold uppercase tracking-widest text-amber-400">
              Why Mirror?
            </p>

            <h2 className="mt-4 text-4xl font-bold leading-tight text-white md:text-5xl">
              Everything you need
              <br />
              for the road.
            </h2>

            <p className="mt-6 max-w-lg leading-relaxed text-white/60">
              From weekend road trips to long journeys,
              Mirror gives you an easy way to find and
              book the right vehicle.
            </p>

            <button className="mt-8 rounded-full bg-primary px-7 py-3.5 font-semibold text-white">
              Start exploring
            </button>

          </div>

          <div className="grid gap-4 sm:grid-cols-2">

            <FeatureCard
              number="01"
              title="Flexible rentals"
              description="Book by the day or for longer trips."
            />

            <FeatureCard
              number="02"
              title="Premium vehicles"
              description="Choose from a growing collection."
            />

            <FeatureCard
              number="03"
              title="Easy booking"
              description="Reserve your car in just a few clicks."
            />

            <FeatureCard
              number="04"
              title="Trusted owners"
              description="Verified vehicles and transparent pricing."
            />

          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ number, title, description }) => (
  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
    <span className="text-sm font-bold text-primary">
      {number}
    </span>

    <h3 className="mt-8 text-lg font-semibold text-white">
      {title}
    </h3>

    <p className="mt-2 text-sm leading-relaxed text-white/50">
      {description}
    </p>
  </div>
);

export default Banner;

