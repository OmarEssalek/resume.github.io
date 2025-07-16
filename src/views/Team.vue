<template>
  <div class="min-h-screen bg-gray-50">
    <Sidebar @new-chat="goToChat" />
    <main class="ml-16 transition-all duration-300">
      <div class="p-8">
        <h1 class="text-2xl font-bold text-gray-900">Équipe</h1>
        <p class="text-gray-600 mt-2">Gestion de l'équipe et des collaborateurs</p>
      </div>
    </main>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'

export default {
  name: 'Team',
  components: {
    Sidebar
  },
  methods: {
    goToChat() {
      this.$router.push({ name: 'Chat' });
    }
  }
}
</script>