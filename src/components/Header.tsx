import { useCallback } from "react";
import Button from "./Button";
import { toast } from "react-toastify";
import { setLocalStorageItem } from "../utils/helpers";
import { useGetNodesAndEdges } from "../hooks/hooks";

const Header = () => {
  const { nodes, edges } = useGetNodesAndEdges();

  const onSave = useCallback(() => {
    // check edges if nodes with no target
    const nodesWithoutTarget = nodes.filter((node) => {
      const nodeEdges = edges.filter((edge) => edge.source === node.id);
      return nodeEdges.length === 0;
    });

    // if there are more than one node with no target throw error
    if (nodesWithoutTarget.length > 1) {
      toast.error("Can not save flow");
      return;
    }
    setLocalStorageItem("nodes", nodes);
    setLocalStorageItem("edges", edges);

    toast.success("Flow is saved");
  }, [nodes, edges]);

  return (
    <div className="flex justify-between items-center w-full h-14 bg-gray-200 px-10">
      <p className="text-indigo-950">Chat Flow Builder</p>
      <Button title="Save" onClick={onSave} style="px-4" />
    </div>
  );
};

export default Header;
