const postId = document.querySelector('input[name="post-id"]').value;

const editFormHandler = async function (event) {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    await fetch(`/api/post/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    document.location.replace('/dashboard');
};

const deleteClickHandler = async function () {
    await fetch(`/api/post/${postId}`, {
        method: 'DELETE'
    });

    document.location.replace('/dashboard');
};

document
    .querySelector('#edit-post-form')
    .addEventListener('submit', editFormHandler);
document
    .querySelector('#delete-btn')
    .addEventListener('click', deleteClickHandler);