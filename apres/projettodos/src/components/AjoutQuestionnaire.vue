<script>
export default {
  props: ['newItem']
}
</script>

<template>
  <div class="input-group my-4">
    <input :value="newItem" @input="$emit('update:newItem', $event.target.value)" @keyup.enter="$emit('submit')" placeholder="Ajouter un questionnaire" type="text" class="form-control"/>
    <button @click="$emit('submit')" class="btn btn-success">Ajouter</button>
  </div>
</template>
