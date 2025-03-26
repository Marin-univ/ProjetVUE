<script>
export default {
    props: { questionnaire: Object }
}
</script>
<template>
    <h1>{{ questionnaire.name }}</h1>
    <button class="btn btn-danger" @click="$emit('remove', questionnaire)">Supprimer</button>
</template>