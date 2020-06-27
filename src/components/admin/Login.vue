<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <h1 class="text-center">Administrator</h1>
        <div id="info">
          <v-text-field
            v-model="email"
            type="text"
            outlined
            label="Enter e-mail or username"
            prepend-inner-icon="person"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            type="password"
            name="password"
            id="password"
            outlined
            label="Enter password"
            prepend-inner-icon="lock"
            required
          ></v-text-field>
          <v-btn class="float-right" flat small color="primary" @click.prevent="signIn()">Log in</v-btn>
          <v-spacer></v-spacer>

          <!-- <v-btn class flat small color="light" @click.prevent="signOut()">Sign out</v-btn> -->

          <!-- <v-card-actions>
            <v-spacer></v-spacer>
            <<v-btn small color="light" @click.prevent="signOut()">Sign out</v-btn> 
            <v-btn small color="primary" @click.prevent="signIn()">Log in</v-btn> 
          </v-card-actions>
          <<v-btn
                        small
                        class="btn mr-3"
                        color="light"
                        @click.prevent="signOut()"
                    >
                        Sign out
                    </v-btn>
                    
                     <v-btn
                        
                        small
                        class="btn"
                        color="primary"
                        @click.prevent="signIn()"
                    >
                        Log in
          </v-btn>-->
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";

export default {
  //name: "login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    signIn() {
      //console.log("Test user login info:", this.email, this.password)
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          alert("You're logged in");
          //alert(`You are logged in as ${user.mail}`);
          this.$router.replace("/admin");
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === "auth/wrong-password") {
            alert("Wrong passwword");
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
    }
    // Moved to navigation page
    /*  signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert("Are you sure you want to log out?");
          this.$router.replace("/");
        })
        .catch(error => {
          alert(error);
        });
    } */
  }
};
</script>

<style lang="scss" scoped>
// It uses global style from App.vue
h1 {
  padding: 0 20px 0 20px;
}
#info {
  padding: 25px 20px 50px 20px;
}
</style>
