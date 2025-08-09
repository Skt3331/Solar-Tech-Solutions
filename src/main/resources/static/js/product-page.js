/**
 * Product page optimizations to prevent flickering and improve performance
 * Enhanced for Indian market and INR currency formatting
 */
document.addEventListener('DOMContentLoaded', function() {
    // Prevent FOUC (Flash of Unstyled Content)
    document.documentElement.classList.add('js-loaded');
    
    // Optimize image loading
    const productImages = document.querySelectorAll('.product-image, .product-detail-img');
    if (productImages.length > 0) {
        productImages.forEach(img => {
            // Only apply fade-in effect once the image is loaded
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', function() {
                    img.classList.add('loaded');
                });
            }
            
            // Handle error cases
            img.addEventListener('error', function() {
                // Replace with a placeholder if image fails to load
                img.src = '/img/placeholder.jpg';
                img.classList.add('loaded');
            });
        });
    }
    
    // Format currency as INR
    function formatINR(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    }
    
    // Apply INR formatting to all price elements
    const priceElements = document.querySelectorAll('.current-price, .original-price');
    priceElements.forEach(el => {
        const text = el.textContent.trim();
        if (text.includes('₹')) {
            const amount = parseFloat(text.replace(/[^\d.-]/g, ''));
            if (!isNaN(amount)) {
                el.textContent = formatINR(amount);
            }
        }
    });
    
    // Add GST included information to price elements
    const priceContainers = document.querySelectorAll('.product-price');
    priceContainers.forEach(container => {
        if (!container.querySelector('.gst-included')) {
            const gstInfo = document.createElement('div');
            gstInfo.classList.add('gst-included');
            gstInfo.innerHTML = '<i class="fas fa-check-circle me-1"></i>Price inclusive of GST';
            container.appendChild(gstInfo);
        }
    });
    
    // Highlight Made in India badges
    const madeInIndiaBadges = document.querySelectorAll('.badge-made-in-india, .badge:contains("Made in India")');
    madeInIndiaBadges.forEach(badge => {
        badge.classList.add('badge-tricolor');
    });
    
    // Smooth hover transitions for product cards
    const productCards = document.querySelectorAll('.product-card');
    if (productCards.length > 0) {
        productCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transition = 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)';
            });
        });
    }
    
    // EMI calculator functionality
    const discountPriceElements = document.querySelectorAll('.current-price');
    discountPriceElements.forEach(el => {
        const priceText = el.textContent;
        const price = parseFloat(priceText.replace(/[^\d.-]/g, ''));
        
        if (!isNaN(price)) {
            // Calculate EMI options
            const threeMonths = price / 3;
            const sixMonths = price / 6;
            const twelveMonths = price / 12;
            
            // Create EMI info tooltip if not exists
            const parent = el.closest('.product-price');
            if (parent && !parent.querySelector('.emi-info')) {
                const emiInfo = document.createElement('div');
                emiInfo.classList.add('emi-info', 'small', 'text-muted', 'mt-1');
                emiInfo.innerHTML = `<i class="fas fa-credit-card me-1"></i>EMI from ₹${Math.round(twelveMonths).toLocaleString('en-IN')}/month`;
                parent.appendChild(emiInfo);
            }
        }
    });
    
    // Prevent layout shifts when loading new content
    window.addEventListener('resize', debounce(function() {
        const productContainer = document.querySelector('.products-container');
        if (productContainer) {
            // Lock height during resize to prevent content jumping
            const height = productContainer.offsetHeight;
            productContainer.style.minHeight = height + 'px';
            
            setTimeout(() => {
                productContainer.style.minHeight = '';
            }, 300);
        }
    }, 150));
    
    // Helper function to debounce resize events
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(context, args);
            }, wait);
        };
    }
    
    // Add smooth scrolling to pagination links
    const paginationLinks = document.querySelectorAll('.pagination .page-link');
    if (paginationLinks.length > 0) {
        paginationLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Don't handle disabled links
                if (link.parentElement.classList.contains('disabled')) return;
                
                // Smooth transition when navigating
                document.querySelector('.products-container').style.opacity = '0.6';
                document.querySelector('.products-container').style.transition = 'opacity 0.3s ease';
            });
        });
    }
    
    // Enhance certificate badges
    const certBadges = document.querySelectorAll('.certifications .badge');
    certBadges.forEach(badge => {
        badge.classList.add('certificate-badge');
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add India-themed accents where needed
    const sectionHeadings = document.querySelectorAll('h3.gradient-text, h4.gradient-text');
    sectionHeadings.forEach(heading => {
        if (!heading.nextElementSibling || !heading.nextElementSibling.classList.contains('india-accent')) {
            const accent = document.createElement('div');
            accent.classList.add('india-accent', 'mx-auto', 'mb-3');
            accent.style.maxWidth = '150px';
            heading.insertAdjacentElement('afterend', accent);
        }
    });
}); 