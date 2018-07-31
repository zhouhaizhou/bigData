module.exports={
  scrollAnchor({context},paramObj) {
    //Top 对象要从开始的位置移动到目标位置的距离
    //obj 哪个对象要移动
    var Top=paramObj.top;
    var obj=paramObj.obj;
    var self=this;
    if (document.documentElement.scrollTop >= obj.offsetTop) {
      return;
    }
    document.documentElement.scrollTop=Top;
    var timer = setInterval(function() {
      clearInterval(timer);
      let distance=(obj.offsetTop-document.documentElement.scrollTop)/10  //步长
      self.dispatch('scrollAnchor',{top:distance + Top,obj:obj});
    }, 15);
  }
}