# ResourceHub UI – Group 13 Project

This repository contains the **frontend** of the EduLend Equipment Lending System, developed as part of **Group 13’s project**.  
The application enables users to manage equipment lending efficiently, including user authentication, equipment management, and data visualization.

---

## 🚀 Features

- 🔐 **Authentication** – Secure login and signup flow  
- 🧰 **Equipment Management** – Add, view, and manage equipment details  
- ⚙️ **Redux Architecture** – Centralized state management using Redux, Actions, Reducers, and Epics  
- 🌐 **API Integration** – Backend communication via Axios-based connectors  
- 💾 **Local Storage Support** – Persistent user sessions and configurations  
- 🧱 **Modular Structure** – Clean separation of concerns with reusable components  

---

## 🧩 Project Structure

frontend/edulend-ui/
│
├── public/
│ └── robots.txt
│
├── src/
│ ├── common/
│ │ └── config/
│ │ ├── env.js
│ │ ├── http.js
│ │ └── storage.js
│ │
│ ├── transformers/
│ │ ├── authTransformer.js
│ │ ├── authApi.js
│ │ └── equipmentApi.js
│ │
│ ├── components/
│ │ ├── AddEquipmentForm.jsx
│ │ ├── AppNavbar.jsx
│ │ ├── Equipment.jsx
│ │ ├── LoginForm.jsx
│ │ ├── Sidebar.jsx
│ │ └── SignupForm.jsx
│ │
│ ├── redux/
│ │ ├── actions/
│ │ │ ├── authActions.js
│ │ │ └── equipmentActions.js
│ │ ├── constants/
│ │ │ └── actionsTypes.js
│ │ ├── epics/
│ │ │ ├── authEpics.js
│ │ │ └── equipmentEpics.js
│ │ ├── reducers/
│ │ │ ├── authReducer.js
│ │ │ ├── equipmentReducer.js
│ │ │ ├── rootEpic.js
│ │ │ ├── rootReducer.js
│ │ │ └── store.js
│ │
│ ├── App.js
│ ├── App.css
│ ├── index.js
│ ├── index.css
│ ├── reportWebVitals.js
│ └── setupTests.js
│
├── ssl/
│ ├── cert.pem
│ └── key.pem
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md


---

## ⚙️ Installation & Setup

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v24 or higher)
- **npm** (v10 or higher)

### Steps to Run

```bash
# 1. Navigate to the project directory
cd frontend/edulend-ui

# 2. Install dependencies
npm install

# 3. Start the development server
npm run start
