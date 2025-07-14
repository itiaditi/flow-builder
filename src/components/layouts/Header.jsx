"use client";

import React, { useEffect, useRef } from "react";
import { Save, Upload, Bot } from "lucide-react";
import { Box, Button, Typography, Stack } from "@mui/material";
import { toast } from "react-toastify";

import { useFlowStore } from "../../hooks/useFlowStore";

export default function AppHeader() {
    
  const { nodes, edges, setFlow } = useFlowStore();
  const fileInputRef = useRef(null);

  const validateFlow = () => {
    if (nodes.length === 0) {
      return { isValid: false, message: "Please add at least one node before saving." };
    }

    if (nodes.length === 1) {
      return { isValid: false, message: "You have only one node." };
    }

    if (nodes.length === 2) {
      if (edges.length === 0) {
        return { 
          isValid: false, 
          message: "Cannot save Flow" 
        };
      }
      return { isValid: true, message: "Your flow has been saved successfully." };
    }

    if (nodes.length > 2) {
      const connectedTargetIds = new Set(edges.map(edge => edge.target));
      const connectedSourceIds = new Set(edges.map(edge => edge.source));
      
      const nodesWithoutIncomingConnections = nodes.filter(node => {
        return !connectedTargetIds.has(node.id);
      });

      const nodesWithoutOutgoingConnections = nodes.filter(node => {
        return !connectedSourceIds.has(node.id);
      });

     if (nodesWithoutIncomingConnections.length > 1) {
        return { 
          isValid: false, 
          message: "Error: Multiple nodes have empty target handles. Please connect all nodes properly." 
        };
      }

      if (nodesWithoutOutgoingConnections.length > 1) {
        return { 
          isValid: false, 
          message: "Error: Multiple nodes have no outgoing connections. Please connect all nodes properly." 
        };
      }
const isolatedNodes = nodes.filter(node => {
        return !connectedTargetIds.has(node.id) && !connectedSourceIds.has(node.id);
      });

      if (isolatedNodes.length > 0) {
        return { 
          isValid: false, 
          message: "Error: Some nodes are not connected to the flow. Please connect all nodes." 
        };
      }
    }

    return { isValid: true, message: "Your flow has been saved successfully." };
  };

  const handleSave = () => {
    console.log('Nodes:', nodes.length);
    console.log('Edges:', edges.length);
    
    const validation = validateFlow();
    
    if (!validation.isValid) {
      toast.error(validation.message);
      return;
    }

    toast.success(validation.message);
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const loadedFlow = JSON.parse(e.target?.result);
          if (loadedFlow.nodes && loadedFlow.edges) {
            setFlow(loadedFlow);
            toast.success("Your flow has been loaded successfully.");
          } else {
            throw new Error("Invalid file format");
          }
        } catch (error) {
          toast.error("The selected file is not a valid flow configuration.");
        }
      };
      reader.readAsText(file);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleLoadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 1.5,
        borderBottom: "1px solid #e0e0e0",
        bgcolor: "background.paper",
      }}
    >
      {/* Left section: Logo + Title */}
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography variant="h6" color="text.primary" fontWeight="bold">
          ChatBot Flow Builder
        </Typography>
      </Stack>

      {/* Right section: Buttons */}
      <Stack direction="row" spacing={1}>
        <Button
          onClick={handleSave}
          variant="outlined"
          size="small"
        >
          Save Changes
        </Button>
      
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".json"
          style={{ display: "none" }}
        />
      </Stack>
    </Box>
  );
}