<template>
  <div class="container rounded bg-white mt-5 mb-5">
    <div class="row">
      <div class="col-md-3 border-right">
        <div class="d-flex flex-column align-items-center text-center p-3 py-5">
          <span class="font-weight-bold">{{ this.fullName }}</span>
          <span class="text-black-50">{{ userEmail }}</span>
          <span>Role: {{ this.role }}</span>
        </div>
      </div>
      <div class="col-md-5 border-right">
        <form @submit.prevent="handleSave" class="p-3 py-5">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h4 class="text-right">Profile Settings</h4>
          </div>
          <div class="row mt-2">
            <div class="col-md-6">
              <label class="labels">First Name</label>
              <input
                v-model="firstName"
                type="text"
                class="form-control"
                placeholder="first name"
              />
            </div>
            <div class="col-md-6">
              <label class="labels">Last Name</label>
              <input
                v-model="lastName"
                type="text"
                class="form-control"
                placeholder="last name"
              />
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-md-12">
              <label class="labels">Email</label>
              <input
                v-model="email"
                type="text"
                class="form-control"
                placeholder="email"
              />
            </div>
            <div class="col-md-12">
              <label class="labels">New Password</label>
              <input
                type="password"
                class="form-control"
                placeholder="new password"
                v-model="newPassword"
              />
            </div>
            <div class="col-md-12">
              <label class="labels">Current Password</label>
              <input
                type="password"
                class="form-control"
                placeholder="password"
                v-model="password"
              />
            </div>
          </div>
          <div class="mt-5 text-center">
            <button class="btn btn-outline-success" type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";
export default {
  name: "Profile",
  computed: {
    userEmail() {
      return this.$store.state.auth.user.user;
    },
  },
  data() {
    return {
      email: "",
      firstName: "",
      lastName: "",
      newPassowrd: "",
      password: "",
      role: "",
      fullName: "",
    };
  },
  created() {
    UserService.getUserDetail(this.userEmail).then(
      (response) => {
        this.email = response.data.email;
        this.firstName = response.data.first_name;
        this.lastName = response.data.last_name;
        this.role = response.data.role.name;
        this.fullName =
          response.data.first_name + " " + response.data.last_name;
      },
      (error) => {
        if (error.response.status === 401){
          this.$router.push("/unauthorized");
        }
        if (error.response.status === 403){
          this.$router.push("/forbidden");
        }
      }
    );
  },
  methods: {
    handleSave() {
      UserService.editUser(this.userEmail, {
        email: this.email,
        first_name: this.firstName,
        last_name: this.lastName,
        password: this.getPassword(),

      }).then((response) => {
        this.$router.push("/manage");
      },
      (error) => {
        if (error.response.status === 401){
          this.$router.push("/unauthorized");
        }
        if (error.response.status === 403){
          this.$router.push("/forbidden");
        }
      }
      );
    },
    getPassword() {
      if (this.password !== undefined && this.password !== null) {
        if (this.newPassword !== undefined && this.newPassword !== null) {
          return {
            new: this.newPassword,
            confirm: this.newPassword,
            old: this.password,
          };
        }
      }
      return null;
    }
  },
};
</script>

<style scoped>
.form-control:focus {
  box-shadow: none;
  border-color: #ba68c8;
}

.back:hover {
  color: #682773;
  cursor: pointer;
}

.labels {
  font-size: 11px;
}
</style>
