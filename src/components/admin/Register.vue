<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <h1 class="text-center">
          Create account
          <v-icon class="account_icon" color="white" x-large></v-icon>
        </h1>
        <div id="info">
          <v-text-field
            v-model="email"
            type="text"
            outlined
            label="Enter e-mail or username"
            prepend-inner-icon="person"
            required
            :rules="inputRules"
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
          <v-btn block flat small color="primary" @click.prevent="register()">
            <v-icon small>mdi-plus</v-icon>Register
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import firebase from "firebase";
import "firebase/firestore";

export default {
  name: "register",
  data: function() {
    return {
      email: "",
      password: ""
      //Form validation
      //inputRules: [v => v.length >= 1 || "Enter valid characters"]
    };
  },
  methods: {
    register: function(e) {
      //console.log("register");
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            alert(`Account created for ${user.mail}`);
            this.$router.push("/");
          },
          err => {
            alert(err.message);
          }
        );
      e.preventDefault();
    }
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