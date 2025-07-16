<template>
  <div class="min-h-screen bg-gray-50">
    <Sidebar @new-chat="goToChat" />
    <main class="ml-16 transition-all duration-300">
      <!-- En-tête de la page -->
      <div class="p-8 border-b border-gray-200 bg-white">
        <h1 class="text-3xl font-bold text-gray-900">Configuration</h1>
        <p class="text-gray-600 mt-2">Gestion des utilisateurs et des prompts</p>
      </div>

      <!-- Navigation par onglets -->
      <div class="bg-white border-b border-gray-200">
        <nav class="px-8 flex space-x-8">
          <button 
            @click="activeTab = 'users'"
            :class="[
              'py-4 px-1 border-b-2 font-medium text-sm',
              activeTab === 'users' 
                ? 'border-bmci text-bmci' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            Gestion des utilisateurs
          </button>
          <button 
            @click="activeTab = 'prompts'"
            :class="[
              'py-4 px-1 border-b-2 font-medium text-sm',
              activeTab === 'prompts' 
                ? 'border-bmci text-bmci' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            Gestion des prompts
          </button>
        </nav>
      </div>

      <!-- Contenu principal -->
      <div class="p-8">
        <!-- Onglet Utilisateurs -->
        <div v-if="activeTab === 'users'" class="animate-fade-in">
          <UsersManagement 
            :users="users" 
            @edit-user="editUser"
            @toggle-status="toggleUserStatus"
            @delete-user="deleteUser"
          />
        </div>

        <!-- Onglet Prompts -->
        <div v-if="activeTab === 'prompts'" class="animate-fade-in">
          <PromptsManagement 
            :prompts="prompts"
            @add-prompt="addNewPrompt"
            @edit-prompt="editPrompt"
            @toggle-prompt="togglePromptStatus"
            @delete-prompt="deletePrompt"
          />
        </div>
      </div>
    </main>

    <!-- Modal pour édition de prompt -->
    <PromptModal 
      v-if="showPromptModal"
      :prompt="editingPrompt"
      @save="savePrompt"
      @close="closePromptModal"
    />
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'
import UsersManagement from '../components/Settings/UsersManagement.vue'
import PromptsManagement from '../components/Settings/PromptsManagement.vue'
import PromptModal from '../components/Settings/PromptModal.vue'

export default {
  name: 'Settings',
  components: {
    Sidebar,
    UsersManagement,
    PromptsManagement,
    PromptModal
  },
  data() {
    return {
      activeTab: 'users',
      showPromptModal: false,
      editingPrompt: {},
      users: [
        {
          id: 1,
          name: 'Ahmed Bennani',
          email: 'ahmed.bennani@bmci.ma',
          role: 'Administrateur',
          status: 'actif',
          lastLogin: '2024-01-15 10:30'
        },
        {
          id: 2,
          name: 'Fatima Alaoui',
          email: 'fatima.alaoui@bmci.ma',
          role: 'Modérateur',
          status: 'suspendu',
          lastLogin: '2024-01-14 16:45'
        },
        {
          id: 3,
          name: 'Youssef Tazi',
          email: 'youssef.tazi@bmci.ma',
          role: 'Utilisateur',
          status: 'actif',
          lastLogin: '2024-01-15 09:15'
        }
      ],
      prompts: [
        {
          id: 1,
          title: 'Prompt d\'accueil',
          description: 'Message d\'accueil pour nouveaux utilisateurs',
          content: 'Bonjour ! Je suis Yakin, votre assistant virtuel BMCI. Comment puis-je vous aider aujourd\'hui ?',
          active: true,
          createdAt: '2024-01-10',
          updatedAt: '2024-01-15'
        },
        {
          id: 2,
          title: 'Prompt support technique',
          description: 'Réponses pour les problèmes techniques',
          content: 'Je comprends que vous rencontrez un problème technique. Laissez-moi vous aider à le résoudre étape par étape.',
          active: true,
          createdAt: '2024-01-12',
          updatedAt: '2024-01-14'
        }
      ]
    }
  },
  methods: {
    goToChat() {
      this.$router.push({ name: 'Chat' });
    },
    editUser(user) {
      console.log('Édition utilisateur:', user);
      // Logique d'édition - pourrait ouvrir un modal
    },
    toggleUserStatus(user) {
      const statusCycle = ['actif', 'suspendu', 'arrêté'];
      const currentIndex = statusCycle.indexOf(user.status);
      const nextIndex = (currentIndex + 1) % statusCycle.length;
      user.status = statusCycle[nextIndex];
      console.log(`Statut de ${user.name} changé à: ${user.status}`);
    },
    deleteUser(userId) {
      if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
        this.users = this.users.filter(user => user.id !== userId);
      }
    },
    addNewPrompt() {
      this.editingPrompt = {
        id: null,
        title: '',
        description: '',
        content: '',
        active: true,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      this.showPromptModal = true;
    },
    editPrompt(prompt) {
      this.editingPrompt = { ...prompt };
      this.showPromptModal = true;
    },
    togglePromptStatus(prompt) {
      prompt.active = !prompt.active;
      prompt.updatedAt = new Date().toISOString().split('T')[0];
    },
    deletePrompt(promptId) {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce prompt ?')) {
        this.prompts = this.prompts.filter(prompt => prompt.id !== promptId);
      }
    },
    savePrompt(promptData) {
      if (promptData.id) {
        // Modification
        const index = this.prompts.findIndex(p => p.id === promptData.id);
        if (index !== -1) {
          this.prompts[index] = { ...promptData, updatedAt: new Date().toISOString().split('T')[0] };
        }
      } else {
        // Creation
        promptData.id = Math.max(...this.prompts.map(p => p.id)) + 1;
        this.prompts.push(promptData);
      }
      this.closePromptModal();
    },
    closePromptModal() {
      this.showPromptModal = false;
      this.editingPrompt = {};
    }
  }
}
</script>
