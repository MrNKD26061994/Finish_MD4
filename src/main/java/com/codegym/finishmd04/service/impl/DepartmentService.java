package com.codegym.finishmd04.service.impl;

import com.codegym.finishmd04.model.Department;
import com.codegym.finishmd04.repository.DepartmentRepository;
import com.codegym.finishmd04.service.IDepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DepartmentService implements IDepartmentService  {

    @Autowired
    private DepartmentRepository departmentRepository;

    @Override
    public Iterable<Department> findAll() {
        return departmentRepository.findAllByStatus(1);
    }

    @Override
    public Optional<Department> findById(Long id) {
        return departmentRepository.findByIdAndStatus(id, 1);
    }

    @Override
    public Department save(Department department) {
        department.setStatus(1);
        return departmentRepository.save(department);
    }

    @Override
    public void remove(Long id) {
        Department department = departmentRepository.findById(id).get();
        department.setStatus(0);
        departmentRepository.save(department);
    }

    @Override
    public List<Department> find(Department department) {
        ExampleMatcher matcher = ExampleMatcher.matching()
                .withIgnoreNullValues()
                .withIgnorePaths("status")
                .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING);
        Example<Department> example = Example.of(department, matcher);
        return departmentRepository.findAll(example);
    }
}
