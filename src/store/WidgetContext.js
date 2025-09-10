import React, { createContext, useReducer, useContext, useEffect } from "react";

// Try to load state from localStorage
const savedState = JSON.parse(localStorage.getItem("widgetState"));

const initialState = savedState || {
  categories: [
    {
      id: 1,
      name: "CSPM Executive Dashboard",
      widgets: [
        { id: 101, name: "Cloud Accounts", type: "chart", chartType: "pie", visible: true },
        { id: 102, name: "Cloud Account Risk Assessment", type: "chart", chartType: "pie", visible: true }
      ]
    },
    { id: 2, name: "CWPP Dashboard", widgets: [] },
    {
      id: 3,
      name: "Registry Scan",
      widgets: [
        { id: 301, name: "Image Risk Assessment", type: "chart", chartType: "bar", visible: true },
        { id: 302, name: "Image Security Issues", type: "chart", chartType: "bar", visible: true }
      ]
    },
    { id: 4, name: "Ticket Dashboard", widgets: [] }
  ]
};

const WidgetContext = createContext();

function widgetReducer(state, action) {
  switch (action.type) {
    case "ADD_WIDGET": {
      const { categoryId, widget } = action.payload;
      const categoryExists = state.categories.some(c => c.id === categoryId);

      return {
        ...state,
        categories: categoryExists
          ? state.categories.map(c =>
              c.id === categoryId ? { ...c, widgets: [...c.widgets, widget] } : c
            )
          : [
              ...state.categories,
              { id: categoryId, name: `Category ${categoryId}`, widgets: [widget] }
            ]
      };
    }

    case "REMOVE_WIDGET": {
      const { categoryId, widgetId } = action.payload;
      return {
        ...state,
        categories: state.categories.map(c =>
          c.id === categoryId
            ? { ...c, widgets: c.widgets.filter(w => w.id !== widgetId) }
            : c
        )
      };
    }

    case "TOGGLE_WIDGET_VISIBILITY": {
      const { categoryId, widgetId } = action.payload;
      return {
        ...state,
        categories: state.categories.map(c =>
          c.id === categoryId
            ? {
                ...c,
                widgets: c.widgets.map(w =>
                  w.id === widgetId ? { ...w, visible: !w.visible } : w
                )
              }
            : c
        )
      };
    }

    default:
      return state;
  }
}

export function WidgetProvider({ children }) {
  const [state, dispatch] = useReducer(widgetReducer, initialState);

  // Persist state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("widgetState", JSON.stringify(state));
  }, [state]);

  return (
    <WidgetContext.Provider value={{ state, dispatch }}>
      {children}
    </WidgetContext.Provider>
  );
}

export function useWidgetContext() {
  return useContext(WidgetContext);
}
