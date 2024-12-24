import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios, { AxiosError, type AxiosResponse } from 'axios'
import { axiosInstance } from './axios'

interface IProduct {
  id: number
  product_name: string
  product_amount: number
}

export interface ICreateProductDTO {
  product_name: string
  product_amount: number
}

export interface IUpdateProductDTO extends ICreateProductDTO {
  id: number
}

interface ApiResponse<T> {
  status: number
  content: {
    rows: T
  }
  message?: string
}

const STORE_NAME = 'products'
const API_ENDPOINTS = {
  base: '/sandbox/crud',
  byId: (id: number) => `/sandbox/crud/${id}`,
} as const

export const useProductStore = defineStore(STORE_NAME, () => {
  // State
  const products = ref<IProduct[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Error Handler
  const handleError = (e: unknown): void => {
    if (e instanceof AxiosError) {
      error.value = e.response?.data.message || e.message
      console.error('[ProductStore Error]:', error.value)
    } else {
      error.value = 'An unexpected error occurred'
      console.error('[ProductStore Unknown Error]:', e)
    }
  }

  // Request wrapper
  const makeRequest = async <T>(
    requestFn: () => Promise<AxiosResponse<ApiResponse<T>>>,
  ): Promise<T | null> => {
    loading.value = true
    error.value = null

    try {
      const { data } = await requestFn()
      console.log(data)
      if (data.status === 200) {
        return data.content.rows
      }
      return null
    } catch (e) {
      handleError(e)
      return null
    } finally {
      loading.value = false
    }
  }

  // Actions
  const getAllProducts = async (): Promise<void> => {
    const result = await makeRequest<IProduct[]>(() => axiosInstance.get(API_ENDPOINTS.base))
    if (result) {
      products.value = result
    }
  }

  const createProduct = async (productData: ICreateProductDTO): Promise<boolean> => {
    const result = await makeRequest<IProduct>(() =>
      axiosInstance.post(API_ENDPOINTS.base, productData),
    )

    if (result) {
      await getAllProducts() // Обновляем список после успешного создания
      return true
    }
    return false
  }

  const updateProduct = async (productData: IUpdateProductDTO): Promise<boolean> => {
    const { id, ...updateData } = productData
    const result = await makeRequest<IProduct>(() =>
      axiosInstance.put(API_ENDPOINTS.byId(id), updateData),
    )

    if (result) {
      const index = products.value.findIndex((p) => p.id === id)
      if (index !== -1) {
        products.value[index] = { ...products.value[index], ...updateData }
      }
      return true
    }
    return false
  }

  const deleteProduct = async (id: number): Promise<boolean> => {
    const result = await makeRequest<null>(() => axiosInstance.delete(API_ENDPOINTS.byId(id)))

    if (result !== null) {
      products.value = products.value.filter((p) => p.id !== id)
      return true
    }
    return false
  }

  // Reset store
  const resetStore = () => {
    products.value = []
    error.value = null
    loading.value = false
  }

  return {
    products,
    loading,
    error,

    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    resetStore,
  }
})
