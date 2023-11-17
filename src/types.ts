export type ViewMode = "edit" | "view";

export interface Metadata {
  title: string;
  description: string;
  author: string;
  date: string;
}

export interface NodeBase {
  id: string;
  kind: "metadata" | "link" | "headline" | "text" | "image";
}

export interface Link extends NodeBase {
  url: string;
  title: string;
  description: string;
}

export interface Headline extends NodeBase {
  text: string;
}

export type Node = Link | Headline;

export type Nodes = Node[];

export type Collection = {
  metadata: Metadata;
  nodes: Nodes;
};
