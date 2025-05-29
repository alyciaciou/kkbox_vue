<template>
    <div
        class="bg-zinc-900 text-white rounded-xl shadow p-4 flex flex-col justify-between"
    >
        <div>
            <img
                :src="data?.album?.images?.[2]?.url || data?.images?.[2]?.url"
                alt="封面"
                class="rounded-md w-full object-cover mb-4 aspect-square"
            />
            <div v-if="data.tag" class="text-sm text-gray-400 mb-1">
                <span class="bg-zinc-700 text-xs px-2 py-0.5 rounded">{{
                    data.tag
                }}</span>
            </div>
            <h3 class="text-base font-semibold truncate mb-1">
                {{ data?.album?.name || data?.title }}
            </h3>
            <p class="text-sm text-gray-300 line-clamp-2">
                {{
                    data?.["album"]?.["artist"]?.["name"] ||
                    data?.["description"]
                }}
            </p>
            <p class="text-sm text-gray-300 line-clamp-2">
                {{ data?.["owner"]?.["description"] }}
            </p>
        </div>
        <button
            @click="
                router.push({
                    name: 'HitsSongs',
                    params: { id: `${data?.['id']}` },
                })
            "
            v-if="showListBtn"
            class="mt-4 bg-white text-black text-sSpy-1.5 hover:bg-gray-200 transition"
        >
            前往歌單
        </button>
    </div>
</template>

<script setup>
    import { useRouter } from "vue-router"

    const router = useRouter()

    defineProps({
        data: {
            type: Object,
            required: true,
        },
        showListBtn: {
            type: Boolean,
            default: true,
        },
    })
</script>
