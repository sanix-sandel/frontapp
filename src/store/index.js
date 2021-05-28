import Vue from "vue";
import Vuex from "vuex";

//import Axios from "axios";
import {axiosBase} from '@/api/api'

Vue.use(Vuex);



export default new Vuex.Store({
    strict: true,
    state: {
        persons: [],
        productsTotal: 0,
        currentPage: 1,
        pageSize: 5,
        pageNumbers:0,
        totalElements:0

    },
    getters: {
        processedProducts: state => {
            
            return state.persons;
        },
        pageCount: state => {
            return state.totalPages
        },
        personByName:state=>(name)=>{
            return state.persons.find(p=>p.name==name)
        }
    },
    mutations: {
        setCurrentPage(state, page) {
            state.currentPage = page;
        },
        setPageSize(state, size) {
            state.pageSize = size;
            state.currentPage = 1;

        },
        setData(state, data) {
            state.persons = data.pdata;
            state.personsTotal = data.pdata.length;
            state.pageSize=data.pdata.length
            
        },
        setPageNumbers(state, data){
            state.pageNumbers=data.pageNumbers
        },
        setTotalElements(state, data){
            state.totalElements=data.totalElements
        }
    },
    actions: {
        async getData(context) {
            let data=(await axiosBase.get('/1/5')).data
            
            let pdata = data.content;
            console.log(data)
            let pageNumbers=data.totalPages
            let totalElements=data.totalElements
            
            console.log(pageNumbers)
            console.log(data.totalElements)

            context.commit("setData", { pdata} );
            context.commit("setPageNumbers", { pageNumbers} );
            context.commit("setTotalElements", { totalElements} );
            
        }
    }
})