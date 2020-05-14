<template>
  <v-container fluid>
    <v-row>
      <v-col offset-md="0" md="7" class="ml-12">
        <h1 class="pl-3">New product</h1>
        <!--<div class="text-right">
         <v-btn color="orange" small to="/addNew">
           <span style="color:#FFFFFF;"><v-icon>add</v-icon></span><span style="padding:0 5px; color:#FFFFFF;">Add Item</span>
          </v-btn>
        </div>-->
        <div class="pl-4 pr-4 pt-3 mt-1 pb-2" id="info">
          <v-text-field label="Product name" aria-required v-model="name" class></v-text-field>

          <v-text-field label="Description" aria-required v-model="description" class></v-text-field>

          <v-text-field label="Price" aria-required v-model="price" class></v-text-field>
          <v-file-input label="Upload image" @change="uploadImage"></v-file-input>
          <div class="text-right">
            <v-btn small color="light" class="mb-3">
              <span style="color:#000000;">
                <v-icon small>cancel</v-icon>
              </span>
              <span style="padding:0 5px; color:#000000;">Cancel</span>
            </v-btn>
            <v-btn
              small
              color="primary"
              class="mb-3 ml-3"
              @click="addNewMenuItem()"
              :disabled="btnDisable"
            >
              <span>
                <v-icon small>add</v-icon>
              </span>
              <span style="padding:0 2px;">Add item</span>
            </v-btn>
          </div>
        </div>
      </v-col>
      <v-col offset-md="0" md="4">
        <h1 class="pl-3">Preview</h1>
        <div class="pt-3 mt-0 pb-2" id="info">
          <v-simple-table id="menu-table">
            <thead>
              <tr>
                <th class="text-left" style="width:70%">Name</th>
                <th class="text-left" style="width:100px">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
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
    </v-row>
  </v-container>
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
      btnDisable: true
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
      dbMenuAdd.add({
        name: this.name,
        description: this.description,
        price: this.price,
        image: this.image
      });
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
</style>