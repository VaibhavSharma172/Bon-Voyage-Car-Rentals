# Bon Voyage Car Rentals — Context, Data Flow, and ER Diagrams

These diagrams use the current source models and routes in `server/models`, `server/controllers`, and `server/routes`, plus the project handoff in `chat.md`. Current MongoDB collections are `User`, `Car`, and `Booking`. A customer is a `User` with `role: "user"`; an administrator is a `User` with `role: "owner"`. There is no separate Customer collection.

**Notation:** solid flows/entities exist in the current application; dashed elements and flows are proposed additions for requested future capabilities. Payment provider integration, billing/invoices, report generation, add-on services, and audit logs are not implemented in the current code. `Car.category` is an enum string, and `Car.location`, `Booking.pickupLocation`, and `Booking.dropoffLocation` are strings; there are no separate Category or Location collections.

## 1. System Context Diagram

```mermaid
flowchart LR
  Customer[Customer<br/>User role]
  Admin[Administrator / Owner<br/>User role]
  System((Bon Voyage Car Rentals))
  Pay[Payment Provider<br/>proposed integration]
  Customer -->|Registration, login, car search, availability, booking requests| System
  System -->|Cars, availability, booking status, account response| Customer
  Admin -->|Vehicle management, booking status, dashboard requests| System
  System -->|Vehicle inventory, bookings, dashboard summary| Admin
  System -.->|Payment request — proposed| Pay
  Pay -.->|Payment result / reference — proposed| System
```

## 2. DFD Level 0

The application is shown as one process with its external actors and main exchanges.

```mermaid
flowchart LR
  Customer[External entity: Customer<br/>User role]
  Owner[External entity: Administrator / Owner<br/>Owner role]
  P0((0. Bon Voyage Car Rentals))
  Customer -->|Credentials, search criteria, availability dates, booking details| P0
  P0 -->|Authentication result, car listings, availability, booking result / history| Customer
  Owner -->|Vehicle data, availability changes, booking status actions| P0
  P0 -->|Owner vehicles, booking queue, dashboard totals and revenue summary| Owner
```

## 3. DFD Level 1

Data stores map to the implemented MongoDB models. Payment/Billing and Reports are proposed processes, not current endpoints or collections.

```mermaid
flowchart LR
  Customer[User]
  Owner[Administrator / Owner]
  Pay[Payment Provider]

  P1((1.0 Authentication))
  P2((2.0 Vehicle Search))
  P3((3.0 Booking Management))
  P4((4.0 Payment / Billing))
  P5((5.0 Administration))
  P6((6.0 Reports))

  D1[(D1 User collection)]
  D2[(D2 Car collection)]
  D3[(D3 Booking collection)]
  D4[(D4 Billing / Payment records)]
  D5[(D5 Report / Audit records<br/>proposed)]

  Customer -->|Register/login credentials| P1
  P1 <-->|Create/find user, verify password| D1
  P1 -->|JWT and authentication result| Customer

  Customer -->|Location and dates| P2
  P2 <-->|Available car data| D2
  P2 <-->|Overlapping bookings| D3
  P2 -->|Matching cars and availability| Customer

  Customer -->|Car, pickup/drop-off, dates; authenticated request| P3
  P3 <-->|User and owner identity| D1
  P3 <-->|Car details and daily price| D2
  P3 <-->|Check overlap / create booking / read history| D3
  P3 -->|Booking result and booking history| Customer

  P3 -.->|Payment request — proposed| P4
  P4 -.->|Payment request / result| Pay
  Pay -.->|Payment result| P4
  P4 -.->|Payment and invoice data — proposed| D4
  P4 -.->|Payment status — proposed| D3

  Owner -->|Vehicle changes, booking status, dashboard request| P5
  P5 <-->|Manage owned cars| D2
  P5 <-->|Read owner bookings; update status| D3
  P5 -->|Vehicles, booking queue, dashboard aggregates| Owner
  P5 -.->|Operational data for reports — proposed| P6
  P6 -.->|Read report inputs| D1
  P6 -.->|Read car and booking data| D2
  P6 -.->|Read booking data| D3
  P6 -.->|Save generated reports / audit events — proposed| D5
  P6 -.->|Report output — proposed| Owner
```

## 4. DFD Level 2 — Customer Booking

The implemented availability endpoint checks the location, dates, `isAvailable`, and overlapping pending/confirmed bookings. Booking creation rechecks availability, calculates price using `pricePerDay × rental days`, then stores a pending and unpaid Booking. Invoice/payment actions are proposed.

```mermaid
flowchart TD
  Customer[User]
  D1[(User collection)]
  D2[(Car collection)]
  D3[(Booking collection)]
  D4[(Billing / Payment records)]
  Pay[Payment Provider]

  P21((2.1 Submit location and date search))
  P22((2.2 Find cars at location))
  P23((2.3 Validate date range and availability))
  P24((2.4 Select car and calculate price))
  P25((2.5 Create booking))
  P26((2.6 Confirm booking result))
  P27((2.7 Take payment and create invoice<br/>proposed))

  Customer -->|Pickup location, pickup date, return date| P21
  P21 --> P22
  P22 <-->|Find available cars at location| D2
  P22 -->|Candidate cars| P23
  P23 <-->|Find overlapping pending / confirmed bookings| D3
  P23 -->|Available cars / unavailable result| Customer
  Customer -->|Selected car and booking details| P24
  P24 <-->|Car rate and availability flag| D2
  P24 -->|Estimated total price| Customer
  Customer -->|Confirm booking + Bearer JWT| P25
  P25 <-->|Resolve authenticated user and car owner| D1
  P25 <-->|Recheck car and current rate| D2
  P25 <-->|Recheck overlaps; persist Booking| D3
  P25 -->|Created booking response| P26
  P26 -->|Pending booking result| Customer
  P25 -.->|Payment amount and booking reference — proposed| P27
  P27 -.->|Payment request| Pay
  Pay -.->|Success/failure and provider reference| P27
  P27 -.->|Store payment status/reference — proposed| D3
  P27 -.->|Create invoice data — proposed| D4
  P27 -.->|Payment and invoice result — proposed| Customer
```

## 5. DFD Level 2 — Administrator

Owner-only routes currently add, list, toggle availability, and soft-remove cars; retrieve owner bookings and dashboard aggregates; and change booking status. Billing review and report generation are shown as proposed additions because no billing/report model or endpoint exists in the project code.

```mermaid
flowchart TD
  Owner[Administrator / Owner]
  D1[(User collection)]
  D2[(Car collection)]
  D3[(Booking collection)]
  D4[(Billing / Payment records<br/>proposed)]
  D5[(Audit / Report records<br/>proposed)]
  ImageKit[ImageKit media host]

  P51((5.1 Authenticate and check owner role))
  P52((5.2 Add / list / toggle / remove vehicles))
  P53((5.3 Review owner bookings))
  P54((5.4 Change booking status))
  P55((5.5 View dashboard summary))
  P56((5.6 Review billing and payments<br/>proposed))
  P57((5.7 Generate reports<br/>proposed))

  Owner -->|JWT-protected administration request| P51
  P51 <-->|Load user role| D1
  P51 -->|Authorized owner context| P52
  P51 -->|Authorized owner context| P53
  P51 -->|Authorized owner context| P54
  P51 -->|Authorized owner context| P55

  Owner -->|Vehicle fields and image| P52
  P52 <-->|Create/list/update availability/soft-remove owned Car records| D2
  P52 -->|Upload image and receive URL| ImageKit
  P52 -->|Vehicle operation result / inventory| Owner

  P53 <-->|Find bookings for owner; populate Car and User| D3
  P53 -->|Booking list| Owner
  Owner -->|Booking ID and allowed status| P54
  P54 <-->|Check owner ownership and update status| D3
  P54 -->|Status update result| Owner

  P55 <-->|Read owned cars and bookings; aggregate totals/revenue| D2
  P55 <-->|Read owner bookings| D3
  P55 -->|Dashboard totals and recent bookings| Owner

  Owner -.->|Billing review request — proposed| P56
  P56 -.->|Read billing/payment records — proposed| D4
  P56 -.->|Billing/payment summary — proposed| Owner
  P55 -.->|Report inputs — proposed| P57
  P57 -.->|Read users/cars/bookings — proposed| D1
  P57 -.->|Read car inventory — proposed| D2
  P57 -.->|Read booking records — proposed| D3
  P57 -.->|Store report/audit output — proposed| D5
  P57 -.->|Generated reports — proposed| Owner
```

## 6. Entity Relationship Diagram

Solid entities and relationships correspond to existing Mongoose models and references. Dashed entities/relationships are explicitly proposed to cover the requested future ERD scope; they must not be read as existing collections.

```mermaid
erDiagram
  USER {
    ObjectId _id PK
    String name
    String email UK
    String password
    String role "user or owner"
    String image
    Date createdAt
    Date updatedAt
  }
  CAR {
    ObjectId _id PK
    ObjectId owner FK
    String brand
    String model
    String image
    Number year
    String category "enum string"
    Number seating_capacity
    String fuel_type
    String transmission
    Number pricePerDay
    String location "single string"
    String description
    String features "string array"
    Boolean isAvailable
    Date createdAt
    Date updatedAt
  }
  BOOKING {
    ObjectId _id PK
    ObjectId car FK
    ObjectId user FK
    ObjectId owner FK
    String pickupLocation
    String dropoffLocation
    Date pickupDate
    Date returnDate
    Number pricePerDay
    Number totalPrice
    String status "pending, confirmed, cancelled, completed"
    String paymentStatus "unpaid, pending, paid, refunded"
    String paymentId "nullable provider reference"
    Date createdAt
    Date updatedAt
  }
  BILLING {
    ObjectId _id PK "work in progress"
    ObjectId bookingId FK "proposed"
    Number amount "proposed"
    String currency "proposed"
    String invoiceStatus "proposed"
  }
  PAYMENT {
    ObjectId _id PK "to be made"
    ObjectId billingId FK "proposed"
    String provider "proposed"
    String providerReference "proposed"
    String status "proposed"
  }
  REPORT {
    ObjectId _id PK "proposed collection"
    String reportType "proposed"
    Date generatedAt "proposed"
  }
  AUDIT_LOG {
    ObjectId _id PK "to be implemented"
    ObjectId userId FK "proposed actor"
    String action "proposed"
    Date createdAt "proposed"
  }
  ADD_ON_SERVICE {
    ObjectId _id PK "proposed collection"
    String name "proposed"
    Number price "proposed"
  }

  USER ||--o{ CAR : owns
  USER ||--o{ BOOKING : customer_user
  USER ||--o{ BOOKING : owner
  CAR ||--o{ BOOKING : reserved_for

  BOOKING ||..o| BILLING : invoice
  BILLING ||..o{ PAYMENT : payment_attempts
  USER ||..o{ AUDIT_LOG : actor
  REPORT }o..o{ BOOKING : summarizes
  REPORT }o..o{ CAR : summarizes
  BOOKING }o..o{ ADD_ON_SERVICE : selected_services
```

### ERD modeling notes

- Customer and Administrator are **User roles**, not separate entities: `User.role` is `user` or `owner`.
- `Car.category` is currently a string constrained by a Mongoose enum. A separate Car Category entity/table is not implemented or needed to represent the current schema.
- Location is stored as plain strings on Car and Booking. The diagram does not create a Location entity or FK.
- Billing, Payment, Report, Audit Log, and Add-On Service are shown with dashed relationships and `proposed` field labels because no corresponding models, collections, or workflows are present in the current source.
- The current `Booking.paymentStatus` and `paymentId` are fields only; they do not constitute a payment processor, Billing model, or invoice workflow.
