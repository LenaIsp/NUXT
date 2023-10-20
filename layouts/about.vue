<script setup>
  import menu from "@/config/menu";
  const { locale } = useI18n()
</script>

<template>
  <CommonResize class="app-layout b-relative">
    <div class="app-layout-in b-relative">
      <PartsHeader />
      <div class="ab-wrap">
        <!--меню About-->
        <div class="ab-head asd-pos-top-center">
          <div class="ab-head_in asd-wrap-3 asd-flex-row-right">
            <div
              v-for="(item, index) in menu.pagesAbout"
              :key="index"
              style="display: flex;"
            >
              <NuxtLink
                :to="localePath(item.to)"
                class="ml-20 ab-head_link b-text b-hover b-underline-hover b-underline--blue"
                active-class="b-underline b-underline--white"
              >
                {{ $t(item.name) }}
              </NuxtLink>
            </div>
          </div>
        </div>
        <!--меню About-->
        <slot />
      </div>  
      
      <!--<PartsFooter/>-->
    </div>
  </CommonResize>
</template>