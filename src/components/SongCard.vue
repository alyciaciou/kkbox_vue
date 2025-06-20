<template>
    <div
        :class="[
            'text-white rounded-xl shadow flex flex-col justify-between bg-zinc-900',
            size === 'small' ? 'p-2' : 'p-4',
        ]"
    >
        <div>
            <img
                :src="
                    size === 'small'
                        ? data?.album?.images?.[0]?.url ||
                          data?.images?.[0]?.url
                        : data?.album?.images?.[2]?.url ||
                          data?.images?.[2]?.url
                "
                alt="封面"
                :class="[
                    'rounded-md w-full object-cover mb-2',
                    size === 'small' ? 'aspect-square' : 'aspect-square mb-4',
                ]"
            />
            <div v-if="data.tag" class="text-sm text-gray-400 mb-1">
                <span class="bg-zinc-700 text-xs px-2 py-0.5 rounded">{{
                    data.tag
                }}</span>
            </div>
            <h3
                :class="
                    size === 'small'
                        ? 'text-sm font-semibold truncate mb-0.5'
                        : 'text-base font-semibold truncate mb-1'
                "
            >
                {{ data?.album?.name || data?.title }}
            </h3>
            <p
                :class="
                    size === 'small'
                        ? 'text-xs text-gray-300 line-clamp-2'
                        : 'text-sm text-gray-300 line-clamp-2'
                "
            >
                {{
                    data?.["album"]?.["artist"]?.["name"] ||
                    data?.["description"]
                }}
            </p>
            <template v-if="data && data.owner && data.owner.description">
                <p
                    :class="
                        size === 'small'
                            ? 'text-xs text-gray-300 line-clamp-2'
                            : 'text-sm text-gray-300 line-clamp-2'
                    "
                >
                    {{ data.owner.description }}
                </p>
            </template>
        </div>
        <button
            @click="
                if (size === 'small') {
                    $emit('search', data);
                } else {
                    router.push({
                        name: 'HitsSongs',
                        params: { id: `${data?.['id']}`, type: '其他歌單' },
                    });
                }
            "
            v-if="showListBtn"
            :class="[
                'bg-white text-black hover:bg-gray-200 transition rounded',
                size === 'small' ? 'mt-2  p-1' : 'mt-4  p-2',
            ]"
        >
            {{ size === "small" ? "試聽" : "前往歌單" }}
        </button>
    </div>
</template>

<script setup>
    import { useRouter } from "vue-router";

    const router = useRouter();

    defineProps({
        data: {
            type: Object,
            required: true,
        },
        showListBtn: {
            type: Boolean,
            default: true,
        },
        size: {
            type: String,
            default: "normal",
        },
    });
</script>
