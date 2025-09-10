import React from "react";
import Widget from "./Widget";
import { Card, CardHeader, CardContent,Box } from "@mui/material";

function Category({ category, onAddWidgetClick }) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title={category.name}
        subheader={`${category.widgets.length} widget(s)`}
      />
      <CardContent>
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fill, minmax(400px, 2fr))"
          gap={2}
        >
          {category.widgets.length === 0 ? (
            // If no widgets, show only the "Add widget" card
            <Box
              sx={{
                border: "2px dashed #ccc",
                borderRadius: "8px",
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "text.secondary",
                cursor: "pointer",
                "&:hover": { borderColor: "primary.main" }
              }}
              onClick={onAddWidgetClick}
            >
              + Add widget
            </Box>
          ) : (
            // If widgets exist, show them + the "Add widget" card
            <>
              {category.widgets.map(
                (w) => w.visible && <Widget key={w.id} categoryId={category.id} widget={w} />
              )}
              <Box
                sx={{
                  border: "2px dashed #ccc",
                  borderRadius: "8px",
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "text.secondary",
                  cursor: "pointer",
                  "&:hover": { borderColor: "primary.main" }
                }}
                onClick={onAddWidgetClick}
              >
                + Add widget
              </Box>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

export default Category;
