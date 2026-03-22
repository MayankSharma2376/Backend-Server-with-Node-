const express = require("express")

const router = express.Router()
const path = require("path")
const employeesController = require("../../controllers/employees.controller")


const data = {}

router.route("/")
.get(employeesController.getAllEmployees)
.post(employeesController.createNewEmployee)
.put(employeesController.updateEmployee)
.delete(employeesController.deleteEmployee)


router.route("/:id")
.get(employeesController.getEmployee)

data.employees = require("../../model/employees.json")


module.exports = router
