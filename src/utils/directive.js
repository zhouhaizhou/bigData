import Vue from 'vue';
const drag = Vue.directive("drag",function(el){
  //bind:function (el, binding) {
    let oDiv = el;  //当前元素
    oDiv.onmousedown = function (e) {
     //鼠标按下，计算当前元素距离可视区的距离
      let disX = e.clientX-oDiv.offsetLeft+20;
      let disY = e.clientY-oDiv.offsetTop+30;
      document.onmousemove = function (e) {
       //通过事件委托，计算移动的距离 
        let l = e.clientX - disX;
        let t = e.clientY - disY;
        oDiv.style.left =l + 'px';
        oDiv.style.top =t + 'px';
        console.log("disx"+disX);
      };
      document.onmouseup = function (e) {
        document.onmousemove = null;
        document.onmouseup = null;
       };
    };
    
    
  //}
});
export {
  drag
}
