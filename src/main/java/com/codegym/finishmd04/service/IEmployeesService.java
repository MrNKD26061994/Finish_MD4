package com.codegym.finishmd04.service;

import com.codegym.finishmd04.model.Employees;

public interface IEmployeesService extends IGeneralService<Employees> {
    Iterable<Employees> findAllByDepartment(Long departmentID);
}
