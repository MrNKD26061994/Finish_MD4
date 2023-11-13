package com.codegym.finishmd04.controller;

import com.codegym.finishmd04.model.Department;
import com.codegym.finishmd04.model.Employees;
import com.codegym.finishmd04.service.IEmployeesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/employees")
public class EmployeesController {
    @Autowired
    private IEmployeesService employeesService;

    @GetMapping
    public Iterable<Employees> list() {
        return this.employeesService.findAll();
    }

    @GetMapping("findDepartment/{id}")
    public Iterable<Employees> list(@PathVariable Long id) {
        return this.employeesService.findAllByDepartment(id);
    }

    @PostMapping
    public ResponseEntity<Employees> create(@RequestBody Employees employees) {
        return new ResponseEntity<>(this.employeesService.save(employees), HttpStatus.CREATED);
    }

    @PutMapping()
    public ResponseEntity<Employees> update(@RequestBody Employees employees) {
        Optional<Employees> temp = this.employeesService.findById(employees.getId());
        if (!temp.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(this.employeesService.save(employees), HttpStatus.OK);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employees> findById(@PathVariable Long id) {
        Optional<Employees> temp = this.employeesService.findById(id);
        return temp.map(employees -> new ResponseEntity<>(employees, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Department> delete(@PathVariable Long id) {
        this.employeesService.remove(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
