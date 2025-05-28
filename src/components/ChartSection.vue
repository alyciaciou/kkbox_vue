<template>
    <section class="mb-10">
      <h2 class="text-xl font-bold mb-4">{{ title }}</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SongCard v-for="(song, index) in songs" :key="index" :data="song" />
      </div>
    </section>
  </template>
  
  <script setup>
  import SongCard from './SongCard.vue'
  
  defineProps({
    title: String,
    songs: Array
  })
  </script>
  