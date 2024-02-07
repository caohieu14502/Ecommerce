import axios, { Axios } from "axios";

const Host = 'http://192.168.100.10:8000/'

export const endpoints = {
    'categories': '/categories/',
    'products': '/products/',
    // 'category-product':(cateId) `categories/${cateId}/products`,
    'product-details': (productId) => `/products/${productId}`,
    'store': (storeId) => `/store/${storeId}`,
    'login': '/o/token/',
    'current-user': '/users/current-user/',
    'register': '/users/',
}

export const authApi = (token) => {
    return axios.create({
        baseURL: Host,
        headers: {
            'Authorization': `Bearer ${token}`  
        }
    })
}

export default axios.create({
    baseURL: Host
})