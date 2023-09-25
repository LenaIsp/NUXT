<template>
  <div class="header-app">
    <div class="b-header_in asd-flex-row-left asd-flex-space-between">
      <!--Логотип слева-->
      <div class="b-header_left">
      </div>

      <!--Меню справа-->
      <div class="b-header_right asd-flex-row-right" itemscope itemtype="http://schema.org/SiteNavigationElement">
        <div class="b-header_links asd-flex-row-right hide-mobile">

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

  const localePath = useLocalePath();
  const { locale } = useI18n();

</script>