<template>
    <div class="row mt-2">
        <div class="col form-group">
            <select class="form-control" v-on:change="changePageSize">
                <option value="5">Display 5 per page</option>
                <option value="10">Disaply 10 per page</option>
                <option value="20">Display 20 per page</option>
                <option value="50">Display 50 users per page</option>
                <!--<option value="50">{{pageNumbers}}</option>-->
            </select>
        </div>
        <div class="col form-group">
            <select class="form-control" v-on:change="deletePerSize">
                <option value="2">Delete 2 users</option>
                <option value="5">Delete 5 users</option>
                <option value="10">Delete 10 users</option>
                <option value="15">Delete 15 users</option>
                <option value="50">Delete 50 users</option>
            </select>
        </div>
        <div class="col form-group">
            <select class="form-control" v-on:change="generateUser">
                <option value="1">Generate +1 users</option>
                <option value="5">Generate +5 users</option>
                <option value="10">Generate +10 users</option>
                <option value="50">Generate +50 users</option>
                <option value="100">Generate +100 users</option>

            </select>
        </div>
        <div class="text-right col">
            <div class="btn-group mx-2">
                <button v-for="i in pageNumbers" v-bind:key="i"
                        class="btn btn-secpmdary"
                        v-bind:class="{ 'btn-primary': i == currentPage }"
                        v-on:click="setCurrentPage(i)">
                    {{ i }}
                    
                </button>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapState, mapGetters, mapMutations } from "vuex";
    import { mapActions } from "vuex";
    import { axiosBase } from '@/api/api'
    
    export default {
        computed: {
            ...mapState(["currentPage", "pageNumbers"]),
            ...mapGetters(["pageCount"]),
            
        }, 
        methods:{
            ...mapActions({getData:"getData"}),
            ...mapMutations(["setCurrentPage", "setPageSize"]),
            changePageSize($event) {
                this.setPageSize(Number($event.target.value));
                var a=Number($event.target.value);
                
                axiosBase.get(`/1/${a}`).then(response=>{
                    this.$store.state.persons=response.data.content
                    this.$store.state.pageSize=a
                    this.$store.state.pageNumbers=response.data.totalPages
                
                }).catch(err=>{
                    console.log(err)
                })
            },
            deletePerSize($event){
                var a=Number($event.target.value);
                axiosBase.get(`/delete/${a}`)
                this.getData()
            },
            generateUser($event){
                var a=Number($event.target.value);
                axiosBase.get(`/generate/${a}`)
                this.getData()
            },
            setCurrentPage(i){
                axiosBase.get(`/${i}/${this.$store.state.pageSize}`).then(response=>{
                    this.$store.state.persons=response.data.content
                    this.$store.state.currentPage=i
                    
                }).catch(err=>{
                    console.log(err)
                })
            }
        }
    }
</script>