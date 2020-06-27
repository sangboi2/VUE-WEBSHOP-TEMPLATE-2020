<template>
  <div class="team">
    <v-container grid-list-xs fluid>
      <v-layout row wrap>
        <v-col offset-md="0" md="8" class="ma-0">
          <h1 class="pl-0">Products</h1>
          <div class="pa-2" id="info">
            <v-simple-table id="menu-table">
              <template v-slot:default>
                <thead class="thead">
                  <tr>
                    <th scope="cols" style="width:150px;">Image</th>
                    <th scope="cols" style="width:400px;">Product</th>
                    <th scope="cols" style="width:15%;">Price</th>
                    <th scope="cols" style="width:50px;">Add to Cart</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in menuItems" :key="item.name">
                    <td scope="row" id="td_menuitem_img">
                      <v-img v-bind:src="item.image"></v-img>
                    </td>
                    <td>
                      <span id="td_name">{{item.name}}</span>
                      <br />
                      <span id="menu_product_des">{{item.description}}</span>
                    </td>
                    <td class="font-weight-bold">
                      <!-- <span>
                        <v-icon small flat text class="currency black--text">mdi-currency-usd</v-icon>
                      </span>-->
                      {{item.price}}
                      <span>DKK</span>
                    </td>
                    <td>
                      <v-btn flat small color="primary" class="ma-0" @click="addToBasket(item)">
                        <span>
                          <v-icon small color="light" class="mr-1">mdi-cart-arrow-down</v-icon>
                        </span>
                        <span>Add to cart</span>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </div>
        </v-col>
        <v-col offset-md="0" md="4">
          <h1 class="pl-0 text-left" text-capitalize>
            Your cart
            <span class="float-right mr-6">({{basket.length}})</span>
          </h1>
          <div class="pa-2" id="info">
            <v-simple-table id="product-table" v-if="basket.length > 0" class="responsive-table">
              <template v-slot:default>
                <thead class="thead">
                  <tr>
                    <th scope="cols" style="width:30%;">Quantity</th>
                    <th scope="cols" style="width:40%;">Name of item</th>
                    <th scope="cols" style="width:30%;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in basket" :key="item.name">
                    <td scope="row">
                      <v-icon color="primary" @click="decreaseQtn(item)">mdi-minus-box</v-icon>
                      {{item.quantity}}
                      <v-icon color="primary" @click="increaseQtn(item)">mdi-plus-box</v-icon>
                    </td>
                    <td>{{item.name}}</td>
                    <td class="font-weight-bold">
                      {{item.price}}
                      <span>DKK</span>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <v-simple-table class="pt-3 pl-4 pr-4 pb-0 font-weight-bold responsive-table" v-else>
              <div>
                <v-alert
                  dense
                  text
                  type="info"
                  dismissible
                  dark
                  close-icon="mdi-close"
                  icon="mdi-bell-ring-outline"
                >Your shopping cart is empty.</v-alert>
              </div>
            </v-simple-table>
            <v-divider></v-divider>
            <v-row id="basket_checkout" class="mt-0 px-2" style="margin:0;">
              <v-col>
                <p>
                  <span class="subTotal">Subtotal:</span>
                </p>
                <p>
                  <span class="delivery">Delivery:</span>
                </p>
                <p>
                  <span class="delivery">Lead Time:</span>
                </p>
                <p>
                  <span class="delivery">Shipping Time:</span>
                </p>
              </v-col>
              <v-col class="text-right">
                <p class="font-weight-light">
                  {{subTotal}}
                  <span>DKK</span>
                </p>
                <p class="success--text font-weight-light">
                  10
                  <span>DKK</span>
                </p>
                <p class="font-weight-light">15 days</p>
                <p class="font-weight-light">6 - 10 days</p>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row class="totalamount px-2" style="margin:0;">
              <v-col>Total amount:</v-col>
              <v-col class="text-right">
                <p>
                  <span class="totalamountText">{{total}} DKK</span>
                </p>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row class="px-1" style="margin:0;">
              <v-col class="text-right">
                <v-btn flat small class="primary white--text" @click="addCheckoutItem()">Checkout</v-btn>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-layout>
    </v-container>
  </div>
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
    /*   cartItemCount() {
      let QTY = 0;
      for (var items in this.basket) {
        let individualItem = this.basket[items];
        QTY += individualItem.quantity+this.basketItem;
      }
    }  */
  }
};
</script>
<style lang="scss" scoped>
h1 {
  @include infobox_mixin(0px, grey, 0px, 0px, white);
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
.subTotal,
.delivery {
  font-style: Thin;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.6);
  font-size: 13px;
}
.totalamount {
  font-weight: bold;
}
.totalamountText {
  text-decoration-line: underline;
  text-decoration-style: double;
}

// The problem solved!
/* #menu-table :hover {
  border-radius: 0.3rem;
} */
/* .currency {
  margin-right: -7px;
} */
</style>