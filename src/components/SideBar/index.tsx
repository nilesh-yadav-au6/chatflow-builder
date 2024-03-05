import { FC } from "react";
import { useOnSelectionChange } from "reactflow";
import NodeTypeRenderer, { NodeTypeProps } from "./NodeRenderer";
import { setSelectedNodes, unselectNodes } from "../../store/nodeSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import NodeDataEditor from "./Editor";
import { ArrowLeft } from "lucide-react";

interface SidebarProps {
  nodes: NodeTypeProps[];
}

const Sidebar: FC<SidebarProps> = ({ nodes }: SidebarProps) => {
  const selectedNodes = useAppSelector((state) => state.node.selectedNodes);

  const dispatch = useAppDispatch();

  useOnSelectionChange({
    onChange: (elements) => {
      if (elements.nodes.length > 0) {
        dispatch(setSelectedNodes({ nodes: elements.nodes }));
      }
    },
  });

  if (selectedNodes?.length === 1) {
    return (
      <div className="w-72 border border-gray-200">
        <div
          className="flex justify-between p-2 border-b border-gray-200"
          onClick={() => dispatch(unselectNodes(selectedNodes[0].id))}
        >
          <ArrowLeft />
          <p>Message</p>
        </div>
        <NodeDataEditor node={selectedNodes[0]} />
      </div>
    );
  }
  return (
    <div className="w-72 border border-gray-200">
      <div>
        {nodes?.map((node) => (
          <NodeTypeRenderer key={node.id} {...node} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
