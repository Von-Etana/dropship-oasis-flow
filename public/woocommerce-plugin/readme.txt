=== Dropship Connector ===
Contributors: dropshipconnector
Tags: dropshipping, woocommerce, automation, orders, products
Requires at least: 5.0
Tested up to: 6.4
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Connect your WooCommerce store to the Dropship Connector platform for automated order management and seamless product synchronization.

== Description ==

Dropship Connector is a powerful WordPress plugin that bridges your WooCommerce store with the Dropship Connector platform, enabling automated dropshipping operations with real-time synchronization.

= Features =

* **Automated Order Processing** - Orders are automatically synced to your dropshipping suppliers
* **Real-time Product Sync** - Keep inventory and pricing updated across all platforms
* **Order Status Updates** - Automatic tracking number updates and status changes
* **Bulk Operations** - Import/export products and process orders in bulk
* **Webhook Integration** - Real-time updates via secure webhooks
* **Multi-supplier Support** - Connect with multiple suppliers simultaneously
* **Inventory Management** - Automatic stock level synchronization
* **Analytics Dashboard** - Track performance and sync status

= How It Works =

1. **Connect Your Store** - Enter your Dropship Connector API credentials
2. **Sync Products** - Import products from your suppliers or sync existing ones
3. **Automate Orders** - New orders are automatically sent to suppliers
4. **Track Everything** - Monitor order status, inventory, and performance

= Requirements =

* WordPress 5.0 or higher
* WooCommerce 5.0 or higher
* PHP 7.4 or higher
* Dropship Connector account and API key

= Support =

For support, documentation, and tutorials, visit [Dropship Connector Support](https://dropshipconnector.com/support)

== Installation ==

= Automatic Installation =

1. Log in to your WordPress admin panel
2. Go to Plugins > Add New
3. Search for "Dropship Connector"
4. Click "Install Now" and then "Activate"

= Manual Installation =

1. Download the plugin ZIP file
2. Upload it to the `/wp-content/plugins/` directory
3. Extract the ZIP file
4. Activate the plugin through the 'Plugins' menu in WordPress

= Configuration =

1. Go to Dropship Connector > Settings
2. Enter your API key and Store URL from your Dropship Connector account
3. Configure sync settings and preferences
4. Test the connection
5. Start syncing products and orders!

== Frequently Asked Questions ==

= Do I need a Dropship Connector account? =

Yes, you need an active Dropship Connector account to use this plugin. You can sign up at [dropshipconnector.com](https://dropshipconnector.com)

= Is this plugin free? =

The plugin is free to download and use, but requires a Dropship Connector subscription for the platform services.

= Can I sync existing products? =

Yes, the plugin can sync your existing WooCommerce products with the Dropship Connector platform.

= What happens if the connection fails? =

The plugin includes automatic retry mechanisms and will queue failed operations for later processing.

= Can I customize which data is synced? =

Yes, you can configure which product fields, order statuses, and other data points are synchronized.

= Is my data secure? =

Yes, all data transmission is encrypted using HTTPS and secure API authentication methods.

== Screenshots ==

1. Main dashboard showing connection status and quick stats
2. Settings page for API configuration
3. Product sync management interface
4. Order management and tracking
5. Bulk operations and import/export tools

== Changelog ==

= 1.0.0 =
* Initial release
* Basic product and order synchronization
* API integration with Dropship Connector platform
* Admin dashboard and settings pages
* Webhook support for real-time updates
* Bulk import/export functionality

== Upgrade Notice ==

= 1.0.0 =
Initial release of the Dropship Connector plugin for WooCommerce.

== Third Party Services ==

This plugin connects to the Dropship Connector platform (https://dropshipconnector.com) to provide dropshipping automation services. By using this plugin, you agree to:

* Dropship Connector Terms of Service: https://dropshipconnector.com/terms
* Dropship Connector Privacy Policy: https://dropshipconnector.com/privacy

Data transmitted includes:
* Product information (name, price, inventory, etc.)
* Order details (customer info, items, shipping address)
* Store configuration and settings

All data transmission is encrypted and secured using industry-standard protocols.

== Developer Information ==

= Hooks and Filters =

The plugin provides several hooks for developers:

**Actions:**
* `dropship_connector_order_synced` - Fired when an order is successfully synced
* `dropship_connector_product_synced` - Fired when a product is successfully synced
* `dropship_connector_sync_failed` - Fired when a sync operation fails

**Filters:**
* `dropship_connector_sync_product_data` - Filter product data before syncing
* `dropship_connector_sync_order_data` - Filter order data before syncing
* `dropship_connector_api_timeout` - Customize API request timeout

= REST API Endpoints =

* `POST /wp-json/dropship-connector/v1/webhook` - Webhook endpoint for receiving updates
* `POST /wp-json/dropship-connector/v1/sync-products` - Trigger product sync
* `POST /wp-json/dropship-connector/v1/sync-orders` - Trigger order sync

== Credits ==

Developed by the Dropship Connector team.