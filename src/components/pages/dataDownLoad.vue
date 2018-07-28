<template>
    <div>
        <div :class="item.name" v-for="item in items">
            <div class="sub-title-wrap">
                <div class="nav-marker">直接设置背景颜色就行了</div>
                <div class="lists-wrap">
                    <div class="list-wrap" v-for="list in lists">
                        <div class="list-img"><img :src="list.imgUrl" /></div>
                        <div class="list-title">{{list.title}}</div>
                        <div class="list-marker-wrap">
                            <div><span class="view-icon" src=""></span><span class="view-count">{{list.viewCount}}</span></div>
                            <div><span class="comment-icon" src=""></span><span class="comment-count">{{list.commentCount}}</span></div>
                            <div><span class="likes-icon" src=""></span><span class="likes-count">{{list.likesCount}}</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <div></div>
        </div>
        <hr>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</template>

<script>
export default {
  data() {
    return {
        items:function (param) {      

            return "要返"
         }

    };
  },
  methods: {}
};
</script>

<style scoped>
</style>