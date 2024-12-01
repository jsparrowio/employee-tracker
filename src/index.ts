import DB from "./db/index.js";
import logo from "asciiart-logo";
import inquirer from "inquirer";

// import DB class for all DB functions and queries
const db = new DB();

// init the main function to start and run the program
init();

// init function that displays logo and runs main menu
function init() {
    const logoText = logo({ name: "Employee Tracker" }).render();

    console.log(logoText);

    loadMainPrompts();
}

// main menu function that allows user selection of what they would like to do
function loadMainPrompts() {
    inquirer.prompt(
        [
            {
                type: 'list',
                name: 'choice',
                message: "What would you like to do?",
                choices: [
                    {
                        name: "View all departments",
                        value: "VIEW_DEPARTMENTS"
                    },
                    {
                        name: "Add a department",
                        value: "ADD_DEPARTMENT"
                    },
                    {
                        name: "Delete a department",
                        value: "DELETE_DEPARTMENT"
                    },
                    {
                        name: "Change a department name",
                        value: "UPDATE_DEPARTMENT"
                    },
                    {
                        name: "View all roles",
                        value: "VIEW_ROLES"
                    },
                    {
                        name: "View roles by department",
                        value: "VIEW_ROLES_BY_DEPARTMENT"
                    },
                    {
                        name: "Add a role",
                        value: "ADD_ROLE"
                    },
                    {
                        name: "Delete a role",
                        value: "DELETE_ROLE"
                    },
                    {
                        name: "Change a roles title",
                        value: "UPDATE_ROLE_TITLE"
                    },
                    {
                        name: "Change a roles salary",
                        value: "UPDATE_ROLE_SALARY"
                    },
                    {
                        name: "View all employees",
                        value: "VIEW_EMPLOYEES"
                    },
                    {
                        name: "View employees by department",
                        value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
                    },
                    {
                        name: "View employees by role",
                        value: "VIEW_EMPLOYEES_BY_ROLE"
                    },
                    {
                        name: "View employees by manager",
                        value: "VIEW_EMPLOYEES_BY_MANAGER"
                    },
                    {
                        name: "Add an employee",
                        value: "ADD_EMPLOYEE"
                    },
                    {
                        name: "Delete an employee",
                        value: "DELETE_EMPLOYEE"
                    },
                    {
                        name: "Change an employees name",
                        value: "UPDATE_EMPLOYEE_NAME"
                    },
                    {
                        name: "Change an employees role",
                        value: "UPDATE_EMPLOYEE_ROLE"
                    },
                    {
                        name: "Change an employees manager",
                        value: "UPDATE_EMPLOYEE_MANAGER"
                    },
                    {
                        name: "Exit",
                        value: "EXIT"
                    },
                ]
            }
        ]
    )
        .then(res => {
            const choice = res.choice;

            switch (choice) {
                case 'VIEW_DEPARTMENTS':
                    viewAllDepartments();
                    break;
                case 'ADD_DEPARTMENT':
                    addDepartment();
                    break;
                case 'DELETE_DEPARTMENT':
                    deleteDepartment();
                    break;
                case 'UPDATE_DEPARTMENT':
                    updateDepartment();
                    break;
                case 'VIEW_ROLES':
                    viewAllRoles();
                    break;
                case 'VIEW_ROLES_BY_DEPARTMENT':
                    viewRolesByDepartment();
                    break;
                case 'ADD_ROLE':
                    addRole();
                    break;
                case 'DELETE_ROLE':
                    deleteRole();
                    break;
                case 'UPDATE_ROLE_TITLE':
                    changeRoleTitle();
                    break;
                case 'UPDATE_ROLE_SALARY':
                    changeRoleSalary();
                    break;
                case 'VIEW_EMPLOYEES':
                    viewAllEmployees();
                    break;
                case 'VIEW_EMPLOYEES_BY_DEPARTMENT':
                    viewEmployeesByDepartment();
                    break;
                case 'VIEW_EMPLOYEES_BY_ROLE':
                    viewEmployeesByRole();
                    break;
                case 'VIEW_EMPLOYEES_BY_MANAGER':
                    viewEmployeesByManager();
                    break;
                case 'ADD_EMPLOYEE':
                    addEmployee();
                    break;
                case 'DELETE_EMPLOYEE':
                    deleteEmployee();
                    break;
                case 'UPDATE_EMPLOYEE_NAME':
                    changeEmployeeName();
                    break;
                case 'UPDATE_EMPLOYEE_ROLE':
                    changeEmployeeRole();
                    break;
                case 'UPDATE_EMPLOYEE_MANAGER':
                    changeEmployeeManager();
                    break;
                case 'EXIT':
                    quit();
                    break;
                default:
                    quit();
            }
        })
}

// department functions
// view all departments
function viewAllDepartments() {
    db.getAllDepartments()
        .then(({ rows }) => {
            const departments = rows;
            console.log('\n');
            console.table(departments);
        })
        .then(() => loadMainPrompts());
}

// add a a department
function addDepartment() {
    inquirer.prompt([
        {
            name: 'departmentName',
            message: 'What name would you like to give the department?',
            type: 'input'
        }
    ])
        .then(resp => {
            db.createDepartment(resp.departmentName);
            console.log('\n');
            console.warn(`Department ${resp.departmentName} added successfully!`);
            console.log('\n');
        })
        .then(() => loadMainPrompts());
}

// delete a department
async function deleteDepartment() {
    const queryResponse = await db.getAllDepartments();
    const choicesArr = queryResponse.rows.map(department => {
        return {
            name: department.name,
            value: department.id
        }
    });
    inquirer.prompt([
        {
            name: 'departmentID',
            message: 'Which department would you like to delete?',
            type: 'list',
            choices: choicesArr
        }
    ])
        .then(async resp => {
            let departmentName;
            for (let i = 0; i < choicesArr.length; i++) {
                if (resp.departmentID === choicesArr[i].value) {
                    departmentName = choicesArr[i].name;
                }
            }
            await db.deleteDepartment(resp.departmentID);
            console.log('\n');
            console.warn(`Department ${departmentName} deleted sucessfully!`);
            console.log('\n');
        })
        .then(() => loadMainPrompts());
}

// update a department
async function updateDepartment() {
    const queryResponse = await db.getAllDepartments();
    const choicesArr = queryResponse.rows.map(department => {
        return {
            name: department.name,
            value: department.id
        }
    });
    inquirer.prompt([
        {
            name: 'departmentID',
            message: 'Which department would you like to rename?',
            type: 'list',
            choices: choicesArr
        },
        {
            name: 'newName',
            message: 'What name would you like give the department?',
            type: 'input'

        }
    ])
        .then(async resp => {
            await db.renameDepartment(resp.departmentID, resp.newName);
            console.log('\n');
            console.warn(`Department renamed to ${resp.newName} sucessfully!`);
            console.log('\n');
        })
        .then(() => loadMainPrompts());
}

// role functions
// view all roles
function viewAllRoles() {
    db.getAllRoles()
        .then(({ rows }) => {
            const roles = rows;
            console.log('\n');
            console.table(roles);
            console.log('\n');
        })
        .then(() => loadMainPrompts());
}

// view roles by department
async function viewRolesByDepartment() {
    const queryResponse = await db.getAllDepartments();
    const choicesArr = queryResponse.rows.map(department => {
        return {
            name: department.name,
            value: department.id
        }
    });
    inquirer.prompt([
        {
            name: 'departmentID',
            message: 'Which departments roles would you like to view?',
            type: 'list',
            choices: choicesArr
        },
    ])
        .then(resp =>
            db.getRoleByDepartment(resp.departmentID)
                .then(({ rows }) => {
                    const roles = rows;
                    console.log('\n');
                    console.table(roles);
                    console.log('\n');
                })
        )
        .then(() => loadMainPrompts());
}

// add a role
async function addRole() {
    const queryResponse = await db.getAllDepartments();
    const choicesArr = queryResponse.rows.map(department => {
        return {
            name: department.name,
            value: department.id
        }
    });
    inquirer.prompt([
        {
            name: 'roleName',
            message: 'What name would you like to give the role?',
            type: 'input'
        },
        {
            name: 'roleSalary',
            message: 'What salary would you like to give the role?',
            type: 'input'
        },
        {
            name: 'departmentID',
            message: 'Which department would you like to assign the role to?',
            type: 'list',
            choices: choicesArr
        },
    ])
        .then(resp => {
            db.createRole(resp.roleName, resp.roleSalary, resp.departmentID)
            console.log('\n');
            console.warn(`Role ${resp.roleName} added successfully!`);
            console.log('\n');
        })
        .then(() => loadMainPrompts());
}

// delete a role
async function deleteRole() {
    const queryResponse = await db.getAllRoles();
    const choicesArr = queryResponse.rows.map(role => {
        return {
            name: role.title,
            value: role.role_id
        }
    });
    inquirer.prompt([
        {
            name: 'roleID',
            message: 'Which role would you like to delete?',
            type: 'list',
            choices: choicesArr
        }
    ])
        .then(async resp => {
            let roleName;
            for (let i = 0; i < choicesArr.length; i++) {
                if (resp.roleID === choicesArr[i].value) {
                    roleName = choicesArr[i].name;
                }
            }
            await db.deleteRole(resp.roleID);
            console.log('\n');
            console.warn(`Role ${roleName} deleted sucessfully!`);
            console.log('\n');
        })
        .then(() => loadMainPrompts());
}

// update a roles title
async function changeRoleTitle() {
    const queryResponse = await db.getAllRoles();
    const choicesArr = queryResponse.rows.map(role => {
        return {
            name: role.title,
            value: role.role_id
        }
    });
    inquirer.prompt([
        {
            name: 'roleID',
            message: 'Which roles title would you like to rename?',
            type: 'list',
            choices: choicesArr
        },
        {
            name: 'newName',
            message: 'What title would you like give the role?',
            type: 'input'

        }
    ])
        .then(async resp => {
            await db.updateRoleTitle(resp.roleID, resp.newName);
            console.log('\n');
            console.warn(`Role title updated to ${resp.newName} sucessfully!`);
            console.log('\n');
        })
        .then(() => loadMainPrompts());
}

// update a roles salary
async function changeRoleSalary() {
    const queryResponse = await db.getAllRoles();
    const choicesArr = queryResponse.rows.map(role => {
        return {
            name: role.title,
            value: role.role_id
        }
    });
    inquirer.prompt([
        {
            name: 'roleID',
            message: 'Which roles salary would you like to change?',
            type: 'list',
            choices: choicesArr
        },
        {
            name: 'newSalary',
            message: 'What salary would you like give the role?',
            type: 'input'

        }
    ])
        .then(async resp => {
            let roleName;
            for (let i = 0; i < choicesArr.length; i++) {
                if (resp.role_id === choicesArr[i].value) {
                    roleName = choicesArr[i].name;
                }
            }
            await db.updateRoleSalary(resp.roleID, resp.newSalary);
            console.log('\n');
            console.warn(`Role ${roleName} will now have a salary of ${resp.newSalary}`);
            console.log('\n');
        })
        .then(() => loadMainPrompts());
}

// employee functions
// view all employees
function viewAllEmployees() {
    db.getAllEmployees()
        .then(({ rows }) => {
            const employees = rows;
            console.log('\n');
            console.table(employees);
        })
        .then(() => loadMainPrompts());
}

// view employees by department
async function viewEmployeesByDepartment() {
    const queryResponse = await db.getAllDepartments();
    const choicesArr = queryResponse.rows.map(department => {
        return {
            name: department.name,
            value: department.id
        }
    });
    inquirer.prompt([
        {
            name: 'departmentID',
            message: 'Which departments employees would you like to view?',
            type: 'list',
            choices: choicesArr
        },
    ])
        .then(resp =>
            db.getEmployeesByDepartment(resp.departmentID)
                .then(({ rows }) => {
                    const employees = rows;
                    console.log('\n');
                    console.table(employees);
                    console.log('\n');
                })
        )
        .then(() => loadMainPrompts());
}

// view employees by role
async function viewEmployeesByRole() {
    const queryResponse = await db.getAllRoles();
    const choicesArr = queryResponse.rows.map(role => {
        return {
            name: role.title,
            value: role.role_id
        }
    });
    inquirer.prompt([
        {
            name: 'roleID',
            message: 'Which role would you like to see the employees assigned to the role?',
            type: 'list',
            choices: choicesArr
        },
    ])
        .then(resp =>
            db.getEmployeesByRole(resp.roleID)
                .then(({ rows }) => {
                    const employees = rows;
                    console.log('\n');
                    console.table(employees);
                    console.log('\n');
                })
        )
        .then(() => loadMainPrompts());
}

// view employees by manager
async function viewEmployeesByManager() {
    const queryResponse = await db.getManagerEmployees();
    const choicesArr = queryResponse.rows.map(manager => {
        return {
            name: `${manager.manager_first_name} ${manager.manager_last_name}`,
            value: manager.manager_id
        }
    });
    inquirer.prompt([
        {
            name: 'managerID',
            message: 'Which managers direct reports would you like to see?',
            type: 'list',
            choices: choicesArr
        },
    ])
        .then(resp =>
            db.getEmployeesByManager(resp.managerID)
                .then(({ rows }) => {
                    const employees = rows;
                    console.log('\n');
                    console.table(employees);
                    console.log('\n');
                })
        )
        .then(() => loadMainPrompts());
}

async function addEmployee() {
    const roleQueryResponse = await db.getAllRoles();
    const roleChoicesArr = roleQueryResponse.rows.map(role => {
        return {
            name: role.title,
            value: role.role_id
        }
    });

    const managerQueryResponse = await db.getAllEmployees();
    const managerChoicesArr = managerQueryResponse.rows.map(employee => {
        return {
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
        }
    });

    inquirer.prompt([
        {
            name: 'employeeFirstName',
            message: 'What is the employees first name?',
            type: 'input'
        },
        {
            name: 'employeeLastName',
            message: 'What is the employees last name?',
            type: 'input'
        },
        {
            name: 'roleID',
            message: 'Which role would you like to assign to the employee?',
            type: 'list',
            choices: roleChoicesArr
        },
        {
            name: 'managerID',
            message: 'Which manager will this employee report to?',
            type: 'list',
            choices: managerChoicesArr
        },
    ])
        .then(resp => {
            db.createEmployee(resp.employeeFirstName, resp.employeeLastName, resp.roleID, resp.managerID)
            console.log('\n');
            console.warn(`Employee ${resp.employeeFirstName} ${resp.employeeLastName} added successfully!`);
            console.log('\n');
        })
        .then(() => loadMainPrompts());
}

// delete an employee
async function deleteEmployee() {
    const queryResponse = await db.getAllEmployees();
    const choicesArr = queryResponse.rows.map(employee => {
        return {
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
        }
    });
    inquirer.prompt([
        {
            name: 'employeeID',
            message: 'Which employee would you like to delete?',
            type: 'list',
            choices: choicesArr
        }
    ])
        .then(async resp => {
            let employeeName;
            for (let i = 0; i < choicesArr.length; i++) {
                if (resp.employeeID === choicesArr[i].value) {
                    employeeName = choicesArr[i].name;
                }
            }
            await db.deleteEmployee(resp.employeeID);
            console.log('\n');
            console.warn(`Employee ${employeeName} deleted sucessfully!`);
            console.log('\n');
        })
        .then(() => loadMainPrompts());
}

// update an employees first and last name
async function changeEmployeeName() {
    const queryResponse = await db.getAllEmployees();
    const choicesArr = queryResponse.rows.map(employee => {
        return {
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
        }
    });
    inquirer.prompt([
        {
            name: 'employeeID',
            message: 'Which employees name would you like to change?',
            type: 'list',
            choices: choicesArr
        },
        {
            name: 'newFirstName',
            message: 'What is the employees new first name? If the same, please still enter it here...',
            type: 'input'

        },
        {
            name: 'newLastName',
            message: 'What is the employees new last name? If the same, please still enter it here...',
            type: 'input'

        }
    ])
        .then(async resp => {
            await db.renameEmployee(resp.employeeID, resp.newFirstName, resp.newLastName);
            console.log('\n');
            console.warn(`The employees name has been changed to ${resp.newFirstName} ${resp.newLastName} sucessfully!`);
            console.log('\n');
        })
        .then(() => loadMainPrompts());
}

// update what role an employee holds
async function changeEmployeeRole() {
    const employeeQueryResponse = await db.getAllEmployees();
    const employeeChoicesArr = employeeQueryResponse.rows.map(employee => {
        return {
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
        }
    });

    const roleQueryResponse = await db.getAllRoles();
    const roleChoicesArr = roleQueryResponse.rows.map(role => {
        return {
            name: role.title,
            value: role.role_id
        }
    });
    inquirer.prompt([
        {
            name: 'employeeID',
            message: 'Which employees role would you like to change?',
            type: 'list',
            choices: employeeChoicesArr
        },
        {
            name: 'newRole',
            message: 'What new role would you like to assign the employee?',
            type: 'list',
            choices: roleChoicesArr
        }
    ])
        .then(async resp => {
            let employeeName;
            for (let i = 0; i < employeeChoicesArr.length; i++) {
                if (resp.employeeID === employeeChoicesArr[i].value) {
                    employeeName = employeeChoicesArr[i].name;
                }
            }
            let roleName;
            for (let i = 0; i < roleChoicesArr.length; i++) {
                if (resp.newRole === roleChoicesArr[i].value) {
                    roleName = roleChoicesArr[i].name;
                }
            }
            await db.changeEmployeeRole(resp.employeeID, resp.newRole);
            console.log('\n');
            console.warn(`Employee ${employeeName}s role has been changed to ${roleName} sucessfully!`);
            console.log('\n');
        })
        .then(() => loadMainPrompts());
}

// update what manager an employee reports to
async function changeEmployeeManager() {
    const employeeQueryResponse = await db.getAllEmployees();
    const employeeChoicesArr = employeeQueryResponse.rows.map(employee => {
        return {
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
        }
    });

    const managerQueryResponse = await db.getAllEmployees();
    const managerChoicesArr = managerQueryResponse.rows.map(employee => {
        return {
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
        }
    });
    inquirer.prompt([
        {
            name: 'employeeID',
            message: 'Which employees manager would you like to change?',
            type: 'list',
            choices: employeeChoicesArr
        },
        {
            name: 'managerID',
            message: 'What manager would you like the employee to report to?',
            type: 'list',
            choices: managerChoicesArr
        }
    ])
        .then(async resp => {
            let employeeName;
            for (let i = 0; i < employeeChoicesArr.length; i++) {
                if (resp.employeeID === employeeChoicesArr[i].value) {
                    employeeName = employeeChoicesArr[i].name;
                }
            }
            let managerName;
            for (let i = 0; i < managerChoicesArr.length; i++) {
                if (resp.managerID === managerChoicesArr[i].value) {
                    managerName = managerChoicesArr[i].name;
                }
            }
            await db.changeEmployeeManager(resp.employeeID, resp.managerID);
            console.log('\n');
            console.warn(`Employee ${employeeName}s manager has been changed to ${managerName} sucessfully!`);
            console.log('\n');
        })
        .then(() => loadMainPrompts());
}

// exit the program
function quit() {
    console.warn(`Program exiting now...`);
    console.log(`Goodbye! \n`);
    process.exit();
}