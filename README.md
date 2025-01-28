# AdonisJS - Introduction

## 📝 Description
This project is a Node.js application built with AdonisJS and TypeScript. It uses Inertia, React and Transmit for SSE.

## 🛠 Technologies Used
- **Node.js** - Runtime environment
- **TypeScript** - Programming language
- **AdonisJS** - Server framework
- **MySQL & MySQL2** - Database
- **React** - Frontend Library

## 📋 Prerequisites
- Node.js
- MySQL database
- npm or pnpm

## 🚀 Installation

1. Clone the repository:
```bash
git clone https://github.com/LouisHyt/AdonisJS-Inertia-React
cd AdonisJS-Inertia-React
```

2. Install dependencies:
```bash
npm install
pnpm install
```

3. Configure environment variables:
- Create a `.env` file in the root directory
- Fill the fields based on the file `.env.example`

⚠️ *If you wish to add more environment variables, don't forget to edit the start/env.ts file as well to get type completion. You can also run the command `node ace env:add` if you want it to be automatically configured*

4. Configure and create the Database
- Create a mySQL database with the same name provided in the `.env` file
- Run the command `node ace migration:run`

5. Start the application in development mode:
```bash
npm run dev
pnpm run dev
```

## 🏗 Project Structure
```
├── app/            
├── bin/
├── config/
├── database/
├── inertia/
├── resources/
├── start/
└── tests/
```

## 📦 Available Scripts
- `pnpm run dev` : Starts the application in development mode
- `pnpm run build` : Build the project

## 📄 Infos
This project was made on my free time to learn more about AdonisJS.
- 📅 Date : January 2025
- ✍️ Author : Louis Hayotte
