# Bon Voyage Car Rentals — System Diagrams

These diagrams describe the current MERN application and distinguish implemented behavior from proposed features. The application currently stores users with a `role` (`user` or `owner`), cars, and bookings. Payment processing, billing, and reporting are planned concepts; no payment provider or separate Billing/Report model is currently implemented. “Administrator” below refers to the existing owner role.

## 1. Use Case Diagram

```mermaid
flowchart LR
  Customer[Customer]
  Admin[Administrator / Owner]
  subgraph BV[Bon Voyage Car Rentals]
    UC1((Register))
    UC2((Log in))
    UC3((Search vehicles))
    UC4((View vehicle details))
    UC5((Check availability))
    UC6((Create booking))
    UC7((Make payment<br/>planned))
    UC8((View own bookings))
    UC9((Cancel booking))
    UC10((Manage vehicles))
    UC11((Add vehicle))
    UC12((Update vehicle))
    UC13((Delete vehicle))
    UC14((Manage bookings))
    UC15((Confirm / change status))
    UC16((View reports<br/>planned))
  end
  Customer --- UC1
  Customer --- UC2
  Customer --- UC3
  Customer --- UC4
  Customer --- UC5
  Customer --- UC6
  Customer --- UC7
  Customer --- UC8
  Customer --- UC9
  Admin --- UC2
  Admin --- UC10
  Admin --- UC14
  Admin --- UC16
  UC10 -. includes .-> UC11
  UC10 -. includes .-> UC12
  UC10 -. includes .-> UC13
  UC14 -. includes .-> UC15
  UC6 -. checks .-> UC5
```

## 2. Activity Diagram — Booking

```mermaid
flowchart TD
  A([Start]) --> B[Customer logs in]
  B --> C[Enter location and pickup/return dates]
  C --> D[Search available cars]
  D --> E{Cars found?}
  E -- No --> F[Show no matching cars]
  F --> C
  E -- Yes --> G[View car details and select a car]
  G --> H[Check date overlap availability]
  H --> I{Available for dates?}
  I -- No --> J[Show unavailable; choose another car or dates]
  J --> C
  I -- Yes --> K[Calculate price from daily rate and rental days]
  K --> L[Customer confirms booking]
  L --> M[Create booking with Pending status and Unpaid payment status]
  M --> N[Owner reviews and changes booking status]
  N --> O([End])
  M -. Future payment integration .-> P[Payment service processes payment]
  P --> Q{Payment succeeds?}
  Q -- Yes --> R[Record paid status and payment reference]
  Q -- No --> S[Show payment failure]
```

Current application behavior ends at creation of a pending, unpaid booking and owner status management. The payment branch is planned only.

## 3. Activity Diagram — Vehicle Management

```mermaid
flowchart TD
  A([Start]) --> B[Owner logs in]
  B --> C[Open vehicle management]
  C --> D{Choose action}
  D -- Add --> E[Enter vehicle details and image]
  D -- Update --> F[Select vehicle and edit details]
  D -- Delete --> G[Select vehicle and request deletion]
  D -- Availability --> H[Toggle vehicle availability]
  E --> I[Validate required fields and image]
  F --> I
  G --> J{Deletion allowed?}
  J -- Yes --> K[Delete vehicle record]
  J -- No --> L[Show error]
  H --> M[Save availability change]
  I --> N{Valid?}
  N -- No --> O[Show validation errors]
  O --> C
  N -- Yes --> P[Save vehicle in MongoDB; upload image through ImageKit when supplied]
  P --> Q[Show success]
  K --> Q
  M --> Q
  L --> C
  Q --> R{Manage another vehicle?}
  R -- Yes --> C
  R -- No --> S([End])
```

## 4. State Diagram — Booking

```mermaid
stateDiagram-v2
  [*] --> Draft
  Draft --> Pending: customer submits booking
  Pending --> Confirmed: owner confirms
  Pending --> Cancelled: customer/owner cancels
  Pending --> PaymentFailed: planned payment attempt fails
  PaymentFailed --> Pending: retry payment / resume
  Confirmed --> ActiveRental: rental pickup
  Confirmed --> Cancelled: cancellation
  ActiveRental --> Completed: rental returned
  Completed --> [*]
  Cancelled --> [*]
  note right of Draft: Conceptual state; current API creates Pending directly.
  note right of PaymentFailed: Planned; payment integration is not implemented.
  note right of ActiveRental: Conceptual lifecycle state; current schema does not include it.
```

## 5. UML Class Diagram

```mermaid
classDiagram
  class User {
    +ObjectId _id
    +String name
    +String email
    +String password
    +String role = user|owner
    +String image
    +Date createdAt
    +Date updatedAt
  }
  class Customer {
    <<logical role view; same User model>>
  }
  class Car {
    +ObjectId _id
    +ObjectId owner
    +String brand
    +String model
    +String image
    +Number year
    +String category
    +Number seating_capacity
    +String fuel_type
    +String transmission
    +Number pricePerDay
    +String location
    +String description
    +String[] features
    +Boolean isAvailable
    +Date createdAt
    +Date updatedAt
  }
  class Booking {
    +ObjectId _id
    +ObjectId car
    +ObjectId user
    +ObjectId owner
    +String pickupLocation
    +String dropoffLocation
    +Date pickupDate
    +Date returnDate
    +Number pricePerDay
    +Number totalPrice
    +String status
    +String paymentStatus
    +String paymentId
    +Date createdAt
    +Date updatedAt
  }
  class Billing {
    <<documented business entity>>
    +Number amount
    +String currency
    +String invoiceStatus
  }
  class Payment {
    <<documented business entity>>
    +String provider
    +String providerReference
    +String status
  }
  class Location {
    <<single-string value>>
    +String value
  }
  class Report {
    <<documented business entity>>
    +String reportType
    +Date generatedAt
  }
  User <|-- Customer : role view; same model
  User "1" --> "0..*" Car : owns
  Customer "1" --> "0..*" Booking : creates
  Car "1" --> "0..*" Booking : booked in
  User "1" <-- "0..*" Booking : owner
  Car ..> Location : location is one string
  Booking "1" --> "0..1" Billing : billed as
  Billing "1" --> "0..*" Payment : payment attempts
  Report ..> Booking : summarizes
  Report ..> Car : summarizes
```

The current MERN models are `User`, `Car`, and `Booking`; `Customer` is shown as the user role view (the same `User` model, with `role: "user"`) rather than a separate collection. As specified for this documentation, Billing, Payment, and Report are treated as complete business entities, and Location is represented by one string value. `Car.location` remains a string field in the current schema; Location is a logical value, not a separate referenced MongoDB document.

## 6. Sequence Diagram — Booking

```mermaid
sequenceDiagram
  actor Customer
  participant UI as ReactJS Interface
  participant API as Express API
  database DB as MongoDB
  participant Pay as Payment Service (planned)
  Customer->>UI: Choose location, dates, and car
  UI->>API: POST /api/bookings/check-availability
  API->>DB: Find overlapping pending/confirmed bookings
  DB-->>API: Matching bookings / none
  API-->>UI: Availability result
  UI-->>Customer: Show availability and price estimate
  Customer->>UI: Confirm booking
  UI->>API: POST /api/bookings/create (Bearer JWT)
  API->>DB: Load car and recheck availability
  DB-->>API: Car and availability data
  API->>API: Validate dates; calculate total price
  API->>DB: Save Pending, Unpaid booking
  DB-->>API: Created booking
  API-->>UI: Booking result
  UI-->>Customer: Show booking confirmation / pending status
  opt Future payment integration
    API->>Pay: Create payment request
    Pay-->>API: Payment result and reference
    API->>DB: Update paymentStatus / paymentId
    API-->>UI: Payment result
  end
```

## 7. Sequence Diagram — Login

```mermaid
sequenceDiagram
  actor User
  participant UI as React Login Form
  participant API as Express userController
  participant DB as MongoDB
  participant Auth as protect middleware
  User->>UI: Enter email and password
  UI->>API: POST /api/user/login
  API->>DB: Find user by normalized email
  DB-->>API: User record with password hash
  API->>API: bcrypt compares password
  alt Credentials valid
    API->>API: Sign JWT (userId, 7-day expiry)
    API-->>UI: User data and token
    UI->>UI: Store token; set Bearer Authorization header
    UI->>API: GET /api/user/data
    API->>Auth: Verify Bearer JWT
    Auth->>DB: Load user by token userId
    DB-->>Auth: User without password
    Auth-->>API: Attach authenticated user
    API-->>UI: User data
    UI-->>User: Show role-appropriate application/dashboard
  else Invalid credentials
    API-->>UI: Generic invalid email or password response
    UI-->>User: Show login error
  end
```

## 8. Three-Tier Architecture

```mermaid
flowchart TB
  subgraph Presentation[Presentation tier — client]
    React[React.js]
    Router[React Router]
    Axios[Axios HTTP client]
    React --- Router
    React --- Axios
  end
  subgraph Application[Application tier — server]
    Express[Node.js + Express.js]
    Routes[User, owner, booking routes]
    Controllers[Controllers and business logic]
    Middleware[JWT authentication / request middleware]
    Express --> Routes --> Middleware --> Controllers
  end
  subgraph Data[Data tier]
    Mongoose[Mongoose models]
    Mongo[(MongoDB: User, Car, Booking)]
    Mongoose --> Mongo
  end
  Axios -- HTTP / JSON --> Express
  Controllers -- Mongoose queries --> Mongoose
  Controllers -. Car and profile images .-> ImageKit[ImageKit media hosting]
```

## 9. Deployment Diagram

```mermaid
flowchart LR
  subgraph Clients[Client devices]
    Browser[Customer / owner browser]
    Mobile[Other browser-capable device]
  end
  subgraph Hosting[Cloud hosting — proposed production deployment]
    Web[Static web host: React build<br/>Vercel / Netlify]
    App[Application host: Node.js + Express<br/>Render / Railway / VPS]
  end
  DB[(MongoDB Atlas or MongoDB server)]
  Media[ImageKit]
  Pay[Payment provider<br/>planned]
  Browser -->|HTTPS| Web
  Mobile -->|HTTPS| Web
  Web -->|HTTPS JSON API| App
  App -->|Mongoose / TLS connection| DB
  App -->|Image upload / delivery| Media
  App -. Future payment API .-> Pay
```

Cloud providers and production deployment are illustrative targets from the project README, not a claim that the system is currently deployed there.

## 10. Security Architecture

```mermaid
flowchart TD
  User[Customer / owner]
  HTTPS[HTTPS transport in deployment]
  Client[React client; token sent as Bearer JWT]
  API[Express API routes]
  Auth[Authentication middleware: verify JWT and load user]
  Role[Role checks for owner-only operations]
  Validate[Request validation and business-rule checks]
  Hash[Registration/login: bcrypt password hashing and comparison]
  DB[(MongoDB: least necessary access; protected credentials)]
  Upload[Image upload validation via Multer]
  ImageKit[ImageKit media storage]
  Env[Server environment variables: JWT secret, DB URI, ImageKit keys]
  Logs[Operational logs and error monitoring — recommended]
  Backup[Database backups — recommended]
  User --> HTTPS --> Client --> API --> Auth --> Role --> Validate --> DB
  API --> Hash
  Validate --> Upload --> ImageKit
  Env -. supplies secrets to .-> API
  API -. events/errors .-> Logs
  DB -. backup process .-> Backup
```

HTTPS, secret management, robust validation, monitoring, and automated backups are deployment/security requirements or recommendations; the diagram does not imply every control is fully configured in the current application.

## 11. Booking Flowchart

```mermaid
flowchart TD
  A([Start]) --> B[Select pickup location and dates]
  B --> C[Search cars]
  C --> D{Matching cars found?}
  D -- No --> E[Display no cars found]
  E --> B
  D -- Yes --> F[Select a car]
  F --> G[Check booking overlap for selected dates]
  G --> H{Available?}
  H -- No --> I[Show unavailable; select another car or dates]
  I --> B
  H -- Yes --> J[Calculate days and total price]
  J --> K{Customer authenticated?}
  K -- No --> L[Ask customer to log in]
  L --> K
  K -- Yes --> M[Create booking: Pending and Unpaid]
  M -. Future payment provider .-> N[Attempt payment]
  N --> O{Payment successful?}
  O -- No --> P[Payment Failed]
  O -- Yes --> Q[Record payment status and provider reference]
  M --> R[Show booking status]
  Q --> R
  P --> R
  R --> S([End])
```

Current behavior creates a `pending` booking with `unpaid` payment status after date and availability validation. Payment steps are future integration flow.
