const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;


let particlesArray = [];
const numberOfParticles = 100;
ctx.lineCap = 'round'

const mouse = {
    x:null,
    y:null
}

window.addEventListener('mousemove', function(e){
    mouse.x = e.x
    mouse.y = e.y

    console.log(mouse.x);
})

const pumpkins = new Image();
pumpkins.src = 'pumpkins.png'

//custom line gradient
let gradient = ctx.createLinearGradient(0,0,0,canvas.height)
gradient.addColorStop(0, 'purple')
gradient.addColorStop(0.9, 'pink')
gradient.addColorStop(1, 'rgba(255,255,255,0.1)')


class Particle{
    constructor(){
        this.radius = Math.random() * 100 + 50;
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + this.radius * 2;
        this.speedY = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.angle = Math.random() * 360;
        this.spin = Math.random() < 0.5 ? 1 : -1
        this.frameX = Math.floor(Math.random() * 3);
        this.frameY = Math.floor(Math.random() * 3);
        this.spriteSize = 900 / 3
    } 

    update(){
        this.angle += 5
        this.y -= this.speedY
        this.x += this.speedX
        if(this.radius > 1) this.radius -= 0.2
    }

    draw(){
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.angle * Math.PI/360 * this.spin)

        ctx.drawImage(
            pumpkins, 
            this.frameX * this.spriteSize, 
            this.frameY * this.spriteSize, 
            this.spriteSize, 
            this.spriteSize, 
            0 - this.radius/2, 
            0 - this.radius/2, 
            this.radius, 
            this.radius
        )
       
        ctx.translate(-this.x, -this.y)
        ctx.restore()
    }
}

function init(){
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle)       
    }
}
init()


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if(particlesArray.length < numberOfParticles) {
        particlesArray.push(new Particle)
    }
    
    triangle()
    //connect()

    for (let i = 0; i < particlesArray.length; i++) {

        if ( particlesArray[i].radius <= 1){
            particlesArray.splice([i], 1)
        }

        particlesArray[i].update()
        particlesArray[i].draw()
    }

    requestAnimationFrame(animate)

}
animate()

function connect(){
    for (let i = 0; i < particlesArray.length; i++) {
        ctx.strokeStyle = gradient
        ctx.lineWidth = particlesArray[i].radius/20
        ctx.beginPath()
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
        ctx.lineTo(mouse.x, mouse.y)
        ctx.stroke()
        ctx.closePath()
    }
}

function triangle(){
    ctx.beginPath()
    ctx.moveTo(0, canvas.height)
    ctx.lineTo(mouse.x, mouse.y)
    ctx.lineTo(canvas.width, canvas.height)
    ctx.fillStyle = gradient
    ctx.fill()
    ctx.closePath()
}

window.resize = function(){
    var canvas = document.getElementById("can");
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight
}

const btn = document.querySelector('#button')
const h1 = document.querySelector('h1')

btn.addEventListener('click', ()=>{
    canvas.style.left = '-100%'
    btn.style.left = '-100%'
    h1.style.left = '-100%'
})

