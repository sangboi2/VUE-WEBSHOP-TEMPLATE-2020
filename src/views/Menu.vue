<template>
  <v-container fluid>
    <v-row>
      <v-col offset-md="0" md="7" class="ml-12">
        <h1 class="pl-3">Products</h1>
        <div class="pa-0" id="info">
          <v-simple-table id="menu-table">
            <template v-slot:default>
              <thead class="thead">
                <tr>
                  <th class="text-left" style="width:100px;">Image</th>
                  <th class="text-left" style="width:200px;">Product</th>
                  <th class="text-left" style="width:50px;">Price</th>
                  <th class="text-left" style="width:20px;">Add to basket</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in menuItems" :key="item.name">
                  <td id="td_menuitem_img">
                    <v-img v-bind:src="item.image"></v-img>
                  </td>
                  <td>
                    <span id="td_name">{{item.name}}</span>
                    <br />
                    <span id="menu_product_des">{{item.description}}</span>
                  </td>
                  <td>{{item.price}}</td>
                  <td>
                    <v-icon color="primary" @click="addToBasket(item)">add_box</v-icon>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </v-col>
      <v-col offset-md="0" md="4">
        <h1 class="pr-3">Your basket</h1>
        <div class="pa-0" id="info">
          <v-simple-table id="product-table" v-if="basket.length > 0">
            <template v-slot:default>
              <thead class="thead">
                <tr>
                  <th class="text-left" style="width:30;">Quantity</th>
                  <th class="text-left" style="width:50%;">Name of item</th>
                  <th class="text-left" style="width:20px;">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in basket" :key="item.name">
                  <td>
                    <v-icon color="primary" @click="decreaseQtn(item)">indeterminate_check_box</v-icon>
                    {{item.quantity}}
                    <v-icon color="primary" @click="increaseQtn(item)">add_box</v-icon>
                  </td>
                  <td>{{item.name}}</td>
                  <td>{{item.price}}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-simple-table class="pt-3 pl-4 pr-4 pb-0 font-weight-bold" v-else>
            <div>
              <v-alert dense text type="info" dismissible dark>Your basket is empty now. Add item.</v-alert>
            </div>
          </v-simple-table>
          <v-divider></v-divider>
          <v-row id="basket_checkout" class="mt-4 px-2" style="margin:0;">
            <v-col>
              <p>Subtotal:</p>
              <p>Delivery:</p>
            </v-col>
            <v-col class="text-right">
              <p>{{subTotal}}</p>
              <p>10 DKK</p>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row class="font-weight-bold px-2" style="margin:0;">
            <v-col>Total amount</v-col>
            <v-col class="text-right">
              <p>{{total}}</p>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row class="font-weight-bold pt-5 pb-5 px-1" style="margin:0;">
            <v-col class="text-right">
              <v-btn small class="primary white--text" @click="addCheckoutItem()">Checkout</v-btn>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
// Disable after created function is disable using a better way store method like in admin page
// import { dbMenuAdd } from '../../firebase'
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
    this.$store.dispatch("setMenuItems");
  },
  methods: {
    // To invoke or call the action from our store vuex
    addCheckoutItem() {
      this.$store.dispatch("setCheckoutItem");
    },
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

    menuItems() {
      return this.$store.getters.getMenuItems;
    },
    // End here
    subTotal() {
      let subCost = 0;
      for (var items in this.basket) {
        let individualItem = this.basket[items];
        subCost += individualItem.quantity * individualItem.price;
      }
      return subCost;
    },
    total() {
      let deliverPrice = 10;
      let totalCost = this.subTotal;
      return totalCost + deliverPrice;
    }
  }
};
</script>
<style lang="scss" scoped>
h1 {
  @include infobox_mixin(1px, grey, 1px, 5px, white);
  font-weight: bold;
  text-transform: uppercase;
  font-size: 16;
  text-align: left;
}
.col:last-child h1 {
  text-align: right;
}
#info {
  background-color: white;
}
tr th {
  font-weight: 400;
}
#td_name {
  font-weight: bold;
}
tr td {
  padding: 10px 10px 10px 16px;
}
#td_menuitem_img {
  max-width: 100px;
  max-height: 100px;
  padding: 10px;
}
#menu_product_des {
  font-style: Thin;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.6);
  font-size: 13px;
}
#basket_checkout {
  font-size: 13px;
}
#basket_checkout p:last-child {
  line-height: 4px;
}
// The problem solved!
#menu-table :hover {
  border-radius: 0.3rem;
}
</style>