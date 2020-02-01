let gamingTime = $('#gaming-time').text();
let gamingTimeJSON = JSON.stringify(gamingTime);

var lineChartData = {
  labels : ["1","2","3","4","5","6"],                       //X軸のラベル
  datasets : [
    {
      label: "gaming-time",                                 //項目名
      fillColor : /*"#f2dae8"*/"rgba(242,218,232,0.6)",     //塗りつぶす色
      strokeColor : /*"#dd9cb4"*/"rgba(221,156,180,0.6)",   //線の色
      pointColor : /*"#dd9cb4"*/"rgba(221,156,180,0.6)",    //値の点を塗りつぶす色
      pointStrokeColor : "#fff",                            //値の点の枠線の色
      pointHighlightFill : "#fff",                          //マウスオーバー時値の点を塗りつぶす色
      pointHighlightStroke : /*"#dd9cb4"*/"rgba(221,156,180,0.6)",  //マウスオーバー時値の点の枠線を塗りつぶす色
      data : [67,65,66,70,71,77]                            //値
    }
    // {
    //   label: "validity",
    //   fillColor : /*"#afd0ef"*/"rgba(175,208,239,0.6)",
    //   strokeColor : /*"#fb7dd8"*/"rgba(143,183,221,0.6)",
    //   pointColor : /*"#8fb7dd"*/"rgba(143,183,221,0.6)",
    //   pointStrokeColor : "#fff",
    //   pointHighlightFill : "#fff",
    //   pointHighlightStroke : /*"#8fb7dd"*/"rgba(143,183,221,0.6)",
    //   data : [57,56,55,53,56,49]
    // }
  ]

}

function drawChart(){
  var ctx = document.getElementById("chart").getContext("2d");
  window.myLine = new Chart(ctx).Line(lineChartData, {
    responsive: true
    // 下記を追加すると線がまっすぐになります
    /* bezierCurve: false */
  });
}