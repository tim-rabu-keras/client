<template lang="html">
<v-container fluid fill-height pa-0>
  <a-scene embedded id="vr">
    <a-assets>
      <!-- sky -->
      <img id="asky" src="../../assets/clouds.jpg" alt="" />
      <img id="asky2" src="../../assets/heic0714g.jpg" alt="" />
      <!-- floor -->
      <img id="floor" src="../../assets/crop.jpeg" alt="" />

      <!-- modelling -->
    </a-assets>
    <a-sky src="#asky" rotation="0 65 0" repeat="#asky" v-if="test"></a-sky>
    <a-sky src="#asky2" rotation="0 65 0" repeat="#asky" v-else></a-sky>
    <a-plane
      material="color: #FFFFFF; src:#floor; repeat: 5000 5000"
      rotation="-90 0 0"
      scale="10000 10000 1"
    >
    </a-plane>
    <a-text
      v-if="$store.state.validPlayer"
      scale="1.5 2 3"
      v-for="(player, i) in players"
      color="#EEEE00"
      v-bind:position="positions[i].name"
      width="10"
      align="right"
      :value="player.name"
    ></a-text>
    <a-text
      v-if="$store.state.validPlayer"
      v-for="(player, i) in players"
      :color="color"
      v-bind:position="positions[i].score"
      width="10"
      align="right"
      :value="player.score"
    ></a-text>

    <a-text
      v-if="$store.state.validPlayer"
      cursor="rayOrigin: mouse"
      width="10"
      v-bind:value="currentQuestion"
      geometry="primitive:plane"
      animation="property: position; from: -6 2 -5; to: -6 2.3 -5; loop: true; dir: alternate; easing:linear;dur:1000"
    >
    </a-text>

    <a-text
      v-if="$store.state.validPlayer"
      @click="yes"
      cursor="rayOrigin: mouse"
      width="6.8"
      value="true"
      geometry="primitive:plane"
      animation="property: position; from: -2 0.44 -3; to: -2 0.58 -3; loop: true; dir: alternate; easing:linear;dur:1200"
    >
    </a-text>
    <a-text
      v-if="$store.state.validPlayer"
      @click="no"
      cursor="rayOrigin: mouse"
      width="6.8"
      value="false"
      geometry="primitive:plane"
      animation="property: position; from: 1 0.44 -3; to: 1 0.58 -3; loop: true; dir: alternate; easing:linear;dur:1200"
    >
    </a-text>
  </a-scene>
</v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'roomone',
  data() {
    return {
      point: 1,
      test: true,
      color: '',
      pertanyaan: 'hello',
      pertanyaan2: 'helllo2',
      positions: [
        {
          name: '2 7.5 -13',
          score: '3 7.5 -13',
        },
        {
          name: '2 6.5 -13',
          score: '3 6.5 -13',
        },
        {
          name: '2 8.5 -13',
          score: '3 8.5 -13',
        },
      ],
      players: [
        {
          name: 'budi',
          score: 0,
          status: 'idle',
        },
        {
          name: 'wawan',
          score: 4,
          status: 'idle',
        },
        {
          name: 'randi',
          score: 10,
          status: 'idle',
        },
      ],
      question: null,
      currentQuestion: '',
      questionIndex: 0,
    };
  },
  methods: {
    yes() {
      this.color = 'blue';
      this.point++;
      this.questionIndex++;
      this.currentQuestion = this.question[this.questionIndex].question;
      this.test = false;
    },
    no() {
      this.color = 'magenta';
      this.point++;
      this.questionIndex++;
      this.currentQuestion = this.question[this.questionIndex].question;
      this.test = true;
    },
    async getQuestion() {
      try {
        const { data } = await axios.get(
          'https://opentdb.com/api.php?amount=50&type=boolean&difficulty=hard',
        );
        this.question = data.results;
        this.currentQuestion = data.results[0].question;
        console.log(this.question, 'iniiiii question');
      } catch (e) {
        console.log(e.response, 'ini error');
      }
    },
  },
  created() {
    this.getQuestion();
    //this.currentQuestion = this.question[0].question;
    this.currentQuestion = 'after created';
    this.$store.dispatch('getOneRoom', this.$route.params.id)
    console.log(`is valid? ${this.$store.state.validPlayer}`);
    this.$store.commit('setKeyForm', true);
  },
};
</script>

<style lang="css" scoped>
.vr {
  height: 740px
}

.keyForm {
  position: absolute;
  top: 100px;
  z-index: 100;
}

</style>
