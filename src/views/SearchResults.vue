<script setup>
    import Header from "@/components/Header.vue"
    import Footer from "@/components/Footer.vue"
    import ChartSection from "@/components/ChartSection.vue"

    import {
        getToken,
        getNewSongs,
        getNewHitSongs,
        getSessionsSongs,
    } from "@/composables/songsListApi.js"

    import { onBeforeMount, ref } from "vue"

    const topSongs = ref([])
    const explosiveSongs = ref([])
    const wallSongs = ref([])

    onBeforeMount(async () => {
        try {
            await getToken()
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
                            explosiveSongs.value = result.value.data.data.slice(
                                0,
                                4
                            )
                            break
                        case 2:
                            wallSongs.value = result.value.data.data.slice(0, 4)
                            break
                    }
                }
            })
        } catch (error) {}
    })
</script>

<template>
    <div class="bg-black">
        <Header />
        <main class="mt-10 bg-slate-950 px-12">
            <section class="container mx-auto">
                <ChartSection
                    title="搜尋結果"
                    :songs="wallSongs"
                    :showBtn="false"
                    size="small"
                />
            </section>
        </main>
        <Footer />
    </div>
</template>
