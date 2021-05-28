<template>
    <div>
        <div v-for="p in persons" v-bind:key="p.id" class="card m-1 p-1 bg-light">
            <h4>
                <p v-on:click="personDetail(p.name)">{{p.name}} {{p.lastName}}</p>
                <span class="badge badge-pill badge-danger float-right" v-on:click="deleteOne(p.name)">
                    Delete
                </span>
                <span class="badge badge-pill badge-primary float-right" v-on:click="personDetail(p.name)">
                    $ {{ p.email }}
                </span>
                
            </h4>
            <div class="card-text bg-white p-1">{{ p.birthdate }}</div>
        </div>
        <page-controls />
        
        <button type="button" class="btn btn-danger" v-on:click="deleteAll()">Delete all</button>
    </div>
</template>

<script>
import { mapGetters} from "vuex";
import PageControls from "./PageControls";
import { mapActions } from "vuex";

import { mapState } from "vuex";
import { axiosBase } from '@/api/api'

export default {
    components: { PageControls },
    computed: {
        ...mapState(["persons"]),
        ...mapGetters({ persons: "processedProducts" })
    },
    methods:{
        ...mapActions({getData:"getData"}),
        deleteOne(name){
            axiosBase.get(`/deleteone/${name}`)
            this.$store.state.persons.filter(p=>p.name!=name)
            this.getData();
            
        },
        deleteAll(){
            alert('deleting all')
            axiosBase.get('/delete/all/')
            this.getData();
        },
        personDetail(name){
            
            this.$router.push(`/persons/${name}/`)
        }
    }
    
}
</script>