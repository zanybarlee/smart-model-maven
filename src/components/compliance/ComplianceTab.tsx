
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ComplianceReportList } from "@/components/compliance/ComplianceReportList";
import { DataMaskingRules } from "@/components/compliance/DataMaskingRules";
import { AccessAuditLog } from "@/components/compliance/AccessAuditLog";

export const ComplianceTab = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Compliance Reports</CardTitle>
          <CardDescription>Generated compliance and audit reports</CardDescription>
        </CardHeader>
        <CardContent>
          <ComplianceReportList />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Masking Rules</CardTitle>
          <CardDescription>Active data protection measures</CardDescription>
        </CardHeader>
        <CardContent>
          <DataMaskingRules />
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Access Audit Log</CardTitle>
          <CardDescription>Track data access and modifications</CardDescription>
        </CardHeader>
        <CardContent>
          <AccessAuditLog />
        </CardContent>
      </Card>
    </div>
  );
};
