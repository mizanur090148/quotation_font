<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <strong class="card-title">Quotation List</strong>
                </div>
                <div class="card-body">
                    <router-link tag="a" class="btn btn-sm btn-info" to="/quotation-create">
                        <i class="glyphicon glyphicon-plus"></i> New Quotation
                    </router-link>
                    <div class="pull-right m-b-1">
                        <div class="pull-left" style="margin-right: 10px;">
                            <select v-model="search_field" class="form-control-sm">
                                <!-- <option value="all">All</option> -->
                                <option value="id">QID</option>
                                <option value="vendor_id">To</option>
                                <option value="subject">Subject</option>
                                <option value="quotation_date">Quotation Date</option>
                            </select>
                        </div>
                        <div class="pull-left" style="margin-right: 10px;">
                            <input type="text" class="form-control-sm" v-model="search_query"  placeholder="Type here for search">
                        </div>
                    </div>
                    <hr class="list-he">
                    <table class="reportTable">
                        <thead>
                            <tr>
                                <th scope="col">SL</th>
                                <th scope="col">QID</th>
                                <th scope="col">To</th>
                                <th width="33%" scope="col">Subject</th>
                                <th scope="col">Q. Date</th>
                                <th scope="col">Discount</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Services</th>
                                <th title="Terms & Conditions" scope="col">T & C</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(quotation, index) in quotations" :key="quotation.id">
                                <td>{{ ++index }}</td>
                                <td>{{ quotation.id }}</td>
                                <td>{{ quotation.vendor.vendor_name }}</td>
                                <td :title="quotation.subject">{{ quotation.subject | subStr }}</td>
                                <td>{{ quotation.quotation_date }}</td>                               
                                <td>{{ quotation.total_discount }}</td>
                                <td>{{ quotation.total_without_discount }}</td>
                                <td>
                                    <button type="button" class="btn btn-success btn-xs" @click="addEditDeleteServices(quotation.id)" title="Add/Edit/Delete">
                                        <i class="fas fa fa-edit"></i>
                                    </button>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-success btn-xs" @click="edit(quotation)" title="Add/Edit/Delete">
                                        <i class="fas fa fa-edit"></i>
                                    </button>
                                </td>
                                <td>
                                    <!-- <router-link
                                       :to="'/view-quotation?qid=' + quotation.id"
                                       class="btn btn-primary btn-xs"
                                       title="View details">
                                        <i class="fas fa fa-eye"/>
                                    </router-link> -->
                                    <router-link
                                       :to="'/view-quotation/'+ quotation.id"
                                       class="btn btn-primary btn-xs"
                                       title="View details">
                                        <i class="fas fa fa-eye"/>
                                    </router-link>                                                          
                                    <button type="button" class="btn btn-success btn-xs" @click="edit(quotation)" title="Edit">
                                        <i class="fas fa fa-edit"></i>
                                    </button>
                                    <button type="button" class="btn btn-danger btn-xs " @click="deleteQuotation(quotation.id)" title="Delete"><i class="fas fa fa-times"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <v-pagination v-if="pagination.last_page > 1" :pagination="pagination" :offset="5" @paginate="getQuotations()">
                    </v-pagination>
                </div>
            </div>
        </div>

        <!-- Add, Edit or Delete Services Modal  -->
        <modal name="serviceModal" :width="650" :height="420">
            <div class="col-xs-12 col-sm-12">
                <div class="card">
                    <div class="card-header font-weight-bold">Add, Edit or Delete services</div>
                    <div class="card-body card-block" ref="quotationContainer">
                        <form @submit.prevent="">
                            <div class="row">
                                <div class="col-4">
                                    <div class="form-group">
                                        <label for="vendor_name" class="form-control-label font-weight-bold">Vendor Name</label>
                                        <!-- <input type="text" v-model="vendor_form.vendor_name" class="form-control" placeholder="Enter vendor name" :class="{ 'is-invalid': vendor_errors.vendor_name }"><div class="v-error" v-if="vendor_errors.vendor_name">{{ vendor_errors.vendor_name[0] }}</div> -->
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="form-group">
                                        <label for="vendor_no" class="form-control-label font-weight-bold">Vendor No.</label>
                                       <!--  <input type="text" v-model="vendor_form.vendor_no" class="form-control" placeholder="Enter vendor no" :class="{ 'is-invalid': vendor_errors.vendor_no }"><div class="v-error" v-if="vendor_errors.vendor_no">{{ vendor_errors.vendor_no[0] }}</div>            -->                            
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="form-group">
                                        <label for="trn_no" class="form-control-label font-weight-bold">Trn No.</label>                                      
                                        <!-- <input type="text" v-model="vendor_form.trn_no" class="form-control" placeholder="Enter trn no" :class="{ 'is-invalid': vendor_errors.trn_no }"><div class="v-error" v-if="vendor_errors.trn_no">{{ vendor_errors.trn_no[0] }}</div>   -->
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
        </modal>
        <!-- End Add, Edit or Delete services Modal  -->
        <vue-snotify></vue-snotify>
    </div>
</template>
<style>
.m-b-1 {
    padding-bottom: 15px !important;
}
/*
table {
    margin-bottom: 20px !important;
}*/

.form-control-sm {
    border-radius: 18px !important;
}

 /*table > thead > tr > th {
      text-align: center;
      font-weight: bold;
      background-color: #01A3A5;
      color:  #fffef8;    
  }  */
</style>
<script>
import axios from '../axios';
import "vue-loading-overlay/dist/vue-loading.css";
import Loading from 'vue-loading-overlay';

export default {

    data() {
        return {         
            quotations: [],
            pagination: {
                current_page: 1
            },
            search_query: '',
            search_field: '',
            all_fields: ['id', 'vendors.vendor_name', 'subject', 'quotation_date'] 
        }
    },
    mounted() {
        this.getQuotations()
    },
    watch: {
        search_query: function(new_search_key, old_search_key) {
            this.pagination.current_page = '';
            if (new_search_key === '' ) {
                if (this.search_field === '') {
                  this.search_field = this.all_fields;
                }
                this.pagination.current_page = '';
                this.searchQuotations();
            } else {
                this.search_field = this.all_fields;
                this.searchQuotations();
            }
        },
        search_field: function() {
            this.pagination.current_page = '';
            this.searchQuotations();           
        }
    },
    filters: {  
      subStr: function(string) {
        return string.substring(0, 45) + '...';
      }  
    },
    methods: { 
        addEditDeleteServices() {
            // this.editMode = false   
            /*this.form.reset();*/
            this.$modal.show('serviceModal')
        },

        getQuotations() {
            const loader = this.$loading.show({
                container: this.$refs.attendanceTable,
                canCancel: true,
                loader: 'bars'
            })
            let url = encodeURI('quotations?page=' 
                + this.pagination.current_page
                +'&search_field='+this.search_field
                +'&search_query='+this.search_query);
            axios.get(url)
                .then((res) => {
                    this.quotations = res.data.content.data;
                    this.pagination = res.data.content;
                    console.log(res.data.content);
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    loader.hide();
                });
        },

        searchQuotations() {
            let url = encodeURI('search-quotations?page='+this.pagination.current_page+'&search_field='+this.search_field+'&search_query='+this.search_query);
            axios.get(url)
             .then(response => {
                    this.buyers = response.data.data;
                    this.pagination = response.data.meta;        
                })
                .catch(e => {
                    console.log(e);
                })
        },

        deleteQuotation(quotationId) {
           // this.$snotify.clear();
            this.$snotify.confirm(
                "Are you sure to delete this?",
                {
                    closeOnClick: false,
                    pauseOnHover: true,
                    buttons: [
                        {
                            text: "Yes",
                            action: toast => {
                                this.$snotify.remove(toast.id);
                                axios.delete('/quotations/'+quotationId)
                                    .then(response => {
                                        this.getQuotations();
                                        this.$snotify.success('Successfully deleted', 'Success');
                                    })
                                    .catch(e => {
                                        this.$snotify.success('Successfully deleted', 'Success');
                                    })                               
                            },
                            bold: true
                        },
                        {
                            text: "No",
                            action: toast => {
                                this.$snotify.remove(toast.id);
                            },
                            bold: true
                        }
                    ]
                }
            );
        }
    },
    
}
</script>