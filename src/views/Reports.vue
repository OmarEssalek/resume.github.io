<template>
  <div class="min-h-screen bg-gray-50">
    <Sidebar @new-chat="goToChat" />
    <main class="ml-16 transition-all duration-300">
      <div class="p-6">
        <!-- En-tête -->
        <div class="mb-8">
          <div class="flex justify-between items-center mb-6">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">Tableau de Bord Chatbot</h1>
              <p class="text-gray-600 mt-1">Performances et métriques de Yakin Assistant</p>
            </div>
            <div class="flex space-x-3">
              <select class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bmci focus:border-bmci">
                <option>Aujourd'hui</option>
                <option>7 derniers jours</option>
                <option>30 derniers jours</option>
                <option>3 derniers mois</option>
              </select>
              <button class="px-4 py-2 bg-bmci text-white rounded-lg hover:bg-green-700 transition-colors">
                <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Exporter Rapport
              </button>
            </div>
          </div>
        </div>

        <!-- Cartes de statistiques principales -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <!-- Conversations Totales -->
          <div class="bg-white p-6 rounded-lg border shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600">Conversations Totales</p>
                <p class="text-2xl font-bold text-gray-900">3,847</p>
              </div>
              <div class="p-3 bg-blue-100 rounded-full">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
              </div>
            </div>
            <div class="mt-4 flex items-center">
              <span class="text-green-600 text-sm font-medium">+15.2%</span>
              <span class="text-gray-500 text-sm ml-2">vs période précédente</span>
            </div>
          </div>

          <!-- Utilisateurs Actifs -->
          <div class="bg-white p-6 rounded-lg border shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600">Utilisateurs Actifs</p>
                <p class="text-2xl font-bold text-gray-900">1,923</p>
              </div>
              <div class="p-3 bg-green-100 rounded-full">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                </svg>
              </div>
            </div>
            <div class="mt-4 flex items-center">
              <span class="text-green-600 text-sm font-medium">+8.7%</span>
              <span class="text-gray-500 text-sm ml-2">vs période précédente</span>
            </div>
          </div>

          <!-- Taux de Résolution -->
          <div class="bg-white p-6 rounded-lg border shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600">Taux de Résolution</p>
                <p class="text-2xl font-bold text-gray-900">87.3%</p>
              </div>
              <div class="p-3 bg-purple-100 rounded-full">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
            <div class="mt-4 flex items-center">
              <span class="text-green-600 text-sm font-medium">+3.1%</span>
              <span class="text-gray-500 text-sm ml-2">vs période précédente</span>
            </div>
          </div>

          <!-- Temps de Réponse Moyen -->
          <div class="bg-white p-6 rounded-lg border shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600">Temps de Réponse</p>
                <p class="text-2xl font-bold text-gray-900">1.2s</p>
              </div>
              <div class="p-3 bg-orange-100 rounded-full">
                <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
            <div class="mt-4 flex items-center">
              <span class="text-green-600 text-sm font-medium">-0.3s</span>
              <span class="text-gray-500 text-sm ml-2">amélioration</span>
            </div>
          </div>
        </div>

        <!-- Cartes de statistiques secondaires -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <!-- Satisfaction Client -->
          <div class="bg-white p-6 rounded-lg border shadow-sm">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-medium text-gray-900">Satisfaction Client</h3>
              <div class="flex items-center space-x-1">
                <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <span class="text-2xl font-bold text-gray-900">4.6</span>
                <span class="text-gray-500">/5</span>
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Très satisfait</span>
                <span class="text-sm text-gray-900">68%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-green-500 h-2 rounded-full" style="width: 68%"></div>
              </div>
            </div>
          </div>

          <!-- Messages par Heure -->
          <div class="bg-white p-6 rounded-lg border shadow-sm">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-medium text-gray-900">Messages/Heure</h3>
              <div class="text-2xl font-bold text-gray-900">156</div>
            </div>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Pic d'activité</span>
                <span class="text-sm font-medium text-gray-900">14h-16h</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Activité min</span>
                <span class="text-sm font-medium text-gray-900">02h-06h</span>
              </div>
            </div>
          </div>

          <!-- Intégration Humaine -->
          <div class="bg-white p-6 rounded-lg border shadow-sm">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-medium text-gray-900">Escalade Humaine</h3>
              <div class="text-2xl font-bold text-gray-900">12.7%</div>
            </div>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Demandes complexes</span>
                <span class="text-sm font-medium text-gray-900">8.2%</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Insatisfaction</span>
                <span class="text-sm font-medium text-gray-900">4.5%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Graphiques et analyses -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <!-- Graphique des conversations -->
          <div class="bg-white p-6 rounded-lg border shadow-sm">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-medium text-gray-900">Évolution des Conversations</h3>
              <div class="flex space-x-2">
                <button class="px-3 py-1 text-sm bg-bmci text-white rounded-lg">Jour</button>
                <button class="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Semaine</button>
                <button class="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Mois</button>
              </div>
            </div>
            <div class="h-64 flex items-end space-x-2">
              <div class="flex-1 bg-blue-100 rounded-t-lg h-16"></div>
              <div class="flex-1 bg-blue-200 rounded-t-lg h-24"></div>
              <div class="flex-1 bg-blue-300 rounded-t-lg h-32"></div>
              <div class="flex-1 bg-blue-400 rounded-t-lg h-40"></div>
              <div class="flex-1 bg-bmci rounded-t-lg h-48"></div>
              <div class="flex-1 bg-blue-400 rounded-t-lg h-36"></div>
              <div class="flex-1 bg-blue-300 rounded-t-lg h-28"></div>
            </div>
            <div class="flex justify-between mt-4 text-sm text-gray-600">
              <span>Lun</span>
              <span>Mar</span>
              <span>Mer</span>
              <span>Jeu</span>
              <span>Ven</span>
              <span>Sam</span>
              <span>Dim</span>
            </div>
          </div>

          <!-- Top Questions -->
          <div class="bg-white p-6 rounded-lg border shadow-sm">
            <h3 class="text-lg font-medium text-gray-900 mb-6">Questions Fréquentes</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p class="font-medium text-gray-900">Horaires d'ouverture</p>
                  <p class="text-sm text-gray-600">847 demandes</p>
                </div>
                <div class="text-sm text-gray-500">22%</div>
              </div>
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p class="font-medium text-gray-900">Solde de compte</p>
                  <p class="text-sm text-gray-600">634 demandes</p>
                </div>
                <div class="text-sm text-gray-500">16%</div>
              </div>
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p class="font-medium text-gray-900">Carte bancaire</p>
                  <p class="text-sm text-gray-600">521 demandes</p>
                </div>
                <div class="text-sm text-gray-500">14%</div>
              </div>
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p class="font-medium text-gray-900">Virements</p>
                  <p class="text-sm text-gray-600">398 demandes</p>
                </div>
                <div class="text-sm text-gray-500">10%</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Activité en temps réel -->
        <div class="bg-white p-6 rounded-lg border shadow-sm">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-medium text-gray-900">Activité en Temps Réel</h3>
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span class="text-sm text-gray-600">En direct</span>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="text-center p-4 bg-green-50 rounded-lg">
              <div class="text-2xl font-bold text-green-600">23</div>
              <div class="text-sm text-gray-600">Conversations actives</div>
            </div>
            <div class="text-center p-4 bg-blue-50 rounded-lg">
              <div class="text-2xl font-bold text-blue-600">5</div>
              <div class="text-sm text-gray-600">En attente</div>
            </div>
            <div class="text-center p-4 bg-purple-50 rounded-lg">
              <div class="text-2xl font-bold text-purple-600">142</div>
              <div class="text-sm text-gray-600">Résolues aujourd'hui</div>
            </div>
            <div class="text-center p-4 bg-orange-50 rounded-lg">
              <div class="text-2xl font-bold text-orange-600">3</div>
              <div class="text-sm text-gray-600">Escaladées</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'

export default {
  name: 'ChatbotDashboard',
  components: {
    Sidebar
  },
  methods: {
    goToChat() {
      this.$router.push('/chat')
    }
  }
}
</script>

<style scoped>
.bg-bmci {
  background-color: #10b981;
}
.focus\:ring-bmci:focus {
  --tw-ring-color: #10b981;
}
.focus\:border-bmci:focus {
  --tw-border-opacity: 1;
  border-color: #10b981;
}
</style>
