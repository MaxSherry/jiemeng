<template>
  <div>
    <form action="/" onsubmit="return false;">
      <search
        show-action
        placeholder="请输入搜索关键词"
        v-model.trim="sw"
        shape="round"
        ref="search"
        @search="onSearch"
        @cancel="onSearchCancel"
      ></search>
    </form>
    <div class="search-history">
      <van-row type="flex" justify="space-between">
        <van-col span="4" offset="1">搜索历史</van-col>
        <van-col span="2" class="del">
          <icon name="delete" @click="onClearSearchHistory"/>
        </van-col>
      </van-row>
      <div class="tag-panel">
        <div class="tag-item" v-for="word in words" :key="word">
          <tag round @click="onTagSearch(word)">{{word}}</tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Search, Row, Col, Icon, Tag } from "vant";
import SearchHistory from "./SearchHistory";

export default {
  name: "searchtip",
  components: {
    Search,
    VanRow: Row,
    VanCol: Col,
    Icon,
    Tag
  },
  data: function() {
    return {
      sw: "",
      words: []
    };
  },
  mounted: function() {
    this.$refs.search.querySelector("input").focus();
    this.words = SearchHistory.load();
  },
  methods: {
    onTagSearch(word) {
      this.$router.replace({ path: `/search/${word}` });
    },
    onSearch() {
      SearchHistory.add(this.sw.trim());
      this.$router.replace({ path: `/search/${this.sw}` });
    },
    onSearchCancel() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.replace("/index.html");
    },
    onClearSearchHistory() {
      SearchHistory.clear();
      this.words = []
    }
  }
};
</script>

<style>
.search-history {
  margin-top: 10px;
}
.search-history .van-row {
  font-size: 12px;
}
.search-history .del {
  font-size: 14px;
}
.tag-panel {
  margin-top: 5px;
}
.tag-item {
  float: left;
  margin-left: 10px;
  margin-top: 5px;
}
</style>
