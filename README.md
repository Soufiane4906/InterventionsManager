# Fullstack Intervention Manager (MERN)



# Overview
The Cloud-Based Intervention Manager is a web application designed to streamline team intervention management. Built using the MERN stack (MongoDB, Express.js, React, and Node.js), this platform provides a user-friendly interface for efficient intervention assignment, tracking, and collaboration. The application caters to administrators and regular users, offering comprehensive features to enhance productivity and organization.



### Why/Problem?
In a dynamic work environment, effective intervention management is crucial for team success. Traditional methods of intervention tracking through spreadsheets or manual systems can be cumbersome and prone to errors. The Cloud-Based Intervention Manager aims to address these challenges by providing a centralized platform for intervention management, enabling seamless collaboration and improved workflow efficiency.



### **Background**:
With the rise of remote work and dispersed teams, there is a growing need for tools that facilitate effective communication and intervention coordination. The Cloud-Based Intervention Manager addresses this need by leveraging modern web technologies to create an intuitive and responsive intervention management solution. The MERN stack ensures scalability, while the integration of Redux Toolkit, Headless UI, and Tailwind CSS enhances user experience and performance.


###
## **Admin Features:**
1. **User Management:**
    - Create admin accounts.
    - Add and manage team members.

2. **Intervention Assignment:**
    - Assign interventions to individual or multiple users.
    - Update intervention details and status.

3. **Intervention Properties:**
    - Label interventions as todo, in progress, or completed.
    - Assign priority levels (high, medium, normal, low).
    - Add and manage sub-interventions.

4. **Asset Management:**
    - Upload intervention assets, such as images.

5. **User Account Control:**
    - Disable or activate user accounts.
    - Permanently delete or trash interventions.


## **User Features:**
1. **Intervention Interaction:**
    - Change intervention status (in progress or completed).
    - View detailed intervention information.

2. **Communication:**
    - Add comments or chat to intervention activities.


## **General Features:**
1. **Authentication and Authorization:**
    - User login with secure authentication.
    - Role-based access control.

2. **Profile Management:**
    - Update user profiles.

3. **Password Management:**
    - Change passwords securely.

4. **Dashboard:**
    - Provide a summary of user activities.
    - Filter interventions into todo, in progress, or completed.




## **Technologies Used:**
- **Frontend:**
    - React (Vite)
    - Redux Toolkit for State Management
    - Headless UI
    - Tailwind CSS


- **Backend:**
    - Node.js with Express.js

- **Database:**
    - MongoDB for efficient and scalable data storage.


The Cloud-Based Intervention Manager is an innovative solution that brings efficiency and organization to intervention management within teams. By harnessing the power of the MERN stack and modern frontend technologies, the platform provides a seamless experience for both administrators and users, fostering collaboration and productivity.

&nbsp;

## SETUP INSTRUCTIONS


# Server Setup

## Environment variables
First, create the environment variables file `.env` in the server folder. The `.env` file contains the following environment variables:

- MONGODB_URI = `your MongoDB URL`
- JWT_SECRET = `any secret key - must be secured`
- PORT = `8800` or any port number
- NODE_ENV = `development`


&nbsp;

## Set Up MongoDB:

1. Setting up MongoDB involves a few steps:
    - Visit MongoDB Atlas Website
        - Go to the MongoDB Atlas website: [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).

    - Create an Account
    - Log in to your MongoDB Atlas account.
    - Create a New Cluster
    - Choose a Cloud Provider and Region
    - Configure Cluster Settings
    - Create Cluster
    - Wait for Cluster to Deploy
    - Create Database User
    - Set Up IP Whitelist
    - Connect to Cluster
    - Configure Your Application
    - Test the Connection

2. Create a new database and configure the `.env` file with the MongoDB connection URL.

## Steps to run server

1. Open the project in any editor of choice.
2. Navigate into the server directory `cd server`.
3. Run `npm i` or `npm install` to install the packages.
4. Run `npm start` to start the server.

If configured correctly, you should see a message indicating that the server is running successfully and `Database Connected`.

&nbsp;

# Client Side Setup

## Environment variables
First, create the environment variables file `.env` in the client folder. The `.env` file contains the following environment variables:

- VITE_APP_BASE_URL = `http://localhost:8800` #Note: Change the port 8800 to your port number.
- VITE_APP_FIREBASE_API_KEY = `Firebase api key`

## Steps to run client

1. Navigate into the client directory `cd client`.
2. Run `npm i` or `npm install` to install the packages.
3. Run `npm start` to run the app on `http://localhost:3000`.
4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.



&nbsp;

## For Support, Contact:

- Email: codewavewithasante@gmail.com
- Telegram Chat: [https://t.me/Codewave_with_asante](https://t.me/Codewave_with_asante)