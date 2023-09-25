<template>
  <div>
    <h2>Газпром-медиа - Канал</h2>
    <p>ID - {{ id }}</p>
  </div>
</template>
  
<script setup>
  const { id } = useRoute().params
</script>