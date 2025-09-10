# Dashboard Application

This project is a dynamic dashboard application built with React, Material-UI, and Recharts. It allows users to manage a collection of widgets across different categories. Users can add, remove, hide, and search for widgets, with the state being persisted in local storage.

---

## 🚀 Features

- **Dynamic Dashboard**: Widgets are rendered based on a JSON-like data structure.
- **Widget Management**:
  - **Add Widgets**: Users can dynamically add a widget to a section/category.
  - **Remove Widgets**: Widgets can be removed by clicking a cross icon on the widget itself or by unchecking them from the category list.
- **Persistent State**: The dashboard's state is automatically saved to and loaded from local storage using React's `useEffect` hook.
- **Filtering**: A search bar allows users to search in a list of all the widgets.
- **Data Visualization**: The dashboard can display various types of widgets, including pie and bar charts.

---

## 🛠️ Technology Stack

- **React**: For building the user interface.
- **Material-UI (MUI)**: A React component library for styling and UI elements.
- **Recharts**: A charting library for data visualization.
- **Context API & `useReducer`**: For local state management.

---

## ⚙️ How to Run Locally

Follow these steps to set up and run the application on your local machine.

### Prerequisites

- Node.js (LTS version recommended)
- npm or yarn

### Steps

1. **Clone the Repository**

   ```bash
   git clone <your-repository-url>
   cd <your-project-folder>
   ```

2. **Install Dependencies**  
   Install all the required packages listed in `package.json`.

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the Application**  
   Start the development server. The application will be available at `http://localhost:3000`.

   ```bash
   npm start
   # or
   yarn start
   ```
   ## 🌐 Deployment

The application is deployed and available at the following link:

- **Deployment URL**: https://atyam-pravallika.github.io/Widget_Manager/
