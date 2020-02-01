function saveHistory(){
    var gamingTime = $('#gaming-time').text();

    // データの保存
    sessionStorage.setItem('gaming_time', gamingTime);

    // データの取得
    gamingTime = sessionStorage.getItem('gaming_time');

    let showHistory = $('<div>');
    showHistory.html(gamingTime);

    $("#show-history").append(showHistory);

}