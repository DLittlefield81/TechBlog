// const post_id = document.querySelector('#post-title').value;
const editFormHandler = async function (event) {
    event.preventDefault();
    console.log('UPDATING ENTRY<<<<<<<<<<<<<<<<<<<<<<<<<')
    const post_title = document.querySelector('#post-title').value.trim();
    const post_content = document.querySelector('#post-content').value.trim();
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/post/${post_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            post_title,
            post_content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};





// const editFormHandler = async function (event) {
//     event.preventDefault();
//     console.log('UPDATING ENTRY<<<<<<<<<<<<<<<<<<<<<<<<<')
//     const post_title = document.querySelector('#post-title').value.trim();
//     const post_content = document.querySelector('#post-content').value.trim();
//     const post_id = window.location.toString().split('/')[
//         window.location.toString().split('/').length - 1
//     ];
//     await fetch(`/api/post/${post_id}`, {
//         method: 'PUT',
//         body: JSON.stringify({
//             post_title,
//             post_content
//         }),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });

//     document.location.replace('/dashboard');
// };

const deleteClickHandler = async function () {
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    await fetch(`/api/post/${post_id}`, {
        method: 'DELETE'
    });

    document.location.replace('/dashboard');
};

document
    .querySelector('#updateEntry')
    .addEventListener('click', editFormHandler);
document
    .querySelector('#delete-btn')
    .addEventListener('click', deleteClickHandler);