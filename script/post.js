
async function sendPostData(data) {
    try {
      const response = await fetch('https://blogpost-server-production-d92d.up.railway.app/api/v1/blogs/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        console.log('Data sent successfully');
        
        window.location.href = './index.html';
      } else {
        console.error('Error sending data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  
  const form = document.querySelector('.form');
  
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
  
    
    const title = form.querySelector('input[type="text"]').value.trim();
    const image = form.querySelectorAll('input[type="text"]')[1].value.trim();
    const tag = form.querySelectorAll('input[type="text"]')[2].value.trim();
    const description = form.querySelector('.description').value.trim();
  
    
    if (!title || !image || !tag || !description) {
      console.error('Please fill in all fields');
      return;
    }
  

    const postData = {
      title,
      image,
      tag,
      description
    };
  
    sendPostData(postData);
  });
  