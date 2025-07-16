<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slide-up">
        <h2 class="text-xl font-semibold mb-4">
          {{ editingPrompt.id ? 'Modifier le prompt' : 'Nouveau prompt' }}
        </h2>
        
        <form @submit.prevent="handleSubmit">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Titre</label>
              <input 
                v-model="editingPrompt.title"
                type="text" 
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bmci focus:border-bmci"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input 
                v-model="editingPrompt.description"
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bmci focus:border-bmci"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Contenu</label>
              <textarea 
                v-model="editingPrompt.content"
                rows="8"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bmci focus:border-bmci"
              ></textarea>
            </div>
            
            <div class="flex items-center">
              <input 
                v-model="editingPrompt.active"
                type="checkbox" 
                id="active"
                class="h-4 w-4 text-bmci focus:ring-bmci border-gray-300 rounded"
              >
              <label for="active" class="ml-2 block text-sm text-gray-700">
                Prompt actif
              </label>
            </div>
          </div>
          
          <div class="flex justify-end space-x-3 mt-6">
            <button 
              type="button"
              @click="$emit('close')"
              class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Annuler
            </button>
            <button 
              type="submit"
              class="px-4 py-2 bg-bmci text-white rounded-lg hover:bg-green-700"
            >
              {{ editingPrompt.id ? 'Modifier' : 'Créer' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PromptModal',
    props: {
      prompt: {
        type: Object,
        required: true
      }
    },
    emits: ['save', 'close'],
    data() {
      return {
        editingPrompt: { ...this.prompt }
    }
  },
  watch: {
    prompt: {
      handler(newPrompt) {
        this.editingPrompt = { ...newPrompt };
      },
      deep: true
    }
  },
  methods: {
    handleSubmit() {
      if (!this.editingPrompt.title.trim() || !this.editingPrompt.content.trim()) {
        alert('Veuillez remplir au moins le titre et le contenu du prompt.');
        return;
      }
      
      this.$emit('save', { ...this.editingPrompt });
    }
  }
}
</script>
  