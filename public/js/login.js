console.log(">>>>>>>>>>>>>>>LOGIN JS TRIGGER");

const loginFormHandler = async (event) =>{
  event.preventDefault();
  console.log(">>>>>>>>>>>>>>>LOGIN FORM TRIGGER");
  const username = document.querySelector("#username-input-login").value.trim();
  const password = document.querySelector("#password-input-login").value.trim();

  if (username && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector("#login-form")
  .addEventListener("submit", loginFormHandler);


const signupFormHandler = async function (event) {
  event.preventDefault();
  console.log(">>>>>>>>>>>>>>>SIGNUP FORM TRIGGER");
  const username = document.querySelector("#username-input-signup").value.trim();
  const password = document.querySelector("#password-input-signup").value.trim();

  if (username && password) {
    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};


document
  .querySelector("#signup-form")
  .addEventListener("submit", signupFormHandler);