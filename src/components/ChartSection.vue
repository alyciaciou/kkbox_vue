<template>
    <section class="mb-10 text-white">
        <div class="flex justify-center items-center font-bold mb-8">
            <h2 class="text-4xl text-center mr-8">{{ title }}</h2>
            <button
                @click="
                    router.push({
                        name: 'HitsSongs',
                        params: { id: 'LZPhK2EyYzN15dU-PT' },
                    })
                "
                v-if="showBtn"
                class="text-lg w-24 text-white border-2 rounded-md hover:bg-slate-50 hover:text-slate-900 p-1"
                type="button"
            >
                完整榜單
            </button>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <SongCard
                v-for="(song, index) in songs"
                :key="index"
                :data="song"
                :showListBtn="!showBtn"
            />
        </div>
    </section>
</template>

<script setup>
    import SongCard from "./SongCard.vue"
    import { useRouter } from "vue-router"

    const router = useRouter()

    defineProps({
        title: String,
        songs: Array,
        showBtn: {
            type: Boolean,
            default: true,
        },
    })
</script>
