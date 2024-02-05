import axios, { Axios } from "axios";

const Host = 'http://192.168.1.12:8000/'

export const endpoints = {
    'categories': '/categories/',
    'products': '/products/',
    'product-details': (productId) => `/products/${productId}`,
    'store': (storeId) => `/store/${storeId}`,
}

// export const authApi = () => {r
//     return Axios.create({
//         baseURL: Host,
//         headers: {
//             'Authorization': Bearer ...  
//         }
//     })
// }

export default axios.create({
    baseURL: Host
})