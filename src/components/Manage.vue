<template>
    <div class="container">
        <table class="table table-bordered">
            <!-- <thead>
                <tr>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                </tr>
            </thead> -->
            <tbody>
                <tr v-for="(user, index) in users" :key="index">
                    <td>{{user.email}}</td>
                    <td>{{user.role.name}}</td>
                    <td>
                        <button @click="this.$router.push({name: 'edit', params: {email: user.email}})" type="button" class="btn btn-info">Edit</button>
                    </td>
                    <td>
                        <button @click="removeUser(user.email, index)" type="button" class="btn btn-danger">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import UserService from "../services/user.service"
 export default {
     name: "Manage",
     data() {
         return {
             users: [],
         }
     },
     created() {
         UserService.getAllUsers().then(
             (response) => {
                 this.users = response.data;
             },
         )
     },
     methods: {
         removeUser(email,index) {
             UserService.deleteUser(email).then(
                 (response) => {
                     this.users.splice(index,1);
                 },
             )
         }
     }
 }
</script>