<template>
  <div>
    <Form @submit="handleRegister" :validation-schema="schema">
      <div v-if="!successful">
        <div>
          <label for="email">Email</label>
          <Field name="email" type="email" />
          <ErrorMessage name="email" />
        </div>
        <div>
          <label for="firstName">First Name</label>
          <Field name="firstName" type="text" />
          <ErrorMessage name="firstName" />
        </div>
        <div>
          <label for="lastName">Last Name</label>
          <Field name="lastName" type="text" />
          <ErrorMessage name="lastName" />
        </div>
        <div>
          <label for="password">Password</label>
          <Field name="password" type="password" />
          <ErrorMessage name="password" />
        </div>

        <div>
          <button :disabled="loading">
            <span v-show="loading" />
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
      email: yup.string().required("Email is required!").email("Invalid email!"),
      firstName: yup.string().required("First name is required!").min(3,"At least 3 characters!").max(20,"Max 20 characters!"),
      lastName: yup.string().required("First name is required!").min(3,"At least 3 characters!").max(20,"Max 20 characters!"),
      password: yup.string().required("Password is required!").min(6,"At least 6 characters!"),
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

      this.$store.dispatch("auth/signUp", user).then(
        (data) => {
          this.message = data.message;
          this.successfull = true;
          this.loading = false;
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
