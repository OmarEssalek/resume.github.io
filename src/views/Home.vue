<template>
  <div class="min-h-screen bg-gray-50">
    <Sidebar @new-chat="resetChat" />
      <div class="h-screen flex items-center justify-center px-4 py-8">
        <div class="max-w-2xl w-full space-y-8 animate-fade-in">

          <div class="flex justify-center">
            <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <MessageCircleIcon />
            </div>
          </div>

          <div class="text-center space-y-4">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">

              {{ test }}
            </h1>
            <p class="text-lg md:text-xl text-gray-600 max-w-lg mx-auto leading-relaxed">
              Pose-moi une question ou choisis-en une ci-dessous !
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 animate-slide-up">
            
            <button 
              v-for="item in suggestedQuestions" 
              :key="item.id"
              @click="sendSuggestedMessage(item.question)" 
              class="group relative bg-white border border-gray-200 rounded-xl p-6 text-left transition-all duration-300 hover:border-bmci hover:shadow-lg hover:shadow-bmci hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <div class="flex items-start space-x-4">
                <div :class="`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${item.iconBgColor}`">
                  <component :is="item.icon" />
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 group-hover:text-bmci transition-colors">
                    {{ item.question }}
                  </h3>
                  <p class="text-sm text-gray-500 mt-1">
                    {{ item.description }}
                  </p>
                </div>
              </div>
            </button>

          </div>

          <div class="mt-12 animate-slide-up">
            <form @submit.prevent="sendMessage">
              <div class="flex items-center bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm hover:shadow-md transition-shadow focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2">
                <input
                  v-model="currentMessage"
                  type="text"
                  placeholder="Tapez votre message ici..."
                  class="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-500 text-sm"
                />
                <button
                  type="submit"
                  :disabled="!currentMessage.trim()"
                  class="ml-3 p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <SendIcon />
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'
import { MessageCircleIcon, ZapIcon, FileTextIcon, BookOpenIcon, ChefHatIcon, SendIcon } from '../components/icons'

export default {
  name: 'Home',
  components: {
    Sidebar,
    MessageCircleIcon,
    ZapIcon,
    FileTextIcon,
    BookOpenIcon,
    ChefHatIcon,
    SendIcon
  },
  data() {
    return {
      test: 'omar',
      currentMessage: '',
      suggestedQuestions: [
        {
          
          id: 'productivity',
          question: 'Comment améliorer ma productivité ?',
          description: 'Conseils et techniques pour être plus efficace',
          icon: 'ZapIcon',
          iconBgColor: 'bg-blue-50 group-hover:bg-blue-100'
        },
        {
          id: 'summary',
          question: 'Résume ce texte pour moi',
          description: 'Extraction des points clés d\'un document',
          icon: 'FileTextIcon',
          iconBgColor: 'bg-emerald-50 group-hover:bg-emerald-100'
        },
        {
          id: 'concept',
          question: 'Explique-moi un concept difficile',
          description: 'Simplification de notions complexes',
          icon: 'BookOpenIcon',
          iconBgColor: 'bg-purple-50 group-hover:bg-purple-100'
        },
        {
          id: 'recipe',
          question: 'Génère une idée de repas pour moi',
          description: 'Suggestions culinaires personnalisées',
          icon: 'ChefHatIcon',
          iconBgColor: 'bg-orange-50 group-hover:bg-orange-100'
        }
      ]
    }
  },
  methods: {
    sendMessage() {
      if (this.currentMessage.trim()) {
        this.$router.push({
          name: 'Chat',
          query: { message: this.currentMessage.trim() }
        });
      }
    },
    sendSuggestedMessage(message) {
      this.$router.push({
        name: 'Chat',
        query: { message }
      });
    },
    resetChat() {
      this.$router.push({ name: 'Chat' });
    }
  }
}
</script>