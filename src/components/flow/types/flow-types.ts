
export type NodeType = 'dataIngestion' | 'dataCleaning' | 'featureEngineering' | 'dataQuality' | 'dataLabeling';

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
    qualityRules?: {
      nullThreshold?: number;
      uniquenessCheck?: boolean;
      formatValidation?: string[];
    };
    labelingConfig?: {
      taskType?: string;
      annotators?: number;
      categories?: string[];
    };
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
