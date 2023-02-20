<template>
  <div v-for="article in info.results" v-bind:key="article.url" id="articles">
    <div class="grid" :style="grid_style(article)">
      <div class="image-container">
        <img :src="image_if_exists(article)" alt="" class="image">
      </div>
      <div>

      <div>
      <span
          v-if="article.category !== null"
          class="category"
      >
        {{ article.category.title }}
      </span>

        <span
            v-for="tag in article.tags"
            v-bind:key="tag"
            class="tag"
        >
                {{ tag }}
            </span>
      </div>
      <router-link
          :to="{ name: 'ArticleDetail', params: { id: article.id }}"
          class="article-title"
      >
        {{ article.title }}
      </router-link>
      <div>{{ formatted_time(article.created) }}</div>
    </div>
      </div>
  </div>

  <div id="paginator">
        <span v-if="is_page_exists('previous')">
            <router-link :to="get_path('previous')">
                上一页
            </router-link>
        </span>
    <span class="current-page">
            {{ get_page_param('current') }}
        </span>
    <span v-if="is_page_exists('next')">
            <router-link :to="get_path('next')">
                下一页
            </router-link>
        </span>
  </div>

</template>

<script>
import axios from 'axios';
import {ref} from "vue";
import {useRoute} from "vue-router";
import getArticleData from "@/composables/getArticleData";
import pagination from "@/composables/pagination";
import articleGrid from "@/composables/articleGrid";
import formattedshijian from "@/composables/formattedTime";

axios.defaults.baseURL = 'http://127.0.0.1:8000/'

export default {
  name: 'ArticleList',

  setup(){
    const info = ref('');
    // 创建路由
    const route = useRoute();
    getArticleData(info, route);
    const {
      is_page_exists,
      get_page_param,
      get_path
    } = pagination(info, route);
    // 调整页面外观
    const {
      image_if_exists,
      grid_style
    } = articleGrid();
    const {formatted_time} = formattedshijian();


    return {
      info,
      is_page_exists,
      get_page_param,
      get_path,
      image_if_exists,
      grid_style,
      formatted_time,
    }
  },
  methods: {



  },
}

</script>

<!-- "scoped" 使样式仅在当前组件生效 -->
<style scoped>
#articles {
  padding: 10px;
}

.article-title {
  font-size: large;
  font-weight: bolder;
  color: black;
  text-decoration: none;
  padding: 5px 0 5px 0;
}

.tag {
  padding: 2px 5px 2px 5px;
  margin: 5px 5px 5px 0;
  font-family: Georgia, Arial, sans-serif;
  font-size: small;
  background-color: #4e4e4e;
  color: whitesmoke;
  border-radius: 5px;
}

#paginator {
  text-align: center;
  padding-top: 50px;
}

a {
  color: black;
}

.current-page {
  font-size: x-large;
  font-weight: bold;
  padding-left: 10px;
  padding-right: 10px;
}

.category {
  padding: 5px 10px 5px 10px;
  margin: 5px 5px 5px 0;
  font-family: Georgia, Arial, sans-serif;
  font-size: small;
  background-color: darkred;
  color: whitesmoke;
  border-radius: 15px;
}

.image {
  width: 180px;
  border-radius: 10px;
  box-shadow: darkslategrey 0 0 12px;
}

.image-container {
  width: 200px;
}

.grid {
  padding-bottom: 10px;
}

</style>