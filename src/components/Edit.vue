<template>
  <div class="container">
    <!-- edit form column -->
    <div class="col-lg-12 text-lg-center">
      <h2>Edit Profile</h2>
      <br />
      <br />
    </div>
    <div class="col-lg-8 push-lg-4 personal-info">
      <form @submit="handleEdit" role="form">
        <div class="form-group row">
          <label class="col-lg-3 col-form-label form-control-label"
            >First Name</label
          >
          <div class="col-lg-9">
            <input name="first_name" class="form-control" type="text" :value="content.first_name" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-lg-3 col-form-label form-control-label"
            >Last Name</label
          >
          <div class="col-lg-9">
            <input name="last_name" class="form-control" type="text" :value="content.last_name" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-lg-3 col-form-label form-control-label"
            >Email</label
          >
          <div class="col-lg-9">
            <input name="email" class="form-control" type="email" :value="content.email"/>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-lg-3 col-form-label form-control-label"
            >Role</label
          >
          <div class="col-lg-9">
            <select name="role" class="form-control form-control-sm">
              <option v-for="role in roles" :key="role.id" :value="role.id">{{role.name}}</option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-lg-3 col-form-label form-control-label"></label>
          <div class="col-lg-9">
            <input type="reset" class="btn btn-secondary" value="Cancel" />
            <input type="button" class="btn btn-primary" value="Save Changes" />
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
      content: "",
      roles: "",
    };
  },
  created() {
    UserService.getUserDetail(this.$route.params.email).then(
      (response) => {
        this.content = response.data;
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
    handleEdit(user) {
      console.log(user);
      UserService.editUser(this.$route.params.email, user).then(
        (response) => {
        this.$router.push("/manage");
      });
    },
  },
};
</script>
