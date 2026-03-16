// Loader
const hideLoader = () => {
    console.log('🔥 hideLoader called');
    const loader = document.getElementById('loader');
    const body = document.body;
    console.log('Loader element:', loader);
    if (loader) {
        console.log('✅ Adding hidden class');
        loader.classList.add('hidden');
        body.classList.remove('loading');
    } else {
        console.log('❌ Loader element not found');
    }
};

// Attendre que le DOM soit prêt
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ DOM Content Loaded');
    // Cache le loader après 2.8s (animation complète)
    setTimeout(hideLoader, 2800);
    console.log('⏱️ Timeout set for 2.8s');
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('open');
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileNav.classList.contains('open')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('open');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active Section Highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe skill cards, timeline items, etc.
    const animatedElements = document.querySelectorAll('.skill-card, .timeline-item, .project-placeholder, .contact-card');

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // Progress Bar Animation on Scroll
    const progressBars = document.querySelectorAll('.progress-fill');

    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });

    // Add current year to footer
    const currentYear = new Date().getFullYear();
    const footerText = document.querySelector('.footer-text');
    if (footerText) {
        footerText.textContent = `© ${currentYear} Ilhan Bernon. Tous droits réservés.`;
    }

    // Console Easter Egg
    console.log('%c👋 Salut ! Intéressé par le code ?', 'font-size: 20px; font-weight: bold; color: #60a5fa;');
    console.log('%cSi tu veux discuter dev ou design, contacte-moi !', 'font-size: 14px; color: #22d3ee;');
    console.log('%cEmail: ilhanbernon10@gmail.com', 'font-size: 12px; color: #cbd5e1;');
});
