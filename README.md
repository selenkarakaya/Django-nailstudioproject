# Selena Nail Studio 💅

Selena Nail Studio is a web application designed to manage appointments and provide a user-friendly interface for clients. Users can register, log in, book appointments, and manage their profiles and bookings. The platform also provides the functionality to edit or cancel appointments, with disabled options for past appointments.

## Features ✨

- **Home Page** 🏠: Introduction to Selena Nail Studio.
- **About Our Services** 💅: Information about the services provided at the nail studio.
- **Profile Page** 👤: Users can view their profile, including booked appointments.
- **User Login** 🔑: Registered users can log in to manage appointments and view their profiles.
- **Register** 📝: New users can register to create an account and access all features.
- **Book Appointment** 📅: After logging in, users can book a new appointment.
- **Manage Appointments** 🛠️: Users can edit or cancel their booked appointments.
- **Disable Cancel/Edit Buttons** 🚫: If the appointment date has passed, the "Cancel" and "Edit" buttons will be disabled to prevent modification.

## Tech Stack 🛠️

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Django

## Getting Started 🚀

Follow these instructions to set up and run the project locally.

### Requirements ⚙️

- Python (for backend)
- Django
- PostgreSQL (or another database)

### Usage 🔧

- Register or log in to your account.
- Once logged in, you can book a new appointment.
- You can also view your profile and manage your appointments. If an appointment date has passed, the "Cancel" and "Edit" options will be disabled.

### 📚 Learning & Insights

Through this project, my first experience with Django, I gained valuable insights and skills, including:

- User Authentication: I learned how to implement user registration, login, and logout functionalities, allowing users to create accounts and manage their sessions securely.
- Models, Serializers, and Views: I gained hands-on experience working with Django models, serializers, and views to structure and manage data efficiently within the application.
- Creating and Managing User-Related Data: I learned how to associate new objects with users, allowing them to create, edit, and delete entries related to their profile.
- CRUD Operations: I gained the ability to perform CRUD (Create, Read, Update, Delete) operations for user-related objects, enabling users to manage their data effectively.
- Django REST Framework: Through the use of serializers and views, I deepened my understanding of how to build APIs and handle data serialization for efficient communication between the frontend and backend.
- Responsive Design with Tailwind CSS: I enhanced my front-end skills by utilizing Tailwind CSS to create a responsive and visually appealing user interface that works well across different screen sizes.
- This project strengthened my foundational understanding of Django and full-stack development, and it has fueled my passion for building secure, user-friendly web applications.

### Installation 🛠️

1. **Clone the repository**:

   ```bash
   git clone https://github.com/selenkarakaya/Django-nailstudioproject.git

   ```

2. **Frontend Setup**:

- Navigate to the frontend directory:

```bash
   cd frontend
```

- Install dependencies:

```bash
   npm install
```

- Run the development server:

```bash
    npm run dev
```

3. **Backend Setup**:

- Navigate to the frontend directory:

```bash
   cd backend
```

- Install dependencies:

```bash
   pip install -r requirements.txt
```

- Start the Django server:

```bash
   python manage.py runserver
```
