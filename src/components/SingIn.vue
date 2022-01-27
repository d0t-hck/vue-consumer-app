<template>
  <div class="col-md-4 offset-md-4">
    <Form @submit="handleLogin" :validation-schema="schema" class="login">
      <div class="form-group row">
        <label for="email" class="col-md-2 col-form-label">Email</label>
        <div class="col-sm-6">
        <Field name="email" type="email" placeholder="Email"/>
        <ErrorMessage name="email" class="error-feedback" />
        </div>
      </div>
      <div class="form-group row">
        <label for="password" class="col-md-2 col-form-label">Password</label>
        <div class="col-sm-6">
        <Field name="password" type="password" placeholder="Password"/>
        <ErrorMessage name="password" class="error-feedback" />
        </div>
      </div>
      <div class="form-group row">
      <button :disabled="loading" class="btn btn-primary btn-block">
        <span v-show="loading" />
        <span>Login</span>
      </button>
      <div v-if="message" role="alert">
        {{ message }}
      </div>
      </div>
    </Form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "SignIn",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      email: yup.string().required("Email is required!"),
      password: yup.string().required("Password is required!"),
    });

    return {
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
  created() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    handleLogin(user) {
      this.loading = true;

      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>
