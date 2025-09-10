// Widget.js
import React from "react";
import { useWidgetContext } from "../store/WidgetContext";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function Widget({ categoryId, widget }) {
  const { dispatch } = useWidgetContext();

  const handleRemove = () => {
    dispatch({
      type: "REMOVE_WIDGET",
      payload: { categoryId, widgetId: widget.id },
    });
  };

  const pieData = [
    { name: "Passed", value: 7253 },
    { name: "Failed", value: 1689 },
    { name: "Warning", value: 681 },
    { name: "Not Available", value: 36 },
  ];
  const COLORS = ["#4caf50", "#f44336", "#ff9800", "#9e9e9e"];

  const barData = [
    { name: "Critical", value: 9 },
    { name: "High", value: 150 },
    { name: "Medium", value: 528 },
    { name: "Low", value: 789 },
  ];

  const placeholderImage = (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
      <img src="https://example.com/placeholder-image.svg" alt="No data" style={{ width: 80, height: 80, opacity: 0.5 }} />
      <Typography variant="body2" color="text.secondary" mt={1}>
        No Graph data available!
      </Typography>
    </Box>
  );

  return (
    <Card sx={{ mb: 2, bgcolor: "#fafafa" }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1" fontWeight="bold">
            {widget.name}
          </Typography>
          <IconButton onClick={handleRemove} size="small" color="error">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Render widget content */}
        {widget.type === "text" && (
          <Box display="flex" justifyContent="center" alignItems="center" height={200}>
            {widget.text ? (
              <Typography variant="body2" color="text.secondary" mt={1}>
                {widget.text}
              </Typography>
            ) : (
              // This is the new placeholder logic
              placeholderImage
            )}
          </Box>
        )}

        {widget.type === "chart" && widget.chartType === "pie" && (
          <Box display="flex" alignItems="center" justifyContent="center">
            <PieChart width={200} height={200}>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <text x={100} y={100} textAnchor="middle" dominantBaseline="middle" fontSize="14" fontWeight="bold">
                {pieData.reduce((sum, d) => sum + d.value, 0)} Total
              </text>
            </PieChart>
            <Box display="flex" flexDirection="column" justifyContent="center" ml={2}>
              {pieData.map((entry, index) => (
                <Box key={entry.name} display="flex" alignItems="center" mb={0.5}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      bgcolor: COLORS[index % COLORS.length],
                      mr: 1,
                    }}
                  />
                  <Typography variant="body2">{entry.name} ({entry.value})</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {widget.type === "chart" && widget.chartType === "bar" && (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData} barSize={40}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1976d2" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#1976d2" stopOpacity={0.5} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip />
              <Bar
                dataKey="value"
                fill="url(#barGradient)"
                radius={[6, 6, 0, 0]}
                label={{ position: "top", fill: "#333", fontSize: 12 }}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

export default Widget;