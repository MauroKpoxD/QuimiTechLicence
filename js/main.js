// ===== CONFIGURACIÓN DEL TEMA =====
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.init();
    }

    init() {
        const savedTheme = localStorage.getItem('quimitech-theme') || 'dark';
        this.setTheme(savedTheme);
        this.bindEvents();
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('quimitech-theme', theme);
        this.updateThemeIcon(theme);
    }

    updateThemeIcon(theme) {
        if (!this.themeToggle) return;
        
        const icon = this.themeToggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon';
        }
    }

    bindEvents() {
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                this.setTheme(newTheme);
            });
        }
    }
}

// ===== NAVEGACIÓN SIMPLIFICADA =====
class NavigationManager {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.init();
    }

    init() {
        this.bindNavbarScroll();
        this.setActiveNavLink();
    }

    bindNavbarScroll() {
        let ticking = false;
        
        const updateNavbar = () => {
            const scrollY = window.scrollY;
            
            if (scrollY > 100) {
                this.navbar.style.background = 'var(--navbar-scroll-bg)';
                this.navbar.style.backdropFilter = 'blur(10px)';
            } else {
                this.navbar.style.background = 'var(--navbar-bg)';
                this.navbar.style.backdropFilter = 'blur(5px)';
            }
            
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        });
    }

    setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
}

// ===== ANIMACIONES BÁSICAS =====
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
    }

    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        const elements = document.querySelectorAll('.feature-card, .spec-item');
        elements.forEach(el => observer.observe(el));
    }
}

// ===== FUNCIONALIDADES ESENCIALES =====
class UtilityManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupCopyEmail();
        this.setupConsoleWelcome();
    }

    setupCopyEmail() {
        const emailElements = document.querySelectorAll('[data-copy-email]');
        emailElements.forEach(element => {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                const email = element.getAttribute('data-copy-email') || element.textContent;
                
                navigator.clipboard.writeText(email).then(() => {
                    this.showNotification('Email copiado', 'success');
                }).catch(() => {
                    this.showNotification('Error al copiar', 'error');
                });
            });
        });
    }

    showNotification(message, type = 'info') {
        // Notificación simple sin animaciones complejas
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} position-fixed top-0 end-0 m-3`;
        notification.style.zIndex = '9999';
        notification.innerHTML = `
            <i class="bi bi-${this.getNotificationIcon(type)} me-2"></i>
            ${message}
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    getNotificationIcon(type) {
        const icons = {
            'success': 'check-circle',
            'error': 'exclamation-circle',
            'info': 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    setupConsoleWelcome() {
        console.log('QuimiTech - Software Profesional para Laboratorios');
        console.log('Soporte: sandulientos827@protonmail.com');
    }
}

// ===== INICIALIZACIÓN RÁPIDA =====
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar solo managers esenciales
    new ThemeManager();
    new NavigationManager();
    new UtilityManager();
    
    // AnimationManager solo si es necesario (menos elementos)
    if (document.querySelector('.feature-card, .spec-item')) {
        new AnimationManager();
    }
});

// Manejo de errores simple
window.addEventListener('error', (e) => {
    console.error('Error:', e.error);
});