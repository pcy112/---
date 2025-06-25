function homePage(){
    //홈페이지를 가져옴
    location.href = "main.html";
}
function secondPage(){
    //두번째 페이지를 가져옴
    location.href = "second.html";
}
function thirdPage(){
    //세번째 페이지를 가져옴
    location.href = "third.html";
}
function fourthPage(){
    //네번째 페이지를 가져옴
    location.href = "fourth.html";
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
function login(){
    window.location.href = "login.html";
}
function signUp(){
    window.location.href = "signup.html";
}
function logout(){
    // 로그아웃 기능 구현
    // 예를 들어, 세션 스토리지에서 사용자 정보를 제거하고 홈 페이지로 이동
    localStorage.removeItem('user'); // 사용자 정보 제거
    window.location.href = "main.html"; // 홈 페이지로 이동
}
function commentPage(){
    // 댓글 페이지로 이동
    window.location.href = "comment.html";
}
function guitarPage(){
    window.location.href = "guitar.html";
}
