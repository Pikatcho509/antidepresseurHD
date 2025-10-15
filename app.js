document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('message-form');
  const messageList = document.getElementById('message-list');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const pseudo = document.getElementById('pseudo').value || 'Anonyme';
    const content = document.getElementById('content').value;

    if (!content.trim()) return;

    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.innerHTML = `<strong>${pseudo}</strong><p>${content}</p>`;
    messageList.prepend(messageDiv);

    form.reset();
  });
});
