<template>
    <div class="bg-zinc-900 text-white rounded-xl shadow p-4 flex flex-col justify-between">
      <div>
        <img :src="data.image" alt="封面" class="rounded-md w-full object-cover mb-4 aspect-square" />
        <div v-if="data.tag" class="text-sm text-gray-400 mb-1">
          <span class="bg-zinc-700 text-xs px-2 py-0.5 rounded">{{ data.tag }}</span>
        </div>
        <h3 class="text-base font-semibold truncate mb-1">{{ data.title }}</h3>
        <p class="text-sm text-gray-300 line-clamp-2">{{ data.artist }}</p>
      </div>
      <button class="mt-4 bg-white text-black text-sm font-semibold rounded px-3 py-1.5 hover:bg-gray-200 transition">
        前往收聽
      </button>
    </div>
  </template>
  
  <script setup>
  defineProps({
    data: {
      type: Object,
      required: true
    }
  })
  </script>
  