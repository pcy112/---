// 로그인 폼 제출 이벤트 리스너 등록
document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault(); // 폼의 기본 제출 동작(페이지 새로고침) 방지

  // 입력값 가져오기
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // 서버에 이메일로 사용자 정보 요청
  fetch('http://localhost:3000/users?email=' + encodeURIComponent(email))
    .then(response => response.json()) // 응답을 JSON으로 변환
    .then(users => {
      const loginMessage = document.getElementById('login-message');
      loginMessage.style.color = '#e74c3c'; // 기본 에러 색상 지정

      // 사용자가 존재하지 않을 때
      if (!Array.isArray(users) || users.length === 0) {
        loginMessage.innerText = '이메일이 존재하지 않습니다.';
      // 비밀번호가 일치하지 않을 때
      } else if (users[0].password !== password) {
        loginMessage.innerText = '비밀번호가 일치하지 않습니다.';
      // 로그인 성공 시
      } else {
        loginMessage.style.color = '#2ecc71'; // 성공 색상
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
      // 오류 발생 시 콘솔에 출력 및 사용자에게 알림
      console.error('Error:', error);
      document.getElementById('login-message').style.color = '#e74c3c';
      document.getElementById('login-message').innerText = '로그인 중 오류가 발생했습니다.';
    });
});