import { FC } from "react";
import { useDrag } from "react-dnd";
import { NodeTypes } from "../../Nodes/types";

export interface NodeTypeProps {
  id: string;
  label: string;
  type: NodeTypes;
  icon: JSX.Element;
}

const NodeTypeRenderer: FC<NodeTypeProps> = ({ id, type, label, icon }) => {
  const [, drag] = useDrag(() => ({
    type: "node",
    item: { id, type, label },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      id={id}
      ref={drag}
      className="w-auto p-2 bg-white rounded-md m-2 text-center border border-indigo-950 rounded flex flex-col items-center justify-center"
    >
      {icon}
      <p className="text-indigo-950 pt-4">{label}</p>
    </div>
  );
};

export default NodeTypeRenderer;
