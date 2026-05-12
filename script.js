const openBtn = document.getElementById('openBtn');
const mainContent = document.getElementById('mainContent');
const music = document.getElementById('bgMusic');

// --- CONFIGURACIÓN DE MÚSICA ---
// Cambia este número por el segundo donde quieres que empiece (ej. 30, 45, 60)
const segundoExacto = 10; 

// --- EVENTO PRINCIPAL: ABRIR HISTORIA ---
openBtn.addEventListener('click', () => {
    // 1. Mostrar contenido
    mainContent.style.display = 'block';
    mainContent.classList.remove('hidden-content');

    // 2. Control de música
    music.currentTime = segundoExacto;
    music.play().catch(error => {
        console.log("El navegador bloqueó el audio o la ruta es incorrecta:", error);
    });

    // 3. Scroll suave hacia abajo
    window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
    });
});

// --- CONTADOR ---
const startDate = new Date('2026-03-11T00:00:00');

function updateCounter() {
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

setInterval(updateCounter, 1000);
updateCounter();

// --- EFECTOS DE REVELADO (SCROLL) ---
const reveals = document.querySelectorAll('.reveal');

function revealSections() {
    const triggerBottom = window.innerHeight * 0.85;
    reveals.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if(sectionTop < triggerBottom) {
            section.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealSections);
revealSections();

// --- SORPRESA Y CORAZONES ---
const surpriseBtn = document.getElementById('surpriseBtn');
const surpriseMessage = document.getElementById('surpriseMessage');

surpriseBtn.addEventListener('click', () => {
    surpriseMessage.classList.toggle('show');
    createHearts();
});

function createHearts() {
    for(let i = 0; i < 25; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '100vh';
        heart.style.fontSize = Math.random() * 20 + 20 + 'px';
        heart.style.color = '#ff6fa5';
        heart.style.zIndex = '9999';
        heart.style.pointerEvents = 'none';
        heart.style.transition = 'transform 4s linear, opacity 4s';

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.style.transform = `translateY(-120vh) rotate(${Math.random() * 360}deg)`;
            heart.style.opacity = '0';
        }, 100);

        setTimeout(() => {
            heart.remove();
        }, 4000);
    }
}