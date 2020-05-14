<template>
  <v-container class="fill-height" fluid>
    <v-snackbar top block color="info" v-model="updatedSucces">
      {{ updatedText }}
      <v-btn color="white" text @click="updatedSucces = false">Close</v-btn>
    </v-snackbar>

    <v-row>
      <v-col offset-md="0" md="7" class="ml-12">
        <h1 class="pl-3">Products</h1>
        <div class="text-right">
          <v-btn color="primary mt-1" small to="/addNew">
            <span style="color:#ffffff;">
              <v-icon small>mdi-plus</v-icon>
            </span>
            <span style="padding:0 2px; color:#ffffff;">Add Item</span>
          </v-btn>
        </div>
        <div class="pa-2 mt-2" id="info">
          <v-simple-table id="menu-table">
            <template v-slot:default>
              <thead class="thead">
                <tr>
                  <th class="text-left" style="width:200px;">Product name</th>
                  <th class="text-left" style="width:50px;">Price</th>
                  <th class="text-left" style="width:20px;">Edit</th>
                  <th class="text-left" style="width:20px;">Remove</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in menuItems" :key="item.name">
                  <td>
                    <span id="td_name">{{item.name}}</span>
                    <br />
                    <span id="menu_product_des">{{item.description}}</span>
                  </td>
                  <td>{{item.price}}</td>
                  <td>
                    <v-icon color="primary" @click.stop="dialog = true" @click="editItem(item)">edit</v-icon>
                  </td>
                  <td>
                    <v-icon color="error" @click="deleteItem(item.id)">delete</v-icon>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </v-col>
      <v-col offset-md="0" md="4">
        <h1 class="pl-3">Preview</h1>
        <div class="pl-3 py-3" id="info">Right</div>
      </v-col>
    </v-row>
    <!--Dialog box for editing-->
    <v-row>
      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <!--<div class="text-right">
                <v-btn color="orange" small to="/addNew">
                <span style="color:#FFFFFF;"><v-icon>add</v-icon></span><span style="padding:0 5px; color:#FFFFFF;">Add Item</span>
                </v-btn>
          </div>-->
          <div class="pl-4 pr-4 pt-3 mt-1 pb-2" id="info">
            <h1 class="pl-3 primary--text">Edit item</h1>

            <v-text-field v-model="item.name"></v-text-field>

            <v-text-field v-model="item.description"></v-text-field>

            <v-text-field v-model="item.price"></v-text-field>

            <div class="text-right">
              <v-btn small color="light" class="mb-3" @click.stop="dialog = false">
                <span style="color:#000000;">
                  <v-icon small>cancel</v-icon>
                </span>
                <span style="padding:0 5px; color:#000000;">Close</span>
              </v-btn>
              <v-btn
                small
                color="primary"
                class="mb-3 ml-3"
                @click="updateItem()"
                @click.stop="dialog = false"
              >
                <span style="color:#FFFFFF;">
                  <v-icon small>save_alt</v-icon>
                </span>
                <span style="padding:0 5px; color:#FFFFFF;">Save</span>
              </v-btn>
            </div>
          </div>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>
<script>
import { dbMenuAdd } from "../../firebase";
export default {
  data() {
    return {
      // This part here already being grasped from the store.
      // Becuase that is what we are doing. We are storing the 'menuItems'
      // under the state 'menuItems' above currentUser: null.
      // That is why we need to comment here. We cannot have two 'menuItems' in admin and store
      // The system is trying to get both that gives a conflict.
      basket: [],
      /* menuItems: [], */
      // Dialog box for editing
      dialog: false,
      // To show show items for dialogbox. Without this, items are shown in admin page.
      item: [],
      // To use to control the items for editing
      activeEditItem: null,
      // UpdatedSuccess
      updatedSucces: false,
      updatedText: "Menu Item has been updated successfully"
    };
  },
  // To make our new way of grasping information by initialzing
  // from our store at actions setMenuItems that makes sure to check
  // setMenuItems in mutation.
  // It's  a new way
  beforeCreate() {
    this.$store.dispatch("setMenuItems");
  },
  // Put it back if you want to do like before!
  /* created () {
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
  methods: {
    // Editing the item
    editItem(item) {
      this.item = item;
      // Updating the item
      this.activeEditItem = item.id;
    },
    updateItem() {
      dbMenuAdd
        .doc(this.activeEditItem)
        .update(this.item)
        .then(() => {
          this.updatedSucces = true;
          console.log("Document successfully updated!");
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    },
    deleteItem(id) {
      dbMenuAdd
        .doc(id)
        .delete()
        .then(function() {
          //console.log("Document successfully deleted!");
        })
        .catch(function(error) {
          console.error("Error removing document:", error);
        });
    },
    addToBasket(item) {
      // you can name whatever want.
      // Check if item already exists.
      if (this.basket.find(itemInArray => item.name === itemInArray.name)) {
        item = this.basket.find(itemInArray => item.name === itemInArray.name);
        this.increaseQtn(item);
      } else {
        this.basket.push({
          name: item.name,
          price: item.price,
          quantity: 1
        });
      }
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
    // For mutation function from store
    // To grasp information from  menuItems: [] under state through our mutation at at setMenuItems.

    menuItems() {
      return this.$store.getters.getMenuItems;
    },
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
  text-align: left;
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
#menu_product_des {
  font-style: Thin;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.6);
  font-size: 13px;
}
#menu-table :hover {
  border-radius: 0.3rem;
}
</style>