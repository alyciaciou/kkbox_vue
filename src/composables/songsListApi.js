import { GET, POST, DELETE } from "@/composables/base"

const getToken = () => {
    const res = GET(`/api/token`)
    return res
}

const getNewSongs = () => {
    const res = GET(`/api/kkbox/chart`)
    return res
}

const getNewHitSongs = () => {
    const res = GET(`/api/kkbox/new-hits`)
    return res
}

const getSessionsSongs = () => {
    const res = GET(`/api/kkbox/sessions`)
    return res
}

const getHitsTracks = async (id) => {
    const res = GET(`/api/kkbox/new-hits/${id}`)
    return res
}

const searchSongs = async (name) => {
    const res = GET(`/api/kkbox/search`, { q: name })
    return res
}

export {
    getToken,
    getNewSongs,
    getNewHitSongs,
    getSessionsSongs,
    getHitsTracks,
    searchSongs,
}
