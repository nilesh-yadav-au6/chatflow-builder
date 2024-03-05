import { FC } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { MessageNodeData } from "./types";
import { useGetNodesAndEdges } from "../../hooks/hooks";
import {
  allowSourceConnection as getAllowSourceConnection,
  getNode,
} from "../../utils/helpers";

const MessageNode: FC<NodeProps<MessageNodeData>> = ({ id }) => {
  const { nodes, edges, selectedNode } = useGetNodesAndEdges();

  const currentNode = getNode(nodes, id);

  const isSourceConnectionAllowed = getAllowSourceConnection(edges, id);

  return (
    <div
      className={`w-44 rounded-lg max-w-40 bg-gray-100 border ${
        selectedNode[0]?.id === id ? "border-red-200" : "border-blue-200"
      } `}
    >
      <Handle type="target" position={Position.Left} id="target" />
      <h6 className="text-indigo-50 py-1 text-xs font-light bg-green-400 rounded text-black pl-2">
        Send Message
      </h6>
      <p className="px-2">{currentNode.text}</p>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isSourceConnectionAllowed}
        isConnectableStart={isSourceConnectionAllowed}
        id="source"
      />
    </div>
  );
};

export default MessageNode;
