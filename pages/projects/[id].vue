<template>
    <div>
      <h2>Газпром-медиа - Проекты</h2>
      <p>ID - {{ id }}</p>
    </div>
  </template>
  
  <script setup>
    const { id } = useRoute().params
  </script>