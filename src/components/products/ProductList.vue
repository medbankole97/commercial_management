<template>
    <div class="container mt-4">
      <h2 class="mb-4">List of Products</h2>
      <div class="d-flex justify-content-end">
        <button class="btn btn-primary mb-3"  @click="openAddModal(product)">Add New Product</button>
      </div>
  
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">Price</th>
            <th scope="col">Stock</th>
            <th scope="col">Barcode</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in products" :key="index">
            <td>{{ product.name }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.stock }}</td>
            <td>{{ product.barcode }}</td>
            <td>{{ product.status }}</td>
            <td>
              <router-link > <font-awesome-icon icon="eye" class="text-info me-2" @click="openViewModal(product)" />
              </router-link>
              <router-link ><font-awesome-icon icon="edit" class="text-warning me-2" @click="openEditModal(product)" />
              </router-link>
              <router-link ><font-awesome-icon icon="trash" class="text-danger" @click="remove(product)" />
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Modal for viewing a product -->
      <div v-if="isEditModalVisible" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header d-flex justify-content-between mb-4 border-bottom">
        <h5 class="modal-title mb-4">View Product</h5>
        <button type="button" class="btn-close mb-4" @click="closeModal">x</button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col">
            <label for="name" class="form-label">Name:</label>
            <input type="text" id="name" class="form-control" v-model="selectedProduct.name" />
          </div>
          <div class="col">
            <label for="category" class="form-label">Category:</label>
            <input type="text" id="category" class="form-control" v-model="selectedProduct.category"  />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <label for="price" class="form-label">Price:</label>
            <input type="text" id="price" class="form-control" v-model="selectedProduct.price"  />
          </div>
          <div class="col">
            <label for="stock" class="form-label">Stock:</label>
            <input type="text" id="stock" class="form-control" v-model="selectedProduct.stock"  />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <label for="barcode" class="form-label">Barcode:</label>
            <input type="text" id="barcode" class="form-control" v-model="selectedProduct.barcode"  />
          </div>
          <div class="col">
          <label for="#" class="mt-2 mb-1">Status</label>
                <select name="status" class="form-control p-2" id="status">
                  <option value="Active" selected>Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Description:</label>
          <textarea id="description" class="form-control" rows="2" v-model="selectedProduct.description" >High-quality product.</textarea>
        </div>
      </div>
      <div class="modal-footer border-top">
        <button type="button" class="btn btn-secondary mt-4 me-2" @click="closeModal">Close</button>
        <button type="button" class="btn btn-primary mt-4" @click="saveChanges">Confirm</button>
      </div>
    </div>
  </div>
      <!-- Add modal -->

      <div v-if="isAddModalVisible" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header d-flex justify-content-between mb-4 border-bottom">
        <h5 class="modal-title mb-4">Create New Product</h5>
        <button type="button" class="btn-close mb-4" @click="closeModal">x</button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col">
            <label for="name" class="form-label">Name:</label>
            <input type="text" id="name" class="form-control" v-model="selectedProduct.name"  />
          </div>
          <div class="col">
            <label for="category" class="form-label">Category:</label>
            <input type="text" id="category" class="form-control" v-model="selectedProduct.category"  />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <label for="price" class="form-label">Price:</label>
            <input type="text" id="price" class="form-control"   value="0" v-model="selectedProduct.price"  />
          </div>
          <div class="col">
            <label for="stock" class="form-label">Stock:</label>
            <input type="text" id="stock" class="form-control" value="0" v-model="selectedProduct.stock"  />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <label for="barcode" class="form-label">Barcode:</label>
            <input type="text" id="barcode" class="form-control" v-model="selectedProduct.barcode"  />
          </div>
          <div class="col">
        <label  for="#"  class="mt-2 mb-1" >Status</label>
                <select name="status" class="form-control p-2" id="status">
                  <option value="Active" selected>Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Description:</label>
          <textarea id="description" class="form-control" rows="2" v-model="selectedProduct.description" >High-quality product.</textarea>
        </div>
      </div>
      <div class="modal-footer border-top">
        <button type="button" class="btn btn-secondary mt-4 me-2" @click="closeModal">Close</button>
        <button type="button" class="btn btn-primary mt-4" @click="saveChanges">Confirm</button>
      </div>
    </div>
  </div>
  
  
      <!-- Modal for editing a product -->
      <div v-if="isViewModalVisible" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header d-flex justify-content-between mb-4 border-bottom">
        <h5 class="modal-title mb-4">Edit Product</h5>
        <button type="button" class="btn-close mb-4" @click="closeModal">x</button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col">
            <label for="name" class="form-label">Name:</label>
            <input type="text" id="name" class="form-control" v-model="selectedProduct.name"  />
          </div>
          <div class="col">
            <label for="category" class="form-label">Category:</label>
            <input type="text" id="category" class="form-control" v-model="selectedProduct.category"  />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <label for="price" class="form-label">Price:</label>
            <input type="text" id="price" class="form-control" v-model="selectedProduct.price"  />
          </div>
          <div class="col">
            <label for="stock" class="form-label">Stock:</label>
            <input type="text" id="stock" class="form-control" v-model="selectedProduct.stock"  />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <label for="barcode" class="form-label">Barcode:</label>
            <input type="text" id="barcode" class="form-control" v-model="selectedProduct.barcode"  />
          </div>
          <div class="col">
        <label  for="#"  class="mt-2 mb-1" >Status</label>
                <select name="status" class="form-control p-2" id="status">
                  <option value="Active" selected>Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Description:</label>
          <textarea id="description" class="form-control" rows="2" v-model="selectedProduct.description" >High-quality product.</textarea>
        </div>
      </div>
      <div class="modal-footer border-top">
        <button type="button" class="btn btn-secondary mt-4 me-2" @click="closeModal">Close</button>
        <button type="button" class="btn btn-primary mt-4" @click="saveChanges">Save</button>
      </div>
    </div>
  </div>
  
    </div>
  </template>
  
  <script setup>
import { ref } from 'vue';

const isViewModalVisible = ref(false); // Modal d'aperçu
const isAddModalVisible = ref(false);
const isEditModalVisible = ref(false); // Modal d'édition
const selectedProduct = ref(null); // Produit sélectionné

// Liste de produits
const products = ref([
  {
    name: 'Product 001',
    description: 'High-quality product.',
    price: 100,
    stock: 50,
    category: 'Electronics',
    barcode: '123456789012',
    status: 'Active',
  },
  {
    name: 'Product 002',
    description: 'Affordable product.',
    price: 50,
    stock: 100,
    category: 'Home Appliances',
    barcode: '987654321098',
    status: 'Inactive',
  },
  {
    name: 'Product 003',
    description: 'Durable product.',
    price: 75,
    stock: 75,
    category: 'Sports',
    barcode: '234567890123',
    status: 'Active',
  },
]);

// Fonction pour ouvrir la modale d'aperçu
const openViewModal = (product) => {
  selectedProduct.value = { ...product };
  isViewModalVisible.value = true;
};

const openAddModal = (product) => {
  selectedProduct.value = { ...product };
  isAddModalVisible.value = true;
};


// Fonction pour ouvrir la modale d'édition
const openEditModal = (product) => {
  selectedProduct.value = { ...product };
  isEditModalVisible.value = true;
};

// Fermer la modale
const closeModal = () => {
  isViewModalVisible.value = false;
  isEditModalVisible.value = false;
  isAddModalVisible.value = false;
};

// Enregistrer les modifications
const saveChanges = () => {
  console.log("Product edited:", selectedProduct.value);
  closeModal();
};

function remove (index)  {
 if(window.confirm("Are you sure to delete the product?")){
  products.value.splice(index,1)
 }
};
</script>
  
  <style scoped>
  .table {
    width: 100%;
    max-width: 100%;
    margin-bottom: 1rem;
    background-color: transparent;
  }
  .table th,
  .table td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  th {
    text-align: left;
  }
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    max-width: 500px;
    width: 100%;
    max-width: 80%; 
  width: 800px; 
}
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .modal-body {
    padding: 20px;
  }
  .modal-footer {
    display: flex;
    justify-content: flex-end;
    padding-top: 20px;
  }
  .btn-close {
    background: none;
    border: none;
    font-size: 1.5rem;
  }
 
  </style>
  