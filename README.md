# Daily Timetable Planner — Full Stack Web Application

A full-stack productivity web application that allows users to create, organize, and manage daily schedules using a flexible timetable system with dynamic groups and week-based organization.

Built as part of focused full-stack development practice to demonstrate practical skills in modern web architecture, state management, REST APIs, and database-driven UI.

## Features
### Activity Management (Full CRUD)

- Create new activities
- Edit existing activities
- Delete activities
- Automatic sorting by start time (backend-driven)
- Week-based filtering

### Dynamic Group System

- Groups stored in backend database
- Create new groups directly from UI
- Activity form dynamically populated from database

### Week Management

- Add custom weeks
- Rename weeks
- Duplicate weeks with activities
- Delete weeks (with safety checks)

### UX Enhancements

- Loading states during API calls
- Error handling for requests
- Dynamic form switching (Add vs Edit mode)
- Conditional UI rendering

## 🧠 Architecture Overview

The application follows a clear separation between frontend and backend responsibilities.

### Frontend (React)

- Component-based architecture
- Controlled forms
- API-driven state
- Backend-powered filtering

### Backend (Node.js + Express)

- RESTful API design
- Route separation
- Controller separation
- Async middleware handling
- MongoDB data persistence via Mongoose

## Tech Stack
### Frontend

- React (Vite)
- Tailwind CSS
- Fetch API

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

## API Endpoints
### Activities
- GET    /activities?week=week
- POST   /activities
- PUT    /activities/:id
- DELETE /activities/:id

### Groups

- GET    /groups
- POST   /groups

## Key Engineering Decisions

- Backend-driven sorting and filtering for scalability.

- Dynamic UI populated from database instead of hardcoded data.

- Separation of UI state (weeks) and database state (activities/groups).

- Reusable ActivityForm supporting both create and edit workflows.

## Learning Outcomes

This project strengthened understanding of:

- Full-stack architecture design

- REST API structuring

- React state management

- Async request handling

- MongoDB data modeling

- Clean component separation

## ▶️ Running Locally
### Backend
- npm install
- npm run dev
### Frontend
- npm install
- npm run dev