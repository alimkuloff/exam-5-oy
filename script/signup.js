const form = document.querySelector('.form');

form.addEventListener('submit', async (e) => {

  e.preventDefault();

  const name = document.querySelector('#name').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value;

  if (!name || !email || !password) {
    console.error('All fields are required.');
    return;
  }

  const payload = { name, email, password };
  console.log('Payload:', payload);

  try {register
    const response = await fetch('https://blogpost-server-production-d92d.up.railway.app/api/v1/user/', {
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
      console.log('Registration successful:', data);
      window.location.href = './login.html';
    } else {
      if (data.errors && Array.isArray(data.errors)) {
        data.errors.forEach(error => {
          alert('Registration Error:', error.msg || error.message || error);
        });
      } else {
        alert('Registration failed:', data.message || data);
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
});
