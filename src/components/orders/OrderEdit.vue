<template>
    <div class="container">
        <h2 class="mb-4 mt-4">Edit Orders</h2>
      <form class="row g-3">
        <div class="btn-right-action mt-4 mb-4 d-flex justify-content-end">
          <RouterLink
            type="button"
            class="btn btn-secondary mx-4"
            :to="{ name: 'order-list' }"
          >
            Orders List
          </RouterLink>
          <button type="button" class="btn btn-primary" @click="submitEdit">
            Save Changes
          </button>
        </div>
  
        <div class="col-md-6">
          <label for="date" class="form-label">Date</label>
          <input v-model="order.date" type="date" class="form-control" id="date" />
        </div>
        <div class="col-md-6">
          <label for="address" class="form-label">Delivery Address</label>
          <input v-model="order.deliveryAddress" type="text" class="form-control" id="address" />
        </div>
        <div class="col-md-6">
          <label for="name" class="form-label">Customer Name</label>
          <input v-model="order.customerName" type="text" class="form-control" id="name" />
        </div>
        <div class="col-md-6">
          <label for="trackNumber" class="form-label">Track Number</label>
          <input v-model="order.trackNumber" type="text" class="form-control" id="trackNumber" />
        </div>
        <div class="col-md-6 offset-6">
          <label for="status" class="form-label">Order Status</label>
          <select v-model="order.status" class="form-select">
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </form>
  
      <div class="row mt-5 mx-1">
        <h2 class="mx-0">Order Details</h2>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(detail, index) in order.details" :key="index">
              <td>
                <select v-model="detail.product" class="form-select">
                  <option value="" disabled>Select Product</option>
                  <option value="Product 1">Product 1</option>
                  <option value="Product 2">Product 2</option>
                </select>
              </td>
              <td>
                <input v-model="detail.quantity" type="number" class="form-control" />
              </td>
              <td>
                <input v-model="detail.price" type="number" class="form-control" readonly />
              </td>
              <td>
                <button @click="removeDetail(index)" class="btn btn-danger">Remove</button>
              </td>
            </tr>
            <tr>
              <td colspan="4">
                <button @click="addDetail" class="btn btn-success">Add New Detail</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  import { RouterLink, useRoute } from 'vue-router';
  import { ref, onMounted } from 'vue';
  
  const route = useRoute();
  const order = ref({
    date: '',
    deliveryAddress: '',
    customerName: '',
    trackNumber: '',
    status: 'processing',
    details: [
      { product: 'Product 1', quantity: 1, price: 100 },
    ],
  });
  
  // Charger les données de la commande pour l'édition
  onMounted(() => {
    const orderId = route.params.id;
    order.value = {
      date: '2023-09-18',
      deliveryAddress: '123 Main St',
      customerName: 'John Doe',
      trackNumber: 'XYZ123',
      status: 'shipped',
      details: [
        { product: 'Product 1', quantity: 2, price: 200 },
      ],
    };
  });
  
  const addDetail = () => {
    order.value.details.push({ product: '', quantity: 1, price: 0 });
  };

  function removeDetail(index) {
    if (order.value.details.length > 1) {
      order.value.details.splice(index, 1);
    } else {
      alert("You cannot delete the last remaining detail.");
    }
  }
  
  
  const submitEdit = () => {
    console.log('Edited order:', order.value);
  
  };
  </script>
  
  <style scoped>
  /* h2 {
    font-weight: bold;
  } */
  </style>
  