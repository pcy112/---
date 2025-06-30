document.querySelectorAll('.culture-card-flip').forEach(card => { // 카드 플립 효과를 적용할 요소 선택
    card.addEventListener('click', function() { // 클릭 이벤트 리스너 추가
        card.classList.toggle('flipped'); // 클릭 시 'flipped' 클래스 토글
    });
});