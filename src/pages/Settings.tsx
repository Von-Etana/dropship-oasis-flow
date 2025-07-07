
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  Settings as SettingsIcon, 
  User, 
  CreditCard, 
  Bell, 
  Shield,
  Globe,
  Download,
  Key,
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  Lock,
  Eye,
  EyeOff,
  Smartphone,
  CreditCard as CardIcon,
  AlertTriangle
} from 'lucide-react';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    company: 'DropShip Pro LLC',
    phone: '+1 (555) 123-4567',
    address: '123 Business Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
    website: 'https://dropshippro.com',
    bio: 'Experienced e-commerce entrepreneur with a passion for dropshipping and online retail.',
    timezone: 'America/New_York',
    language: 'en',
    avatar: null as File | null
  });

  const [billingData, setBillingData] = useState({
    plan: 'pro',
    billingCycle: 'monthly',
    nextBilling: '2024-02-01',
    paymentMethod: '**** **** **** 1234',
    billingEmail: 'billing@example.com',
    invoiceHistory: [
      { id: '1', date: '2024-01-01', amount: '$29.99', status: 'paid' },
      { id: '2', date: '2023-12-01', amount: '$29.99', status: 'paid' },
      { id: '3', date: '2023-11-01', amount: '$29.99', status: 'paid' }
    ]
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
    loginAlerts: true,
    sessionTimeout: '30',
    trustedDevices: [
      { id: '1', name: 'MacBook Pro', location: 'New York, NY', lastUsed: '2024-01-15' },
      { id: '2', name: 'iPhone 15', location: 'New York, NY', lastUsed: '2024-01-14' }
    ]
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: {
      orderUpdates: true,
      productAlerts: true,
      marketingEmails: false,
      securityAlerts: true,
      weeklyReports: true
    },
    pushNotifications: {
      orderUpdates: true,
      lowStock: true,
      newCustomers: false,
      systemUpdates: true
    },
    frequency: 'immediate'
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

  const handleBillingSave = () => {
    toast.success('Billing settings updated successfully!');
  };

  const handleSecuritySave = () => {
    if (securityData.newPassword !== securityData.confirmPassword) {
      toast.error('New passwords do not match!');
      return;
    }
    toast.success('Security settings updated successfully!');
  };

  const handleNotificationSave = () => {
    toast.success('Notification preferences saved successfully!');
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
    { icon: Shield, label: 'Security', key: 'security' },
    { icon: Bell, label: 'Notifications', key: 'notifications' },
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
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Personal Information
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Phone Number</label>
                      <Input 
                        value={profileData.phone}
                        onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Company Name</label>
                      <Input 
                        value={profileData.company}
                        onChange={(e) => setProfileData(prev => ({ ...prev, company: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Bio</label>
                    <Textarea 
                      value={profileData.bio}
                      onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Address Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Street Address</label>
                    <Input 
                      value={profileData.address}
                      onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">City</label>
                      <Input 
                        value={profileData.city}
                        onChange={(e) => setProfileData(prev => ({ ...prev, city: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">State</label>
                      <Input 
                        value={profileData.state}
                        onChange={(e) => setProfileData(prev => ({ ...prev, state: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">ZIP Code</label>
                      <Input 
                        value={profileData.zipCode}
                        onChange={(e) => setProfileData(prev => ({ ...prev, zipCode: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Country</label>
                    <Select value={profileData.country} onValueChange={(value) => setProfileData(prev => ({ ...prev, country: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="United States">United States</SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                        <SelectItem value="Australia">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleProfileSave}>Save Profile</Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Billing Section */}
          {activeSection === 'billing' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Current Plan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold capitalize">{billingData.plan} Plan</h3>
                      <p className="text-gray-600">Billed {billingData.billingCycle}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="default">Active</Badge>
                      <p className="text-sm text-gray-600 mt-1">Next billing: {billingData.nextBilling}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline">Change Plan</Button>
                    <Button variant="outline">Cancel Subscription</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CardIcon className="w-5 h-5 mr-2" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-8 h-8 text-gray-400" />
                      <div>
                        <p className="font-medium">{billingData.paymentMethod}</p>
                        <p className="text-sm text-gray-600">Expires 12/2026</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Update</Button>
                  </div>
                  <Button onClick={handleBillingSave}>Update Payment Method</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Invoice History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {billingData.invoiceHistory.map((invoice) => (
                      <div key={invoice.id} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-medium">{invoice.date}</p>
                          <p className="text-sm text-gray-600">{invoice.amount}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={invoice.status === 'paid' ? 'default' : 'secondary'}>
                            {invoice.status}
                          </Badge>
                          <Button variant="ghost" size="sm">Download</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Security Section */}
          {activeSection === 'security' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lock className="w-5 h-5 mr-2" />
                    Change Password
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Current Password</label>
                    <div className="relative">
                      <Input 
                        type={showPassword ? "text" : "password"}
                        value={securityData.currentPassword}
                        onChange={(e) => setSecurityData(prev => ({ ...prev, currentPassword: e.target.value }))}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">New Password</label>
                    <Input 
                      type="password"
                      value={securityData.newPassword}
                      onChange={(e) => setSecurityData(prev => ({ ...prev, newPassword: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Confirm New Password</label>
                    <Input 
                      type="password"
                      value={securityData.confirmPassword}
                      onChange={(e) => setSecurityData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    />
                  </div>
                  <Button onClick={handleSecuritySave}>Update Password</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Smartphone className="w-5 h-5 mr-2" />
                    Two-Factor Authentication
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Enable 2FA</p>
                      <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                    </div>
                    <Switch 
                      checked={securityData.twoFactorEnabled}
                      onCheckedChange={(checked) => setSecurityData(prev => ({ ...prev, twoFactorEnabled: checked }))}
                    />
                  </div>
                  {securityData.twoFactorEnabled && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800">Two-factor authentication is enabled for your account.</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Trusted Devices</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {securityData.trustedDevices.map((device) => (
                      <div key={device.id} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-medium">{device.name}</p>
                          <p className="text-sm text-gray-600">{device.location} • Last used {device.lastUsed}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Notifications Section */}
          {activeSection === 'notifications' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="w-5 h-5 mr-2" />
                    Email Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(notificationSettings.emailNotifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                        <p className="text-sm text-gray-600">
                          {key === 'orderUpdates' && 'Get notified about order status changes'}
                          {key === 'productAlerts' && 'Receive alerts about product stock and pricing'}
                          {key === 'marketingEmails' && 'Promotional emails and special offers'}
                          {key === 'securityAlerts' && 'Important security notifications'}
                          {key === 'weeklyReports' && 'Weekly performance and analytics reports'}
                        </p>
                      </div>
                      <Switch 
                        checked={value}
                        onCheckedChange={(checked) => setNotificationSettings(prev => ({
                          ...prev,
                          emailNotifications: { ...prev.emailNotifications, [key]: checked }
                        }))}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="w-5 h-5 mr-2" />
                    Push Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(notificationSettings.pushNotifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                        <p className="text-sm text-gray-600">
                          {key === 'orderUpdates' && 'Push notifications for order changes'}
                          {key === 'lowStock' && 'Alerts when products are running low'}
                          {key === 'newCustomers' && 'Notifications about new customer registrations'}
                          {key === 'systemUpdates' && 'System maintenance and update notifications'}
                        </p>
                      </div>
                      <Switch 
                        checked={value}
                        onCheckedChange={(checked) => setNotificationSettings(prev => ({
                          ...prev,
                          pushNotifications: { ...prev.pushNotifications, [key]: checked }
                        }))}
                      />
                    </div>
                  ))}
                  <Button onClick={handleNotificationSave}>Save Notification Settings</Button>
                </CardContent>
              </Card>
            </div>
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
        </div>
      </div>
    </div>
  );
};

export default Settings;
