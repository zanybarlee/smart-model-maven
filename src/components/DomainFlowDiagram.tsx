
import {
  ReactFlow,
  Background,
  Controls,
  Node,
  Edge,
  Connection,
  Panel,
  MiniMap,
  NodeChange,
  applyNodeChanges,
} from 'reactflow';
import 'reactflow/dist/style.css';
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
  const onNodesChange = (changes: NodeChange[]) => {
    const nextNodes = applyNodeChanges(changes, nodes);
    // Update node positions in the parent component
    const draggedNode = changes.find(change => change.type === 'position' && change.dragging === false);
    if (draggedNode && draggedNode.type === 'position') {
      const node = nextNodes.find(n => n.id === draggedNode.id);
      if (node) {
        onNodeDragStop({} as React.MouseEvent, node);
      }
    }
  };

  return (
    <div style={style} className="bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        fitView
        minZoom={0.1}
        maxZoom={4}
        proOptions={{ hideAttribution: true }}
        deleteKeyCode={null}
      >
        <Background />
        <Controls />
        <MiniMap />
        <Panel position="top-right">
          <div className="bg-white p-2 rounded shadow-sm text-xs text-slate-500">
            Drag to pan, scroll to zoom
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default DomainFlowDiagram;
