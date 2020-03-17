<template>
    <div class="row">
        <div class="col-xs-12 col-sm-12">
            <div class="card">
                <div class="card-header font-weight-bold">Create User</div>
                <div class="card-body card-block" ref="attendanceTable">
                    <form @submit.prevent="editMode ? update() : store()">
                        <div class="row">
                            <div class="col-4">
                                <div class="form-group">
                                    <label for="first-name" class="form-control-label font-weight-bold">First Name</label>
                                    <input type="text" v-model="form.first_name" class="form-control" placeholder="Enter first name" :class="{ 'is-invalid': errors.first_name }"><div class="v-error" v-if="errors.first_name">{{ errors.first_name[0] }}</div>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="form-group">
                                    <label for="last-name" class="form-control-label font-weight-bold">Last Name</label>
                                    <input type="text" v-model="form.last_name" class="form-control" placeholder="Enter first name" :class="{ 'is-invalid': errors.last_name }"><div class="v-error" v-if="errors.last_name">{{ errors.last_name[0] }}</div>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="form-group">
                                    <label for="screen_name" class="form-control-label font-weight-bold">Screen Name</label>
                                    <input type="text" v-model="form.screen_name" class="form-control" placeholder="Enter screen name" :class="{ 'is-invalid': errors.screen_name }"><div class="v-error" v-if="errors.screen_name">{{ errors.screen_name[0] }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-4">
                                <div class="form-group">
                                    <label for="email" class="form-control-label font-weight-bold">E-mail</label>                                   
                                    <input type="text" v-model="form.email" class="form-control" placeholder="Enter email" :class="{ 'is-invalid': errors.email }"><div class="v-error" v-if="errors.email">{{ errors.email[0] }}</div>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="form-group">
                                    <label for="mobile-no" class="form-control-label font-weight-bold">Mobile No.</label>
                                    <input type="text" v-model="form.mobile_no" class="form-control" placeholder="Enter mobile no." :class="{ 'is-invalid': errors.mobile_no }"><div class="v-error" v-if="errors.mobile_no">{{ errors.mobile_no[0] }}</div>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="form-group">
                                    <label for="designation" class="form-control-label font-weight-bold">Designation</label>
                                    <input type="text" v-model="form.designation" class="form-control" placeholder="Enter designation">
                                </div>
                            </div>                      
                        </div>
                        <div class="row form-group">                            
                            <div class="col-4">
                                <div class="form-group">
                                    <label for="role" class="form-control-label font-weight-bold">Roll</label>
                                    <select v-model="form.role_id" class="form-control form-control-lg" :class="{ 'is-invalid': form.errors.has('role_id') }"><option selected="selected" value="">Please select</option>
                                        <option value="1">Super Admin</option>
                                        <option value="2">Admin</option>
                                        <option value="3">User</option>
                                    </select>
                                    <div class="v-error" v-if="errors.role_id">{{ errors.role_id[0] }}</div>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="form-group">
                                    <label for="password" class="form-control-label font-weight-bold">Password</label>
                                    <input type="password" v-model="form.password" class="form-control" placeholder="Enter password" :class="{ 'is-invalid': errors.password }"><div class="v-error" v-if="errors.password">{{ errors.password[0] }}</div>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="form-group">
                                    <label for="confirmed-password" class="form-control-label font-weight-bold">Confirmed Password</label>
                                    <input type="password" v-model="form.confirm_password" class="form-control" placeholder="Enter confirmed password" :class="{ 'is-invalid': errors.confirm_password }"><div class="v-error" v-if="errors.confirm_password">{{ errors.confirm_password[0] }}</div>                                   
                                </div>
                            </div>              
                        </div>
                        <div class="form-group row m-t-md">
                            <div class="col-sm-offset-4 col-sm-12 text-center">
                                <button type="submit" class="btn btn-info btn-rounded m-b-10 m-l-5">Submit</button>
                                <button @click="reset()" type="button" class="btn btn-danger btn-rounded m-b-10 m-l-5">Reset</button>
                            </div>
                        </div> 
                    </form>
                </div>
            </div>
        </div>
        <vue-snotify></vue-snotify>
    </div>
</template>

<style>
    label {    
        margin-bottom: 3px !important;
        padding-left: 5px !important;        
        font-style: italic;        
    }
    .form-control {
        border-radius: 18px !important;
        font-style: italic; 
    }
    .v-error {
        color: red;
        padding-left: 10px !important;
    }
</style>

<script>
    import axios from '../axios';
    import "vue-loading-overlay/dist/vue-loading.css";
    import Loading from 'vue-loading-overlay';

    export default {       
        components: {      
            Loading
        },

        data: function () {
          return {
            editMode: false,
            query: '',
            queryField: 'name',
            users: [],
            pagination: {
                current_page: 1
            },
            form: new Form({
                id: '',
                first_name: '',
                last_name: '',
                email: '',
                mobile_no: '',
                role_id: '',
                password: '',
                confirm_password: ''
            }),
            errors: [],
          }
        },       
      
        methods: {            
            reset() {               
                this.form.reset()
                this.form.clear()                
            },
            store() {
                const loader = this.$loading.show({
                   container: this.$refs.attendanceTable,
                   canCancel: true,
                   loader: 'bars'
                })
         
                axios.post('/users', this.form)
                    .then(response => {
                        if (response.data.status == 200) {                            
                            this.$snotify.success('Successfully created', 'Success');
                            this.$router.push({ name: 'users' });
                            this.loader.hide();                                                 
                        } else {
                            this.$snotify.error('Something went worng', 'error');
                        }
                    })
                    .catch(this.setErrors)
                    .finally(e => {
                        loader.hide();
                    })                
            },
            show(user) {
              this.form.reset();
              this.form.fill(user);
              $("#showModal").modal("show");
              console.log(user);
            },
            edit(user) {
                this.editMode = true
                this.form.reset()
                this.form.clear()
                this.form.fill(user)              
                $('#cutomerModalLong').modal('show');
            },
            update() {
                this.form.busy = true;
                this.form.put('/api/users/'+this.form.id)
                    .then(response => {
                        this.getData();
                        $('#cutomerModalLong').modal('hide');
                        if (this.form.successful) {
                            this.$snotify.success('Successfully updated', 'Success');
                            this.form.reset();
                            this.form.clear();
                        } else {
                            this.$snotify.error('Something went worng', 'error');
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    })
            },
            setErrors(err) {
                console.log(99);
                this.errors = err.response.data.errors;
            }
        }
    }
</script>