<script>
import Question from './components/Question.vue';
import Questionnaire from './components/Questionnaire.vue';

export default {
  name: "QuestionnaireApp",
  components: { Questionnaire, Question },

  data() {
    return {
      questionnaires: [],
      selectedQuestionnaire: null,
      questions: [],
      newItem: ""
    };
  },

  mounted() {
    fetch("http://127.0.0.1:5000/quizz/api/v1/questionnaires")
      .then(response => response.json())
      .then(json => {
        this.questionnaires = json;
      });
  },

  methods: {
    loadQuestions(questionnaire) {
      this.selectedQuestionnaire = questionnaire;

      fetch(`http://127.0.0.1:5000/quizz/api/v1/questionnaires/${questionnaire.id}/questions`)
        .then(response => response.json())
        .then(json => {
          this.questions = json;
        });
    },

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
          .then(response => response.json())
          .then(newQuestionnaire => {
            this.questionnaires.push(newQuestionnaire);
            this.newItem = '';
          });
      }
    },

    removeItem(questionnaire) {
      fetch(`http://127.0.0.1:5000/quizz/api/v1/questionnaires/${questionnaire.id}`, {
        method: "DELETE"
      })
        .then(() => {
          this.questionnaires = this.questionnaires.filter(q => q.id !== questionnaire.id);
          if (this.selectedQuestionnaire?.id === questionnaire.id) {
            this.selectedQuestionnaire = null;
            this.questions = [];
          }
        });
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
            if (this.selectedQuestionnaire?.id === updated.id) {
              this.selectedQuestionnaire = updated;
            }
          });
      }
    },

    addQuestion() {
      const title = prompt("Titre de la nouvelle question :");
      if (title && this.selectedQuestionnaire) {
        fetch(`http://127.0.0.1:5000/quizz/api/v1/questionnaires/${this.selectedQuestionnaire.id}/questions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ title })
        })
          .then(response => {
            if (response.status === 204) return {};
            return response.json();
          })
          .then(newQ => {
            if (newQ?.id) this.questions.push(newQ);
          })
          .catch(console.error);
      }
    },


    removeQuestion(question) {
      fetch(`http://127.0.0.1:5000/quizz/api/v1/questionnaires/${question.questionnaire_id}/questions/${question.id}`, {
        method: "DELETE"
      })
        .then(response => {
          if (!response.ok) throw new Error("Échec de la suppression");
        })
        .then(() => {
          this.questions = this.questions.filter(q => q.id !== question.id);
        })
        .catch(console.error);
    },


    editQuestion(question) {
      const newTitle = prompt("Modifier le titre de la question :", question.title);
      if (newTitle && newTitle.trim() !== "") {
        fetch(`http://127.0.0.1:5000/quizz/api/v1/questionnaires/${question.questionnaire_id}/questions/${question.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ title: newTitle.trim() })
        })
          .then(response => {
            if (response.status === 204) return {};
            return response.json();
          })
          .then(updated => {
            const index = this.questions.findIndex(q => q.id === question.id);
            if (index !== -1) this.questions[index] = updated;
          })
          .catch(console.error);
      }
    }

  }
}
</script>

<template>
  <div class="container my-4">
    <h1 class="mb-4">Liste des Questionnaires</h1>

    <Questionnaire v-for="q in questionnaires" :key="q.id" :questionnaire="q" @clicked="loadQuestions(q)"
      @remove="removeItem" @edit="editItem" />

    <div class="input-group my-4">
      <input v-model="newItem" @keyup.enter="addItem" placeholder="Ajouter un questionnaire" type="text" class="form-control">
      <button @click="addItem" class="btn btn-success">Ajouter</button>
    </div>

    <div v-if="selectedQuestionnaire">
      <h2 class="mt-5">Questions pour : {{ selectedQuestionnaire.name }}</h2>
      <button class="btn btn-primary my-3" @click="addQuestion">Ajouter une question</button>

      <Question v-for="question in questions" :key="question.id" :question="question" @removeQ="removeQuestion" @editQ="editQuestion" />
    </div>
  </div>
</template>
