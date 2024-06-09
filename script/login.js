const form = document.querySelector('.form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value;

  if (!email || !password) {
    console.error('Email and password are required.');
    return;
  }

  const payload = { email, password };
  console.log('Payload:', payload);

  try {
    const response = await fetch('https://blogpost-server-production-d92d.up.railway.app/api/v1/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    console.log('Response:', response);

    const data = await response.json();

    console.log('Response Data:', data);

    if (response.ok && data.status === 'success') {
      console.log('Login successful:', data);

      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      window.location.href = './dashboard.html';
    } else {
      if (data.errors && Array.isArray(data.errors)) {
        data.errors.forEach(error => {
          console.error('Login Error:', error.msg || error.message || error);
        });
      } else {
        console.error('Login failed:', data.message || data);
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
});
