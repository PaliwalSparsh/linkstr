import { useRef } from "react";
import { useEditable } from "use-editable";
import { motion } from "framer-motion";
import { Metadata } from "./Builder";

interface TitleAndDescriptionProps {
  metadata: Metadata;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
  onAuthorChange: (author: string) => void;
}

const TitleAndDescription = ({
  metadata,
  onTitleChange,
  onDescriptionChange,
  onAuthorChange,
}: TitleAndDescriptionProps) => {
  const { title, description, author } = metadata;

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const authorRef = useRef(null);

  useEditable(titleRef, onTitleChange);
  useEditable(descriptionRef, onDescriptionChange);
  useEditable(authorRef, onAuthorChange);

  const formattedDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mx-auto mt-14 text-center">
      <motion.div
        whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        whileTap={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
        className="h1 rounded-2xl pt-4 outline-none"
        ref={titleRef}
      >
        {title}
      </motion.div>
      <div className="flex flex-row items-center justify-center text-xs text-black/40">
        <span>curated by – </span>
        <motion.span
          whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
          whileTap={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
          className="rounded-lg p-2 font-bold outline-none"
          ref={authorRef}
        >
          {author}
        </motion.span>
        <span className="font-bold"> • {formattedDate} </span>
      </div>
      <motion.div
        whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        whileTap={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
        className="mt-4 rounded-lg p-2 text-lg text-black/60 outline-none"
        ref={descriptionRef}
      >
        {description}
      </motion.div>
    </div>
  );
};

export default TitleAndDescription;
