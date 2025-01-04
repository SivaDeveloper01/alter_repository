
Overview
This project implements a Custom URL Shortener API that allows users to shorten URLs, track analytics, group links by topics, and more. The API includes user authentication via Google Sign-In, rate limiting, caching with Redis, and scalable architecture to support a growing number of users and URLs.

The system also provides advanced analytics on shortened URLs, including insights on unique users, devices, operating systems, and total clicks.

Features
User Authentication (Google Sign-In): Secure login and registration using Google OAuth.
Short URL Creation: Allows users to shorten long URLs, with optional custom aliases and categorization into topics.
URL Redirection: Redirects users from shortened URLs to the original long URLs while tracking analytics (clicks, devices, OS).
Analytics: Detailed analytics for each shortened URL, topic-based analytics, and overall analytics for a user.
Rate Limiting: Restrict the number of URLs a user can create within a specific time frame.
Caching: Caching URL data in Redis to improve performance.
Swagger API Documentation: Automatically generated API documentation for easy reference.

Dockerization: A Dockerized solution to simplify deployment to cloud hosting services like AWS or Heroku.
Tech Stack
Node.js with Express.js
MongoDB for database storage
Redis for caching
Passport.js for Google OAuth authentication
Swagger for API documentation
GeoIP for geolocation tracking
Jest and Supertest for testing
Docker for containerization
Project Setup
Prerequisites
Node.js (v16 or later)
MongoDB running locally or using a cloud service (e.g., MongoDB Atlas)
Redis server running locally or on a cloud service
Google API credentials for Google OAuth
Step 1: Clone the Repository
Clone the repository to your local machine:



git clone https://github.com/yourusername/url-shortener-api.git
cd url-shortener-api
Step 2: Install Dependencies
Install all required dependencies:



npm install
Step 3: Set Up Environment Variables
Create a .env file in the root directory with the following variables:

env

PORT=3000
MONGO_URI=mongodb://localhost:27017/urlshortener
REDIS_URI=redis://localhost:6379
GOOGLE_CLIENT_ID=<your_google_client_id>
GOOGLE_CLIENT_SECRET=<your_google_client_secret>
JWT_SECRET=<your_jwt_secret>
Replace <your_google_client_id> and <your_google_client_secret> with your Google OAuth credentials.
Replace <your_jwt_secret> with a secret key for JWT token generation.
Step 4: Docker Setup (Optional)
If you prefer to run the app using Docker, you can build and run the application using Docker Compose.

Build and start the services:


docker-compose up --build
The application will be available at http://localhost:3000.
Step 5: Run the Application Locally
If you're not using Docker, you can run the app locally:



npm run dev
The server will start on http://localhost:3000.

API Endpoints
1. User Authentication
POST /api/auth/signup: Initiates Google Sign-In authentication.
GET /api/auth/callback: Callback endpoint for Google OAuth authentication. After successful authentication, a JWT token will be returned.
2. Short URL Creation
POST /api/shorten: Shortens a URL.
Request Body:
json

{
  "longUrl": "https://www.example.com",
  "customAlias": "myCustomAlias",
  "topic": "acquisition"
}
Response:
json

{
  "shortUrl": "http://localhost:3000/api/shorten/myCustomAlias",
  "createdAt": "2025-01-04T12:00:00Z"
}
3. Redirect Short URL
GET /api/shorten/:alias: Redirects to the original long URL based on the provided alias.
4. Analytics
GET /api/analytics/:alias: Retrieves detailed analytics for a specific short URL.

Response:
json

{
  "totalClicks": 100,
  "uniqueUsers": 75,
  "clicksByDate": [
    { "date": "2025-01-01", "clickCount": 50 },
    { "date": "2025-01-02", "clickCount": 50 }
  ],
  "osType": [
    { "osName": "Windows", "uniqueClicks": 50, "uniqueUsers": 40 }
  ],
  "deviceType": [
    { "deviceName": "Desktop", "uniqueClicks": 60, "uniqueUsers": 50 }
  ]
}
GET /api/analytics/topic/:topic: Retrieves analytics for all URLs under a specific topic (e.g., acquisition).

GET /api/analytics/overall: Retrieves overall analytics for all short URLs created by the authenticated user.

5. Swagger API Documentation
Visit http://localhost:3000/api-docs to view the Swagger-generated API documentation.

Testing
This project includes unit tests for API endpoints using Jest and Supertest.

To run the tests:



npm test
This will run the tests and output the results in the terminal.

Deployment
The solution is containerized using Docker and can be deployed to any cloud hosting platform that supports Docker (e.g., AWS, Heroku).

Build Docker Image:


docker build -t url-shortener-api .
Push to Cloud Platform (e.g., AWS ECS, Heroku): Follow the platform's instructions for deploying Dockerized applications.
Future Improvements
Enhanced Analytics: Implement more granular analytics such as top referrers, device/browser breakdown, and A/B testing.
Custom URL Expiry: Add the ability to set an expiration date for URLs.
User Profile: Allow users to manage and view all their shortened URLs.
Contributing
Feel free to submit issues or pull requests. All contributions are welcome!

License
This project is licensed under the MIT License - see the LICENSE file for details.

Contact Information
If you have any questions or need further information, feel free to contact the project maintainers at sivamani072001@gmail.com.

