<template>
    <div class="row">
        <div class="col-xs-12 col-sm-12">
            <div class="card">
                <div class="card-header font-weight-bold">Create New Quotation</div>
                <div class="card-body card-block" ref="attendanceTable">
                    <form @submit.prevent="editMode ? update() : store()">
                        <div class="row">
                            <div class="col-4">
                                <div class="form-group">
                                    <label for="role" class="form-control-label font-weight-bold">To</label>
                                   <div class="input-group">
                                    <select name="select" id="selectLg" class="form-control-lg form-control">
                                        <option value="0">Please select</option>
                                        <option value="1">Option #1</option>
                                        <option value="2">Option #2</option>
                                        <option value="3">Option #3</option>
                                    </select>
                                    <div class="input-group-btn">
                                        <div class="btn-group">
                                            <button type="button" class="form-control" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">
                                                <i class="fa fa-plus-circle text-primary fa-lg"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div class="col-4"></div>
                            <div class="col-4">
                                <div class="form-group">
                                    <label for="last-name" class="form-control-label font-weight-bold">Quotation Date</label>
                                    <input type="date" v-model="form.quotation_date" class="form-control" placeholder="Enter quotation datee" :class="{ 'is-invalid': errors.quotation_date }"><div class="v-error" v-if="errors.quotation_date">{{ errors.quotation_date[0] }}</div>
                                </div>
                            </div>                           
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <div class="form-group">
                                    <label for="subject" class="form-control-label font-weight-bold">Subject</label>                                   
                                    <input type="text" v-model="form.subject" class="form-control" placeholder="Enter quotation subject" :class="{ 'is-invalid': errors.subject }"><div class="v-error" v-if="errors.subject">{{ errors.subject[0] }}</div>
                                </div>
                            </div>                           
                        </div>
                        <button type="button" class="btn btn-success"> Services Description As Following Detail</button>
                       
                        <div class="row">
                            <table>
                                <thead>
                                    <tr>
                                        <th width="5%">No</th>
                                        <th width="40%"> &nbsp;&nbsp; Job Description</th>
                                        <th width="10%">Quantity</th>
                                        <th width="15%">Service Price Per Year</th>
                                        <th width="10%">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in quotations_items" :key="index">
                                        <td class="text-center">
                                            {{ ++index }}                                       
                                        </td>
                                        <td>
                                            <input type="text" v-model="item.job_description" class="form-control" placeholder="Enter job description"/>
                                        </td>
                                        <td class="text-center">
                                            <input type="number" v-model="item.quantity" min="0" class="form-control text-right" placeholder="Enter quantity"/>
                                        </td>
                                        <td class="text-center">
                                            <input type="number" v-model="item.service_per_year" class="form-control text-right" placeholder="Enter service per year"/>
                                        </td>
                                        <!-- <td>
                                            <input class="form-control text-right" type="number" min="0" step=".01" v-model="item.product_price" @change="calculateLineTotal(item)"
                                            />
                                        </td> -->
                                       <!--  <td>
                                            <input class="form-control text-right" type="number" min="0" step=".01" v-model="item.product_qty" @change="calculateLineTotal(item)"
                                            />
                                        </td>
                                        <td>
                                            <input readonly class="form-control text-right" type="number" min="0" step=".01" v-model="item.line_total" />
                                        </td> -->
                                         <td class="text-center">
                                            <button type='button' class="btn btn-xs btn-success" @click="addNewRow">
                                                <i class="fas fa fa-plus"></i>
                                                Add
                                            </button>         
                                            <button type="button" class="btn btn-xs btn-danger" @click="deleteRow(index, item)"><i class="fas fa fa-times"></i> Delete</button>
                                        </td>
                                    </tr>
                                    <tr class="font-weight-bold">
                                        <td colspan="3" class="text-right">Total</td>
                                        <td>
                                            <input type="number" v-model="quotation_total" class="form-control text-right" placeholder="Enter service per year" readonly />
                                        </td>
                                    </tr>
                                    <tr class="font-weight-bold">
                                        <td colspan="3" class="text-right">Discount</td>
                                        <td><input class="form-control text-right" type="number" v-model="total_discount" /></td>
                                    </tr>
                                    <tr class="font-weight-bold">
                                        <td colspan="3" class="text-right">Total {{ require('number-to-words').toWords(quotation_grand_total) }}</td>                                
                                        <td><input class="form-control text-right" type="number" v-model="quotation_grand_total" /></td>
                                    </tr>
                                </tbody>
                            </table>                                                          
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
        height: 35px !important;
    }
    .v-error {
        color: red;
        padding-left: 10px !important;
    }
    th, td {
        padding: 4px !important;
        border: 1px solid !important;
    }
    table {
        width: 97%;
        border: 1px solid !important;
        margin-top: 7px !important;
        margin-left:auto; 
        margin-right:auto;
    }  
    table > thead > tr > th {
        text-align: center;
        font-weight: bold;
        background-color: #01A3A5;
        color:  #fffef8;
        border: 1px solid #999999;
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
            milon: 0,
            invoice_subtotal: 0,
            total_discount: 0,
         //   quotationTotal: 0,
            //quotation_total: 0,
            invoice_tax: 5,
            quotations_items: [{
                job_description: '',
                quantity: 0,
                service_per_year: 0,
            }]
          }
        }, 

        computed: {
            quotation_total : function() {
                var sum = 0;
                this.quotations_items.forEach(e => {
                    sum += parseFloat(e.service_per_year);
                });
                return sum;
            },
            quotation_grand_total : function() {                
                return this.quotation_total -  this.total_discount;
            },
        },
      
        methods: {            
            deleteRow(index, item) {
                var idx = this.quotations_items.indexOf(item);
                console.log(idx, index);
                if (idx > -1) {
                    this.quotations_items.splice(idx, 1);
                }
                this.calculateTotal();
            },
            addNewRow() {
                this.quotations_items.push({
                    job_description: '',
                    quantity: 0,
                    service_per_year: 0,
                });
            },
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
                            this.form.reset();
                            this.loader.hide();
                            //$('.v-error').empty();
                            //this.$router.push({ name: 'users' });                            
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