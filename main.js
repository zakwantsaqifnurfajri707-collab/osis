// ============================================
// OSIS WEBSITE - COMPLETE JAVASCRIPT
// ============================================

// ========== LOADING SCREEN ==========
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
    }, 2000);
});

// ========== NAVBAR FUNCTIONALITY ==========
// Note: Mobile menu functionality disabled to force desktop layout
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');

// Mobile menu functionality DISABLED - Force desktop layout
/*
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    // Prevent body scroll when menu is open on mobile
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Close menu when link clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});
*/

// Active link on scroll (kept for navigation highlighting)
window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========== STATISTICS COUNTER ==========
const statsCards = document.querySelectorAll('.stat-card');
let statsAnimated = false;
let galeriData = [];
let beritaData = [];

const observerStats = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            statsCards.forEach(card => {
                const count = parseInt(card.getAttribute('data-count'));
                const target = card.querySelector('h3');
                animateCounter(target, count);
            });
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) observerStats.observe(statsSection);

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 30;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (target > 100 ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

// ========== ABOUT TABS ==========
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.getAttribute('data-tab');
        
        // Remove active class from all
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked and content
        btn.classList.add('active');
        document.getElementById(`${tabName}-tab`).classList.add('active');
    });
});

// ========== GALERI & BERITA FILTER ==========
const filterBtns = document.querySelectorAll('.filter-btn');
const filterItems = document.querySelectorAll('.galeri-item, .news-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter items with stagger animation
        filterItems.forEach((item, index) => {
            if (!item.getAttribute('data-category')) return;
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.classList.remove('hidden');
                item.style.animation = `fadeInUp 0.6s ease-out ${index * 0.05}s both`;
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// ========== ASPIRASI FORM VALIDATION ==========
const aspirasiForm = document.getElementById('aspirasiForm');
const textareaAspirasi = document.getElementById('aspirasi');
const charCountSpan = document.getElementById('charCount');
const formMessage = document.getElementById('formMessage');

// Character counter
textareaAspirasi.addEventListener('input', function() {
    charCountSpan.textContent = this.value.length;
    
    // Change color based on length
    const charCount = document.querySelector('.char-count');
    if (this.value.length < 100) {
        charCount.style.color = 'var(--neon-lime)';
    } else if (this.value.length < 300) {
        charCount.style.color = 'var(--neon-cyan)';
    } else if (this.value.length < 450) {
        charCount.style.color = 'var(--neon-purple)';
    } else {
        charCount.style.color = 'var(--neon-pink)';
    }
});

// Form submission
aspirasiForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateForm()) {
        // Show success message
        formMessage.textContent = '✓ Aspirasi Anda berhasil dikirim! Terima kasih atas masukan Anda.';
        formMessage.classList.add('success');
        formMessage.classList.remove('error');
        
        // Create confetti
        createConfetti();
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Reset form after 2 seconds
        setTimeout(() => {
            this.reset();
            charCountSpan.textContent = '0';
            formMessage.classList.remove('success');
            formMessage.textContent = '';
        }, 2000);
    }
});

function validateForm() {
    const nama = document.getElementById('nama');
    const email = document.getElementById('email');
    const kelas = document.getElementById('kelas');
    const kategori = document.getElementById('kategori');
    const aspirasi = document.getElementById('aspirasi');
    const setuju = document.getElementById('setuju');
    
    let isValid = true;
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    
    // Validate nama
    if (nama.value.trim().length < 3) {
        document.getElementById('namaError').textContent = 'Nama minimal 3 karakter';
        isValid = false;
    }
    
    // Validate email
    if (!isValidEmail(email.value)) {
        document.getElementById('emailError').textContent = 'Email tidak valid';
        isValid = false;
    }
    
    // Validate kelas
    if (!kelas.value) {
        document.getElementById('kelasError').textContent = 'Pilih kelas Anda';
        isValid = false;
    }
    
    // Validate kategori
    if (!kategori.value) {
        document.getElementById('kategoriError').textContent = 'Pilih kategori aspirasi';
        isValid = false;
    }
    
    // Validate aspirasi
    if (aspirasi.value.trim().length < 20) {
        document.getElementById('aspirasiError').textContent = 'Aspirasi minimal 20 karakter';
        isValid = false;
    }
    
    // Validate checkbox
    if (!setuju.checked) {
        showToast('Anda harus menyetujui kebijakan privasi', 'error');
        isValid = false;
    }
    
    if (!isValid) {
        showToast('Mohon periksa kembali form Anda', 'error');
    }
    
    return isValid;
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ========== CONFETTI ANIMATION ==========
function createConfetti() {
    const confetti = [];
    const colors = ['#00f2fe', '#ff006e', '#8338ec', '#38f9d7', '#667eea', '#f5576c'];
    
    for (let i = 0; i < 40; i++) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight - window.innerHeight;
        const duration = Math.random() * 2 + 2;
        const delay = Math.random() * 0.5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 8 + 4;
        
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            animation: confettiFall ${duration}s linear ${delay}s forwards;
            opacity: 0.8;
        `;
        
        document.body.appendChild(particle);
        
        // Remove after animation
        setTimeout(() => particle.remove(), (duration + delay) * 1000);
    }
}

// Add confetti animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(${window.innerHeight}px) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// ========== TOAST NOTIFICATION ==========
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast show ${type}`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ========== SCROLL TO TOP BUTTON ==========
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========== PARALLAX EFFECT ==========
window.addEventListener('scroll', () => {
    const shapes = document.querySelectorAll('.shape');
    const scrollY = window.pageYOffset;
    
    shapes.forEach((shape, index) => {
        shape.style.transform = `translateY(${scrollY * (0.5 + index * 0.1)}px)`;
    });
});

// ========== MEMBER CARDS HOVER EFFECT ==========
const memberCards = document.querySelectorAll('.member-card');

memberCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 0 30px rgba(0, 242, 254, 0.5)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
    });
});

// ========== SMOOTH SCROLL BEHAVIOR ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ========== FORM INPUT ANIMATION ==========
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.style.transform = 'scale(1)';
    });
});

// ========== MOBILE RESPONSIVENESS ==========
// Mobile responsiveness DISABLED - Force desktop layout
/*
function handleResize() {
    if (window.innerWidth > 768) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
}

window.addEventListener('resize', handleResize);
*/

// ========== INTERSECTION OBSERVER FOR ANIMATIONS ==========
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

// Observe all animated elements
document.querySelectorAll('.card, .galeri-item, .member-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// ========== CONTEXT MENU PREVENTION FOR IMAGES ==========
document.addEventListener('contextmenu', (e) => {
    if (e.target.closest('.photo-placeholder')) {
        e.preventDefault();
    }
});

// ========== KEYBOARD NAVIGATION ==========
document.addEventListener('keydown', (e) => {
    // Escape key closes poster modal (mobile menu disabled)
    if (e.key === 'Escape') {
        // Also close poster modal
        const modal = document.getElementById('posterModal');
        if (modal.classList.contains('active')) {
            closePosterModal();
        }
    }
    
    // Enter key on form submits (if focus on textarea or input)
    if (e.key === 'Enter' && e.ctrlKey) {
        if (document.activeElement === textareaAspirasi) {
            aspirasiForm.dispatchEvent(new Event('submit'));
        }
    }
});

// ========== PRELOAD ANIMATIONS ==========
window.addEventListener('load', () => {
    // Add fade-in animation to all sections
    document.querySelectorAll('section').forEach((section, index) => {
        section.style.animation = `fadeInUp 0.8s ease-out ${index * 0.2}s both`;
    });
});

// ========== SOCIAL LINKS TRACKING ==========
const socialIcons = document.querySelectorAll('.social-icon');

socialIcons.forEach(icon => {
    icon.addEventListener('click', function(e) {
        e.preventDefault();
        // Add your social media links here
        const platform = this.getAttribute('title');
        showToast(`Membuka ${platform}...`, 'success');
    });
});

// ========== IMAGE LOADING OPTIMIZATION ==========
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ========== ACCESSIBILITY IMPROVEMENTS ==========
// Add focus visible styles
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ========== PERFORMANCE OPTIMIZATION ==========
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for frequent events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========== INIT FUNCTION ==========
function init() {
    console.log('✓ OSIS Website loaded successfully');
    console.log('✓ All features initialized');

    // Initialize theme toggle and other interactive features
    initThemeToggle();

    // Show initial toast
    setTimeout(() => {
        showToast('🎓 Selamat datang di website OSIS kami!', 'success');
    }, 2500);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ========== ADVANCED MOUSE TRACKING FOR CARDS ==========
document.querySelectorAll('.member-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate rotation based on mouse position
        const rotateX = (y - rect.height / 2) * 0.1;
        const rotateY = (x - rect.width / 2) * -0.1;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// ========== PROGRAM TABS ==========
const programTabs = document.querySelectorAll('.program-tab-btn');
const programContents = document.querySelectorAll('.program-content');

programTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const programId = tab.getAttribute('data-program');
        
        // Remove active class from all
        programTabs.forEach(t => t.classList.remove('active'));
        programContents.forEach(content => content.classList.remove('active'));
        
        // Add active class
        tab.classList.add('active');
        document.getElementById(`${programId}-content`).classList.add('active');
    });
});

// ========== FAQ ACCORDION ==========
const faqHeaders = document.querySelectorAll('.faq-header');

faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const faqItem = header.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all other FAQ items
        document.querySelectorAll('.faq-item.active').forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
            }
        });
        
        // Toggle current item
        faqItem.classList.toggle('active');
        
        if (!isActive) {
            // Scroll into view if opening
            setTimeout(() => {
                faqItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
    });
});

// ========== LIVE CHAT FUNCTION ==========
function openLiveChat() {
    showToast('💬 Live Chat dibuka (Demo Mode)', 'success');
    console.log('Live Chat opened - In production, integrate with real chat service');
    
    // You can integrate real chat services here like:
    // - Tawk.io
    // - Intercom
    // - Crisp
    // - Facebook Messenger
    // - WhatsApp Business
}

// ========== AUTO-EXPAND FIRST FAQ ==========
const firstFAQ = document.querySelector('.faq-item');
if (firstFAQ) {
    firstFAQ.classList.add('active');
}

// ========== POSTER FILTER ==========
const posterFilterBtns = document.querySelectorAll('.poster-filter-btn');
const posterCards = document.querySelectorAll('.poster-card');

posterFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        
        // Update active button
        posterFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter poster dengan smooth animation
        posterCards.forEach((card, index) => {
            if (filter === 'semua' || card.getAttribute('data-type') === filter) {
                card.classList.remove('hidden');
                card.style.animation = `fadeInUp 0.6s ease-out ${index * 0.05}s both`;
            } else {
                card.classList.add('hidden');
            }
        });
        
        // Update stats
        updatePosterStats();
    });
});

// ========== UPDATE POSTER STATS ==========
function updatePosterStats() {
    const visibleCards = document.querySelectorAll('.poster-card:not(.hidden)');
    const latestCards = document.querySelectorAll('.poster-card[data-type="terbaru"]:not(.hidden)').length;
    const archiveCards = document.querySelectorAll('.poster-card[data-type="lama"]:not(.hidden)').length;
    
    document.getElementById('totalPosters').textContent = visibleCards.length;
    document.getElementById('latestCount').textContent = latestCards;
    document.getElementById('archiveCount').textContent = archiveCards;
}

// ========== VIEW POSTER FUNCTION ==========
function viewPoster(button) {
    const card = button.closest('.poster-card');
    const title = card.querySelector('h4').textContent;
    const date = card.querySelector('.poster-date').textContent.trim();
    const desc = card.querySelector('.poster-desc').textContent;
    
    // Set modal content
    document.getElementById('posterModalTitle').textContent = title;
    document.getElementById('posterModalDate').textContent = date;
    document.getElementById('posterModalDescription').textContent = desc;
    
    // Open modal
    const modal = document.getElementById('posterModal');
    modal.classList.add('active');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Log
    console.log('Poster Title:', title);
}

// ========== CLOSE POSTER MODAL ==========
function closePosterModal() {
    const modal = document.getElementById('posterModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ========== DOWNLOAD POSTER ==========
function downloadPoster() {
    const title = document.getElementById('posterModalTitle').textContent;
    showToast(`⬇️ Mengunduh ${title.substring(0, 20)}...`, 'success');
    // Dalam production, ganti dengan actual download link
    console.log('Download poster:', title);
}

// ========== SHARE POSTER FROM MODAL ==========
function sharePosterModal() {
    const title = document.getElementById('posterModalTitle').textContent;
    const shareText = `Lihat poster OSIS: ${title}\n\nKunjungi website OSIS kami untuk melihat lebih banyak poster!`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Poster OSIS',
            text: shareText,
            url: window.location.href
        }).catch(err => console.log('Error sharing:', err));
    } else {
        navigator.clipboard.writeText(shareText).then(() => {
            showToast('📋 Teks poster disalin ke clipboard!', 'success');
        }).catch(err => {
            showToast('Gagal menyalin poster', 'error');
        });
    }
}

// ========== SHARE POSTER FUNCTION ==========
function sharePoster(button) {
    const card = button.closest('.poster-card');
    const title = card.querySelector('h4').textContent;
    
    // Text untuk dibagikan
    const shareText = `Lihat poster OSIS: ${title}\n\nKunjungi website OSIS kami untuk melihat lebih banyak poster!`;
    
    // Cek apakah browser support share API
    if (navigator.share) {
        navigator.share({
            title: 'Poster OSIS',
            text: shareText,
            url: window.location.href
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback: copy ke clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            showToast('📋 Teks poster disalin ke clipboard!', 'success');
        }).catch(err => {
            showToast('Gagal menyalin poster', 'error');
        });
    }
}

console.log('%c OSIS Website v2.0', 'color: #00f2fe; font-size: 16px; font-weight: bold;');
console.log('%c © 2024 OSIS - Organisasi Siswa Intra Sekolah', 'color: #38f9d7;');

// ========== DASHBOARD STATISTIK ==========
// Counter animation for dashboard metrics
function animateCounters() {
    const counters = document.querySelectorAll('.metric-value');
    const speed = 200; // Animation speed

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / speed;

        function updateCount() {
            const count = +counter.innerText;
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        }

        updateCount();
    });
}

// Progress bar animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');

    progressBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        bar.style.width = targetWidth;
    });
}

// ========== TIMELINE FUNCTIONALITY ==========
// Timeline scroll animation
function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.5 });

    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// ========== TESTIMONIAL SLIDER ==========
// Testimonial slider functionality
function initTestimonialSlider() {
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let currentIndex = 0;
    let autoPlayInterval;

    function showTestimonial(index) {
        // Hide all testimonials
        testimonialItems.forEach(item => {
            item.classList.remove('active');
        });

        // Remove active class from dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Show current testimonial
        testimonialItems[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }

    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonialItems.length;
        showTestimonial(currentIndex);
    }

    function prevTestimonial() {
        currentIndex = (currentIndex - 1 + testimonialItems.length) % testimonialItems.length;
        showTestimonial(currentIndex);
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextTestimonial, 5000); // Change every 5 seconds
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', () => {
        nextTestimonial();
        stopAutoPlay();
        startAutoPlay();
    });

    if (prevBtn) prevBtn.addEventListener('click', () => {
        prevTestimonial();
        stopAutoPlay();
        startAutoPlay();
    });

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
            stopAutoPlay();
            startAutoPlay();
        });
    });

    // Pause on hover
    const testimonialContainer = document.querySelector('.testimonial-container');
    if (testimonialContainer) {
        testimonialContainer.addEventListener('mouseenter', stopAutoPlay);
        testimonialContainer.addEventListener('mouseleave', startAutoPlay);
    }

    // Start auto play
    startAutoPlay();
}

// ========== THEME TOGGLE ==========
// Dark/Light mode toggle
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;

    // Check for saved theme preference or default to dark mode
    const currentTheme = localStorage.getItem('theme') || 'dark';
    body.classList.toggle('light-mode', currentTheme === 'light');

    // Update toggle icon
    updateThemeIcon();

    function updateThemeIcon() {
        const icon = themeToggle.querySelector('i');
        if (body.classList.contains('light-mode')) {
            icon.className = 'fas fa-moon';
        } else {
            icon.className = 'fas fa-sun';
        }
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const theme = body.classList.contains('light-mode') ? 'light' : 'dark';
        localStorage.setItem('theme', theme);
        updateThemeIcon();

        // Show toast notification
        const themeName = theme === 'light' ? 'Terang' : 'Gelap';
        showToast(`🎨 Mode ${themeName} diaktifkan`, 'info');
    });
}

// ========== SEARCH MODAL ==========
// Search modal functionality
function initSearchModal() {
    const searchToggle = document.querySelector('.search-toggle');
    const searchModal = document.querySelector('.search-modal');
    const searchOverlay = document.querySelector('.search-overlay');
    const searchClose = document.querySelector('.search-close');
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const searchResults = document.querySelector('.search-results');
    const suggestionTags = document.querySelectorAll('.suggestion-tag');

    // Search data
    const searchData = [
        { title: 'Tentang OSIS', content: 'Organisasi Siswa Intra Sekolah', icon: 'fas fa-info-circle', section: 'about' },
        { title: 'Struktur Organisasi', content: 'Pengurus inti dan bidang-bidang OSIS', icon: 'fas fa-users', section: 'struktur' },
        { title: 'Program Kerja', content: 'Kegiatan dan acara OSIS sepanjang tahun', icon: 'fas fa-calendar-alt', section: 'program' },
        { title: 'Berita & Pengumuman', content: 'Informasi terbaru dari OSIS', icon: 'fas fa-newspaper', section: 'berita' },
        { title: 'Galeri Kegiatan', content: 'Dokumentasi foto kegiatan OSIS', icon: 'fas fa-images', section: 'galeri' },
        { title: 'Poster & Material', content: 'Koleksi poster dan materi OSIS', icon: 'fas fa-file-alt', section: 'poster' },
        { title: 'Kirim Aspirasi', content: 'Formulir untuk menyampaikan masukan', icon: 'fas fa-comment', section: 'aspirasi' },
        { title: 'Kontak Kami', content: 'Informasi kontak dan lokasi OSIS', icon: 'fas fa-phone', section: 'kontak' },
        { title: 'Dashboard Statistik', content: 'Data dan pencapaian OSIS', icon: 'fas fa-chart-bar', section: 'dashboard' },
        { title: 'Timeline Sejarah', content: 'Perjalanan OSIS dari tahun ke tahun', icon: 'fas fa-history', section: 'timeline' },
        { title: 'Testimonial Siswa', content: 'Pengalaman siswa dengan OSIS', icon: 'fas fa-star', section: 'testimonial' },
        { title: 'Chat Bot AI', content: 'Asisten virtual untuk informasi OSIS', icon: 'fas fa-robot', section: 'chatbot' }
    ];

    function openSearchModal() {
        searchModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        searchInput.focus();
    }

    function closeSearchModal() {
        searchModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        searchInput.value = '';
        showSearchPlaceholder();
    }

    function showSearchPlaceholder() {
        searchResults.innerHTML = `
            <div class="search-placeholder">
                <i class="fas fa-search"></i>
                <h4>Cari informasi OSIS...</h4>
                <p>Ketik kata kunci seperti "program", "kontak", "galeri", dll.</p>
            </div>
        `;
    }

    function performSearch(query) {
        if (!query.trim()) {
            showSearchPlaceholder();
            return;
        }

        const results = searchData.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.content.toLowerCase().includes(query.toLowerCase())
        );

        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="search-placeholder">
                    <i class="fas fa-search-minus"></i>
                    <h4>Tidak ada hasil</h4>
                    <p>Coba kata kunci lain seperti "program", "kontak", atau "galeri"</p>
                </div>
            `;
            return;
        }

        const resultsHTML = results.map(result => `
            <div class="search-result-item" onclick="scrollToSection('${result.section}')">
                <div class="search-result-icon">
                    <i class="${result.icon}"></i>
                </div>
                <div class="search-result-info">
                    <h4>${result.title}</h4>
                    <p>${result.content}</p>
                </div>
            </div>
        `).join('');

        searchResults.innerHTML = resultsHTML;
    }

    function scrollToSection(sectionId) {
        closeSearchModal();
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // Event listeners
    searchToggle.addEventListener('click', openSearchModal);
    searchOverlay.addEventListener('click', closeSearchModal);
    searchClose.addEventListener('click', closeSearchModal);

    searchInput.addEventListener('input', (e) => {
        performSearch(e.target.value);
    });

    searchBtn.addEventListener('click', () => {
        performSearch(searchInput.value);
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });

    // Suggestion tags
    suggestionTags.forEach(tag => {
        tag.addEventListener('click', () => {
            searchInput.value = tag.textContent;
            performSearch(tag.textContent);
        });
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchModal.classList.contains('active')) {
            closeSearchModal();
        }
    });

    // Initialize with placeholder
    showSearchPlaceholder();
}

// ========== GAMES SECTION ==========
// Game modal functions
function openGameModal(title, content) {
    document.getElementById('gameModalTitle').textContent = title;
    document.getElementById('gameModalBody').innerHTML = content;
    document.getElementById('gameModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeGameModal() {
    document.getElementById('gameModal').classList.remove('active');
    document.body.style.overflow = 'auto';
    // Reset any running games
    if (window.snakeGameInterval) {
        clearInterval(window.snakeGameInterval);
        window.snakeGameInterval = null;
    }
}

// ========== QUIZ GAME ==========
let currentQuizQuestion = 0;
let quizScore = 0;
let quizQuestions = [
    {
        question: "Apa singkatan dari OSIS?",
        options: ["Organisasi Siswa Intra Sekolah", "Organisasi Siswa Indonesia", "Organisasi Sekolah Indonesia", "Organisasi Siswa Sekolah"],
        correct: 0
    },
    {
        question: "Berapa jumlah bidang di OSIS?",
        options: ["4 bidang", "5 bidang", "6 bidang", "7 bidang"],
        correct: 2
    },
    {
        question: "Siapa yang memimpin OSIS?",
        options: ["Guru BK", "Kepala Sekolah", "Ketua OSIS", "Wakil Kepala Sekolah"],
        correct: 2
    },
    {
        question: "Apa tujuan utama OSIS?",
        options: ["Meningkatkan prestasi akademik", "Mengembangkan potensi siswa", "Menyelenggarakan acara sekolah", "Semua jawaban benar"],
        correct: 3
    },
    {
        question: "Bidang apa yang bertugas mengelola media sosial OSIS?",
        options: ["Bidang Program & Budaya", "Bidang Olahraga", "Bidang Humas & Media", "Bidang Sosial & Lingkungan"],
        correct: 2
    },
    {
        question: "Berapa lama masa jabatan pengurus OSIS?",
        options: ["6 bulan", "1 tahun", "2 tahun", "3 tahun"],
        correct: 1
    },
    {
        question: "Apa yang menjadi fokus Bidang Seni & Kreativitas?",
        options: ["Olahraga", "Kesenian dan kreativitas siswa", "Sosial masyarakat", "Program kerja"],
        correct: 1
    },
    {
        question: "Siapa yang membina OSIS?",
        options: ["Kepala Sekolah", "Guru Pembina OSIS", "Wali Kelas", "Semua siswa"],
        correct: 1
    }
];

function startQuizGame() {
    currentQuizQuestion = 0;
    quizScore = 0;
    showQuizQuestion();
}

function showQuizQuestion() {
    if (currentQuizQuestion >= quizQuestions.length) {
        showQuizResult();
        return;
    }

    const question = quizQuestions[currentQuizQuestion];
    const content = `
        <div class="quiz-container">
            <div class="quiz-score">
                <span>Pertanyaan ${currentQuizQuestion + 1}/${quizQuestions.length}</span>
                <span>Skor: ${quizScore}</span>
            </div>
            <div class="quiz-question">
                <h4>${question.question}</h4>
                <div class="quiz-options">
                    ${question.options.map((option, index) => `
                        <div class="quiz-option" onclick="selectQuizAnswer(${index})">${option}</div>
                    `).join('')}
                </div>
            </div>
            <button class="quiz-next-btn" id="quizNextBtn" onclick="nextQuizQuestion()">Selanjutnya</button>
        </div>
    `;

    openGameModal('OSIS Quiz Challenge', content);
}

function selectQuizAnswer(selectedIndex) {
    const options = document.querySelectorAll('.quiz-option');
    const correctIndex = quizQuestions[currentQuizQuestion].correct;

    options.forEach((option, index) => {
        if (index === correctIndex) {
            option.classList.add('correct');
        } else if (index === selectedIndex && index !== correctIndex) {
            option.classList.add('wrong');
        }
        option.style.pointerEvents = 'none';
    });

    if (selectedIndex === correctIndex) {
        quizScore++;
        showToast('✅ Jawaban benar!', 'success');
    } else {
        showToast('❌ Jawaban salah!', 'error');
    }

    document.getElementById('quizNextBtn').style.display = 'block';
}

function nextQuizQuestion() {
    currentQuizQuestion++;
    showQuizQuestion();
}

function showQuizResult() {
    const percentage = Math.round((quizScore / quizQuestions.length) * 100);
    let message = '';

    if (percentage >= 80) {
        message = '🎉 Excellent! Kamu benar-benar mengerti OSIS!';
    } else if (percentage >= 60) {
        message = '👍 Bagus! Kamu cukup paham tentang OSIS.';
    } else if (percentage >= 40) {
        message = '🤔 Lumayan! Belajar lagi ya tentang OSIS.';
    } else {
        message = '📚 Yuk belajar lebih banyak tentang OSIS!';
    }

    const content = `
        <div class="quiz-result">
            <h4>Quiz Selesai!</h4>
            <p>Skor kamu: ${quizScore}/${quizQuestions.length} (${percentage}%)</p>
            <p>${message}</p>
            <button class="quiz-restart-btn" onclick="startQuizGame()">Main Lagi</button>
        </div>
    `;

    openGameModal('Hasil Quiz OSIS', content);
}

// ========== MEMORY CARD GAME ==========
let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;
let memoryMoves = 0;
let memoryGameStarted = false;

const memoryCardIcons = [
    'fas fa-graduation-cap', 'fas fa-users', 'fas fa-calendar-alt',
    'fas fa-trophy', 'fas fa-microphone', 'fas fa-palette',
    'fas fa-volleyball-ball', 'fas fa-camera'
];

function startMemoryGame() {
    memoryCards = [];
    flippedCards = [];
    matchedPairs = 0;
    memoryMoves = 0;
    memoryGameStarted = false;

    // Create card pairs
    const cardPairs = [...memoryCardIcons, ...memoryCardIcons];
    // Shuffle cards
    for (let i = cardPairs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardPairs[i], cardPairs[j]] = [cardPairs[j], cardPairs[i]];
    }

    const content = `
        <div class="memory-game">
            <div class="memory-stats">
                <span>Gerakan: ${memoryMoves}</span>
                <span>Pasangan: ${matchedPairs}/8</span>
            </div>
            <div class="memory-grid">
                ${cardPairs.map((icon, index) => `
                    <div class="memory-card" data-icon="${icon}" data-index="${index}" onclick="flipMemoryCard(this)">
                        <i class="${icon}"></i>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    openGameModal('Memory Card OSIS', content);
}

function flipMemoryCard(card) {
    if (flippedCards.length >= 2 || card.classList.contains('flipped') || card.classList.contains('matched')) {
        return;
    }

    card.classList.add('flipped');
    flippedCards.push(card);

    if (!memoryGameStarted) {
        memoryGameStarted = true;
    }

    if (flippedCards.length === 2) {
        memoryMoves++;
        updateMemoryStats();

        const [card1, card2] = flippedCards;
        const icon1 = card1.dataset.icon;
        const icon2 = card2.dataset.icon;

        if (icon1 === icon2) {
            // Match found
            matchedPairs++;
            flippedCards = [];
            card1.classList.add('matched');
            card2.classList.add('matched');
            showToast('🎉 Cocok!', 'success');

            if (matchedPairs === 8) {
                setTimeout(() => showMemoryResult(), 500);
            }
        } else {
            // No match
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                flippedCards = [];
            }, 1000);
        }
    }
}

function updateMemoryStats() {
    const stats = document.querySelector('.memory-stats');
    if (stats) {
        stats.innerHTML = `
            <span>Gerakan: ${memoryMoves}</span>
            <span>Pasangan: ${matchedPairs}/8</span>
        `;
    }
}

function showMemoryResult() {
    let message = '';
    if (memoryMoves <= 12) {
        message = '🎉 Fantastic! Memori kamu luar biasa!';
    } else if (memoryMoves <= 16) {
        message = '👍 Bagus! Kamu punya memori yang baik.';
    } else if (memoryMoves <= 20) {
        message = '🤔 Lumayan! Coba lagi untuk skor lebih baik.';
    } else {
        message = '💪 Terus latihan! Memori bisa ditingkatkan.';
    }

    const content = `
        <div class="memory-result">
            <h4>Selamat! Game Selesai!</h4>
            <p>Gerakan: ${memoryMoves}</p>
            <p>${message}</p>
            <button class="memory-restart-btn" onclick="startMemoryGame()">Main Lagi</button>
        </div>
    `;

    openGameModal('Hasil Memory Game', content);
}

// ========== SNAKE GAME ==========
let snake = [{x: 10, y: 10}];
let food = {};
let direction = {x: 0, y: 0};
let snakeScore = 0;
let snakeGameRunning = false;
let snakeCanvas, snakeCtx;

function startSnakeGame() {
    snake = [{x: 10, y: 10}];
    direction = {x: 0, y: 0};
    snakeScore = 0;
    snakeGameRunning = false;

    const content = `
        <div class="snake-game">
            <div class="snake-stats">
                <span>Skor: ${snakeScore}</span>
                <span id="snakeStatus">Tekan START untuk mulai</span>
            </div>
            <canvas id="snakeCanvas" class="snake-canvas" width="400" height="400"></canvas>
            <div class="snake-controls">
                <div class="snake-buttons">
                    <button class="snake-btn up" onclick="changeSnakeDirection(0, -1)">↑</button>
                    <button class="snake-btn left" onclick="changeSnakeDirection(-1, 0)">←</button>
                    <button class="snake-btn right" onclick="changeSnakeDirection(1, 0)">→</button>
                    <button class="snake-btn down" onclick="changeSnakeDirection(0, 1)">↓</button>
                </div>
                <button class="snake-game-btn" id="snakeStartBtn" onclick="toggleSnakeGame()">START</button>
            </div>
            <div class="snake-instructions">
                <h5>Cara Bermain:</h5>
                <ul>
                    <li>Makan makanan merah untuk mendapatkan poin</li>
                    <li>Hindari menabrak dinding atau tubuh sendiri</li>
                    <li>Gunakan tombol panah atau klik tombol kontrol</li>
                    <li>Tekan START untuk memulai, PAUSE untuk berhenti</li>
                </ul>
            </div>
        </div>
    `;

    openGameModal('Snake OSIS', content);

    // Initialize canvas after modal is open
    setTimeout(() => {
        snakeCanvas = document.getElementById('snakeCanvas');
        snakeCtx = snakeCanvas.getContext('2d');
        generateFood();
        drawSnakeGame();
    }, 100);
}

function toggleSnakeGame() {
    const startBtn = document.getElementById('snakeStartBtn');
    const statusSpan = document.getElementById('snakeStatus');

    if (snakeGameRunning) {
        // Pause game
        clearInterval(window.snakeGameInterval);
        window.snakeGameInterval = null;
        snakeGameRunning = false;
        startBtn.textContent = 'RESUME';
        statusSpan.textContent = 'Game dijeda';
    } else {
        // Start/Resume game
        window.snakeGameInterval = setInterval(gameLoop, 150);
        snakeGameRunning = true;
        startBtn.textContent = 'PAUSE';
        statusSpan.textContent = 'Game berjalan';
    }
}

function changeSnakeDirection(dx, dy) {
    // Prevent reverse direction
    if ((dx === 1 && direction.x === -1) ||
        (dx === -1 && direction.x === 1) ||
        (dy === 1 && direction.y === -1) ||
        (dy === -1 && direction.y === 1)) {
        return;
    }

    direction = {x: dx, y: dy};
}

function generateFood() {
    food = {
        x: Math.floor(Math.random() * 20),
        y: Math.floor(Math.random() * 20)
    };

    // Make sure food doesn't spawn on snake
    for (let segment of snake) {
        if (segment.x === food.x && segment.y === food.y) {
            generateFood();
            return;
        }
    }
}

function gameLoop() {
    moveSnake();
    checkCollision();
    drawSnakeGame();
}

function moveSnake() {
    const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};
    snake.unshift(head);

    // Check if food eaten
    if (head.x === food.x && head.y === food.y) {
        snakeScore += 10;
        updateSnakeScore();
        generateFood();
        showToast('🍎 +10 poin!', 'success');
    } else {
        snake.pop();
    }
}

function checkCollision() {
    const head = snake[0];

    // Wall collision
    if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
        gameOver();
        return;
    }

    // Self collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
            return;
        }
    }
}

function gameOver() {
    clearInterval(window.snakeGameInterval);
    window.snakeGameInterval = null;
    snakeGameRunning = false;

    const startBtn = document.getElementById('snakeStartBtn');
    const statusSpan = document.getElementById('snakeStatus');

    startBtn.textContent = 'GAME OVER';
    startBtn.onclick = () => startSnakeGame();
    statusSpan.textContent = 'Game berakhir';

    showToast(`💀 Game Over! Skor: ${snakeScore}`, 'error');
}

function drawSnakeGame() {
    if (!snakeCtx) return;

    // Clear canvas
    snakeCtx.fillStyle = 'rgba(10, 14, 39, 0.8)';
    snakeCtx.fillRect(0, 0, 400, 400);

    // Draw grid
    snakeCtx.strokeStyle = 'rgba(0, 242, 254, 0.1)';
    snakeCtx.lineWidth = 1;
    for (let i = 0; i <= 20; i++) {
        snakeCtx.beginPath();
        snakeCtx.moveTo(i * 20, 0);
        snakeCtx.lineTo(i * 20, 400);
        snakeCtx.stroke();

        snakeCtx.beginPath();
        snakeCtx.moveTo(0, i * 20);
        snakeCtx.lineTo(400, i * 20);
        snakeCtx.stroke();
    }

    // Draw snake
    snake.forEach((segment, index) => {
        if (index === 0) {
            // Head
            snakeCtx.fillStyle = '#00f2fe';
        } else {
            // Body
            snakeCtx.fillStyle = '#38f9d7';
        }
        snakeCtx.fillRect(segment.x * 20, segment.y * 20, 20, 20);

        // Border
        snakeCtx.strokeStyle = '#1a1f4b';
        snakeCtx.lineWidth = 2;
        snakeCtx.strokeRect(segment.x * 20, segment.y * 20, 20, 20);
    });

    // Draw food
    snakeCtx.fillStyle = '#ff006e';
    snakeCtx.fillRect(food.x * 20, food.y * 20, 20, 20);

    // Food border
    snakeCtx.strokeStyle = '#1a1f4b';
    snakeCtx.lineWidth = 2;
    snakeCtx.strokeRect(food.x * 20, food.y * 20, 20, 20);
}

function updateSnakeScore() {
    const scoreSpan = document.querySelector('.snake-stats span:first-child');
    if (scoreSpan) {
        scoreSpan.textContent = `Skor: ${snakeScore}`;
    }
}

// ========== ADDITIONAL GAMES ==========
let guessNumberTarget = 0;
let guessNumberAttempts = 0;
const guessNumberMaxAttempts = 5;
let scrambleAnswer = '';
let scrambleScrambled = '';
let ticTacToeBoard = [];
let ticTacToePlayer = 'X';
let ticTacToeActive = false;

function startGuessNumberGame() {
    guessNumberTarget = Math.floor(Math.random() * 30) + 1;
    guessNumberAttempts = 0;

    const content = `
        <div class="guess-number-game">
            <p>Temukan angka rahasia antara <strong>1</strong> sampai <strong>30</strong>. Kamu memiliki <strong>${guessNumberMaxAttempts}</strong> kesempatan.</p>
            <div class="guess-input-row">
                <input id="guessNumberInput" type="number" min="1" max="30" placeholder="Masukkan angka..." />
                <button class="game-play-btn" onclick="submitGuessNumber()">Tebak</button>
            </div>
            <p class="guess-hint" id="guessNumberHint">Kesempatan tersisa: ${guessNumberMaxAttempts}</p>
            <button class="game-play-btn" onclick="startGuessNumberGame()">Mulai Ulang</button>
        </div>
    `;

    openGameModal('Tebak Angka OSIS', content);
}

function submitGuessNumber() {
    const input = document.getElementById('guessNumberInput');
    const guess = Number(input.value);
    const hint = document.getElementById('guessNumberHint');

    if (!guess || guess < 1 || guess > 30) {
        showToast('Masukkan angka valid antara 1 sampai 30.', 'error');
        return;
    }

    guessNumberAttempts++;
    const remaining = guessNumberMaxAttempts - guessNumberAttempts;

    if (guess === guessNumberTarget) {
        showToast('🎉 Tepat sekali! Kamu berhasil menebak angka.', 'success');
        hint.textContent = `Selamat! Angka yang dicari adalah ${guessNumberTarget}.`;
        input.disabled = true;
        return;
    }

    if (remaining <= 0) {
        showToast(`😢 Game berakhir. Angka yang benar adalah ${guessNumberTarget}.`, 'error');
        hint.textContent = `Game selesai. Angka benar: ${guessNumberTarget}.`;
        input.disabled = true;
        return;
    }

    if (guess < guessNumberTarget) {
        hint.textContent = `Lebih tinggi! Kesempatan tersisa: ${remaining}`;
    } else {
        hint.textContent = `Lebih rendah! Kesempatan tersisa: ${remaining}`;
    }
}

function startScrambleGame() {
    const words = ['osis', 'organisasi', 'kegiatan', 'sosial', 'prestasi', 'inovasi', 'sekolah', 'pengurus'];
    scrambleAnswer = words[Math.floor(Math.random() * words.length)];
    scrambleScrambled = shuffleWord(scrambleAnswer);

    const content = `
        <div class="scramble-game">
            <p>Susun kembali kata OSIS yang acak berikut ini:</p>
            <div class="scramble-word">${scrambleScrambled}</div>
            <div class="guess-input-row">
                <input id="scrambleInput" type="text" placeholder="Ketik jawaban..." />
                <button class="game-play-btn" onclick="checkScrambleAnswer()">Cek Jawaban</button>
            </div>
            <p class="guess-hint">Petunjuk: kata terdiri dari ${scrambleAnswer.length} huruf.</p>
            <button class="game-play-btn" onclick="startScrambleGame()">Kata Baru</button>
        </div>
    `;

    openGameModal('Word Scramble OSIS', content);
}

function shuffleWord(word) {
    const letters = word.split('');
    for (let i = letters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    return letters.join('');
}

function checkScrambleAnswer() {
    const input = document.getElementById('scrambleInput');
    const guess = input.value.trim().toLowerCase();

    if (!guess) {
        showToast('Isi jawaban terlebih dahulu!', 'error');
        return;
    }

    if (guess === scrambleAnswer) {
        showToast('✅ Benar! Kamu berhasil menyusun kata.', 'success');
        input.disabled = true;
    } else {
        showToast('❌ Belum tepat, coba lagi.', 'error');
    }
}

function startTicTacToeGame() {
    ticTacToeBoard = Array(9).fill('');
    ticTacToePlayer = 'X';
    ticTacToeActive = true;

    const content = `
        <div class="tictactoe-game">
            <p class="tictactoe-status" id="ticTacToeStatus">Giliran: ${ticTacToePlayer}</p>
            <div class="tictactoe-board">
                ${Array.from({ length: 9 }).map((_, index) => `<div class="tictactoe-cell" id="tttCell${index}" onclick="playTicTacToeCell(${index})"></div>`).join('')}
            </div>
            <button class="game-play-btn" onclick="startTicTacToeGame()">Main Lagi</button>
        </div>
    `;

    openGameModal('Tic Tac Toe OSIS', content);
}

function renderTicTacToeBoard() {
    for (let index = 0; index < ticTacToeBoard.length; index++) {
        const cell = document.getElementById(`tttCell${index}`);
        if (cell) {
            cell.textContent = ticTacToeBoard[index];
        }
    }
}

function playTicTacToeCell(index) {
    if (!ticTacToeActive || ticTacToeBoard[index] !== '') {
        return;
    }

    ticTacToeBoard[index] = ticTacToePlayer;
    renderTicTacToeBoard();

    const winner = checkTicTacToeWinner();
    const status = document.getElementById('ticTacToeStatus');

    if (winner) {
        ticTacToeActive = false;
        if (status) {
            status.textContent = `Pemenang: ${winner}`;
        }
        showToast(`🎉 Pemain ${winner} menang!`, 'success');
        return;
    }

    if (!ticTacToeBoard.includes('')) {
        ticTacToeActive = false;
        if (status) {
            status.textContent = 'Permainan seri!';
        }
        showToast('🤝 Seri! Coba lagi untuk kemenangan.', 'info');
        return;
    }

    ticTacToePlayer = ticTacToePlayer === 'X' ? 'O' : 'X';
    if (status) {
        status.textContent = `Giliran: ${ticTacToePlayer}`;
    }
}

function checkTicTacToeWinner() {
    const winningPairs = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const [a, b, c] of winningPairs) {
        if (ticTacToeBoard[a] && ticTacToeBoard[a] === ticTacToeBoard[b] && ticTacToeBoard[a] === ticTacToeBoard[c]) {
            return ticTacToeBoard[a];
        }
    }

    return null;
}

// ========== AGENDA & POLLING FUNCTIONALITY ==========
const pollData = {
    motivasi: 24,
    seni: 31,
    outbound: 18,
    bazar: 29
};

function getPollData() {
    const storedData = localStorage.getItem('osisPollData');
    return storedData ? JSON.parse(storedData) : pollData;
}

function savePollData(data) {
    localStorage.setItem('osisPollData', JSON.stringify(data));
}

function votePoll(option) {
    const data = getPollData();
    if (!data[option]) return;

    data[option] += 1;
    savePollData(data);
    updatePollUI(data);
    showToast('✅ Terima kasih sudah memberikan suara!', 'success');
}

function updatePollUI(data) {
    const resultsContainer = document.getElementById('pollResults');
    const totalVotes = Object.values(data).reduce((sum, value) => sum + value, 0);
    const optionLabels = {
        motivasi: 'Workshop Motivasi',
        seni: 'Lomba Seni',
        outbound: 'Outbond',
        bazar: 'Bazar Amal'
    };

    if (!resultsContainer) return;

    resultsContainer.innerHTML = Object.keys(data).map(option => {
        const percent = totalVotes === 0 ? 0 : Math.round((data[option] / totalVotes) * 100);
        return `
            <div class="poll-row">
                <span>${optionLabels[option]} — ${percent}% (${data[option]} suara)</span>
                <div class="poll-bar"><div class="poll-fill" style="width: ${percent}%;"></div></div>
            </div>
        `;
    }).join('');

    const totalElement = document.getElementById('pollTotalVotes');
    if (totalElement) {
        totalElement.textContent = `Total suara: ${totalVotes}`;
    }
}

function initAgendaSection() {
    const data = getPollData();
    updatePollUI(data);
}

document.addEventListener('DOMContentLoaded', () => {
    initAgendaSection();
    console.log('✓ Agenda section initialized');
});

// ========== AI CHATBOT SYSTEM ==========
// Chatbot Knowledge Base
const chatbotKnowledge = [
    {
        keywords: ['bergabung', 'join', 'masuk osis', 'anggota', 'cara jadi', 'daftar'],
        response: 'Untuk bergabung dengan OSIS, Anda bisa:\n\n1. 📍 Datang ke ruang OSIS (di gedung utama lantai 2)\n2. 📝 Isi formulir pendaftaran\n3. 💬 Ikuti wawancara singkat dengan pengurus\n4. ✅ Tunggu hasil seleksi (biasanya 1 minggu)\n\nBiasanya pembukaan pendaftaran di awal tahun ajaran. Ada pertanyaan lain?'
    },
    {
        keywords: ['program', 'kegiatan', 'acara', 'event', 'rencana kegiatan'],
        response: 'OSIS kami memiliki berbagai program menarik sepanjang tahun:\n\n📅 SEMESTER 1:\n• Program perencanaan aktivitas\n• Outbound pengurus baru\n• Persiapan acara akhir tahun\n\n📅 SEMESTER 2:\n• Pelaksanaan kegiatan utama\n• Event olahraga & seni\n• Program pengabdian masyarakat\n\nSilakan cek bagian "Program Kerja & Kegiatan" untuk info lengkap!'
    },
    {
        keywords: ['struktur', 'organisasi', 'pengurus', 'ketua', 'bendahara', 'wakil', 'sekretaris'],
        response: 'Struktur OSIS kami terdiri dari:\n\n👑 1 PEMBINA I\n👑 1 PEMBINA II\n\n🎓 PENGURUS INTI:\n• 1 Ketua\n• 2 Wakil Ketua\n• 1 Sekretaris\n• 1 Bendahara\n\n🏢 6 BIDANG (masing-masing 5-6 anggota):\n• Bidang Program & Budaya\n• Bidang Olahraga\n• Bidang Seni & Kreativitas\n• Bidang Sosial & Lingkungan\n• Bidang Humas & Media\n• Bidang OSIS Center\n\nTotal 44 anggota aktif! Lihat halaman "Tentang Kami" untuk detail lengkap.'
    },
    {
        keywords: ['aspirasi', 'masukan', 'saran', 'feedback', 'kritik'],
        response: 'Kami sangat terbuka terhadap aspirasi dan masukan Anda! 👂\n\nCara menyampaikan aspirasi:\n\n1️⃣ Isi formulir di halaman "Kirim Aspirasi"\n2️⃣ Hubungi langsung pengurus\n3️⃣ Ikuti meeting terbuka setiap bulan\n4️⃣ Chat melalui grup resmi OSIS\n\nSetiap masukan Anda sangat berharga untuk kemajuan sekolah!\n\nIngin tahu info kontak pengurus? Tanya dengan keyword "kontak"'
    },
    {
        keywords: ['kontak', 'hubungi', 'telepon', 'whatsapp', 'no hp', 'email', 'alamat'],
        response: 'Hubungi kami melalui:\n\n📱 WhatsApp: +62 812-3456-7890\n📞 Telepon: (021) 1234-5678\n📧 Email: osis@sekolah.ac.id\n\n📍 LOKASI RUANG OSIS:\nGedung Utama - Lantai 2, Ruang 206\n\n⏰ JAM LAYANAN:\nSenin - Jumat: 15:00 - 17:00 WIB\nSabtu: 09:00 - 12:00 WIB\n\n💬 Chat whatsapp resmi OSIS juga bisa diakses 24/7!\n\nAda pertanyaan lain?'
    },
    {
        keywords: ['berita', 'pengumuman', 'update', 'terbaru', 'info', 'informasi'],
        response: 'Tetap update dengan berita & pengumuman OSIS! 📰\n\nCara mendapatkan informasi terbaru:\n\n1. Cek halaman "Berita & Pengumuman" di website ini\n2. Follow Instagram OSIS: @osis_sekolahku\n3. Join grup chat WhatsApp resmi OSIS\n4. Cek papan pengumuman di sekolah\n\nBerita terbaru kami update setiap hari! Jangan lewatkan info penting tentang acara dan pengumuman.\n\nNeed more info? Tanya langsung kepada kami 😊'
    },
    {
        keywords: ['galeri', 'foto', 'dokumentasi', 'kegiatan', 'acara', 'dokumenter'],
        response: 'Lihat koleksi foto dokumentasi kegiatan OSIS di halaman "Galeri"! 📸\n\nKoleksi meliputi:\n• Kegiatan rutin OSIS\n• Event & acara khusus\n• Outbound pengurus\n• Program sosial\n• Kompetisi & perlombaan\n\nFoto dapat difilter berdasarkan kategori kegiatan. Anda juga bisa:\n• Melihat deskripsi lengkap setiap fotos\n• Download foto berkualitas tinggi\n\nAda foto yang menarik? Bagikan ke teman-teman Anda!\n\nPunya pertanyaan tentang galeri?'
    },
    {
        keywords: ['poster', 'material', 'unduh', 'download', 'materi', 'dokumen'],
        response: 'Kumpulan poster & materi OSIS tersedia di halaman "Poster & Material"! 📄\n\nDokumen yang tersedia:\n• Poster kegiatan OSIS (terbaru & arsip)\n• Materi pelatihan\n• Panduan organisasi\n• Template & form\n• Dokumentasi kegiatan\n\nFitur poster:\n✅ Filter berdasarkan kategori\n✅ Download siap pakai\n✅ Bagikan ke media sosial\n✅ Lihat arsip poster lama\n\nSemua materi gratis & legal untuk digunakan!\n\nPerlukan poster atau materi tertentu?'
    },
    {
        keywords: ['bantuan', 'help', 'masalah', 'tidak bisa', 'error', 'problem', 'bug'],
        response: 'Ada yang bisa kami bantu? 🆘\n\nMasalah umum:\n❓ Tidak bisa download files → Cek koneksi internet\n❓ Form tidak bisa dikirim → Isi semua field yang wajib\n❓ Galeri tidak muncul → Refresh halaman\n❓ Chat error → Clear browser cache\n\nKalau masih bermasalah:\n1. Chat langsung ke WhatsApp OSIS\n2. Email ke osis@sekolah.ac.id\n3. Datang ke ruang OSIS (jam layanan)\n\nTim kami siap membantu 24/7! 😊\n\nApa masalah Anda?'
    },
    {
        keywords: ['website', 'situs', 'web', 'resmi', 'url'],
        response: 'Website resmi OSIS: https://osis.sekolah.ac.id. Di sana tersedia berita, galeri, form aspirasi, informasi kontak, dan jadwal acara terbaru.'
    },
    {
        keywords: ['visi', 'misi', 'tujuan', 'fungsi', 'peran'],
        response: 'Visi OSIS adalah membangun karakter siswa dan meningkatkan prestasi. Misi kami meliputi pengembangan potensi siswa, memperkuat partisipasi, serta membangun hubungan positif antara siswa dan sekolah.'
    }
];

// Fallback responses
const chatbotFallbacks = [
    'Hmm, pertanyaan yang menarik! 🤔 Untuk bantuan yang lebih spesifik, silakan hubungi pengurus OSIS langsung melalui WhatsApp atau kunjungi ruang OSIS.',
    'Saya tidak yakin dengan jawaban itu. 😅 Tapi Anda bisa bertanya ke pengurus OSIS di halaman "Kontak" untuk informasi lebih detail.',
    'Pertanyaan bagus! 💡 Mungkin coba tanya "aspirasi", "program", "kontak", atau "bantuan" untuk informasi lebih lengkap.',
    'Saya masih belajar untuk menjawab itu! 📚 Hubungi pengurus OSIS untuk bantuan yang lebih akurat.'
];

// Initialize chatbot on page load
function initChatbot() {
    const chatbotBubble = document.getElementById('chatbotBubble');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSendBtn = document.getElementById('chatbotSend');
    const closeBtn = document.getElementById('chatbotClose');
    const clearBtn = document.getElementById('chatbotClear');

    if (!chatbotBubble) return; // Safety check

    // Toggle chatbot window
    chatbotBubble.addEventListener('click', () => {
        chatbotWindow.classList.toggle('active');
    });

    // Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            chatbotWindow.classList.remove('active');
        });
    }

    // Clear history button
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            clearChatHistory();
        });
    }

    // Send message on button click
    chatbotSendBtn.addEventListener('click', () => {
        sendChatMessage();
    });

    // Send message on Enter key
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendChatMessage();
        }
    });

    // Add initial greeting
    const messagesContainer = document.getElementById('chatbotMessages');
    if (messagesContainer.children.length <= 0) {
        addChatMessage('Halo! 👋 Saya adalah AI Chat Bot OSIS. Tanya apa saja tentang OSIS: bergabung, program, struktur, aspirasi, kontak, berita, galeri, poster, atau bantuan teknis! 😊', 'bot');
    }
}

// Send message function
function sendChatMessage() {
    const chatbotInput = document.getElementById('chatbotInput');
    const userMessage = chatbotInput.value.trim();

    if (userMessage === '') return;

    // Add user message
    addChatMessage(userMessage, 'user');

    // Clear input
    chatbotInput.value = '';
    chatbotInput.focus();

    // Show typing indicator
    showTypingIndicator();

    // Generate AI response after delay (simulate thinking)
    setTimeout(() => {
        removeTypingIndicator();
        const botResponse = generateAIResponse(userMessage);
        addChatMessage(botResponse, 'bot');
    }, 700 + Math.random() * 300); // Random delay between 700-1000ms
}

// Add message to chat
function addChatMessage(text, sender) {
    const messagesContainer = document.getElementById('chatbotMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;

    if (sender === 'bot') {
        messageDiv.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">${text}</div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-content">${text}</div>
        `;
    }

    messagesContainer.appendChild(messageDiv);
    // Auto scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatbotMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot typing-indicator-container';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="typing-indicator">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>
    `;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Remove typing indicator
function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Generate AI response based on knowledge base
function generateAIResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();

    // Check each knowledge base for keyword match
    for (let i = 0; i < chatbotKnowledge.length; i++) {
        const kb = chatbotKnowledge[i];
        for (let j = 0; j < kb.keywords.length; j++) {
            if (lowerMessage.includes(kb.keywords[j])) {
                return kb.response;
            }
        }
    }

    // General OSIS or sekolah questions fallback
    if (/\b(osis|sekolah|pengurus|program|kegiatan|bidang|anggota|visi|misi)\b/.test(lowerMessage)) {
        return 'OSIS adalah organisasi siswa intra sekolah yang mendukung kegiatan, aspirasi, dan komunikasi siswa dengan sekolah. Kunjungi website resmi OSIS untuk berita terbaru, kontak, informasi program, dan formulir aspirasi.';
    }

    // If no match, return random fallback response
    return chatbotFallbacks[Math.floor(Math.random() * chatbotFallbacks.length)];
}

// Clear chat history
function clearChatHistory() {
    if (confirm('Apakah Anda yakin ingin menghapus riwayat chat?')) {
        const messagesContainer = document.getElementById('chatbotMessages');
        // Keep initial greeting
        messagesContainer.innerHTML = '';
        addChatMessage('Halo! 👋 Saya adalah AI Chat Bot OSIS. Tanya apa saja tentang OSIS: bergabung, program, struktur, aspirasi, kontak, berita, galeri, poster, atau bantuan teknis! 😊', 'bot');
        showToast('✨ Riwayat chat dihapus', 'success');
    }
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', initChatbot);

// Animate numbers in dashboard
function animateNumbers() {
    const metricValues = document.querySelectorAll('.metric-value');
    
    metricValues.forEach(element => {
        const target = parseInt(element.getAttribute('data-target') || element.textContent);
        const duration = 2000; // 2 seconds
        const start = 0;
        const increment = target / (duration / 16); // 60fps
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    });
}

// Update dashboard statistics
function updateDashboardStats() {
    const galeriCount = document.getElementById('galeriCount');
    const beritaCount = document.getElementById('beritaCount');
    const totalViews = document.getElementById('totalViews');
    
    if (galeriCount) {
        galeriCount.setAttribute('data-target', galeriData.length);
        galeriCount.textContent = '0';
    }
    if (beritaCount) {
        beritaCount.setAttribute('data-target', beritaData.length);
        beritaCount.textContent = '0';
    }
    if (totalViews) {
        // Calculate total views (you can modify this logic)
        const totalItems = galeriData.length + beritaData.length;
        const estimatedViews = totalItems * 25; // Assuming average 25 views per item
        totalViews.setAttribute('data-target', estimatedViews);
        totalViews.textContent = '0';
    }
    
    // Start animation after a short delay
    setTimeout(() => {
        animateNumbers();
    }, 500);
}

async function loadContentData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error('Failed to load data.json');
        }
        const data = await response.json();
        galeriData = data.galeri || [];
        beritaData = data.berita || [];
        
        // Update dashboard statistics after loading data
        updateDashboardStats();
    } catch (error) {
        console.error('Error loading data:', error);
        // Fallback data
        galeriData = [
            { id: 1, judul: 'Foto Kegiatan 1', deskripsi: 'Deskripsi foto', kategori: 'kegiatan', tanggal: '2024-01-15' },
            { id: 2, judul: 'Foto Profil 1', deskripsi: 'Deskripsi foto', kategori: 'profil', tanggal: '2024-01-14' }
        ];
        beritaData = [
            { id: 1, judul: 'Berita 1', tipe: 'Berita', tanggal: '2024-01-15', deskripsi: 'Deskripsi berita', kontenLengkap: 'Konten lengkap berita' },
            { id: 2, judul: 'Pengumuman 1', tipe: 'Pengumuman', tanggal: '2024-01-14', deskripsi: 'Deskripsi pengumuman', kontenLengkap: 'Konten lengkap pengumuman' }
        ];
        
        // Update dashboard statistics with fallback data
        updateDashboardStats();
    }
}

// Initialize content modal
async function initContentModal() {
    await loadContentData();
    
    // Direct listeners for primary buttons
    const galeriBtn = document.querySelector('[data-action="open-galeri"]');
    if (galeriBtn) {
        galeriBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openGaleriModal();
        });
    }

    const viewAllNewsBtn = document.querySelector('[data-action="view-all-news"]');
    if (viewAllNewsBtn) {
        viewAllNewsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openBeritaListModal();
        });
    }

    const beritaLinkButtons = document.querySelectorAll('[data-action="read-more"]');
    beritaLinkButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const index = parseInt(button.getAttribute('data-index'));
            if (Number.isNaN(index)) return;
            openBeritaModal(index);
        });
    });

    // Use event delegation for dynamic content and fallback interactions
    document.addEventListener('click', function(e) {
        // Handle galeri button clicks
        if (e.target.closest('[data-action="open-galeri"]')) {
            e.preventDefault();
            openGaleriModal();
            return;
        }
        
        // Handle berita link clicks
        if (e.target.closest('[data-action="read-more"]')) {
            e.preventDefault();
            const button = e.target.closest('[data-action="read-more"]');
            const index = parseInt(button.getAttribute('data-index'));
            if (Number.isNaN(index)) return;
            openBeritaModal(index);
            return;
        }
        
        // Handle "Lihat Semua Berita" button clicks
        if (e.target.closest('[data-action="view-all-news"]')) {
            e.preventDefault();
            openBeritaListModal();
            return;
        }
    });
}

// Open galeri modal with all photos
function openGaleriModal() {
    const modal = document.getElementById('contentModal');
    if (!modal) {
        console.error('Modal not found!');
        return;
    }
    
    const modalTitle = document.getElementById('modalTitle');
    const modalBadge = document.getElementById('modalBadge');
    const modalDate = document.getElementById('modalDate');
    const modalDescription = document.getElementById('modalDescription');
    const modalImageContainer = document.getElementById('modalImageContainer');
    
    modalBadge.textContent = `Galeri Lengkap (${galeriData.length} Foto)`;
    modalBadge.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    modalTitle.textContent = 'Album Foto Lengkap OSIS';
    modalDate.innerHTML = '<i class="fas fa-info-circle"></i> Klik pada foto untuk melihat detail lengkap';
    
    // Create gallery grid with enhanced layout
    let galleryHTML = '<div class="modal-gallery-grid">';
    galeriData.forEach((item, index) => {
        const iconClass = getCategoryIcon(item.kategori);
        galleryHTML += `
            <div class="modal-gallery-item" onclick="openSingleGaleriModal(${index})">
                <div class="gallery-item-image">
                    <i class="${iconClass}"></i>
                </div>
                <div class="gallery-item-info">
                    <h4>${item.judul}</h4>
                    <p class="gallery-item-category">${item.kategori}</p>
                    <p class="gallery-item-date"><i class="fas fa-calendar-alt"></i> ${item.tanggal}</p>
                    ${item.lokasi ? `<p class="gallery-item-location"><i class="fas fa-map-marker-alt"></i> ${item.lokasi}</p>` : ''}
                </div>
            </div>
        `;
    });
    galleryHTML += '</div>';
    
    modalDescription.innerHTML = galleryHTML;
    modalImageContainer.innerHTML = '<div class="image-placeholder" style="font-size: 6rem;"><i class="fas fa-images"></i></div>';
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Open single galeri item modal
function openSingleGaleriModal(index) {
    const item = galeriData[index];
    if (!item) return;
    
    const modalTitle = document.getElementById('modalTitle');
    const modalBadge = document.getElementById('modalBadge');
    const modalDate = document.getElementById('modalDate');
    const modalDescription = document.getElementById('modalDescription');
    const modalImageContainer = document.getElementById('modalImageContainer');
    
    modalBadge.textContent = item.kategori.toUpperCase();
    modalBadge.style.background = getCategoryColor(item.kategori);
    modalTitle.textContent = item.judul;
    modalDate.innerHTML = `<i class="fas fa-calendar-alt"></i> ${item.tanggal} ${item.lokasi ? `• <i class="fas fa-map-marker-alt"></i> ${item.lokasi}` : ''}`;
    
    modalDescription.innerHTML = `<p>${item.deskripsi}</p>`;
    modalImageContainer.innerHTML = '<div class="image-placeholder"><i class="fas fa-image"></i></div>';
}

// Open berita modal
function openBeritaModal(index) {
    const item = beritaData[index];
    const modal = document.getElementById('contentModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBadge = document.getElementById('modalBadge');
    const modalDate = document.getElementById('modalDate');
    const modalDescription = document.getElementById('modalDescription');
    const modalImageContainer = document.getElementById('modalImageContainer');

    if (!item) {
        modalBadge.textContent = 'Berita Tidak Ditemukan';
        modalBadge.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)';
        modalTitle.textContent = 'Maaf, berita belum tersedia.';
        modalDate.innerHTML = '<i class="fas fa-info-circle"></i> Silakan coba lagi nanti.';
        modalDescription.innerHTML = '<p>Berita sedang dimuat atau tidak tersedia. Pastikan koneksi internet Anda aktif dan refresh halaman.</p>';
        modalImageContainer.innerHTML = '<div class="image-placeholder"><i class="fas fa-newspaper"></i></div>';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        return;
    }
    
    modalBadge.textContent = item.tipe;
    modalBadge.style.background = getBadgeColor(item.tipe);
    modalTitle.textContent = item.judul;
    modalDate.innerHTML = `<i class="fas fa-calendar-alt"></i> ${item.tanggal} ${item.penulis ? `• <i class="fas fa-user"></i> ${item.penulis}` : ''} ${item.kategori ? `• <i class="fas fa-tag"></i> ${item.kategori}` : ''}`;
    
    // Format konten lengkap dengan paragraf
    const formattedContent = item.kontenLengkap.split('\n').map(paragraph => 
        paragraph.trim() ? `<p>${paragraph.replace(/\n/g, '<br>')}</p>` : ''
    ).join('');
    
    modalDescription.innerHTML = `<p><strong>${item.deskripsi}</strong></p><div class="full-content">${formattedContent}</div>`;
    modalImageContainer.innerHTML = '<div class="image-placeholder"><i class="fas fa-image"></i></div>';
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Open berita list modal
function openBeritaListModal() {
    const modal = document.getElementById('contentModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBadge = document.getElementById('modalBadge');
    const modalDate = document.getElementById('modalDate');
    const modalDescription = document.getElementById('modalDescription');
    const modalImageContainer = document.getElementById('modalImageContainer');
    
    modalBadge.textContent = `Semua Berita (${beritaData.length} Artikel)`;
    modalBadge.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
    modalTitle.textContent = 'Berita & Pengumuman Lengkap';
    modalDate.innerHTML = '<i class="fas fa-info-circle"></i> Klik pada artikel untuk membaca selengkapnya';
    
    // Create berita grid
    let beritaHTML = '<div class="modal-berita-grid">';
    beritaData.forEach((item, index) => {
        beritaHTML += `
            <div class="modal-berita-item" onclick="openBeritaModal(${index})">
                <div class="berita-item-badge">${item.tipe}</div>
                <h4>${item.judul}</h4>
                <p class="berita-item-date"><i class="fas fa-calendar-alt"></i> ${item.tanggal}</p>
                <p class="berita-item-desc">${item.deskripsi}</p>
                <span class="berita-item-link">Baca Selengkapnya →</span>
            </div>
        `;
    });
    beritaHTML += '</div>';
    
    modalDescription.innerHTML = beritaHTML;
    modalImageContainer.innerHTML = '<div class="image-placeholder" style="font-size: 6rem;"><i class="fas fa-newspaper"></i></div>';
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close content modal
function closeContentModal() {
    const modal = document.getElementById('contentModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Share content
function shareContent() {
    const title = document.getElementById('modalTitle').textContent;
    const url = window.location.href;
    
    if (navigator.share) {
        navigator.share({
            title: title,
            url: url
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(`${title} - ${url}`).then(() => {
            showToast('Link berhasil disalin!', 'success');
        });
    }
}

// Helper functions
function getCategoryColor(category) {
    const colors = {
        'kegiatan': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'profil': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'acara': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    };
    return colors[category] || colors['kegiatan'];
}

function getCategoryIcon(category) {
    const icons = {
        'kegiatan': 'fas fa-calendar-check',
        'profil': 'fas fa-user-circle',
        'acara': 'fas fa-party-horn'
    };
    return icons[category] || 'fas fa-image';
}

function getBadgeColor(type) {
    const colors = {
        'Pengumuman': 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
        'Berita': 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
        'Update': 'linear-gradient(135deg, #45b7d1 0%, #96c93d 100%)'
    };
    return colors[type] || colors['Berita'];
}

// Initialize content modal when DOM is ready
document.addEventListener('DOMContentLoaded', initContentModal);
