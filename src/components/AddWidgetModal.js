import React, { useState, useMemo } from "react";
import { useWidgetContext } from "../store/WidgetContext";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tabs,
  Tab,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  TextField
} from "@mui/material";
import SearchBar from "./SearchBar";

// Default available widgets
const allAvailableWidgets = [
  { id: 101, name: "Cloud Accounts", type: "chart", chartType: "pie", categoryId: 1 },
  { id: 102, name: "Cloud Account Risk Assessment", type: "chart", chartType: "pie", categoryId: 1 },
  { id: 301, name: "Image Risk Assessment", type: "chart", chartType: "bar", categoryId: 3 },
  { id: 302, name: "Image Security Issues", type: "chart", chartType: "bar", categoryId: 3 },
];

const tabCategoryMap = {
  0: 1, // CSPM
  1: 2, // CWPP
  2: 3, // Image
  3: 4, // Ticket
};

function AddWidgetModal({ isOpen, onClose }) {
  const { state, dispatch } = useWidgetContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);
  const [customWidgetName, setCustomWidgetName] = useState("");
  const [customWidgetText, setCustomWidgetText] = useState("");

  const activeWidgetIds = useMemo(() => {
    const ids = new Set();
    state.categories.forEach(category =>
      category.widgets.forEach(widget => ids.add(widget.id))
    );
    return ids;
  }, [state.categories]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    setSearchTerm("");
  };

  const handleWidgetToggle = (widget) => {
    if (activeWidgetIds.has(widget.id)) {
      dispatch({
        type: "REMOVE_WIDGET",
        payload: { categoryId: widget.categoryId, widgetId: widget.id }
      });
    } else {
      dispatch({
        type: "ADD_WIDGET",
        payload: { categoryId: widget.categoryId, widget: { ...widget, visible: true } }
      });
    }
  };

  const handleAddCustomWidget = () => {
    if (!customWidgetName || !customWidgetText) return;

    const currentCategoryId = tabCategoryMap[selectedTab];
    const newWidget = {
      id: Date.now(),
      name: customWidgetName,
      text: customWidgetText,
      type: "text",
      categoryId: currentCategoryId,
      visible: true
    };

    dispatch({
      type: "ADD_WIDGET",
      payload: { categoryId: currentCategoryId, widget: newWidget }
    });

    setCustomWidgetName("");
    setCustomWidgetText("");
  };

  // Predefined widgets for current category
  const filteredWidgets = useMemo(() => {
    const currentCategoryId = tabCategoryMap[selectedTab];
    const term = searchTerm.toLowerCase();

    const widgetsForCategory = allAvailableWidgets.filter(
      w => w.categoryId === currentCategoryId
    );

    return widgetsForCategory.filter(widget =>
      widget.name.toLowerCase().includes(term)
    );
  }, [searchTerm, selectedTab]);

  // Custom widgets for current category
  const customWidgetsForCategory = useMemo(() => {
    const currentCategoryId = tabCategoryMap[selectedTab];
    return (
      state.categories.find(c => c.id === currentCategoryId)?.widgets.filter(
        w => w.type === "text"
      ) || []
    );
  }, [selectedTab, state.categories]);

  const tabs = ["CSPM", "CWPP", "Image", "Ticket"];

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Widget</DialogTitle>
      <DialogContent dividers>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Personalise your dashboard by adding the following widgets
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={selectedTab} onChange={handleTabChange}>
            {tabs.map((tab, index) => (
              <Tab key={index} label={tab} />
            ))}
          </Tabs>
        </Box>

        <Box sx={{ p: 2 }}>
          <SearchBar value={searchTerm} onChange={setSearchTerm} />

          {/* Predefined widgets */}
          <FormGroup>
            {filteredWidgets.map(widget => (
              <FormControlLabel
                key={widget.id}
                control={
                  <Checkbox
                    checked={activeWidgetIds.has(widget.id)}
                    onChange={() => handleWidgetToggle(widget)}
                  />
                }
                label={widget.name}
              />
            ))}
          </FormGroup>

          {/* Custom widgets already added */}
          {customWidgetsForCategory.length > 0 && (
            <Box mt={3}>
              <Typography variant="subtitle1">Custom Widgets</Typography>
              <FormGroup>
                {customWidgetsForCategory.map(widget => (
                  <FormControlLabel
                    key={widget.id}
                    control={
                      <Checkbox
                        checked={activeWidgetIds.has(widget.id)}
                        onChange={() => handleWidgetToggle(widget)}
                      />
                    }
                    label={widget.name}
                  />
                ))}
              </FormGroup>
            </Box>
          )}

          {/* Add Custom Widget */}
          <Box mt={4}>
            <Typography variant="h6">Add Custom Widget</Typography>
            <Box mt={2} display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Widget Name"
                variant="outlined"
                fullWidth
                value={customWidgetName}
                onChange={(e) => setCustomWidgetName(e.target.value)}
              />
              <TextField
                label="Widget Text"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                value={customWidgetText}
                onChange={(e) => setCustomWidgetText(e.target.value)}
              />
              <Button variant="contained" onClick={handleAddCustomWidget}>
                Add to Category
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onClose}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddWidgetModal;
