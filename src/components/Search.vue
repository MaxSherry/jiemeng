<template>
  <div>
    <search
      placeholder="请输入搜索关键词"
      v-model.trim="word"
      shape="round"
      show-action
      @focus="onSearchFocus"
      @search="onSearch"
      @cancel="onSearchCancel"
    ></search>
    <collapse v-model="activeNames">
      <collapse-item
        class="search-item"
        v-for="dir in searchData"
        :key="dir.dir"
        :title="dir.dir"
        :name="dir.dir"
        icon="label-o"
      >
        <cell v-for="item in dir.items" :key="item">
          <template v-slot:title>
            <div v-html="item"/>
          </template>
        </cell>
      </collapse-item>
    </collapse>
    <div class="nodata" v-if="searchData.length==0">没有检索到数据</div>
  </div>
</template>

<script>
import jiemeng from "../datas/jiemeng";
import { Collapse, CollapseItem, Cell, Search } from "vant";

export default {
  data() {
    return {
      word: "",
      searchData: [],
      activeNames: []
    };
  },
  props: {
    sw: {
      default: ""
    }
  },
  components: {
    Collapse,
    CollapseItem,
    Cell,
    Search
  },
  methods: {
    onSearchFocus() {
      this.$router.replace("/searchtip");
    },
    onSearch() {
      if (this.word == "") {
        return;
      }

      this.searchData.splice(0, this.searchData.length);
      this.activeNames.splice(0, this.activeNames.length);
      let regExp = new RegExp(this.word, "ig");
      jiemeng.forEach(d => {
        let items = [];
        d.items.forEach(n => {
          if (n.indexOf(this.word) != -1) {
            items.push(
              n.replace(regExp, '<font color="#f44">' + this.word + "</font>")
            );
          }
        });
        if (items.length > 0) {
          this.searchData.push({ dir: d.dir, items });
          this.activeNames.push(d.dir);
        }
      });
    },
    onSearchCancel() {
      this.$router.go(-1)
    }
  },
  mounted() {
    this.word = this.sw;
    this.onSearch();
  }
};
</script>

<style>
.search-item .van-collapse-item__title {
  font-size: 14px;
  font-weight: bold;
  line-height: 25px;
}
.search-item .van-collapse-item__content {
  padding: 0 22px;
}
.nodata {
  text-align: center;
  margin: 8px 0;
  color: rgba(69, 90, 100, 0.6);
  font-size: 12px;
}
</style>

