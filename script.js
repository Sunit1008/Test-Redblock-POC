let users = JSON.parse(localStorage.getItem("users") || "[]");

function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

function submitUser () {
  const email = document.getElementById("email").value;
  // Check if user already exists
  const existingUser  = users.find(u => u.email === email);
  if (existingUser ) {
    alert("Error: User already exists.");
    return;
  }

  const user = {
    first: document.getElementById("firstName").value,
    last: document.getElementById("lastName").value,
    dept: document.getElementById("department").value,
    email: email,
    manager: document.getElementById("manager").value,
    status: document.getElementById("status").value,
    role: document.getElementById("role").value
  };
  users.push(user);
  saveUsers();
  alert("User  added successfully.");
  window.location.href = "repository.html";
}

function populateTable() {
  const tbody = document.querySelector("#userTable tbody");
  tbody.innerHTML = "";
  users.forEach(user => {
    let row = `<tr>
      <td>${user.first}</td>
      <td>${user.last}</td>
      <td>${user.dept}</td>
      <td>${user.email}</td>
      <td>${user.manager}</td>
      <td>${user.status}</td>
      <td>${user.role}</td>
      <td>
        <button onclick="toggleUser Status('${user.email}')">${user.status === "Active" ? "Disable" : "Enable"}</button>
      </td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

if (window.location.pathname.includes("repository.html")) {
  populateTable();
}

function searchUser () {
  const email = document.getElementById("searchEmail").value;
  const user = users.find(u => u.email === email);
  if (user) {
    document.getElementById("editForm").style.display = "block";
    document.getElementById("editFirstName").value = user.first;
    document.getElementById("editLastName").value = user.last;
    document.getElementById("editDepartment").value = user.dept;
    document.getElementById("editManager").value = user.manager;
    document.getElementById("editEmail").value = user.email;
    document.getElementById("editRole").value = user.role;
  } else {
    alert("User  not found");
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

function toggleUser Status(email) {
  const user = users.find(u => u.email === email);
  if (user) {
    user.status = user.status === "Active" ? "Inactive" : "Active";
    saveUsers();
    alert(`User  ${user.status === "Active" ? "enabled" : "disabled"} successfully.`);
    populateTable(); // Refresh the table to reflect changes
  }
}
