<template>
<v-container>
    <v-row dense>
        <v-col cols="12">
        <v-card class='cardItem' v-if="userExist">
            คุณอยู่ในกลุ่มอยู่แล้ว
        </v-card>
        <v-card class='cardItem' v-if="joinCompleted">
            เข้ากลุ่มสำเร็จ กำลังไปที่กลุ่ม
        </v-card>
        <v-card class='cardItem' v-else>
            <v-card-title>เข้าปาร์ตี้</v-card-title>
            <v-card-text>
                <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                    >
                    <v-text-field
                        color='deep-purple'
                        v-model="partyId"
                        label="รหัสตี้"
                        required
                    ></v-text-field>
                    <v-btn
                        color="success"
                        @click="join()"
                    >
                    เข้าตี้
                    </v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-col>
    </v-row>
</v-container>
</template>

<script>
export default {
    created(){
    },
    data() {
        return {
            valid:'',
            partyId:''
        }
    },
    computed: {
        userExist(){
            if(this.$store.getters.error == 'userExist'){
                return true
            }
            return false
        },
        joinCompleted(){
            if(this.$store.getters.status == 'joinComplete'){
                return true
            } return false
        }
    },
    methods: {
        join(){
            this.$store.dispatch('joinParty',this.partyId)
            .then(()=>{
                // to=do check this route function after join a party
                if(this.joinCompleted){
                    setTimeout(() => {
                    this.$router.push('/party/'+this.partyId)
                    this.$store.commit('setStatus', null)
                    this.$store.commit('setError', null)

                    }, 1500)
                }
            })
        }
    },
}
</script>

<style>

</style>