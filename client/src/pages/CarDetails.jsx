import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'

const CarDetails = () => {

  const { id } = useParams()

  const {
    cars,
    axios,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate
  } = useAppContext()

  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const [pickupLocation, setPickupLocation] = useState('')
  const [dropoffLocation, setDropoffLocation] = useState('')


  const currency = import.meta.env.VITE_CURRENCY

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Prevent invalid date ranges
    if (returnDate <= pickupDate) {
      toast.error('Return date must be after pickup date')
      return
    }

    try {
      const { data } = await axios.post('/api/bookings/create', {
        car: id,
        pickupLocation,
    dropoffLocation,
        pickupDate,
        returnDate
      })

      if (data.success) {
        toast.success(data.message)
        navigate('/my-bookings')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    setCar(cars.find(car => car._id === id))
  }, [cars, id])

  if (!car) {
    return <Loader />
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#0B0B0B]">

      <div className="px-5 sm:px-8 md:px-16 lg:px-24 xl:px-32 pt-8 pb-20">

        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="
            group
            flex items-center gap-2
            mb-8
            text-sm font-medium
            text-[#0B0B0B]/60
            hover:text-[#4F46E5]
            transition-colors
            cursor-pointer
          "
        >
          <img
            src={assets.arrow_icon}
            alt=""
            className="w-4 rotate-180 opacity-60 group-hover:opacity-100 transition-opacity"
          />
          Back to all cars
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">

          {/* ================= LEFT ================= */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >

            {/* Image */}
            <div className="
              relative
              overflow-hidden
              rounded-2xl
              bg-[#0B0B0B]
              shadow-[0_15px_40px_rgba(11,11,11,0.12)]
            ">
              <motion.img
                initial={{ scale: 1.03, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                src={car.image}
                alt={`${car.brand} ${car.model}`}
                className="
                  w-full
                  h-[280px]
                  sm:h-[380px]
                  lg:h-[460px]
                  object-cover
                "
              />

              {/* Availability */}
              {car.isAvailable && (
                <div className="
                  absolute
                  top-5 left-5
                  flex items-center gap-2
                  bg-white
                  text-[#0B0B0B]
                  px-3 py-2
                  rounded-full
                  text-xs font-semibold
                  shadow-lg
                ">
                  <span className="w-2 h-2 rounded-full bg-[#4F46E5]" />
                  Available now
                </div>
              )}

            </div>

            {/* Car information */}
            <div className="mt-8">

              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">

                <div>
                  <p className="
                    text-sm
                    font-semibold
                    uppercase
                    tracking-widest
                    text-[#4F46E5]
                    mb-2
                  ">
                    {car.category}
                  </p>

                  <h1 className="
                    text-3xl
                    sm:text-4xl
                    font-bold
                    tracking-tight
                  ">
                    {car.brand} {car.model}
                  </h1>

                  <p className="text-[#0B0B0B]/50 mt-2">
                    {car.year} • {car.location}
                  </p>
                </div>

              </div>

              <div className="h-px bg-[#0B0B0B]/10 my-8" />

              {/* Specifications */}
              <div className="
                grid
                grid-cols-2
                sm:grid-cols-4
                gap-3
              ">
                {[
                  {
                    icon: assets.users_icon,
                    label: 'Seats',
                    value: car.seating_capacity
                  },
                  {
                    icon: assets.fuel_icon,
                    label: 'Fuel',
                    value: car.fuel_type
                  },
                  {
                    icon: assets.car_icon,
                    label: 'Transmission',
                    value: car.transmission
                  },
                  {
                    icon: assets.location_icon,
                    label: 'Location',
                    value: car.location
                  },
                ].map(({ icon, label, value }) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="
                      bg-white
                      border border-[#0B0B0B]/10
                      rounded-xl
                      p-4
                      hover:border-[#4F46E5]/40
                      transition-colors
                    "
                  >
                    <img
                      src={icon}
                      alt=""
                      className="h-5 mb-3 opacity-70"
                    />

                    <p className="text-xs text-[#0B0B0B]/45 mb-1">
                      {label}
                    </p>

                    <p className="font-semibold text-sm">
                      {value}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Description */}
              <div className="mt-10">

                <h2 className="text-xl font-bold mb-3">
                  About this vehicle
                </h2>

                <p className="
                  text-[#0B0B0B]/60
                  leading-7
                  max-w-3xl
                ">
                  {car.description}
                </p>

              </div>

              {/* Features */}
              <div className="mt-10">

                <h2 className="text-xl font-bold mb-4">
                  Features
                </h2>

                <div className="
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  gap-3
                ">
                  {[
                    '360 Camera',
                    'Bluetooth',
                    'GPS Navigation',
                    'Heated Seats',
                    'Rear View Camera',
                  ].map((item) => (
                    <div
                      key={item}
                      className="
                        flex items-center gap-3
                        text-sm
                        text-[#0B0B0B]/65
                      "
                    >
                      <div className="
                        flex items-center justify-center
                        w-5 h-5
                        rounded-full
                        bg-[#4F46E5]/10
                      ">
                        <img
                          src={assets.check_icon}
                          className="h-3 w-3"
                          alt=""
                        />
                      </div>

                      {item}
                    </div>
                  ))}
                </div>

              </div>

            </div>

          </motion.div>


          {/* ================= BOOKING ================= */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="lg:col-span-1"
          >

            <form
              onSubmit={handleSubmit}
              className="
                lg:sticky
                lg:top-24
                bg-white
                border border-[#0B0B0B]/10
                rounded-2xl
                p-6
                sm:p-7
                shadow-[0_15px_40px_rgba(11,11,11,0.08)]
              "
            >

              {/* Price */}
              <div className="mb-6">

                <p className="text-sm text-[#0B0B0B]/50 mb-1">
                  Rental price
                </p>

                <div className="flex items-baseline gap-2">

                  <span className="
                    text-3xl
                    font-bold
                    text-[#0B0B0B]
                  ">
                    {currency}{car.pricePerDay}
                  </span>

                  <span className="text-sm text-[#0B0B0B]/50">
                    / day
                  </span>

                </div>

              </div>

              <div className="h-px bg-[#0B0B0B]/10 mb-6" />

              {/* Pickup */}
              <div className="mb-5">

                <label
                  htmlFor="pickup-date"
                  className="
                    block
                    text-sm
                    font-semibold
                    text-[#0B0B0B]
                    mb-2
                  "
                >
                  Pickup date
                </label>

                <input
                  id="pickup-date"
                  type="date"
                  value={pickupDate}
                  min={today}
                  onChange={(e) => setPickupDate(e.target.value)}
                  required
                  className="
                    w-full
                    px-4 py-3
                    rounded-xl
                    bg-[#F5F5F5]
                    border border-[#0B0B0B]/10
                    text-[#0B0B0B]
                    outline-none
                    focus:border-[#4F46E5]
                    focus:ring-2
                    focus:ring-[#4F46E5]/10
                    transition-all
                  "
                />

              </div>

              {/* Return */}
              <div className="mb-6">

                <label
                  htmlFor="return-date"
                  className="
                    block
                    text-sm
                    font-semibold
                    text-[#0B0B0B]
                    mb-2
                  "
                >
                  Return date
                </label>

                <input
                  id="return-date"
                  type="date"
                  value={returnDate}
                  min={pickupDate || today}
                  onChange={(e) => setReturnDate(e.target.value)}
                  required
                  className="
                    w-full
                    px-4 py-3
                    rounded-xl
                    bg-[#F5F5F5]
                    border border-[#0B0B0B]/10
                    text-[#0B0B0B]
                    outline-none
                    focus:border-[#4F46E5]
                    focus:ring-2
                    focus:ring-[#4F46E5]/10
                    transition-all
                  "
                />

              </div>

              {/* Pickup Location */}
<div className="mb-5">
  <label
    htmlFor="pickup-location"
    className="
      block
      text-sm
      font-semibold
      text-[#0B0B0B]
      mb-2
    "
  >
    Pickup location
  </label>

  <input
    id="pickup-location"
    type="text"
    value={pickupLocation}
    onChange={(e) => setPickupLocation(e.target.value)}
    placeholder={`e.g. ${car.location}`}
    required
    className="
      w-full
      px-4 py-3
      rounded-xl
      bg-[#F5F5F5]
      border border-[#0B0B0B]/10
      text-[#0B0B0B]
      outline-none
      focus:border-[#4F46E5]
      focus:ring-2
      focus:ring-[#4F46E5]/10
      transition-all
    "
  />
</div>

{/* Drop-off Location */}
<div className="mb-6">
  <label
    htmlFor="dropoff-location"
    className="
      block
      text-sm
      font-semibold
      text-[#0B0B0B]
      mb-2
    "
  >
    Drop-off location
  </label>

  <input
    id="dropoff-location"
    type="text"
    value={dropoffLocation}
    onChange={(e) => setDropoffLocation(e.target.value)}
    placeholder={`e.g. ${car.location}`}
    required
    className="
      w-full
      px-4 py-3
      rounded-xl
      bg-[#F5F5F5]
      border border-[#0B0B0B]/10
      text-[#0B0B0B]
      outline-none
      focus:border-[#4F46E5]
      focus:ring-2
      focus:ring-[#4F46E5]/10
      transition-all
    "
  />
              </div>

              {/* Book */}
              <button
                type="submit"
                className="
                  w-full
                  bg-[#4F46E5]
                  hover:bg-[#4338CA]
                  text-white
                  py-3.5
                  rounded-xl
                  font-semibold
                  transition-all
                  cursor-pointer
                  shadow-lg
                  shadow-[#4F46E5]/20
                "
              >
                Book this vehicle
              </button>

              <p className="
                text-center
                text-xs
                text-[#0B0B0B]/40
                mt-4
              ">
                No credit card required to reserve
              </p>

            </form>

          </motion.div>

        </div>

      </div>
    </div>
  )
}

export default CarDetails
