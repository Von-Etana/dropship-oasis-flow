jQuery(document).ready(function($) {
    
    // Global functions for button clicks
    window.syncProducts = function() {
        performAction('sync_products', 'Syncing products...', 'Products synced successfully!');
    };
    
    window.syncOrders = function() {
        performAction('sync_orders', 'Syncing orders...', 'Orders synced successfully!');
    };
    
    window.testConnection = function() {
        performAction('test_connection', 'Testing connection...', 'Connection test completed!');
    };
    
    window.syncAllProducts = function() {
        performBulkAction('sync_all_products', 'Syncing all products...', 'All products synced successfully!');
    };
    
    window.importProducts = function() {
        performBulkAction('import_products', 'Importing products...', 'Products imported successfully!');
    };
    
    window.syncAllOrders = function() {
        performBulkAction('sync_all_orders', 'Syncing all orders...', 'All orders synced successfully!');
    };
    
    window.processOrders = function() {
        performBulkAction('process_orders', 'Processing orders...', 'Orders processed successfully!');
    };
    
    window.syncProduct = function(productId) {
        performItemAction('sync_product', productId, 'Syncing product...', 'Product synced successfully!');
    };
    
    window.syncOrder = function(orderId) {
        performItemAction('sync_order', orderId, 'Syncing order...', 'Order synced successfully!');
    };
    
    // Generic action performer
    function performAction(action, loadingMessage, successMessage) {
        var button = event.target;
        var originalText = button.textContent;
        
        // Show loading state
        button.textContent = loadingMessage;
        button.classList.add('loading');
        button.disabled = true;
        
        $.ajax({
            url: dropship_ajax.ajax_url,
            type: 'POST',
            data: {
                action: action,
                nonce: dropship_ajax.nonce
            },
            success: function(response) {
                if (response.success) {
                    showNotice(successMessage, 'success');
                    updateStats();
                } else {
                    showNotice(response.data.message || 'An error occurred', 'error');
                }
            },
            error: function(xhr, status, error) {
                showNotice('Connection error: ' + error, 'error');
            },
            complete: function() {
                // Reset button state
                button.textContent = originalText;
                button.classList.remove('loading');
                button.disabled = false;
            }
        });
    }
    
    // Bulk action performer
    function performBulkAction(action, loadingMessage, successMessage) {
        var button = event.target;
        var originalText = button.textContent;
        
        if (!confirm('Are you sure you want to perform this action? This may take a while.')) {
            return;
        }
        
        // Show loading state
        button.textContent = loadingMessage;
        button.classList.add('loading');
        button.disabled = true;
        
        $.ajax({
            url: dropship_ajax.ajax_url,
            type: 'POST',
            data: {
                action: action,
                nonce: dropship_ajax.nonce
            },
            timeout: 60000, // 60 seconds for bulk operations
            success: function(response) {
                if (response.success) {
                    showNotice(successMessage, 'success');
                    updateStats();
                    // Refresh the page to show updated data
                    setTimeout(function() {
                        location.reload();
                    }, 2000);
                } else {
                    showNotice(response.data.message || 'An error occurred', 'error');
                }
            },
            error: function(xhr, status, error) {
                if (status === 'timeout') {
                    showNotice('Operation timed out. It may still be running in the background.', 'warning');
                } else {
                    showNotice('Connection error: ' + error, 'error');
                }
            },
            complete: function() {
                // Reset button state
                button.textContent = originalText;
                button.classList.remove('loading');
                button.disabled = false;
            }
        });
    }
    
    // Individual item action performer
    function performItemAction(action, itemId, loadingMessage, successMessage) {
        var button = event.target;
        var originalText = button.textContent;
        var row = button.closest('tr');
        
        // Show loading state
        button.textContent = loadingMessage;
        button.classList.add('loading');
        button.disabled = true;
        
        $.ajax({
            url: dropship_ajax.ajax_url,
            type: 'POST',
            data: {
                action: action,
                item_id: itemId,
                nonce: dropship_ajax.nonce
            },
            success: function(response) {
                if (response.success) {
                    showNotice(successMessage, 'success');
                    updateRowStatus(row, 'synced');
                } else {
                    showNotice(response.data.message || 'An error occurred', 'error');
                    updateRowStatus(row, 'error');
                }
            },
            error: function(xhr, status, error) {
                showNotice('Connection error: ' + error, 'error');
                updateRowStatus(row, 'error');
            },
            complete: function() {
                // Reset button state
                button.textContent = originalText;
                button.classList.remove('loading');
                button.disabled = false;
            }
        });
    }
    
    // Update row status
    function updateRowStatus(row, status) {
        var statusCell = row.querySelector('.sync-status');
        if (statusCell) {
            statusCell.className = 'sync-status ' + status;
            statusCell.textContent = status.charAt(0).toUpperCase() + status.slice(1);
        }
        
        var lastSyncCell = row.cells[row.cells.length - 2]; // Assuming last sync is second to last column
        if (lastSyncCell && status === 'synced') {
            lastSyncCell.textContent = 'Just now';
        }
    }
    
    // Show notice
    function showNotice(message, type) {
        var noticeClass = 'notice notice-' + type;
        var notice = $('<div class="' + noticeClass + ' is-dismissible"><p>' + message + '</p></div>');
        
        // Remove existing notices
        $('.notice').not('.notice-info').remove();
        
        // Add new notice
        $('.wrap h1').after(notice);
        
        // Auto-remove after 5 seconds
        setTimeout(function() {
            notice.fadeOut(function() {
                notice.remove();
            });
        }, 5000);
        
        // Make dismissible
        notice.on('click', '.notice-dismiss', function() {
            notice.fadeOut(function() {
                notice.remove();
            });
        });
    }
    
    // Update stats on dashboard
    function updateStats() {
        if ($('.stats-grid').length === 0) return;
        
        $.ajax({
            url: dropship_ajax.ajax_url,
            type: 'POST',
            data: {
                action: 'get_stats',
                nonce: dropship_ajax.nonce
            },
            success: function(response) {
                if (response.success && response.data) {
                    $('.stat-item').each(function(index) {
                        var statValue = $(this).find('h3');
                        switch(index) {
                            case 0:
                                statValue.text(response.data.synced_products || '0');
                                break;
                            case 1:
                                statValue.text(response.data.pending_orders || '0');
                                break;
                            case 2:
                                statValue.text(response.data.last_sync || 'Never');
                                break;
                        }
                    });
                }
            }
        });
    }
    
    // Auto-refresh connection status
    function checkConnectionStatus() {
        if ($('.connection-status').length === 0) return;
        
        $.ajax({
            url: dropship_ajax.ajax_url,
            type: 'POST',
            data: {
                action: 'check_connection_status',
                nonce: dropship_ajax.nonce
            },
            success: function(response) {
                if (response.success) {
                    var statusElement = $('.connection-status');
                    if (response.data.connected) {
                        statusElement.removeClass('disconnected').addClass('connected');
                        statusElement.text('✓ Connected');
                    } else {
                        statusElement.removeClass('connected').addClass('disconnected');
                        statusElement.text('✗ Not Connected');
                    }
                }
            }
        });
    }
    
    // Settings form validation
    $('#dropship-connector-settings-form').on('submit', function(e) {
        var apiKey = $('input[name="api_key"]').val();
        var storeUrl = $('input[name="store_url"]').val();
        
        if (!apiKey.trim()) {
            e.preventDefault();
            showNotice('API Key is required', 'error');
            return false;
        }
        
        if (!storeUrl.trim()) {
            e.preventDefault();
            showNotice('Store URL is required', 'error');
            return false;
        }
        
        // Validate URL format
        try {
            new URL(storeUrl);
        } catch (e) {
            e.preventDefault();
            showNotice('Please enter a valid Store URL', 'error');
            return false;
        }
    });
    
    // Auto-save settings on change (with debounce)
    var saveTimeout;
    $('.auto-save').on('input change', function() {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(function() {
            saveSettings(true); // true for auto-save
        }, 2000);
    });
    
    function saveSettings(isAutoSave) {
        var formData = $('#dropship-connector-settings-form').serialize();
        formData += '&action=save_settings&nonce=' + dropship_ajax.nonce;
        
        $.ajax({
            url: dropship_ajax.ajax_url,
            type: 'POST',
            data: formData,
            success: function(response) {
                if (response.success && !isAutoSave) {
                    showNotice('Settings saved successfully', 'success');
                }
            },
            error: function() {
                if (!isAutoSave) {
                    showNotice('Failed to save settings', 'error');
                }
            }
        });
    }
    
    // Periodic updates
    if ($('.dropship-connector-admin').length > 0) {
        // Check connection status every 30 seconds
        setInterval(checkConnectionStatus, 30000);
        
        // Update stats every 60 seconds
        setInterval(updateStats, 60000);
    }
    
    // Initialize tooltips
    $('[data-tooltip]').each(function() {
        $(this).attr('title', $(this).data('tooltip'));
    });
    
    // Table row actions
    $('.wp-list-table tbody tr').hover(
        function() {
            $(this).find('.row-actions').css('visibility', 'visible');
        },
        function() {
            $(this).find('.row-actions').css('visibility', 'hidden');
        }
    );
    
    // Bulk selection
    $('#cb-select-all').on('change', function() {
        var isChecked = $(this).is(':checked');
        $('.wp-list-table tbody input[type="checkbox"]').prop('checked', isChecked);
        updateBulkActionButtons();
    });
    
    $('.wp-list-table tbody input[type="checkbox"]').on('change', function() {
        updateBulkActionButtons();
    });
    
    function updateBulkActionButtons() {
        var selectedCount = $('.wp-list-table tbody input[type="checkbox"]:checked').length;
        $('.bulk-actions .button').prop('disabled', selectedCount === 0);
        
        if (selectedCount > 0) {
            $('.bulk-actions .selected-count').text('(' + selectedCount + ' selected)');
        } else {
            $('.bulk-actions .selected-count').text('');
        }
    }
    
    // Search functionality
    $('#product-search, #order-search').on('input', function() {
        var searchTerm = $(this).val().toLowerCase();
        var table = $(this).closest('.wrap').find('.wp-list-table tbody');
        
        table.find('tr').each(function() {
            var rowText = $(this).text().toLowerCase();
            if (rowText.indexOf(searchTerm) === -1) {
                $(this).hide();
            } else {
                $(this).show();
            }
        });
    });
    
    // Export functionality
    window.exportData = function(type) {
        var form = $('<form method="post" action="">');
        form.append('<input type="hidden" name="action" value="export_data">');
        form.append('<input type="hidden" name="type" value="' + type + '">');
        form.append('<input type="hidden" name="nonce" value="' + dropship_ajax.nonce + '">');
        
        $('body').append(form);
        form.submit();
        form.remove();
    };
    
    // Import functionality
    window.importData = function(type) {
        $('#import-file-input').data('type', type).click();
    };
    
    $('#import-file-input').on('change', function() {
        var file = this.files[0];
        var type = $(this).data('type');
        
        if (!file) return;
        
        var formData = new FormData();
        formData.append('file', file);
        formData.append('action', 'import_data');
        formData.append('type', type);
        formData.append('nonce', dropship_ajax.nonce);
        
        $.ajax({
            url: dropship_ajax.ajax_url,
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                if (response.success) {
                    showNotice('Import completed successfully', 'success');
                    location.reload();
                } else {
                    showNotice(response.data.message || 'Import failed', 'error');
                }
            },
            error: function() {
                showNotice('Import failed', 'error');
            }
        });
    });
});