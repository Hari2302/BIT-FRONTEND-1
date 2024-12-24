const logoutButton = document.getElementById("logoutButton");
const logoutModal = document.getElementById("logoutModal");
const cancelButton = document.getElementById("cancelButton");
const confirmLogoutButton = document.getElementById("confirmLogoutButton");

// When the logout button is clicked, show the modal
logoutButton.addEventListener("click", () => {
    logoutModal.style.display = "flex"; // Show the modal
});

// When the cancel button is clicked, close the modal
cancelButton.addEventListener("click", () => {
    logoutModal.style.display = "none"; // Hide the modal
});

// When the confirm logout button is clicked, perform logout logic
confirmLogoutButton.addEventListener("click", () => {
    // Add your logout functionality here
    
    logoutModal.style.display = "none"; // Hide the modal after logout

     window.location.href = "index.html";
});
