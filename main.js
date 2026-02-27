document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const contactForm = document.getElementById('contact-form');

    // Sticky Navbar on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('open');

        // Basic animation for hamburger to X
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (mobileMenuToggle.classList.contains('open')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Simple Form Submission (Simulation)
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const name = formData.get('name');

            // Show success state
            contactForm.innerHTML = `
                <div class="success-message" style="text-align: center; padding: 2rem;">
                    <h3 style="color: var(--accent-primary); margin-bottom: 1rem;">Thank you, ${name}!</h3>
                    <p>Your message has been received. We'll get back to you shortly.</p>
                </div>
            `;
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, observerOptions);

    // Apply fade-in to sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in-hidden');
        observer.observe(section);
    });

    // Portfolio Placeholder Click Logic
    document.querySelectorAll('.portfolio-item-placeholder').forEach(item => {
        item.addEventListener('click', () => {
            alert('Project details coming soon! This space is reserved for a stunning local business transformation.');
        });
    });

    // Smooth Scroll for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuToggle.classList.remove('open');
                    const spans = mobileMenuToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }

                window.scrollTo({
                    top: target.offsetTop - 70, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Add extra CSS for animations through JS or you could add to styles.css
const style = document.createElement('style');
style.textContent = `
    .fade-in-hidden {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    .fade-in-visible {
        opacity: 1;
        transform: translateY(0);
    }
    .nav-links.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: var(--nav-height);
        left: 0;
        width: 100%;
        background-color: var(--bg-primary);
        padding: 2rem;
        gap: 1.5rem;
        border-bottom: 1px solid var(--bg-secondary);
    }
`;
document.head.appendChild(style);
