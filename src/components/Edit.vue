<template>
  <div class="container">
    <div class="col-lg-12 text-lg-center">
      <h2>Edit Profile</h2>
      <br />
      <br />
    </div>
    <div class="col-lg-8 push-lg-4 personal-info">
      <form @submit.prevent="handleEdit">
        <div class="form-group row">
          <label class="col-lg-3 col-form-label form-control-label">
            First Name</label>
          <div class="col-lg-9">
            <input v-model="firstName" class="form-control" type="text" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-lg-3 col-form-label form-control-label">
            Last Name</label>
          <div class="col-lg-9">
            <input v-model="lastName" class="form-control" type="text" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-lg-3 col-form-label form-control-label">
            Email</label>
          <div class="col-lg-9">
            <input v-model="email" class="form-control" type="email" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-lg-3 col-form-label form-control-label">
            Role</label>
          <div class="col-lg-9">
            <select v-model="selectedRole" class="form-control form-control-sm">
              <option v-for="role in roles" :key="role.id" :value="role.id">
                {{ role.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-lg-3 col-form-label form-control-label"></label>
          <div class="col-lg-9">
            <input type="submit" class="btn btn-outline-success" value="Save Changes" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import RoleService from "../services/role.service";
export default {
  name: "Edit",
  data() {
    return {
      email: "",
      firstName: "",
      lastName: "",
      selectedRole: "",
      roles: "",
    };
  },
  created() {
    UserService.getUserDetail(this.$route.params.email).then(
      (response) => {
        this.email = response.data.email;
        this.firstName = response.data.first_name;
        this.lastName = response.data.last_name;
        this.selectedRole = response.data.role.id;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
    RoleService.getAllRoles().then(
      (response) => {
        this.roles = response.data;
      },
      (error) => {
        this.roles =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },

  methods: {
    handleEdit() {
      UserService.editUser(this.$route.params.email, {
        email: this.email,
        first_name: this.firstName,
        last_name: this.lastName,
        role: this.selectedRole,
      }).then(
        (response) => {
        this.$router.push("/manage");
      });
    },
  },
};
</script>
