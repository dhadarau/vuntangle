<template>
  <div class="ut-toast-container">
    <transition-group name="slide" tag="div">
      <v-alert
        v-for="toast in toasts"
        :key="`toast_${toast.start}`"
        type="success"
        class="utDarkBlue white--text"
        @mouseenter="pause(toast)"
        @mouseleave="resume(toast)"
      >
        {{ toast.message }}
      </v-alert>
    </transition-group>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        toasts: [],
        displayTime: 3000,
      }
    },
    mounted() {
      this.toasts = []
    },
    methods: {
      addToast(message) {
        const now = Date.now()
        this.toasts.push({
          message,
          start: now,
          left: this.displayTime,
          paused: false, // to avoid multiple mouseenter events on rerender
          timer: this.setTimer(now, this.displayTime),
        })
      },

      removeToast(start) {
        const idx = this.toasts.findIndex((toast) => toast.start === start)
        window.clearTimeout(this.toasts[idx].timer)
        this.toasts.splice(idx, 1)
      },

      pause(toast) {
        if (!toast.paused) {
          toast.paused = true
          toast.left -= Date.now() - toast.start
          window.clearTimeout(toast.timer)
        }
      },
      resume(toast) {
        toast.paused.false
        toast.start = Date.now() // important
        toast.timer = this.setTimer(toast.start, toast.left)
      },
      setTimer(start, millis) {
        return window.setTimeout(() => {
          this.removeToast(start)
        }, millis)
      },
    },
  }
</script>
<style>
  .ut-toast-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    max-width: 600px;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-end;
  }

  .slide-enter-active {
    animation: slide-in 0.3s;
  }
  .slide-leave-active {
    animation: fade-out 0.3s;
  }

  @keyframes slide-in {
    0% {
      opacity: 0;
      transform: translateX(100px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
  @keyframes fade-out {
    0% {
      opacity: 1;
      transform: scale(1, 1);
    }
    100% {
      opacity: 0;
      transform: scale(0.5, 0.5);
    }
  }
</style>
