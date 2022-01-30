<template>
    <div class="col-md-6 offset-md-3">
        <ul class="list-group list-group-flush">
            <li v-for="(user, index) in users" :key="index" class="list-group-item">
                <table class="table table-borderless">
                    <tbody>
                        <tr>
                            <td>{{user.email}}</td>
                            <td>{{user.role.name}}</td>
                            <td>
                                <button class="btn btn-outline-info" :data-target="'#user'+index" :aria-controls="'user'+index" data-toggle="collapse" aria-expanded="false">
                                    Details
                                </button>
                            </td>
                            <td>
                                <button @click="this.$router.push({name: 'edit', params: {email: user.email}})" type="button" class="btn btn-outline-primary">Edit</button>
                            </td>
                            <td>
                                <button @click="removeUser(user.email, index)" type="button" class="btn btn-outline-danger">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div :id="'user'+index" class="collapse">
                    <div class="card user-card-full">
                        <div class="card-block">
                            <h6 class="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                            <div class="row">
                                <div class="col-sm-6">
                                    <p class="m-b-10 f-w-600">First Name</p>
                                    <h6 class="text-muted f-w-400">{{user.first_name}}</h6>
                                </div>
                                <div class="col-sm-6">
                                    <p class="m-b-10 f-w-600">Last Name</p>
                                    <h6 class="text-muted f-w-400">{{user.last_name}}</h6>
                                </div>
                            </div>
                            <hr class="dropdown-divider"/>
                            <div class="row">
                                <div class="col-sm-6">
                                    <p class="m-b-10 f-w-600">Role</p>
                                    <h6 class="text-muted f-w-400">{{user.role.name}}</h6>
                                </div>
                                <div class="col-sm-6">
                                    <p class="m-b-10 f-w-600">Created</p>
                                    <h6 class="text-muted f-w-400">{{user.created}}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
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
             );
         },
     }
 }
</script>
