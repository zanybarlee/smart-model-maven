
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Database, Activity, Shield } from "lucide-react";

const metrics = [
  { name: 'Query Latency', value: '156ms', trend: '-12ms', icon: Clock },
  { name: 'Documents Indexed', value: '1,234', trend: '+45', icon: Database },
  { name: 'Query Success Rate', value: '99.9%', trend: '+0.1%', icon: Activity },
  { name: 'Avg Response Time', value: '189ms', trend: '-8ms', icon: Shield },
];

export const MetricsOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground">{metric.trend} from last week</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
