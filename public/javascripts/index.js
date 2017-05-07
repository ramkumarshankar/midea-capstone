var numPrompts = prompts.length;
var activePromptIndex = 3;
var storyIndex = 0;
var interval = 5000;

var particles = [];
var numParticles = 50;
var promptsArray = [];
var distance = 100;

var scrollCount = 0
var bReset = false;

var width;
var height;

// Socket.io server
var socket = io.connect(socketServer)

function refreshData () {
  socket.emit('refresh', {})
}

socket.on('refreshData', function (data) {
  console.log("refreshing data")
  app.stories = data
});

var Particle = {
  x: 0,
  y: 0,
  vx: 1,
  vy: 1,
  radius: 0.1,
  wander: 50,
  color: '#333',
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

var Prompt = {
  x: 0,
  y: 0,
  newY: 0,
  text: '',
  color: 'rgba(155, 77, 202, 1)',
  alpha: 1,
  animating: true,
  init: function(_text, _x, _y) {
    this.text = _text;
    this.x = _x;
    this.y = _y;
    this.newY = _y;
  },
  setActive: function() {
    this.color = '#fff'
  },
  setInactive: function () {
    this.color = 'rgba(77, 77, 77, 0.5)'
  },
  update: function() {
    if (this.newY < this.y) {
      this.y -= 2
    }
    else if (this.newY > this.y) {
      this.y += 8
    }
    // if (abs(this.newY - this.y) < 2) {
      // this.y = this.newY;
    // }
    if (this.newY != this.y) {
      this.animating = true;
    } else {
      this.animating = false;
    }
  },
  draw: function(ctx) {
    var words = this.text.split(' ');
    var line = '';
    var maxWidth = 400;
    var lineHeight = 20;
    var x = this.x;
    var y = this.y;
    ctx.fillStyle = this.color,
    // ctx.fillStyle = 'rgba(77, 77, 77, 0.5)'
    ctx.globalAlpha = this.alpha;
    ctx.font = "16px Fedra Sans Pro";
    for(var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      var metrics = ctx.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      }
      else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, y);
  
    ctx.globalAlpha = 1;
  }
}

var app = new Vue({
  el: '#app',
  data: {
    currentIndex: 0,
    bShowStory: false,
    stories: stories,
    prompts: prompts,
    currentStories: [],
    story: ""
  },
  components: {
    'heading': {
      props: ['story'],
      template: "<transition name='slidefade'><div class='story'><h3>{{ story }}</h3></div></transition>"
    }
  },
  created: function() {
    console.log('vue ready')
    this.setupStories(activePromptIndex)
    this.updateStory(storyIndex)
    this.showStory()
  },
  methods: {
    setupStories: function (activePromptIndex) {
      this.currentStories = []
      var promptId = this.prompts[activePromptIndex]._id
      for (var i = 0; i < this.stories.length; i++) {
        if (this.stories[i].promptId == promptId) {
          this.currentStories.push(this.stories[i].text)
        }
      }
    },
    updateStory: function (storyIndex) {
      // TODO
      this.story = this.currentStories[storyIndex]
    },
    showStory: function() {
      this.bShowStory = true
    },
    hideStory: function() {
      this.bShowStory = false
    },
    toggleStory: function() {
      this.bShowStory = !(this.bShowStory)
    },
    clearStory: function() {
      this.story = ""
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
    app.updateStory(storyIndex);

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

    //Create prompts
    var xPos = 20;
    var y = 0;
    var yStep = Math.floor(height/6)
    for (i = 0; i < prompts.length; i++) {
      x = xPos;
      var prompt = Object.create(Prompt)
      prompt.init(prompts[i].prompt, x, y)
      if (i === 3) {
        prompt.setActive()
      }
      else {
        prompt.setInactive()
      }
      y += yStep;
      promptsArray.push(prompt)
    }
    
  },
  update() {
    var animInProgress = false;
    for (i = 0; i < promptsArray.length; i++) {
      if (promptsArray[i].animating) {
        animInProgress = true;
        break;
      }
    }

    if (!animInProgress && scrollCount == 0) {
      if (this.millis - this.startTime > 4000) {
        this.startTime = this.millis;
        app.toggleStory();
        if (app.bShowStory == false) {
          // Last prompt, reset
          if (activePromptIndex == numPrompts-1) {
            // TODO: reset
            bReset = true;
            activePromptIndex = 0;
            app.setupStories(activePromptIndex);
            scrollCount += 1;
          }
          else {
            storyIndex += 1;
            if (storyIndex >= app.currentStories.length) {
              storyIndex = 0;
              app.currentStories = [];
              while (app.currentStories.length == 0) {
                activePromptIndex += 1;
                var checkIndex = (activePromptIndex) % numPrompts;
                scrollCount += 1;
                app.setupStories(checkIndex);
                if (activePromptIndex > 12) {
                  scrollCount = 0;
                  activePromptIndex = 3;
                  break;
                }
              }
            }
          }
          app.updateStory(storyIndex);
        }
      }
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
    if (scrollCount > 0) {
      promptsArray.push(promptsArray.shift());
      promptsArray[promptsArray.length-1].y = promptsArray[promptsArray.length-1].newY = promptsArray[promptsArray.length-2].y + Math.floor(height/6);
      for (i = 0; i < promptsArray.length; i++) {
        promptsArray[i].newY -= Math.floor(height/6)
        if (i === 3) {
          promptsArray[i].setActive()
        }
        else {
          promptsArray[i].setInactive()
        }
      }
      scrollCount--;
    }

    if (bReset) {
      refreshData();
      bReset = false;
    }

    for (i = 0; i < promptsArray.length; i++) {
      promptsArray[i].update()
    }

  },
  mousemove() {
    this.r = 255 * (this.mouse.x / this.width)
    this.g = 255 * (this.mouse.y / this.height)
    this.b = 255 * abs(cos(PI * this.mouse.y / this.width))
  },
  draw() {
    this.fillStyle = '#fff'
    this.fillRect(0, 0, this.width, this.height)
    for (i = 0; i < particles.length; i++) {
      particles[i].draw(this)
    }
    this.drawActivePromptRect()
    for (i = 0; i < promptsArray.length; i++) {
      promptsArray[i].draw(this)
    }
    for (i = 0; i < particles.length; i++) {
      for (j = i+1 ; j < particles.length; j++) {
        var dist = this.distance(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
        if (dist < distance) {
          this.beginPath();
          this.moveTo(particles[i].x, particles[i].y);
          this.lineTo(particles[j].x, particles[j].y);
          this.lineWidth = 0.2;
          this.strokeStyle = '#333';
          this.stroke();
        }
      }
    }
  },
  distance(x1, y1, x2, y2) {
    return sqrt( pow((x1-x2),2) + pow((y1-y2),2) );
  },
  drawActivePromptRect() {
    // var cornerRadius = 20;
    this.fillStyle = 'rgba(155, 77, 202, 0.9)'
    // this.strokeStyle = 'rgba(155, 77, 202, 0.8)'
    // this.lineJoin = "round" 
    // this.lineWidth = cornerRadius;
    // this.strokeRect(0+(cornerRadius/2), this.height/2-40+(cornerRadius/2), 420-cornerRadius, 80-cornerRadius);
    // this.fillRect(0+(cornerRadius/2), this.height/2-40+(cornerRadius/2), 420-cornerRadius, 80-cornerRadius);
    this.fillRect(0, this.height/2-40, 420, 80)
  },
});