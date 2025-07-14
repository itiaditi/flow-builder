import React from "react";
import { MessageSquareText } from "lucide-react";
import {
  Box,
  Typography,
  Divider,
  IconButton,
  Button,
  Paper,
} from "@mui/material";
import { useFlowStore } from "../../hooks/useFlowStore";

const nodeTypes = [
  {
    type: "textNode",
    label: "Message",
    icon: MessageSquareText,
    data: {
      title: "Send Message",
      text: "New message",
    },
  },
];

const DraggableNode = ({ nodeType }) => {
  const onDragStart = (event, type) => {
    event.dataTransfer.setData("application/reactflow", type);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        border: "2px dashed",
        borderColor: "primary.light",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        bgcolor: "background.paper",
        cursor: "grab",
        '&:hover': {
          bgcolor: "action.hover",
        },
        transition: "all 0.2s ease",
      }}
      draggable
      onDragStart={(event) => onDragStart(event, nodeType.type)}
    >
      <nodeType.icon style={{ width: 32, height: 32, color: "#1976d2" }} />
      <Typography variant="subtitle2" fontWeight={600}>
        {nodeType.label}
      </Typography>
    </Paper>
  );
};

export default function NodesPanel() {
  const { addNode, getId } = useFlowStore();

  const handleAddNode = (nodeType) => {
    const newNode = {
      id: getId(),
      type: nodeType.type,
      position: { x: 250, y: 150 },
      data: nodeType.data,
    };
    addNode(newNode);
  };

  return (
    <Box
      sx={{
        width: 260,
        p: 2,
        borderRight: "1px solid #e0e0e0",
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h6" align="center">
        Nodes
      </Typography>
      <Divider />
      <Box display="flex" flexDirection="column" gap={2}>
        {nodeTypes.map((node) => (
          <Box key={node.type} display="flex" flexDirection="column" gap={1}>
            <DraggableNode nodeType={node} />
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleAddNode(node)}
            >
              Add {node.label}
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
