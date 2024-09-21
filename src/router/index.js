import { createRouter, createWebHistory } from 'vue-router';

import CustomerList from '../components/customers/CustomerList.vue';
import ProductList from '../components/products/ProductList.vue';
import OrderList from '../components/orders/OrderList.vue';
import OrderAdd from '../components/orders/OrderAdd.vue'; 
import OrderEdit from '../components/orders/OrderEdit.vue';
import OrderView from '../components/orders/OrderView.vue';

const routes = [
  {
    path: '/',
    redirect: '/customers'
  },
  {
    path: '/customers',
    name: 'customers-list', 
    component: CustomerList,
  },
  {
    path: '/products',
    name: 'products-list',    
    component: ProductList,
  },
  {
    path: '/orders',
    name: 'order-list',     
    component: OrderList,
  },
  {
    path: '/add-order',  
    name: 'order-add',
    component: OrderAdd,
  },
  {
    path: '/order-edit/:id',
    name: 'order-edit',
    component: OrderEdit,
  },
  {
    path: '/order-view/:id',
    name: 'order-view',
    component: OrderView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
