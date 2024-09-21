import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';


import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Importation de FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


import '@fortawesome/fontawesome-free/css/all.css';
// Importation des icônes spécifiques dont tu as besoin
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

// Ajout des icônes à la bibliothèque
library.add(faEye, faEdit, faTrash);

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.mount('#app');