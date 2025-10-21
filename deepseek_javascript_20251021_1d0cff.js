// Données des images et citations inspirantes
const inspirationData = {
    images: [
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&w=400',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=400',
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&w=400',
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&w=400'
    ],
    quotes: [
        "Parler de sa souffrance, c'est déjà commencer à guérir",
        "Vos émotions méritent d'être entendues",
        "Prendre soin de sa santé mentale est un acte de courage",
        "Vous n'êtes pas seul dans ce cheminement"
    ],
    encouragements: [
        "Merci de partager vos sentiments 🌸",
        "Votre voix compte 💫",
        "Prenez un moment pour respirer 🌿",
        "Chaque étape vers la guérison est importante 💝"
    ]
};

// Éléments DOM
let currentImageIndex = 0;

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    initializeSite();
    setupEventListeners();
    startImageCarousel();
});

function initializeSite() {
    // Ajouter le carousel d'images
    createImageCarousel();
    
    // Ajouter les citations aléatoires
    updateInspirationQuotes();
    
    // Ajouter l'heure de bienvenue
    addWelcomeTime();
    
    // Animation d'entrée des éléments
    animateElements();
}

function createImageCarousel() {
    const header = document.querySelector('header');
    
    const carouselContainer = document.createElement('div');
    carouselContainer.className = 'image-carousel';
    carouselContainer.innerHTML = `
        <div class="carousel-track">
            ${inspirationData.images.map(img => `
                <div class="carousel-slide">
                    <img src="${img}" alt="Personne en chemin de guérison">
                    <div class="slide-overlay">
                        <p>« ${inspirationData.quotes[inspirationData.images.indexOf(img)]} »</p>
                    </div>
                </div>
            `).join('')}
        </div>
        <button class="carousel-btn prev">‹</button>
        <button class="carousel-btn next">›</button>
        <div class="carousel-dots"></div>
    `;
    
    header.appendChild(carouselContainer);
    createDots();
}

function createDots() {
    const dotsContainer = document.querySelector('.carousel-dots');
    inspirationData.images.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
}

function goToSlide(index) {
    const track = document.querySelector('.carousel-track');
    const dots = document.querySelectorAll('.dot');
    const slides = document.querySelectorAll('.carousel-slide');
    
    currentImageIndex = index;
    track.style.transform = `translateX(-${index * 100}%)`;
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentImageIndex = (currentImageIndex + 1) % inspirationData.images.length;
    goToSlide(currentImageIndex);
}

function prevSlide() {
    currentImageIndex = (currentImageIndex - 1 + inspirationData.images.length) % inspirationData.images.length;
    goToSlide(currentImageIndex);
}

function startImageCarousel() {
    setInterval(nextSlide, 5000);
}

function setupEventListeners() {
    // Navigation du carousel
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('next')) nextSlide();
        if (e.target.classList.contains('prev')) prevSlide();
    });

    // Gestion de la soumission du formulaire
    const form = document.querySelector('form');
    const textarea = document.querySelector('textarea');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmission();
    });

    // Effet de focus sur le textarea
    textarea.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
        showTypingEncouragement();
    });

    textarea.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });

    // Animation au scroll
    window.addEventListener('scroll', throttle(animateOnScroll, 100));
}

function handleFormSubmission() {
    const textarea = document.querySelector('textarea');
    const message = textarea.value.trim();
    
    if (message) {
        showConfirmation(message);
        textarea.value = '';
        
        // Animation de confirmation
        const button = document.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        button.textContent = 'Message envoyé ✓';
        button.style.background = 'linear-gradient(135deg, #81c784, #2e7d32)';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = 'linear-gradient(135deg, #81c784, #4caf50)';
        }, 2000);
    }
}

function showConfirmation(message) {
    const randomEncouragement = inspirationData.encouragements[
        Math.floor(Math.random() * inspirationData.encouragements.length)
    ];
    
    const confirmation = document.createElement('div');
    confirmation.className = 'confirmation-message';
    confirmation.innerHTML = `
        <div class="confirmation-content">
            <h3>${randomEncouragement}</h3>
            <p>Nous avons reçu votre message. Prenez soin de vous.</p>
            <button class="close-btn">Fermer</button>
        </div>
    `;
    
    document.body.appendChild(confirmation);
    
    // Animation d'entrée
    setTimeout(() => confirmation.classList.add('show'), 100);
    
    // Fermeture
    confirmation.querySelector('.close-btn').addEventListener('click', function() {
        confirmation.classList.remove('show');
        setTimeout(() => confirmation.remove(), 300);
    });
}

function showTypingEncouragement() {
    const encouragements = [
        "Continuez à écrire...",
        "Vos mots ont de l'importance...",
        "Exprimez-vous librement...",
        "Prenez tout votre temps..."
    ];
    
    let encouragement = document.querySelector('.typing-encouragement');
    if (!encouragement) {
        encouragement = document.createElement('div');
        encouragement.className = 'typing-encouragement';
        document.querySelector('form').appendChild(encouragement);
    }
    
    encouragement.textContent = encouragements[Math.floor(Math.random() * encouragements.length)];
    encouragement.style.opacity = '1';
    
    setTimeout(() => {
        encouragement.style.opacity = '0';
    }, 3000);
}

function updateInspirationQuotes() {
    const quotes = document.querySelectorAll('.inspiration-quote');
    quotes.forEach(quote => {
        const randomQuote = inspirationData.quotes[
            Math.floor(Math.random() * inspirationData.quotes.length)
        ];
        quote.textContent = `"${randomQuote}"`;
    });
}

function addWelcomeTime() {
    const header = document.querySelector('header h1');
    const now = new Date();
    const hours = now.getHours();
    let greeting;
    
    if (hours < 12) greeting = "Bonjour";
    else if (hours < 18) greeting = "Bon après-midi";
    else greeting = "Bonsoir";
    
    const welcomeText = document.createElement('div');
    welcomeText.className = 'welcome-time';
    welcomeText.textContent = `${greeting}, bienvenue dans votre espace sûr`;
    welcomeText.style.fontSize = '1.1rem';
    welcomeText.style.color = '#5d4037';
    welcomeText.style.marginTop = '0.5rem';
    welcomeText.style.fontWeight = '300';
    
    header.parentElement.insertBefore(welcomeText, header.nextSibling);
}

function animateElements() {
    const elements = document.querySelectorAll('main > *');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

function animateOnScroll() {
    const elements = document.querySelectorAll('.inspiration-quote, form');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Utilitaire pour limiter la fréquence d'exécution
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Gestion des erreurs d'images
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.style.display = 'none';
    }
}, true);