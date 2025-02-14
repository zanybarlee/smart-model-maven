
import React from 'react';
import { ReactFlow, Background, Controls, Node, Edge, Connection } from 'reactflow';
import EntityNode from './EntityNode';

const nodeTypes = {
  entity: EntityNode,
};

interface DomainFlowDiagramProps {
  nodes: Node[];
  edges: Edge[];
  onConnect: (params: Connection) => void;
  onNodeDragStop: (event: React.MouseEvent, node: Node) => void;
  style?: React.CSSProperties;
}

const DomainFlowDiagram: React.FC<DomainFlowDiagramProps> = ({
  nodes,
  edges,
  onConnect,
  onNodeDragStop,
  style
}) => {
  return (
    <div style={style}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onNodeDragStop={onNodeDragStop}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default DomainFlowDiagram;
