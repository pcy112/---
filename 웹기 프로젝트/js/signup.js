document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // 입력값 유효성 검사
    if (!username || !email || !password) {
        document.getElementById('message').innerText = '모든 필드를 입력해주세요.';
        return;
    }

    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('네트워크 응답이 올바르지 않습니다.');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('message').innerText = '회원가입 성공!';
            // window.location.href = 'welcome.html'; // 필요시 주석 해제
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('message').innerText = '회원가입 중 오류가 발생했습니다.';
        });
});