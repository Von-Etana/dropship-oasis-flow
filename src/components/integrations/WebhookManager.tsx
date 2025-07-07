
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Webhook, 
  CheckCircle, 
  XCircle, 
  Clock,
  AlertCircle,
  Plus,
  Trash2
} from 'lucide-react';

const WebhookManager = () => {
  const [webhooks, setWebhooks] = useState([
    {
      id: 1,
      source: 'stripe',
      eventType: 'payment.completed',
      url: 'https://yourstore.com/webhooks/stripe',
      status: 'active',
      lastReceived: '2024-01-15T10:30:00Z',
      processed: true,
      errorMessage: null
    },
    {
      id: 2,
      source: 'shopify',
      eventType: 'order.created',
      url: 'https://yourstore.com/webhooks/shopify',
      status: 'active',
      lastReceived: '2024-01-15T09:45:00Z',
      processed: true,
      errorMessage: null
    },
    {
      id: 3,
      source: 'paystack',
      eventType: 'charge.success',
      url: 'https://yourstore.com/webhooks/paystack',
      status: 'failed',
      lastReceived: '2024-01-15T08:20:00Z',
      processed: false,
      errorMessage: 'Connection timeout'
    }
  ]);

  const [webhookLogs, setWebhookLogs] = useState([
    {
      id: 1,
      source: 'stripe',
      eventType: 'payment.completed',
      timestamp: '2024-01-15T10:30:00Z',
      processed: true,
      payload: { amount: 29.99, currency: 'USD' },
      errorMessage: null
    },
    {
      id: 2,
      source: 'shopify',
      eventType: 'order.created',
      timestamp: '2024-01-15T09:45:00Z',
      processed: true,
      payload: { order_id: 'ORD-001', total: 49.99 },
      errorMessage: null
    },
    {
      id: 3,
      source: 'paystack',
      eventType: 'charge.success',
      timestamp: '2024-01-15T08:20:00Z',
      processed: false,
      payload: { reference: 'PSK_123', amount: 15000 },
      errorMessage: 'Invalid signature'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'inactive': return Clock;
      case 'failed': return XCircle;
      default: return AlertCircle;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Webhook Management</h2>
          <p className="text-sm text-gray-600">Monitor and manage webhook endpoints</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Webhook
        </Button>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Active Webhooks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {webhooks.map((webhook) => {
                const StatusIcon = getStatusIcon(webhook.status);
                return (
                  <div key={webhook.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Webhook className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="font-medium">{webhook.source} - {webhook.eventType}</p>
                        <p className="text-sm text-gray-600">{webhook.url}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(webhook.status)}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {webhook.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Webhook Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {webhookLogs.map((log) => (
                <div key={log.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{log.source}</Badge>
                      <span className="text-sm font-medium">{log.eventType}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {log.processed ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                      <span className="text-xs text-gray-500">
                        {new Date(log.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  {log.errorMessage && (
                    <p className="text-sm text-red-600 mb-2">{log.errorMessage}</p>
                  )}
                  <details className="text-sm">
                    <summary className="cursor-pointer text-gray-600">View Payload</summary>
                    <pre className="mt-2 p-2 bg-gray-50 rounded text-xs overflow-x-auto">
                      {JSON.stringify(log.payload, null, 2)}
                    </pre>
                  </details>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Webhook Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="webhook-url">Base Webhook URL</Label>
              <Input 
                id="webhook-url" 
                placeholder="https://yourstore.com/webhooks" 
                value="https://yourstore.com/webhooks"
              />
            </div>
            <div>
              <Label htmlFor="webhook-secret">Webhook Secret</Label>
              <Input 
                id="webhook-secret" 
                type="password" 
                placeholder="Enter webhook secret"
              />
            </div>
            <div className="flex space-x-2">
              <Button>Save Configuration</Button>
              <Button variant="outline">Test Webhook</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WebhookManager;
