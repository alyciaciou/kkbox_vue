import { GET, POST, DELETE } from '@/composables/base';

const getToken = () => {
    const res = GET(`/api/token`);
    return res;
};


export { getToken }