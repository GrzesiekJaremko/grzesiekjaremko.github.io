// Mobile menu toggle function
function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    const overlay = document.querySelector(".menu-overlay");
    
    menu.classList.toggle("open");
    icon.classList.toggle("open");
    overlay.classList.toggle("open");
    
    // Prevent scrolling when menu is open
    document.body.style.overflow = menu.classList.contains("open") ? "hidden" : "";
}

// Close menu when clicking on overlay
document.querySelector('.menu-overlay')?.addEventListener('click', toggleMenu);

// Close menu when clicking a nav link
document.querySelectorAll('.menu-links a').forEach(link => {
    link.addEventListener('click', toggleMenu);
});

// Phone number copy function
function copyPhoneNumber(event) {
    event.preventDefault();
    const phoneNumber = "+447562700294";
    
    const tooltip = document.createElement('div');
    tooltip.className = 'copy-tooltip';
    tooltip.textContent = 'Copied!';
    
    const phoneLink = event.target.closest('.phone-link');
    phoneLink.appendChild(tooltip);
    
    navigator.clipboard.writeText(phoneNumber).then(() => {
        tooltip.classList.add('show');
        setTimeout(() => {
            tooltip.classList.remove('show');
            setTimeout(() => phoneLink.removeChild(tooltip), 300);
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        tooltip.textContent = 'Failed to copy';
        tooltip.classList.add('show', 'error');
    });
}

// Loading animation
window.addEventListener('load', function() {
    setTimeout(function() {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 500);
        }
    }, 1000);
});

// Dark Mode Toggle
const darkModeToggle = document.querySelector('.dark-mode-toggle');
if (darkModeToggle) {
    const darkModeIcon = darkModeToggle.querySelector('i');
    
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        darkModeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        
        if (document.body.classList.contains('dark-mode')) {
            darkModeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            darkModeIcon.classList.replace('fa-sun', 'fa-moon');
        }
    });
}

// Carousel functionality for both regular and kennels carousel
document.addEventListener('DOMContentLoaded', function() {
    // Initialize regular carousel
    const regularCarousel = document.querySelector('.carousel:not(.carousel-kennels)');
    if (regularCarousel) {
        const inner = regularCarousel.querySelector('.carousel-inner');
        const items = regularCarousel.querySelectorAll('.carousel-item');
        const prevBtn = regularCarousel.querySelector('.carousel-control.prev');
        const nextBtn = regularCarousel.querySelector('.carousel-control.next');
        const indicators = regularCarousel.querySelectorAll('.indicator');
        
        let currentIndex = 0;
        const itemCount = items.length;

        function updateCarousel() {
            inner.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            indicators.forEach((ind, i) => {
                ind.classList.toggle('active', i === currentIndex);
            });
        }

        if (nextBtn) nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % itemCount;
            updateCarousel();
        });

        if (prevBtn) prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + itemCount) % itemCount;
            updateCarousel();
        });

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
            });
        });

        updateCarousel();
    }

    // Initialize kennels carousel
    const kennelsCarousel = document.querySelector('.carousel-kennels');
    if (kennelsCarousel) {
        const inner = kennelsCarousel.querySelector('.carousel-inner-kennels');
        const items = kennelsCarousel.querySelectorAll('.carousel-item-kennels');
        const prevBtn = kennelsCarousel.querySelector('.carousel-control-kennels.prev');
        const nextBtn = kennelsCarousel.querySelector('.carousel-control-kennels.next');
        const indicators = kennelsCarousel.querySelectorAll('.indicator');
        
        let currentIndex = 0;
        const itemCount = items.length;

        function updateCarousel() {
            const itemWidth = items[0].offsetWidth;
            const scrollPosition = currentIndex * itemWidth;
            
            inner.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
            
            indicators.forEach((ind, i) => {
                ind.classList.toggle('active', i === currentIndex);
            });
        }

        if (nextBtn) nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % itemCount;
            updateCarousel();
        });

        if (prevBtn) prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + itemCount) % itemCount;
            updateCarousel();
        });

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
            });
        });

        updateCarousel();
        
        window.addEventListener('resize', updateCarousel);
    }

    // Hamburger nav check
    const hamburgerNav = document.getElementById('hamburger-nav');
    if (!hamburgerNav) {
        console.log("Hamburger nav not found on this page");
    }
    
    // Mobile view check
    if (window.matchMedia('(max-width: 768px)').matches) {
        console.log("Mobile view detected");
        const demoLink = document.querySelector('.demo-link');
        if (demoLink) demoLink.textContent = 'Visit Live Site on Mobile';
    } else {
        console.log("Desktop view detected");
    }
});
