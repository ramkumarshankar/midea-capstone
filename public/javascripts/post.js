var app = new Vue({
  el: '#app',
  data: {
    currentIndex: 0,
    prompts: prompts,
    currentPrompt: "",
    bShowPrompt: false
  },
  components: {
    'prompt': {
      props: ['prompt'],
      template: "<transition name='slidefade'><div><div class='row'><a id='refreshBtn' v-on:click='emitRefresh' class='button button-clear float-left' href='#'>Refresh Prompt</a></div><div class='row'><h4>{{ prompt }}</h4></div></div></transition>",
      methods: {
        emitRefresh: function() {
          this.$emit('refresh-prompt');
        }
      }
    }
  },
  created: function() {
    // this.updateStory(0)
    this.hidePrompt();
    this.changePrompt();
    this.showPrompt();
  },
  methods: {
    changePrompt: function () {
      this.hidePrompt();
      this.currentPrompt = prompts[Math.floor(Math.random() * this.prompts.length)].prompt;
      this.showPrompt();
    },
    hidePrompt: function () {
      this.bShowPrompt = false;
    },
    showPrompt: function () {
      this.bShowPrompt = true;
    }
  }
});
