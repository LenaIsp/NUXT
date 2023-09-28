<template>
  <div
    class="footer-app asd-flex-column-left asd-flex-stretch asd-flex-space-between"
    itemscope
    itemtype="http://schema.org/WPFooter"
  >
    <div class="b-footer_top">
      <!--
      <Ticker ref="logoTicker" v-if="getPartners">
        <div class="b-footer_slider">
          <div
            class="b-footer_slider_slide"
            :key="index"
            v-for="(item, index) in getPartners"
          >
              <router-link
                :to="`/${$i18n.locale}/business/partner/${item.slug}`"
                class="b-footer_slider_silde_in asd-wrap-3 asd-flex-row-center"
              >
                <img v-if="isRuLang() || item.logo_en === null" :src="item.logo" class="b-footer_icon" alt="logo channel"/>
                <img v-else :src="item.logo_en" class="b-footer_icon" alt="logo channel"/>
              </router-link>
          </div>
        </div>
      </Ticker>
      -->
    </div>

    <div class="b-footer_center">
      <div
        class="b-footer_contacts_icon b-icon asd-bg-fit"
        :class="'b-footer_contacts_icon_' + $i18n.locale"
      ></div>

      <div class="mt-40 asd-flex asd-flex-space-between m-block">
        <div
          class="b-footer_contacts w-56 t-w-44 m-w-100"
          itemscope
          itemtype="http://schema.org/Organization"
        >
          <meta itemprop="name" content="Газпром-медиа холдинг" />
          <template v-if="getSiteSettings">
            <div
              itemprop="address"
              itemscope
              itemtype="https://schema.org/PostalAddress"
            >
              <meta itemprop="postalCode" content="123376" />
              <meta itemprop="addressLocality" content="Москва" />
              <meta itemprop="streetAddress" content="ул. Рочдельская д.20" />
              <div class="b-text_2">{{ getSiteSettings.address }}</div>
              <div class="b-text_2">
                <a
                  itemprop="email"
                  :href="`mailto:${getSiteSettings.email}`"
                  class="b-underline-hover b-underline--blue"
                >
                  {{ getSiteSettings.email }}
                </a>
              </div>
              <div class="b-text_2">
                <a
                  itemprop="telephone"
                  :href="`tel:${getSiteSettings.phone_one}`"
                  class="b-underline-hover b-underline--blue"
                >
                  {{ getSiteSettings.phone_one }}
                </a>
              </div>
              <div class="b-footer_socials mt-20">
                <!--<a 
                      :href="getSiteSettings.social_facebook"
                      target="_blank"
                      aria-hidden="true"
                      class="b-footer_social b-icon b-icon_20"
                    >
                      <soc_fb/>
                    </a>-->
                <a
                  :href="getSiteSettings.social_vkontakte"
                  target="_blank"
                  aria-hidden="true"
                  rel="nofollow"
                  class="b-footer_social b-icon b-icon_20"
                >
                  <soc_vk />
                </a>
                <!--<a
                      :href="getSiteSettings.social_twitter"
                      target="_blank"
                      aria-hidden="true"
                      class="b-footer_social b-icon b-icon_20"
                    >
                      <soc_tw/>
                    </a>
                    <a
                        :href="getSiteSettings.social_instagram"
                        target="_blank"
                        aria-hidden="true"
                        class="b-footer_social b-icon b-icon_20"
                    >
                      <soc_in/>
                    </a>-->
                <a
                  :href="getSiteSettings.social_telegram"
                  target="_blank"
                  aria-hidden="true"
                  rel="nofollow"
                  class="b-footer_social b-icon b-icon_20"
                >
                  <soc_tg />
                </a>
                <a
                  :href="getSiteSettings.social_odnoklassniki"
                  target="_blank"
                  aria-hidden="true"
                  rel="nofollow"
                  class="b-footer_social b-icon b-icon_20"
                >
                  <soc_ok />
                </a>
              </div>
            </div>
          </template>
        </div>
        <div
          class="m-mt-40 b-footer_right w-40 t-w-46 m-w-100"
          itemscope
          itemtype="http://schema.org/SiteNavigationElement"
        >
          <div class="asd-flex asd-flex-space-between t-block">
            <div
              v-for="(list, listIndex) in menu"
              :key="listIndex"
              class="b-footer_links pr-10 t-w-100"
            >
              <div
                v-for="(item, index) in list"
                :key="index"
                class="b-footer_link"
              >
                <router-link
                  itemprop="url"
                  class="b-text_2 b-underline-hover b-underline--blue"
                  exact-active-class="b-underline"
                  :to="'/' + $i18n.locale + item.to"
                >
                  {{ $t(item.name) }}
                </router-link>
              </div>
            </div>
          </div>
          <div class="b-footer_link"></div>
        </div>
      </div>
    </div>

    <div
      class="mt-100 t-mt-90 m-mt-80 b-footer_bottom asd-flex-row-right m-block"
    >
      <div class="b-footer_right t-w-100 m-w-100">
        <meta itemprop="copyrightHolder" content="Газпром-медиа холдинг" />
        <div class="b-footer_copyright b-text--sm">{{ text["copy"] }}</div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import menu from "@/config/menu";

import Ticker from "@/components/common/Ticker";

import soc_fb from "@/assets/svg/socials/fb.svg?inline";
import soc_vk from "@/assets/svg/socials/vk.svg?inline";
import soc_tw from "@/assets/svg/socials/tw.svg?inline";
import soc_in from "@/assets/svg/socials/in.svg?inline";
import soc_tg from "@/assets/svg/socials/tg.svg?inline";
import soc_ok from "@/assets/svg/socials/ok.svg?inline";

export default {
  components: {
    Ticker,
    soc_fb,
    soc_vk,
    soc_tw,
    soc_in,
    soc_tg,
    soc_ok,
  },

  async fetch() {
    await this.$store.dispatch("fetchPartners");
  },

  data() {
    return {
      text: this.$i18n.messages[this.$i18n.locale]["assets"],
    };
  },

  mounted() {
    document
      .querySelector(".b-footer_contacts_icon")
      .classList.add("b-footer_contacts_icon_" + this.$i18n.locale);
  },

  menu,

  methods: {
    isRuLang() {
      return this.$i18n.locale === "ru";
    },
  },

  computed: {
    ...mapGetters({
      getPartners: "getPartners",
      getSiteSettings: "getSiteSettings",
    }),

    menu() {
      const menu = this.$options.menu;
      const findInMenu = (menuName, routeName) =>
        menu[menuName].find((el) => el.routeName === routeName);
      return [
        [
          findInMenu("pagesAll", "Business"),
          findInMenu("pagesAll", "Media"),
          findInMenu("pagesAll", "About"),
        ],
        [
          findInMenu("pagesAll", "Contacts"),
          findInMenu("pagesAbout", "AboutLeadership"),
          findInMenu("pagesAbout", "AboutStrategy"),
          findInMenu("mapPage", "sitemap"),
        ],
        [
          findInMenu("pagesAbout", "AboutHistory"),
          findInMenu("pagesAbout", "AboutResponsibility"),
          findInMenu("pagesAbout", "AboutCareer"),
        ],
      ];
    },
  },
};
</script>