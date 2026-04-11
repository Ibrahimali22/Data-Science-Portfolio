// Intersection Observer for scroll animations
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 50; // Reduced for faster trigger
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("scroll", reveal);
    // Trigger immediately on load for elements already in view
    setTimeout(reveal, 100); 
});

// Basic abstract particle background physics
const canvas = document.getElementById("particles-bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle {
    constructor(x, y, dx, dy, size) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.size = size;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = "rgba(0, 242, 254, 0.3)";
        ctx.fill();
    }
    update() {
        if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
        if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

function init() {
    particlesArray = [];
    const numParticles = 80;
    for (let i = 0; i < numParticles; i++) {
        let size = Math.random() * 2 + 0.5;
        let x = Math.random() * (innerWidth - size * 2);
        let y = Math.random() * (innerHeight - size * 2);
        let dx = (Math.random() - 0.5) * 0.5;
        let dy = (Math.random() - 0.5) * 0.5;
        particlesArray.push(new Particle(x, y, dx, dy, size));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
}

window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

init();
animate();
