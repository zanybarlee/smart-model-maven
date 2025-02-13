
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Database } from "lucide-react";

export const VectorStoreMetrics = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          <CardTitle>Vector Database</CardTitle>
        </div>
        <CardDescription>Vector store status and metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            { metric: 'Vector DB Size', value: '2.3GB', progress: 45 },
            { metric: 'Total Vectors', value: '156K', progress: 78 },
            { metric: 'Index Health', value: '98%', progress: 98 }
          ].map((item, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">{item.metric}</span>
                <span className="text-sm text-muted-foreground">{item.value}</span>
              </div>
              <Progress value={item.progress} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
