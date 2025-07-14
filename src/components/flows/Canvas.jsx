import React, { useCallback, useMemo } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";

import { useFlowStore } from "../../hooks/useFlowStore";
import { Box, Paper } from "@mui/material";
import TextNode from "../layouts/TextNode";

export default function FlowCanvas() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    setSelectedNode,
    getId,
  } = useFlowStore();

  const nodeTypes = useMemo(() => ({ textNode: TextNode }), []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = event.currentTarget.getBoundingClientRect();
      const position = {
        x: event.clientX - reactFlowBounds.left - 250,
        y: event.clientY - reactFlowBounds.top - 40,
      };

      const newNode = {
        id: getId(),
        type: "textNode",
        position,
        data: { text: "New message" },
      };

      addNode(newNode);
    },
    [addNode, getId]
  );

  const onNodeClick = useCallback(
    (_, node) => {
      setSelectedNode(node);
    },
    [setSelectedNode]
  );

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, [setSelectedNode]);

  const defaultEdgeOptions = {
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: '#374151', strokeWidth: 2 },
  };

  return (
    <Box
      component={Paper}
      elevation={2}
      sx={{
        height: "100%",
        width: "100%",
        flex: 1,
        position: "relative",
        overflow: "hidden",
      }}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        defaultEdgeOptions={defaultEdgeOptions}
      >
        <Controls />
        <MiniMap />
        <Background gap={12} size={1} />
      </ReactFlow>
    </Box>
  );
}