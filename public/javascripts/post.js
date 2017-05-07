function validateForm() {
  var x = document.forms["postForm"]["story"].value;
    if (x == "") {
        alert("Please share an anecdote with the community");
        return false;
    }
}

var app = new Vue({
  el: '#app',
  data: {
    currentIndex: 0,
    prompts: prompts,
    currentPrompt: "",
    currentPromptId: "",
    bShowPrompt: true
  },
  components: {
    'prompt': {
      props: ['prompt'],
      template: "<transition name='promptfade' v-on:leave='emitRefresh' v-on:after-leave='emitShow'><label id='storyprompt' for='story'>{{ prompt }}</label></transition>",
      methods: {
        emitRefresh: function(el, done) {
          this.$emit('refresh-prompt')
          done()
        },
        emitShow: function(el) {
          this.$emit('show-prompt');
        }
      }
    }
  },
  created: function() {
    // this.changePrompt()
    var selected = Math.floor(Math.random() * this.prompts.length)
    this.currentPrompt = prompts[selected].prompt;
    this.currentPromptId = prompts[selected]._id;
    this.currentIndex = selected;
  },
  methods: {
    changePrompt: function () {
      var selected = Math.floor(Math.random() * this.prompts.length)
      while (this.currentIndex == selected) {
        selected = Math.floor(Math.random() * this.prompts.length)
      }
      this.currentPrompt = prompts[selected].prompt;
      this.currentPromptId = prompts[selected]._id;
      this.currentIndex = selected;
    },
    hidePrompt: function () {
      this.bShowPrompt = false;
    },
    showPrompt: function () {
      this.bShowPrompt = true;
    }
  }
});
