var particles = [];
var numParticles = 50;
var distance = 100;

var width;
var height;

var Particle = {
  x: 0,
  y: 0,
  vx: 1,
  vy: 1,
  radius: 0.1,
  wander: 50,
  color: '#fff',
  init: function(_x, _y) {
    this.x = _x;
    this.y = _y;
    this.theta = random( TWO_PI );
    this.alive = true;
  },
  update: function() {
    if (this.radius < 0.5) {
      this.radius += 0.01;
    }
    this.x += this.vx;
    this.y += this.vy;
    this.theta += random( -0.5, 0.5 ) * this.wander;
    this.vx += sin( this.theta ) * 0.1;
    this.vy += cos( this.theta ) * 0.1;
    if (this.x < 0 || this.x > width) {
      this.alive = false;
    }
    if (this.y < 0 || this.y > height) {
      this.alive = false;
    }
  },
  draw: function(ctx) {
    ctx.beginPath();
    ctx.arc( this.x, this.y, this.radius, 0, TWO_PI );
    ctx.fillStyle = this.color;
    ctx.fill();
  }
};

Sketch.create({
  container: document.getElementById( 'container' ),
  retina: 'auto',
  setup() {
    width = this.width;
    height = this.height;

    //Create a particle
    for (i = 0; i < numParticles; i++) {
      x = random ( this.width )
      y = random ( this.height )
      var particle = Object.create(Particle);
      particle.init(x, y)
      particles.push(particle)
    }
    
  },
  update() {
    for (i = 0; i < particles.length; i++) {
      if (!particles[i].alive) {
        particles.splice(i, 1);
        this.removed = true;
      }
    }
    if (this.removed) {
      var numToAdd = numParticles - particles.length;
      for (i=0; i < numToAdd; i++) {
        x = random ( this.width )
        y = random ( this.height )
        var particle = Object.create(Particle)
        particle.init(x, y)
        particles.push(particle)
      }
      this.removed = false;
    }
    for (i = 0; i < particles.length; i++) {
      if (particles[i].alive) {
        particles[i].update();
      }
    }

  },
  draw() {
    this.fillStyle = '#fff'
    this.fillRect(0, 0, this.width, this.height)
    for (i = 0; i < particles.length; i++) {
      particles[i].draw(this)
    }
    for (i = 0; i < particles.length; i++) {
      for (j = i+1 ; j < particles.length; j++) {
        var dist = this.distance(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
        if (dist < distance) {
          this.beginPath();
          this.moveTo(particles[i].x, particles[i].y);
          this.lineTo(particles[j].x, particles[j].y);
          this.lineWidth = 0.1;
          this.strokeStyle = '#333';
          this.stroke();
        }
      }
    }
  },
  distance(x1, y1, x2, y2) {
    return sqrt( pow((x1-x2),2) + pow((y1-y2),2) );
  }
});
