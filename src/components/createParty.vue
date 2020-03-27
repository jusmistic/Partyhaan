<template>
<v-container>
    <v-row dense>
        <v-col cols="12">
        <v-card class='cardItem'>
            <v-card-title>สร้างปาร์ตี้</v-card-title>
            <v-card-text>
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
            payDate:''
        }
    },
}
</script>

<style>

</style>