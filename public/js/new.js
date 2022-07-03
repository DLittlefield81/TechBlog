const newFormHandler = async function (event) {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
  
    await fetch(`/api/post`, {
        method: "POST",
        body: JSON.stringify({
            title,
            content
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    document.location.replace("/dashboard");
};

document
    .querySelector("#new-post-form")
    .addEventListener("submit", newFormHandler);