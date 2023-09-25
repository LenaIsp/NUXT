<template>
  <div>
    <p>{{$t('header.biz')}}</p>
    <p>Какой язык выбран - {{locale}}</p>
  </div>
</template>

<script setup>
  const { locale } = useI18n();
</script>