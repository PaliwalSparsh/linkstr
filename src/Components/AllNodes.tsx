import linkIcon from "../Images/link.svg";
import cancelIcon from "../Images/cancel.svg";
import handleIcon from "../Images/handle.svg";
import { Reorder, motion, useDragControls } from "framer-motion";
import { Nodes, Link, ViewMode } from "../types";
import { useEditable } from "use-editable";
import { useRef } from "react";

const NodeComponent = ({
  mode,
  index,
  nodes,
  onNodesChange,
}: {
  mode: ViewMode;
  index: number;
  nodes: Nodes;
  onNodesChange: (updatedNodes: Nodes) => void;
}) => {
  const currentNode = nodes[index];

  const controls = useDragControls();

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const urlRef = useRef(null);

  useEditable(titleRef, (value) => {
    const newNodes = [...nodes];
    newNodes[index] = { ...currentNode, title: value };
    onNodesChange(newNodes);
  });

  useEditable(descriptionRef, (value) => {
    const newNodes = [...nodes];
    newNodes[index] = { ...currentNode, description: value };
    onNodesChange(newNodes);
  });

  useEditable(urlRef, (value) => {
    const newNodes = [...nodes];
    newNodes[index] = { ...currentNode, url: value };
    onNodesChange(newNodes);
  });

  function addHttpsToUrl(url: string) {
    if (/(http(s?)):\/\//i.test(url)) {
      return url;
    }
    return "https://" + url;
  }

  switch (mode) {
    case "view":
      if (currentNode.kind === "link") {
        const { url, title, description } = currentNode as Link;
        return (
          <a href={addHttpsToUrl(url)} className="no-underline">
            <div className="relative flex w-full flex-col border-b bg-white pb-4 sm:pb-6">
              <div className="flex flex-row items-center">
                <img src={linkIcon} alt="" />
                <div className="rounded-lg px-2 pt-1.5 font-serif text-xl">
                  {title}
                </div>
              </div>
              <span className="rounded-lg text-xs text-black/40 sm:text-sm">
                {url}
              </span>
              <div className="mt-2 sm:mt-3">
                <span className="rounded-lg py-8 text-sm text-black/60 sm:text-base">
                  {description}
                </span>
              </div>
            </div>
          </a>
        );
      } else {
        return null;
      }
    case "edit":
      if (currentNode.kind === "link") {
        const { url, title, description } = currentNode as Link;

        const handleDelete = () => {
          const newNodes = [...nodes];
          newNodes.splice(index, 1);
          onNodesChange(newNodes);
        };

        return (
          <Reorder.Item
            value={currentNode}
            dragListener={false}
            dragControls={controls}
            className="relative flex w-full flex-col border-b bg-white pb-4 sm:pb-6"
          >
            <div
              className="action-button absolute -right-2.5"
              onClick={handleDelete}
            >
              <img src={cancelIcon} alt="" />
            </div>

            <div className="flex flex-row items-center">
              <img
                src={handleIcon}
                style={{ touchAction: "none" }}
                alt="handle used for reordering list elements"
                className="action-button__no-bg cursor-grab pr-2 active:cursor-grabbing"
                onPointerDown={(e) => {
                  controls.start(e);
                  e.preventDefault();
                }}
              />

              <img src={linkIcon} alt="" />
              <motion.div
                whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
                whileTap={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
                ref={titleRef}
                className="rounded-lg px-2 pt-1.5 font-serif text-xl outline-none"
              >
                {title}
              </motion.div>
            </div>
            <div>
              <motion.span
                whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
                whileTap={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
                ref={urlRef}
                className="rounded-lg text-xs text-black/40 outline-none sm:text-sm"
              >
                {url}
              </motion.span>
            </div>
            <div className="mt-2 sm:mt-3">
              <motion.span
                whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
                whileTap={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
                ref={descriptionRef}
                className="rounded-lg text-sm text-black/60 outline-none sm:text-base"
              >
                {description}
              </motion.span>
            </div>
          </Reorder.Item>
        );
      } else {
        return null;
      }
  }
};

interface AllNodesProps {
  mode: ViewMode;
  nodes: Nodes;
  onNodesChange?: (updatedNodes: Nodes) => void;
}

const AllNodes = ({ mode, nodes, onNodesChange = () => {} }: AllNodesProps) => {
  return (
    <Reorder.Group
      axis="y"
      onReorder={onNodesChange}
      values={nodes}
      className="mt-14 flex flex-col gap-4 sm:gap-6"
    >
      {nodes.map((node, index) => (
        <NodeComponent
          mode={mode}
          index={index}
          nodes={nodes}
          onNodesChange={onNodesChange}
          key={node.id}
        />
      ))}
    </Reorder.Group>
  );
};

export default AllNodes;
