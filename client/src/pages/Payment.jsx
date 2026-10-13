import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const Payment = () => {
  const { bookingId } = useParams()
  const navigate = useNavigate()
  const { currency } = useAppContext()

  return (
    <div className="min-h-screen px-6 md:px-16 py-16
      bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white
        rounded-2xl shadow-sm border p-8">

        <button
          onClick={() => navigate('/my-bookings')}
          className="text-gray-500 hover:text-black mb-6"
        >
          ← Back to My Bookings
        </button>

        <h1 className="text-3xl font-bold mb-2">
          Complete Your Payment
        </h1>

        <p className="text-gray-500 mb-8">
          Booking ID: {bookingId}
        </p>

        <div className="border rounded-xl p-5 mb-6">
          <h2 className="font-semibold text-lg mb-2">
            Payment Summary
          </h2>
          <p className="text-sm text-gray-500">
            Your booking details and final amount will
            appear here.
          </p>
        </div>

        <button
        //   onClick={() => alert('')}
          className="w-full bg-primary text-white py-3
            rounded-lg font-semibold hover:opacity-90"
        >
          Continue to Payment
        </button>

        <p className="text-xs text-gray-400 text-center mt-4">
to be continued        </p>
      </div>
    </div>
  )
}

export default Payment