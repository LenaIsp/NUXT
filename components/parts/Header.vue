<template>
  <div class="header-app">
    <div class="b-header_in asd-flex-row-left asd-flex-space-between">
      <!--Логотип-->
      <div class="b-header_left">
        <NuxtLink
          class="b-header_logo asd-bg-fit"
          :class="'b-header_logo_' + $i18n.locale"
          :to="localePath('/' + $i18n.locale)"
        ></NuxtLink>
      </div>

      <!--Меню-->
      <div class="b-header_right asd-flex-row-right" itemscope itemtype="http://schema.org/SiteNavigationElement">
        <div class="b-header_links asd-flex-row-right hide-mobile">
          <NuxtLink
            v-for="(item, index) in menu.pagesAll"
            :key="index"
            itemprop="url"
            class="ml-20 b-header_link b-text b-hover b-underline-hover b-underline--blue"
            active-class="b-underline b-underline--white"
           
            :to= "localePath('/' +  $i18n.locale + item.to + '/')"
          >
            {{ $t(item.name) }}
          </NuxtLink>
          <div class="ml-20 b-header_link b-text b-hover b-underline-hover b-underline--blue">
            {{ $t('header.lang') }}
          </div>
        </div>

        <!--Иконка поиска-->
        <!--
        <div
          class="t-ml-0 m-ml-0 ml-68 b-header_search b-icon_30 b-hover"
          @click="CHANGE_SEARCH_OPENED(true)"
        >
          <searchIco />
        </div>

        <div
          class="ml-16 b-header_burger b-icon_30 b-hover hide-desktop"
          @click="CHANGE_MENU_OPENED(true)"
        >
          <burgerIco />
        </div>-->

      </div>
    </div>
  </div>
</template>

<script setup>
  import menu from "@/config/menu";
  
  menu
</script>