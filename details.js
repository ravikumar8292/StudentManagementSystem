const express = require("express");

const bodyParser = require("body-parser");
const employees = [
  {
    employeeId: "1",
    employeeName: "Ravi Kumar",
    employeePost: "Manager",
    employeeSalary: "90000",
    Totalworkingdays:"30",
    Totalpresentdays:"15",

  },
  {
    employeeId: "2",
    employeeName: "Rohit kumar bansal",
    employeePost: "HR",
    employeeSalary: "20000",
    Totalworkingdays:"30",
    Totalpresentdays:"15",
  },
  {
    employeeId: "3",
    employeeName: "sohan kumar bansal",
    employeePost: "HR",
    employeeSalary: "40000",
    Totalworkingdays:"30",
    Totalpresentdays:"15",
  },
];
  
const app = express();
  
app.set("view engine", "ejs");
  
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
  
app.get("/", function (req, res) {
  res.render("home", {
    data: employees,
  });
});
  
app.post("/", (req, res) => {
  const inputEmployeeId = employees.length + 1;
  const inputEmployeeName = req.body.employeeName;
  const inputEmployeePost = req.body.employeePost;
  const inputEmployeeSalary = req.body.employeeSalary;
  const inputEmployeetotalworkingdays = req.body.Totalworkingdays;
  const inputEmployeetotalpresentdays = req.body.Totalpresentdays;
  
  employees.push({
    employeeId: inputEmployeeId,
    employeeName: inputEmployeeName,
    employeePost: inputEmployeePost,
    employeeSalary: inputEmployeeSalary,
    Totalworkingdays: inputEmployeetotalworkingdays,
    Totalpresentdays: inputEmployeetotalpresentdays,
  });
  
  res.render("home", {
    data: employees,
  });
});
  
app.post("/delete", (req, res) => {
  var requestedEmployeeId = req.body.employeeId;
  var j = 0;
  employees.forEach((employee) => {
    j = j + 1;
    if (employee.employeeId === requestedEmployeeId) {
      employees.splice(j - 1, 1);
    }
  });
  res.render("home", {
    data: employees,
  });
});
  
app.post("/update", (req, res) => {
  const requestedEmployeeId = req.body.employeeId;
  const inputEmployeeName = req.body.employeeName;
  const inputEmployeePost = req.body.employeePost;
  const inputEmployeeSalary = req.body.employeeSalary;
  const inputEmployeetotalworkingdays = req.body.Totalworkingdays;
  const inputEmployeetotalpresentdays = req.body.Totalpresentdays;

  var j = 0;
  employees.forEach((employee) => {
    j = j + 1;
    if (employee.employeeId == requestedEmployeeId) {
      (employee.employeeName = inputEmployeeName),
        (employee.employeePost = inputEmployeePost),
        (employee.employeeSalary = inputEmployeeSalary),
        (employee.Totalworkingdays = inputEmployeetotalworkingdays),
        (employee.Totalpresentdays = inputEmployeetotalpresentdays);
    }
  });

  res.render("home", {
    data: employees,
  });
});
// app.post("/about", (req, res) => {
//   res.send("this is about page");

// }
// );
app.get('/about', function (req, res) {
  res.render("this is about page");
});
app.listen(3000, (req, res) => {
  console.log("App is running on port 3000");
});