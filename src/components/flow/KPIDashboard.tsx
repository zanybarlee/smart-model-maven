
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, GitPullRequest, BarChart2, Workflow } from "lucide-react";

const kpiData = [
  { title: 'Lead Time', value: '3.5 days', trend: '+12%', icon: Activity },
  { title: 'Cycle Time', value: '1.2 days', trend: '-8%', icon: GitPullRequest },
  { title: 'Throughput', value: '45/week', trend: '+15%', icon: BarChart2 },
  { title: 'Success Rate', value: '98.5%', trend: '+2%', icon: Workflow },
];

export const KPIDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpiData.map((kpi, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
            <kpi.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpi.value}</div>
            <p className={`text-xs ${kpi.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
              {kpi.trend} from last period
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
