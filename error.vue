<template>
  <button @click="handleError">Вернуться на главную</button>
</template>

<script setup>
  const handleError = () => clearError({ redirect: '/' })
</script>
