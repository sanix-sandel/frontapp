import Vue from "vue";
import VueRouter from "vue-router";

import Person from "../components/Person.vue"
import ProductList from "../components/ProductList.vue"

Vue.use(VueRouter)

export default new VueRouter({
    mode:"history",
    routes:[
        {path:"/", component:ProductList},
        {path:"persons/:name/", component:Person}
    ]
})