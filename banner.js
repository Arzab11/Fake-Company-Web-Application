document.getElementById('set').addEventListener('click', () => {
  const saleMessage = document.getElementById('saleMessage').value;
  fetch('/api/sale', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: saleMessage }),
  })
  .then(response => {
      if (response.status == 200) {
          console.log('Success');
      } else {
          console.error('Fail');
      }
  })
  .catch(error => {
      console.error('Error:', error);
  });
});

document.getElementById('delete').addEventListener('click', () => {
  fetch('/api/sale', {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
      },
  })
  .then(response => {
      if (response.status == 200) {
          console.log('Successful delete');
      } else {
          console.error('Failure to delete');
      }
  })
  .catch(error => {
      console.error('Error:', error);
  });
});