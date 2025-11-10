function toggleSparcImpactDomain(header) {
    const content = header.nextElementSibling;
    const card = header.closest('.sparc-impact-domain-card-element');
    content.classList.toggle('sparc-toggle-active');
    header.classList.toggle('sparc-toggle-active');
    card.classList.add('sparc-scroll-animate');
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('sparc-scroll-animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.sparc-impact-domain-card-element').forEach(card => {
    observer.observe(card);
});

// Smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';