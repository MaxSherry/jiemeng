<template>
  <div class="list-panel">
    <div class="list-search">
      <search placeholder="请输入搜索关键词" shape="round" @focus="onSearchFocus"></search>
    </div>
    <div class="list-content">
      <van-row>
        <van-col class="list-content-dir" span="8">
          <badge-group :active-key="activeKey">
            <badge
              v-for="(dir, index) in jiemengData"
              :key="dir.dir"
              :title="dir.dir"
              @click="onBadgeClick(index)"
            />
          </badge-group>
        </van-col>
        <van-col class="list-content-list" span="16">
          <div class="list-content-list-groups" @scroll="onListScroll" ref="groups">
            <cell-group v-for="(dir) in jiemengData" :key="dir.dir" :title="dir.dir">
              <cell v-for="item in dir.items" :key="item">
                <template v-slot:title>
                  <div v-html="item"/>
                </template>
              </cell>
            </cell-group>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import jiemeng from "../datas/jiemeng";
import { Row, Col, Cell, CellGroup, Search, Badge, BadgeGroup } from "vant";
// import { setTimeout, setInterval, clearInterval } from "timers";

export default {
  name: "jiemeng",
  components: {
    VanRow: Row,
    VanCol: Col,
    Cell,
    CellGroup,
    Search,
    Badge,
    BadgeGroup
  },
  data: function() {
    let jiemengData = [];
    jiemeng.forEach(d => {
      let items = d.items;
      let nitems = [],
        tmp = "";
      items.forEach((l, i) => {
        if (i & (1 == 1)) {
          tmp += '<span style="margin-left:10px;">' + l + "</span>";
          nitems.push(tmp);
        } else if (i == items.length - 1) {
          nitems.push(l);
        }
        tmp = "<span>" + l + "</span>";
      });

      jiemengData.push({ dir: d.dir, items: nitems });
    });
    return {
      jiemengData,
      activeKey: 0,
      badgeClick: false,
      activeNames: ""
    };
  },
  methods: {
    onSearchFocus() {
      this.$router.push("/searchtip");
    },
    onBadgeClick(index) {
      this.activeKey = index;
      //   this.badgeClick = true;

      let curtop = this.$refs.groups.children[index].offsetTop;
        // direct = curtop - scrollTop >= 0 ? "down" : "up",
        // scrollTop = this.$refs.groups.scrollTop;

      this.$refs.groups.scrollTop = curtop;

      //   let interval = setInterval(() => {
      //     if (direct == "down") {
      //       scrollTop += 200;
      //     } else {
      //       scrollTop -= 200;
      //     }
      //     if (Math.abs(curtop - scrollTop) > 200) {
      //       this.$refs.groups.scrollTop = scrollTop;
      //     } else {
      //       this.$refs.groups.scrollTop = curtop;
      //       clearInterval(interval);
      //       this.badgeClick = false;
      //     }
      //   }, 30);
    },
    onListScroll(event) {
      if (this.badgeClick) {
        return;
      }
      let scrollTop = event.target.scrollTop,
        length = this.jiemengData.length;

      for (let i = length - 1; i >= 0; i--) {
        if (scrollTop >= this.$refs.groups.children[i].offsetTop) {
          this.activeKey = i;
          return;
        }
      }
    }
  }
};
</script>

<style>
.list-panel {
  width: 100%;
  height: 100%;
}
.list-panel > div {
  width: 100%;
}
.list-search {
  position: relative;
  height: 54px;
}
.list-content {
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  height: calc(100% - 54px);
  position: absolute;
  top: 54px;
}
.list-content .van-row {
  height: 100%;
}
.list-content-dir,
.list-content-list-groups {
  height: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
.list-content-list {
  height: 100%;
}
</style>
