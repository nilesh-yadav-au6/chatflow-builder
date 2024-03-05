import { ChangeEvent, FC, useCallback } from "react";
import { MessageNode } from "../../Nodes/types";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { updateNodeValue } from "../../../store/nodeSlice";
import { getNode } from "../../../utils/helpers";

const MessageNodeEditore: FC<MessageNode> = ({ id }) => {
  const nodes = useAppSelector((state) => state.node.nodes);

  const dispatch = useAppDispatch();

  const node = getNode(nodes, id);

  // Update the text of specific node
  const onChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      dispatch(
        updateNodeValue({
          id,
          data: {
            text: e.target.value,
          },
        })
      );
    },
    [id, dispatch]
  );

  return (
    <div className="flex flex-col border-b border-gray-200 px-2">
      <label htmlFor="text" className="py-2">
        Text
      </label>
      <textarea
        className="border border-black p-2 rounded border-1 border-gray-200 mb-4"
        name="text"
        value={node.text}
        onChange={onChange}
      />
    </div>
  );
};

export default MessageNodeEditore;
