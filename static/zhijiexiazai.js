var obj={
    userName:"",
    downTime:"",
    moduleEnName:"",
    date:"",
    province:"",
    citySite:"",
    element:"",
    famat:"",
    timeInterval:"",
    insertTime:"",
    downState:"",
    isDown:""
}
var objToStr=JSON.stringify(obj);

var  serviceURL = "http://116.239.25.38/FLServices/commonHandler/ForecastScreenShotHandler.ashx";
$.ajax({
    url : serviceURL,
    data: {"funName":'downLoadFun',"funParams":objToStr},
    async:false,
    dataType: 'json',
    type : "POST",
    success : function(data){
        alert(data.resultCode);
    },error: function (err) {
        alert("error");
    }
});