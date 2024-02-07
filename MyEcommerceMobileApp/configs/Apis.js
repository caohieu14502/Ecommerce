import axios, { Axios } from "axios";

const Host = 'http://192.168.1.12:8000/'

export const endpoints = {
    'categories': '/categories/',
    'products': '/products/',
    // 'category-product':(cateId) `categories/${cateId}/products`,
    'product-details': (productId) => `/products/${productId}`,
    'store': (storeId) => `/store/${storeId}`,
    'login': '/o/token/',
    'current-user': '/users/current-user/',
    // 'register': '/users/',
}

export const authApi = (accessToken) => axios.create({
    baseURL: Host,
    headers: {
        "Authorization": `bearer ${accessToken}`
    }
})

export default axios.create({
    baseURL: Host
})