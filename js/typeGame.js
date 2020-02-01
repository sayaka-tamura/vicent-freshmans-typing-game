//キー押下時に関数typeGame()を呼び出す
document.onkeydown = typeGame;

var typStart,typEnd;      //開始時と終了時の時刻
var formattedAnswerRate;  //正答率
var numOfQuestions=11;

//キー入力を受け取る関数
function typeGame(evt)
{
  var kc;  //入力されたキーコードを格納する変数

  //入力されたキーのキーコードを取得
  if ($('*'))
  {
    // 押されたキーコードを取得
    kc = event.keyCode;
  }
  else
  {
    // browser間の環境差に対応
    kc = evt.which;
  }

  //入力されたキーコードと、問題文のキーコードを比較
  // 正答時
  if (kc == kcode[ rnd[cnt] ])
  {
    //以下、キーコードが一致した時の処理

    //最初の1文字が入力された時間を記録する
    if (cnt==0)
    {
      typStart = new Date();

      //最初の1文字が入力された時に経過時間を表示
      var count = 0;
      var countup = function(){
        count++;
        //表示文作成
        var displayTime = "Time elapsed：" + count + " Sec";
        $("#time").html(displayTime);
      } 
      //処理を1000ミリ秒(1秒)ごと繰り返す
      timer = setInterval(countup, 1000);
    }

    //入力されたセルの文字色を緑色にする
    let colorName1 = "DodgerBlue";
    changeCharColor(colorName1);
  }
  // 誤答時
  else if (kc != kcode[ rnd[cnt] ])
  {
    //入力されたセルの文字色を赤色にする
    let colorName2 = "red";
    changeCharColor(colorName2);
    mistype++;
  }
  
  //全文字入力したか確認
  if ( cnt == 11)
  {
    //カウント処理を停止
    clearInterval(timer);
    
    //表示文作成
    $("#time").html("お疲れさまでした(*'▽')");

    //誤答数の表示
    $("#validity").html("Number of Mistakes: ");
    var numOfMistype = $('<span>', { id:'num-of-mistype'});
    numOfMistype.html(mistype);
    $("#validity").append(numOfMistype);

    //正答率の表示
    var answerRate = ((numOfQuestions-mistype)/numOfQuestions)*100
    formattedAnswerRate = floatFormat(answerRate,2);
    $("#correct-answer-rate").html("Correct answer rate (%) : " + formattedAnswerRate); 

    //タイプ時間を表示
    //全文字入力していたら、終了時間を記録する
    typEnd = new Date();

    //終了時間－開始時間で掛かったミリ秒を取得する
    var keika = typEnd - typStart;

    //1000で割って「切捨て」、秒数を取得
    var sec = Math.floor( keika/1000 );

    //1000で割った「余り(%で取得できる）」でミリ秒を取得
    var msec = keika % 1000;

    let gamingTimeTitle = $('<div>',{id:'gaming-time-title'});
    gamingTimeTitle.html("Time (Sec)：");

    let gamingTime = $('<span>',{id:'gaming-time'});
    gamingTime.html(sec + "."+ msec);

    // 作成したdivを付属させる
    $("#time").append(gamingTimeTitle);
    $("#gaming-time-title").append(gamingTime);

    saveHistory();
    drawChart();
  }

  function changeCharColor(colorName) {
    var idName = "word" + cnt;
    document.getElementById(idName).style.color = colorName;
    cnt++; //問題数を＋１にする
  }

  // 小数点n位までを残す関数
  // number=対象の数値
  // n=残したい小数点以下の桁数
  function floatFormat( number, n ) {
    var _pow = Math.pow( 10 , n ) ;

    return Math.round( number * _pow ) / _pow ;
  }
}

function saveHistory(){
  let gamingTime = $('#gaming-time').text();
  
  // データの保存
  sessionStorage.setItem('gaming_time', gamingTime);
  //mistype
  //formattedAnswerRate

  // データの取得
  gamingTime = sessionStorage.getItem('gaming_time');

  // HTML への記録の書き込み　→ 表に変えること
  let showHistory = $('<div>');
  showHistory.html(gamingTime + ", " + mistype + ", " + formattedAnswerRate);

  $("#show-history").append(showHistory);

  // typing try 回数 を保存する array, gaming-timeを RECORD するようのArray 作成
  // lineChartDataの label と data にいれる

  //JSON 作成
    // let userData = "{gaming_time:" + gamingTime + ", mistype:" + mistype + ", answer_rate:" + formattedAnswerRate +"}";
    // let userDataJSON = JSON.stringify(userData);
    // console.log(userDataJSON);  // "{gaming_time:6.965, mistype:1, answer_rate:90.91}"
}

// Chart.JS 用データ
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