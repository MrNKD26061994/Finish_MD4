package com.codegym.finishmd04.service;


import com.codegym.finishmd04.model.Department;

import java.util.List;

public interface IDepartmentService extends IGeneralService<Department> {

    List<Department> find(Department department);
}
