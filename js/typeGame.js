//キー押下時に関数typeGame()を呼び出す
document.onkeydown = typeGame;

let typStart,typEnd;      //開始時と終了時の時刻
let formattedAnswerRate;  //正答率
let numOfQuestions=11;
let numOfTry=1;
let numOfTry_array = [];
let gaming_time_history_array = [];
let validity_array = [];
let correct_answer_rate = [];

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
    recordTypingSpeed();

    // Chart.js 用に value を保存
    let gaming_time = $('#gaming-time').text();
    gaming_time_history_array.push(gaming_time);
    validity_array.push(mistype);
    correct_answer_rate.push(formattedAnswerRate);

      // HTML への記録の書き込み　→ 表に変えること
    let showHistory = $('<div>');
    showHistory.html(gaming_time + ", " + mistype + ", " + formattedAnswerRate);
    $("#show-history").append(showHistory);

    drawChart();
    
  }

  //タイプ時間を表示
  function recordTypingSpeed() {
    typEnd = new Date();
    //終了時間－開始時間で掛かったミリ秒を取得する
    var keika = typEnd - typStart;
    //1000で割って「切捨て」、秒数を取得
    var sec = Math.floor(keika / 1000);
    //1000で割った「余り(%で取得できる）」でミリ秒を取得
    var msec = keika % 1000;
    
    let gamingTimeTitle = $('<div>', { id: 'gaming-time-title' });
    gamingTimeTitle.html("Time (Sec)：");

    let gamingTime = $('<span>', { id: 'gaming-time' });
    gamingTime.html(sec + "." + msec);
    
    // 作成したdivを付属させる
    $("#time").append(gamingTimeTitle);
    $("#gaming-time-title").append(gamingTime);
  }

  //入力されたセルの文字色を変更する
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

// Chart を描く
function drawChart(){
  var ctx1 = document.getElementById("chart-1");
  numOfTry_array.push(numOfTry);

  var myChart = new Chart(ctx1,{
    type:'line',
    data: typeSpeedAndValidity,
    options:options1
  });

  var ctx2 = document.getElementById("chart-2");
  var myChart = new Chart(ctx2,{
    type:'line',
    data: correctAnswerRate,
    options:options2
  });

  numOfTry++;
}