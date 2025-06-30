document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault(); // 폼의 기본 제출 동작(페이지 새로고침) 방지

    // 입력값 가져오기
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // 모든 필드가 입력되었는지 확인
    if (!username || !email || !password) {
        document.getElementById('message').innerText = '모든 필드를 입력해주세요.';
        return;
    }

    // 1. 이메일 중복 체크를 위해 서버에서 사용자 목록 요청
    fetch('http://localhost:3000/users')
        .then(res => res.json()) // 응답을 JSON으로 변환
        .then(users => {
            // 이미 등록된 이메일이 있는지 확인
            const exists = users.some(user => user.email === email);
            if (exists) {
                document.getElementById('message').innerText = '이미 사용 중인 이메일입니다.';
                return; // 중복이면 함수 종료
            }
            // 2. 중복이 아니면 회원가입 요청(POST)
            return fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });
        })
        .then(response => {
            if (!response) return; // 중복일 때는 여기서 끝
            if (!response.ok) throw new Error('네트워크 응답이 올바르지 않습니다.');
            return response.json(); // 회원가입 성공 시 응답 데이터 반환
        })
        .then(data => {
            if (!data) return;
            // 회원가입 성공 메시지 표시
            document.getElementById('message').innerText = '회원가입 성공!';
            // 0.5초 후 메인 페이지로 이동
            setTimeout(() => {
                window.location.href = 'main.html';
            }, 500);
        })
        .catch(error => {
            // 오류 발생 시 콘솔에 출력 및 사용자에게 알림
            console.error('Error:', error);
            document.getElementById('message').innerText = '회원가입 중 오류가 발생했습니다.';
        });
        
});