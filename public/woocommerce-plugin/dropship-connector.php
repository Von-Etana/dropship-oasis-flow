<?php
/**
 * Plugin Name: Dropship Connector
 * Plugin URI: https://dropshipconnector.com
 * Description: Connect your WooCommerce store to the Dropship Connector platform for automated order management and product sync.
 * Version: 1.0.0
 * Author: Dropship Connector
 * License: GPL2
 * Text Domain: dropship-connector
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('DROPSHIP_CONNECTOR_VERSION', '1.0.0');
define('DROPSHIP_CONNECTOR_PLUGIN_URL', plugin_dir_url(__FILE__));
define('DROPSHIP_CONNECTOR_PLUGIN_PATH', plugin_dir_path(__FILE__));

// Main plugin class
class DropshipConnector {
    
    public function __construct() {
        add_action('init', array($this, 'init'));
        add_action('admin_menu', array($this, 'admin_menu'));
        add_action('admin_enqueue_scripts', array($this, 'admin_scripts'));
        
        // WooCommerce hooks
        add_action('woocommerce_order_status_changed', array($this, 'sync_order_status'), 10, 4);
        add_action('woocommerce_new_order', array($this, 'sync_new_order'));
        add_action('woocommerce_product_set_stock', array($this, 'sync_product_stock'));
        
        // REST API endpoints
        add_action('rest_api_init', array($this, 'register_rest_routes'));
        
        // Activation/Deactivation hooks
        register_activation_hook(__FILE__, array($this, 'activate'));
        register_deactivation_hook(__FILE__, array($this, 'deactivate'));
    }
    
    public function init() {
        // Initialize plugin
        load_plugin_textdomain('dropship-connector', false, dirname(plugin_basename(__FILE__)) . '/languages');
    }
    
    public function admin_menu() {
        add_menu_page(
            'Dropship Connector',
            'Dropship Connector',
            'manage_options',
            'dropship-connector',
            array($this, 'admin_page'),
            'dashicons-store',
            30
        );
        
        add_submenu_page(
            'dropship-connector',
            'Settings',
            'Settings',
            'manage_options',
            'dropship-connector-settings',
            array($this, 'settings_page')
        );
        
        add_submenu_page(
            'dropship-connector',
            'Product Sync',
            'Product Sync',
            'manage_options',
            'dropship-connector-products',
            array($this, 'products_page')
        );
        
        add_submenu_page(
            'dropship-connector',
            'Order Management',
            'Orders',
            'manage_options',
            'dropship-connector-orders',
            array($this, 'orders_page')
        );
    }
    
    public function admin_scripts($hook) {
        if (strpos($hook, 'dropship-connector') !== false) {
            wp_enqueue_script(
                'dropship-connector-admin',
                DROPSHIP_CONNECTOR_PLUGIN_URL . 'assets/admin.js',
                array('jquery'),
                DROPSHIP_CONNECTOR_VERSION,
                true
            );
            
            wp_enqueue_style(
                'dropship-connector-admin',
                DROPSHIP_CONNECTOR_PLUGIN_URL . 'assets/admin.css',
                array(),
                DROPSHIP_CONNECTOR_VERSION
            );
            
            wp_localize_script('dropship-connector-admin', 'dropship_ajax', array(
                'ajax_url' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('dropship_connector_nonce')
            ));
        }
    }
    
    public function admin_page() {
        $api_key = get_option('dropship_connector_api_key', '');
        $store_url = get_option('dropship_connector_store_url', '');
        $connection_status = $this->check_connection_status();
        
        ?>
        <div class="wrap">
            <h1>Dropship Connector</h1>
            
            <div class="card">
                <h2>Connection Status</h2>
                <p class="connection-status <?php echo $connection_status ? 'connected' : 'disconnected'; ?>">
                    <?php echo $connection_status ? '✓ Connected' : '✗ Not Connected'; ?>
                </p>
                
                <?php if ($connection_status): ?>
                    <p>Your WooCommerce store is successfully connected to Dropship Connector.</p>
                <?php else: ?>
                    <p>Please configure your API settings to connect your store.</p>
                <?php endif; ?>
            </div>
            
            <div class="card">
                <h2>Quick Stats</h2>
                <div class="stats-grid">
                    <div class="stat-item">
                        <h3><?php echo $this->get_synced_products_count(); ?></h3>
                        <p>Synced Products</p>
                    </div>
                    <div class="stat-item">
                        <h3><?php echo $this->get_pending_orders_count(); ?></h3>
                        <p>Pending Orders</p>
                    </div>
                    <div class="stat-item">
                        <h3><?php echo $this->get_last_sync_time(); ?></h3>
                        <p>Last Sync</p>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <h2>Quick Actions</h2>
                <p>
                    <button class="button button-primary" onclick="syncProducts()">Sync Products</button>
                    <button class="button button-secondary" onclick="syncOrders()">Sync Orders</button>
                    <button class="button button-secondary" onclick="testConnection()">Test Connection</button>
                </p>
            </div>
        </div>
        <?php
    }
    
    public function settings_page() {
        if (isset($_POST['submit'])) {
            update_option('dropship_connector_api_key', sanitize_text_field($_POST['api_key']));
            update_option('dropship_connector_store_url', sanitize_url($_POST['store_url']));
            update_option('dropship_connector_auto_sync', isset($_POST['auto_sync']));
            update_option('dropship_connector_sync_interval', intval($_POST['sync_interval']));
            
            echo '<div class="notice notice-success"><p>Settings saved!</p></div>';
        }
        
        $api_key = get_option('dropship_connector_api_key', '');
        $store_url = get_option('dropship_connector_store_url', '');
        $auto_sync = get_option('dropship_connector_auto_sync', false);
        $sync_interval = get_option('dropship_connector_sync_interval', 15);
        
        ?>
        <div class="wrap">
            <h1>Dropship Connector Settings</h1>
            
            <form method="post" action="">
                <table class="form-table">
                    <tr>
                        <th scope="row">API Key</th>
                        <td>
                            <input type="password" name="api_key" value="<?php echo esc_attr($api_key); ?>" class="regular-text" />
                            <p class="description">Enter your Dropship Connector API key</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Store URL</th>
                        <td>
                            <input type="url" name="store_url" value="<?php echo esc_attr($store_url); ?>" class="regular-text" />
                            <p class="description">Your Dropship Connector store URL</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Auto Sync</th>
                        <td>
                            <label>
                                <input type="checkbox" name="auto_sync" <?php checked($auto_sync); ?> />
                                Enable automatic synchronization
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Sync Interval</th>
                        <td>
                            <select name="sync_interval">
                                <option value="5" <?php selected($sync_interval, 5); ?>>5 minutes</option>
                                <option value="15" <?php selected($sync_interval, 15); ?>>15 minutes</option>
                                <option value="30" <?php selected($sync_interval, 30); ?>>30 minutes</option>
                                <option value="60" <?php selected($sync_interval, 60); ?>>1 hour</option>
                            </select>
                        </td>
                    </tr>
                </table>
                
                <?php submit_button(); ?>
            </form>
        </div>
        <?php
    }
    
    public function products_page() {
        $products = $this->get_synced_products();
        
        ?>
        <div class="wrap">
            <h1>Product Sync</h1>
            
            <div class="tablenav top">
                <div class="alignleft actions">
                    <button class="button button-primary" onclick="syncAllProducts()">Sync All Products</button>
                    <button class="button button-secondary" onclick="importProducts()">Import Products</button>
                </div>
            </div>
            
            <table class="wp-list-table widefat fixed striped">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>SKU</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Sync Status</th>
                        <th>Last Sync</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($products as $product): ?>
                    <tr>
                        <td><?php echo esc_html($product->get_name()); ?></td>
                        <td><?php echo esc_html($product->get_sku()); ?></td>
                        <td><?php echo wc_price($product->get_price()); ?></td>
                        <td><?php echo $product->get_stock_quantity(); ?></td>
                        <td>
                            <span class="sync-status <?php echo $this->get_product_sync_status($product->get_id()); ?>">
                                <?php echo ucfirst($this->get_product_sync_status($product->get_id())); ?>
                            </span>
                        </td>
                        <td><?php echo $this->get_product_last_sync($product->get_id()); ?></td>
                        <td>
                            <button class="button button-small" onclick="syncProduct(<?php echo $product->get_id(); ?>)">Sync</button>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
        <?php
    }
    
    public function orders_page() {
        $orders = wc_get_orders(array(
            'limit' => 50,
            'status' => array('processing', 'on-hold', 'pending')
        ));
        
        ?>
        <div class="wrap">
            <h1>Order Management</h1>
            
            <div class="tablenav top">
                <div class="alignleft actions">
                    <button class="button button-primary" onclick="syncAllOrders()">Sync All Orders</button>
                    <button class="button button-secondary" onclick="processOrders()">Process Orders</button>
                </div>
            </div>
            
            <table class="wp-list-table widefat fixed striped">
                <thead>
                    <tr>
                        <th>Order #</th>
                        <th>Customer</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th>Date</th>
                        <th>Sync Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($orders as $order): ?>
                    <tr>
                        <td>#<?php echo $order->get_order_number(); ?></td>
                        <td><?php echo $order->get_billing_first_name() . ' ' . $order->get_billing_last_name(); ?></td>
                        <td><?php echo wc_get_order_status_name($order->get_status()); ?></td>
                        <td><?php echo $order->get_formatted_order_total(); ?></td>
                        <td><?php echo $order->get_date_created()->format('Y-m-d H:i'); ?></td>
                        <td>
                            <span class="sync-status <?php echo $this->get_order_sync_status($order->get_id()); ?>">
                                <?php echo ucfirst($this->get_order_sync_status($order->get_id())); ?>
                            </span>
                        </td>
                        <td>
                            <button class="button button-small" onclick="syncOrder(<?php echo $order->get_id(); ?>)">Sync</button>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
        <?php
    }
    
    public function register_rest_routes() {
        register_rest_route('dropship-connector/v1', '/webhook', array(
            'methods' => 'POST',
            'callback' => array($this, 'handle_webhook'),
            'permission_callback' => array($this, 'verify_webhook_signature')
        ));
        
        register_rest_route('dropship-connector/v1', '/sync-products', array(
            'methods' => 'POST',
            'callback' => array($this, 'sync_products_endpoint'),
            'permission_callback' => array($this, 'check_api_permissions')
        ));
        
        register_rest_route('dropship-connector/v1', '/sync-orders', array(
            'methods' => 'POST',
            'callback' => array($this, 'sync_orders_endpoint'),
            'permission_callback' => array($this, 'check_api_permissions')
        ));
    }
    
    // API Methods
    public function sync_new_order($order_id) {
        $order = wc_get_order($order_id);
        if (!$order) return;
        
        $this->send_order_to_api($order);
    }
    
    public function sync_order_status($order_id, $from_status, $to_status, $order) {
        $this->send_order_status_to_api($order_id, $to_status);
    }
    
    public function sync_product_stock($product) {
        $this->send_product_stock_to_api($product);
    }
    
    private function send_order_to_api($order) {
        $api_key = get_option('dropship_connector_api_key');
        $store_url = get_option('dropship_connector_store_url');
        
        if (!$api_key || !$store_url) return;
        
        $order_data = array(
            'order_id' => $order->get_id(),
            'order_number' => $order->get_order_number(),
            'status' => $order->get_status(),
            'total' => $order->get_total(),
            'currency' => $order->get_currency(),
            'customer_email' => $order->get_billing_email(),
            'customer_name' => $order->get_billing_first_name() . ' ' . $order->get_billing_last_name(),
            'billing_address' => $order->get_address('billing'),
            'shipping_address' => $order->get_address('shipping'),
            'line_items' => array()
        );
        
        foreach ($order->get_items() as $item) {
            $product = $item->get_product();
            $order_data['line_items'][] = array(
                'product_id' => $product->get_id(),
                'sku' => $product->get_sku(),
                'name' => $item->get_name(),
                'quantity' => $item->get_quantity(),
                'price' => $item->get_total()
            );
        }
        
        wp_remote_post($store_url . '/api/woocommerce/orders', array(
            'headers' => array(
                'Authorization' => 'Bearer ' . $api_key,
                'Content-Type' => 'application/json'
            ),
            'body' => json_encode($order_data),
            'timeout' => 30
        ));
        
        update_post_meta($order->get_id(), '_dropship_connector_synced', current_time('mysql'));
    }
    
    private function send_order_status_to_api($order_id, $status) {
        $api_key = get_option('dropship_connector_api_key');
        $store_url = get_option('dropship_connector_store_url');
        
        if (!$api_key || !$store_url) return;
        
        wp_remote_post($store_url . '/api/woocommerce/orders/' . $order_id . '/status', array(
            'headers' => array(
                'Authorization' => 'Bearer ' . $api_key,
                'Content-Type' => 'application/json'
            ),
            'body' => json_encode(array('status' => $status)),
            'timeout' => 30
        ));
    }
    
    private function send_product_stock_to_api($product) {
        $api_key = get_option('dropship_connector_api_key');
        $store_url = get_option('dropship_connector_store_url');
        
        if (!$api_key || !$store_url) return;
        
        wp_remote_post($store_url . '/api/woocommerce/products/' . $product->get_id() . '/stock', array(
            'headers' => array(
                'Authorization' => 'Bearer ' . $api_key,
                'Content-Type' => 'application/json'
            ),
            'body' => json_encode(array(
                'stock_quantity' => $product->get_stock_quantity(),
                'stock_status' => $product->get_stock_status()
            )),
            'timeout' => 30
        ));
    }
    
    public function handle_webhook($request) {
        $data = $request->get_json_params();
        
        switch ($data['event']) {
            case 'product.updated':
                $this->update_product_from_webhook($data['data']);
                break;
            case 'order.status_changed':
                $this->update_order_status_from_webhook($data['data']);
                break;
            case 'inventory.updated':
                $this->update_inventory_from_webhook($data['data']);
                break;
        }
        
        return new WP_REST_Response(array('status' => 'success'), 200);
    }
    
    private function update_product_from_webhook($data) {
        $product_id = $data['product_id'];
        $product = wc_get_product($product_id);
        
        if ($product) {
            $product->set_price($data['price']);
            $product->set_stock_quantity($data['stock_quantity']);
            $product->save();
        }
    }
    
    private function update_order_status_from_webhook($data) {
        $order_id = $data['order_id'];
        $order = wc_get_order($order_id);
        
        if ($order) {
            $order->update_status($data['status']);
            
            if (isset($data['tracking_number'])) {
                $order->add_meta_data('_tracking_number', $data['tracking_number']);
                $order->save();
            }
        }
    }
    
    private function update_inventory_from_webhook($data) {
        foreach ($data['products'] as $product_data) {
            $product = wc_get_product($product_data['id']);
            if ($product) {
                $product->set_stock_quantity($product_data['stock_quantity']);
                $product->save();
            }
        }
    }
    
    // Helper methods
    private function check_connection_status() {
        $api_key = get_option('dropship_connector_api_key');
        $store_url = get_option('dropship_connector_store_url');
        
        if (!$api_key || !$store_url) return false;
        
        $response = wp_remote_get($store_url . '/api/health', array(
            'headers' => array(
                'Authorization' => 'Bearer ' . $api_key
            ),
            'timeout' => 10
        ));
        
        return !is_wp_error($response) && wp_remote_retrieve_response_code($response) === 200;
    }
    
    private function get_synced_products_count() {
        $products = wc_get_products(array(
            'meta_key' => '_dropship_connector_synced',
            'meta_compare' => 'EXISTS',
            'return' => 'ids'
        ));
        return count($products);
    }
    
    private function get_pending_orders_count() {
        $orders = wc_get_orders(array(
            'status' => array('processing', 'on-hold'),
            'return' => 'ids'
        ));
        return count($orders);
    }
    
    private function get_last_sync_time() {
        $last_sync = get_option('dropship_connector_last_sync');
        return $last_sync ? human_time_diff(strtotime($last_sync), current_time('timestamp')) . ' ago' : 'Never';
    }
    
    private function get_synced_products() {
        return wc_get_products(array('limit' => 50));
    }
    
    private function get_product_sync_status($product_id) {
        $synced = get_post_meta($product_id, '_dropship_connector_synced', true);
        return $synced ? 'synced' : 'pending';
    }
    
    private function get_product_last_sync($product_id) {
        $last_sync = get_post_meta($product_id, '_dropship_connector_synced', true);
        return $last_sync ? human_time_diff(strtotime($last_sync), current_time('timestamp')) . ' ago' : 'Never';
    }
    
    private function get_order_sync_status($order_id) {
        $synced = get_post_meta($order_id, '_dropship_connector_synced', true);
        return $synced ? 'synced' : 'pending';
    }
    
    public function verify_webhook_signature($request) {
        $signature = $request->get_header('X-Dropship-Signature');
        $payload = $request->get_body();
        $api_key = get_option('dropship_connector_api_key');
        
        $expected_signature = hash_hmac('sha256', $payload, $api_key);
        
        return hash_equals($signature, $expected_signature);
    }
    
    public function check_api_permissions() {
        return current_user_can('manage_options');
    }
    
    public function sync_products_endpoint($request) {
        // Implement product sync logic
        return new WP_REST_Response(array('status' => 'success'), 200);
    }
    
    public function sync_orders_endpoint($request) {
        // Implement order sync logic
        return new WP_REST_Response(array('status' => 'success'), 200);
    }
    
    public function activate() {
        // Create database tables and set default options
        update_option('dropship_connector_version', DROPSHIP_CONNECTOR_VERSION);
        
        // Schedule cron job for auto sync
        if (!wp_next_scheduled('dropship_connector_auto_sync')) {
            wp_schedule_event(time(), 'hourly', 'dropship_connector_auto_sync');
        }
    }
    
    public function deactivate() {
        // Clear scheduled cron job
        wp_clear_scheduled_hook('dropship_connector_auto_sync');
    }
}

// Initialize the plugin
new DropshipConnector();

// AJAX handlers for JavaScript functions
add_action('wp_ajax_sync_products', 'handle_sync_products');
add_action('wp_ajax_sync_orders', 'handle_sync_orders');
add_action('wp_ajax_test_connection', 'handle_test_connection');

function handle_sync_products() {
    check_ajax_referer('dropship_connector_nonce', 'nonce');
    
    // Implement product sync logic
    wp_send_json_success(array('message' => 'Products synced successfully'));
}

function handle_sync_orders() {
    check_ajax_referer('dropship_connector_nonce', 'nonce');
    
    // Implement order sync logic
    wp_send_json_success(array('message' => 'Orders synced successfully'));
}

function handle_test_connection() {
    check_ajax_referer('dropship_connector_nonce', 'nonce');
    
    $api_key = get_option('dropship_connector_api_key');
    $store_url = get_option('dropship_connector_store_url');
    
    if (!$api_key || !$store_url) {
        wp_send_json_error(array('message' => 'API credentials not configured'));
        return;
    }
    
    $response = wp_remote_get($store_url . '/api/health', array(
        'headers' => array(
            'Authorization' => 'Bearer ' . $api_key
        ),
        'timeout' => 10
    ));
    
    if (is_wp_error($response)) {
        wp_send_json_error(array('message' => 'Connection failed: ' . $response->get_error_message()));
    } else {
        wp_send_json_success(array('message' => 'Connection successful'));
    }
}
?>