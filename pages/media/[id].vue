<template>
  <div>
    <h2>Газпром-медиа - Новость</h2>
    <p>ID - {{ id }}</p>
  </div>
</template>

<script setup>
  const { id } = useRoute().params
  useHead({
    title: 'Новость'
  })
</script>