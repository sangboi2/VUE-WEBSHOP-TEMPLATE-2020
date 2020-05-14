<template>
  <v-container fluid>
    <v-row>
      <v-col offset-md="0" md="7" class="ml-12">
        <h1 class="pl-3">Orders</h1>
        <div class="pa-2" id="info">
          <v-row class="0">
            <v-col cols="12" md="1" class="pa-2">
              <p class="font-weight-bold body-1 pl-3 darkgrey--text">INFO:</p>
            </v-col>
            <v-col cols="12" md="5" class="pa-2 pl-6">
              <v-row align="center">
                <div id="status_box" class="success">COMPLETED</div>
                <span class="font-weight-light caption pl-1">DONE</span>
              </v-row>
              <v-row align="center">
                <div id="status_box" class="warning">INPROGRESS</div>
                <span class="font-weight-light caption pl-1">Somebody is working on it</span>
              </v-row>
              <v-row align="center">
                <div id="status_box" class="red">INCOMPLETE</div>
                <span class="font-weight-light caption pl-1">Not started</span>
              </v-row>
            </v-col>
            <v-col cols="12" md="6" class="pa-2">
              <v-row>
                <div id="status_box" class="success mr-3">COMPLETED</div>
                <div id="status_box" class="warning mr-3">INPROGRESS</div>
                <div id="status_box" class="red">INCOMPLETE</div>
              </v-row>
              <v-row>
                <p class="font-weight-light caption pl-1 pr-1">
                  <b>Single-click</b> to switch stage: complete => in progress
                  =>
                  <b>Double-click</b> the box to reset to "not started"
                </p>
                <span class="font-weight-light caption pl-1">
                  <v-icon color="grey">archive</v-icon>Archive to " hide" it from orders list
                </span>
              </v-row>
            </v-col>
          </v-row>
        </div>
        <!--Orders list area-->
        <div class="pa-2 mt-1" id="info">
          <p class="font-weight-bold body-1 pa-3 darkgrey--text">ORDERS:</p>
          <v-simple-table id="menu-table">
            <thead class="thead">
              <tr>
                <th class="text-left" style="width:10%;">ON</th>
                <th class="text-left" style="width:10%;">QTY</th>
                <th class="text-left" style="width:40%;">Item</th>
                <th class="text-left" style="width:10%;">Price</th>
                <th class="text-left" style="width:10%;">Status</th>
                <th class="text-left" style="width:10%;">Archive</th>
                <th class="text-left" style="width:10%;">Remove</th>
              </tr>
            </thead>
            <tbody class="font-weight-light">
              <!-- Switching out menuItems to orderItems below-->
              <!--<tr v-for="item in menuItems" :key="item.name">-->

              <tr v-for="item in orderItems" :key="item.name">
                <td>{{ item.orderNumber }}</td>

                <td class="py-3">
                  <p
                    style="margin:0;"
                    v-for="subitem in item.orderLines"
                    :key="subitem.id"
                  >{{ subitem.quantity }}</p>
                </td>
                <td class="py-3">
                  <p
                    style="margin:0;"
                    v-for="subitem in item.orderLines"
                    :key="subitem.id"
                  >{{ subitem.name }}</p>
                </td>
                <td class="py-3">
                  <p
                    style="margin:0;"
                    v-for="subitem in item.orderLines"
                    :key="subitem.id"
                  >{{ subitem.price }}</p>
                </td>

                <td>
                  <div
                    id="status_box"
                    v-bind:class="item.status"
                    @click="switchStage(item.id)"
                  >{{ item.status }}</div>
                </td>
                <td>
                  <v-icon color="darkgrey" @click="archiveOrderItem(item.id)">archive</v-icon>
                </td>
                <td>
                  <v-icon color="red" @click="deleteOrderItem(item.id)">delete</v-icon>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </div>
      </v-col>
      <!-- Right side revenue box-->
      <v-col offset-md="0" md="4">
        <h1 class="pr-3">Revenue</h1>
        <div class="pa-2" id="info">
          <p class="font-weight-bold body-1 darkgrey--text">Completed Orders:</p>
          <div>
            <p id="totalOrders">
              Total orders:
              <span class="error--text font-weight-bold">{{ orderItems.length }}</span>
            </p>
          </div>

          <div id="revenueList" v-for="item in orderItems" :key="item.name">
            <p>
              Ordernumber
              {{ item.orderNumber }}
              <v-btn small text @click="deleteOrderItem(item.id)">
                <v-icon color="warning">delete</v-icon>
              </v-btn>
            </p>
          </div>
        </div>

        <div class="pa-2 mt-1" id="info">
          <div id="totalRevenue">
            <p id="totalRevenueText">
              Total Revenue:
              <span id="totalRevenueTextTotal">{{revenueTotal}}</span>
            </p>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
// v-if="item-storeOrder == false" should be put line 63
// v-if="item.archive == true" should be put line 122
// Disable after created function is disable using a better way store method like in admin page
import { dbOrders } from "../../firebase";
export default {
  data() {
    return {
      // basket: [], comment after store state is defined.
      basketDump: []
      // Disable after image creation
      // menuItems: []
    };
  },

  // Disable after image creation
  /*  created () {
      dbMenuAdd.get().then((querySnapshot) => {
        querySnapshot.forEach((doc => {
        //console.log(doc.id, " => ", doc.data());
        var menuItemData = doc.data()
        this.menuItems.push ({
          id: doc.id,
          name: menuItemData.name,
          description: menuItemData.description,
          price: menuItemData.price

          })
        }))  
      }) 
    }, */
  // Note: Like the same as admin.vue
  beforeCreate() {
    // Note: We changed this setMenuItems to setOrderItems after we created orders
    /*this.$store.dispatch('setMenuItems')*/
    this.$store.dispatch("setOrderItems");
  },
  methods: {
    // Function for swicth color doesn't work! fix it!!
    switchStage(id) {
      let selectedOrderItem = this.orderItems.filter(item => item.id === id)[0];

      if (selectedOrderItem.status === "inprogess") {
        dbOrders
          .doc(id)
          .update({ status: "completed" })
          .then(() => {});
      } else if (selectedOrderItem.status === "incomplete") {
        dbOrders
          .doc(id)
          .update({ status: "inprogess" })
          .then(() => {});
      } else if (selectedOrderItem.status === "completed") {
        dbOrders
          .doc(id)
          .update({ status: "incomplete" })
          .then(() => {});
      }
    },
    // Archive
    archiveOrderItem(id) {
      dbOrders
        .doc(id)
        .update({ archive: true, storeOrder: true })
        .then(() => {});
    },
    // Delete function for orderItem
    deleteOrderItem(id) {
      dbOrders
        .doc(id)
        .delete()
        .then(() => {
          console.log("Item has been deleted");
        })
        .catch(() => {});
    },
    // To invoke or call the action from our store vuex
    /* addCheckoutItem() {
         this.$store.dispatch('setCheckoutItem')
      }, */
    addToBasket(item) {
      // you can name whatever want.
      // Check if item already exists.
      /*  if (this.basket.find(itemInArray => item.name === itemInArray.name)) {
            item = this.basket.find(itemInArray => item.name === itemInArray.name);
            this.increaseQtn(item);
          }else{
          this.basket.push({
            name: item.name,
            price: item.price,
            quantity: 1
          })
        } */ // We used above method before we use mutation method. Above code is moved to mutations in 'store' state now.

      this.basketDump.push({
        name: item.name,
        price: item.price,
        quantity: 1
      });
      // Use keyword to grasp store state to 'store folder index.js'. But it has still the problem with an array in the basket!
      this.$store.commit("addBasketItems", this.basketDump);
      //console.log("What is this:", this.basketDump)
      //To tell the system each time it's done with the basketDump, we're going to empty it.
      // Don't put it above code line! it will empty first before your put something in the basket.
      this.basketDump = [];
    },
    decreaseQtn(item) {
      item.quantity--;
      if (item.quantity === 0) {
        this.basket.splice(this.basket.indexOf(item), 1);
      }
    },
    increaseQtn(item) {
      item.quantity++;
    }
  },
  computed: {
    // To grasp information from store index.js
    basket() {
      // Calling the information from store state basketItems and return it to your basket as placeholder.
      // We takes directly from store box in this way. So we need to use getters method.
      // Use getters in stead to avoid multiple times writing it.

      /* return this.$store.state.basketItems*/

      // A better way
      return this.$store.getters.getBasketItems;
    },
    // We don't really need menuItems anymore coz we have already created OrderItems
    // Note: Changed menuItems to orderItems
    /* menuItems () {
        return this.$store.getters.getMenuItems
      }, */
    orderItems() {
      return this.$store.getters.getOrderItems;
    },
    // End here
    revenueTotal() {
      var revenueIncome = 0;
      this.orderItems.forEach(element => {
        if (element.archive == true) {
          element.orderLines.forEach(elem => {
            revenueIncome += elem.price * elem.quantity;
          });
        }
      });
      return revenueIncome;
    }
  }
};
</script>
<style lang="scss" scoped>
#status_box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  width: 90px;
  font-size: 12px;
  border-radius: 2px;
  margin: 5px 0;
  color: white;
  text-shadow: 1px 1px 1px #aaa;
}
#menu-table {
  border-radius: 0.3rem;
}
#totalRevenue {
  padding: 20px 10px 20px 0;
  display: flex;
}
#totalRevenueText {
  display: flex;
  margin: 0;
  justify-content: space-between;
  font-style: italic;
  width: 100%;
  font-weight: bolder;
}
#totalRevenueTextTotal {
  text-decoration-line: underline;
  text-decoration-style: double;
  font-weight: bold;
  font-style: normal;
}
</style>
