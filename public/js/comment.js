const commentFormHandler = async function (event) {
    event.preventDefault();

    const post_id = document.querySelector('input[id="post-id"]').value.trim();
    const comment_content = document.querySelector('textarea[id="comment-content"]').value.trim();


    await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({
            post_id,
            comment_content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    document.location.reload();

};

document
    .querySelector('#new-comment-form')
    .addEventListener('submit', commentFormHandler);