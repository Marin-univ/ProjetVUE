<script>
import Questionnaire from './components/Questionnaire.vue';

let data = {
  questionnaires: []
};

export default {
  name: "QuestionnaireApp",
  components: { Questionnaire },

  data() {
    return data;
  },

  mounted() {
    fetch("http://127.0.0.1:5000/quizz/api/v1/questionnaires")
      .then(response => response.json())

      .then(json => {
        this.questionnaires = json;
      });
  },

  methods: {
    addItem() {
      let name = this.newItem?.trim();
      if (name) {
        fetch("http://127.0.0.1:5000/quizz/api/v1/questionnaires", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name })
        })
          .then(response => {
            return response.json();
          })
          .then(newQuestionnaire => {
            this.questionnaires.push(newQuestionnaire);
            this.newItem = '';
          })
      }
    },



    removeItem(questionnaire) {
      fetch(`http://127.0.0.1:5000/quizz/api/v1/questionnaires/${questionnaire.id}`, {
        method: "DELETE"
      })
        .then(response => {
          this.questionnaires = this.questionnaires.filter(q => q.id !== questionnaire.id);
        })
    },

    editItem(questionnaire) {
      const newName = prompt("Modifier le nom du questionnaire :", questionnaire.name);
      if (newName && newName.trim() !== "") {
        fetch(`http://127.0.0.1:5000/quizz/api/v1/questionnaires/${questionnaire.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name: newName.trim() })
        })
          .then(response => response.json())
          .then(updated => {
            const index = this.questionnaires.findIndex(q => q.id === questionnaire.id);
            if (index !== -1) {
              this.questionnaires[index] = updated;
            }
          })
      }
    }


  }
}
</script>
<template>

  <Questionnaire v-for="questionnaire of questionnaires" :questionnaire="questionnaire" @remove="removeItem"
    @edit="editItem">
  </Questionnaire>

  <div class="input-group">
    <input v-model="newItem" @keyup.enter="addItem" placeholder="Ajouter un questionnaire à la liste" type="text"
      class="form-control">
    <span class="input-group-btn">
      <button @click="addItem" class="btn btn-default" type="button">
        Ajouter
      </button>
    </span>
  </div>

</template>