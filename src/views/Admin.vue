<template>
  <div class="Team">
    <v-container grid-list-xs fluid>
      <v-layout row wrap>
        <!--Update snackbar-->
        <v-snackbar top block color="dark" v-model="updatedSucces" :timeout="5000">
          {{ updatedText }}
          <template v-slot:action="{ attrs }">
            <v-btn color="blue" text v-bind="attrs" @click="updatedSucces = false">Close</v-btn>
          </template>
        </v-snackbar>
        <!--Delete snackbar-->
        <v-snackbar top v-model="snackbar" :timeout="5000">
          {{ snackbarText }}
          <template v-slot:action="{ attrs }">
            <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
          </template>
        </v-snackbar>
        <!--<v-row>-->
        <v-col offset-md="0" md="8" class="0">
          <h1 class="pl-0">
            Products
            <span>
              <v-btn flat small color="primary mt-3 float-right" to="/addNew">
                <span style="color:#ffffff;">
                  <v-icon small>mdi-plus</v-icon>
                </span>
                <span style="padding:0 0px; color:#ffffff;">Add Item</span>
              </v-btn>
            </span>
          </h1>
          <!-- <div class="text-right">
          <v-btn color="primary mt-1" small to="/addNew">
            <span style="color:#ffffff;">
              <v-icon small>mdi-plus</v-icon>
            </span>
            <span style="padding:0 2px; color:#ffffff;">Add Item</span>
          </v-btn>
          </div>-->
          <div class="pa-2 mt-0" id="info">
            <v-simple-table id="menu-table" class="responsive-table">
              <template v-slot:default>
                <thead class="thead">
                  <tr>
                    <th scope="cols">Product name</th>
                    <th scope="cols">Price</th>
                    <th scope="cols" style="width:10px;">Edit</th>
                    <th scope="cols" style="width:50px;">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in menuItems" :key="item.name">
                    <th scope="row">
                      <span id="td_name">{{item.name}}</span>
                      <br />
                      <span id="menu_product_des">{{item.description}}</span>
                    </th>
                    <td class="font-weight-bold">
                      {{item.price}}
                      <span>DKK</span>
                    </td>

                    <td>
                      <v-icon
                        color="primary"
                        @click.stop="dialog = true"
                        @click="editItem(item)"
                      >edit</v-icon>
                    </td>
                    <td>
                      <v-icon color="error" @click="deleteItem(item.id)">mdi-trash-can-outline</v-icon>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </div>
        </v-col>

        <v-col offset-md="0" md="4">
          <h1 class="pl-0">Preview</h1>
          <div class="pl-3 py-3 mt-0" id="info">
            <v-simple-table id="menu-table" class="responsive-table">
              <thead>
                <tr>
                  <th scope="col" style="width:70%">Name</th>
                  <th scope="col" style="width:100px">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td scope="row">
                    <span id="td_name">{{item.name}}</span>
                    <br />
                    <span id="menu_product_des">{{item.description}}</span>
                  </td>
                  <td class="font-weight-bold" id="preview_menuitem_price">
                    {{item.price}}
                    <span>DKK</span>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </div>
        </v-col>
        <!--</v-row>-->
        <!--Dialog box for editing-->
        <v-row justify="center">
          <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
              <v-card-title class="headline primary" primary-title>
                <span class="headline white--text">Edit product</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field label=" " v-model="item.name"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="item.description"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="item.price"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions class="pb-5 pr-8">
                <v-spacer></v-spacer>
                <v-btn outlined flat small color="primary" @click.stop="dialog = false">Close</v-btn>
                <v-btn
                  small
                  color="primary"
                  @click="updateItem()"
                  @click.stop="dialog = false"
                >Save changes</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-layout>
    </v-container>
  </div>
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
      updatedText: "Item has been updated successfully",
      // DeletedSuccess
      snackbar: false,
      snackbarText: "Item has been deleted"
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
          //console.log("Document successfully updated!");
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
        .then(() => {
          this.snackbar = true;
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
  @include infobox_mixin(0px, grey, 0px, 0px, white);
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
  font-style: thin;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.6);
  font-size: 13px;
}
/* #preview_menuitem_price {
  font-style: thin;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.6);
  font-size: 13px;
} */
/* #menu-table :hover {
  border-radius: 0.3rem;
} */
</style>