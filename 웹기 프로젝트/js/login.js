document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    fetch('http://localhost:3000/users?email=' + encodeURIComponent(email))
      .then(response => response.json())
      .then(users => {
        const loginMessage = document.getElementById('login-message');
        loginMessage.style.color = '#e74c3c'; // 기본 에러 색상

        if (!Array.isArray(users) || users.length === 0) {
          loginMessage.innerText = '이메일이 존재하지 않습니다.';
        } else if (users[0].password !== password) {
          loginMessage.innerText = '비밀번호가 일치하지 않습니다.';
        } else {
          loginMessage.style.color = '#2ecc71';
          loginMessage.innerText = '로그인 성공!';
          // 로그인 성공 후 처리
          // 예시: 사용자 정보 localStorage에 저장
          localStorage.setItem('user', JSON.stringify(users[0]));
          // 1초 후 메인 페이지로 이동
          setTimeout(() => {
            window.location.href = 'main.html';
          }, 1000);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        document.getElementById('login-message').style.color = '#e74c3c';
        document.getElementById('login-message').innerText = '로그인 중 오류가 발생했습니다.';
      });
});