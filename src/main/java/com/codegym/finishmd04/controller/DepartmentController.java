package com.codegym.finishmd04.controller;

import com.codegym.finishmd04.model.Department;
import com.codegym.finishmd04.service.IDepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/department")
public class DepartmentController {

    @Autowired
    private IDepartmentService departmentService;

    @GetMapping("/test")
    public ResponseEntity<Iterable<Department>> findALL(@RequestBody Department department) {
        Iterable<Department> departments = departmentService.find(department);
        return new ResponseEntity<>(departments, HttpStatus.OK);
    }

    @GetMapping
    public Iterable<Department> list() {
        return this.departmentService.findAll();
    }

    @PostMapping
    public ResponseEntity<Department> create(@RequestBody Department category) {
        category.setStatus(1);
        return new ResponseEntity<>(this.departmentService.save(category), HttpStatus.CREATED);
    }

    @PutMapping()
    public ResponseEntity<Department> update(@RequestBody Department category) {
        Optional<Department> temp = this.departmentService.findById(category.getId());
        if (!temp.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(this.departmentService.save(category), HttpStatus.OK);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Department> findById(@PathVariable Long id) {
        Optional<Department> temp = this.departmentService.findById(id);
        return temp.map(category -> new ResponseEntity<>(category, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Department> delete(@PathVariable Long id) {
        this.departmentService.remove(id);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
