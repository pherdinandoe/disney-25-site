
  // Function to animate number from 0 to target for budget amounts
  function animateValue(el, target, duration = 1000) {
    let start = 0;
    let startTime = null;

    function update(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const value = Math.min(Math.floor((progress / duration) * target), target);
      el.textContent = `$${value.toLocaleString()}`;

      if (value < target) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // Use IntersectionObserver to trigger animation when in view
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-amount'), 10);
        animateValue(el, target, 1000); // 1000 ms = 1 second
        observer.unobserve(el); // Animate only once
      }
    });
  }, {
    threshold: 0.6 // 60% in view triggers it
  });

  // Observe all elements with .dollars
  document.querySelectorAll('.dollars').forEach(el => {
    observer.observe(el);
  });
