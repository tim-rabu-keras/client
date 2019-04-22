<template>

</template>

<style scoped>

</style>

<script>
import db from "@/api/firebase.vue";
import axios from "axios";
export default {
  name: "allTasks",
  components: {
    card
  },
  data() {
    return {
      allQuestion: [],
      oneQuestion: ""
    };
  },
  methods: {
    getAllQuiz() {
      this.allQuestion = [];
      axios
        .get(
          "https://opentdb.com/api.php?amount=50&type=boolean&difficulty=hard"
        )
        .then(({ data }) => {
          this.allQuestion = data.result;
        })
        .catch(err => {
          console.log(err);
        });
    },
    randomQuestion() {
      this.oneQuestion = "";
      let index = Math.floor(Math.random() * 51);
      this.oneQuestion = this.allQuestion[index];
    }
  }
};
</script>
