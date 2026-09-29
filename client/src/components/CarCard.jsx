// import React from 'react'
// import { assets } from '../assets/assets'
// import { useNavigate } from 'react-router-dom'

// const CarCard = ({car}) => {

//     const currency = import.meta.env.VITE_CURRENCY
//     const navigate = useNavigate()

//   return (
//     <div onClick={()=> {navigate(`/car-details/${car._id}`); scrollTo(0,0)}} className='group rounded-xl overflow-hidden shadow-lg bg-white hover:-translate-y-1 transition-all duration-500 cursor-pointer'>
      
//       <div className='relative h-48 overflow-hidden'> 
//         <img src={car.image} alt="Car Image" className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'/>

//         {car.isAvaliable && <p className='absolute top-4 left-4 bg-accent text-ink text-xs px-2.5 py-1 rounded-full'>Available Now</p>}

//         <div className='absolute bottom-4 right-4 bg-ink/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg'>
//             <span className='font-semibold'>{currency}{car.pricePerDay}</span>
//             <span className='text-sm text-white/80'> / day</span>
//         </div>
//       </div>

//       <div className='p-4 sm:p-5'>
//         <div className='flex justify-between items-start mb-2'>
//             <div>
//                 <h3 className='text-lg font-medium'>{car.brand} {car.model}</h3>
//                 <p className='text-muted-foreground text-sm'>{car.category} • {car.year}</p>
//             </div>
//         </div>

//         <div className='mt-4 grid grid-cols-2 gap-y-2 text-gray-600'>
//             <div className='flex items-center text-sm text-muted-foreground'>
//                 <img src={assets.users_icon} alt="" className='h-4 mr-2'/>
//                 <span>{car.seating_capacity} Seats</span>
//             </div>
//             <div className='flex items-center text-sm text-muted-foreground'>
//                 <img src={assets.fuel_icon} alt="" className='h-4 mr-2'/>
//                 <span>{car.fuel_type}</span>
//             </div>
//             <div className='flex items-center text-sm text-muted-foreground'>
//                 <img src={assets.car_icon} alt="" className='h-4 mr-2'/>
//                 <span>{car.transmission}</span>
//             </div>
//             <div className='flex items-center text-sm text-muted-foreground'>
//                 <img src={assets.location_icon} alt="" className='h-4 mr-2'/>
//                 <span>{car.location}</span>
//             </div>
//         </div>

//       </div>

//     </div>
//   )
// }

// export default CarCard


import React from "react";
import { ArrowUpRight, Users, Fuel, Gauge, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CarCard = ({ car }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/car-details/${car._id}`);
    window.scrollTo(0, 0);
  };

  return (
    <article
      onClick={handleClick}
      className="group cursor-pointer overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-gray-100">

        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Dark hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Availability */}
        {car.isAvaliable && (
          <div className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-ink shadow-sm">
            Available Now
          </div>
        )}

        {/* Details arrow */}
        <div className="absolute right-4 top-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white/90 text-ink opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={18} />
        </div>

        {/* Price */}
        <div className="absolute bottom-4 right-4 rounded-xl bg-ink/85 px-4 py-2.5 text-white backdrop-blur-md">
          <span className="text-lg font-bold">
            {currency}{car.pricePerDay}
          </span>

          <span className="ml-1 text-xs text-white/60">
            / day
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">

        {/* Category / year */}
        <div className="flex items-center justify-between">

          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            {car.category}
          </p>

          <span className="text-xs text-black/40">
            {car.year}
          </span>

        </div>

        {/* Name */}
        <h3 className="mt-2 text-xl font-bold tracking-tight text-ink">
          {car.brand} {car.model}
        </h3>

        {/* Specs */}
        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-black/5 pt-5">

          <div className="flex items-center gap-2 text-sm text-black/50">
            <Users
              size={16}
              strokeWidth={1.8}
              className="text-black/40"
            />

            <span>
              {car.seating_capacity} Seats
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-black/50">
            <Fuel
              size={16}
              strokeWidth={1.8}
              className="text-black/40"
            />

            <span>
              {car.fuel_type}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-black/50">
            <Gauge
              size={16}
              strokeWidth={1.8}
              className="text-black/40"
            />

            <span>
              {car.transmission}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-black/50">
            <MapPin
              size={16}
              strokeWidth={1.8}
              className="text-black/40"
            />

            <span className="truncate">
              {car.location}
            </span>
          </div>

        </div>

        {/* Bottom action */}
        <div className="mt-6 flex items-center justify-between border-t border-black/5 pt-5">

          <span className="text-sm font-medium text-black/40 transition-colors group-hover:text-ink">
            View vehicle
          </span>

          <span className="flex items-center gap-1 text-sm font-semibold text-primary">
            Details
            <ArrowUpRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>

        </div>

      </div>
    </article>
  );
};

export default CarCard;
