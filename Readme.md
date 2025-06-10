# 🎬 Movie App Backend

This is the backend API for a full-stack Movie App. It provides movie data from TMDb, user authentication, favorites, watchlists, reviews, and personalized recommendations.

---

## 🚀 Features

- 🔐 JWT Authentication (Login/Register)
- 🎥 Fetch Popular Movies
- 🔍 Search Movies by Title and Year
- 📄 View Movie Details and Trailers
- ⭐ Add or Remove from Favorites
- 👁️ Add or Remove from Watchlist
- 📝 Create and Manage Reviews
- 🎯 Personalized Movie Recommendations

---

## 🛠️ Tech Stack

- **Node.js** + **Express**
- **MongoDB** + Mongoose
- **JWT Authentication**
- **Axios** for external API requests (TMDb)
- **Dotenv** for config
- TMDb API

---

## 🔧 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/movie-app-backend.git
cd movie-app-backend
```

---
### 2. Install Dependencies

```bash
npm install
```
---
### 3 Environment Variables
Create a .env file in the root directory and add the following:
```env
PORT=8000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
TMDB_API_KEY=your_tmdb_api_key
```
---
### 4. Start the Server

```bash
npm run dev
```
Server will run on: http://localhost:8000

---

## Authentication

Use the Bearer token received from login to access protected endpoints.

Example Header: Authorization: Bearer <your_token>

---

## API Endpoints

| Method | Endpoint       | Description           |
|--------|----------------|-----------------------|
| POST    | `	/api/auth/register`       | Register user       |
| POST    | `/api/auth/login`   | Login user       |

## Movie Routes

| Method | Endpoint                       | Description                      |
| ------ | ------------------------------ | -------------------------------- |
| GET    | /api/movies/popular            | Get popular movies               |
| GET    | /api/movies/search?query=title | Search movies                    |
| GET    | /api/movies/\:id               | Get single movie details         |
| GET    | /api/movies/\:id/trailer       | Get movie trailer                |
| GET    | /api/movies/ recommendations            | Get personalized recommendations |


## Favorites

| Method | Endpoint            | Description      |
| ------ | ------------------- | ---------------- |
| POST   | /api/favorites      | Add to favorites |
| GET    | /api/favorites      | Get favorites    |
| DELETE | /api/favorites/\:id | Remove favorite  |

##  Watchlist

| Method | Endpoint            | Description           |
| ------ | ------------------- | --------------------- |
| POST   | /api/watchlist      | Add to watchlist      |
| GET    | /api/watchlist      | Get watchlist         |
| DELETE | /api/watchlist/\:id | Remove from watchlist |


## Reviews
| Method | Endpoint          | Description      |
| ------ | ----------------- | ---------------- |
| POST   | /api/reviews      | Add review       |
| GET    | /api/reviews      | Get user reviews |
| DELETE | /api/reviews/\:id | Delete review    |

---

##  Project Structure
```bash
movie-app-backend/
│
├── controllers/         # Route logic
├── models/              # Mongoose schemas
├── routes/              # API route files
├── middleware/          # Authentication middleware
├── utils/               # Utility functions
├── config/              # Config (e.g., TMDb axios instance)
├── server.js            # App entry point
├── .env                 # Environment variables
├── package.json
└── README.md
```
---

## Postman Collection
A Postman collection is available to test endpoints more easily. https://documenter.getpostman.com/view/39957643/2sB2x2LaT5
---

## Author 

Developed by Ayomide Fasogba – Feel free to contribute, suggest improvements, or report issues!

