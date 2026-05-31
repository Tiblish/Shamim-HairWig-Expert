# Ubiquitous Language

This document defines the shared vocabulary for all business, domain, and system-level concepts used across the Premium Salon application.

## 1. Core Domain Concepts

### Service
* **Definition**: A specific beauty or wellness treatment offered by the salon (e.g., "Balayage Hair Coloring", "Signature Hydrafacial").
* **Properties**: Name, Category, Description, Duration (minutes), Price (currency).
* **Where Used**: Services Catalog, Booking flow, Appointment details.

### Stylist (or Specialist)
* **Definition**: A professional salon employee trained to perform specific Services (e.g., "Master Colorist", "Senior Esthetician").
* **Properties**: Name, Bio, Specialities, Rating, Availability.
* **Where Used**: Stylist Profile page, Booking flow (Staff selection).

### Appointment
* **Definition**: A confirmed reservation made by a Customer for one or more Services with a specific Stylist at a designated Time Slot.
* **Properties**: Customer details, Service list, Stylist, Date, Time Slot, Status (Scheduled, Completed, Cancelled).
* **Where Used**: Booking flow, User Dashboard, Salon Admin panel.

### Time Slot
* **Definition**: A specific block of time during business hours available for booking an Appointment.
* **Where Used**: Booking flow (Time selection).

### Customer
* **Definition**: The user who books services at the salon.
* **Where Used**: Account creation, Booking flow, Reviews.

## 2. Terminology Mapping & Anti-Drift

| Standard Term | Avoided Terms / Synonyms | Context / Purpose |
| :--- | :--- | :--- |
| **Service** | Treatment, Procedure, Item | Keeps catalogue definitions uniform. |
| **Stylist** | Staff, Employee, Specialist, Beautician | Standardizes salon professionals. |
| **Appointment** | Booking, Reservation, Slot | Standardizes the scheduled event. |
| **Customer** | Client, Guest, User | Standardizes the person receiving services. |
