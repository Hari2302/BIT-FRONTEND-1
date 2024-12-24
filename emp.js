const apiUrl = "http://localhost:5218/api/auth";


let currentForm = null; // Track the currently opened form

// Toggle the employee panel when the 'Add Employee' button is clicked
document.getElementById("addEmployeeBtn").addEventListener("click", () => {
    const empPanel = document.getElementById("empPanel");

    // Toggle the visibility of the panel and hide any open form
    if (empPanel.style.display === "none" || empPanel.style.display === "") {
        empPanel.style.display = "flex";
        employeeSection.style.display = "none";
        applicationSection.style.display = "none";
          
        hideAllForms();
    } else {
        empPanel.style.display = "none";
        employeeSection.style.display = "none";
        applicationSection.style.display = "none";
   
        hideAllForms();
    }
});

// Function to show/hide a form dynamically
function toggleForm(formId) {
    const form = document.getElementById(formId);

    // If the clicked form is already open, close it
    if (currentForm === form) {
        form.style.display = "none";
        currentForm = null;
    } else {
        hideAllForms(); // Close any open forms
        form.style.display = "block";
        currentForm = form; // Track the currently opened form
    }
}

// Hide all forms
function hideAllForms() {
    document.getElementById("internFormContainer").style.display = "none";
    document.getElementById("fresherFormContainer").style.display = "none";
    document.getElementById("experienceFormContainer").style.display = "none";
    currentForm = null; // Reset the current form tracker
}

// Event Listeners for role buttons
document.getElementById("intern").addEventListener("click", () => toggleForm("internFormContainer"));
document.getElementById("fresher").addEventListener("click", () => toggleForm("fresherFormContainer"));
document.getElementById("experience").addEventListener("click", () => toggleForm("experienceFormContainer"));

// Ensure forms are hidden when the page loads
window.onload = function() {
    hideAllForms();
    document.getElementById("empPanel").style.display = "none";
};


//   Submit details of fresher
document.getElementById("internForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Create an object with form data
    const internData = {
        name: document.getElementById("intern-name").value,
        email: document.getElementById("intern-email").value,
        phone: document.getElementById("intern-phone").value,
        role: document.getElementById("intern-role").value,
        type: document.getElementById("intern-type").value,
        salary: document.getElementById("intern-salary").value,
        Exp: document.getElementById("intern-year").value
    };

    try {
        const response = await fetch(`${apiUrl}/intern`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(internData),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            alert(`Error: ${errorMessage}`);
            return;
        }

        // Show the success message near the submit button
        const successMessageElement = document.getElementById('internSuccessMessage');
        successMessageElement.textContent = "Submitted successfully!";
        successMessageElement.style.display = "block"; // Show the success message

        // Optionally hide the success message after 3 seconds
        setTimeout(() => {
            successMessageElement.style.display = "none";
        }, 3000); // Hide after 3 seconds

    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred during form submission.");
    }
});




// Fresher form submission handling
document.getElementById("fresherForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Create an object with form data
    const fresherData = {
        name: document.getElementById("fresher-name").value,
        email: document.getElementById("fresher-email").value,
        phone: document.getElementById("fresher-phone").value,
        role: document.getElementById("fresher-role").value,
        type: document.getElementById("fresher-type").value,
        salary: document.getElementById("fresher-salary").value,
        Exp: document.getElementById("fresher-year").value
    };

    console.log("Fresher Form Data Sent:", fresherData);  

    try {
        const response = await fetch(`${apiUrl}/fresher`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(fresherData),
        })

        if (response.ok) {
            console.log("Response:", response);
            // Show the success message near the submit button for Fresher form
            const successMessageElement = document.getElementById('fresherSuccessMessage');
            successMessageElement.textContent = "Submitted successfully!";
            successMessageElement.style.display = "block"; // Show the success message

            // Optionally hide the success message after 3 seconds
            setTimeout(() => {
                successMessageElement.style.display = "none";
            }, 3000); // Hide after 3 seconds
        } else {
            const errorMessage = await response.text();
            console.error("Error Response from API:", errorMessage); // Log error response for debugging
            alert(`Error: ${errorMessage}`); // Display the error message
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred during form submission.");
    }
});

// Experience form submission handling
document.getElementById("experienceForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Create an object with form data
    const experienceData = {
        name: document.getElementById("exp-name").value,
        email: document.getElementById("exp-email").value,
        phone: document.getElementById("exp-phone").value,
        role: document.getElementById("exp-role").value,
        type: document.getElementById("exp-type").value,
        salary: document.getElementById("exp-salary").value,
        Exp: document.getElementById("exp-year").value
    };

    console.log("Experience Form Data Sent:", experienceData);  // Log form data for debugging

    try {
        const response = await fetch(`${apiUrl}/experience`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(experienceData),
        });

        if (response.ok) {
            // Show the success message near the submit button for Experience form
            const successMessageElement = document.getElementById('experienceSuccessMessage');
            successMessageElement.textContent = "Submitted successfully!";
            successMessageElement.style.display = "block"; // Show the success message

            // Optionally hide the success message after 3 seconds
            setTimeout(() => {
                successMessageElement.style.display = "none";
            }, 3000); // Hide after 3 seconds
        } else {
            const errorMessage = await response.text();
            console.error("Error Response from API:", errorMessage); // Log error response for debugging
            alert(`Error: ${errorMessage}`); // Display the error message
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred during form submission.");
    }
});

const viewEmployeesBtn = document.getElementById("viewEmployeesBtn");
const employeeSection = document.getElementById("employeeSection");
const searchInput = document.getElementById("searchInput");
const employeeListContainer = document.getElementById("employeeListContainer");

let employeesData = []; // Array to store employee data

// Toggle the employee section when the "View Employees" button is clicked
viewEmployeesBtn.addEventListener("click", () => {
    if (employeeSection.style.display === "block") {
        // Hide employee section
        empPanel.style.display = "none";  
        applicationSection.style.display = "none";
        employeeSection.style.display = "none";
        document.getElementById("internFormContainer").style.display = "none";
        document.getElementById("fresherFormContainer").style.display = "none";
        document.getElementById("experienceFormContainer").style.display = "none";
    } else {
        // Show employee section
        employeeSection.style.display = "block";
        empPanel.style.display = "none";  
        applicationSection.style.display = "none";
        document.getElementById("internFormContainer").style.display = "none";
        document.getElementById("fresherFormContainer").style.display = "none";
        document.getElementById("experienceFormContainer").style.display = "none";
        fetchEmployeeData(); // Fetch employee data when the button is clicked
    }
});

// Fetch and display employee data (interns, freshers, experiences)
async function fetchEmployeeData() {
    try {
        const internResponse = await fetch(`${apiUrl}/Interns`);
        const fresherResponse = await fetch(`${apiUrl}/Freshers`);
        const experienceResponse = await fetch(`${apiUrl}/Experiences`);

        const interns = await internResponse.json();
        const freshers = await fresherResponse.json();
        const experiences = await experienceResponse.json();

        // Combine all employee data into a single array
        employeesData = [...interns, ...freshers, ...experiences];
        displayEmployeeData(employeesData);
    } catch (error) {
        console.error("Error fetching employee data:", error);
    }
}

// Display employee data dynamically in a table
function displayEmployeeData(employees) {
    // Clear previous content
    employeeListContainer.innerHTML = '';

    if (employees.length === 0) {
        employeeListContainer.innerHTML = "<p>No employees found</p>";
        return;
    }

    employees.forEach((employee, index) => {
        const employeeRow = document.createElement('tr');
        employeeRow.dataset.email = employee.email;
        employeeRow.dataset.type = employee.type; // Set the data-type attribute here

        employeeRow.innerHTML = `
            <td>${index + 1}</td>
            <td><input type="text" value="${employee.name}" class="name-input" readonly></td>
            <td><input type="text" value="${employee.email}" class="email-input" readonly></td>
            <td><input type="text" value="${employee.phone}" class="phone-input" readonly></td>
            <td><input type="text" value="${employee.role}" class="role-input" readonly></td>
            <td><input type="text" value="${employee.type}" class="type-input" readonly></td>
            <td><input type="text" value="${employee.salary}" class="salary-input" readonly></td>
            <td> <input type="text" value="${employee.exp}" class="experience-input" readonly></td>
            <td>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;

        employeeListContainer.appendChild(employeeRow);
    });

    // Add event listeners for edit and delete buttons
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => button.addEventListener('click', handleEdit));

    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => button.addEventListener('click', handleDelete));
}

// Function to show a modal with a custom message
function showModal(modalId, message) {
    const modal = document.getElementById(modalId);
    const modalContent = modal.querySelector('.modal-content');
    modalContent.textContent = message;

    // Show the modal
    modal.style.display = 'block';

    // Hide the modal after 5 seconds
    setTimeout(() => {
        modal.style.display = 'none';
    }, 800); // Hide after 5 seconds
}

// Edit employee handler
async function handleEdit(event) {
    const button = event.target; // The clicked button
    const row = button.closest('tr'); // Row containing the employee data
    const inputs = row.querySelectorAll('input');

    // Toggle between "Edit" and "Save"
    if (button.textContent === 'Edit') {
        button.textContent = 'Save';
        inputs.forEach(input => {
            input.removeAttribute('readonly');
            document.querySelector('.type-input').setAttribute('readonly', 'readonly');
            input.style.backgroundColor = '#fff'; // Indicate edit mode
        });
    } else if (button.textContent === 'Save') {
        button.textContent = 'Edit';
        inputs.forEach(input => {
            input.setAttribute('readonly', 'readonly');
            input.style.backgroundColor = ''; // Reset background color
        });

        // Prepare updated employee data
        const updatedEmployee = {
            name: row.querySelector('.name-input').value,
            email: row.querySelector('.email-input').value,
            phone: row.querySelector('.phone-input').value,
            role: row.querySelector('.role-input').value,
            type: row.querySelector('.type-input').value,
            salary: row.querySelector('.salary-input').value,
            exp: row.querySelector('.experience-input').value,
        };
        console.log(updatedEmployee);

        try {
            const response = await fetch(`${apiUrl}/${updatedEmployee.type}/${updatedEmployee.email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedEmployee),
            });

            if (response.ok) {
                showModal('successModal', 'Employee updated successfully!');
                fetchEmployeeData(); // Refresh employee list
            } else {
                showModal('errorModal', 'Failed to update employee.');
            }
        } catch (error) {
            console.error('Error updating employee:', error);
            showModal('errorModal', 'An error occurred while updating employee.');
        }
    }
}

// Delete employee handler
async function handleDelete(event) {
    const button = event.target; // The clicked button
    const row = button.closest('tr'); // Row containing the employee data
    const email = row.dataset.email;
    const type = row.dataset.type.toLowerCase(); // Get the data-type attribute
    console.log('Type:', type); // Debugging
    console.log('Email:', email); // Debugging

    try {
        // Dynamically construct the API URL
        const response = await fetch(`${apiUrl}/${type}/${email}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            showModal('successModal', 'Employee deleted successfully!');
            fetchEmployeeData(); // Refresh employee list
        } else {
            showModal('errorModal', 'Failed to delete employee.');
        }
    } catch (error) {
        console.error('Error deleting employee:', error);
        showModal('errorModal', 'An error occurred while deleting employee.');
    }
}

// Search functionality
searchInput.addEventListener('input', () => {
    const searchText = searchInput.value.toLowerCase();
    const filteredEmployees = employeesData.filter(employee => {
        return (
            employee.name?.toLowerCase().includes(searchText) ||
            employee.email?.toLowerCase().includes(searchText) ||
            employee.phone?.toLowerCase().includes(searchText)
        );
    });
    displayEmployeeData(filteredEmployees);
});


// MANAGE APPLICATION 

const manageApplicationsBtn = document.getElementById("manageApplicationsBtn");
const applicationSection = document.getElementById("applicationSection");
const applicationListContainer = document.getElementById("applicationListContainer");

// Toggle the application section when the "Manage Applications" button is clicked
manageApplicationsBtn.addEventListener("click", () => {
    if (applicationSection.style.display === "block") {
        // Hide application section
        applicationSection.style.display = "none";
        employeeSection.style.display = "none";
        empPanel.style.display = "none";    
    
    } else {
        // Show application section
        applicationSection.style.display = "block";
        employeeSection.style.display = "none";
        empPanel.style.display = "none";    
        fetchApplicationData(); // Fetch application data when the button is clicked
    }
});
// Fetch and display application data
async function fetchApplicationData() {
    try {
        const response = await fetch(`${apiUrl}/Application`);
        const applications = await response.json();

        // Display application data
        displayApplicationData(applications);
    } catch (error) {
        console.error("Error fetching application data:", error);
    }
}

// Display application data dynamically in a table
function displayApplicationData(applications) {
    // Clear previous content
    applicationListContainer.innerHTML = '';

    if (applications.length === 0) {
        applicationListContainer.innerHTML = "<p>No applications found</p>";
        return;
    }

    applications.forEach((application, index)  => {
        const applicationRow = document.createElement('tr');

        applicationRow.innerHTML = `
            <td>${index+1}</td>    
            <td>${application.name}</td>
            <td>${application.email}</td>
            <td><a href="${application.resume}" target="_blank">View Resume</a></td>
            <td>${application.role}</td>
            <td>${application.status}</td>
            <td>
                <button class="approve-btn" data-id="${application.id}" data-status="Approved">Approve</button>
                <button class="deny-btn" data-id="${application.id}" data-status="Denied">Deny</button>
            </td>
        `;

        applicationListContainer.appendChild(applicationRow);
    });

    // Add event listeners for approve and deny buttons
    const approveButtons = document.querySelectorAll('.approve-btn');
    approveButtons.forEach(button => {
        button.addEventListener('click', handleApprove);
    });

    const denyButtons = document.querySelectorAll('.deny-btn');
    denyButtons.forEach(button => {
        button.addEventListener('click', handleDeny);
    });
}

// Handle approval of an application
async function handleApprove(event) {
    const applicationId = event.target.getAttribute('data-id');
    const status = event.target.getAttribute('data-status'); // Get status from data-status attribute

    try {
        // Send PUT request to approve the application
        const response = await fetch(`${apiUrl}/Application/${applicationId}/approve`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }) // Send the status to be updated
        });

        if (response.ok) {
            // alert('Application approved!');
            fetchApplicationData(); // Re-fetch application data after approval
        } else {
            alert('Failed to approve application.');
        }
    } catch (error) {
        console.error('Error approving application:', error);
    }
}

// Handle denial of an application
async function handleDeny(event) {
    const applicationId = event.target.getAttribute('data-id');
    const status = event.target.getAttribute('data-status'); // Get status from data-status attribute

    try {
        // Send PUT request to deny the application
        const response = await fetch(`${apiUrl}/Application/${applicationId}/deny`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }) // Send the status to be updated
        });

        if (response.ok) {
            // alert('Application denied!');
            fetchApplicationData(); // Re-fetch application data after denial
        } else {
            alert('Failed to deny application.');
        }
    } catch (error) {
        console.error('Error denying application:', error);
    }
}



