
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { 
  Settings as SettingsIcon, 
  User, 
  CreditCard, 
  Bell, 
  Shield,
  Globe,
  Download,
  Key
} from 'lucide-react';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    company: 'DropShip Pro LLC'
  });

  const [automationSettings, setAutomationSettings] = useState({
    autoFulfill: true,
    autoSync: true,
    priceMonitoring: true,
    stockMonitoring: true
  });

  const [apiKeys, setApiKeys] = useState({
    aliexpress: '',
    cjdropshipping: '',
    shopify: ''
  });

  const [defaultSettings, setDefaultSettings] = useState({
    markup: '150',
    shippingMethod: 'standard',
    category: 'electronics'
  });

  const handleProfileSave = () => {
    toast.success('Profile settings saved successfully!');
  };

  const handleAutomationToggle = (key: keyof typeof automationSettings) => {
    setAutomationSettings(prev => ({ ...prev, [key]: !prev[key] }));
    toast.success(`${key.replace(/([A-Z])/g, ' $1').toLowerCase()} ${automationSettings[key] ? 'disabled' : 'enabled'}`);
  };

  const handleApiKeyTest = (service: string) => {
    toast.info(`Testing ${service} API connection...`);
    setTimeout(() => {
      toast.success(`${service} API connection successful!`);
    }, 2000);
  };

  const handleDownloadExtension = () => {
    toast.info('Chrome extension download started!');
  };

  const navigationItems = [
    { icon: User, label: 'Profile', key: 'profile' },
    { icon: CreditCard, label: 'Billing', key: 'billing' },
    { icon: Bell, label: 'Notifications', key: 'notifications' },
    { icon: Shield, label: 'Security', key: 'security' },
    { icon: Key, label: 'API Keys', key: 'api' },
    { icon: Globe, label: 'Preferences', key: 'preferences' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your account and application preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <div 
                    key={item.key} 
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                      activeSection === item.key ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveSection(item.key)}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Profile Settings */}
          {activeSection === 'profile' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">First Name</label>
                    <Input 
                      value={profileData.firstName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Last Name</label>
                    <Input 
                      value={profileData.lastName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Email Address</label>
                  <Input 
                    type="email" 
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Company Name</label>
                  <Input 
                    value={profileData.company}
                    onChange={(e) => setProfileData(prev => ({ ...prev, company: e.target.value }))}
                  />
                </div>
                <Button onClick={handleProfileSave}>Save Changes</Button>
              </CardContent>
            </Card>
          )}

          {/* API Keys Section */}
          {activeSection === 'api' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Key className="w-5 h-5 mr-2" />
                  API Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">AliExpress API Key</label>
                  <div className="flex space-x-2">
                    <Input 
                      type="password" 
                      placeholder="Enter your AliExpress API key" 
                      className="flex-1"
                      value={apiKeys.aliexpress}
                      onChange={(e) => setApiKeys(prev => ({ ...prev, aliexpress: e.target.value }))}
                    />
                    <Button variant="outline" onClick={() => handleApiKeyTest('AliExpress')}>Test</Button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">CJDropshipping API Key</label>
                  <div className="flex space-x-2">
                    <Input 
                      type="password" 
                      placeholder="Enter your CJDropshipping API key" 
                      className="flex-1"
                      value={apiKeys.cjdropshipping}
                      onChange={(e) => setApiKeys(prev => ({ ...prev, cjdropshipping: e.target.value }))}
                    />
                    <Button variant="outline" onClick={() => handleApiKeyTest('CJDropshipping')}>Test</Button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Shopify API Key</label>
                  <div className="flex space-x-2">
                    <Input 
                      type="password" 
                      placeholder="Enter your Shopify API key" 
                      className="flex-1"
                      value={apiKeys.shopify}
                      onChange={(e) => setApiKeys(prev => ({ ...prev, shopify: e.target.value }))}
                    />
                    <Button variant="outline" onClick={() => handleApiKeyTest('Shopify')}>Test</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Preferences Section */}
          {activeSection === 'preferences' && (
            <>
              {/* Automation Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Automation Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">Auto-fulfill orders</div>
                      <div className="text-sm text-gray-600">Automatically place orders with suppliers</div>
                    </div>
                    <Switch 
                      checked={automationSettings.autoFulfill}
                      onCheckedChange={() => handleAutomationToggle('autoFulfill')}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">Auto-sync tracking numbers</div>
                      <div className="text-sm text-gray-600">Update tracking info automatically</div>
                    </div>
                    <Switch 
                      checked={automationSettings.autoSync}
                      onCheckedChange={() => handleAutomationToggle('autoSync')}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">Price monitoring</div>
                      <div className="text-sm text-gray-600">Monitor supplier price changes</div>
                    </div>
                    <Switch 
                      checked={automationSettings.priceMonitoring}
                      onCheckedChange={() => handleAutomationToggle('priceMonitoring')}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">Stock monitoring</div>
                      <div className="text-sm text-gray-600">Auto-update product availability</div>
                    </div>
                    <Switch 
                      checked={automationSettings.stockMonitoring}
                      onCheckedChange={() => handleAutomationToggle('stockMonitoring')}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Default Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Default Import Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Default Markup (%)</label>
                      <Input 
                        type="number" 
                        value={defaultSettings.markup}
                        onChange={(e) => setDefaultSettings(prev => ({ ...prev, markup: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Default Shipping Method</label>
                      <Select 
                        value={defaultSettings.shippingMethod}
                        onValueChange={(value) => setDefaultSettings(prev => ({ ...prev, shippingMethod: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard Shipping</SelectItem>
                          <SelectItem value="express">Express Shipping</SelectItem>
                          <SelectItem value="epacket">ePacket</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Default Category</label>
                    <Select 
                      value={defaultSettings.category}
                      onValueChange={(value) => setDefaultSettings(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="fashion">Fashion</SelectItem>
                        <SelectItem value="home">Home & Garden</SelectItem>
                        <SelectItem value="sports">Sports & Outdoors</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Chrome Extension */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Download className="w-5 h-5 mr-2" />
                    Browser Extension
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-medium text-blue-900 mb-2">GlobalDropship Chrome Extension</h3>
                    <p className="text-sm text-blue-700 mb-3">Import products directly from supplier websites with one click.</p>
                    <Button size="sm" onClick={handleDownloadExtension}>
                      <Download className="w-4 h-4 mr-2" />
                      Download Extension
                    </Button>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>The extension allows you to:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Import products from AliExpress, CJDropshipping, and other suppliers</li>
                      <li>Auto-fill product information and images</li>
                      <li>Apply pricing rules automatically</li>
                      <li>Bulk import from category pages</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Placeholder sections for other nav items */}
          {activeSection === 'billing' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Billing & Subscription
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Billing management features coming soon...</p>
              </CardContent>
            </Card>
          )}

          {activeSection === 'notifications' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Notification preferences coming soon...</p>
              </CardContent>
            </Card>
          )}

          {activeSection === 'security' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Security settings coming soon...</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
