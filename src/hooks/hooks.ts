import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const useGetNodesAndEdges = () => {
  const nodes = useAppSelector((state) => state.node.nodes);
  const edges = useAppSelector((state) => state.node.edges);
  const selectedNode = useAppSelector((state) => state.node.selectedNodes);

  return { nodes, edges, selectedNode };
};
