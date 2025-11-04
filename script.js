// script.js - JavaScript untuk Website Kampung Kumendaman
// Versi dengan dropdown menu yang diperbaiki dan dark mode persisten

// Fungsi untuk inisialisasi
document.addEventListener('DOMContentLoaded', function() {
    console.log('Website Kampung Kumendaman - Initializing...');
    
    // Inisialisasi mobile menu
    initMobileMenu();
    
    // Inisialisasi slideshow (hanya di homepage)
    initSlideshow();
    
    // Inisialisasi dark mode
    initDarkMode();
    
    // Inisialisasi dropdown menu - YANG SUDAH DIPERBAIKI
    initDropdownMenu();
    
    // Inisialisasi smooth scroll untuk anchor links
    initSmoothScroll();
    
    // Inisialisasi form handlers
    initFormHandlers();
});

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuButtons = document.querySelectorAll('#mobileMenuButton, .mobile-menu-btn');
    
    mobileMenuButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', function() {
                const mobileMenu = document.getElementById('mobileMenu');
                if (mobileMenu) {
                    mobileMenu.classList.toggle('hidden');
                    
                    // Toggle icon menu/hamburger
                    const icon = this.querySelector('i');
                    if (icon) {
                        if (mobileMenu.classList.contains('hidden')) {
                            icon.className = 'fas fa-bars';
                        } else {
                            icon.className = 'fas fa-times';
                        }
                    }
                }
            });
        }
    });
    
    // Close mobile menu when clicking on links (for better UX)
    const mobileMenuLinks = document.querySelectorAll('#mobileMenu a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                
                // Reset icon to hamburger
                const mobileMenuButton = document.querySelector('#mobileMenuButton, .mobile-menu-btn');
                if (mobileMenuButton) {
                    const icon = mobileMenuButton.querySelector('i');
                    if (icon) {
                        icon.className = 'fas fa-bars';
                    }
                }
            }
        });
    });
}

// Slideshow Functionality (untuk homepage)
function initSlideshow() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slide-dot');
    
    if (slides.length > 0 && dots.length > 0) {
        console.log('Initializing slideshow with', slides.length, 'slides');
        
        let currentSlide = 0;
        let slideInterval;
        
        function showSlide(n) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            currentSlide = (n + slides.length) % slides.length;
            
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }
        
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const slideIndex = parseInt(this.getAttribute('data-slide'));
                console.log('Manual slide change to:', slideIndex);
                showSlide(slideIndex);
                resetSlideInterval();
            });
        });
        
        function nextSlide() {
            showSlide(currentSlide + 1);
        }
        
        function resetSlideInterval() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        }
        
        // Auto slide change
        slideInterval = setInterval(nextSlide, 5000);
        
        // Pause on hover
        const heroSection = document.querySelector('.hero-slideshow');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', () => {
                console.log('Slideshow paused');
                clearInterval(slideInterval);
            });
            
            heroSection.addEventListener('mouseleave', () => {
                console.log('Slideshow resumed');
                slideInterval = setInterval(nextSlide, 5000);
            });
        }
        
        // Initial slide show
        showSlide(0);
    }
}

// Dark Mode Functionality dengan Persistensi
function initDarkMode() {
    const themeToggle = document.getElementById('themeToggle');
    
    // Cek preferensi dark mode dari localStorage
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    console.log('Dark mode preference from storage:', isDarkMode);
    
    // Terapkan dark mode jika diperlukan
    if (isDarkMode) {
        enableDarkMode();
    }
    
    // Event listener untuk toggle dark mode
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const isCurrentlyDark = document.body.classList.contains('bg-gray-900');
            console.log('Dark mode toggle clicked. Currently dark:', isCurrentlyDark);
            
            if (isCurrentlyDark) {
                disableDarkMode();
                localStorage.setItem('darkMode', 'false');
            } else {
                enableDarkMode();
                localStorage.setItem('darkMode', 'true');
            }
        });
    }
}

function enableDarkMode() {
    console.log('Enabling dark mode');
    
    document.body.classList.add('bg-gray-900', 'text-white');
    document.body.classList.remove('bg-gray-50', 'text-gray-800');
    
    // Update header
    const header = document.querySelector('header');
    if (header) {
        header.classList.remove('bg-white');
        header.classList.add('bg-gray-800');
        
        // Update menu links in header for dark mode
        const navLinks = header.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('text-gray-700');
            link.classList.add('text-gray-300');
        });
        
        // Update dropdown menus
        const dropdownMenus = header.querySelectorAll('.dropdown-menu');
        dropdownMenus.forEach(menu => {
            menu.classList.remove('bg-white');
            menu.classList.add('bg-gray-700');
        });
        
        const dropdownItems = header.querySelectorAll('.dropdown-menu a');
        dropdownItems.forEach(item => {
            item.classList.remove('hover:bg-gray-100', 'text-gray-800');
            item.classList.add('hover:bg-gray-600', 'text-white');
        });
    }
    
    // Update footer
    const footer = document.querySelector('footer');
    if (footer) {
        footer.classList.remove('bg-gray-800');
        footer.classList.add('bg-gray-900');
    }
    
    // Update breadcrumb
    const breadcrumb = document.querySelector('.breadcrumb');
    if (breadcrumb) {
        breadcrumb.classList.remove('bg-gray-100');
        breadcrumb.classList.add('bg-gray-800');
        
        // Update breadcrumb text colors
        const breadcrumbLinks = breadcrumb.querySelectorAll('a');
        breadcrumbLinks.forEach(link => {
            link.classList.remove('text-primary');
            link.classList.add('text-blue-300');
        });
        
        const breadcrumbText = breadcrumb.querySelectorAll('.text-gray-600');
        breadcrumbText.forEach(text => {
            text.classList.remove('text-gray-600');
            text.classList.add('text-gray-300');
        });
    }
    
    // Update cards and sections
    const cards = document.querySelectorAll('.bg-white');
    cards.forEach(card => {
        if (!card.closest('header') && !card.closest('footer')) {
            card.classList.remove('bg-white');
            card.classList.add('bg-gray-800', 'text-white');
        }
    });
    
    // Update text colors in cards and content
    const grayTexts = document.querySelectorAll('.text-gray-600, .text-gray-800');
    grayTexts.forEach(text => {
        if (!text.closest('footer') && !text.closest('header')) {
            text.classList.remove('text-gray-600', 'text-gray-800');
            text.classList.add('text-gray-300');
        }
    });
    
    // Update form elements
    const formInputs = document.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.classList.add('bg-gray-700', 'text-white', 'border-gray-600');
        input.classList.remove('bg-white', 'border-gray-300');
    });
    
    // Update buttons
    const buttons = document.querySelectorAll('.btn, .btn-small');
    buttons.forEach(button => {
        if (!button.classList.contains('bg-primary')) {
            button.classList.add('bg-gray-700', 'text-white');
            button.classList.remove('bg-white', 'text-gray-800');
        }
    });
    
    // Update theme toggle button
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        themeToggle.title = 'Switch to Light Mode';
    }
    
    // Add dark mode class to body for CSS targeting
    document.body.classList.add('dark-mode-active');
}

function disableDarkMode() {
    console.log('Disabling dark mode');
    
    document.body.classList.remove('bg-gray-900', 'text-white', 'dark-mode-active');
    document.body.classList.add('bg-gray-50', 'text-gray-800');
    
    // Update header
    const header = document.querySelector('header');
    if (header) {
        header.classList.remove('bg-gray-800');
        header.classList.add('bg-white');
        
        // Update menu links in header for light mode
        const navLinks = header.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('text-gray-300');
            link.classList.add('text-gray-700');
        });
        
        // Update dropdown menus
        const dropdownMenus = header.querySelectorAll('.dropdown-menu');
        dropdownMenus.forEach(menu => {
            menu.classList.remove('bg-gray-700');
            menu.classList.add('bg-white');
        });
        
        const dropdownItems = header.querySelectorAll('.dropdown-menu a');
        dropdownItems.forEach(item => {
            item.classList.remove('hover:bg-gray-600', 'text-white');
            item.classList.add('hover:bg-gray-100', 'text-gray-800');
        });
    }
    
    // Update footer
    const footer = document.querySelector('footer');
    if (footer) {
        footer.classList.remove('bg-gray-900');
        footer.classList.add('bg-gray-800');
    }
    
    // Update breadcrumb
    const breadcrumb = document.querySelector('.breadcrumb');
    if (breadcrumb) {
        breadcrumb.classList.remove('bg-gray-800');
        breadcrumb.classList.add('bg-gray-100');
        
        // Update breadcrumb text colors
        const breadcrumbLinks = breadcrumb.querySelectorAll('a');
        breadcrumbLinks.forEach(link => {
            link.classList.remove('text-blue-300');
            link.classList.add('text-primary');
        });
        
        const breadcrumbText = breadcrumb.querySelectorAll('.text-gray-300');
        breadcrumbText.forEach(text => {
            text.classList.remove('text-gray-300');
            text.classList.add('text-gray-600');
        });
    }
    
    // Update cards and sections
    const cards = document.querySelectorAll('.bg-gray-800');
    cards.forEach(card => {
        if (!card.closest('footer') && !card.closest('header')) {
            card.classList.remove('bg-gray-800', 'text-white');
            card.classList.add('bg-white');
        }
    });
    
    // Update text colors in cards and content
    const grayTexts = document.querySelectorAll('.text-gray-300');
    grayTexts.forEach(text => {
        if (!text.closest('footer') && !text.closest('header')) {
            text.classList.remove('text-gray-300');
            text.classList.add('text-gray-600');
        }
    });
    
    // Update form elements
    const formInputs = document.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.classList.remove('bg-gray-700', 'text-white', 'border-gray-600');
        input.classList.add('bg-white', 'border-gray-300');
    });
    
    // Update buttons
    const buttons = document.querySelectorAll('.btn, .btn-small');
    buttons.forEach(button => {
        if (button.classList.contains('bg-gray-700')) {
            button.classList.remove('bg-gray-700', 'text-white');
            button.classList.add('bg-white', 'text-gray-800');
        }
    });
    
    // Update theme toggle button
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.title = 'Switch to Dark Mode';
    }
}

// Dropdown Menu Functionality - YANG SUDAH DIPERBAIKI
function initDropdownMenu() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    console.log('Initializing dropdown menus:', dropdowns.length);
    
    dropdowns.forEach(dropdown => {
        let timeoutId;
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (!menu) {
            console.warn('Dropdown menu not found for:', dropdown);
            return;
        }
        
        // Add CSS class for styling
        menu.classList.add('dropdown-content');
        
        dropdown.addEventListener('mouseenter', function() {
            console.log('Mouse entered dropdown');
            clearTimeout(timeoutId);
            showDropdownMenu(menu);
        });
        
        dropdown.addEventListener('mouseleave', function(e) {
            console.log('Mouse left dropdown');
            
            // Check if mouse moved to dropdown menu
            if (menu.contains(e.relatedTarget)) {
                console.log('Mouse moved to dropdown menu - keeping open');
                return;
            }
            
            timeoutId = setTimeout(() => {
                hideDropdownMenu(menu);
            }, 200); // Increased delay for better UX
        });
        
        // Event listeners for the dropdown menu itself
        menu.addEventListener('mouseenter', function() {
            console.log('Mouse entered dropdown menu');
            clearTimeout(timeoutId);
            showDropdownMenu(menu);
        });
        
        menu.addEventListener('mouseleave', function(e) {
            console.log('Mouse left dropdown menu');
            
            // Check if mouse moved to parent dropdown
            if (dropdown.contains(e.relatedTarget)) {
                console.log('Mouse moved to parent dropdown - keeping open');
                return;
            }
            
            timeoutId = setTimeout(() => {
                hideDropdownMenu(menu);
            }, 150);
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target) && !menu.classList.contains('hidden')) {
                hideDropdownMenu(menu);
            }
        });
        
        // Close dropdown when pressing Escape key
        menu.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !menu.classList.contains('hidden')) {
                hideDropdownMenu(menu);
            }
        });
    });
    
    console.log('Dropdown menus initialized successfully');
}

function showDropdownMenu(menu) {
    menu.classList.remove('hidden', 'opacity-0', 'invisible');
    menu.classList.add('opacity-100', 'visible');
    menu.style.transform = 'translateY(0)';
}

function hideDropdownMenu(menu) {
    menu.classList.add('opacity-0', 'invisible');
    menu.classList.remove('opacity-100', 'visible');
    menu.style.transform = 'translateY(-10px)';
    
    // Wait for transition to complete before hiding completely
    setTimeout(() => {
        if (menu.classList.contains('opacity-0')) {
            menu.classList.add('hidden');
        }
    }, 200);
}

// Smooth Scroll untuk Anchor Links
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Hanya proses anchor links internal (bukan untuk dropdowns)
            if (href !== '#' && href.startsWith('#') && !this.closest('.dropdown-menu')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    console.log('Smooth scrolling to:', targetId);
                    
                    // Hitung offset untuk sticky header
                    const header = document.querySelector('header');
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL tanpa reload page
                    history.pushState(null, null, href);
                } else {
                    console.warn('Target element not found:', targetId);
                }
            }
        });
    });
}

// Form Validation dan Submission
function initFormHandlers() {
    const contactForm = document.querySelector('.form-pesan');
    
    if (contactForm) {
        console.log('Initializing contact form');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Contact form submitted');
            
            // Validasi sederhana
            const nama = document.getElementById('nama').value.trim();
            const email = document.getElementById('email').value.trim();
            const subjek = document.getElementById('subjek').value.trim();
            const pesan = document.getElementById('pesan').value.trim();
            
            if (!nama || !email || !subjek || !pesan) {
                showNotification('Harap lengkapi semua field!', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Format email tidak valid!', 'error');
                return;
            }
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Mengirim...';
            submitButton.disabled = true;
            
            // Simulasi pengiriman form (ganti dengan AJAX call di production)
            setTimeout(() => {
                showNotification('Pesan berhasil dikirim! Kami akan segera merespons.', 'success');
                contactForm.reset();
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                console.log('Form submitted successfully');
            }, 1500);
        });
        
        // Real-time validation
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                if (this.value.trim() && !isValidEmail(this.value.trim())) {
                    this.classList.add('border-red-500');
                    this.classList.remove('border-gray-300', 'border-green-500');
                } else if (this.value.trim()) {
                    this.classList.add('border-green-500');
                    this.classList.remove('border-gray-300', 'border-red-500');
                } else {
                    this.classList.add('border-gray-300');
                    this.classList.remove('border-red-500', 'border-green-500');
                }
            });
        }
    }
}

// Validasi Email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification System
function showNotification(message, type = 'info') {
    console.log('Showing notification:', type, message);
    
    // Hapus notifikasi sebelumnya jika ada
    const existingNotification = document.querySelector('.custom-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Buat elemen notifikasi
    const notification = document.createElement('div');
    notification.className = `custom-notification fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transform transition-all duration-300 ${
        type === 'success' ? 'bg-green-500 text-white' :
        type === 'error' ? 'bg-red-500 text-white' :
        type === 'warning' ? 'bg-yellow-500 text-white' :
        'bg-blue-500 text-white'
    }`;
    
    // Add icon based on type
    const icon = type === 'success' ? 'fa-check-circle' :
                 type === 'error' ? 'fa-exclamation-circle' :
                 type === 'warning' ? 'fa-exclamation-triangle' :
                 'fa-info-circle';
    
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${icon} mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animasi masuk
    setTimeout(() => {
        notification.classList.remove('translate-x-full', 'opacity-0');
        notification.classList.add('translate-x-0', 'opacity-100');
    }, 100);
    
    // Hapus otomatis setelah 5 detik
    const autoRemoveTimeout = setTimeout(() => {
        notification.classList.remove('translate-x-0', 'opacity-100');
        notification.classList.add('translate-x-full', 'opacity-0');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    // Bisa ditutup manual dengan klik
    notification.addEventListener('click', () => {
        clearTimeout(autoRemoveTimeout);
        notification.classList.remove('translate-x-0', 'opacity-100');
        notification.classList.add('translate-x-full', 'opacity-0');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

// Lazy Loading untuk Gambar
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    console.log('Lazy loading image:', img.dataset.src);
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
        
        console.log('Lazy loading initialized');
    } else {
        console.warn('IntersectionObserver not supported, skipping lazy loading');
    }
}

// Back to Top Button
function initBackToTop() {
    // Cek jika button sudah ada
    if (document.getElementById('backToTop')) {
        return;
    }
    
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopButton.className = 'fixed bottom-6 left-6 bg-primary hover:bg-blue-800 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 opacity-0 pointer-events-none z-40';
    backToTopButton.id = 'backToTop';
    backToTopButton.title = 'Kembali ke atas';
    backToTopButton.setAttribute('aria-label', 'Kembali ke atas halaman');
    
    document.body.appendChild(backToTopButton);
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        // Debounce scroll events
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.remove('opacity-0', 'pointer-events-none', 'scale-90');
                backToTopButton.classList.add('opacity-100', 'pointer-events-auto', 'scale-100');
            } else {
                backToTopButton.classList.remove('opacity-100', 'pointer-events-auto', 'scale-100');
                backToTopButton.classList.add('opacity-0', 'pointer-events-none', 'scale-90');
            }
        }, 10);
    });
    
    console.log('Back to top button initialized');
}

// Image Gallery Lightbox (untuk halaman galeri)
function initImageLightbox() {
    const galleryImages = document.querySelectorAll('.gallery-item img, .gallery-item-large img');
    
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            const lightbox = document.createElement('div');
            lightbox.className = 'fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4';
            lightbox.innerHTML = `
                <div class="relative max-w-4xl max-h-full">
                    <img src="${this.src}" alt="${this.alt}" class="max-w-full max-h-full object-contain">
                    <button class="absolute top-4 right-4 text-white text-2xl bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-75 transition-all">
                        <i class="fas fa-times"></i>
                    </button>
                    <div class="absolute bottom-4 left-0 right-0 text-center text-white bg-black bg-opacity-50 py-2">
                        ${this.alt}
                    </div>
                </div>
            `;
            
            document.body.appendChild(lightbox);
            
            // Close lightbox
            const closeBtn = lightbox.querySelector('button');
            closeBtn.addEventListener('click', () => {
                lightbox.remove();
            });
            
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    lightbox.remove();
                }
            });
            
            // Close with Escape key
            document.addEventListener('keydown', function closeOnEscape(e) {
                if (e.key === 'Escape') {
                    lightbox.remove();
                    document.removeEventListener('keydown', closeOnEscape);
                }
            });
        });
    });
}

// Inisialisasi tambahan saat halaman fully loaded
window.addEventListener('load', function() {
    console.log('Page fully loaded - initializing additional features');
    
    initLazyLoading();
    initBackToTop();
    initImageLightbox();
    
    // Tambahkan class untuk transition yang smooth
    document.body.classList.add('transition-colors', 'duration-300');
    
    // Add loading animation removal
    const loadingElements = document.querySelectorAll('[data-loading]');
    loadingElements.forEach(el => {
        el.classList.remove('opacity-0');
        el.classList.add('opacity-100');
    });
    
    console.log('All features initialized successfully');
});

// Utility Functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Export functions untuk penggunaan di modul (jika diperlukan)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initMobileMenu,
        initSlideshow,
        initDarkMode,
        enableDarkMode,
        disableDarkMode,
        initDropdownMenu,
        initSmoothScroll,
        showNotification,
        debounce
    };
}

// Error handling global
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
});


// Log ketika script berhasil dimuat
console.log('script.js loaded successfully');