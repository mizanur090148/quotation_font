<template>
    <div class="row">
        <div class="col-xs-12 col-sm-12">
            <div class="card">
                <div class="card-header font-weight-bold">Quotation Details</div>
                <div class="card-body card-block" ref="quotationContainer">                    
                    <div class="row">
                        <div class="col-4">
                            <div class="form-group">
                                <label for="role" class="form-control-label font-weight-bold">To</label>
                                <div class="input-group">
                                    {{ quotation.vendor.vendor_name }}
                                </div>    
                            </div>
                        </div>
                        <div class="col-4"></div>
                        <div class="col-4">
                            <div class="form-group">
                                <label for="last-name" class="form-control-label font-weight-bold">Quotation Date</label>
                                {{ quotation.quotation_date }}
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div class="form-group">
                                <label for="subject" class="form-control-label font-weight-bold">Subject</label>
                                This is subject
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
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in quotation_items" :key="index">
                                    <td class="text-center">
                                        {{ ++index }}
                                    </td>
                                    <td>
                                        {{ item.job_description }}
                                    </td>
                                    <td class="text-center">
                                        {{ item.quantity }}
                                    </td>
                                    <td class="text-center">
                                        {{ item.service_per_year }}
                                    </td>                                       
                                </tr>
                                <tr class="font-weight-bold">
                                    <td colspan="3" class="text-right">Total</td>
                                    <td>
                                        {{' quotation.quotation_total '}}
                                    </td>
                                </tr>
                                <tr class="font-weight-bold">
                                    <td colspan="3" class="text-right">Total Discount</td>
                                    <td>{{ quotation.total_discount }}</td>
                                </tr>
                                <tr class="font-weight-bold">
                                    <td colspan="3" class="text-right capitalize">
                                        {{ require('number-to-words').toWords(quotation.total_without_discount) }} only
                                    </td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>                                                          
                    </div><br/>                    
                </div>
            </div>
        </div>
        <vue-snotify></vue-snotify>
    </div>
</template>

<style>
    .quotation-headline {
        background-color: #01A3A5;
    }    
    label {    
        margin-bottom: 3px !important;
        padding-left: 5px !important;        
        font-style: italic;        
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
    import axios from '../../axios';
    import "vue-loading-overlay/dist/vue-loading.css";
    import Loading from 'vue-loading-overlay';

    export default {
        components: {
            Loading
        },
        data() {
            return {
                quotation: null,
                quotation_items: null            
            }
        }, 
        mounted() {
            this.getQuotation();
        },
        methods: {
            getQuotation() {
                axios.get('/quotations/' +this.$route.params.id)
                    .then((res) => {
                        this.quotation = res.data.content;
                        this.quotation_items = this.quotation.quotation_details; 
                        console.log(res.data.content);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }
        }
    }
</script>