import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
// import firebase from "firebase";
// import "firebase/firestore";

Vue.config.productionTip = false
// Default
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')


/* let app;

firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }

}); */


