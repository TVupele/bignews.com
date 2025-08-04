document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle (from index.js)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileCloseBtn = document.querySelector('.mobile-close-btn');
    
    function toggleMobileMenu() {
        mobileNav.classList.toggle('active');
        mobileNavOverlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }
    
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    mobileCloseBtn.addEventListener('click', toggleMobileMenu);
    mobileNavOverlay.addEventListener('click', toggleMobileMenu);
    
    // Mobile Dropdown Menus (from index.js)
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');
    
    mobileDropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        });
    });
    
    // Sticky Header on Scroll (from index.js)
    const header = document.querySelector('.main-header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });
    
    // Category Tab Functionality
    const tabItems = document.querySelectorAll('.tab-item');
    const newsSections = document.querySelectorAll('.news-section');
    
    tabItems.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs
            tabItems.forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            const targetId = this.querySelector('a').getAttribute('href').substring(1);
            
            // Hide all news sections
            newsSections.forEach(section => {
                section.style.display = 'none';
            });
            
            if (targetId === 'all') {
                // Show all sections
                newsSections.forEach(section => {
                    section.style.display = 'block';
                });
                
                // Scroll to top of news content
                document.querySelector('.main-column').scrollIntoView({
                    behavior: 'smooth'
                });
            } else {
                // Show target section
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.style.display = 'block';
                    
                    // Scroll to the section
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Video Play Button Functionality
    const videoThumbnails = document.querySelectorAll('.video-thumbnail');
    
    videoThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const videoLink = this.closest('.video-item').querySelector('h4 a').href;
            window.location.href = videoLink;
        });
    });
    
    // Podcast Play Button Functionality
    const podcastItems = document.querySelectorAll('.podcast-item');
    
    podcastItems.forEach(item => {
        const playBtn = item.querySelector('.podcast-meta span:first-child');
        
        playBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const podcastLink = item.querySelector('h4 a').href;
            window.location.href = podcastLink;
        });
    });
    
    // Newsletter Form Submission (from index.js)
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // Simulate form submission
                this.innerHTML = `
                    <div class="newsletter-success">
                        <i class="fas fa-check-circle"></i>
                        <p>Thank you for subscribing!</p>
                    </div>
                `;
            } else {
                showError(emailInput, 'Please enter a valid email address');
            }
        });
    }
    
    // Ad Popup Functionality (from index.js)
    const adPopup = document.querySelector('.ad-popup');
    const adCloseBtn = document.querySelector('.ad-close-btn');
    
    // Show popup after 5 seconds
    setTimeout(() => {
        adPopup.classList.add('active');
        document.body.classList.add('no-scroll');
    }, 5000);
    
    // Close popup
    adCloseBtn.addEventListener('click', function() {
        adPopup.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
    
    // Ad Carousel Functionality (from index.js)
    const adCarousel = document.querySelector('.ad-carousel-inner');
    const adItems = document.querySelectorAll('.ad-carousel-item');
    const prevBtn = document.querySelector('.ad-carousel-prev');
    const nextBtn = document.querySelector('.ad-carousel-next');
    let currentAdIndex = 0;
    const adCount = adItems.length;
    
    function initAdCarousel() {
        adItems.forEach((item, index) => {
            if (index === 0) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    function showNextAd() {
        currentAdIndex = (currentAdIndex + 1) % adCount;
        updateAdCarousel();
    }
    
    function showPrevAd() {
        currentAdIndex = (currentAdIndex - 1 + adCount) % adCount;
        updateAdCarousel();
    }
    
    function updateAdCarousel() {
        const offset = -currentAdIndex * 100;
        adCarousel.style.transform = `translateX(${offset}%)`;
        
        adItems.forEach((item, index) => {
            if (index === currentAdIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    nextBtn.addEventListener('click', showNextAd);
    prevBtn.addEventListener('click', showPrevAd);
    
    // Auto-rotate ads every 10 seconds
    let adInterval = setInterval(showNextAd, 10000);
    
    // Pause auto-rotation on hover
    const adCarouselContainer = document.querySelector('.ad-carousel');
    adCarouselContainer.addEventListener('mouseenter', () => {
        clearInterval(adInterval);
    });
    
    adCarouselContainer.addEventListener('mouseleave', () => {
        adInterval = setInterval(showNextAd, 10000);
    });
    
    initAdCarousel();
    
    // Helper Functions (from index.js)
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorDisplay = formGroup.querySelector('.error-message') || document.createElement('small');
        
        errorDisplay.className = 'error-message';
        errorDisplay.style.color = 'var(--secondary-color)';
        errorDisplay.textContent = message;
        
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorDisplay);
        }
        
        input.style.borderColor = 'var(--secondary-color)';
        
        setTimeout(() => {
            errorDisplay.textContent = '';
            input.style.borderColor = '';
        }, 3000);
    }
    
    // Lazy Load Images with Intersection Observer (from index.js)
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '200px 0px'
        });
        
        lazyImages.forEach(img => {
            if (img.hasAttribute('data-src')) {
                imageObserver.observe(img);
            }
        });
    }
    
    // Dynamic Year in Footer Copyright (from index.js)
    const yearElement = document.querySelector('.copyright');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace('2025', currentYear);
    }
    
    // Search Functionality (from index.js)
    const searchBox = document.querySelector('.search-box');
    if (searchBox) {
        const searchInput = searchBox.querySelector('input');
        const searchButton = searchBox.querySelector('button');
        
        searchButton.addEventListener('click', function(e) {
            e.preventDefault();
            performSearch(searchInput.value.trim());
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(this.value.trim());
            }
        });
    }
    
    function performSearch(query) {
        if (query.length > 2) {
            window.location.href = `search.html?q=${encodeURIComponent(query)}`;
        } else {
            showError(searchInput, 'Please enter at least 3 characters');
        }
    }
    
    // Viewport Height Fix for Mobile Devices (from index.js)
    function setViewportHeight() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    
    // Add no-js class removal for progressive enhancement
    document.documentElement.classList.remove('no-js');
});

// Service Worker Registration for PWA (from index.js)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }).catch(err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}