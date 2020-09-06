import Vue from "vue";
import Vuelidate from 'vuelidate';
import App from "./App.vue";
import router from "./router";
import store from "./store";
import dateFilter from '@/filters/date.filter';
import currencyFilter from "./filters/currency.filter";
import tooltipDirective from '@/directives/tooltip.directive';
import messagePlugin from '@/utils/message.plugin';
import Loader from '@/components/app/Loader';
import "./registerServiceWorker";
import 'materialize-css/dist/js/materialize.min';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(Vuelidate);
Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.directive('tooltip', tooltipDirective);
Vue.component('Loader', Loader);

firebase.initializeApp({
  apiKey: "AIzaSyAo-F-rnIhVZC8ZRTK9EpZ-pJMDKU3nCK8",
  authDomain: "vue-crm-42f9b.firebaseapp.com",
  databaseURL: "https://vue-crm-42f9b.firebaseio.com",
  projectId: "vue-crm-42f9b",
  storageBucket: "vue-crm-42f9b.appspot.com",
  messagingSenderId: "310279906964",
  appId: "1:310279906964:web:30b9bde0ec501b82d47681"
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});


