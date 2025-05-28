import axios from "axios"

const env = import.meta.env

const request = axios.create({
    baseURL: `${env.VITE_API_BASE_URL}`,
    headers:{
        'x-api-secret':`${env.VITE_API_SECRET}`
    }
})

request.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token")
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

request.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        let message = {
            error,
        }
        switch (error.response.status) {
            case 400:
                message["status"] = "參數有誤"
                break
            case 401:
                if (error.response.data.detail === "Not authenticated") {
                    message["status"] = "未登入授權，請先登入"
                } else if (
                    error.response.data.detail ===
                    "Could not validate credentials"
                ) {
                    message["status"] = "您的連線已逾時，請重新登入"
                }
                break
            case 403:
                message["status"] = "您沒有操作權限"
                break
            case 404:
                message["status"] = `請求地址有誤：${error.response.config.url}`
                break
            case 408:
                message["status"] = "請求超時，請重新操作"
                break
            case 500:
                message["status"] = "伺服器內部錯誤"
                break
            case 504:
                message["status"] = "伺服器暫時無法訪問，請稍後再試"
                break
            default:
                message["status"] = "異常問題，請聯絡管理員"
                break
        }
        return Promise.reject(message)
    }
)

const GET = async (url, params, config) => {
    try {
        const response = await request.get(url, { params, ...config })
        return response
    } catch (error) {
        return Promise.reject(error)
    }
}

const POST = async (url, data, config) => {
    try {
        const response = await request.post(url, data, config)
        return response
    } catch (error) {
        return Promise.reject(error)
    }
}

const DELETE = async (url, params, config) => {
    try {
        const response = await request.delete(url, { params }, config)
        return response
    } catch (error) {
        return Promise.reject(error)
    }
}

const PATCH = async (url, data, config) => {
    try {
        const response = await request.patch(url, data, config)
        return response
    } catch (error) {
        return Promise.reject(error)
    }
}

export { GET, POST, DELETE, request, PATCH }