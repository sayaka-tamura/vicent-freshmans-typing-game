//キー押下時に関数typeGame()を呼び出す
document.onkeydown = typeGame;

var typStart,typEnd;   //開始時と終了時の時刻を格納
var numOfQuestions=11;

//キー入力を受け取る関数
function typeGame(evt)
{
  var kc;  //入力されたキーコードを格納する変数

  //入力されたキーのキーコードを取得
  if (document.getElementsByTagName('*'))
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
        var displayTime = "経過時間：" + count + "秒";
        document.getElementById("time").innerHTML = displayTime;
      } 
      //処理を1000ミリ秒(1秒)ごと繰り返す
      timer = setInterval(countup, 1000);
    }

    //入力されたセルの文字色を緑色にする
    var idName = "word"+cnt;
    document.getElementById(idName).style.color="lightgreen";

    cnt++; //問題数を＋１にする
  }
  // 誤答時
  else if (kc != kcode[ rnd[cnt] ])
  {
    //入力されたセルの文字色を赤色にする
    var idName = "word"+cnt;
    document.getElementById(idName).style.color="red";
    cnt++; //問題数を＋１にする
    mistype++;
  }
  
  //全文字入力したか確認
  if ( cnt == 11)
  {
    //カウント処理を停止
    clearInterval(timer);
    
    //表示文作成
    document.getElementById("time").innerHTML = "お疲れさまでした(*'▽')";

    //誤答数の表示
    document.getElementById("validity").innerHTML="Number of Mistakes: ";
    let numOfMistype = document.createElement('span');
    numOfMistype.id="num-of-mistype";
    numOfMistype.innerHTML = mistype;

    document.getElementById("validity").appendChild(numOfMistype);

    //正答率の表示
    var answerRate = ((numOfQuestions-mistype)/numOfQuestions)*100
    document.getElementById("correct-answer-rate").innerHTML = "Correct answer rate (%) : " + floatFormat(answerRate,2); 

    //全文字入力していたら、終了時間を記録する
    typEnd = new Date();

    //終了時間－開始時間で掛かったミリ秒を取得する
    var keika = typEnd - typStart;

    //1000で割って「切捨て」、秒数を取得
    var sec = Math.floor( keika/1000 );

    //1000で割った「余り(%で取得できる）」でミリ秒を取得
    var msec = keika % 1000;

    //タイプ時間を表示
    let gamingTimeTitle = document.createElement('div');
    gamingTimeTitle.id="gaming-time-title";
    gamingTimeTitle.innerHTML="Time (Sec)：";

    let gamingTime = document.createElement('span');
    gamingTime.id="gaming-time";
    gamingTime.innerHTML = sec + "."+ msec;

    // 作成したdivを付属させる
    document.getElementById("time").appendChild(gamingTimeTitle);
    document.getElementById("gaming-time-title").appendChild(gamingTime);

    saveHistory();
  }

  // 小数点n位までを残す関数
  // number=対象の数値
  // n=残したい小数点以下の桁数
  function floatFormat( number, n ) {
    var _pow = Math.pow( 10 , n ) ;

    return Math.round( number * _pow ) / _pow ;
  }
}
