import React from "react";
import { useWidgetContext } from "../store/WidgetContext";
import {
  Card,
  CardHeader,
  CardContent,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";

function ManageCategories() {
  const { state, dispatch } = useWidgetContext();

  return (
    <Card>
      <CardHeader title="Manage Widgets" />
      <CardContent>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Uncheck to hide (does not delete). Use ❌ in a widget to remove.
        </Typography>
        {state.categories.map((cat) => (
          <div key={cat.id} style={{ marginBottom: 16 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {cat.name}
            </Typography>
            <FormGroup>
              {cat.widgets.map((w) => (
                <FormControlLabel
                  key={w.id}
                  control={
                    <Checkbox
                      checked={w.visible}
                      onChange={() =>
                        dispatch({
                          type: "TOGGLE_WIDGET_VISIBILITY",
                          payload: { categoryId: cat.id, widgetId: w.id },
                        })
                      }
                    />
                  }
                  label={w.name}
                />
              ))}
            </FormGroup>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default ManageCategories;
