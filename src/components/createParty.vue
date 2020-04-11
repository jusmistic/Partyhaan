<template>
<v-container>
    <v-row dense>
        <v-col cols="12">
        <v-card class='cardItem'>
            <v-card-title>สร้างปาร์ตี้</v-card-title>
            <v-card-text v-if="this.getResParty">
                สร้างปาร์ตี้ สำเร็จ กำลังกลับไป Dashboard
                <br> Party Id : {{this.getResParty.id}}
                
            </v-card-text>
            <v-card-text v-else>
                <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                    >
                    <v-text-field
                        color='deep-purple'
                        v-model="partyName"
                        label="ชื่อปาร์ตี้"
                        required
                    ></v-text-field>
                    <v-text-field type="number"
                        color='deep-purple'
                        v-model="money"
                        label="เงินที่เก็บแต่ละเดือน(บาท)"
                        required
                    ></v-text-field>
                    <v-text-field
                        color='deep-purple'
                        v-model="promptpay"
                        label="หมายเลขพร้อมเพย์"
                        required
                    ></v-text-field>
                    <v-btn
                        color="success"
                        @click='create'
                    >
                    สร้าง
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
    data() {
        return {
            valid:'',
            partyName:'',
            money:0,
            promptpay:'',
            payDate:'',
            partyId:''

        }
    },
    computed: {
        getResParty(){
            return this.$store.getters.resParty
        }
    },
    methods:{

        create(){
            this.$store.commit('setResParty', null)

            let party = {}
            party.name = this.partyName
            party.money = this.money
            party.promptpay = this.promptpay
            party.ownerId = this.$store.getters.user.uid
            let members = {'id':this.$store.getters.user.uid,'name':this.$store.getters.user.displayName ,'paymentStatus':true}
            let payload ={}
            payload.party = party
            payload.members = members
            this.$store.dispatch('createParty', payload)
            .then(()=>{
                //set party id
                setTimeout(() => {
                    this.$router.push('/dashboard')
                    this.$store.commit('setResParty', null)
                }, 2000)
                
            })



        }
    },



}
</script>

<style>

</style>