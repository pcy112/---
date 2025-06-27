document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!username || !email || !password) {
        document.getElementById('message').innerText = '모든 필드를 입력해주세요.';
        return;
    }

    // 1. 먼저 이메일 중복 체크
    fetch('http://localhost:3000/users')
        .then(res => res.json())
        .then(users => {
            const exists = users.some(user => user.email === email);
            if (exists) {
                document.getElementById('message').innerText = '이미 사용 중인 이메일입니다.';
                return;
            }
            // 2. 중복이 아니면 회원가입 진행
            return fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });
        })
        .then(response => {
            if (!response) return; // 중복일 때는 여기서 끝
            if (!response.ok) throw new Error('네트워크 응답이 올바르지 않습니다.');
            return response.json();
        })
        .then(data => {
            if (!data) return;
            document.getElementById('message').innerText = '회원가입 성공!';
            setTimeout(() => {
                window.location.href = 'main.html';
            }, 500);
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('message').innerText = '회원가입 중 오류가 발생했습니다.';
        });
        
});