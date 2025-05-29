<template>
    <div class="flex flex-col md:flex-row justify-between items-center font-bold bg-black opacity-80 sticky top-0 px-12 py-4 z-10">
        
            <h1 class="text-3xl text-white mb-3 md:mb-0">
                <RouterLink to="/">
                音樂榜
                </RouterLink>
            </h1>
        <div class=" flex flex-col md:flex-row items-center justify-between ">
            <input class="w-full md:w-[74%] md:mr-3 mb-3 md:mb-0 rounded-md p-2 text-zinc-800" type="search" placeholder="請輸入歌名">
            <button class="text-lg w-full md:w-[24%] text-white border-2 rounded-md hover:bg-slate-50 hover:text-slate-900 p-1" type="button">搜尋</button>
        </div>
    </div>
</template>

<script setup>
    import { RouterLink } from 'vue-router'

</script>