package com.codegym.finishmd04.repository;

import com.codegym.finishmd04.model.Employees;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeesRepository extends JpaRepository<Employees, Long> {
    Iterable<Employees> findAllByStatus(int status);

    Optional<Employees> findByIdAndStatus(Long id, int status);

    Iterable<Employees> findAllByDepartmentIdAndStatus(Long departmentID, int status);
}
