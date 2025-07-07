
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PaymentIntegrations from './PaymentIntegrations';
import PlatformIntegrations from './PlatformIntegrations';
import AutomatedOrders from '@/components/integrations/AutomatedOrders';
import WebhookManager from '@/components/integrations/WebhookManager';

const IntegrationsHub = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Integrations Hub</h1>
        <p className="text-gray-600">Manage all your payment, platform, and automation integrations</p>
      </div>

      <Tabs defaultValue="payments" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        </TabsList>

        <TabsContent value="payments">
          <PaymentIntegrations />
        </TabsContent>

        <TabsContent value="platforms">
          <PlatformIntegrations />
        </TabsContent>

        <TabsContent value="automation">
          <AutomatedOrders />
        </TabsContent>

        <TabsContent value="webhooks">
          <WebhookManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntegrationsHub;
