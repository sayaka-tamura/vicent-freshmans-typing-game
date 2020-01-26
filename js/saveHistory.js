function saveHistory(){
    var gamingTime = document.getElementById('gaming-time').textContent;

    // データの保存
    sessionStorage.setItem('gaming_time', gamingTime);

    // データの取得
    gamingTime = sessionStorage.getItem('gaming_time');

    let showHistory = document.createElement('div');
    showHistory.innerHTML = gamingTime;

    document.getElementById("show-history").appendChild(showHistory);

}