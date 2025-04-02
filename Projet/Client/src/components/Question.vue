<script>
export default {
  props: { question: Object }
}
</script>

<template>
  <div >
    <h2>{{ question.title }}</h2>
    <button  @click="$emit('removeQ', question)">Supprimer</button>
    <button  @click="$emit('editQ', question)">Modifier</button>
  </div>
</template>
