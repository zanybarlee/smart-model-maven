
export type NodeType = 'dataIngestion' | 'dataCleaning' | 'featureEngineering';

export interface NodeData {
  [key: string]: unknown;
  label: string;
  type: NodeType;
  config: {
    source?: string;
    connectionString?: string;
    cleaningRules?: string[];
    features?: string[];
    transformations?: string[];
    inputs?: {
      dataSource?: string;
      connectionString?: string;
    };
    outputs?: {
      output?: string;
    };
  };
  status: 'configured' | 'pending' | 'running' | 'completed' | 'error';
}

export const createNodeConfig = (type: NodeType, label: string): NodeData => ({
  label,
  type,
  config: {
    inputs: {
      dataSource: '',
      connectionString: ''
    },
    outputs: {
      output: ''
    }
  },
  status: 'pending'
});

export const initialNodes = [
  {
    id: 'dataingestion-1',
    type: 'input',
    data: createNodeConfig('dataIngestion', 'Data Collection'),
    position: { x: 100, y: 100 },
  }
];

export const initialEdges = [];
