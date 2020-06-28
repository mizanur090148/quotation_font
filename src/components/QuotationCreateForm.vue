<template>
    <div class="row">
        <div class="col-xs-12 col-sm-12">
            <div class="card">
                <div class="card-header font-weight-bold">Create New Quotation</div>
                <div class="card-body card-block" ref="quotationContainer">
                    <nav>
                      <div class="nav nav-tabs font-weight-bold" id="nav-tab" role="tablist">
                        <a class="nav-link" @click.prevent="setActive('home')" :class="{ active: isActive('home') }" href="#home">Quotation</a>
                        <a class="nav-link" @click.prevent="setActive('including-services')" :class="{ active: isActive('including-services') }" href="#including-services">including-services</a>
                        <a class="nav-link" @click.prevent="setActive('terms-and-conditions')" :class="{ active: isActive('terms-and-conditions') }" href="#terms-and-conditions">Terms & Conditions</a>
                      </div>
                    </nav>
                    <div class="tab-content py-3" id="myTabContent">
                        <div class="tab-pane fade" :class="{ 'active show': isActive('home') }" id="home">
                            <form @submit.prevent="editMode ? update() : quotationStore()">
                                <div class="row">
                                    <div class="col-4">
                                        <div class="form-group">
                                            <label for="role" class="form-control-label font-weight-bold">To</label>
                                            <div class="input-group">
                                                <select v-model="form.vendor_id" id="selectLg" class="form-control-lg form-control" :class="{ 'is-invalid': errors.vendor_id }">
                                                    <option value="">Please a select vendor</option>
                                                    <option v-for="vendor in vendors" :value="vendor.id">{{ vendor.vendor_name }}</option>
                                                </select>
                                                <div class="input-group-btn">
                                                    <div class="btn-group">
                                                        <button type="button" class="form-control" @click="vendorCreateForm()">
                                                            <i class="fa fa-plus-circle text-primary fa-lg"></i>
                                                        </button>
                                                    </div>
                                                </div>                                        
                                            </div>
                                            <div class="v-error" v-if="errors.vendor_id">{{ errors.vendor_id[0] }}</div>
                                        </div>
                                    </div>
                                    <div class="col-4"></div>
                                    <div class="col-4">
                                        <div class="form-group">
                                            <label for="last-name" class="form-control-label font-weight-bold">Quotation Date</label>
                                            <input type="date" v-model="form.quotation_date" class="form-control" placeholder="Enter quotation date" :class="{ 'is-invalid': errors.quotation_date }"><div class="v-error" v-if="errors.quotation_date">{{ errors.quotation_date[0] }}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <div class="form-group">
                                            <label for="subject" class="form-control-label font-weight-bold">Subject</label>
                                            <input type="text" v-model="form.subject" class="form-control" placeholder="Enter quotation subject" :class="{ 'is-invalid': errors.subject }"/><div class="v-error" v-if="errors.subject">{{ errors.subject[0] }}</div>
                                        </div>
                                    </div>
                                </div>
                                <button type="button" class="btn btn-success quotation-headline"> Services Description As Following Detail</button>
                               
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
                                            <tr v-for="(item, index) in form.quotation_items" :key="index">
                                                <td class="text-center">
                                                    {{ ++index }}
                                                </td>
                                                <td>
                                                    <input type="text" v-model="item.job_description" class="form-control" placeholder="Enter job description" :class="{ 'is-invalid': errors.job_description }"/><div class="v-error" v-if="errors.job_description">{{ errors.job_description[0] }}</div>
                                                </td>
                                                <td class="text-center">
                                                    <input type="number" v-model="item.quantity" min="0" class="form-control text-right" placeholder="Enter quantity" :class="{ 'is-invalid': errors.quantity }"/><div class="v-error" v-if="errors.quantity">{{ errors.quantity[0] }}</div>
                                                </td>
                                                <td class="text-center">
                                                    <input type="number" v-model="item.service_per_year" min="0" class="form-control text-right" placeholder="Enter service per year" :class="{ 'is-invalid': errors.service_per_year }"/><div class="v-error" v-if="errors.service_per_year">{{ errors.service_per_year[0] }}</div>
                                                </td>                                       
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
                                                    <input type="number" v-model="quotation_total" class="form-control text-right" placeholder="Enter service per year" readonly/>
                                                </td>
                                            </tr>
                                            <tr class="font-weight-bold">
                                                <td colspan="3" class="text-right">Total Discount</td>
                                                <td><input type="number" class="form-control text-right" min="0" v-model="form.total_discount"/></td>
                                            </tr>
                                            <tr class="font-weight-bold">
                                                <td colspan="3" class="text-right capitalize">{{ require('number-to-words').toWords(total_without_discount) }} only</td>
                                                <td><input class="form-control text-right" type="number" v-model="total_without_discount" readonly/></td>
                                            </tr>
                                        </tbody>
                                    </table>                                                         
                                </div><br/>
                                <div class="form-group row m-t-md">
                                    <div class="col-sm-offset-4 col-sm-12 text-center">
                                        <button type="submit" class="btn btn-info btn-rounded m-b-10 m-l-5">Submit</button>
                                        <button @click="reset()" type="button" class="btn btn-danger btn-rounded m-b-10 m-l-5">Reset</button>
                                    </div>
                                </div> 
                            </form>
                        </div>
                        <div class="tab-pane fade" :class="{ 'active show': isActive('including-services') }" id="including-services">Including services content</div>
                        <div class="tab-pane fade" :class="{ 'active show': isActive('terms-and-conditions') }" id="terms-and-conditions">terms-and-conditions content</div>
                    </div>
                <!-- <form @submit.prevent="editMode ? update() : quotationStore()">
                        <div class="row">
                            <div class="col-4">
                                <div class="form-group">
                                    <label for="role" class="form-control-label font-weight-bold">To</label>
                                    <div class="input-group">
                                        <select v-model="form.vendor_id" id="selectLg" class="form-control-lg form-control" :class="{ 'is-invalid': errors.vendor_id }">
                                            <option value="">Please a select vendor</option>
                                            <option v-for="vendor in vendors" :value="vendor.id">{{ vendor.vendor_name }}</option>
                                        </select>
                                        <div class="input-group-btn">
                                            <div class="btn-group">
                                                <button type="button" class="form-control" @click="vendorCreateForm()">
                                                    <i class="fa fa-plus-circle text-primary fa-lg"></i>
                                                </button>
                                            </div>
                                        </div>                                        
                                    </div>
                                    <div class="v-error" v-if="errors.vendor_id">{{ errors.vendor_id[0] }}</div>
                                </div>
                            </div>
                            <div class="col-4"></div>
                            <div class="col-4">
                                <div class="form-group">
                                    <label for="last-name" class="form-control-label font-weight-bold">Quotation Date</label>
                                    <input type="date" v-model="form.quotation_date" class="form-control" placeholder="Enter quotation date" :class="{ 'is-invalid': errors.quotation_date }"><div class="v-error" v-if="errors.quotation_date">{{ errors.quotation_date[0] }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <div class="form-group">
                                    <label for="subject" class="form-control-label font-weight-bold">Subject</label>
                                    <input type="text" v-model="form.subject" class="form-control" placeholder="Enter quotation subject" :class="{ 'is-invalid': errors.subject }"/><div class="v-error" v-if="errors.subject">{{ errors.subject[0] }}</div>
                                </div>
                            </div>
                        </div>
                        <button type="button" class="btn btn-success quotation-headline"> Services Description As Following Detail</button>
                       
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
                                    <tr v-for="(item, index) in form.quotation_items" :key="index">
                                        <td class="text-center">
                                            {{ ++index }}
                                        </td>
                                        <td>
                                            <input type="text" v-model="item.job_description" class="form-control" placeholder="Enter job description" :class="{ 'is-invalid': errors.job_description }"/><div class="v-error" v-if="errors.job_description">{{ errors.job_description[0] }}</div>
                                        </td>
                                        <td class="text-center">
                                            <input type="number" v-model="item.quantity" min="0" class="form-control text-right" placeholder="Enter quantity" :class="{ 'is-invalid': errors.quantity }"/><div class="v-error" v-if="errors.quantity">{{ errors.quantity[0] }}</div>
                                        </td>
                                        <td class="text-center">
                                            <input type="number" v-model="item.service_per_year" min="0" class="form-control text-right" placeholder="Enter service per year" :class="{ 'is-invalid': errors.service_per_year }"/><div class="v-error" v-if="errors.service_per_year">{{ errors.service_per_year[0] }}</div>
                                        </td>                                       
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
                                            <input type="number" v-model="quotation_total" class="form-control text-right" placeholder="Enter service per year" readonly/>
                                        </td>
                                    </tr>
                                    <tr class="font-weight-bold">
                                        <td colspan="3" class="text-right">Total Discount</td>
                                        <td><input type="number" class="form-control text-right" min="0" v-model="form.total_discount"/></td>
                                    </tr>
                                    <tr class="font-weight-bold">
                                        <td colspan="3" class="text-right capitalize">{{ require('number-to-words').toWords(total_without_discount) }} only</td>
                                        <td><input class="form-control text-right" type="number" v-model="total_without_discount" readonly/></td>
                                    </tr>
                                </tbody>
                            </table>                                                         
                        </div><br/>                        
                        <div class="form-group row m-t-md">
                            <div class="col-sm-offset-4 col-sm-12 text-center">
                                <button type="submit" class="btn btn-info btn-rounded m-b-10 m-l-5">Submit</button>
                                <button @click="reset()" type="button" class="btn btn-danger btn-rounded m-b-10 m-l-5">Reset</button>
                            </div>
                        </div> 
                     </form> -->
                </div>
            </div>
        </div>       

        <!--vendor create modal-->
        <modal name="vendorModal" :width="650" :height="420">
            <div class="col-xs-12 col-sm-12">
                <div class="card">
                    <div class="card-header font-weight-bold">Create New Vendor</div>
                    <div class="card-body card-block" ref="quotationContainer">
                        <form @submit.prevent="editMode ? vendorStore() : vendorStore()">
                            <div class="row">
                                <div class="col-4">
                                    <div class="form-group">
                                        <label for="vendor_name" class="form-control-label font-weight-bold">Vendor Name</label>
                                        <input type="text" v-model="vendor_form.vendor_name" class="form-control" placeholder="Enter vendor name" :class="{ 'is-invalid': vendor_errors.vendor_name }"><div class="v-error" v-if="vendor_errors.vendor_name">{{ vendor_errors.vendor_name[0] }}</div>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="form-group">
                                        <label for="vendor_no" class="form-control-label font-weight-bold">Vendor No.</label>
                                        <input type="text" v-model="vendor_form.vendor_no" class="form-control" placeholder="Enter vendor no" :class="{ 'is-invalid': vendor_errors.vendor_no }"><div class="v-error" v-if="vendor_errors.vendor_no">{{ vendor_errors.vendor_no[0] }}</div>                                       
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="form-group">
                                        <label for="trn_no" class="form-control-label font-weight-bold">Trn No.</label>                                      
                                        <input type="text" v-model="vendor_form.trn_no" class="form-control" placeholder="Enter trn no" :class="{ 'is-invalid': vendor_errors.trn_no }"><div class="v-error" v-if="vendor_errors.trn_no">{{ vendor_errors.trn_no[0] }}</div>  
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-4">
                                    <div class="form-group">
                                        <label for="telephone_no" class="form-control-label font-weight-bold">Telephone No.</label>
                                        <input type="text" v-model="vendor_form.telephone_no" class="form-control" placeholder="Enter telephone no" :class="{ 'is-invalid': vendor_errors.telephone_no }"><div class="v-error" v-if="vendor_errors.telephone_no">{{ vendor_errors.telephone_no[0] }}</div>  
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="form-group">
                                        <label for="attention" class="form-control-label font-weight-bold">Attention</label>                                      
                                        <input type="text" v-model="vendor_form.attention" class="form-control" placeholder="Enter attention" :class="{ 'is-invalid': vendor_errors.attention }"><div class="v-error" v-if="vendor_errors.attention">{{ vendor_errors.attention[0] }}</div>  
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="form-group">
                                        <label for="attention_designation" class="form-control-label font-weight-bold">Attention Designation</label>
                                        <input type="text" v-model="vendor_form.attention_designation" class="form-control" placeholder="Enter attention designation" :class="{ 'is-invalid': vendor_errors.attention_designation }"><div class="v-error" v-if="vendor_errors.attention_designation">{{ vendor_errors.attention_designation[0] }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-4">
                                    <div class="form-group">
                                        <label for="email" class="form-control-label font-weight-bold">E-mail</label>
                                        <input type="text" v-model="vendor_form.email" class="form-control" placeholder="Enter email" :class="{ 'is-invalid': vendor_errors.email }"><div class="v-error" v-if="vendor_errors.email">{{ vendor_errors.email[0] }}</div>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="form-group">
                                        <label for="fax_no" class="form-control-label font-weight-bold">Fax No.</label>
                                        <input type="text" v-model="vendor_form.fax_no" class="form-control" placeholder="Enter fax no" :class="{ 'is-invalid': vendor_errors.fax_no }"><div class="v-error" v-if="vendor_errors.fax_no">{{ vendor_errors.fax_no[0] }}</div>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="form-group">
                                        <label for="address" class="form-control-label font-weight-bold">Address</label>
                                        <input type="text" v-model="vendor_form.address" class="form-control" placeholder="Enter address" :class="{ 'is-invalid': vendor_errors.address }"><div class="v-error" v-if="vendor_errors.address">{{ vendor_errors.address[0] }}</div>
                                    </div>
                                </div>
                                <hr/>
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
        </modal>
        <vue-snotify></vue-snotify>
    </div>
</template>

<style>
    .quotation-headline {
        background-color: #01A3A5;
    }
    .number-right {
        padding-right: 35px !important;
    }
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
    .capitalize {
        text-transform: capitalize;   
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
            activeItem: 'home',
            query: '',
            queryField: 'name',
            users: [],
            pagination: {
                current_page: 1
            },
            
            including_service_id: 0,
            form: new Form({
                vendor_id: '',
                quotation_date: '',
                subject: '',
                total_discount: 0,
                total_without_discount: 0,
                quotation_items: [{
                    job_description: '',
                    quantity: 0,
                    service_per_year: 0,
                }]
            }),
            errors: [],        
           // invoice_subtotal: 0,
           // discount: 0,
         //   quotationTotal: 0,
            //quotation_total: 0,
            invoice_tax: 5,
           /* quotation_items: [{
                job_description: '',
                quantity: 0,
                service_per_year: 0,
            }],
*/
            /*******vendor area*******/
            vendor_errors: [],
            vendor_id: 0,
            vendors: [],
            vendor_form: new Form({
                vendor_name: '',
                vendor_no: '',
                trn_no: '',
                fax_no: '',
                email: '',
                attention: '',
                attention_designation: '',
                telephone_no: '',
                address: ''
            }) 
          }
        }, 

        mounted() {
            this.getVendors();
        },        

        computed: {
            quotation_total : function() {
                var sum = 0;
                this.form.quotation_items.forEach(e => {
                    sum += parseFloat(e.service_per_year);
                });
                return sum;
            },
            total_without_discount : function() {
                return this.quotation_total -  this.form.total_discount;
            },
        },
      
        methods: {
            
            isActive (menuItem) {
              return this.activeItem === menuItem
            },
            setActive (menuItem) {
              this.activeItem = menuItem
            },
            /*********vendor table area*****/
            getVendors() {
                axios.get('/vendors')
                    .then((res) => {
                        this.vendors = res.data.content.data;
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            },
            vendorCreateForm() {
                // this.editMode = false   
                this.form.reset();          
                this.$modal.show('vendorModal')
            },
            hide() {
                this.$modal.hide('vendorModal');
            },
            vendorStore() {
                this.vendor_errors = [];
                const loader = this.$loading.show({
                   container: this.$refs.quotationContainer,
                   canCancel: true,
                   loader: 'bars'
                })
         
                axios.post('/vendors', this.vendor_form)
                    .then(response => {
                        if (response.data.status == 200) {
                            this.getVendors();
                            this.$snotify.success('Successfully created', 'Success');
                            this.$modal.hide('vendorModal');                           
                            this.loader.hide();
                        } else {
                            this.$snotify.error('Something went worng', 'error');
                        }
                    })
                    .catch( errors => {
                        console.log(errors.response);
                        this.vendor_errors = errors.response.data.errors;
                    })
                    .finally(e => {
                        loader.hide();
                    })
            },
            /*********end vendor area*******/
            /*********invoice area**********/
            deleteRow(index, item) {
                var idx = this.quotation_items.indexOf(item);
                console.log(idx, index);
                if (idx > -1) {
                    this.quotation_items.splice(idx, 1);
                }
                this.calculateTotal();
            },
            addNewRow() {
                this.form.quotation_items.push({
                    job_description: '',
                    quantity: 0,
                    service_per_year: 0,
                });
            },
            reset() {
                this.form.reset()
                this.form.clear()
            },
            /*********end invoice area******/
            quotationStore() {
                const loader = this.$loading.show({
                   container: this.$refs.quotationContainer,
                   canCancel: true,
                   loader: 'bars'
                })
         
                axios.post('/quotations', this.form)
                    .then(response => {
                        if (response.data.status == 200) {
                            this.errors = [];
                            this.$snotify.success('Successfully created', 'Success');
                            this.$router.push({ name: 'quotations' });   
                           // this.form.reset();
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
                this.errors = err.response.data.errors;
            }
        }
    }
</script>