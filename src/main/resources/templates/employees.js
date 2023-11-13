const API_URL = 'http://localhost:8080'

showEmployee();

function showEmployee() {
    axios.get(API_URL + `/api/employees`).then((res)=> {
        let employees = res.data;
        let str = `
        <button onclick="showEmployee()" type="button" class="btn btn-success">Home</button>
        <button onclick="formInputAdd()" type="button" class="btn btn-success">Add New</button>
        <button onclick="showSortByAgeEmployee()" type="button" class="btn btn-success">Sort By Age</button>

<table class="table table-striped">
    <thead>
    <tr>
        <th scope="col">EmployeesCode</th>
        <th scope="col">Name</th>
        <th scope="col">Age</th>
        <th scope="col">Salary</th>
        <th scope="col">Department</th>
        <th scope="col" colspan="2">Action</th>
    </tr>
    </thead>
    <tbody id="listEmployees">
        `
        for (let i = 0; i < employees.length; i++) {
            str += `
            <tr>
                <td>${employees[i].employeesCode}</td>
                <td onclick="findById(${employees[i].id})">${employees[i].name}</td>
                <td>${employees[i].age}</td>
                <td>${employees[i].salary}</td>
                <td onclick="findDepartment(${employees[i].department.id})">${employees[i].department.name}</td>
                <td><button onclick="formInputEdit(${employees[i].id})" type="button" class="btn btn-warning">Update</button></td>
                <td><button onclick="confirm(deleteEmployees(${employees[i].id}))" type="button" class="btn btn-danger">Delete</button></td>
            </tr>
            `
        }
        str += `</tbody>
</table>`
        document.getElementById("container").innerHTML = str;
    })
}

function formInputAdd() {

    axios.get(API_URL + `/api/department`).then((res)=> {
        let department = res.data;
        let str = `
<div class="container">
  <h1 style="text-align: center">Form Employees</h1>
  <div class="form-group">
    <label for="name">EmployeesCode</label>
    <input type="text" class="form-control" id="employeesCode" placeholder="EmployeesCode">
  </div>
  <div class="form-group">
    <label for="name">Name</label>
    <input type="text" class="form-control" id="name" placeholder="Name">
  </div>
  <div class="form-group">
    <label for="salary">Salary</label>
    <input type="text" class="form-control" id="salary" placeholder="Salary">
  </div>
  <div class="form-group">
    <label for="age">Age</label>
    <input type="text" class="form-control" id="age" placeholder="Age">
  </div>
  <div class="form-group">
    <label for="department">Department</label>
    <select id="department" class="form-control">`
        for (let i = 0; i < department.length; i++) {
            str += `<option id="${department[i].id}" value="${department[i].id}">${department[i].name}</option>`;
        }
    str += `</select>
  </div>
  <div style="text-align: center">
    <button onclick="saveAddEmployees()" type="submit" class="btn btn-primary">Save</button>
    <button onclick="showEmployee()" type="submit" class="btn btn-secondary">Back</button>
  </div>
</div>
        `
        document.getElementById("container").innerHTML = str;
    })
}

function formInputEdit(id) {

    Promise.all([
        axios.get(API_URL + `/api/department`),
        axios.get(API_URL + `/api/employees/` + id)
    ])
        .then((res) => {

        let employees = res[1].data;
        let department = res[0].data;
        let str = `
<div class="container">
  <h1 style="text-align: center">Form Employees</h1>
  <div class="form-group">
      <div class="form-group">
        <label for="name">EmployeesCode</label>
        <input value="${employees.employeesCode}" type="text" class="form-control" id="employeesCode" placeholder="EmployeesCode">
      </div>
    <label for="name">Name</label>
    <input value="${employees.name}" type="text" class="form-control" id="name" placeholder="Name">
    <input hidden="hidden" value="${employees.id}" type="text" class="form-control" id="id" placeholder="Name">
  </div>
  <div class="form-group">
    <label for="salary">Salary</label>
    <input value="${employees.salary}" type="text" class="form-control" id="salary" placeholder="Salary">
  </div>
  <div class="form-group">
    <label for="age">Age</label>
    <input value="${employees.age}" type="text" class="form-control" id="age" placeholder="Age">
  </div>
  <div class="form-group">
    <label for="department">Department</label>
    <select id="department" class="form-control">`
            for (let i = 0; i < department.length; i++) {
                str += `<option value="${department[i].id}">${department[i].name}</option>`;
            }
    str += `</select>
  </div>
  <div style="text-align: center">
    <button onclick="saveEditEmployees()" type="submit" class="btn btn-primary">Save</button>
    <button onclick="showEmployee()" type="submit" class="btn btn-secondary">Back</button>
  </div>
</div>
        `
        document.getElementById("container").innerHTML = str;
    })
}

function saveEditEmployees() {
    let id = document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let employeesCode = document.getElementById("employeesCode").value;
    let salary = document.getElementById("salary").value;
    let age = document.getElementById("age").value;
    let departmentID = document.getElementById("department").value;
    let data = {
        id: id,
        name: name,
        salary: salary,
        age: age,
        employeesCode: employeesCode,
        department: {
            id: departmentID
        }
    }
    axios.put(API_URL + `/api/employees`, data).then((response) => {
        showEmployee();
    })
}
function saveAddEmployees() {
    let name = document.getElementById("name").value;
    let employeesCode = document.getElementById("employeesCode").value;
    let salary = document.getElementById("salary").value;
    let age = document.getElementById("age").value;
    let departmentID = document.getElementById("department").value;
    let data = {
        name: name,
        salary: salary,
        age: age,
        employeesCode: employeesCode,
        department: {
            id: departmentID
        }
    }
    axios.post(API_URL + `/api/employees`, data).then((response) => {
        showEmployee();
    })
}

function deleteEmployees(id) {
    axios.put(API_URL + `/api/employees/` + id).then((res) => {
        showEmployee();
    })
}

function showSortByAgeEmployee() {
    axios.get(API_URL + `/api/employees`).then((res)=> {
        let employees = res.data;
        let compareById = (a,b) => {
            return -b.age + a.age;
        }
        employees.sort(compareById);
        let str = `
        <button onclick="showEmployee()" type="button" class="btn btn-success">Home</button>
        <button onclick="formInputAdd()" type="button" class="btn btn-success">Add New</button>
        <button onclick="showSortByAgeEmployee()" type="button" class="btn btn-success">Sort By Age</button>
<table class="table table-striped">
    <thead>
    <tr>
        <th scope="col">EmployeesCode</th>
        <th scope="col">Name</th>
        <th scope="col">Age</th>
        <th scope="col">Salary</th>
        <th scope="col">Department</th>
        <th scope="col" colspan="2">Action</th>
    </tr>
    </thead>
    <tbody id="listEmployees">
        `
        for (let i = 0; i < employees.length; i++) {
            str += `
            <tr>
                <td>${employees[i].employeesCode}</td>
                <td onclick="findById(${employees[i].id})">${employees[i].name}</td>
                <td>${employees[i].age}</td>
                <td>${employees[i].salary}</td>
                <td onclick="findDepartment(${employees[i].department.id})">${employees[i].department.name}</td>
                <td><button onclick="formInputEdit(${employees[i].id})" type="button" class="btn btn-warning">Update</button></td>
                <td><button onclick="deleteEmployees(${employees[i].id})" type="button" class="btn btn-danger">Delete</button></td>
            </tr>
            `
        }
        str += `</tbody>
</table>`
        document.getElementById("container").innerHTML = str;
    })
}
function findById(id){
    axios.get(API_URL + `/api/employees/` + id).then((res)=> {
        let employees = res.data;
        let str = `
            <h1>Employees Detail</h1>
            <p>Name: ${employees.name}</p>
            <p>Salary: ${employees.salary}</p>
            <p>Age: ${employees.age}</p>
            <p>Department: ${employees.department.name}</p>
            <button onclick="showEmployee()" type="submit" class="btn btn-secondary">Back</button>
        `
        document.getElementById("container").innerHTML = str;
    })
    
}

function findDepartment(id) {
    axios.get(API_URL + `/api/employees/findDepartment/` + id).then((res)=> {
        let employees = res.data;
        let str = `
        <button onclick="showEmployee()" type="button" class="btn btn-success">Home</button>
        <button onclick="formInputAdd()" type="button" class="btn btn-success">Add New</button>
        <button onclick="showSortByAgeEmployee()" type="button" class="btn btn-success">Sort By Age</button>

<table class="table table-striped">
    <thead>
    <tr>
        <th scope="col">EmployeesCode</th>
        <th scope="col">Name</th>
        <th scope="col">Age</th>
        <th scope="col">Salary</th>
        <th scope="col">Department</th>
        <th scope="col" colspan="2">Action</th>
    </tr>
    </thead>
    <tbody id="listEmployees">
        `
        for (let i = 0; i < employees.length; i++) {
            str += `
            <tr>
                <td>${employees[i].employeesCode}</td>
                <td onclick="findById(${employees[i].id})">${employees[i].name}</td>
                <td>${employees[i].age}</td>
                <td>${employees[i].salary}</td>
                <td onclick="findDepartment(${employees[i].department.id})">${employees[i].department.name}</td>
                <td><button onclick="formInputEdit(${employees[i].id})" type="button" class="btn btn-warning">Update</button></td>
                <td><button onclick="deleteEmployees(${employees[i].id})" type="button" class="btn btn-danger">Delete</button></td>
            </tr>
            `
        }
        str += `</tbody>
</table>`
        document.getElementById("container").innerHTML = str;
    })

}