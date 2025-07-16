<template>
  <aside class="fixed flex flex-col h-screen bg-white shadow-lg border-r overflow-y-auto transition-all duration-300 ease-in-out group hover:w-64 w-16">
    <!-- Logo Section -->
    <div class="p-4 border-b border-gray-100 flex items-center justify-center group-hover:justify-start">

      <div class="w-8 h-8 bg-bmci text-white rounded-lg flex items-center justify-center flex-shrink-0 group-hover:hidden">
        <p class="text-lg font-bold">B</p>
      </div>

      <img 
        src="../assets/BMCI_BL_F_Q (1).png" 
        class="h-10 w-auto max-w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden group-hover:block object-contain"
        alt="BMCI Logo"
      >
      
    </div>

    <!-- New Chat Button -->
    <div class="px-2 py-2">
      <button 
        @click="$emit('new-chat')"
        class="flex bg-bmci text-white font-semibold rounded-lg items-center w-full px-3 py-2.5 hover:bg-green-700 transition-all duration-300 justify-center group-hover:justify-start"
      >
        <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
        </svg>
        <span class="ml-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden group-hover:inline">
          Chatter Avec Yakin
        </span>
      </button>
    </div>

    <div class="border-t mx-2 my-1.5"></div>

    <!-- Navigation -->
    <nav class="px-2 space-y-2 flex-1">
      <template v-for="item in navItems" :key="item.href">
        <!-- Menu normal -->
        <router-link
          v-if="!item.submenu"
          :to="item.href"
          class="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 group/item relative"
          :class="$route.path === item.href 
            ? 'bg-navselected text-white' 
            : 'text-gray-600 hover:bg-bmci hover:text-white'"
        >
          <span v-html="item.icon" class="w-5 h-5 flex-shrink-0"></span>
          <span class="ml-3 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden group-hover:inline">
            {{ item.label }}
          </span>
          
          <!-- Tooltip pour les icônes -->
          <div class="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:hidden group-hover/item:opacity-100 group-hover/item:block transition-opacity duration-200 z-50 whitespace-nowrap">
            {{ item.label }}
          </div>
        </router-link>

        <!-- Menu avec sous-menu -->
        <div v-else class="relative">
          <button
            @click="toggleSubmenu(item.href)"
            class="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 group/item relative w-full"
            :class="isTasksActive() 
              ? 'bg-navselected text-white' 
              : 'text-gray-600 hover:bg-bmci hover:text-white'"
          >
            <span v-html="item.icon" class="w-5 h-5 flex-shrink-0"></span>
            <span class="ml-3 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden group-hover:inline">
              {{ item.label }}
            </span>
            <!-- Flèche pour le dropdown -->
            <svg 
              class="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 hidden group-hover:inline"
              :class="{ 'rotate-180': openSubmenu === item.href }"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
            
            <!-- Tooltip pour les icônes -->
            <div class="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:hidden group-hover/item:opacity-100 group-hover/item:block transition-opacity duration-200 z-50 whitespace-nowrap">
              {{ item.label }}
            </div>
          </button>

          <!-- Sous-menu -->
          <div 
            v-show="openSubmenu === item.href && isExpanded"
            class="ml-6 mt-1 space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <router-link
              v-for="subItem in item.submenu"
              :key="subItem.href"
              :to="subItem.href"
              class="flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300"
              :class="$route.path === subItem.href 
                ? 'bg-navselected text-white' 
                : 'text-gray-500 hover:bg-bmci hover:text-white'"
            >
              <span v-html="subItem.icon" class="w-4 h-4 flex-shrink-0"></span>
              <span class="ml-3 whitespace-nowrap">
                {{ subItem.label }}
              </span>
            </router-link>
          </div>
        </div>
      </template>

      <div class="border-t mx-1 my-4"></div>

      <!-- Settings -->
      <router-link
        to="/settings"
        class="flex items-center px-3 py-2.5 text-sm font-medium text-gray-600 rounded-lg transition-all duration-300 hover:bg-bmci hover:text-white group/item relative"
      >
        <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
        <span class="ml-3 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden group-hover:inline">
          Paramètres
        </span>
        
        <!-- Tooltip -->
        <div class="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:hidden group-hover/item:opacity-100 group-hover/item:block transition-opacity duration-200 z-50 whitespace-nowrap">
          Paramètres
        </div>
      </router-link>
    </nav>

    <!-- User Profile -->
    <div class="p-4 border-t border-gray-100 bg-white">
      <div class="flex items-center group-hover:justify-start justify-center">
        <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
          <span class="text-white font-medium text-sm">OE</span>
        </div>
        <div class="ml-3 flex-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden group-hover:block">
          <p class="text-sm font-medium text-gray-900 truncate">Omar Essalek</p>
        </div>
        <button class="ml-2 text-gray-400 hover:text-gray-600 transition-colors opacity-0 group-hover:opacity-100 hidden group-hover:block">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
        </button>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
  emits: ['new-chat'],
  data() {
    return {
      openSubmenu: null,
      isExpanded: false,
      navItems: [
        { 
          icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
          </svg>`, 
          label: 'Équipe', 
          href: '/team' 
        },
        { 
          icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>`, 
          label: 'Dashboard', 
          href: '/dashboard' 
        },
        { 
          icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 112 0v1m-2 0h4m-4 0v10a2 2 0 002 2h4a2 2 0 002-2V7m-6 0V4a2 2 0 012-2h4a2 2 0 012 2v3M7 7h10"></path>
          </svg>`, 
          label: 'Projet', 
          href: '/project'
        },
        { 
          icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
          </svg>`, 
          label: 'Tâches', 
          href: '/tasks',
          submenu: [
            {
              icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>`,
              label: 'Nouvelle Tâche',
              href: '/tasks'
            },
            {
              icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
              </svg>`,
              label: 'Toutes les Tâches',
              href: '/tasks'
            },
            {
              icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>`,
              label: 'En Cours',
              href: '/tasks'
            },
            {
              icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>`,
              label: 'Terminées',
              href: '/tasks'
            },
            {
              icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>`,
              label: 'Prioritaires',
              href: '/tasks'
            }
          ]
        },
        { 
          icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>`, 
          label: 'Rapports', 
          href: '/reports' 
        }
      ]
    }
  },
  mounted() {
    // Détecter si la sidebar est étendue
    const sidebar = this.$el;
    
    sidebar.addEventListener('mouseenter', () => {
      this.isExpanded = true;
    });
    
    sidebar.addEventListener('mouseleave', () => {
      this.isExpanded = false;
      this.openSubmenu = null;
    });
  },
  methods: {
    toggleSubmenu(href) {
      if (this.isExpanded) {
        this.openSubmenu = this.openSubmenu === href ? null : href;
      }
    },
    isTasksActive() {
      return this.$route.path.startsWith('/tasks');
    }
  }
}
</script>
