import axios, { Axios } from "axios";

const Host = 'http://192.168.1.5:8000/'

export const endpoints = {
    'categories': '/categories/',
    'products': '/products/',
    // 'category-product':(cateId) `categories/${cateId}/products`,
    'product-details': (productId) => `/products/${productId}`,
    'store': (storeId) => `/store/${storeId}`,
    'category-store': (storeId) => `/store/${storeId}/categories/`,
    'products-store': (storeId) => `/store/${storeId}/products/`,
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