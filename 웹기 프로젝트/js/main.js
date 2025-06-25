function homePage(){
    //홈페이지를 가져옴
    window.location.href = "main.html";
}
function secondPage(){
    //두번째 페이지를 가져옴
    window.location.href = "second.html";
}
function thirdPage(){
    //세번째 페이지를 가져옴
    window.location.href = "third.html";
}
function fourthPage(){
    //네번째 페이지를 가져옴
    window.location.href = "fourth.html";
}

function popupPage() {
    // sessionStorage에서 'popupShown' 값을 확인
    if (sessionStorage.getItem('popupShown')) {
        // 이미 팝업을 본 경우 아무 작업도 하지 않음
        return;
    } else {
        // 팝업을 띄우고 'popupShown' 값을 저장
        window.open("popup.html", "popup", "width=400,height=300,scrollbars=yes");
        sessionStorage.setItem('popupShown', 'true'); // 팝업 표시 기록 저장
    }
}
