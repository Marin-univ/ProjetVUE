<script>
export default {
  props: { question: Object }
}
</script>

<template>
  <button class="btn btn-primary my-3" @click="$emit('addQ',question)">Ajouter une question</button>
  <div class="card my-2 p-3">
    <h2>{{ question.title }}</h2>
    <button class="btn btn-danger me-2" @click="$emit('removeQ', question)">Supprimer</button>
    <button class="btn btn-secondary" @click="$emit('editQ', question)">Modifier</button>
  </div>
</template>
