document.getElementById('comment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('comment-username').value.trim();
    const content = document.getElementById('comment-content').value.trim();
    if (!username || !content) return;

    // localStorage에 저장 (간단 예시)
    const comments = JSON.parse(localStorage.getItem('comments') || '[]');
    comments.push({ username, content });
    localStorage.setItem('comments', JSON.stringify(comments));

    document.getElementById('comment-username').value = '';
    document.getElementById('comment-content').value = '';
    renderComments();
});

function renderComments() {
    const comments = JSON.parse(localStorage.getItem('comments') || '[]');
    const list = document.getElementById('comment-list');
    list.innerHTML = '';
    comments.forEach(c => {
        const li = document.createElement('li');
        li.innerHTML = `<span class="comment-nick">${c.username}</span>${c.content}`;
        list.appendChild(li);
    });
}
// 수정/삭제 이벤트 위임
document.getElementById('comment-list').addEventListener('click', function(e) {
    const idx = e.target.dataset.idx;
    if (e.target.classList.contains('delete-btn')) {
        // 삭제
        const comments = JSON.parse(localStorage.getItem('comments') || '[]');
        comments.splice(idx, 1);
        localStorage.setItem('comments', JSON.stringify(comments));
        renderComments();
    } else if (e.target.classList.contains('edit-btn')) {
        // 수정
        const comments = JSON.parse(localStorage.getItem('comments') || '[]');
        const newContent = prompt('댓글을 수정하세요:', comments[idx].content);
        if (newContent !== null && newContent.trim() !== '') {
            comments[idx].content = newContent.trim();
            localStorage.setItem('comments', JSON.stringify(comments));
            renderComments();
        }
    }
});

window.onload = renderComments;