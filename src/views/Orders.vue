<template>
  <div class="Team">
    <v-container grid-list-xs fluid>
      <v-layout row wrap>
        <v-col offset-md="0" md="8" class="0">
          <h1 class="pl-0">Orders</h1>
          <div class="pa-2" id="info">
            <v-row class="0">
              <v-col cols="12" md="1" class="pa-2">
                <p class="font-weight-bold body-1 pl-3 primary--text">INFO:</p>
              </v-col>
              <v-col cols="12" md="5" class="pa-2 pl-12">
                <v-row align="center">
                  <div id="status_box" class="red black--text">INCOMPLETE</div>
                  <span class="font-weight-light caption pl-1">Not started</span>
                </v-row>
                <v-row align="center">
                  <div id="status_box" class="warning black--text">INPROGRESS</div>
                  <span class="font-weight-light caption pl-1">Somebody is working on it</span>
                </v-row>
                <v-row align="center">
                  <div id="status_box" class="success black--text">COMPLETED</div>
                  <span class="font-weight-light caption pl-1">Done</span>
                </v-row>
              </v-col>
              <v-col cols="12" md="6" class="pa-2 pl-12">
                <v-row>
                  <div id="status_box" class="red mr-3 black--text">INCOMPLETE</div>
                  <div id="status_box" class="warning mr-3 black--text">INPROGRESS</div>
                  <div id="status_box" class="success black--text">COMPLETED</div>
                </v-row>
                <v-row>
                  <p class="font-weight-light caption pl-1 pr-1">
                    <b>Single-click</b> to switch stage:
                    <br />complete =>
                    in progress
                    <br />
                    <b>Double-click</b> the box to reset to:
                    <b>"not started"</b>
                  </p>
                  <span class="font-weight-light caption">
                    <v-icon color="grey">mdi-archive-outline</v-icon>Archive to
                    <b>" hide"</b> it from orders list.
                  </span>
                </v-row>
              </v-col>
            </v-row>
          </div>
          <!--Orders list area-->
          <div class="pa-2 mt-1" id="info">
            <p class="font-weight-bold body-1 primary--text pl-3 text-capitalize">Order details:</p>
            <v-simple-table id="menu-table" class="responsive-table">
              <thead class="thead">
                <tr>
                  <th scope="cols" style="width:5%;">ON</th>
                  <th scope="cols" style="width:5%;">QTY</th>
                  <th scope="cols" style="width:50%;">Item</th>
                  <th scope="cols" style="width:25%;">Price</th>
                  <th scope="cols" style="width:10%;">Status</th>
                  <th scope="cols" style="width:5%;">Archive</th>
                  <th scope="cols" style="width:5%;">Remove</th>
                </tr>
              </thead>
              <tbody class="font-weight-light">
                <!-- Switching out menuItems to orderItems below-->
                <!--<tr v-for="item in menuItems" :key="item.name">-->

                <tr v-for="item in orderItems" :key="item.name">
                  <td scope="row">{{ item.orderNumber }}</td>

                  <td class="py-3">
                    <p
                      style="margin:0;"
                      v-for="subitem in item.orderLines"
                      :key="subitem.id"
                    >{{ subitem.quantity }}</p>
                  </td>
                  <td class="py-3 font-weight-regular">
                    <p
                      style="margin:0;"
                      v-for="subitem in item.orderLines"
                      :key="subitem.id"
                    >{{ subitem.name }}</p>
                  </td>
                  <td class="py-3 font-weight-bold">
                    <p style="margin:0;" v-for="subitem in item.orderLines" :key="subitem.id">
                      {{ subitem.price }}
                      <span>DKK</span>
                    </p>
                  </td>

                  <td>
                    <div
                      id="status_box"
                      v-bind:class="item.status"
                      @click="switchStage(item.id)"
                      class="status_switch black--text text-uppercase"
                    >{{ item.status }}</div>
                  </td>
                  <td>
                    <v-icon color="darkgrey" @click="archiveOrderItem(item.id)">mdi-archive-outline</v-icon>
                  </td>
                  <td>
                    <v-icon color="red" @click="deleteOrderItem(item.id)">mdi-trash-can-outline</v-icon>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </div>
        </v-col>
        <!-- Right side revenue box-->
        <v-col offset-md="0" md="4">
          <h1 class="pr-0 pl-0">Revenue</h1>
          <div class="pa-4" id="info">
            <h2
              class="font-weight-bold body-1 pb-2 primary--text orders_info"
            >Completed Orders Information</h2>
            <v-divider></v-divider>
            <div>
              <p class="pt-2 font-weight-bold" id="totalOrders">
                Total orders:
                <span
                  class="black--text font-weight-bold float-right pr-2"
                >{{ orderItems.length }}</span>
              </p>
            </div>

            <div id="revenueList" v-for="item in orderItems" :key="item.name">
              <p>
                Ordernumber:
                <span class>{{ item.orderNumber }}</span>
                <!--<v-btn small text @click="deleteOrderItem(item.id)">-->
                <span class="float-right">
                  <v-icon text @click="deleteOrderItem(item.id)" color="red">mdi-trash-can-outline</v-icon>
                </span>
                <!--</v-btn>-->
              </p>
            </div>
          </div>

          <div class="pr-3 pl-4 mt-1" id="info">
            <div id="totalRevenue">
              <p id="totalRevenueText">
                Total Revenue:
                <span id="totalRevenueTextTotal">{{revenueTotal}} DKK</span>
              </p>
            </div>
          </div>
        </v-col>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
// v-if="item.storeOrder == false" should be put line 63
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

      if (selectedOrderItem.status === "warning") {
        dbOrders
          .doc(id)
          .update({ status: "success" })
          .then(() => {});
      } else if (selectedOrderItem.status === "red") {
        dbOrders
          .doc(id)
          .update({ status: "warning" })
          .then(() => {});
      } else if (selectedOrderItem.status === "success") {
        dbOrders
          .doc(id)
          .update({ status: "red" })
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
  text-shadow: none;
  //text-shadow: 1px 1px 1px #aaa;
}
.status_switch {
  cursor: pointer;
}
#menu-table {
  border-radius: 0.3rem;
}
#totalRevenue {
  padding: 20px 10px 20px 0;
  display: flex;
}
.orders_info {
  text-transform: uppercase;
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
