# My Shopping Project

![GitHub Repo](https://img.shields.io/github/stars/TruoYang/my-shopping-project?style=social)
![Next.js](https://img.shields.io/badge/Next.js-14-blue)
![Strapi](https://img.shields.io/badge/Strapi-v5-purple)
![Shadcn UI](https://img.shields.io/badge/Shadcn%20UI-Tailwind%20Components-orange)

## 📌 Introduction

**My Shopping Project** is a fullstack e-commerce web application built with:

- **Frontend**: [Next.js](https://nextjs.org/) combined with [Shadcn UI](https://ui.shadcn.com/) for building a modern, responsive, and component-based user interface.
- **Backend**: [Strapi](https://strapi.io/), a headless CMS that provides a user-friendly interface to manage content and APIs.

This project is designed as a personal learning experience to sharpen my fullstack development skills, from frontend implementation to backend integration.

## 🎯 Goals

- **Improve coding skills**: Practice writing clean, structured, and maintainable code.
- **Understand frontend-backend connection**: Learn how to handle API integration and data flow between the UI and backend.
- **Use async/await properly**: Gain experience in managing asynchronous operations effectively in JavaScript.
- **Simulate fullstack development**: Take responsibility for both UI/UX and data logic, like a real-world fullstack developer.

## 🧰 Technologies Used

### Frontend

- **Next.js**: A React-based framework supporting SSR and SSG for better SEO and performance.
- **Shadcn UI**: A collection of beautifully designed UI components built with Tailwind CSS.
- **React**: A popular JavaScript library for building component-driven UIs.

### Backend

- **Strapi**: An open-source headless CMS to manage structured content and expose APIs.
- **RESTful API**: Strapi provides easy-to-use REST endpoints to connect with the frontend.

## 🚀 How to Run

### 1. Clone the repository and open folder via any code editor

  git clone https://github.com/TruoYang/my-shopping-project.git
  cd my-shopping-project

### 2. Install dependencies

  npm install

### 3. Start the application
Frontend: open terminal of file "towerl"
  npm run dev
visit the frontend at http://localhost:3000

Backend (Strapi): open termianl of file "towerl-api"
  npm install
  npm run develop
visit the strapi at http://localhost:1337

### 4. Configure environment
create a .env file and set your environment variables:
NEXT_PUBLIC_API_URL=http://localhost:1337

### 5. Access Strapi Admin Panel
Visit http://localhost:1337/admin to register your admin account and start managing content.

📂 Project Structure:

my-shopping-project/
├── towerl/           # Next.js source code
│   ├── components/     # Reusable UI components
│   ├── pages/          # Application pages
│   └── ...
├── towerl-api/            # Strapi source code
│   ├── api/            # API endpoints
│   ├── config/         # Strapi configurations
│   └── ...
└── README.md           # Project documentation

📌 Notes
This project is still under development. Feedback and contributions are welcome!

If you encounter any issues or want to suggest improvements, feel free to open an issue or pull request on GitHub.
