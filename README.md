## Backend setup
- cd backend
- composer install
- cp .env.example .env
- php artisan key:generate
- Configure .env with database credentials
- Create database in phpMyAdmin: task_management
- php artisan migrate
- php artisan db:seed --class=TaskSeeder
- php artisan serve

## Frontend setup
- cd frontend
- npm install
- npm run dev

## Challenges Faced
- CORS Configuration: Needed to properly configure CORS in Laravel to allow requests from the React development server.
- Date Handling: Ensuring consistent date formatting between Laravel (UTC) and React (local timezone).
- Form Validation: Implementing both client-side and server-side validation with proper error handling.
- State Management: Managing loading states, errors, and form data across multiple components.
- API Error Handling: Creating robust error handling for API calls with user-friendly messages.

