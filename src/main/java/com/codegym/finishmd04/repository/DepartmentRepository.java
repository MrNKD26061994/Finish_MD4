package com.codegym.finishmd04.repository;

import com.codegym.finishmd04.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
    Iterable<Department> findAllByStatus(int status);

    Optional<Department> findByIdAndStatus(Long id, int status);
}
