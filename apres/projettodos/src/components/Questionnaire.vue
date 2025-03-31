<script>
export default {
    props: { questionnaire: Object }
}
</script>
<template>
    <h1>{{ questionnaire.name }}</h1>
    <button class="btn btn-danger" @click="$emit('remove', questionnaire)">Supprimer</button>
    <button class="btn btn" @click="$emit('edit', questionnaire)">Modifier</button>
</template>