package com.codegym.finishmd04.service.impl;

import com.codegym.finishmd04.model.Department;
import com.codegym.finishmd04.model.Employees;
import com.codegym.finishmd04.repository.EmployeesRepository;
import com.codegym.finishmd04.service.IEmployeesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EmployeesService implements IEmployeesService {

    @Autowired
    private EmployeesRepository employeesRepository;

    @Override
    public Iterable<Employees> findAll() {
        return employeesRepository.findAllByStatus(1);
    }

    @Override
    public Optional<Employees> findById(Long id) {
        return employeesRepository.findByIdAndStatus(id, 1);
    }

    @Override
    public Employees save(Employees employees) {
        employees.setStatus(1);
        return employeesRepository.save(employees);
    }

    @Override
    public void remove(Long id) {
        Employees employees = employeesRepository.findById(id).get();
        employees.setStatus(0);
        employeesRepository.save(employees);
    }

    @Override
    public Iterable<Employees> findAllByDepartment(Long departmentID) {
        Iterable<Employees> aaa = employeesRepository.findAllByDepartmentIdAndStatus(departmentID,1);
        return employeesRepository.findAllByDepartmentIdAndStatus(departmentID,1);
    }
}
