"use client";

import React, { useState, useEffect } from "react";
import { Save, Zap } from "lucide-react";

import { useFlowStore } from "../../hooks/useFlowStore";

import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
} from "@mui/material";

export default function SettingsPanel() {
  const { selectedNode, updateNodeData } = useFlowStore();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");


  useEffect(() => {
    if (selectedNode) {
      setTitle(selectedNode.data.title || "");
      setText(selectedNode.data.text || "");
    }
  }, [selectedNode]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };


  if (!selectedNode) {
    return null;
  }

  return (
    <Box
      sx={{
        width: 320,
        p: 2,
        borderLeft: "1px solid #e0e0e0",
        backgroundColor: "background.paper",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Typography variant="h6" align="center">
        Settings
      </Typography>

      <TextField
        label="Title"
        value={title}
        onChange={handleTitleChange}
        variant="outlined"
        fullWidth
        placeholder="Enter message title..."
      />

      <TextField
        label="Text"
        value={text}
        onChange={handleTextChange}
        variant="outlined"
        multiline
        rows={6}
        fullWidth
        placeholder="Enter message text..."
      />

   
    </Box>
  );
}