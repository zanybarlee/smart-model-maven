
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

const SystemAlerts = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          <CardTitle>System Alerts</CardTitle>
        </div>
        <CardDescription>
          Recent system alerts and notifications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-yellow-50 text-yellow-700 rounded-lg">
            <AlertCircle className="h-5 w-5" />
            <div>
              <p className="font-medium">High Memory Usage Warning</p>
              <p className="text-sm">Memory usage exceeded 80% threshold</p>
              <p className="text-xs text-yellow-600">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-green-50 text-green-700 rounded-lg">
            <AlertCircle className="h-5 w-5" />
            <div>
              <p className="font-medium">System Update Completed</p>
              <p className="text-sm">Successfully updated to version 2.1.0</p>
              <p className="text-xs text-green-600">5 hours ago</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemAlerts;
