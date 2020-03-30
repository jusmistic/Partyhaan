<template>
  <v-container>
    <v-row dense>
      <v-col cols="12">
        <v-card class="cardItem">
          <v-card-title>PartyName</v-card-title>
          <v-card-text>
            <p>
              สถานะของคุณ: จ่ายแล้ว
              <br />เดือน: 0xxxxxxx
              <br />หมายเลขพร้อมเพย์: 0xxxxxxx
              <br />เงินที่ต้องเก็บต่อเดือน: 50 
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <br>
    <h3>สมาชิกในปาร์ตี้</h3>
    <v-row dense>
      <v-col cols="12">
        <v-card class="cardItem" to>
          <v-row justify="center">
            <v-spacer></v-spacer>
            <v-col cols="1">👑</v-col>
            <v-col cols="6">
              <h4>หัวตี้</h4>
            </v-col>
            <v-col cols="4">✔</v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12">
        <v-card class="cardItem" to>
          <v-row justify="center">
            <v-spacer></v-spacer>
            <v-col cols="1"></v-col>
            <v-col cols="6">
              <h4>ลูกตี้</h4>
            </v-col>
            <v-col cols="4">✔</v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
</style>