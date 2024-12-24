const apiUrl = "http://localhost:5218/api/auth";

let currentForm = null; // Track the currently opened form

// Toggle the employee panel when the 'Add Employee' button is clicked
document.getElementById("addEmployeeBtn").addEventListener("click", () => {
    const empPanel = document.getElementById("empPanel");

    // Toggle visibility
    if (empPanel.style.display === "none" || empPanel.style.display === "") {
        empPanel.style.display = "flex";
        hideAllSections();
    } else {
        empPanel.style.display = "none";
        hideAllSections();
    }
});

// Function to toggle forms dynamically
function toggleForm(formId) {
    const form = document.getElementById(formId);
    if (currentForm === form) {
        form.style.display = "none";
        currentForm = null;
    } else {
        hideAllForms(); // Close all open forms
        form.style.display = "block";
        currentForm = form;
    }
}

// Hide all forms
function hideAllForms() {
    const forms = document.querySelectorAll(".form-container");
    forms.forEach(form => (form.style.display = "none"));
    currentForm = null;
}

// Hide all sections (employee and application)
function hideAllSections() {
    document.getElementById("employeeSection").style.display = "none";
    document.getElementById("applicationSection").style.display = "none";
}

// Initialize page on load
window.onload = () => {
    hideAllForms();
    document.getElementById("empPanel").style.display = "none";
};

// Add event listeners for role buttons
["intern", "fresher", "experience"].forEach(role => {
    document.getElementById(role).addEventListener("click", () =>
        toggleForm(`${role}FormContainer`)
    );
});

// Form submission handler
async function handleSubmit(formId, endpoint) {
    const form = document.getElementById(formId);
    form.addEventListener("submit", async event => {
        event.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(`${apiUrl}/${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                showSuccessMessage(formId, "Submitted successfully!");
            } else {
                const errorMessage = await response.text();
                alert(`Error: ${errorMessage}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred during form submission.");
        }
    });
}

// Show success message
function showSuccessMessage(formId, message) {
    const successMessage = document.querySelector(`#${formId} .success-message`);
    successMessage.textContent = message;
    successMessage.style.display = "block";
    setTimeout(() => (successMessage.style.display = "none"), 3000);
}

// Attach handlers for each form
handleSubmit("internForm", "intern");
handleSubmit("fresherForm", "fresher");
handleSubmit("experienceForm", "experience");
