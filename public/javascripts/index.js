var numStories = data.length;
console.log(numStories);
var index = 0;
var interval = 5000;

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
    app.updateStory(index);
    console.log(this.now);
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
  },
  mousemove() {
    this.r = 255 * (this.mouse.x / this.width)
    this.g = 255 * (this.mouse.y / this.height)
    this.b = 255 * abs(cos(PI * this.mouse.y / this.width))
  },
  draw() {
    this.fillStyle = `rgb(${~~this.r},${~~this.g},${~~this.b})`
    this.fillRect(0, 0, this.width, this.height)
  }
});