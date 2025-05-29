<template>
    <div class="min-h-screen bg-black text-white px-4 py-6">
        <h2 class="text-center text-2xl font-bold mb-6">華語速爆新歌</h2>

        <div class="flex flex-col lg:flex-row gap-6">
            <!-- KKBOX 播放器 -->
            <!-- <div class="w-full lg:w-1/3 bg-zinc-900 rounded-lg overflow-hidden shadow">
          <iframe
            class="w-full aspect-[1/1.3]"
            :src="kkboxEmbedUrl"
            frameborder="0"
            allow="autoplay *; encrypted-media *;"
            allowfullscreen
          ></iframe>
        </div> -->

            <!-- YouTube 影片 -->
            <div
                class="w-full lg:w-1/3 bg-zinc-900 rounded-lg overflow-hidden shadow flex justify-center items-center"
            >
                <iframe
                    class="w-full aspect-video"
                    :src="youtubeEmbedUrl"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            </div>

            <!-- 歌曲清單 -->
            <div
                class="w-full lg:w-1/3 bg-zinc-900 rounded-lg p-4 space-y-3 shadow"
            >
                <div
                    v-for="song in songList"
                    :key="song.id"
                    class="flex items-start gap-3 border-b border-white/10 pb-3 last:border-none"
                >
                    <img
                        :src="song.cover"
                        class="w-12 h-12 rounded object-cover"
                    />
                    <div class="flex-1">
                        <div class="text-sm font-semibold">{{ song.name }}</div>
                        <div class="text-xs text-zinc-400">
                            {{ song.artist }}
                        </div>
                    </div>
                    <a
                        :href="song.link"
                        target="_blank"
                        class="text-xs border px-2 py-0.5 rounded hover:bg-white hover:text-black"
                    >
                        觀看
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import Header from "@/components/Header.vue"
    import Footer from "@/components/Footer.vue"

    import { getHitsTracks } from "@/composables/songsListApi.js"

    import { onBeforeMount, ref } from "vue"
    const kkboxEmbedUrl =
        "https://widget.kkbox.com/v1/?id=Hz-UaHpmNLty6pK-Zk&type=playlist&terr=tw&lang=tc"
    const youtubeEmbedUrl = "https://www.youtube.com/embed/VpDnTQyAVlU"

    const songList = [
        {
            id: 1,
            name: "告五人《台北女子圖鑑》主題曲",
            artist: "Various Artists",
            cover: "https://i.kfs.io/album/global/99999999,0v1/fit/500x500.jpg",
            link: "https://www.youtube.com/watch?v=VpDnTQyAVlU",
        },
        {
            id: 2,
            name: "孤勇者 - Live",
            artist: "陳奕迅 (Eason Chan)",
            cover: "https://i.kfs.io/album/global/99999999,0v2/fit/500x500.jpg",
            link: "https://www.youtube.com/watch?v=abc123",
        },
        // ... 更多歌曲
    ]
</script>
