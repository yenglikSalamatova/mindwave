<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useProductStore } from './stores/products.store'

const productsStore = useProductStore()

const createForm = reactive({
  productName: '',
  productAmount: 0,
})

const updateForm = reactive({
  id: 0,
  product_name: '',
  product_amount: 0,
})

const deleteForm = reactive({
  id: 0,
})

const handleSubmitCreateProduct = () => {
  productsStore.createProduct({
    product_name: createForm.productName,
    product_amount: createForm.productAmount,
  })
  createForm.productName = ''
  createForm.productAmount = 0
}

const handleUpdateProduct = () => {
  productsStore.updateProduct({
    id: updateForm.id,
    product_name: updateForm.product_name,
    product_amount: updateForm.product_amount,
  })
  updateForm.id = 0
  updateForm.product_name = ''
  updateForm.product_amount = 0
}

const handleDeleteProduct = () => {
  productsStore.deleteProduct(deleteForm.id)
  deleteForm.id = 0
}

onMounted(() => {
  productsStore.getAllProducts()
})
</script>

<template>
  <main class="min-h-screen bg-gray-50 py-8 px-4">
    <div class="grid grid-cols-2 w-full">
      <!-- Products List Section -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">All Products</h2>
        <div
          v-if="!productsStore.loading && productsStore.products?.length"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <div
            v-for="product in productsStore.products"
            :key="product.id"
            class="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200 shadow-sm"
          >
            <div class="flex flex-col h-full">
              <div class="text-sm text-gray-500 mb-2">#{{ product.id }}</div>
              <div class="font-medium text-gray-900 mb-3 text-lg">{{ product.product_name }}</div>
              <div class="mt-auto">
                <span
                  class="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium"
                >
                  {{ product.product_amount }} units
                </span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="productsStore.loading" class="text-center py-12">
          <div
            class="inline-block animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"
          ></div>
        </div>
        <div
          v-if="!productsStore.products?.length && !productsStore.loading"
          class="text-center py-12 text-gray-500"
        >
          No products available
        </div>
      </div>

      <div class="gap-6">
        <!-- Create Product Form -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Create Product</h2>
          <form @submit.prevent="handleSubmitCreateProduct" class="space-y-5">
            <div class="space-y-4">
              <div>
                <label for="create-name" class="block text-sm font-semibold text-gray-700 mb-1"
                  >Product Name</label
                >
                <input
                  id="create-name"
                  type="text"
                  v-model="createForm.productName"
                  class="block w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <label for="create-amount" class="block text-sm font-semibold text-gray-700 mb-1"
                  >Amount</label
                >
                <input
                  id="create-amount"
                  type="number"
                  v-model="createForm.productAmount"
                  class="block w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                  placeholder="Enter amount"
                />
              </div>
            </div>
            <button
              type="submit"
              class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Create Product
            </button>
          </form>
        </div>

        <!-- Update Product Form -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Update Product</h2>
          <form @submit.prevent="handleUpdateProduct" class="space-y-5">
            <div class="space-y-4">
              <div>
                <label for="update-id" class="block text-sm font-semibold text-gray-700 mb-1"
                  >Product ID</label
                >
                <input
                  id="update-id"
                  type="number"
                  v-model="updateForm.id"
                  class="block w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition-colors"
                  placeholder="Enter ID"
                />
              </div>
              <div>
                <label for="update-name" class="block text-sm font-semibold text-gray-700 mb-1"
                  >Product Name</label
                >
                <input
                  id="update-name"
                  type="text"
                  v-model="updateForm.product_name"
                  class="block w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition-colors"
                  placeholder="Enter new name"
                />
              </div>
              <div>
                <label for="update-amount" class="block text-sm font-semibold text-gray-700 mb-1"
                  >Amount</label
                >
                <input
                  id="update-amount"
                  type="number"
                  v-model="updateForm.product_amount"
                  class="block w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition-colors"
                  placeholder="Enter new amount"
                />
              </div>
            </div>
            <button
              type="submit"
              class="w-full bg-yellow-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-colors"
            >
              Update Product
            </button>
          </form>
        </div>

        <!-- Delete Product Form -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Delete Product</h2>
          <form @submit.prevent="handleDeleteProduct" class="space-y-5">
            <div>
              <label for="delete-id" class="block text-sm font-semibold text-gray-700 mb-1"
                >Product ID</label
              >
              <input
                id="delete-id"
                type="number"
                v-model="deleteForm.id"
                class="block w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors"
                placeholder="Enter product ID"
              />
            </div>
            <button
              type="submit"
              class="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
            >
              Delete Product
            </button>
          </form>
        </div>
      </div>

      <!-- Error Display -->
      <div v-if="productsStore.error" class="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-red-700">{{ productsStore.error }}</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
