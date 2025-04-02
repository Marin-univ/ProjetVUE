<script>
export default {
  props: ['newItem']
}
</script>

<template>
  <div >
    <input :value="newItem" @input="$emit('update:newItem', $event.target.value)" @keyup.enter="$emit('submit')" placeholder="Ajouter un questionnaire" type="text" />
    <button @click="$emit('submit')">Ajouter</button>
  </div>
</template>
