let users = JSON.parse(localStorage.getItem("users") || "[]");

function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

function submitUser () {
  const userEmail = document.getElementById("email").value;
  // Check if the user already exists
  const existingUser  = users.find(u => u.email === userEmail);
  if (existingUser ) {
    alert("User  already exists.");
    return; // Prevent creating the user
  }

  const user = {
    first: document.getElementById("firstName").value,
    last: document.getElementById("lastName").value,
    dept: document.getElementById("department").value,
    email: userEmail,
    manager: document.getElementById("manager").value,
    status: document.getElementById("status").value,
    role: document.getElementById("role").value
  };
  users.push(user);
  saveUsers();
  window.location.href = "repository.html";
}

function populateTable() {
  const tbody = document.querySelector("#userTable tbody");
  tbody.innerHTML = "";
  users.forEach(user => {
    // Add clickable status with visual feedback
    let row = `<tr>
      <td>${user.first}</td>
      <td>${user.last}</td>
      <td>${user.dept}</td>
      <td>${user.email}</td>
      <td>${user.manager}</td>
      <td onclick="toggleUserStatus('${user.email}')" 
          style="cursor: pointer; ${user.status === 'Active' ? 'color: green;' : 'color: red;'}">
        ${user.status} (click to toggle)
      </td>
      <td>${user.role}</td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

if (window.location.pathname.includes("repository.html")) {
  populateTable();
}

function searchUser() {
  const email = document.getElementById("searchEmail").value.trim();

  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (user) {
    document.getElementById("editForm").style.display = "block";
    document.getElementById("editFirstName").value = user.first || "";
    document.getElementById("editLastName").value = user.last || "";
    document.getElementById("editDepartment").value = user.dept || "";
    document.getElementById("editManager").value = user.manager || "";
    document.getElementById("editEmail").value = user.email || "";
    document.getElementById("editRole").value = user.role || "None";

    // Update button text based on status
    const toggleBtn = document.getElementById("toggleUserBtn");
    toggleBtn.textContent = user.status === "Inactive" ? "Enable User" : "Disable User";
  } else {
    alert("User not found!");
    document.getElementById("editForm").style.display = "none";
  }
}

function updateUser () {
  const email = document.getElementById("editEmail").value;
  const user = users.find(u => u.email === email);
  if (user) {
    user.first = document.getElementById("editFirstName").value;
    user.last = document.getElementById("editLastName").value;
    user.dept = document.getElementById("editDepartment").value;
    user.manager = document.getElementById("editManager").value;
    user.role = document.getElementById("editRole").value;
    saveUsers();
    alert("User  updated.");
    window.location.href = "repository.html";
  }
}

function toggleUserStatus() {
  const email = document.getElementById("editEmail").value;
  const user = users.find(u => u.email === email);

  if (user) {
    user.status = user.status === "Active" ? "Inactive" : "Active";
    saveUsers();

    // Update button text after toggle
    const toggleBtn = document.getElementById("toggleUserBtn");
    toggleBtn.textContent = user.status === "Inactive" ? "Enable User" : "Disable User";

    alert(`User is now ${user.status}.`);
  }
}
