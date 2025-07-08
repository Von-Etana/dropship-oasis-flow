// Popup script for Dropship Connector Chrome Extension
class DropshipConnectorPopup {
    constructor() {
        this.apiKey = '';
        this.storeUrl = '';
        this.currentProduct = null;
        this.init();
    }

    async init() {
        await this.loadSettings();
        this.setupEventListeners();
        await this.checkConnection();
        await this.detectProduct();
    }

    async loadSettings() {
        const result = await chrome.storage.sync.get(['apiKey', 'storeUrl']);
        this.apiKey = result.apiKey || '';
        this.storeUrl = result.storeUrl || '';
    }

    setupEventListeners() {
        document.getElementById('open-settings')?.addEventListener('click', () => {
            chrome.tabs.create({ url: chrome.runtime.getURL('options.html') });
        });

        document.getElementById('open-settings-footer')?.addEventListener('click', () => {
            chrome.tabs.create({ url: chrome.runtime.getURL('options.html') });
        });

        document.getElementById('import-product')?.addEventListener('click', () => {
            this.importProduct();
        });

        document.getElementById('markup-percent')?.addEventListener('input', (e) => {
            this.updateFinalPrice(e.target.value);
        });

        document.getElementById('refresh-page')?.addEventListener('click', () => {
            chrome.tabs.reload();
            window.close();
        });

        document.getElementById('open-dashboard')?.addEventListener('click', () => {
            chrome.tabs.create({ url: this.storeUrl + '/dashboard' });
        });
    }

    async checkConnection() {
        if (!this.apiKey || !this.storeUrl) {
            this.showSection('not-connected');
            return false;
        }

        try {
            const response = await fetch(this.storeUrl + '/api/health', {
                headers: { 'Authorization': `Bearer ${this.apiKey}` }
            });
            
            if (response.ok) {
                this.showSection('connected');
                return true;
            }
        } catch (error) {
            console.error('Connection check failed:', error);
        }

        this.showSection('not-connected');
        return false;
    }

    async detectProduct() {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            const results = await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: this.extractProductData
            });

            const productData = results[0]?.result;
            if (productData && productData.title) {
                this.currentProduct = productData;
                this.displayProduct(productData);
                this.showSection('product-detected');
            } else {
                this.showSection('no-product');
            }
        } catch (error) {
            console.error('Product detection failed:', error);
            this.showSection('no-product');
        }
    }

    extractProductData() {
        // This function runs in the content script context
        const selectors = {
            title: [
                'h1[data-automation-id="product-title"]', // Amazon
                '.x-item-title-label', // eBay
                '.product-title', // Generic
                '[data-testid="product-title"]',
                'h1.product-name',
                '.pdp-product-name',
                'h1[itemprop="name"]'
            ],
            price: [
                '.a-price-whole', // Amazon
                '.notranslate', // eBay
                '.price',
                '[data-testid="price"]',
                '.product-price',
                '.current-price'
            ],
            images: [
                '#landingImage', // Amazon
                'img[data-zoom-src]',
                '.product-image img',
                '.gallery-image img',
                '[data-testid="product-image"]'
            ],
            description: [
                '#feature-bullets ul', // Amazon
                '.x-item-description',
                '.product-description',
                '[data-testid="description"]'
            ]
        };

        const getTextContent = (selectors) => {
            for (const selector of selectors) {
                const element = document.querySelector(selector);
                if (element) return element.textContent?.trim();
            }
            return '';
        };

        const getImageSrc = (selectors) => {
            for (const selector of selectors) {
                const element = document.querySelector(selector);
                if (element) return element.src || element.dataset.src;
            }
            return '';
        };

        return {
            title: getTextContent(selectors.title),
            price: getTextContent(selectors.price),
            image: getImageSrc(selectors.images),
            description: getTextContent(selectors.description),
            url: window.location.href
        };
    }

    displayProduct(product) {
        document.getElementById('product-title').textContent = product.title;
        document.getElementById('product-price').textContent = product.price;
        document.getElementById('product-description').textContent = product.description;
        
        const img = document.getElementById('product-image');
        if (product.image) {
            img.src = product.image;
            img.style.display = 'block';
        } else {
            img.style.display = 'none';
        }

        this.updateFinalPrice(50); // Default 50% markup
    }

    updateFinalPrice(markup) {
        if (!this.currentProduct?.price) return;
        
        const price = parseFloat(this.currentProduct.price.replace(/[^\d.]/g, ''));
        if (isNaN(price)) return;
        
        const finalPrice = price * (1 + markup / 100);
        document.getElementById('final-price').textContent = `$${finalPrice.toFixed(2)}`;
    }

    async importProduct() {
        if (!this.currentProduct) return;

        this.showSection('importing');
        this.updateProgress(0, 'Preparing product data...');

        try {
            const markup = parseInt(document.getElementById('markup-percent').value) || 50;
            const importImages = document.getElementById('import-images').checked;
            const importDescription = document.getElementById('import-description').checked;
            const autoPublish = document.getElementById('auto-publish').checked;

            this.updateProgress(25, 'Uploading to store...');

            const response = await fetch(this.storeUrl + '/api/products/import', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...this.currentProduct,
                    markup,
                    importImages,
                    importDescription,
                    autoPublish
                })
            });

            this.updateProgress(75, 'Processing images...');

            if (response.ok) {
                const result = await response.json();
                this.updateProgress(100, 'Import complete!');
                
                setTimeout(() => {
                    this.showImportSuccess(result);
                }, 1000);
            } else {
                throw new Error('Import failed');
            }
        } catch (error) {
            this.showImportError(error.message);
        }
    }

    updateProgress(percent, status) {
        document.getElementById('progress').style.width = `${percent}%`;
        document.getElementById('import-status').textContent = status;
    }

    showImportSuccess(result) {
        document.getElementById('view-product').onclick = () => {
            chrome.tabs.create({ url: result.productUrl });
        };
        this.showSection('import-success');
    }

    showImportError(message) {
        document.getElementById('error-message').textContent = message;
        document.getElementById('retry-import').onclick = () => {
            this.importProduct();
        };
        this.showSection('import-error');
    }

    showSection(sectionId) {
        document.querySelectorAll('.section').forEach(section => {
            section.style.display = 'none';
        });
        document.getElementById(sectionId).style.display = 'block';
    }
}

// Initialize popup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DropshipConnectorPopup();
});