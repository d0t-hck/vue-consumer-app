<template>
  <div class="container">
    <!-- edit form column -->
    <div class="col-lg-12 text-lg-center">
      <h2>Editar Perfil</h2>
      <br />
      <br />
    </div>
    <div class="col-lg-8 push-lg-4 personal-info">
      <form role="form">
        <div class="form-group row">
          <label class="col-lg-3 col-form-label form-control-label"
            >Nombre</label
          >
          <div class="col-lg-9">
            <input class="form-control" type="text" value="" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-lg-3 col-form-label form-control-label"
            >Email</label
          >
          <div class="col-lg-9">
            <input class="form-control" type="email" value="" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-lg-3 col-form-label form-control-label"
            >Password</label
          >
          <div class="col-lg-9">
            <input class="form-control" type="password" value="11111122333" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-lg-3 col-form-label form-control-label"
            >Confirm password</label
          >
          <div class="col-lg-9">
            <input class="form-control" type="password" value="" />
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
export default {
  name: "Edit",
  data() {
    return { content: "" };
  },
  mounted() {
    UserService.getUserDetail(this.$store).then(
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
  },

  methods: {
    handleSubmit() {
      console.log(this.user);
    },
  },
};
</script>
