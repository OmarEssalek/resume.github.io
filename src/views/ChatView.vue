<template>
  <div class="min-h-screen bg-gray-50">
    <Sidebar @new-chat="resetChat" />
    <main class="ml-16 transition-all duration-300">
      <div class="h-screen flex flex-col">
        <ChatHeader @close="resetChat" />
        <ChatMessages :messages="messages" :isTyping="isTyping" />
        <ChatInput @send-message="handleSendMessage" :isTyping="isTyping" />
      </div>
    </main>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'
import ChatHeader from '../components/Chat/ChatHeader.vue'
import ChatMessages from '../components/Chat/ChatMessages.vue'
import ChatInput from '../components/Chat/ChatInput.vue'
import { botService } from '../services/botService'

export default {
  name: 'ChatView',
  components: {
    Sidebar,
    ChatHeader,
    ChatMessages,
    ChatInput
  },
  data() {
    return {
      messages: [],
      isTyping: false,
      messageId: 0
    }
  },
  mounted() {
    // Si un message initial est passé en query parameter
    if (this.$route.query.message) {
      this.handleSendMessage(this.$route.query.message);
      // Nettoyer l'URL
      this.$router.replace({ name: 'Chat' });
    }
  },
  methods: {
    async handleSendMessage(content) {
      // Ajouter le message utilisateur
      const userMessage = {
        id: this.messageId++,
        type: 'user',
        content,
        timestamp: new Date()
      };
      
      this.messages.push(userMessage);
      this.isTyping = true;

      try {
        // Générer la réponse du bot
        const response = await botService.generateResponse(content);
        
        const botMessage = {
          id: this.messageId++,
          type: 'bot',
          content: response,
          timestamp: new Date()
        };
        
        this.messages.push(botMessage);
      } catch (error) {
        console.error('Error generating response:', error);
        
        const errorMessage = {
          id: this.messageId++,
          type: 'bot',
          content: "Désolé, je ne peux pas répondre pour le moment. Veuillez réessayer plus tard.",
          timestamp: new Date()
        };
        
        this.messages.push(errorMessage);
      } finally {
        this.isTyping = false;
      }
    },
    resetChat() {
      this.$router.push({ name: 'Home' });
    }
  }
}
</script>