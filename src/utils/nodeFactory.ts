import { XYPosition } from "reactflow";
import { NodeData, NodeTypes } from "../components/Nodes/types";

// Base Node class (can be an interface as well)
class FlowNode {
  id: string;
  position: XYPosition;
  type: NodeTypes | undefined;
  width: number | null | undefined;
  height: number | null | undefined;
  selected: boolean | undefined;
  positionAbsolute: XYPosition | undefined;
  dragging: boolean | undefined;

  constructor(id: string, position: XYPosition, type: NodeTypes | undefined) {
    this.id = id;
    this.position = position;
    this.type = type;
    this.width = null;
    this.height = null;
    this.selected = false;
    this.positionAbsolute = undefined;
    this.dragging = undefined;
  }
}

class MessageNode extends FlowNode {
  data: NodeData;
  constructor(id: string, position: XYPosition, type: NodeTypes) {
    super(id, position, type);
    this.data = {
      text: "Initial text",
    };
  }
}

// NodeFactory.js
export class NodeFactory {
  createNode(type: NodeTypes, id: string, position: XYPosition) {
    // Depending on the 'type' parameter, create different types of nodes
    switch (type) {
      case NodeTypes.MessageNode:
        return new MessageNode(id, position, type);
      // Add more cases for other types as needed
      default:
        throw new Error("Invalid node type");
    }
  }
}
