# Bon Voyage Car Rentals

Bon Voyage Car Rentals is a browser-based car rental application built with React, Express, and MongoDB. Customers can browse vehicles, check date availability, and create bookings; users with the owner role can manage their vehicle listings and booking statuses. This README describes the project in its current code state and separates implemented features from the broader requirements described in the MCSP-232 project report.

## Project goals

The project aims to make vehicle discovery and booking more convenient for customers and to give vehicle owners a web interface for managing cars and bookings. The project report also describes a broader target system with billing, payment processing, invoices, and operational reports. Those capabilities are not implemented in the current code and are listed under [Planned scope](#planned-scope).

## Current features

### Customer and user features

- Register an account and log in with an email address and password.
- Browse vehicles marked available.
- Search vehicle inventory by location and rental dates.
- Check for overlapping pending or confirmed bookings before booking.
- Create a booking with pickup and drop-off locations, dates, daily rate, total price, and initial status.
- View the signed-in user's booking history.

### Owner features

- Use owner-protected vehicle management and dashboard routes.
- Add a vehicle with an uploaded image.
- List owned vehicles, toggle availability, and remove a listing from availability.
- View bookings for owned vehicles and change a booking's status.
- View dashboard counts, recent bookings, and a monthly total based on confirmed bookings.

### Images and authentication

- Vehicle and profile images are uploaded through the server using Multer and ImageKit.
- Passwords are hashed with bcrypt.
- The server issues JWTs that expire after seven days; protected requests use `Authorization: Bearer <token>`.
- Owner-only routes check for the `owner` user role.

## Technology

| Area | Technology |
| --- | --- |
| Front end | React 19, Vite, React Router, Tailwind CSS, Axios |
| Back end | Node.js, Express 5 |
| Database | MongoDB with Mongoose |
| Authentication | JSON Web Tokens and bcrypt |
| Image hosting | ImageKit, with Multer handling uploads |
| UI utilities | Lucide React, Motion, React Hot Toast |

## Requirements

- Node.js and npm
- A MongoDB database and connection URI
- ImageKit credentials for image upload features
- A modern browser

## Local setup

Open two terminals from the project root.

### 1. Configure the server

Create `server/.env`:

```env
MONGODB_URI=your_mongodb_connection_uri
JWT_SECRET=replace_with_a_long_random_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
PORT=3000
```

`MONGODB_URI` is the variable used by the current database connection code. Keep secrets in environment files and do not commit them.

Install dependencies and start the API:

```bash
cd server
npm install
npm start
```

The server listens on port `3000` by default (or the value of `PORT`). Its health route is `GET /`.

### 2. Configure and start the client

Create `client/.env`:

```env
VITE_BASE_URL=http://localhost:3000
VITE_CURRENCY=₹
```

Install dependencies and run Vite:

```bash
cd client
npm install
npm run dev
```

Vite prints the local client URL, normally `http://localhost:5173`.

For a production client bundle, run `npm run build` from `client`. The output is written to `client/dist`.

## Main routes

The client includes the home page, vehicle list, vehicle detail, customer bookings, and owner dashboard, add vehicle, manage vehicles, and manage bookings pages. The API routes below are mounted by the current server.

| Method | Endpoint | Access | Purpose |
| --- | --- | --- | --- |
| `POST` | `/api/user/register` | Public | Register a user |
| `POST` | `/api/user/login` | Public | Log in and receive a JWT |
| `GET` | `/api/user/data` | Authenticated | Return current user data |
| `GET` | `/api/user/cars` | Public | List available cars |
| `POST` | `/api/owner/change-role` | Authenticated | Change the current user's role to `owner` |
| `POST` | `/api/owner/add-car` | Owner | Add a car and upload its image |
| `GET` | `/api/owner/cars` | Owner | List the owner's cars |
| `POST` | `/api/owner/toggle-car` | Owner | Toggle a car's availability |
| `POST` | `/api/owner/delete-car` | Owner | Remove a car from availability |
| `GET` | `/api/owner/dashboard` | Owner | Get dashboard aggregates |
| `POST` | `/api/owner/update-image` | Owner | Upload a profile image |
| `POST` | `/api/bookings/check-availability` | Public | Search cars by pickup location and dates |
| `POST` | `/api/bookings/create` | Authenticated | Validate and create a booking |
| `GET` | `/api/bookings/user` | Authenticated | List the current user's bookings |
| `GET` | `/api/bookings/owner` | Owner | List bookings for the owner's cars |
| `POST` | `/api/bookings/change-status` | Owner | Change an owned booking's status |

Protected routes require a JWT in the Bearer authorization header. Request bodies and image-upload field names are defined in the matching route and controller code.

## Data model in the current application

The server defines three Mongoose models:

- **User** — name, unique email, password hash, role (`user` or `owner`), profile image, and timestamps.
- **Car** — owner reference, brand, model, image, year, category, seating capacity, fuel type, transmission, daily price, location string, description, feature list, availability flag, and timestamps.
- **Booking** — references to car, customer user, and car owner; pickup/drop-off locations and dates; daily and total prices; booking status; payment status and optional payment ID; and timestamps.

The booking status values currently accepted are `pending`, `confirmed`, `cancelled`, and `completed`. Payment status is stored as a field (`unpaid`, `pending`, `paid`, or `refunded`), but it does not indicate that a payment gateway is connected.

## Planned scope

The project report describes additional requirements that are not backed by current models, routes, or workflows. They should be treated as future work until implemented and verified:

- Payment-provider integration and payment-failure handling.
- Billing records, invoice numbers, and invoice generation.
- Booking, revenue, customer activity, payment, and vehicle utilisation reports.
- Separate customer profiles, vehicle category records, and location records. The current application instead uses a `User` role and stores car category and locations as strings.
- Add-on services, discounts, tax calculations, audit logs, maintenance status, and unique vehicle registration records.
- Automated database backup and recovery workflows, production hosting, monitoring, and advanced analytics.
- AI recommendations, dynamic pricing, predictive maintenance, GPS/IoT, chatbot, and mobile application enhancements.

The project report contains proposed requirements and sample report data as well as implementation-oriented material. Sample names, payments, revenues, and test outcomes in the report are illustrative; they are not evidence of live database records or completed features in this repository.

## Repository layout

```text
client/   React and Vite application
server/   Express API, Mongoose models, and ImageKit integration
docs/     Project documentation
```