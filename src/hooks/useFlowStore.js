"use client";

import { create } from "zustand";
import {
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  MarkerType,
} from "reactflow";

let id = 1;

export const useFlowStore = create((set, get) => ({
  nodes: [
    {
      id: "1",
      type: "textNode",
      position: { x: 100, y: 100 },
      data: { title: "Welcome Message", text: "Welcome!" },
    },
  ],
  edges: [],
  selectedNode: null,

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection) => {
    const newEdge = {
      ...connection,
      markerEnd: { type: MarkerType.ArrowClosed },
    };
    set({
      edges: addEdge(newEdge, get().edges),
    });
  },

  addNode: (node) => {
    set({ nodes: [...get().nodes, node] });
  },

  deleteNode: (nodeId) => {
    set({
      nodes: get().nodes.filter((node) => node.id !== nodeId),
      edges: get().edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      ),
      selectedNode:
        get().selectedNode?.id === nodeId ? null : get().selectedNode,
    });
  },

  updateNodeData: (nodeId, data) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          return { ...node, data: { ...node.data, ...data } };
        }
        return node;
      }),
    });
  },

  setSelectedNode: (node) => {
    set({ selectedNode: node });
    set({
      nodes: get().nodes.map((n) => ({
        ...n,
        selected: node ? n.id === node.id : false,
      })),
    });
  },

  setFlow: (flow) => {
    const maxId = Math.max(
      0,
      ...flow.nodes.map((n) =>
        parseInt(n.id.split("_").pop() || "0", 10)
      )
    );
    id = maxId + 1;

    const flowWithMarkers = {
      ...flow,
      edges: flow.edges.map((e) => ({
        ...e,
        markerEnd: { type: MarkerType.ArrowClosed },
      })),
    };

    set({
      nodes: flowWithMarkers.nodes,
      edges: flowWithMarkers.edges,
      selectedNode: null,
    });
  },

  getId: () => `dnd-node_${id++}`,
}));
