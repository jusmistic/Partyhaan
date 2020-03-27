<template>
<v-container>
    <v-row dense>
        <v-col cols="12">
        <v-card class='cardItem'>
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
    data() {
        return {
            valid:'',
            partyId:''
        }
    },
}
</script>

<style>

</style>