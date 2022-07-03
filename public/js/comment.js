const commentFormHandler = async function (event) {
    event.preventDefault();

    const postId = document.querySelector('input[name="post-id"]').value.trim();
    const content = document.querySelector('textarea[name="comment-content"]').value.trim();

    if (content) {
        await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({
                postId,
                content
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        document.location.reload();
    }
};

document
    .querySelector('#new-comment-form')
    .addEventListener('submit', commentFormHandler);