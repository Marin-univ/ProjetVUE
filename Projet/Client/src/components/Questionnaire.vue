<script>
export default {
  props: { questionnaire: Object }
}
</script>

<template>
  <div @click="$emit('clicked', questionnaire)" class="card p-3 my-2">
    <h1>{{ questionnaire.name }}</h1>
    <button class="btn btn-danger me-2" @click.stop="$emit('remove', questionnaire)">Supprimer</button>
    <button class="btn btn-secondary" @click.stop="$emit('edit', questionnaire)">Modifier</button>
  </div>
</template>
