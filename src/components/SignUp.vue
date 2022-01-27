<template>
  <div>
    <Form
      @submit="handleRegister"
      :validation-schema="schema"
      class="col-lg-6 offset-lg-3"
    >
      <div v-if="!successfull">
        <div class="form-group row">
          <label for="email" class="col-sm-2 col-form-label">Email</label>
          <div class="col-sm-10">
            <Field
              name="email"
              type="email"
              class="form-control"
              placeholder="Email"
            />
            <ErrorMessage name="email" class="error-feedback" />
          </div>
        </div>
        <div class="form-group row">
          <label for="first_name" class="col-sm-2 col-form-label"
            >First Name</label
          >
          <div class="col-sm-10">
            <Field
              name="first_name"
              type="text"
              class="form-control"
              placeholder="First Name"
            />
          </div>
          <ErrorMessage name="first_name" class="error-feedback" />
        </div>
        <div class="form-group row">
          <label for="last_name" class="col-sm-2 col-form-label"
            >Last Name</label
          >
          <div class="col-sm-10">
            <Field
              name="last_name"
              type="text"
              class="form-control"
              placeholder="Last Name"
            />
          </div>
          <ErrorMessage name="last_name" class="error-feedback" />
        </div>
        <div class="form-group row">
          <label for="password" class="col-sm-2 col-form-label">Password</label>
          <div class="col-sm-10">
            <Field
              name="password"
              type="password"
              class="form-control"
              placeholder="Password"
            />
          </div>
          <ErrorMessage name="password" class="error-feedback" />
        </div>

        <div class="form-group">
          <button :disabled="loading" class="btn btn-primary btn-block">
            <span v-show="loading" class="spinner-border spinner-border-sm" />
            Sign Up
          </button>
        </div>
      </div>
    </Form>

    <div
      v-if="message"
      class="alert"
      :class="successful ? 'alert-success' : 'alert-danger'"
    >
      {{ message }}
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "SignUp",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      email: yup
        .string()
        .required("Email is required!")
        .email("Invalid email!"),
      first_name: yup
        .string()
        .required("First name is required!")
        .min(3, "At least 3 characters!")
        .max(20, "Max 20 characters!"),
      last_name: yup
        .string()
        .required("First name is required!")
        .min(3, "At least 3 characters!")
        .max(20, "Max 20 characters!"),
      password: yup
        .string()
        .required("Password is required!")
        .min(6, "At least 6 characters!"),
    });

    return {
      successfull: false,
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.message = "";
      this.successfull = false;
      this.loading = true;
    }
  },
  methods: {
    handleRegister(user) {
      this.message = "";
      this.successfull = false;
      this.loading = true;

      this.$store.dispatch("auth/register", user).then(
        (data) => {
          this.message = data.message;
          this.successfull = true;
          this.loading = false;
          this.$router.push("/sign-in");
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successfull = false;
          this.loading = false;
        }
      );
    },
  },
};
</script>
