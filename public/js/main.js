function onSubmit(e) {
  e.preventDefault();
  
  const prompt = document.querySelector('#prompt').value;
  const size = document.querySelector('#checkbox').checked;

  if (prompt === '') {
    alert('Please add some text');
    return;
  }
  generateImageRequest(prompt, size);
}

async function generateImageRequest(prompt, size) {
  try {
    document.querySelector('.image-container').innerHTML = '';
    showSpinner();
    const response = await fetch('http://localhost:5000/openai/generateimage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        size,
      }),
    });
    console.log(response);
    if (!response.ok) {
      removeSpinner();
      throw new Error('That image could not be generated');
    }

    const data = await response.json();
    console.log(data);

    const imageUrl = data.data;
    
    const image = document.querySelector('.image-container');
    const markup = document.createElement('img');
    console.log(imageUrl);
    markup.src = imageUrl;
    image.insertAdjacentElement('beforeend', markup);
    const link = document.createElement('a');
    link.href = (imageUrl);
    link.target = ('_blank');
    link.classList.add('link-style');
    link.innerHTML = `<i class="fa-solid fa-download fa-2x"></i>`;
    image.insertAdjacentElement('beforeend',link);


    removeSpinner();
  } catch (error) {
    removeSpinner();
    const message = document.querySelector('.image-container');
    const title = document.createElement('h2');
    title.classList.add('msg');
    title.textContent = error;
    message.insertAdjacentElement('afterbegin', title);
  }
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function removeSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

document.querySelector('#image-form').addEventListener('submit', onSubmit);
