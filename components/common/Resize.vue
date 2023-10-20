<script setup>
  const { $helpers } = useNuxtApp()
  // находит корневой элемент
  const resizeBody = ref(null)

  // дефолтные значения для рассчета размера шрифта
  let defaultWidth = 1440,
      defaultHeight = 750,
      defaultFont = 16,
      maxFont = 22,
      minWidth = 1050,
      minHeight = 500;

  /* data */
  //начальные переменные для класса и шрифта
  let bodyClass = ref({});
  let fSize = ref(16);
  //начальные переменные для высоты и ширины
  const vw = ref(0)
  const vh = ref(0)
  /* end data */

  //отслеживает ширину экрана
  useResizeObserver(resizeBody, (entries) => {
    const entry = entries[0]
    const { width, height} = entry.contentRect
    vw.value = width
    vh.value = height
    bodyClass.value = getBodyClass()
    fSize.value = getFontSize()
  })

  /*methods*/
  const getBodyClass = () => {
    return {
      "html-desktop": !($helpers().checkForPhoneMedia() || $helpers().checkForTabletMedia()),
      "html-mobile": $helpers().checkForPhoneMedia() || $helpers().checkForTabletMedia(),
      "html-phone":  $helpers().checkForPhoneMedia(),
      "html-tablet": $helpers().checkForTabletMedia(),
      "html-mac": $helpers().isMac(),
      "html-ie": $helpers().isIE(),

      /*"html-landscape": this.isLandscape,
      "html-portrait": !this.isLandscape,
      "html-preloading": this.showPreloader,*/
    };
  }
  
  const getFontSize = () => {
    if ( $helpers().checkForPhoneMedia()) {
      return 16;
    } else if ( $helpers().checkForTabletMedia() ) {
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
  }
  /*end methods*/





  /*computed пример*/
  /*
  const getBodyClass = computed(() => {
    return fSize.value;
  })*/
  /*end computed*/

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

<template>
  <div 
    :style="fSize && {'font-size': fSize + 'px'}" 
    :class="bodyClass"
    ref="resizeBody"
  >
    <slot></slot>
  </div>
</template>