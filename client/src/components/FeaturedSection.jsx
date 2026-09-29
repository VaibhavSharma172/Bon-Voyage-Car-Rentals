// import React from 'react'
// import Title from './Title'
// import { assets } from '../assets/assets'
// import CarCard from './CarCard'
// import { useNavigate } from 'react-router-dom'
// import { useAppContext } from '../context/AppContext'
// import { motion } from 'motion/react'

// const FeaturedSection = () => {

//     const navigate = useNavigate()
//     const {cars} = useAppContext()

//   return (
//     <motion.div 
//     initial={{ opacity: 0, y: 40 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     transition={{ duration: 1, ease: "easeOut" }}
//     className='flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32'>

//         <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1, delay: 0.5 }}
//         >
//             <Title title='Featured Vehicles' subTitle='Explore our selection of premium vehicles available for your next adventure.'/>
//         </motion.div>

//         <motion.div 
//         initial={{ opacity: 0, y: 100 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.5, duration: 1 }}
//         className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18'>
//         {
//             cars.slice(0,6).map((car)=> (
//                 <motion.div key={car._id}
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.4, ease: "easeOut"  }}
//                 >
//                     <CarCard car={car}/>
//                 </motion.div>
//             ))
//         }
//         </motion.div>

//         <motion.button 
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.6, duration: 0.4 }}
//         onClick={()=> {
//             navigate('/cars'); scrollTo(0,0)
//         }}
//          className='flex items-center justify-center gap-2 px-6 py-2 border border-primary/20 text-primary hover:bg-primary/5 rounded-md mt-18 cursor-pointer'>
//             Explore all cars <img src={assets.arrow_icon} alt="arrow" />
//         </motion.button>
      
//     </motion.div>
//   )
// }

// export default FeaturedSection


import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import CarCard from "./CarCard";
import { useAppContext } from "../context/AppContext";

const FeaturedSection = () => {
  const navigate = useNavigate();
  const { cars } = useAppContext();

  const handleExplore = () => {
    navigate("/cars");
    window.scrollTo(0, 0);
  };

  return (
    <section className="bg-canvas pb-24 pt-40 md:pb-28 md:pt-44">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Featured vehicles
            </p>

            <h2 className="mt-3 text-4xl font-bold tracking-tight text-ink md:text-5xl">
              Find your perfect ride
            </h2>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-black/50 md:text-lg">
              Explore our selection of premium vehicles,
              ready for your next adventure.
            </p>

          </div>

          {/* Desktop view all */}
          <button
            onClick={handleExplore}
            className="group hidden items-center gap-2 text-sm font-semibold text-ink transition hover:text-primary md:flex"
          >
            View all cars

            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>

        </motion.div>

        {/* Cars */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {cars.slice(0, 6).map((car, index) => (
            <motion.div
              key={car._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
            >
              <CarCard car={car} />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile / bottom button */}
        <motion.button
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          onClick={handleExplore}
          className="mx-auto mt-12 flex items-center gap-2 rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-medium text-ink shadow-sm transition hover:border-primary/30 hover:text-primary md:hidden"
        >
          View all cars
          <ArrowRight size={16} />
        </motion.button>

      </div>
    </section>
  );
};

export default FeaturedSection;
