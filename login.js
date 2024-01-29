document.addEventListener('DOMContentLoaded', function () {
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask detected.');
      
      document.getElementById('loginForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission
  
        window.ethereum
          .request({ method: 'eth_requestAccounts' })
          .then(function (accounts) {
            const userAddress = accounts[0];
            console.log('Connected to MetaMask. User Address:', userAddress);
  
            // Log for debugging
            console.log('Redirecting to home.html');
  
            // Redirect to the home page or any other page you want
            window.location.href = 'home.html';
          })
          .catch(function (error) {
            console.error('MetaMask connection error:', error.message);
          });
      });
    } else {
      console.error('MetaMask not detected. Please install MetaMask extension.');
    }
  });
  



  
// document.addEventListener('DOMContentLoaded', function () {
//     const loginForm = document.getElementById('loginForm');
  
//     loginForm.addEventListener('submit', async function (event) {
//       event.preventDefault();
  
//       const username = document.getElementById('username').value;
//       const password = document.getElementById('password').value;
  
//       try {
//         const response = await fetch('http://localhost:3010/login', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ userId: username, password }),
//         });
  
//         if (!response.ok) {
//           throw new Error('Invalid credentials');
//         }
  
//         const userInfo = await response.json();
  
//         const metamaskAddress = userInfo.metamaskAddress;
//         if (metamaskAddress) {
//           connectToMetaMask(metamaskAddress);
//         } else {
//           alert('MetaMask address not found for the user.');
//         }
//       } catch (error) {
//         console.error('Error during login:', error.message);
//         alert('Invalid credentials. Check the console for details.');
//       }
//     });
  
    
  
//     function connectToMetaMask(metamaskAddress) {
//         if (typeof window.ethereum !== 'undefined') {
//           window.ethereum.enable()
//             .then(function (accounts) {
//               const userAddress = accounts[0];
    
//               // Check if the connected MetaMask address matches the one from the database
//               if (userAddress.toLowerCase() === metamaskAddress.toLowerCase()) {
//                 console.log('Connected to MetaMask. User Address:', userAddress);
//                 // Continue with your application logic or redirect to another page
//               } else {
//                 alert('MetaMask address mismatch');
//               }
//             })
//             .catch(function (error) {
//               console.error('MetaMask connection error:', error.message);
//               alert('MetaMask connection error');
//             });
//         } else {
//           console.error('MetaMask not detected. Please install MetaMask extension.');
//         }
//       }
//     });