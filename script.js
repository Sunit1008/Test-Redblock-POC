let users = JSON.parse(localStorage.getItem("users") || "[]");

function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

function submitUser() {
  const email = document.getElementById("email").value;
  const existingUser = users.find(u => u.email === email);
  
  if (existingUser) {
    alert("Error: User already exists.");
    return false;
  }

  const user = {
    first: document.getElementById("firstName").value,
    last: document.getElementById("lastName").value,
    dept: document.getElementById("department").value,
    email: email,
    manager: document.getElementById("manager").value,
    status: "Active",
    role: document.getElementById("role").value
  };
  
  users.push(user);
  saveUsers();
  alert("User added successfully!");
  window.location.href = "repository.html";
  return false;
}

function populateTable() {
  const tbody = document.querySelector("#userTable tbody");
  tbody.innerHTML = "";
  
  users.forEach((user) => {
    const row = document.createElement("tr");
    
    row.innerHTML = `
      <td>${user.first}</td>
      <td>${user.last}</td>
      <td>${user.dept}</td>
      <td>${user.email}</td>
      <td>${user.manager}</td>
      <td>${user.status}</td>
      <td>${user.role}</td>
      <td>
        <button onclick="toggleUserStatus('${user.email}', this)" 
                class="status-btn ${user.status === 'Active' ? 'btn-disable' : 'btn-enable'}">
          ${user.status === 'Active' ? 'Disable' : 'Enable'}
        </button>
      </td>
    `;
    
    tbody.appendChild(row);
  });
}

if (window.location.pathname.includes("repository.html")) {
  document.addEventListener('DOMContentLoaded', populateTable);
}

function searchUser() {
  const email = document.getElementById("searchEmail").value.trim();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (user) {
    document.getElementById("editForm").style.display = "block";
    document.getElementById("editFirstName").value = user.first;
    document.getElementById("editLastName").value = user.last;
    document.getElementById("editDepartment").value = user.dept;
    document.getElementById("editManager").value = user.manager;
    document.getElementById("editEmail").value = user.email;
    document.getElementById("editRole").value = user.role;
    document.getElementById("toggleUserBtn").textContent = user.status === "Active" ? "Disable" : "Enable";
  } else {
    alert("User not found!");
  }
}

function updateUser() {
  const email = document.getElementById("editEmail").value;
  const user = users.find(u => u.email === email);
  
  if (user) {
    user.first = document.getElementById("editFirstName").value;
    user.last = document.getElementById("editLastName").value;
    user.dept = document.getElementById("editDepartment").value;
    user.manager = document.getElementById("editManager").value;
    user.role = document.getElementById("editRole").value;
    
    saveUsers();
    alert("User updated successfully!");
    window.location.href = "repository.html";
  }
}

function toggleUserStatus(email, button) {
  const user = users.find(u => u.email === email);
  if (user) {
    user.status = user.status === "Active" ? "Inactive" : "Active";
    
    if (button) {
      button.textContent = user.status === "Active" ? "Disable" : "Enable";
      button.className = `status-btn ${user.status === 'Active' ? 'btn-disable' : 'btn-enable'}`;
    }
    
    saveUsers();
    alert(`User has been ${user.status === "Active" ? "enabled" : "disabled"}`);
    
    if (window.location.pathname.includes("repository.html")) {
      populateTable();
    }
  }
}
