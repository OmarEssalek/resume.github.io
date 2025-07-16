<template>
  <div class="min-h-screen bg-gray-50">
    <Sidebar @new-chat="goToChat" />
    <main class="ml-16 transition-all duration-300">
      <div class="p-6">
        <!-- En-tête -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900">Centre de Téléchargement</h1>
          <p class="text-gray-600 mt-1">Sélectionnez vos critères pour télécharger les documents</p>
        </div>

        <!-- Formulaire de filtres -->
        <div class="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Sélection du pays -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Pays
              </label>
              <select 
                v-model="selectedCountry" 
                @change="updateFiles"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bmci focus:border-bmci transition-colors"
              >
                <option value="">Sélectionner un pays</option>
                <option v-for="country in countries" :key="country.code" :value="country.code">
                  {{ country.flag }} {{ country.name }}
                </option>
              </select>
            </div>

            <!-- Date de début -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 112 0v1m-2 0h4m-4 0v10a2 2 0 002 2h4a2 2 0 002-2V7m-6 0V4a2 2 0 012-2h4a2 2 0 012 2v3M7 7h10"></path>
                </svg>
                Date de début
              </label>
              <input 
                type="date" 
                v-model="startDate" 
                @change="updateFiles"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bmci focus:border-bmci transition-colors"
              >
            </div>

            <!-- Date de fin -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 112 0v1m-2 0h4m-4 0v10a2 2 0 002 2h4a2 2 0 002-2V7m-6 0V4a2 2 0 012-2h4a2 2 0 012 2v3M7 7h10"></path>
                </svg>
                Date de fin
              </label>
              <input 
                type="date" 
                v-model="endDate" 
                @change="updateFiles"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bmci focus:border-bmci transition-colors"
              >
            </div>
          </div>

          <!-- Boutons d'action -->
          <div class="flex justify-between items-center mt-6 pt-4 border-t">
            <div class="flex space-x-3">
              <button 
                @click="resetFilters"
                class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                Réinitialiser
              </button>
            </div>
            <div class="flex items-center space-x-4">
              <span class="text-sm text-gray-600">{{ filteredFiles.length }} fichier(s) trouvé(s)</span>
              <button 
                @click="downloadAll"
                :disabled="filteredFiles.length === 0"
                class="px-4 py-2 bg-bmci text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
                </svg>
                Télécharger Tout
              </button>
            </div>
          </div>
        </div>

        <!-- Liste des fichiers -->
        <div class="space-y-4">
          <div v-if="loading" class="text-center py-8">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-bmci mx-auto"></div>
            <p class="text-gray-600 mt-4">Chargement des fichiers...</p>
          </div>

          <div v-else-if="filteredFiles.length === 0" class="text-center py-12 bg-white rounded-lg shadow-sm border">
            <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Aucun fichier trouvé</h3>
            <p class="text-gray-600">Ajustez vos filtres pour afficher les documents disponibles.</p>
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              v-for="file in filteredFiles" 
              :key="file.id"
              class="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow group"
            >
              <!-- Icône du fichier -->
              <div class="flex items-center mb-4">
                <div class="p-3 rounded-lg" :class="getFileTypeColor(file.type)">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path v-if="file.type === 'pdf'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    <path v-else-if="file.type === 'excel'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10V9a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2H9z"></path>
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                
                <!-- Badge du pays -->
                <div class="ml-auto">
                  <span class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    {{ getCountryFlag(file.country) }} {{ file.country }}
                  </span>
                </div>
              </div>

              <!-- Informations du fichier -->
              <div class="mb-4">
                <h3 class="font-medium text-gray-900 mb-2 line-clamp-2">{{ file.name }}</h3>
                <p class="text-sm text-gray-600 mb-3 line-clamp-3">{{ file.description }}</p>
                
                <div class="flex items-center justify-between text-sm text-gray-500">
                  <span>{{ formatDate(file.date) }}</span>
                  <span>{{ file.size }}</span>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex space-x-2">
                <button 
                  @click="previewFile(file)"
                  class="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                  Aperçu
                </button>
                
                <button 
                  @click="downloadFile(file)"
                  class="flex-1 px-3 py-2 text-sm bg-bmci text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  Télécharger
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="filteredFiles.length > 0" class="flex justify-center mt-8">
          <nav class="flex items-center space-x-2">
            <button 
              @click="currentPage--" 
              :disabled="currentPage === 1"
              class="px-3 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Précédent
            </button>
            
            <div class="flex space-x-1">
              <button 
                v-for="page in visiblePages" 
                :key="page"
                @click="currentPage = page"
                class="px-3 py-2 text-sm rounded-lg transition-colors"
                :class="currentPage === page 
                  ? 'bg-bmci text-white' 
                  : 'text-gray-600 bg-white border border-gray-300 hover:bg-gray-50'"
              >
                {{ page }}
              </button>
            </div>
            
            <button 
              @click="currentPage++" 
              :disabled="currentPage === totalPages"
              class="px-3 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Suivant
            </button>
          </nav>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'

export default {
  name: 'DownloadCenter',
  components: {
    Sidebar
  },
  data() {
    return {
      selectedCountry: '',
      startDate: '',
      endDate: '',
      loading: false,
      currentPage: 1,
      itemsPerPage: 9,
      
      countries: [
        { code: 'MA', name: 'Maroc', flag: '🇲🇦' },
        { code: 'FR', name: 'France', flag: '🇫🇷' },
        { code: 'ES', name: 'Espagne', flag: '🇪🇸' },
        { code: 'IT', name: 'Italie', flag: '🇮🇹' },
        { code: 'DE', name: 'Allemagne', flag: '🇩🇪' },
        { code: 'UK', name: 'Royaume-Uni', flag: '🇬🇧' },
        { code: 'US', name: 'États-Unis', flag: '🇺🇸' },
        { code: 'CA', name: 'Canada', flag: '🇨🇦' },
        { code: 'BR', name: 'Brésil', flag: '🇧🇷' },
        { code: 'CN', name: 'Chine', flag: '🇨🇳' }
      ],
      
      allFiles: [
        {
          id: 1,
          name: 'Rapport financier Q1 2024',
          description: 'Rapport détaillé des performances financières du premier trimestre 2024',
          type: 'pdf',
          size: '2.4 MB',
          date: '2024-03-31',
          country: 'MA',
          url: '/files/rapport-q1-2024.pdf'
        },
        {
          id: 2,
          name: 'Données clients Mars 2024',
          description: 'Export des données clients pour le mois de mars 2024',
          type: 'excel',
          size: '15.2 MB',
          date: '2024-03-28',
          country: 'MA',
          url: '/files/clients-mars-2024.xlsx'
        },
        {
          id: 3,
          name: 'Analyse de marché France',
          description: 'Étude comparative du marché français et orientations stratégiques',
          type: 'pdf',
          size: '5.8 MB',
          date: '2024-03-25',
          country: 'FR',
          url: '/files/analyse-marche-france.pdf'
        },
        {
          id: 4,
          name: 'Transactions Espagne Q1',
          description: 'Détail des transactions effectuées en Espagne au premier trimestre',
          type: 'excel',
          size: '8.9 MB',
          date: '2024-03-20',
          country: 'ES',
          url: '/files/transactions-espagne-q1.xlsx'
        },
        {
          id: 5,
          name: 'Rapport conformité Allemagne',
          description: 'Rapport de conformité réglementaire pour les opérations allemandes',
          type: 'pdf',
          size: '3.2 MB',
          date: '2024-03-15',
          country: 'DE',
          url: '/files/conformite-allemagne.pdf'
        },
        {
          id: 6,
          name: 'Statistiques UK Février',
          description: 'Statistiques mensuelles des opérations au Royaume-Uni',
          type: 'excel',
          size: '4.1 MB',
          date: '2024-02-29',
          country: 'UK',
          url: '/files/stats-uk-fevrier.xlsx'
        },
        {
          id: 7,
          name: 'Présentation stratégique US',
          description: 'Présentation de la stratégie d\'expansion sur le marché américain',
          type: 'pdf',
          size: '12.5 MB',
          date: '2024-02-28',
          country: 'US',
          url: '/files/strategie-us.pdf'
        },
        {
          id: 8,
          name: 'Données Canada Q4 2023',
          description: 'Compilation des données canadiennes du quatrième trimestre 2023',
          type: 'excel',
          size: '6.7 MB',
          date: '2023-12-31',
          country: 'CA',
          url: '/files/canada-q4-2023.xlsx'
        },
        {
          id: 9,
          name: 'Analyse Brésil 2024',
          description: 'Analyse prospective du marché brésilien pour l\'année 2024',
          type: 'pdf',
          size: '7.3 MB',
          date: '2024-01-15',
          country: 'BR',
          url: '/files/analyse-bresil-2024.pdf'
        },
        {
          id: 10,
          name: 'Partenariats Chine',
          description: 'Documentation des partenariats stratégiques en Chine',
          type: 'pdf',
          size: '9.8 MB',
          date: '2024-01-10',
          country: 'CN',
          url: '/files/partenariats-chine.pdf'
        }
      ]
    }
  },
  
  computed: {
    filteredFiles() {
      let files = this.allFiles

      // Filtre par pays
      if (this.selectedCountry) {
        files = files.filter(file => file.country === this.selectedCountry)
      }

      // Filtre par date de début
      if (this.startDate) {
        files = files.filter(file => file.date >= this.startDate)
      }

      // Filtre par date de fin
      if (this.endDate) {
        files = files.filter(file => file.date <= this.endDate)
      }

      return files
    },
    
    totalPages() {
      return Math.ceil(this.filteredFiles.length / this.itemsPerPage)
    },
    
    visiblePages() {
      const pages = []
      const total = this.totalPages
      const current = this.currentPage
      
      if (total <= 5) {
        for (let i = 1; i <= total; i++) {
          pages.push(i)
        }
      } else {
        if (current <= 3) {
          pages.push(1, 2, 3, 4, 5)
        } else if (current >= total - 2) {
          pages.push(total - 4, total - 3, total - 2, total - 1, total)
        } else {
          pages.push(current - 2, current - 1, current, current + 1, current + 2)
        }
      }
      
      return pages
    }
  },
  
  methods: {
    goToChat() {
      this.$router.push('/chat')
    },
    
    updateFiles() {
      this.loading = true
      this.currentPage = 1
      
      // Simulation d'un appel API
      setTimeout(() => {
        this.loading = false
      }, 800)
    },
    
    resetFilters() {
      this.selectedCountry = ''
      this.startDate = ''
      this.endDate = ''
      this.currentPage = 1
    },
    
    getFileTypeColor(type) {
      switch (type) {
        case 'pdf': return 'bg-red-500'
        case 'excel': return 'bg-green-600'
        case 'word': return 'bg-blue-500'
        default: return 'bg-gray-500'
      }
    },
    
    getCountryFlag(countryCode) {
      const country = this.countries.find(c => c.code === countryCode)
      return country ? country.flag : '🏳️'
    },
    
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    
    previewFile(file) {
      console.log('Aperçu du fichier:', file.name)
      // Ici vous pourriez ouvrir une modal de prévisualisation
      alert(`Aperçu de: ${file.name}`)
    },
    
    downloadFile(file) {
      console.log('Téléchargement du fichier:', file.name)
      // Simulation du téléchargement
      const link = document.createElement('a')
      link.href = file.url
      link.download = file.name
      link.click()
    },
    
    downloadAll() {
      console.log('Téléchargement de tous les fichiers')
      // Ici vous pourriez créer un zip ou télécharger un par un
      alert(`Téléchargement de ${this.filteredFiles.length} fichiers en cours...`)
    }
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

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
