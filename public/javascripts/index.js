var app = new Vue({
  el: '#app',
  data: {
    currentIndex: 0,
    bShowStory: true,
    stories: data,
    prompt: "",
    story: ""
  },
  components: {
    'heading': {
      props: ['prompt', 'story'],
      template: "<div class='story'><h3>{{ prompt }}</h3><p>{{ story }}</p></div>"
    }
  },
  created: function() {
    this.updateStory(0);
  },
  methods: {
    updateStory: function (index) {
      this.prompt = this.stories[index].prompt;
      this.story = this.stories[index].text;
    }
  }
});