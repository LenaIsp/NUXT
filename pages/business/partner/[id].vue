<script setup>
  const { id } = useRoute().params
</script>

<template>
  <div class="strategy-page">
    <h2>Газпром-медиа - Проект</h2>
    <p>ID - {{ id }}</p>
  </div>
</template>