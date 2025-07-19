# Dojeon Project

A side project built with React TypeScript frontend and Spring Boot backend.

## Project Structure

```
DOJEON/
├── frontend/          # React TypeScript Frontend
├── backend/           # Spring Boot Backend
└── README.md         # Project Documentation
```

## Tech Stack

### Frontend
- React 18
- TypeScript
- Create React App

### Backend
- Spring Boot 3.2.0
- Spring Data JPA
- H2 Database
- Maven

## How to Run

### 1. Start Backend

```bash
cd backend
./mvnw spring-boot:run
```

Or

```bash
cd backend
mvn spring-boot:run
```

Backend runs on `http://localhost:8080`.

### 2. Start Frontend

In a new terminal:

```bash
cd frontend
npm start
```

Frontend runs on `http://localhost:3000`.

## API Endpoints

- `GET /api/hello` - Returns hello message
- `GET /api/health` - Backend health check

## H2 Database Console

After starting the backend, you can access the H2 database console at `http://localhost:8080/h2-console`.

- JDBC URL: `jdbc:h2:mem:testdb`
- Username: `sa`
- Password: `password`

## Development Environment Setup

### Prerequisites
- Node.js 16+
- Java 17+
- Maven 3.6+

### Check Installed Packages

```bash
# Check Node.js version
node --version

# Check Java version
java --version

# Check Maven version
mvn --version
``` 