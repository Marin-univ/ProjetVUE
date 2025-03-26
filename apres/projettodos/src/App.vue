<script>
import Questionnaire from './components/Questionnaire.vue';

let data = {
  questionnaires: [
    { id: 0, name: "Je suis un questionnaire" },
    { id: 1, name: "Je suis pas un questionnaire" }
  ],
};

export default {
  components: { Questionnaire },

  data() {
    return data;
  },

  methods: {

    addItem: function () {
      let name = this.newItem.trim();
      if (name) {
        this.questionnaires.push({
          name: name
        });
        this.newItem = '';
      }
    },


    removeItem(questionnaire) {
      this.questionnaires = this.questionnaires.filter(t => t !== questionnaire)
    }
  }
}
</script>
<template>

  <Questionnaire v-for="questionnaire of questionnaires" :questionnaire="questionnaire" @remove="removeItem">
  </Questionnaire>

  <div class="input-group">
    <input v-model="newItem" @keyup.enter="addItem" placeholder="Ajouter un questionnaire à la liste" type="text" class="form-control">
    <span class="input-group-btn">
      <button @click="addItem" class="btn btn-default" type="button">
        Ajouter
      </button>
    </span>
  </div>

</template>