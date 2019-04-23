<template lang="html">
<v-container fluid fill-height pa-0>
  <a-scene embedded id="vr" cursor="rayOrigin:mouse">
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
      cursor="rayOrigin: mouse"
      width="10"
      v-bind:value="point"
      raycaster="objects: .collidable; far: 8"
      position="1 6 -10"
      color="rgb(204, 63, 26)"
      scale="1 3 1"
    >
    </a-text>

    <a-text
      cursor="rayOrigin: mouse"
      align="center"
      :value="`${currentQuestion} and => current answer ${correct_answer}`"
      raycaster="objects: .collidable; far: 8"
      geometry="primitive:plane;width: 10;"
      animation="property: position; from: 0 2.8 -9; to: 0 3 -9; loop: true; dir: alternate; easing:linear;dur:1000"
    >
    </a-text>

    <a-text
      @click="yes"
      cursor="rayOrigin: mouse;maxDistance: 30"
      raycaster="objects: .collidable; far: 8"
      width="10"
      align="left"
      value="True"
      geometry="primitive:plane"
      animation="property: position; from: -6 0.7 -5; to: -6 0.9 -5; loop: true; dir: alternate; easing:linear;dur:1000"
    >
    </a-text>
    <a-text
      @click="no"
      width="10"
      align="right"
      raycaster="objects: .collidable; far: 8"
      position="6 0.7 -5"
      cursor="rayOrigin: mouse;maxDistance: 30"
      value="False"
      geometry="primitive:plane"
      animation="property: position; from: 6 0.7 -5; to: 6 0.9 -5; loop: true; dir: alternate; easing:linear;dur:1000"
    >
    </a-text>
  </a-scene>
</v-container>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "roomone",
  data() {
    return {
      point: 1,
      test: true,
      color: "",
      question: null,
      correct_answer: null,
      incorrect_answer: null,
      index: 0,
      currentQuestion: "",
      questionIndex: 0,
      currentRoom: []
    };
  },
  methods: {
    yes() {
      if (this.correct_answer === "True") {
        this.point++;
      } else {
        this.point;
      }
      this.index++;
      this.currentQuestion = this.question[this.index].question;
      this.correct_answer = this.question[this.index].correct_answer;
    },
    no() {
      if (this.correct_answer === "False") {
        this.point++;
      } else {
        this.point;
      }
      this.index++;
      this.currentQuestion = this.question[this.index].question;
      this.correct_answer = this.question[this.index].correct_answer;
    },
    async getQuestion() {
      try {
        const { data } = await axios.get(
          "https://opentdb.com/api.php?amount=50&type=boolean&difficulty=hard"
        );
        this.question = data.results;
        this.currentQuestion = this.question[this.index].question;
        this.correct_answer = this.question[this.index].correct_answer;
        this.incorrect_answer = this.question[this.index].incorrect_answers[0];
        console.log(this.question, "iniiiii question");
      } catch (e) {
        console.log(e.response, "ini error");
      }
    },
  },
  created() {
    this.getQuestion();
    //this.currentQuestion = this.question[0].question;
    this.currentQuestion = "after created";
    this.$store.dispatch("getOneRoom", this.$route.params.id);
    console.log(`is valid? ${this.$store.state.validPlayer}`);
    this.$store.commit("setKeyForm", true);
  },
  async mounted() {
    await this.getQuestion();

    this.currentQuestion = this.question[this.index].question;
    this.correct_answer = this.question[this.index].correct_answer;
    // this.currentQuestion = 'after created';
  },
  computed: {
    computed: mapState(["position"])
  }
};
</script>

<style lang="css" scoped>
.vr {
  height: 740px;
}

.keyForm {
  position: absolute;
  top: 100px;
  z-index: 100;
}
</style>
