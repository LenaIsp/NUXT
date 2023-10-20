<template>
  <div :style="fSize && { 'font-size': fSize + 'px'}" :class="bodyClass()" ref="el">
    <slot></slot>
    <div>{{ test }}</div>
  </div>
</template>

<script setup>
  const { $helpers } = useNuxtApp()

  let test = ref(undefined);

  let defaultWidth = 1440,
      defaultHeight = 750,
      defaultFont = 16,
      maxFont = 22,
      minWidth = 1050,
      minHeight = 500;
  
  const { height } = useWindowSize()
  
  const el = ref(null)
  const vw = ref(0)
  const vh = ref(height)

  
  

  useResizeObserver(el, (entries) => {
    const entry = entries[0]
    const { width } = entry.contentRect
    vw.value = width
  })

  /*methods*/
  const bodyClass = () => {
    return {
      "html-desktop": !(Helpers.checkForPhoneMedia() || Helpers.checkForTabletMedia()),
      "html-mobile": Helpers.checkForPhoneMedia() || Helpers.checkForTabletMedia(),
      "html-phone":  Helpers.checkForPhoneMedia(),
      "html-tablet": Helpers.checkForTabletMedia(),
      "html-mac": Helpers.isMac(),
      "html-ie": Helpers.isIE(),

      /*"html-landscape": this.isLandscape,
      "html-portrait": !this.isLandscape,
      "html-preloading": this.showPreloader,*/
    };
  }

  /*computed*/
  const fSize = computed(() => {
    if ( Helpers.checkForPhoneMedia()) {
      /*для изменения размера*/
      const x = vw.value
      return 16;
    } else if ( Helpers.checkForTabletMedia() ) {
      /*для изменения размера*/
      const x = vw.value
      return 16;
    } else {
      return Math.min(
        maxFont,
        defaultFont *
          Math.min(
            Math.max(minWidth, vw.value) / defaultWidth,
            Math.max(minHeight, vh.value) / defaultHeight
          )
      );
    }
  })
  
  const isMobile = computed(() => {
    return Helpers.checkForMobile();
  })
  
  onMounted(() => {
    const body = el.value
    body.className = "app-layout b-relative";
    Object.entries(bodyClass()).map((item) => {
      item[1] === true && body.classList.add(item[0])
    })

    window.addEventListener("resize", bodyClass);
    test.value = $helpers().checkForMobile()
    console.log(test.value)
  })


  /*Хуки жизненого цикла*/

  /*
  onBeforeUpdate(() => {
    console.log('onBeforeUpdate')
  })

  onUpdated(() => {
    console.log('onUpdated')
  })

  onBeforeMount(() => {
    console.log('onBeforeMount')
  })
  
  onMounted(() => {
    console.log('onMounted')
  })

  onBeforeUnmount(() => {
    console.log('onUpdated')
  })
  
  onUnmounted(() => {
    console.log('onUnmounted')
  })
  onErrorCaptured(() => {
    console.log('onUpdated')
  })

  onRenderTracked(() => {
    console.log('onUpdated')
  })

  onRenderTriggered(() => {
    console.log('onUpdated')
  })

  onActivated(() => {
    console.log('onUpdated')
  })

  onDeactivated(() => {
    console.log('onUpdated')
  })
  */

</script>