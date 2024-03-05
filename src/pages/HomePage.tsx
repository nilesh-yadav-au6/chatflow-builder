import Sidebar from "../components/SideBar";
import Header from "../components/Header";
import Flow from "../components/Flow";
import { ReactFlowProvider } from "reactflow";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { NodeTypes } from "../components/Nodes/types";
import { MessageSquareMore } from "lucide-react";

const HomePage = () => {
  const nodes = [
    {
      id: NodeTypes.MessageNode,
      label: "Message",
      type: NodeTypes.MessageNode,
      icon: <MessageSquareMore />,
    },
  ];

  return (
    <div className="h-screen w-full">
      <Header />
      <DndProvider backend={HTML5Backend}>
        <div className="flex w-full h-screen flex:1">
          <ReactFlowProvider>
            <Flow />
            <Sidebar nodes={nodes} />
          </ReactFlowProvider>
        </div>
      </DndProvider>
    </div>
  );
};

export default HomePage;
