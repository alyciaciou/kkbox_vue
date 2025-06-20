<script setup>
    import Header from "@/components/Header.vue";
    import Footer from "@/components/Footer.vue";

    import {
        getHitsTracks,
        getNewSongs,
        searchYtVideo,
    } from "@/composables/songsListApi.js";

    import { onBeforeMount, ref, computed } from "vue";
    import { useRoute } from "vue-router";

    const route = useRoute();
    const songList = ref();
    onBeforeMount(async () => {
        try {
            if (route.params.type === "其他歌單") {
                // 如果是排行榜 ID，呼叫 getHitsTracks
                const res = await getHitsTracks(route.params.id);
                console.log(res);
                songList.value = res.data.data;
            } else {
                // 否則呼叫 getNewSongs
                const res = await getNewSongs();
                songList.value = res.data.data;
            }
        } catch (error) {}
    });
    const isHidden = ref(false);
    const kkboxEmbedUrl = computed(() => {
        return `https://widget.kkbox.com/v1/?id=${encodeURIComponent(
            route.params.id
        )}&type=playlist`;
    });
    const youtubeEmbedUrl = ref("");
    const showVideo = ref(false);

    const searchSongs = async (songInfo) => {
        try {
            const res = await searchYtVideo(songInfo.name);
            showVideo.value = true;
            youtubeEmbedUrl.value = `https://www.youtube.com/embed/${res.data["items"][0]["id"]["videoId"]}`;
        } catch (error) {}
    };
</script>

<template>
    <div class="flex flex-col min-h-screen bg-black text-white">
        <header>
            <Header />
        </header>
        <main>
            <h2 class="text-center text-2xl font-bold mb-6 px-12">
                華語速爆新歌
            </h2>
            <div class="flex flex-col sm:flex-row justify-center items-center">
                <button
                    @click="isHidden = true"
                    class="text-lg w-24 text-white border-2 rounded-md hover:bg-slate-50 hover:text-slate-900 p-1 sm:mr-2 mb-2 sm:mb-0"
                    type="button"
                >
                    開始試聽
                </button>
                <button
                    @click="isHidden = false"
                    class="text-lg w-24 text-white border-2 rounded-md hover:bg-slate-50 hover:text-slate-900 p-1"
                    type="button"
                >
                    結束試聽
                </button>
            </div>

            <!-- 浮動 KKBOX 播放器 -->
            <div
                v-if="isHidden"
                class="fixed bottom-0 sm:bottom-40 left-1/2 -translate-x-1/2 z-50 sm:w-[300px] w-[250px] bg-zinc-900 rounded-lg overflow-hidden shadow"
            >
                <iframe
                    :src="kkboxEmbedUrl"
                    frameborder="0"
                    type="text/html"
                    width="100%"
                    height="500px"
                ></iframe>
            </div>

            <div
                class="flex-1 flex flex-col items-center justify-center px-12 py-6"
            >
                <div
                    class="flex flex-col lg:flex-row gap-6 justify-center items-center w-full"
                >
                    <!-- YouTube 影片 -->
                    <div
                        class="w-full bg-zinc-900 rounded-lg shadow flex justify-center items-center"
                    >
                        <iframe
                            v-if="showVideo"
                            class="w-full aspect-video"
                            :src="youtubeEmbedUrl"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                        ></iframe>
                    </div>

                    <!-- 歌曲清單 -->
                    <div
                        class="w-full lg:w-1/3 bg-zinc-900 rounded-lg p-4 space-y-3 shadow max-h-[500px] overflow-y-auto"
                    >
                        <div
                            v-for="song in songList"
                            :key="song?.id"
                            class="flex items-start gap-3 border-b border-white/10 pb-3 last:border-none"
                        >
                            <img
                                :src="
                                    song?.['album']?.['artist']?.[
                                        'images'
                                    ]?.[0]?.['url']
                                "
                                class="w-12 h-12 rounded object-cover"
                            />
                            <div class="flex-1">
                                <div class="text-sm font-semibold">
                                    {{ song.name }}
                                </div>
                                <div class="text-xs text-zinc-400">
                                    {{ song?.["album"]?.["artist"]?.["name"] }}
                                </div>
                            </div>
                            <button
                                @click="searchSongs(song)"
                                type="button"
                                class="text-sm border p-2 rounded hover:bg-white hover:text-black"
                            >
                                觀看
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <footer>
            <Footer />
        </footer>
    </div>
</template>
