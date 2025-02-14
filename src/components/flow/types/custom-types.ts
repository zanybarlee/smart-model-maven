
import { Node } from '@xyflow/react';
import { NodeData, NodeType } from './flow-types';

// Extend the Node type to make 'type' required
export type CustomNode = Omit<Node<NodeData>, 'type'> & {
  type: string;
  data: NodeData;
};
