// particles.js

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const heroParticles = document.getElementById("hero-particles");

    if (!heroParticles) {
        console.error("Element with id 'hero-particles' not found.");
        return;
    }

    heroParticles.style.position = "absolute";
    heroParticles.appendChild(canvas);

    canvas.width = heroParticles.offsetWidth;
    canvas.height = heroParticles.offsetHeight;

    const particles = [];
    const particleCount = 25;

    class Particle {
        constructor(x, y, radius, speedX, speedY) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.speedX = speedX;
            this.speedY = speedY;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.y > canvas.height) {
                this.y = -this.radius;
                this.x = Math.random() * canvas.width;
            }

            if (this.x > canvas.width || this.x < 0) {
                this.speedX *= -1;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = "white";
            ctx.fill();
            ctx.closePath();
        }
    }

    function initParticles() {
        for (let i = 0; i < particleCount; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const radius = Math.random() * 3 + 1;
            const speedX = (Math.random() - 0.5) * 0.5;
            const speedY = Math.random() * 0.5 + 0.5;

            particles.push(new Particle(x, y, radius, speedX, speedY));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle) => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(animate);
    }

    window.addEventListener("resize", () => {
        canvas.width = heroParticles.offsetWidth;
        canvas.height = heroParticles.offsetHeight;
        particles.length = 0;
        initParticles();
    });

    initParticles();
    animate();
});