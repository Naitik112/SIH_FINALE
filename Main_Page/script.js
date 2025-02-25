// Mobile Menu Toggle
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const bars = menuBtn.querySelectorAll('.bar');
    bars[0].style.transform = navLinks.classList.contains('active') ? 'rotate(45deg) translate(8px, 6px)' : '';
    bars[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
    bars[2].style.transform = navLinks.classList.contains('active') ? 'rotate(-45deg) translate(7px, -5px)' : '';
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
        }
    });
});

// Duplicate sponsors for infinite scroll
const sponsorsTrack = document.querySelector('.sponsors-track');
if (sponsorsTrack) {
    sponsorsTrack.innerHTML += sponsorsTrack.innerHTML;
}

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, {
    threshold: 0.1
});

// Observe feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    observer.observe(card);
});


document.getElementById('login-btn').addEventListener('click', function () {
    window.location.href = "";
});
