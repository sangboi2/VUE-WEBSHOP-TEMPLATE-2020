import Vue from "vue";
import Vuex from "vuex";
import { dbMenuAdd, dbOrders } from "../../firebase";

// To import dbOrders from firebase for Orders, but smarter way in above
/*
   import { dbOrders } from '../../firebase'
*/

// It works without below these!!! Otherwise, it will give error.
/*
   import firebase from 'firebase'
   import 'firebase/firestore'
   import store from 'store/index.js'
*/

// Note: Before, we need to render the page to see the result change.
// With vuex, it will automatically the page as well as you can see.
// Now, we don't have to click and render the page anymore to see the result change.
// Now it' doing hot-reload and re-rendering in vuex.
// Vuex is doing the data control like a kind of doing a watch the data as well.
// We just moving the business logic into the 'STORE'
// Next challenge is to do at menu page. Now it is on only admin page.
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    counter: 0,
    //Vuex data structure connected to computed area in Menu.vue
    /*  { It's just static item for an array
       name: "Bagel Suprem",
       description: "Suger, Chedder & Chilli",
       quantity: 1
     } */
    basketItems: [],
    // For menuItems
    menuItems: [], // Put something inside if you want to test
    // For orderItems
    orderItems: [],
    // Current user as a standard
    currentUser: null
  },
  mutations: {
    // Mutation for addCheckoutItem
    addCheckoutItem: (state) => {
      dbOrders.add({
        archive: false,
        storeOrder: false,
        orderNumber: state.counter++,
        status: "warning",
        // To create just one document where all items can be put in orders db. Not depending on each other.
        orderLines: state.basketItems
      })
    },
    //Mutation for addBasketItems already existing in vuex
    addBasketItems: (state, basketItems) => {
      // If statements to control all data to check if it's an instance of array
      if (basketItems instanceof Array) {
        basketItems.forEach(item => {
          if (
            state.basketItems.find(itemInArray => item.name === itemInArray.name)) {
            item = state.basketItems.find(itemInArray => item.name === itemInArray.name);
            //this.increaseQtn(item); this function doesn't exist any more. We use below function instead of.
            item.quantity++;
          }
          else {
            state.basketItems.push({
              name: item.name,
              price: item.price,
              quantity: 1
            })
          }
        })
      }
      // we have stopped now adding the same item again and again with changing above code
    },
    //It's just to check a user.
    userStatus(state, user) {
      if (user) {
        state.currentUser = user
      } else {
        state.currentUser = null
      }
    },
    // It's just dynamic and scalable in vuex. We copy from Admin.vue and comment there from.
    setMenuItems: state => {
      let menuItems = []
      dbMenuAdd.onSnapshot(snapshotItems => {
        menuItems = []
        snapshotItems.forEach((doc) => {
          var menuItemData = doc.data();
          menuItems.push({
            ...menuItemData,
            id: doc.id
          })
        })
        state.menuItems = menuItems
      }
      )
    },
    // It is for OrdersItem just like menuItems
    setOrderItems: state => {
      let orderItems = []
      dbOrders.onSnapshot(snapshotItems => {
        orderItems = []
        snapshotItems.forEach((doc) => {
          var orderItemData = doc.data();
          orderItems.push({
            ...orderItemData,
            id: doc.id
          })
        })
        state.orderItems = orderItems
      }
      )
    }
  },
  actions: {
    // To setCheckoutitems
    setCheckoutItem: context => {
      context.commit('addCheckoutItem')
    },
    // To controll user here, decided by firebase
    setUser(context, user) {
      // setUser ({ commit}, user)
      context.commit('userStatus', user)
      // commit('userStatus', user)
    },
    // To control items
    setMenuItems: context => {
      // This will trigger
      context.commit('setMenuItems')
    },
    setOrderItems: context => {
      // This will trigger
      context.commit('setOrderItems')
    }
  },
  // Below we added 'getters'.
  getters: {
    getBasketItems: state => state.basketItems,
    currentUser: state => state.currentUser,
    getMenuItems: state => state.menuItems,
    // We can now use the getters inside orders page
    getOrderItems: state => state.orderItems
  },
  modules: {}
});
