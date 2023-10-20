<template>
  <div 
    :style="{'font-size': fSize?.value + 'px'}" 
    :class="classes?.value"
    ref="resizeBody"
  >
    <slot></slot>
    <div>{{ classes }}</div>
  </div>
</template>

<script setup>
  const { height } = useWindowSize()
  const { $helpers } = useNuxtApp()

  let defaultWidth = 1440,
      defaultHeight = 750,
      defaultFont = 16,
      maxFont = 22,
      minWidth = 1050,
      minHeight = 500;

  // находит корневой элемент
  const resizeBody = ref(null)

  //начальные переменные для класса и шрифта
  let classes = ref('');
  let changeClasses = ref('');
  let fSize = ref(16);
  let changefSize = ref(16);

  //начальные переменные для ширины и высоты экрана
  const vw = ref(0)
  const vh = ref(height)

  //отслеживает ширину экрана
  useResizeObserver(resizeBody, (entries) => {
    const entry = entries[0]
    const { width } = entry.contentRect
    vw.value = width
    changeClasses.value = bodyClass()
    changefSize.value = fontSize()
  })


  /*methods*/
  const bodyClass = () => {
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
  
  const fontSize = () => {
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


  /*computed*/
  const getBodyClass = computed(() => {  
    return changeClasses.value;
  })
  const getfontSize = computed(() => {
    return changefSize.value;
  })
  
  const isMobile = computed(() => {
    return $helpers().checkForMobile();
  })
  


  onMounted(() => {
    classes.value = getBodyClass
    fSize.value = getfontSize
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