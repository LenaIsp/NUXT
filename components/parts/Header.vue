<template>
  <div class="header-app">
    <div class="b-header_in asd-flex-row-left asd-flex-space-between">
      <!--Логотип-->
      <div class="b-header_left">
        <NuxtLink
          class="b-header_logo asd-bg-fit"
          :class="'b-header_logo_' + locale"
          :to="localePath('/')"
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
            :to= "localePath(item.to)"
          >
            {{ $t(item.name) }}
          </NuxtLink>
          <div class="ml-20 b-header_link b-text b-hover b-underline-hover b-underline--blue" @click="changeLang">
            {{ $t('header.lang') }}
          </div>
        </div>
        <!--Иконка поиска-->
        <div
          class="t-ml-0 m-ml-0 ml-68 b-header_search b-icon_30 b-hover"
          @click="CHANGE_SEARCH_OPENED(true)"
        >
          <SearchIco />
        </div>
        <!--Иконка бургер-->
        <div
          class="ml-16 b-header_burger b-icon_30 b-hover hide-desktop"
          @click="CHANGE_MENU_OPENED(true)"
        >
          <BurgerIco />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import menu from "@/config/menu";
  import SearchIco from "~/assets/svg/search.svg";
  import BurgerIco from "~/assets/svg/burger.svg";

  const { locale } = useI18n()
  /*methods*/
  const changeLang = () => {
    if (locale.value == 'ru') {
      window.location.assign('/en' + location.pathname.slice(3) + location.search);
    } else {
      window.location.assign('/ru' + location.pathname.slice(3) + location.search);
    }
  }
</script>