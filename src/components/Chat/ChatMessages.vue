<template>
  <div class="flex-1 overflow-y-auto p-4 space-y-6" ref="messagesContainer">
    <div v-for="message in messages" :key="message.id" class="animate-fade-in">
      
      <!-- Message utilisateur -->
      <div v-if="message.type === 'user'" class="flex justify-end">
        <div class="max-w-xs lg:max-w-md xl:max-w-lg">
          <div class="bg-bmci text-white p-3 rounded-2xl rounded-br-md shadow-sm">
            <p class="text-sm whitespace-pre-wrap">{{ message.content }}</p>
          </div>
          <div class="flex items-center justify-end mt-1 space-x-2">
            <span class="text-xs text-gray-500">{{ formatTime(message.timestamp) }}</span>
            <div class="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span class="text-white font-medium text-xs">U</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Message bot -->
      <div v-else class="flex justify-start">
        <div class="max-w-xs lg:max-w-md xl:max-w-lg">
          <div class="flex items-center space-x-2 mb-1">
            <div class="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span class="text-white font-medium text-xs">Y</span>
            </div>
            <span class="text-xs text-gray-500">{{ formatTime(message.timestamp) }}</span>
          </div>
          <div class="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-md shadow-sm">
            <p class="text-sm text-gray-900 whitespace-pre-wrap">{{ message.content }}</p>
            
            <!-- Boutons de feedback -->
            <div class="flex items-center space-x-2 mt-3 pt-2 border-t border-gray-100">
              <span class="text-xs text-gray-500">Cette réponse était-elle utile ?</span>
              <div class="flex space-x-1">
                <!-- Bouton Bon -->
                <button class="p-1 rounded-full transition-all duration-200 hover:bg-green-50 hover:scale-105">
                  <span class="text-lg">👍</span>
                </button>
                
                <!-- Bouton Pas bon -->
                <button class="p-1 rounded-full transition-all duration-200 hover:bg-red-50 hover:scale-105">
                  <span class="text-lg">👎</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Indicateur de frappe -->
    <div v-if="isTyping" class="flex justify-start animate-fade-in">
      <div class="max-w-xs lg:max-w-md xl:max-w-lg">
        <div class="flex items-center space-x-2 mb-1">
          <div class="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span class="text-white font-medium text-xs">Y</span>
          </div>
          <span class="text-xs text-gray-500">En train d'écrire...</span>
        </div>
        <div class="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-md shadow-sm">
          <div class="flex space-x-1">
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'ChatMessages',
  props: {
    messages: {
      type: Array,
      required: true
    },
    isTyping: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    formatTime(timestamp) {
      return timestamp.toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messagesContainer;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    }
  },
  watch: {
    messages: {
      handler() {
        this.scrollToBottom();
      },
      deep: true
    },
    isTyping() {
      this.scrollToBottom();
    }
  }
}
</script>
