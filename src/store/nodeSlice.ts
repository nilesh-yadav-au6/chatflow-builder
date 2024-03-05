import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Edge,
  Node,
} from "reactflow";
import { NodeData, Nodes, NodeTypes } from "../components/Nodes/types";
import { v4 as uuidv4 } from "uuid";
import { NodeFactory } from "../utils/nodeFactory";
import { getLocalStorageItem } from "../utils/helpers";

export type NodeState = {
  nodes: Node<NodeData, NodeTypes>[];
  edges: Edge[];
  selectedNodes: Array<Nodes>;
};

const storedNodes = getLocalStorageItem("nodes");
const storedEdges = getLocalStorageItem("edges");

const initialNodes = storedNodes ? JSON.parse(storedNodes) : [];
const initialEdges = storedEdges ? JSON.parse(storedEdges) : [];

const initialState: NodeState = {
  nodes: initialNodes,
  edges: initialEdges,
  selectedNodes: [],
};

export const nodeSlice = createSlice({
  name: "nodes",
  initialState,
  reducers: {
    addNode: (state, action: PayloadAction<Node<NodeData, NodeTypes>>) => {
      state.nodes.push(action.payload);
    },
    onNodesChange: (state, action) => {
      state.nodes = applyNodeChanges(action.payload, state.nodes) as Node<
        NodeData,
        NodeTypes
      >[];
    },
    onEdgesChange: (state, action) => {
      state.edges = applyEdgeChanges(action.payload, state.edges);
    },
    onConnect: (state, action) => {
      state.edges = addEdge(action.payload, state.edges);
    },
    updateNodeValue: (state, action) => {
      const nodes = [...state.nodes];
      const objectIndex = nodes.findIndex(
        (obj) => obj.id === action.payload.id
      );

      if (objectIndex !== -1) {
        state.nodes[objectIndex] = {
          ...nodes[objectIndex],
          data: action.payload.data,
        };
      }
    },
    onDrop: (state, action) => {
      const { type } = action.payload.item;
      const newNode = new NodeFactory().createNode(type, uuidv4(), {
        x: 0,
        y: 0,
      });
      state.nodes.push(newNode);
    },
    setSelectedNodes: (state, action) => {
      state.selectedNodes = action.payload.nodes;
    },
    unselectNodes: (state, action) => {
      if (state.selectedNodes.length === 0) return;
      let id = action.payload.id;
      if (!id) {
        const node = state.selectedNodes[0];
        id = node.id;
      }
      const nodes = state.nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            selected: false,
          };
        }

        return node;
      });

      state.nodes = nodes as Array<Node<NodeData, NodeTypes>>;
      state.selectedNodes = state.selectedNodes.filter(
        (node) => node.id !== id
      );
    },
  },
});

export const {
  addNode,
  onEdgesChange,
  onNodesChange,
  onConnect,
  updateNodeValue,
  onDrop,
  setSelectedNodes,
  unselectNodes,
} = nodeSlice.actions;

export const nodeList = (state: RootState) => state;
export default nodeSlice.reducer;
