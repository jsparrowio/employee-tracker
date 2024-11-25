import { pool } from "./connection.js";
import { QueryResult } from "pg";

export default class DB {
    constructor() { }
    async query(sql: string, args: any[] = []): Promise<QueryResult> {
        const client = await pool.connect();
        try {
            return client.query(sql, args);
        }
        finally {
            client.release();
        }

    }

    // get all departments
    getAllDepartments() {
        return this.query(
            "SELECT * FROM department;"
        );
    }

    // create a department
    createDepartment(name: string) {
        return this.query(
            "INSERT INTO department(name) VALUES ($1);",
            [name]
        );
    }

    // delete a department
    deleteDepartment(department_id: number) {
        return this.query(
            "DELETE FROM department WHERE id = $1;",
            [department_id]
        );
    }

    // update a department (to rename)
    renameDepartment(department_id: number, name: string) {
        return this.query(
            "UPDATE department SET name = $1 WHERE id = $2",
            [name, department_id]
        );
    }

    // get all roles
    getAllRoles() {
        return this.query(
            "SELECT \
                department.name AS department_name, \
                role.id AS role_id, \
                role.title, \
                role.salary \
            FROM \
                role \
            JOIN \
                department ON role.department_id = department.id;"
        );
    }


    // get roles by...
    getRoleByDepartment(department_id: number) {
        return this.query(
            "SELECT \
                department.name AS department_name, \
                role.id AS role_id, \
                role.title, \
                role.salary \
            FROM \
                role \
            JOIN \
                department ON role.department_id = department.id\
            WHERE \
                department.id = $1;",
            [department_id]
        );
    }

    // create a role
    createRole(title: string, salary: number, department_id: number) {
        return this.query(
            "INSERT INTO role(title, salary, department_id) VALUES ($1, $2, $3);",
            [title, salary, department_id]
        );
    }

    // delete a role
    deleteRole(role_id: number) {
        return this.query(
            "DELETE FROM role WHERE id = $1;",
            [role_id]
        );
    }

    // update a role
    updateRoleTitle(role_id: number, name: string) {
        return this.query(
            "UPDATE role SET title = $1 WHERE id = $2",
            [name, role_id]
        );
    }

    updateRoleSalary(role_id: number, salary: number) {
        return this.query(
            "UPDATE role SET salary = $1 WHERE id = $2",
            [salary, role_id]
        );
    }

    // get all employees
    getAllEmployees() {
        return this.query(
            "SELECT \
                employee.id, \
                employee.first_name, \
                employee.last_name, \
                manager.first_name AS manager_first_name, \
                manager.last_name AS manager_last_name, \
                role.title, \
                role.salary, \
                department.name AS department_name \
            FROM \
                employee \
            JOIN \
                role ON employee.role_id = role.id \
            JOIN \
                department ON role.department_id = department.id \
            LEFT JOIN \
                employee AS manager ON employee.manager_id = manager.id \
            ORDER BY \
                employee.id;"
        );
    }

    // get employees by...
    getEmployeesByRole(role_id: number) {
        return this.query(
            "SELECT \
                employee.id, \
                employee.first_name, \
                employee.last_name, \
                manager.first_name AS manager_first_name, \
                manager.last_name AS manager_last_name, \
                role.title, \
                role.salary, \
                department.name AS department_name \
            FROM \
                employee \
            JOIN \
                role ON employee.role_id = role.id \
            JOIN \
                department ON role.department_id = department.id \
            LEFT JOIN \
                employee AS manager ON employee.manager_id = manager.id \
            WHERE \
                role.id = $1\
            ORDER BY \
                role.id;",
            [role_id]
        );
    }

    getEmployeesByDepartment(department_id: number) {
        return this.query(
            "SELECT \
                employee.id, \
                employee.first_name, \
                employee.last_name, \
                manager.first_name AS manager_first_name, \
                manager.last_name AS manager_last_name, \
                role.title, \
                role.salary, \
                department.name AS department_name \
            FROM \
                employee \
            JOIN \
                role ON employee.role_id = role.id \
            JOIN \
                department ON role.department_id = department.id \
            LEFT JOIN \
                employee AS manager ON employee.manager_id = manager.id \
            WHERE \
                department.id = $1 \
            ORDER BY \
                department.id, role.id\;",
            [department_id]
        );
    }

    getEmployeesByManager(manager_id: number) {
        return this.query(
            "SELECT \
                employee.id, \
                employee.first_name, \
                employee.last_name, \
                manager.first_name AS manager_first_name, \
                manager.last_name AS manager_last_name, \
                role.title, \
                role.salary, \
                department.name AS department_name \
            FROM \
                employee \
            JOIN \
                role ON employee.role_id = role.id \
            JOIN \
                department ON role.department_id = department.id \
            LEFT JOIN \
                employee AS manager ON employee.manager_id = manager.id \
            WHERE \
                manager.id = $1 \
            ORDER BY \
                manager.id, role.id\;",
            [manager_id]
        );
    }

    // query to get manager ID for getEmployeesByManager function
    getManagerEmployees() {
        return this.query(
            "SELECT \
                manager.id AS manager_id, \
                manager.first_name AS manager_first_name, \
                manager.last_name AS manager_last_name \
            FROM \
                employee \
            JOIN \
                employee AS manager ON employee.manager_id = manager.id \
            GROUP BY \
                manager.id, manager.first_name, manager.last_name;"
        );
    }

    // create an employee 
    createEmployee(first_name: string, last_name: string, role_id: number, manager_id: (number | null)) {
        return this.query(
            "INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4);",
            [first_name, last_name, role_id, manager_id]
        );
    }

    // delete an employee
    deleteEmployee(employee_id: number) {
        return this.query(
            "DELETE FROM employee WHERE id = $1;",
            [employee_id]
        );
    }

    // update an employee 
    renameEmployee(employee_id: number, first_name: string, last_name: string) {
        return this.query(
            "UPDATE employee SET first_name = $1, last_name = $2 WHERE id = $3",
            [first_name, last_name, employee_id]
        );
    }

    changeEmployeeRole(employee_id: number, role_id: number) {
        return this.query(
            "UPDATE employee SET role_id = $1 WHERE id = $2",
            [role_id, employee_id]
        );
    }

    changeEmployeeManager(employee_id: number, manager_id: (number | null)) {
        return this.query(
            "UPDATE employee SET manager_id = $1 WHERE id = $2",
            [manager_id, employee_id]
        );
    }
}