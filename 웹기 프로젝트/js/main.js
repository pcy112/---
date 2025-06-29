function homePage(){
    //홈페이지를 가져옴
    location.href = "main.html";
}
function secondPage(){
    //두번째 페이지를 가져옴
    location.href = "second.html";
}
function quizPage(){
    //세번째 페이지를 가져옴
    location.href = "quiz.html";
}
function fourthPage(){
    //네번째 페이지를 가져옴
    location.href = "fourth.html";
}

function popupPage() {
    // sessionStorage에서 'popupShown' 값을 확인
    // if (sessionStorage.getItem('popupShown')) {
    //     // 이미 팝업을 본 경우 아무 작업도 하지 않음
    //     return;
    // } else {
    //     // 팝업을 띄우고 'popupShown' 값을 저장
    //     window.open("popup.html", "popup", "width=400,height=300,scrollbars=yes");
    //     sessionStorage.setItem('popupShown', 'true'); // 팝업 표시 기록 저장
    // }
    window.open("popup.html","popup","width=400,height=300,scrollbars=yes");
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

// 퀴즈 js
const quizData = [
    { question: "프랑스의 수도는?", answer: "파리" },
    { question: "일본의 대표 음식은?(생선요리)", answer: "스시" },
    { question: "미국의 국기는 몇 개의 별이 있나요?", answer: "50" },
    { question: "한국의 전통 의상은?", answer: "한복" },
    { question: "이탈리아의 수도는?", answer: "로마" },
    { question: "중국의 대표적인 명절은?", answer: "춘절" },
    { question: "브라질의 공식 언어는?", answer: "포어" },
    { question: "이집트의 대표 유적지는?", answer: "피라미드" },
    { question: "영국의 수도는?", answer: "런던" },
    { question: "독일의 대표 맥주 축제는?", answer: "옥토버페스트" },
    { question: "스페인의 대표 음식은?", answer: "파에야" },
    { question: "러시아의 수도는?", answer: "모스크바" },
    { question: "호주의 유명한 바위는?", answer: "울룰루" },
    { question: "캐나다의 국기는 어떤 잎이 그려져 있나요?", answer: "단풍잎" },
    { question: "멕시코의 대표 명절은?", answer: "죽은자의날" },
    { question: "인도의 대표 음식은?", answer: "카레" },
    { question: "태국의 수도는?", answer: "방콕" },
    { question: "터키의 대표 디저트는?", answer: "바클라바" },
    { question: "그리스의 유명한 신전은?", answer: "파르테논" },
    { question: "스위스의 대표 음식은?", answer: "퐁듀" },
    { question: "네덜란드의 유명한 꽃은?", answer: "튤립" },
    { question: "핀란드의 산타마을이 있는 도시는?", answer: "로바니에미" },
    { question: "남아프리카공화국의 3대 수도 남서쪽에 위치해있는 항구도시는?", answer: "케이프타운" },
    { question: "뉴질랜드의 대표 새는?", answer: "키위" },
    { question: "사우디아라비아의 성지 도시는?", answer: "메카" },
    { question: "베트남의 수도는?", answer: "하노이" },
    { question: "포르투갈의 수도는?", answer: "리스본" },
    { question: "스웨덴의 대표 가구 브랜드는?", answer: "이케아" },
    { question: "노르웨이의 유명한 자연현상은?", answer: "오로라" },
    {question: "이곳의 이름은?(힌트:일본)", answer:"시부야 스크램블" , image:"https://japan-food-guide-prod.s3.ap-northeast-1.amazonaws.com/uploads/article/cover_image/000/000/581/083c4e7c1e4bdd7fffaab871e3f0a8d00990d6408bec4474dcea482251645c38/eye_catch_27955388_s__1_.jpg?1738899386"}
    
];

let quizOrder = [];
let currentIdx = 0;
let correctCount = 0;
let wrongCount = 0;
let quizLimit = 10; // 기본값 10문제

function showStartScreen() {
    const main = document.getElementById('quiz-main');
    main.innerHTML = `
        <div class="quiz-start-screen">
            <h2>나라별 퀴즈</h2>
            <p>나라와 관련된 상식 퀴즈를 풀어보세요!</p>
            <div style="margin: 16px 0;">
                <label>
                    <input type="radio" name="quiz-limit" value="10" checked> 10문제
                </label>
                <label style="margin-left:12px;">
                    <input type="radio" name="quiz-limit" value="20"> 20문제
                </label>
                <label style="margin-left:12px;">
                    <input type="radio" name="quiz-limit" value="30"> 30문제
                </label>
            </div>
            <button id="start-btn" class="quiz-btn">퀴즈를 시작하겠습니까?</button>
        </div>
    `;
    document.getElementById('start-btn').onclick = () => {
        // 선택된 문제 수 반영
        const selected = document.querySelector('input[name="quiz-limit"]:checked');
        quizLimit = Number(selected.value);
        startQuiz();
    };
}

function startQuiz() {
    quizOrder = quizData.slice().sort(() => Math.random() - 0.5).slice(0, quizLimit); // 무작위 섞고 제한만큼 자르기
    currentIdx = 0;
    correctCount = 0;
    wrongCount = 0;
    showQuiz();
}

function showQuiz() {
    if (currentIdx >= quizOrder.length) {
        showEndScreen();
        return;
    }
    const q = quizOrder[currentIdx];
    const main = document.getElementById('quiz-main');
    main.innerHTML = `
        <div class="quiz-question-box">
            <div class="quiz-progress">문제 ${currentIdx + 1} / ${quizOrder.length}</div>
            <h3 class="quiz-question">Q${currentIdx + 1}. ${q.question}</h3>
            ${q.image ? `<img src="${q.image}" alt="문제 이미지" style="max-width:200px; margin:10px auto; display:block;">` : ""}
            <input type="text" id="answer-input" class="quiz-input" placeholder="정답을 입력하세요">
            <div class="quiz-btn-group">
                <button id="submit-btn" class="quiz-btn">제출</button>
            </div>
            <div id="result-msg" class="quiz-result-msg"></div>
        </div>
    `;
    document.getElementById('submit-btn').onclick = checkAnswer;
    document.getElementById('answer-input').focus();
}

function checkAnswer() {
    const input = document.getElementById('answer-input').value.trim();
    const correct = quizOrder[currentIdx].answer;
    const msg = document.getElementById('result-msg');
    if (input === correct) {
        correctCount++;
        msg.textContent = "정답입니다!";
        msg.style.color = "#6a0dad";
        setTimeout(() => {
            currentIdx++;
            showQuiz();
        }, 1000);
    } else {
        wrongCount++;
        msg.textContent = `오답입니다. 정답은 "${correct}" 입니다.`;
        msg.style.color = "#e74c3c";
        setTimeout(() => {
            currentIdx++;
            showQuiz();
        }, 1500); // 오답일 때 정답을 보여주는 시간을 조금 더 길게(1.5초) 설정
    }
}

function showEndScreen() {
    const main = document.getElementById('quiz-main');
    main.innerHTML = `
        <div class="quiz-end-screen">
            <h2>퀴즈가 모두 끝났습니다!</h2>
            <p>정답 개수: <b>${correctCount}</b></p>
            <p>오답 개수: <b>${wrongCount}</b></p>
            <button id="restart-btn" class="quiz-btn">다시 시작하기</button>
        </div>
    `;
    document.getElementById('restart-btn').onclick = showStartScreen;
}

window.onload = showStartScreen;


// 달력 js

let calendarEvents = {};

// 연, 월 상태 저장
let calendarYear = 2025;
let calendarMonth = 0; // 0: 1월

// 달력 렌더링 함수
function renderCalendar(year = calendarYear, month = calendarMonth) {
    calendarYear = year;
    calendarMonth = month;
    const calendarEl = document.getElementById('calendar');
    if (!calendarEl) return;

    // 달력 헤더(월 이동 버튼)
    let html = `
        <div style="text-align:center; margin-bottom:8px;">
            <button id="prev-month" style="margin-right:8px;">◀</button>
            <span style="font-weight:bold;">${year}년 ${month + 1}월</span>
            <button id="next-month" style="margin-left:8px;">▶</button>
        </div>
        <table class="simple-calendar" style="width:100%;text-align:center;">
            <thead>
                <tr>
                    <th>일</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th>토</th>
                </tr>
            </thead>
            <tbody><tr>
    `;

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    // 1일 전까지 빈칸
    for (let i = 0; i < firstDay; i++) html += "<td></td>";

    // 날짜 출력
    for (let d = 1; d <= lastDate; d++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        const isToday = (year === new Date().getFullYear() && month === new Date().getMonth() && d === new Date().getDate());
        html += `<td${isToday ? ' class="today"' : ''} data-date="${dateStr}" style="cursor:pointer;vertical-align:top;">${d}`;
        // 일정 표시
        if (calendarEvents[dateStr]) {
            calendarEvents[dateStr].forEach(ev => {
                html += `<div class="event" style="background:#ffe0b2; margin:2px 0; font-size:12px; border-radius:4px;">${ev}</div>`;
            });
        }
        html += `</td>`;
        if ((firstDay + d) % 7 === 0) html += "</tr><tr>";
    }
    html += "</tr></tbody></table>";

    // 일정 입력 폼
    html += `
        <div style="margin-top:10px; text-align:center;">
            <input type="date" id="event-date" value="${year}-${String(month + 1).padStart(2, '0')}-01" style="padding:2px;">
            <input type="text" id="event-text" placeholder="일정 내용" style="padding:2px;">
            <button id="add-event-btn">일정 추가</button>
        </div>
    `;

    calendarEl.innerHTML = html;

    // 월 이동 버튼 이벤트
    document.getElementById('prev-month').onclick = () => {
        let y = calendarYear, m = calendarMonth - 1;
        if (m < 0) { y--; m = 11; }
        renderCalendar(y, m);
    };
    document.getElementById('next-month').onclick = () => {
        let y = calendarYear, m = calendarMonth + 1;
        if (m > 11) { y++; m = 0; }
        renderCalendar(y, m);
    };

    // 일정 추가 이벤트
    document.getElementById('add-event-btn').onclick = () => {
        const date = document.getElementById('event-date').value;
        const text = document.getElementById('event-text').value.trim();
        if (!date || !text) return alert('날짜와 일정을 입력하세요.');
        if (!calendarEvents[date]) calendarEvents[date] = [];
        calendarEvents[date].push(text);
        renderCalendar(calendarYear, calendarMonth);
    };

    // 날짜 클릭 시 해당 날짜로 일정 입력란 날짜 변경
    document.querySelectorAll('.simple-calendar td[data-date]').forEach(td => {
        td.onclick = () => {
            document.getElementById('event-date').value = td.dataset.date;
        };
    });
}

// 페이지가 모두 로드되면 2025년 1월 달력 표시
document.addEventListener('DOMContentLoaded', function() {
    renderCalendar(2025, 0);
});
// HTML에서 일정 데이터(JSON)를 읽어 calendarEvents에 할당
const eventsScript = document.getElementById('calendar-events-data');
if (eventsScript) {
    try {
        calendarEvents = JSON.parse(eventsScript.textContent);
    } catch (e) {
        calendarEvents = {};
    }
} else {
    calendarEvents = {};
}