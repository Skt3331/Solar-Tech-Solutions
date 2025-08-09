// Reveal elements on scroll
function reveal() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Initialize Bootstrap tooltips
function initTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Format numbers with commas
function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Add input validation
function setupInputValidation() {
    const numberInputs = document.querySelectorAll('input[type="number"]');
    
    numberInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value < 0) {
                this.value = 0;
            }
        });
    });
}

// Update all result numbers with animations
function animateValue(element, start, end, duration) {
    if (start === end) return;
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    let current = start;
    
    const timer = setInterval(function() {
        current += increment;
        element.textContent = formatNumber(current.toFixed(2));
        if (current === end) {
            clearInterval(timer);
        }
    }, stepTime);
}

// Initialize tab functionality
function initTabs() {
    const triggerTabList = [].slice.call(document.querySelectorAll('#calculatorTabs button'));
    triggerTabList.forEach(function (triggerEl) {
        const tabTrigger = new bootstrap.Tab(triggerEl);

        triggerEl.addEventListener('click', function (event) {
            event.preventDefault();
            tabTrigger.show();
        });
    });
}

// Add smooth scrolling to all links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initTooltips();
    initTabs();
    initSmoothScroll();
    setupInputValidation();
    
    // Add scroll event listener
    window.addEventListener('scroll', reveal);
    
    // Trigger initial reveal
    reveal();
}); 