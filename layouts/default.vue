<template>
  <div>
    <NuxtLink :to="localePath('/')">home</NuxtLink> |
    <NuxtLink :to="localePath('/test')">Test</NuxtLink> |
    <NuxtLink :to="localePath('/shlomi')">Shlomi</NuxtLink> |
    <NuxtLink :to="localePath('/shlomi/one')">Shlomi one</NuxtLink> |
    <NuxtLink :to="localePath('/shlomi/two')">Shlomi two</NuxtLink> |

    <NuxtPage />
  </div>
</template>

<script setup>
  const localePath = useLocalePath();
</script>