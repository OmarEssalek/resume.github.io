<template>
  <div class="border-t border-gray-200 bg-white p-4">
    <form @submit.prevent="handleSubmit">
      <div class="flex items-center bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 focus-within:border-bmci focus-within:ring-2 focus-within:ring-bmci focus-within:ring-offset-2">
        <input
          v-model="message"
          type="text"
          placeholder="Tapez votre message ici..."
          class="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-500 text-sm"
          :disabled="isTyping"
          @keydown.enter="handleKeyPress"
        />
        <button
          type="submit"
          :disabled="isTyping || !message.trim()"
          class="ml-3 p-2 bg-bmci text-white rounded-xl hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-bmci focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SendIcon />
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { SendIcon } from '../icons'

export default {
  name: 'ChatInput',
  components: {
    SendIcon
  },
  props: {
    isTyping: {
      type: Boolean,
      default: false
    }
  },
  emits: ['send-message'],
  data() {
    return {
      message: ''
    }
  },
  methods: {
    handleSubmit() {
      if (this.message.trim() && !this.isTyping) {
        this.$emit('send-message', this.message.trim());
        this.message = '';
      }
    },
    handleKeyPress(e) {
      if (!e.shiftKey) {
        e.preventDefault();
        this.handleSubmit();
      }
    }
  }
}
</script>