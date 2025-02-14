
import { useCallback } from 'react';
import { Node, Connection, addEdge, Edge } from 'reactflow';

export const useFlowActions = (
  setNodes: (value: React.SetStateAction<Node[]>) => void,
  setEdges: (value: React.SetStateAction<Edge[]>) => void
) => {
  const onConnect = useCallback((params: Connection) => {
    setEdges((eds) => addEdge(params, eds));
  }, [setEdges]);

  const onNodeDragStop = useCallback((event: React.MouseEvent, node: Node) => {
    setNodes(nds => nds.map(n => {
      if (n.id === node.id) {
        return {
          ...n,
          position: node.position
        };
      }
      return n;
    }));
  }, [setNodes]);

  return {
    onConnect,
    onNodeDragStop
  };
};
