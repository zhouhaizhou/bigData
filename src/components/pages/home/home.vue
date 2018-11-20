<template>
  <div>
    <banner v-on:goAnchor="goAnchor"></banner>
    <product-service ref="pro"></product-service>
    <datahot></datahot>
    <my-questionnaire :dialogVisible="dialogVisible"></my-questionnaire>
  </div>
</template>

<script>
import myHeader from "../../common/header.vue";
import myFooter from "../../common/foot.vue";
import productService from "./productService.vue";
import datahot from "./datahot.vue";
import banner from "./banner";
import { mapActions, mapMutations } from "vuex";
import myQuestionnaire from "../questionnaire";
import { mapState } from "vuex";
export default {
  components: {
    productService,
    datahot,
    myHeader,
    banner,
    myFooter,
    myQuestionnaire
  },
  data() {
    return {
      dialogVisible: false
    };
  },
  mounted() {
    this.ifFun();
  },
  watch: {},
  methods: {
    // ...mapMutations(['SETCOOKIES']),
    ...mapState(["UserToken"]),
    ...mapActions(["scrollAnchor", "toShowQuestionnaire"]),
    goAnchor() {
      // this.scrollAnchor({top:document.documentElement.scrollTop,obj:this.$refs.pro.$el})
      this.$store.dispatch("scrollAnchor", {
        top: document.documentElement.scrollTop,
        obj: this.$refs.pro.$el
      });
    },
    /**
     * 判断是否显示调查问卷
     */
    isShowQuestionnaire() {
      //与调查问卷中的
      this.toShowQuestionnaire()
        .then(res => {
          if (res == "yes") {
            this.dialogVisible = true;
          }
        })
        .catch(res => console.log(res));
    },
    ifFun() {
      let account = this.UserToken.Account;
      if (account == "readearth") {
      } else {
        this.isShowQuestionnaire();
      }
    }
  }
};
</script>

<style scoped>
</style>