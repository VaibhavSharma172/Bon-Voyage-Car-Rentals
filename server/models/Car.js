// import mongoose from "mongoose";
// const {ObjectId} = mongoose.Schema.Types

// const carSchema = new mongoose.Schema({
//     owner: {type: ObjectId, ref: 'User'},
//     brand: {type: String, required: true},
//     model: {type: String, required: true},
//     image: {type: String, required: true},
//     year: {type: Number, required: true},
//     category: {type: String, required: true},
//     seating_capacity: {type: Number, required: true},
//     fuel_type: { type: String, required: true },
//     transmission: { type: String, required: true },
//     pricePerDay: { type: Number, required: true },
//     location: { type: String, required: true },
//     description: { type: String, required: true },
//     isAvailable: {type: Boolean, default: true}
// },{timestamps: true})

// const Car = mongoose.model('Car', carSchema)

// export default Car

import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const carSchema = new mongoose.Schema(
  {
    owner: {
      type: ObjectId,
      ref: "User",
      required: true,
    },

    brand: {
      type: String,
      required: true,
      trim: true,
    },

    model: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
    },

    year: {
      type: Number,
      required: true,
      min: 1900,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "SUV",
        "Sedan",
        "Hatchback",
        "Luxury",
        "Sports",
        "Electric",
        "Van",
      ],
    },

    seating_capacity: {
      type: Number,
      required: true,
      min: 1,
    },

    fuel_type: {
      type: String,
      required: true,
      enum: ["Petrol", "Diesel", "Electric", "Hybrid"],
    },

    transmission: {
      type: String,
      required: true,
      enum: ["Automatic", "Manual"],
    },

    pricePerDay: {
      type: Number,
      required: true,
      min: 0,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    features: [
      {
        type: String,
        trim: true,
      },
    ],

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

carSchema.index({ location: 1, isAvailable: 1 });
const Car = mongoose.model("Car", carSchema);

export default Car;
