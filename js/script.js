document.addEventListener('DOMContentLoaded', () => {
    // Initialize Hacker Text Effect
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

    document.querySelectorAll('.hack-effect').forEach(element => {
        let iteration = 0;
        const originalText = element.dataset.value;
        let interval = null;

        // Perform effect on load
        interval = setInterval(() => {
            element.innerText = originalText
                .split("")
                .map((letter, index) => {
                    if (index < iteration) {
                        return originalText[index];
                    }
                    return letters[Math.floor(Math.random() * 26)];
                })
                .join("");

            if (iteration >= originalText.length) {
                clearInterval(interval);
            }

            iteration += 1 / 3;
        }, 30);

        // Optional: Re-trigger on hover
        element.addEventListener('mouseover', () => {
            iteration = 0;
            clearInterval(interval);
            interval = setInterval(() => {
                element.innerText = originalText
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return originalText[index];
                        }
                        return letters[Math.floor(Math.random() * 26)];
                    })
                    .join("");

                if (iteration >= originalText.length) {
                    clearInterval(interval);
                }

                iteration += 1 / 3;
            }, 30);
        });
    });

    // Animate elements on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.style.opacity = 1;
            }
        });
    });

    document.querySelectorAll('.animate-fade-up').forEach((el) => {
        observer.observe(el);
    });
});

// Modal Logic
let currentImageIndex = 0;
let galleryImages = [];
let galleryCaptions = [];

function initGallery() {
    const images = document.querySelectorAll('.gallery-item img');
    galleryImages = Array.from(images).map(img => img.src);

    // Collect captions
    const items = document.querySelectorAll('.gallery-item');
    galleryCaptions = Array.from(items).map(item => {
        const captionSpan = item.querySelector('.accent-text');
        return captionSpan ? captionSpan.innerText : '';
    });
}

document.addEventListener('DOMContentLoaded', initGallery);

function updateCaption() {
    const captionElement = document.getElementById('caption');
    if (captionElement && galleryCaptions[currentImageIndex]) {
        // Remove "View " prefix if present for cleaner look
        let text = galleryCaptions[currentImageIndex];
        if (text.startsWith("View ")) {
            text = text.substring(5);
        }
        captionElement.innerText = text;
    } else if (captionElement) {
        captionElement.innerText = '';
    }
}

function openModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');

    if (modal && modalImg) {
        modal.classList.add('active');
        modalImg.src = imageSrc;

        currentImageIndex = galleryImages.findIndex(src => src === imageSrc || src.endsWith(imageSrc) || imageSrc.endsWith(src));
        if (currentImageIndex === -1) currentImageIndex = 0; // Fallback

        updateCaption();
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function changeImage(n) {
    currentImageIndex += n;

    if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    }

    const modalImg = document.getElementById('modalImg');
    if (modalImg) {
        modalImg.src = galleryImages[currentImageIndex];
        updateCaption();
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeModal();
    if (document.getElementById('imageModal').classList.contains('active')) {
        if (e.key === "ArrowLeft") changeImage(-1);
        if (e.key === "ArrowRight") changeImage(1);
    }
});
