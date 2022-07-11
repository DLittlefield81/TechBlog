console.log('NewPostScript Loaded<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
const newFormHandler = async function (event) {
    event.preventDefault();

    const post_title = document.querySelector('input[id="post-title"]').value.trim();
    const post_content = document.querySelector('textarea[id="post-content"]').value.trim();

    if (post_title && post_content) {
        console.log('Trying to create post<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
        const response = await fetch(`/api/post`, {
            method: "POST",
            body: JSON.stringify({ post_title, post_content }),
            headers: {
                "Content-Type": "application/json"
            },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to add pet');
        }
    }
};
    document
        .querySelector(".new-blog-form")
        .addEventListener("submit", newFormHandler)