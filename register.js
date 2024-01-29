// register.js
document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const userEnteredAddress = document.getElementById('metamaskAddress').value;
  
    // Validate MetaMask address
    if (!isValidMetaMaskAddress(userEnteredAddress)) {
      alert('Invalid MetaMask address');
      return;
    }
  
    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
  
    
    const response = await fetch('http://localhost:3010/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    const result = await response.json();
    alert(result.message);
  
    if (result.success) {
      // Redirect to the web3.html page after successful registration
      window.location.href = 'web3.html';
    }
  });
  