<template>
  <div class="Team">
    <v-container grid-list-xs fluid>
      <v-layout row wrap>
        <v-snackbar top v-model="snackbar" :timeout="5000">
          {{ snackbarText }}
          <template v-slot:action="{ attrs }">
            <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
          </template>
        </v-snackbar>

        <v-col offset-md="0" md="8" class="0">
          <h1 class="pl-0">New product</h1>
          <!--<div class="text-right">
         <v-btn color="orange" small to="/addNew">
           <span style="color:#FFFFFF;"><v-icon>add</v-icon></span><span style="padding:0 5px; color:#FFFFFF;">Add Item</span>
          </v-btn>
          </div>-->
          <div class="pl-4 pr-4 pt-3 mt-1 pb-2" id="info">
            <v-card-actions>
              <v-spacer></v-spacer>
              <router-link class="close" to="/admin" close-icon="mdi-close">
                <v-icon text>mdi-close</v-icon>
              </router-link>

              <!--<v-btn text small >
                <span>
                  <v-icon small text>mdi-close</v-icon>
                </span>
              </v-btn>-->
            </v-card-actions>
            <!--<v-btn small text class="close float-right" to="/admin">
            <span>
              <v-icon>mdi-close</v-icon>
            </span>
            </v-btn>-->
            <v-col cols="12">
              <v-text-field
                label="Enter product name"
                prepend-icon="folder"
                :rules="inputRules"
                aria-required
                v-model="name"
                class
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Enter description"
                prepend-icon="edit"
                :rules="inputRules"
                aria-required
                v-model="description"
                class
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                label="Enter price"
                prepend-icon="money"
                :rules="inputRules"
                aria-required
                v-model="price"
                class
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-file-input label="Upload image" @change="uploadImage"></v-file-input>
            </v-col>

            <v-card-actions class="pb-0">
              <v-spacer></v-spacer>
              <v-btn flat small outlined color="primary" class="mb-3" @click="clear">
                <span style="color:#000000;">
                  <v-icon small></v-icon>
                </span>
                <span>Clear</span>
              </v-btn>
              <!--  <v-btn small color="light" class="mb-3" to="/admin">
              <span style="color:#000000;">
                <v-icon small></v-icon>
              </span>
              <span>Close</span>
              </v-btn>-->

              <v-btn
                flat
                small
                color="primary"
                class="mb-3 ml-3"
                @click="addNewMenuItem()"
                :disabled="btnDisable"
              >
                <span>
                  <v-icon small>mdi-plus</v-icon>
                </span>
                <span>Add item</span>
              </v-btn>
            </v-card-actions>
          </div>
        </v-col>
        <v-col offset-md="0" md="4">
          <h1 class="pl-0">Preview</h1>
          <div class="pt-3 mt-0 pb-2" id="info">
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
                    <span id="td_name">{{name}}</span>
                    <br />
                    <span id="menu_product_des">{{description}}</span>
                  </td>
                  <td id="preview_menuitem_price">{{price}}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </div>
        </v-col>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import { dbMenuAdd, fb } from "../../../firebase";
import "firebase/firestore";

export default {
  data() {
    return {
      name: "",
      description: "",
      price: "",
      image: null,
      // Handle the button to click ready
      btnDisable: true,
      snackbar: false,
      snackbarText: "Item has been added successfully",
      //Form validation
      inputRules: [v => v.length >= 2 || "Minimum length is 2 characters"]
    };
  },
  methods: {
    //Img
    uploadImage(e) {
      let file = e;
      console.log(e);
      //console.log(e.target.files[0]);
      // console.log(e);
      // Create a root reference
      var storageRef = fb.storage().ref("products/" + file.name);
      let uploadTask = storageRef.put(file);

      uploadTask.on(
        "state_changed",
        () => {},
        () => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.image = downloadURL;
            // Handle the button to click ready.
            this.btnDisable = false;
            console.log("File available at", downloadURL);
          });
        }
      );
    },
    addNewMenuItem() {
      dbMenuAdd
        .add({
          name: this.name,
          description: this.description,
          price: this.price,
          image: this.image
        })
        .then(() => {
          this.snackbar = true;
        });
    },
    // To clear form after submit
    clear() {
      this.name = "";
      this.description = "";
      this.price = "";
      this.image = "";
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
  font-style: Thin;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.6);
  font-size: 13px;
}
.close {
  text-decoration: none;
}
</style>




