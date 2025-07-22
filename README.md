# 💼 Job Portal - Full Stack Web Application

A modern and role-based job portal built with **React.js**, **Spring Boot**, and **MySQL**. This project enables **job seekers**, **recruiters**, and **admins** to interact with job listings, applications, and user management in a clean and efficient UI.

---

## 📌 About the Project

This project is a **fully functional Job Portal** featuring secure authentication, real-time job listings, role-based access, job application tracking, and a dedicated admin panel.

The portal supports **3 roles**:

- **User**: Can browse, save, and apply to jobs.
- **Recruiter**: Can post, edit, and manage jobs they created.
- **Admin**: Has full control over all users and job listings.

Built to be **scalable**, **secure**, and **cloud-ready**, this project can serve as a foundation for production-grade job platforms or as an advanced portfolio piece.

---

## ✅ Features

### 👤 Authentication & Authorization

- JWT-based login and registration
- Role-based access control (User, Recruiter, Admin)
- Change password, update profile
- CORS handled correctly for secure APIs

### 💼 For Job Seekers

- Browse, search, and filter jobs
- Save and apply for jobs
- View applied/saved job history
- Profile page with activity metrics

### 🧑‍💼 For Recruiters

- Post new jobs
- Edit or delete their own job listings
- View only the jobs they've posted

### 🛠️ For Admins

- Dashboard with job & user statistics
- Full CRUD for:
  - Users (Add, Edit, Delete, Role-based)
  - Jobs (Manage all jobs)
- Metrics dashboard with live API integration

---

## 🧰 Tech Stack

### 🔗 Frontend

- React.js
- React Router
- Axios
- Material UI
- Global state with Context + Hooks

### ⚙️ Backend

- Spring Boot (Java 17+)
- Spring Security (JWT-based auth)
- JPA & Hibernate
- MySQL
- Lombok

---

## 📷 Screenshots

![image](https://github.com/user-attachments/assets/1402cb2d-586d-49ec-988e-b357e351d963)
![image](https://github.com/user-attachments/assets/e0a6dbf7-f145-4b3b-8181-bd7ca365cfe5)
![image](https://github.com/user-attachments/assets/2edc63fb-279f-4e54-b442-d04bc19c0096)
![image](https://github.com/user-attachments/assets/2a26f4a1-fed8-4536-82ba-02ee96e51d86)
![image](https://github.com/user-attachments/assets/c2fc50a5-4de0-416e-b445-ff2c14ac6ebc)




---

## 🚀 Getting Started

### 🖥 Frontend

```bash
cd frontend
npm install
npm start
Runs on http://localhost:3000
```

⚙️ Backend
```bash
cd backend
./mvnw spring-boot:run
Runs on http://localhost:8080
```

Make sure your MySQL DB is up and running, and credentials are set correctly in application.properties or application.yml.

🧪 Sample Credentials
```
Role	Username	Password
Admin	admin@jp.com	admin123
Recruiter	rec@jp.com	recruiter123
User	user@jp.com	user123
```
You can create new accounts via /register page by choosing a role.
📂 Folder Structure Highlights
bash
Copy
Edit
/backend
  ├── config/
  ├── controller/
  ├── dto/
  ├── exception/
  ├── model/
  ├── repository
  ├── security
  ├── service/
  └── security/

frontend/
  ├── api/
  ├── assets/
  ├── components/
  ├── contexts/
  ├── hooks/
  └── utils/
  ├── pages/
  
🔮 Future Enhancements
Job recommendations

- Resume upload & parsing
- Recruiter dashboard with analytics
- Email notifications
- AI chatbot integration

🧑‍💻 Author
        Developed by Nasir Khan
🔗 [LinkedIn](https://www.linkedin.com/in/mnkkhan77) • [GitHub](https://github.com/mnkkhan77)

📃 License
This project is open-source under the MIT License.

---------------------------------------------------
