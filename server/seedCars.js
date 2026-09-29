import "dotenv/config";
import connectDB from "./configs/db.js";
import Car from "./models/Car.js";

const cars = [
  {
    brand: "BMW",
    model: "X5",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
    year: 2024,
    category: "SUV",
    seating_capacity: 5,
    fuel_type: "Petrol",
    transmission: "Automatic",
    pricePerDay: 120,
    location: "Delhi",
    description: "Premium BMW X5 with a comfortable interior and powerful performance.",
    isAvailable: true,
  },
  {
    brand: "Mercedes-Benz",
    model: "C-Class",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80",
    year: 2024,
    category: "Sedan",
    seating_capacity: 5,
    fuel_type: "Petrol",
    transmission: "Automatic",
    pricePerDay: 110,
    location: "Mumbai",
    description: "Elegant Mercedes-Benz C-Class suitable for city drives and long trips.",
    isAvailable: true,
  },
  {
    brand: "Audi",
    model: "Q7",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80",
    year: 2023,
    category: "SUV",
    seating_capacity: 7,
    fuel_type: "Diesel",
    transmission: "Automatic",
    pricePerDay: 140,
    location: "Bangalore",
    description: "Spacious Audi Q7 with premium features and seating for seven.",
    isAvailable: true,
  },
  {
    brand: "Porsche",
    model: "911",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    year: 2024,
    category: "Sports",
    seating_capacity: 2,
    fuel_type: "Petrol",
    transmission: "Automatic",
    pricePerDay: 250,
    location: "Delhi",
    description: "High-performance Porsche 911 for an unforgettable driving experience.",
    isAvailable: true,
  },
  {
    brand: "Toyota",
    model: "Fortuner",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80",
    year: 2023,
    category: "SUV",
    seating_capacity: 7,
    fuel_type: "Diesel",
    transmission: "Automatic",
    pricePerDay: 90,
    location: "Pune",
    description: "Reliable and spacious SUV suitable for family trips.",
    isAvailable: true,
  },
  {
    brand: "Tesla",
    model: "Model 3",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80",
    year: 2024,
    category: "Electric",
    seating_capacity: 5,
    fuel_type: "Electric",
    transmission: "Automatic",
    pricePerDay: 130,
    location: "Mumbai",
    description: "Modern electric sedan with a minimalist interior and impressive range.",
    isAvailable: true,
  },
];

const seedCars = async () => {
    try {
        await connectDB();

        await Car.deleteMany({});
        await Car.insertMany(cars);

        console.log(`${cars.length} cars inserted successfully`);

        process.exit(0);
    } catch (error) {
        console.error("Seed error:", error);
        process.exit(1);
    }
};

seedCars();


