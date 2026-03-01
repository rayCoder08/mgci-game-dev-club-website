document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.carousel-button.next');
  const prevButton = document.querySelector('.carousel-button.prev');
  const dotsContainer = document.querySelector('.carousel-dots');

  const slidesPerView = 3;
  const totalSlides = slides.length;
  const totalPages = Math.ceil(totalSlides / slidesPerView);

  // Create dots
  for (let i = 0; i < totalPages; i++) {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    dot.setAttribute('aria-label', `Slide page ${i + 1}`);
    dotsContainer.appendChild(dot);
  }

  const dots = Array.from(dotsContainer.children);
  let currentPage = 0;

  // Set initial position and active dot
  track.style.transform = 'translateX(0)';
  dots[0].classList.add('active');

  // Update dots
  const updateDots = () => {
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentPage);
    });
  };

  // Update carousel position
  const updateCarouselPosition = () => {
    const cardWidth = slides[0].getBoundingClientRect().width;
    const gapWidth = 32;
    const moveDistance = (cardWidth + gapWidth) * slidesPerView;
    const newPosition = -(currentPage * moveDistance);
    track.style.transform = `translateX(${newPosition}px)`;
  };

  // Handle next button click
  nextButton.addEventListener('click', () => {
    if (currentPage < totalPages - 1) {
      currentPage++;
      updateCarouselPosition();
      updateDots();
    }
  });

  // Handle previous button click
  prevButton.addEventListener('click', () => {
    if (currentPage > 0) {
      currentPage--;
      updateCarouselPosition();
      updateDots();
    }
  });

  // Handle dot click
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentPage = index;
      updateCarouselPosition();
      updateDots();
    });
  });

  updateDots();
});
