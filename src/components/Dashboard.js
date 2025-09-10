// Dashboard.js
import React, { useState, useMemo } from "react";
import { useWidgetContext } from "../store/WidgetContext";
import Category from "./Category";
import AddWidgetModal from "./AddWidgetModal";
import SearchBar from "./SearchBar"; // Ensure this import is here
import { Box, Button } from "@mui/material";

function Dashboard() {
  const { state } = useWidgetContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddWidgetClick = () => {
    setIsModalOpen(true);
  };

  // This useMemo hook will filter the widgets based on the top search bar's value
  const filteredCategories = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      return state.categories;
    }

    return state.categories.map((category) => {
      const matchedWidgets = category.widgets.filter((w) =>
        w.name.toLowerCase().includes(term)
      );
      // Return the category with only the matched widgets
      return { ...category, widgets: matchedWidgets };
    });
  }, [state.categories, searchTerm]);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        {/* The new Search Bar */}
        <Box sx={{ flexGrow: 1, mr: 2 }}>
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </Box>
        <Button variant="contained" onClick={handleAddWidgetClick}>
          + Add Widget
        </Button>
      </Box>
      
      {/* Render the filtered categories */}
      {filteredCategories.map((category) => (
        <Category 
          key={category.id} 
          category={category}
          onAddWidgetClick={handleAddWidgetClick}
        />
      ))}

      <AddWidgetModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Box>
  );
}

export default Dashboard;