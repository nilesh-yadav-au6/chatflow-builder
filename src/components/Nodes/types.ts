import { Node } from "reactflow";

export enum NodeTypes {
  MessageNode = "MessageNode",
}

export interface MessageNodeData {
  text: string;
}

export interface MessageNode
  extends Node<MessageNodeData, NodeTypes.MessageNode> {
  type: NodeTypes.MessageNode;
}

export interface MessageNode
  extends Node<MessageNodeData, NodeTypes.MessageNode> {
  type: NodeTypes.MessageNode;
}

export type Nodes = MessageNode;

export type NodeData = MessageNodeData;
