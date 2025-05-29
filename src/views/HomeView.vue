<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import ChartSection from "@/components/ChartSection.vue";

import { getToken, getNewSongs, getNewHitSongs, getSessionsSongs } from "@/composables/songsListApi.js";

import { onBeforeMount, ref } from "vue";

const topSongs = ref([]);
const explosiveSongs = ref([]);
const wallSongs = ref([]);

onBeforeMount(async () => {
    try {
        await getToken();
        const results = await Promise.allSettled([
        getNewSongs(),
        getNewHitSongs(),
        getSessionsSongs(),
        ])

        results.forEach((result, index) => {
            if (result.status === "fulfilled") {
                switch (index) {
                    case 0:
                    topSongs.value = result.value.data.data.slice(0, 4)
                        break
                    case 1:
                    explosiveSongs.value = result.value.data.data.slice(0, 4)
                        break
                    case 2:
                    wallSongs.value = result.value.data.data.slice(0, 4)
                        break

                }
            }
        })
    } catch (error) {}
});

</script>

<template>
    <div class="bg-black">
        <Header />
        <header>
            <div
                class="relative flex flex-col items-center justify-center text-center"
            >
                <img
                    @load="handleImg"
                    class="h-[calc(100vh-70px)] w-full object-cover object-center"
                    src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80"
                />
                <div class="absolute inset-0 bg-black opacity-50"></div>
                <div class="absolute bottom-52 text-white">
                    <h1
                        class="text-6xl font-bold mb-4 leading-relaxed opacity-80"
                    >
                        <p class="pr-20">來音樂的世界</p>
                        <p class="pl-20">聽世界的音樂</p>
                    </h1>
                </div>
            </div>
        </header>
        <main class="mt-10 bg-slate-950 px-12">
            <section class="mx-auto text-center text-white mb-10">
                <h2
                    class="mb-5 font-bold text-white text-center text-3xl md:text-4xl"
                >
                    一起享受世界的聲音
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <div>
                        <span class="material-symbols-outlined text-7xl">
                            queue_music
                        </span>
                        <div
                            class="bg-gray-800 hover:bg-gray-700 h-full rounded-md"
                        >
                            <div class="p-4 bg-hover">
                                <h3 class="mb-3 text-xl font-bold">即時新歌</h3>
                                <p>提供最新的歌曲<br />中英日韓，任您挑選</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <span class="material-symbols-outlined text-7xl">
                            youtube_activity
                        </span>
                        <div
                            class="bg-gray-800 hover:bg-gray-700 h-full rounded-md"
                        >
                            <div class="p-4 bg-hover">
                                <h3 class="mb-3 text-xl font-bold">
                                    串接YouTube
                                </h3>
                                <p>除了聲音上的享受<br />也滿足您的視覺</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <span class="material-symbols-outlined text-7xl">
                            favorite
                        </span>
                        <div
                            class="bg-gray-800 hover:bg-gray-700 h-full rounded-md"
                        >
                            <div class="p-4 bg-hover">
                                <h3 class="mb-3 text-xl font-bold">情境歌單</h3>
                                <p>挑選符合您<br />此刻的心情的歌單吧！</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="container mx-auto">
                <ChartSection title="新歌即時榜 TOP 4" :songs="topSongs" />
                <ChartSection
                    title="速爆新歌"
                    :songs="explosiveSongs"
                    :showBtn="false"
                />
                <ChartSection
                    title="情境歌單"
                    :songs="wallSongs"
                    :showBtn="false"
                />
            </section>
        </main>
        <Footer />
    </div>
</template>
