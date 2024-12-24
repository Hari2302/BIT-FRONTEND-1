const apiUrl = "http://localhost:5218/api/auth"; // Replace with your actual API URL

// Switch to Login Form
 document.getElementById("show-login").addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default action of the anchor tag
    document.getElementById("register-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
  

});

// Switch to Registration Form
document.getElementById("show-register").addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default action of the anchor tag
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "block";

});

// Function to show modal with a specific message
function showModal(modalId, message) {
    document.getElementById(modalId).style.display = 'flex';
    if (modalId === 'successModal') {
      document.getElementById('successMessage').textContent = message;
    } else if (modalId === 'errorModal') {
      document.getElementById('errorMessage').textContent = message;
    }
  }
  
  // Function to close the modal
  function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
  }
  
  // Registration Form Logic
  document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const userData = {
      name: document.getElementById("register-name").value,
      email: document.getElementById("register-email").value,
      password: document.getElementById("register-password").value,
    };
  
    try {
      const response = await fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
  
      const message = await response.text();
  
      if (message.toLowerCase().includes("successful")) {
        // Show success message and switch to login form
        showModal('successModal', message);
        document.getElementById("register-form").style.display = "none";
        document.getElementById("login-form").style.display = "block";
      } else {
        showModal('errorModal', message); // Show error if registration fails
      }
    } catch (error) {
      console.error("Registration error:", error);
      showModal('errorModal', "An error occurred during registration.");
    }
  });
  
  // Login Form Logic
  document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const loginData = {
      email: document.getElementById("login-email").value,
      password: document.getElementById("login-password").value,
    };
  
    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
  
      const message = await response.text();
  
      // Extract email and password from input fields
      const { email, password } = loginData;
  
      if (message.toLowerCase().includes("successful")) {
        if (email === "admin@gmail.com" && password === "admin123") {
          // Redirect to Employee Management System for admin
          // Show a success message (optional)
          const modal = document.getElementById("successModal"); // Example modal for success
          modal.style.display = "block"; // Show success modal
          
          // Redirect to Employee Management System for admin after 10 seconds
          setTimeout(() => {
              window.location.href = "employee_management.html";
          }, 800); // 10000ms = 10 seconds
        } else {
              // Redirect to Employee Management System for admin
          // Show a success message (optional)
          const modal = document.getElementById("successModal"); // Example modal for success
          modal.style.display = "block"; // Show success modal
          
          // Redirect to Employee Management System for admin after 10 seconds
          setTimeout(() => {
              window.location.href = "career.html";
          }, 800); // 10000ms = 10 seconds
        }
  
        // Show success message
        showModal('successModal', message);
      } else {   const modal = document.getElementById("successModal"); // Example modal for success
        modal.style.display = "block"; // Show success modal
        
        // Redirect to Employee Management System for admin after 10 seconds
        setTimeout(() => {
            showModal('errorModal', "Invalid login credentials."); // Show error for invalid login
        }, 800); // 10000ms = 10 seconds
      }
    } catch (error) {
      console.error("Login error:", error);
      showModal('errorModal', "An error occurred during login.");
    }
  });
  





  
  