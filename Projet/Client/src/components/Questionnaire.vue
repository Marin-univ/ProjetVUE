<script>
export default {
  props: { questionnaire: Object }
}
</script>

<template>
  <div @click="$emit('clicked', questionnaire)" >
    <h1>{{ questionnaire.name }}</h1>
    <button  @click.stop="$emit('remove', questionnaire)">Supprimer</button>
    <button  @click.stop="$emit('edit', questionnaire)">Modifier</button>
  </div>
</template>
