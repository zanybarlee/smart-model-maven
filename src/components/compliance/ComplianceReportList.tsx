
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ComplianceReport {
  type: string;
  status: string;
  generatedAt: string;
  standards: string[];
  period: string;
}

export const ComplianceReportList = () => {
  const reports: ComplianceReport[] = [
    {
      type: 'Data Quality',
      status: 'completed',
      generatedAt: '2024-03-15',
      standards: ['GDPR', 'HIPAA'],
      period: 'Q1 2024'
    },
    {
      type: 'Access Audit',
      status: 'in_progress',
      generatedAt: '2024-03-14',
      standards: ['SOC 2', 'ISO 27001'],
      period: 'Q1 2024'
    }
  ];

  return (
    <div className="space-y-4">
      {reports.map((report, index) => (
        <Card key={index} className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-blue-500" />
              <div>
                <h3 className="font-medium">{report.type} Report</h3>
                <p className="text-sm text-gray-500">Period: {report.period}</p>
              </div>
            </div>
            <Badge 
              variant={report.status === 'completed' ? 'success' : 'secondary'}
              className="capitalize"
            >
              {report.status}
            </Badge>
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-1" />
              Generated: {report.generatedAt}
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-gray-500" />
              <div className="flex gap-1">
                {report.standards.map((standard, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {standard}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
