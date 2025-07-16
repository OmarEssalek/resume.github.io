<template>
  <div class="border-b border-gray-200 bg-white p-4 flex items-center justify-between">
    <div class="flex items-center space-x-3">
      <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
        <span class="text-white font-medium text-sm">Y</span>
      </div>
      <div>
        <h2 class="text-lg font-semibold text-gray-900">YAKIN</h2>
        <p class="text-sm text-gray-500">Assistant IA</p>
      </div>
    </div>
    <button 
      @click="$emit('close')"
      class="text-gray-400 hover:text-gray-600 transition-colors"
    >
      <XIcon />
    </button>
  </div>
</template>

<script>
import { XIcon } from '../icons'

export default {
  name: 'ChatHeader',
  components: {
    XIcon
  },
  emits: ['close']
}
</script>