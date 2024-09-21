<template>
  <div class="container mt-4">
    <h2 class="mb-4">List of Customers</h2>
    <div class="d-flex justify-content-end">
      <button class="btn btn-primary mb-3"  @click="openAddModal(customer)">Add New Customer</button>
    </div>
   
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Address</th>
          <th scope="col">Email</th>
          <th scope="col">Phone</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(customer, index) in customers" :key="index">
          <td>{{ customer.name }}</td>
          <td>{{ customer.address }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.phone }}</td>
          <td>
            <router-link ><font-awesome-icon icon="eye" class="text-info me-2" @click="openViewModal(customer)" />
            </router-link>
            <router-link ><font-awesome-icon icon="edit" class="text-warning me-2" @click="openEditModal(customer)" />
            </router-link>
            <router-link ><font-awesome-icon icon="trash" class="text-danger" @click="remove(index)" />
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal d'aperçu -->
    <div v-if="isViewModalVisible" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header d-flex justify-content-between mb-4 border-bottom">
          <h5 class="modal-title mb-4">View Customer</h5>
          <!-- <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >x</button> -->
            <button type="button" class="btn-close mb-4" data-bs-dismiss="modal"
        aria-label="Close" @click="closeModal" style="color: black;">x</button>

        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="name" class="form-label"><strong>Nom :</strong></label>
            <input type="text" id="name" class="form-control" v-model="selectedCustomer.name" disabled />
          </div>
          <div class="mb-3">
            <label for="address" class="form-label"><strong>Adresse :</strong></label>
            <textarea id="address" class="form-control" rows="3" v-model="selectedCustomer.address" disabled></textarea>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label"><strong>Email :</strong></label>
            <input type="email" id="email" class="form-control" v-model="selectedCustomer.email" disabled />
          </div>
          <div class="mb-3">
            <label for="phone" class="form-label"><strong>Téléphone :</strong></label>
            <input type="tel" id="phone" class="form-control" v-model="selectedCustomer.phone" disabled />
          </div>
        </div>
        <div class="modal-footer border-top">
          <button type="button" class="btn btn-secondary mt-4" @click="closeModal">Close</button>
        </div>
      </div>
    </div>
    <!-- Add modal -->
  
    <div v-if="isAddModalVisible" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header d-flex justify-content-between mb-4 border-bottom">
          <h5 class="modal-title mb-4">View Customer</h5>
          <!-- <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >x</button> -->
          <button type="button" class="btn-close mb-4" data-bs-dismiss="modal"
          aria-label="Close" @click="closeModal">x</button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="name" class="form-label"><strong>Nom :</strong></label>
            <input type="text" id="name" class="form-control" />
          </div>
          <div class="mb-3">
            <label for="address" class="form-label"><strong>Adresse :</strong></label>
            <textarea id="address" class="form-control" rows="3" ></textarea>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label"><strong>Email :</strong></label>
            <input type="email" id="email" class="form-control" />
          </div>
          <div class="mb-3">
            <label for="phone" class="form-label"><strong>Téléphone :</strong></label>
            <input type="tel" id="phone" class="form-control"  />
          </div>
        </div>
        <div class="modal-footer border-top">
          <button type="button" class="btn btn-secondary mt-4 me-2" @click="closeModal">Close</button>
          <button type="button" class="btn btn-primary mt-4" @click="saveChanges">Confirm</button>
        </div>
      </div>
    </div>


    <!-- Modal d'édition -->
    <div v-if="isEditModalVisible" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header d-flex justify-content-between mb-4 border-bottom">
          <h5 class="modal-title mb-4">Edit Customer</h5>
          <button type="button" class="btn-close mb-4" @click="closeModal">x</button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="name" class="form-label"><strong>Nom :</strong></label>
            <input type="text" id="name" class="form-control" v-model="selectedCustomer.name" />
          </div>
          <div class="mb-3">
            <label for="address" class="form-label"><strong>Adresse :</strong></label>
            <textarea id="address" class="form-control" rows="3" v-model="selectedCustomer.address"></textarea>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label"><strong>Email :</strong></label>
            <input type="email" id="email" class="form-control" v-model="selectedCustomer.email" />
          </div>
          <div class="mb-3">
            <label for="phone" class="form-label"><strong>Téléphone :</strong></label>
            <input type="tel" id="phone" class="form-control" v-model="selectedCustomer.phone" />
          </div>
        </div>
        <div class="modal-footer border-top">
          <button type="button" class="btn btn-secondary mt-4 me-2" @click="closeModal">Close</button>
          <button type="button" class="btn btn-primary mt-4" @click="saveChanges">Confirm</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Définir les données clients localement dans le composant
const customers = ref([
  { name: 'John Doe', address: '123 Main St, New York, NY', email: 'johndoe@example.com', phone: '123-456-7890' },
  { name: 'Jane Smith', address: '456 Oak St, Los Angeles, CA', email: 'janesmith@example.com', phone: '098-765-4321' },
  { name: 'Alice Martin', address: '789 Pine St, Chicago, IL', email: 'alicemartin@example.com', phone: '234-567-8901' },
  { name: 'David Brown', address: '101 Maple Ave, Houston, TX', email: 'davidbrown@example.com', phone: '345-678-9012' },
  { name: 'Michael Johnson', address: '202 Elm St, Phoenix, AZ', email: 'michaeljohnson@example.com', phone: '456-789-0123' },
  { name: 'Emily Clark', address: '303 Cedar St, Philadelphia, PA', email: 'emilyclark@example.com', phone: '567-890-1234' },
  { name: 'Robert White', address: '404 Birch St, San Antonio, TX', email: 'robertwhite@example.com', phone: '678-901-2345' },
  { name: 'Sarah Green', address: '505 Walnut St, San Diego, CA', email: 'sarahgreen@example.com', phone: '789-012-3456' },
  { name: 'Chris Blue', address: '606 Spruce St, Dallas, TX', email: 'chrisblue@example.com', phone: '890-123-4567' },
  { name: 'Rachel Black', address: '707 Chestnut St, San Jose, CA', email: 'rachelblack@example.com', phone: '901-234-5678' },
]);

const isViewModalVisible = ref(false);
const isAddModalVisible = ref(false);
const isEditModalVisible = ref(false);
const selectedCustomer = ref(null);

// Ouvrir le modal d'aperçu pour un client spécifique
const openViewModal = (customer) => {
  selectedCustomer.value = { ...customer };
  isViewModalVisible.value = true;
};

const openAddModal = (customer) => {
  selectedCustomer.value = { ...customer };
  isAddModalVisible.value = true;
};

// Ouvrir le modal d'édition pour un client spécifique
const openEditModal = (customer) => {
  selectedCustomer.value = { ...customer };
  isEditModalVisible.value = true;
};

// Fermer les modales
const closeModal = () => {
  isViewModalVisible.value = false;
  isEditModalVisible.value = false;
  isAddModalVisible.value = false;
};

// Fonction pour enregistrer les modifications
const saveChanges = () => {
  console.log("Customer edited:", selectedCustomer.value);
  closeModal();
};

// Fonction pour supprimer un client
function remove (index)  {
 if(window.confirm("Are you sure to delete the customer?")){
  customers.value.splice(index,1)
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
  position: relative;
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

.modal-body input,
.modal-body textarea {
  background-color: #ececec; /* Gris clair */
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
}
</style>