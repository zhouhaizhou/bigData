<template>
<div>
  <div class="title"><div class="title_point"></div><div class="title_text">{{data[0].type}}</div> </div>
<div class="inter" id="inter" v-html="data[0].innerHTML">
</div>
</div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      data: []
    };
  },
  watch: {
    $route: {
      handler(val) {
        this.name = val.name;
        this.GetHTML();
      },
      deep: true
    }
  },
  mounted() {
    this.name = this.$route.name;
    this.GetHTML();
  },
  methods: {
    GetHTML() {
      var that = this;
      this.axios
        .get("DataService.svc/GetIntefaceInfo", {
          params: {
            moduleName: that.name
          }
        })
        .then(response => {
          var resData = eval("(" + response.data + ")");
          that.data = resData;
        })
        .catch(response => {
          console.log(response);
        });
    }
  }
};
</script>

<style scoped>
.title {
  margin-top: 17px;
}
.title_point {
  float: left;
  width: 0.5vw;
  height: 2.5vh;
  background-color: #1bbf9d;
}
.title_text {
  margin-left: 20px;
  font-weight: bold;
  font-size: 20px;
}
.inter {
  /* background: white; */
  padding: 15px;
  margin-top: 10px;
  width: 76vw;
}
</style>
