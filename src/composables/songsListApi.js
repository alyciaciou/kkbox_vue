import { GET, POST, DELETE } from '@/composables/base';

const getToken = () => {
    const res = GET(`/api/token`);
    return res;
};

const getNewSongs = () => {
    const res = GET(`/api/kkbox/chart`);
    return res;
};


export { getToken, getNewSongs }