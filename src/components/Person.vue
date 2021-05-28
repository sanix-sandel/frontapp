<template>
    <div>
        <div class="card m-1 p-1 bg-light">
            <h4>
                {{person.name}} {{person.lastName}}
                
                <span class="badge badge-pill badge-primary float-right">
                    $ {{ person.email }}
                </span>
                
            </h4>
            <div class="card-text bg-white p-1">{{ person.birthdate }}</div>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return {
            person:{}
        }
    },
    created(){
        Object.assign(this.person, this.$store.getters.personByName(this.$route.params["name"]))
    }
}
</script>