//キー押下時に関数typeGame()を呼び出す
document.onkeydown = typeGame;

//文字を格納する配列
var moji = new Array("Ａ","Ｂ","Ｃ","Ｄ","Ｅ","Ｆ","Ｇ","Ｈ","Ｉ",
                     "Ｊ","Ｋ","Ｌ","Ｍ","Ｎ","Ｏ","Ｐ","Ｑ","Ｒ",
                     "Ｓ","Ｔ","Ｕ","Ｖ","Ｗ","Ｘ","Ｙ","Ｚ");

//キーコードを格納する配列
var kcode = new Array(65,66,67,68,69,70,71,72,73,
                      74,75,76,77,78,79,80,81,82,
                      83,84,85,86,87,88,89,90);

//0～25までの乱数を格納する配列
var rnd = new Array();


//グローバル変数群
var mondai = "";       //問題の文字列を格納
var cnt=0;             //何問目か格納
var typStart,typEnd;   //開始時と終了時の時刻を格納

function gameSet(){
  // 問題文をクリアする
  var removedTable = document.getElementById('table1');
  var parentEl = removedTable.parentElement;
  parentEl.removeChild(removedTable);

  QuestionSet();

}

//タイピングゲームの問題をセットする関数
function QuestionSet()
{
  // カウント数のクリア
  cnt=0;

  //乱数作成関数の呼び出し
  ransu();

  //問題文作成関数の呼び出し
  var table = makingQuestions();

  //問題枠に表示する
  document.getElementById("waku").appendChild(table);

}

//0～25までの乱数を20個作成して配列rndに格納する関数
function ransu()
{
  for ( var i = 0 ; i < 20 ; i++ )
  {
    rnd[i] = Math.floor( Math.random() * 26 );
  }
}

//問題文の作成（配列mojiの要素をランダムに20文字繋げる）
function makingQuestions() {
  var table = document.createElement('table');
  table.id = "table1";

  var num = 0;
  for (var i = 0; i < 1; i++) {
    var tr = document.createElement('tr');
    for (var j = 0; j < 20; j++) {
      mondai = moji[rnd[num]];
      var td = document.createElement('td');
      td.id = "word"+ num;
      td.textContent = mondai;
      // td要素をtr要素の子要素に追加
      tr.appendChild(td);
      num++;
    }
    // tr要素をtable要素の子要素に追加
    table.appendChild(tr);
  }
  return table;
}

//キー入力を受け取る関数
function typeGame(evt)
{
  var kc;  //入力されたキーコードを格納する変数

  //入力されたキーのキーコードを取得
  if (document.all)
  {
    kc = event.keyCode;
  }
  else
  {
    kc = evt.which;
  }
  //入力されたキーコードと、問題文のキーコードを比較
  if (kc == kcode[ rnd[cnt] ])
  {
    //以下、キーコードが一致した時の処理

    //最初の1文字が入力された時間を記録する
    if (cnt==0)
    {
      typStart = new Date();

      //minami Start
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
      //minami End

    }

    // -------------------- Tamura's Part Start ------------------------- //

    //入力されたセルの文字色を灰色にする
    var idName = "word"+cnt;
    document.getElementById(idName).style.color="red";

    cnt++; //カウント数を＋１にする

    //全文字入力したか確認
    if ( cnt == 20)
    {
      
      //minami Start
      //カウント処理を停止
      clearInterval(timer);
      //表示文作成
      var finTime =  "お疲れさまでした(*'▽')";
      document.getElementById("time").innerHTML = finTime;
      //minami End

      //全文字入力していたら、終了時間を記録する
      typEnd = new Date();

      //終了時間－開始時間で掛かったミリ秒を取得する
      var keika = typEnd - typStart;

      //1000で割って「切捨て」、秒数を取得
      var sec = Math.floor( keika/1000 );

      //1000で割った「余り(%で取得できる）」でミリ秒を取得
      var msec = keika % 1000;

      //問題終了を告げる文字列を作成
      var fin="GAME終了　時間："+sec+"秒"+msec;

      //問題枠にゲーム終了を表示
      document.getElementById("waku").innerHTML = fin;
    }
  }
}

// -------------------- Tamura's Part End ------------------------- //