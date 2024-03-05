import TextNodeDataEditor from "./MessageNodeEditore";
import { Nodes, NodeTypes } from "../../Nodes/types";
import { FC } from "react";

// Component to render the specific editor for the selected node
const NodeDataEditor: FC<{ node: Nodes }> = ({ node }) => {
  switch (node.type) {
    case NodeTypes.MessageNode:
      return <TextNodeDataEditor {...node} />;
    default:
      return null;
  }
};

export default NodeDataEditor;
