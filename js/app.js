//文字を格納する配列
var moji = new Array("Ａ","Ｂ","Ｃ","Ｄ","Ｅ","Ｆ","Ｇ","Ｈ","Ｉ",
                      "Ｊ","Ｋ","Ｌ","Ｍ","Ｎ","Ｏ","Ｐ","Ｑ","Ｒ",
                      "Ｓ","Ｔ","Ｕ","Ｖ","Ｗ","Ｘ","Ｙ","Ｚ",
                      "０","１","２","３","４","５","６","７","８","９");

//キーコードを格納する配列
var kcode = new Array(65,66,67,68,69,70,71,72,73,
                      74,75,76,77,78,79,80,81,82,
                      83,84,85,86,87,88,89,90,
                      48,49,50,51,52,53,54,55,56,57);

//0～25までの乱数を格納する配列
var rnd = new Array();

//グローバル変数群
var mondai = "";       //問題の文字列を格納
var cnt=0;             //何問目か格納
var mistype=0;         //誤答数のカウント

//タイピングゲームの問題をセットする関数
// function QuestionSet()
$(window).on('load', function(){
  // カウント数のクリア
  QuestionSet();
});

function QuestionSet() {
  cnt = 0;
  //乱数作成関数の呼び出し
  ransu();
  //問題文作成関数の呼び出し
  var table = makingQuestions();
  //問題枠に表示する
  $("#waku").append(table);
}

$(document).on('click','#again',function(){
  //問題数と誤答数のクリア
  cnt=0;
  mistype=0;

  // メッセージをクリアする
  $('#waku').html("");

  //カウント処理を停止
  clearInterval(timer);

  // 時間表示をクリアする
  $("#time").html("");
  $("#validity").html("");
  $("#correct-answer-rate").html("");

  // 問題文をセットする
  QuestionSet();
});

//0～34までの乱数を20個作成して配列rndに格納する関数
function ransu()
{
  for ( var i = 0 ; i < 11 ; i++ )
  {
    rnd[i] = Math.floor( Math.random() * 35 );
  }
}

//問題文の作成（配列mojiの要素をランダムに20文字繋げる）
function makingQuestions() {

  var num = 0;
  for (var i = 0; i < 1; i++) {
    var tr = $('<tr>');
    for (var j = 0; j < 11; j++) {
      // 問題をランダムに選び, mondai 配列に格納
      mondai = moji[rnd[num]];
      // td要素の作成
      var td = $('<td>', { id:"word"+ num})
      td.html(mondai);
      // td要素をtr要素の子要素に追加
      tr.append(td);
      num++;
    }
    // tr要素をtable要素の子要素に追加
    var table = $('<table>', { id:'table1'}).append(tr);
  }
  return table;
}