<template>
  <div>
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <v-card class="cardItem" v-if="party">
            <v-card-title>{{party.name}}</v-card-title>
            <v-card-text>
              <p>
                สถานะของคุณ: {{payStatus}}
                <br />
                วันที่ต้องจ่าย:{{party.payDate}}
                <br />
                หมายเลขพร้อมเพย์:{{party.promptpay}}
                <br />
                เงินที่ต้องเก็บต่อเดือน: {{party.money}}
              </p>
            </v-card-text>
          </v-card>
          <v-skeleton-loader v-else type="card"></v-skeleton-loader>
        </v-col>
      </v-row>
      <div id="AdminSection">
        <!-- Admin section -->
      </div>
      <br />

      <div id="memberListSection">
        <h3>สมาชิกในปาร์ตี้</h3>
        <v-row dense v-for="member in party.members" :key='member'>
          <v-col cols="12">
            <v-card class="cardItem">
              <v-row justify="center">
                <v-spacer></v-spacer>
                <v-col cols="1" v-if="member.id == party.ownerId">👑</v-col>
                <v-col cols="1" v-else></v-col>
                <v-col cols="6">
                  <h4>{{member.name}}</h4>
                </v-col>
                <v-col cols="4" v-if="member.paymentStatus">✔</v-col>
                <v-col cols="4" v-else>❌</v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("getPartyById", this.$route.params.id);
  },

  data() {
    return {};
  },
  methods: {},
  computed: {
    party() {
      return this.$store.getters.currentParty;
    },
    payStatus() {
      let members = this.$store.getters.currentParty.members;
      let msg = "Error";
      members.forEach(member => {
        if (member.id == this.$store.getters.user.uid) {
          msg = member.paymentStatus;
          return msg;
        }
      });
      return msg;
    },

  }
};
</script>

<style>
</style>