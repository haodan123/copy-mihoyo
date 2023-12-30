<template>
  <div class="container">
    <slot name="header"></slot>

    <div class="home">
      <div class="swiper-container home-swiper">
        <!-- 第二层包裹 -->
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <slot></slot>
          </div>
          <div class="swiper-slide">
            <slot name="product"></slot>
          </div>
          <div class="swiper-slide">
            <slot name="about"></slot>
          </div>
          <div class="swiper-slide">
            <slot name="join"></slot>
          </div>
          <div class="swiper-slide">
            <slot name="news"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePageStore } from '@/stores/index'
import Swiper from 'swiper'

import { onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const pageStore = usePageStore()
let mySwiper = null

const init = () => {
  mySwiper = new Swiper('.home-swiper', {
    speed: 500,
    direction: 'vertical',
    mousewheel: true,
    preloadImages: true,
    updateOnImagesReady: true,
    threshold: 50,
    on: {
      init: () => {},
      transitionEnd: () => {
        // 滑动后的事件
      },
      slideChangeTransitionStart: (e) => {
        // console.log(e,'打开');
        // 滑动前修改路由和 url
        let page = mySwiper.slides[mySwiper.activeIndex].children[0].classList[0].replace('home-', '') // 当前活跃页
        // console.log(page)
        pageStore.pageIndex = mySwiper.activeIndex //更改当前页面索引
        pageStore.homePage = page //修改当前活跃页面的状态
        page = page == 'hero' ? '' : '/?page=' + page
        // console.log(page)
        router.push(page)
      }
    }
  })
}

onMounted(() => {
  init()
  routeMatch(500)
  // console.log(mySwiper.slides[mySwiper.activeIndex])
  // mySwiper.activeIndex = 1
})

/**
 *
 * @param {number} speed swiper-slide滚动的速度，默认为0
 */

const routeMatch = (speed = 0) => {
  // console.log( mySwiper.slideTo);
  const query = route.query
  // console.log(query)
  // 如果是首页
  if (query.page == undefined || query.page == '/' || query.page == '') {
    mySwiper.slideTo(0, speed) //轮播图滚动到索引0
  } else {
    // console.log(pageStore.pageIndex,);
    // 方法一
    mySwiper.slideTo(pageStore.pageIndex, speed)
    // 方法二
    // for (let i in mySwiper.slides) {
    //   let { className } = mySwiper.slides[i].children[0]
    //   if (className.indexOf(query.page) !== -1) {
    //     mySwiper.slideTo(i, speed) //轮播图滚动到对应索引
    //     break  //因为会重复执行  不break就会重复调用
    //   } else {
    //     // 如果不是任何一个已有的页面, 跳转到首页
    //     mySwiper.slideTo(0, speed) //轮播图滚动到索引0
    //   }
    // }
  }
}

watch(
  () => route.query,
  () => {
    // console.log(111)
    routeMatch(500)
  }
)
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  min-height: 720px;
  min-width: 1280px;
  overflow-y: auto;
  height: 100%;
  // height: 10.8rem;
}
.home {
  width: 100%;
  height: 100%;
  position: sticky;
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAAAFVJREFUSEtjfPn+238GJMDBxozMJZn949dfuB5GkOHiglyMJJtChIYhbPjHrz//83Oz0yZYRg3HlngYR4NlNFiIKFUgSkZTC9agGg0W7MEyWs1hCxcAF5pe5Ya82ZoAAAAASUVORK5CYII=')
    repeat center center/.23rem 0.23rem;
}

.home-swiper > .swiper-wrapper {
  flex-direction: column;
}
.home-swiper,
.swiper-slide,
.swiper-wrapper {
  height: 100%;
}

.swiper-container {
  /* margin-left: auto; */
  /* margin-right: auto; */
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  z-index: 1;
  padding: 0;
}

.swiper-slide {
  flex-shrink: 0;
  width: 100%;
  position: relative;
  transition-property:
    transform,
    -webkit-transform;
  /* transition: all; */
}

.swiper-wrapper {
  position: relative;
  width: 100%;
// height: 100%;
  z-index: 1;
  display: flex;
  transition-property:
    transform,
    -webkit-transform;
  box-sizing: content-box;
}
.swiper-slide-active {
  z-index: 99;
  // height: 746px;
}
</style>
