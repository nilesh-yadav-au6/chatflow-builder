import { useMemo } from "react";
import ReactFlow, {
  FitViewOptions,
  DefaultEdgeOptions,
  NodeTypes as FlowNodeTypes,
} from "reactflow";
import { useDrop } from "react-dnd";
import "reactflow/dist/style.css";
import { useAppDispatch, useGetNodesAndEdges } from "../../hooks/hooks";
import {
  onNodesChange,
  onConnect,
  onEdgesChange,
  onDrop,
} from "../../store/nodeSlice";
import { NodeTypes } from "../Nodes/types";
import MessageNode from "../Nodes/MessageNode";

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
};

const Flow = () => {
  const { nodes, edges } = useGetNodesAndEdges();

  const dispatch = useAppDispatch();

  // drop ref for dropping nodes from node panel
  const [, dropRef] = useDrop({
    accept: "node",
    drop: (item: { id: string; type: NodeTypes }, monitor) =>
      dispatch(onDrop({ item, monitor })),
  });

  const nodeTypes: FlowNodeTypes = useMemo(
    () => ({ MessageNode: MessageNode }),
    []
  );

  return (
    <ReactFlow
      ref={dropRef}
      nodes={nodes}
      edges={edges}
      onNodesChange={(e) => dispatch(onNodesChange(e))}
      onEdgesChange={(e) => dispatch(onEdgesChange(e))}
      onConnect={(e) => dispatch(onConnect(e))}
      fitView
      fitViewOptions={fitViewOptions}
      nodeTypes={nodeTypes}
      defaultEdgeOptions={defaultEdgeOptions}
    />
  );
};

export default Flow;
