<template>
  <div>
    <!-- Barre de navigation -->
    <nav class="navbar navbar-light bg-light">
      <div class="container">
        <ul class="nav">
          <li class="nav-item">
            <router-link
              :class="['nav-link', { active: linkActive === 'customers-list' }]"
              to="/customers" @click="buttonFocus('customers-list')"
            >
              <i :class="['fa-solid', 'fa-users', { active: $route.name === 'customers-list' }]"></i>
              Customers
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              :class="['nav-link', { active: linkActive === 'products-list' }]"
              to="/products" @click="buttonFocus('products-list')"
            >
              <i :class="['fa-solid', 'fa-box-open', { active: $route.name === 'products-list' }]"></i>
              Products
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              :class="['nav-link', { active: linkActive === 'order-list' }]"
              to="/orders" @click="buttonFocus('order-list')"
            >
              <i :class="['fa-solid', 'fa-cart-shopping', { active: $route.name === 'order-list' }]"></i>
              Orders
            </router-link>
          </li>
        </ul>
      </div>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const linkActive = ref('customers-list'); // Par défaut "Customers" actif
const route = useRoute();

// Vérification de la route active au montage du composant
onMounted(() => {
  if (route.name === 'products-list') {
    linkActive.value = 'products-list';
  } else if (route.name === 'order-list') {
    linkActive.value = 'order-list';
  } else {
    linkActive.value = 'customers-list'; // "Customers" par défaut
  }
});

const buttonFocus = (val) => {
  linkActive.value = val;
};
</script>

<style scoped>
/* Couleur noire par défaut */
.nav-link {
  color: black;
  transition: color 0.3s ease;
}


.nav-link.active {
  color: blue;
}


.nav-link i {
  color: black;
}

.nav-link.active i {
  color: blue;
}
</style>
