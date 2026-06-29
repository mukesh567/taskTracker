# Task Tracker (MERN Stack CRUD Application)

A full-stack Task Tracker application built using the MERN stack (MongoDB, Express.js, React, Node.js). This application allows users to manage their daily tasks, offering features to create, read, update, and delete (CRUD) tasks. It also supports filtering and sorting of tasks.

## Project Structure

The project is divided into two main parts:
- `frontend/`: The React application built with Vite.
- `backend/`: The Node.js and Express server with MongoDB integration.

---

## Backend

The backend is built with Node.js, Express, and uses Mongoose for MongoDB object modeling.

### Tech Stack
- **Node.js** & **Express.js**: For creating the server and handling API routes.
- **MongoDB** & **Mongoose**: For the database and schema definition.
- **dotenv**: For managing environment variables.
- **cors**: To handle Cross-Origin Resource Sharing.

### API Endpoints

The base URL for the API is `/api/tasks`.

#### 1. Get All Tasks
- **URL**: `GET /api/tasks`
- **Query Parameters**:
  - `status` (optional): Filter tasks by status (e.g., "All", "Pending", "In Progress", "Completed").
  - `sort` (optional): Sort tasks. Options are `oldest`, `dueDate`, and by default, it sorts by newest (`createdAt: -1`).
- **Response**: Array of task objects.

#### 2. Create a New Task
- **URL**: `POST /api/tasks`
- **Body**:
  ```json
  {
    "title": "Task Title",
    "description": "Task description details",
    "status": "Pending",
    "dueDate": "2023-12-31"
  }
  ```
  *(Note: `title` is required)*
- **Response**: The created task object.

#### 3. Update a Task
- **URL**: `PUT /api/tasks/:id`
- **Body**: The fields you wish to update (`title`, `description`, `status`, `dueDate`).
- **Response**: The updated task object.

#### 4. Delete a Task
- **URL**: `DELETE /api/tasks/:id`
- **Response**: A success message confirming deletion.

### Backend Setup
1. Navigate to the `backend` directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file based on `.env.example` and add your `MONGO_URI` and `PORT` (default 5000).
4. Start the server: `npm start` (or `node server.js`)

---

## Frontend

The frontend is a single-page application built with React and Vite. It provides an intuitive user interface for interacting with the task APIs.

### Tech Stack
- **React 19**: UI library.
- **Vite**: Fast frontend build tool.
- **Axios**: Promise-based HTTP client for making API requests.
- **React Hot Toast**: For displaying elegant notifications/toasts.
- **React Icons**: For UI iconography.

### Features
- **Task Management**: Create, edit, delete, and view tasks.
- **Filtering & Sorting**: Users can filter tasks by status or sort them by creation date/due date.
- **Responsive UI**: Designed to work on different screen sizes.
- **Notifications**: Real-time feedback for user actions via toast notifications.

### Frontend Setup
1. Navigate to the `frontend` directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Access the app in your browser (usually at `http://localhost:5173`).

---

## Getting Started (Run Locally)

1. Clone or download this repository.
2. Open two terminal windows.
3. In the first terminal, start the **backend**:
   ```bash
   cd backend
   npm install
   node server.js
   ```
4. In the second terminal, start the **frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
5. Open the frontend local URL provided by Vite in your browser to use the application.
