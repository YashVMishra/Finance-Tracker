# Finance Tracker

A full-stack personal finance management application built with **Spring Boot** and **Next.js**, featuring JWT authentication, comprehensive expense tracking, budget management, and real-time financial insights with category-based analytics.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)

---

## Overview

Finance Tracker is a comprehensive personal finance management system that empowers users to take control of their financial health. The application provides secure authentication, intelligent budget management, detailed expense tracking with category-based insights, and powerful analytics to help users make informed financial decisions through an intuitive and responsive user interface.

Built with a modern tech stack, the application follows a robust architecture with a **Spring Boot REST API backend** and a **Next.js TypeScript frontend**, ensuring scalability, maintainability, and excellent user experience across all devices.

---

## Features

- **Secure Authentication**: JWT-based authentication system with protected routes
- **Budget Management**: Create and manage multiple budgets with category-based spending limits
- **Expense Tracking**: Record, categorize, and track expenses with historical data
- **Financial Analytics**: 
  - Real-time dashboard with total budget, expenses, and remaining balance
  - Month-over-month expense comparison with percentage change
  - Category-wise expense breakdown with percentage distribution
  - Budget overflow alerts and visual indicators
- **Modern UI**: Responsive design with Tailwind CSS and Shadcn/ui components
- **Real-time Updates**: Seamless data synchronization and user experience
- **Mobile Responsive**: Fully responsive design that works across all devices

---

## Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **Java** | Core programming language |
| **Spring Boot** | Application framework for building REST APIs |
| **Spring Security** | Authentication and authorization |
| **Spring Data JPA** | Data persistence and database operations |
| **JWT (jjwt)** | Token-based stateless authentication |
| **MySQL / H2** | Relational database (MySQL for production, H2 for development) |
| **Lombok** | Reduces boilerplate code with annotations |
| **Maven** | Build automation and dependency management |

### Frontend
| Technology | Purpose |
|------------|---------|
| **Next.js** | React framework with server-side rendering and routing |
| **React** | UI component library |
| **TypeScript** | Type-safe JavaScript for better development experience |
| **Tailwind CSS** | Utility-first CSS framework for styling |
| **Shadcn/ui** | Pre-built accessible UI components |
| **pnpm** | Fast and efficient package manager |

### Architecture
- **RESTful API**: Clean separation between frontend and backend
- **JWT Authentication**: Stateless authentication with secure token management
- **Repository Pattern**: Clean data access layer with Spring Data JPA
- **Component-Based UI**: Reusable React components for maintainable code
- **Type Safety**: TypeScript for compile-time error checking
- **Responsive Design**: Mobile-first approach with Tailwind CSS

---

**Built with ❤️ using Spring Boot & Next.js**
