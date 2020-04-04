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
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" v-if="!isOwner">
                  ออกจากตี้
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-skeleton-loader v-else type="card"></v-skeleton-loader>
        </v-col>
      </v-row>

      <div id="AdminSection" v-if="party">
        <!-- Admin section -->
        <v-row dense>
          <v-col cols="12">
            <v-card v-if="isOwner">
              <v-card-title>Admin section</v-card-title>
              <v-card-text>
                <v-btn color="red darken-1" >
                  ปิดปาร์ตี้
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <br />

      <div id="memberListSection" v-if="party">
        <h3>สมาชิกในปาร์ตี้</h3>
        <v-row dense v-for="member in party.members" :key='member.id'>
          <v-col cols="12">
            <v-card class="cardItem">
              <v-row justify="center">
                <v-spacer></v-spacer>
                <v-col cols="1" v-if="member.id == party.ownerId">👑</v-col>
                <v-col cols="1" v-else></v-col>
                <v-col cols="6">
                  <h4>{{member.name}}</h4>
                </v-col>
                <v-col cols="2" v-if="member.paymentStatus">✔</v-col>
                <v-col cols="2" v-else>❌</v-col>
                <v-col cols="2">
                  <v-menu offset-y v-if="member.id != party.ownerId">
                    <template v-slot:activator="{ on }">
                      <v-btn
                      icon
                      v-on="on"
                      >
                        <v-icon  color="black">mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item
                        v-for="(item, index) in memberMenus"
                        :key="index"
                        @click="item.func(member.id)"
                      
                      >
                        <v-list-item-title>
                          {{ item.title }}
                          </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>

                </v-col>
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
    return {
      memberMenus:[
        {
          title: 'จ่ายแล้ว',
          func: (memberId) => {this.setPaymenet(true, memberId, this.$route.params.id)}
        },
        {
          title: 'ยังไม่จ่าย',
          func: (memberId) => {this.setPaymenet(false, memberId, this.$route.params.id)}
        },
        {
          title: 'ลบออกจากตี้',
          func: (memberId) => {this.removeMember(memberId, this.$route.params.id)}
        },
      ]
    };
  },
  methods: {
    setPaymenet(status, memberId, partyId){
      let payload = {}
      payload.status = status
      payload.memberId = memberId
      payload.partyId = partyId

      this.$store.dispatch('setPaymentStatus', payload)
      .then(()=>{
        //trigger Update Party Data
        this.$store.dispatch("getPartyById", this.$route.params.id);
      })
    },
    removeMember(memberId,partyId){
      let payload = {}
      payload.memberId = memberId
      payload.partyId = partyId
      this.$store.dispatch('removeMember', payload)
      //trigger Update Party Data
      this.$store.dispatch("getPartyById", this.$route.params.id);
      // console.log(memberId, partyId)
      //todo
    }
  },
  computed: {
    party(){
      return this.$store.getters.currentParty;
    },
    isOwner(){
      if(this.$store.getters.user.uid == this.$store.getters.currentParty.ownerId){
        return true
      }
      return false
    },

    payStatus() {
      let msg ='Not found'
      this.party.members.forEach( member => {
        if(this.$store.getters.user.uid == member.id){
          msg = member.paymentStatus
          return msg
        }        
      });
      return msg
    },

  }
};
</script>

<style>
</style>