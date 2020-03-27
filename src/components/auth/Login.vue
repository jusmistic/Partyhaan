<template>
<v-container>
    <v-layout row wrap>
      <v-flex>
            <v-card
                class="mx-auto"
                >
                <v-card-title class="title font-weight-regular justify-space-between">
                    <span>Login</span>
                </v-card-title>
                <v-window>
                    <v-window-item>
                    <v-card-text>
                    <v-form
                            ref="form"
                            v-model="valid"
                            lazy-validation
                            >
                            <v-text-field
                                v-model="email"
                                :rules="emailRules"
                                label="E-mail"
                                required
                            ></v-text-field>

                            <v-text-field
                                v-model="password"
                                :rules="passwordRules"
                                label="Password"
                                required
                                :append-icon="passwordShow ? 'mdi-eye-off' : 'mdi-eye'"
                                :type="passwordShow ? 'text' : 'password'"
                                @click:append="passwordShow = !passwordShow"
                            ></v-text-field>


                            <v-btn
                                :disabled="!valid"
                                color="success"
                                @click="validate"
                            >
                                Login
                            </v-btn>

                            </v-form>
                    </v-card-text>
                    </v-window-item>
                </v-window>
            </v-card>
          </v-flex>
    </v-layout>
</v-container>

</template>

<script>
export default {
data () {
    return {
    show1: false,
    show2: true,
    show3: false,
    show4: false,
    valid: true,
    email: '',
    passwordShow: false,
    confirmPasswordShow: false,
    password: '',
    passwordRules: [
        value => !!value || 'Required.',
    ],
    emailRules: [
        value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
        }
    ]
    }
},
methods:{
    validate () {
        const user = {
            email: this.email,
            password: this.password
        }
 
        if (this.$refs.form.validate()) {
            this.snackbar = true
            this.$store.dispatch('login', user)
            if(this.$store.getters.error == null ){
                // if login not err
                this.$router.push({ path: '/dashboard' }).catch()
            }
          }
    },


}
}
</script>
<style>

</style>