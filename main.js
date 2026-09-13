/* ==========================================================================
   WAHAB JEWELLERS — MAIN INTERACTIVE LOGIC
   Lenis Smooth Scroll, GSAP Animations, Live Gold Rates & Dynamic Forms
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lenis Smooth Scrolling
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothTouch: true
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // 2. GSAP ScrollTrigger Animations
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Fade-in effect for glass cards
    gsap.utils.toArray('.glass-card, .product-card').forEach((card) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out'
      });
    });

    // Fade-in titles
    gsap.utils.toArray('.section-header').forEach((header) => {
      gsap.from(header, {
        scrollTrigger: {
          trigger: header,
          start: 'top 90%'
        },
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out'
      });
    });
  }

  // 3. Live Gold Rate Updates (Simulated Live Data stream for Lahore Market)
  const updateGoldRates = () => {
    const timeElem = document.getElementById('rate-timestamp');
    if (timeElem) {
      const now = new Date();
      timeElem.innerText = now.toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' });
    }
  };
  updateGoldRates();

  // 4. Booking Form Handling
  const bookingForm = document.getElementById('consultation-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('booking-name').value;
      const service = document.getElementById('booking-service').value;
      
      const text = encodeURIComponent(`Hello Wahab Jewellers! My name is ${name}. I would like to book a private consultation at Liberty Market for: ${service}.`);
      window.open(`https://wa.me/923315550421?text=${text}`, '_blank');
    });
  }
});
