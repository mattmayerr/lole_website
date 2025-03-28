document.addEventListener("DOMContentLoaded", function () {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const captionText = document.getElementById("lightbox-caption");
  const closeBtn = document.querySelector(".lightbox .close");
  const prevBtn = document.querySelector(".lightbox-prev");
  const nextBtn = document.querySelector(".lightbox-next");
  const images = Array.from(document.querySelectorAll(".lightbox-trigger"));
  let startX = 0;
  let endX = 0;

  let currentIndex = 0;

  // Trigger click on any gallery image
  images.forEach((img) => {
    img.addEventListener("click", () => {
      currentIndex = images.indexOf(img);
      openLightbox(images[currentIndex]);
    });
  });

  function openLightbox(img) {
    lightbox.style.display = "block";
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;

    // ✅ Here's the caption line:
    const caption = img.getAttribute("data-caption") || "";
    captionText.textContent = caption;
  }

  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
    lightboxImg.src = "";
    captionText.textContent = "";
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
      lightboxImg.src = "";
      captionText.textContent = "";
    }
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    openLightbox(images[currentIndex]);
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    openLightbox(images[currentIndex]);
  });

  lightbox.addEventListener("touchstart", (e) => {
    startX = e.changedTouches[0].screenX;
  });

  lightbox.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const threshold = 50; // Minimum distance to count as swipe

    if (startX - endX > threshold) {
      // Swiped left → Next
      currentIndex = (currentIndex + 1) % images.length;
      openLightbox(images[currentIndex]);
    } else if (endX - startX > threshold) {
      // Swiped right → Prev
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      openLightbox(images[currentIndex]);
    }
  }
});

function openLightbox(img) {
  lightbox.style.display = "block";
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  captionText.textContent = img.getAttribute("data-caption") || "";
}
