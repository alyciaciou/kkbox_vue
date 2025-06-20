<script setup>
    import Header from "@/components/Header.vue";
    import Footer from "@/components/Footer.vue";
    import ChartSection from "@/components/ChartSection.vue";

    import { searchSongs } from "@/composables/songsListApi.js";

    import { onBeforeMount, ref, computed, watch } from "vue";
    import { useRoute } from "vue-router";

    const route = useRoute();
    const result = ref([]);

    onBeforeMount(async () => {
        try {
            const res = await searchSongs(route.query.name);
            result.value = res.data.tracks.data;
        } catch (error) {}
    });

    watch(
        () => route.query.name,
        async (newVal, oldVal) => {
            if (newVal !== oldVal) {
                try {
                    const res = await searchSongs(newVal);
                    result.value = res.data.tracks.data;
                } catch (error) {}
            }
        }
    );

    const showPlayer = ref(false);
    const songId = ref(null);
    const kkboxEmbedUrl = computed(() => {
        return `https://widget.kkbox.com/v1/?id=${encodeURIComponent(
            songId.value
        )}&type=song&terr=TW&lang=JA`;
    });

    const getSearchResult = (songInfo) => {
        songId.value = songInfo.id;
        showPlayer.value = true;
    };
</script>

<template>
    <div class="bg-black min-h-screen flex flex-col">
        <header>
            <Header />
        </header>
        <main class="mt-10 bg-slate-950 px-12 flex-1">
            <section class="container mx-auto">
                <ChartSection
                    title="搜尋結果"
                    :songs="result"
                    :showBtn="false"
                    size="small"
                    @search="getSearchResult"
                />
            </section>
            <!-- 浮動 KKBOX 播放器 -->
            <div
                v-if="showPlayer"
                class="fixed bottom-0 z-50 w-[96%] bg-zinc-900 rounded-lg overflow-hidden shadow"
            >
                <iframe
                    :src="kkboxEmbedUrl"
                    frameborder="0"
                    type="text/html"
                    width="100%"
                    height="100px"
                ></iframe>
            </div>
        </main>
        <footer>
            <Footer />
        </footer>
    </div>
</template>
