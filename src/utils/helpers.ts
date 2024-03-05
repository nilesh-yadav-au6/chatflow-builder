import { Node, Edge } from "reactflow";
import { NodeData, NodeTypes } from "../components/Nodes/types";

export const getNode = (
  nodes: Node<NodeData, NodeTypes>[],
  id: string
): NodeData => {
  return nodes.filter((node) => node.id === id)[0].data;
};

// To check if node has a source to target connection present
export const allowSourceConnection = (edges: Edge[], id: string) => {
  const isAlreadyConnected = edges.some((e) => {
    const { source, target } = e;
    if (source === id && target) {
      return true;
    }
    return false;
  });

  return !isAlreadyConnected;
};

export const getLocalStorageItem = (key: string) =>
  window.localStorage.getItem(key);

export const setLocalStorageItem = (
  key: string,
  data: Node<NodeData, NodeTypes>[] | Edge[]
) => window.localStorage.setItem(key, JSON.stringify(data));
