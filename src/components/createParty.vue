<template>
<v-container v-bind:is="party">
    <v-row dense>
        <v-col cols="12">
        <v-card class='cardItem'>
            <v-card-title>สร้างปาร์ตี้</v-card-title>
            <v-card-text v-if="partyId != ''">
                สร้างปาร์ตี้ สำเร็จ
                <br> Party Id : {{partyId}}
                
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
                    <v-text-field
                        color='deep-purple'
                        v-model="payDate"
                        label="เก็บเงินทุกวันที่"
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
    methods:{

        create(){
            let party = {}
            party.name = this.partyName
            party.money = this.money
            party.promptpay = this.promptpay
            party.payDate = this.payDate
            party.ownerId = this.$store.getters.user.uid
            party.members = []
            party.members.push({'id':this.$store.getters.user.uid, 'paymentStatus':true})
            
            this.$store.dispatch('createParty', party)

            //set party id
            if(this.$store.getters.resParty != ''){
                // console.log(this.$store.getters.resParty.id)
                this.partyId = this.$store.getters.resParty.id
                setTimeout(() => {
                    this.$store.commit('setResParty', null)
                    this.$router.push('/dashboard')
                }, 3000)
            }

        }
    },



}
</script>

<style>

</style>