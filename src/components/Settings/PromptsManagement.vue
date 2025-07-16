<template>
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-semibold text-gray-900">Gestion des prompts</h2>
        <button 
          @click="$emit('add-prompt')"
          class="bg-bmci text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          <span>Nouveau prompt</span>
        </button>
      </div>
  
      <div class="grid gap-6">
        <div 
          v-for="prompt in prompts" 
          :key="prompt.id"
          class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          <div class="flex justify-between items-start mb-4">
            <div class="flex-1">
              <div class="flex items-center space-x-3">
                <h3 class="text-lg font-medium text-gray-900">{{ prompt.title }}</h3>
                <span 
                  :class="prompt.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                >
                  {{ prompt.active ? 'Actif' : 'Inactif' }}
                </span>
              </div>
              <p class="text-gray-600 mt-1">{{ prompt.description }}</p>
            </div>
            <div class="flex items-center space-x-2">
              <button 
                @click="$emit('edit-prompt', prompt)"
                class="text-bmci hover:text-green-800 p-2 rounded-lg hover:bg-green-50"
                title="Éditer"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </button>
              <button 
                @click="$emit('toggle-prompt', prompt)"
                class="text-yellow-600 hover:text-yellow-800 p-2 rounded-lg hover:bg-yellow-50"
                :title="prompt.active ? 'Désactiver' : 'Activer'"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </button>
              <button 
                @click="$emit('delete-prompt', prompt.id)"
                class="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50"
                title="Supprimer"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <div class="bg-gray-50 rounded-lg p-4 mb-4">
            <p class="text-sm text-gray-700 leading-relaxed">{{ prompt.content }}</p>
          </div>
          
          <div class="flex justify-between text-xs text-gray-500">
            <span>Créé le {{ formatDate(prompt.createdAt) }}</span>
            <span>Modifié le {{ formatDate(prompt.updatedAt) }}</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PromptsManagement',
    props: {
      prompts: {
        type: Array,
        required: true
      }
    },
    emits: ['add-prompt', 'edit-prompt', 'toggle-prompt', 'delete-prompt'],
    methods: {
      formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
      }
    }
  }
  </script>
  