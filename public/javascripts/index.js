var numStories = data.length;
console.log(numStories);
var index = 0;
var interval = 5000;

var particles = [];
var numParticles = 100;

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

var app = new Vue({
  el: '#app',
  data: {
    currentIndex: 0,
    bShowStory: false,
    stories: data,
    prompt: "",
    story: ""
  },
  components: {
    'heading': {
      props: ['prompt', 'story'],
      template: "<transition name='slidefade'><div class='story'><h3>{{ prompt }}</h3><p>{{ story }}</p></div></transition>"
    }
  },
  created: function() {
    // this.updateStory(0)
    console.log('vue ready');
  },
  methods: {
    updateStory: function (index) {
      this.prompt = this.stories[index].prompt;
      this.story = this.stories[index].text;
    },
    showStory: function() {
      this.bShowStory = true;
    },
    hideStory: function() {
      this.bShowStory = false;
    },
    toggleStory: function() {
      this.bShowStory = !(this.bShowStory);
    }
  }
});

Sketch.create({
  container: document.getElementById( 'container' ),
  retina: 'auto',
  setup() {
    this.r = this.g = this.b = random(100, 200)
    this.startTime = this.millis;
    this.removed = false;
    app.updateStory(index);

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
    if (this.millis - this.startTime > 5000) {
      this.startTime = this.millis;
      if (index == numStories) {
        index = 0;
      }
      app.toggleStory();
      if (app.bShowStory == false) {
        app.updateStory(index);
      }
      index += 1;
    }
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
  mousemove() {
    this.r = 255 * (this.mouse.x / this.width)
    this.g = 255 * (this.mouse.y / this.height)
    this.b = 255 * abs(cos(PI * this.mouse.y / this.width))
  },
  draw() {
    this.fillStyle = '#333'
    this.fillRect(0, 0, this.width, this.height)
    for (i = 0; i < particles.length; i++) {
      particles[i].draw(this)
    }
  },
  distance(x1, y1, x2, y2) {
    return sqrt( pow((x1-x2),2) + pow((y1-y2),2) );
  }
});