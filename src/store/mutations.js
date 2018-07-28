module.exports = {
  add(state) {
    state.count++;
    
  },
  reduce(state) {
    state.count--;
  },
  scrollAnchor(state,paramObj) {
    //Top 对象要从开始的位置移动到目标位置的距离
    //obj 哪个对象要移动
    var Top=paramObj.top;
    var obj=paramObj.obj;
    var self=this;
    if (document.documentElement.scrollTop >= obj.offsetTop) {
      return;
    }
    document.documentElement.scrollTo(0, Top);
    var timer = setInterval(function() {
      clearInterval(timer);
      let distance=(obj.offsetTop-document.documentElement.scrollTop)/10  //步长
      self.commit('scrollAnchor',{top:distance + Top,obj:obj});
    }, 15);
  }
}
