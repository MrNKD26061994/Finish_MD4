package com.codegym.finishmd04.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employees extends BaseEntity{
    private String employeesCode;
    private int age;
    private double salary;

    @ManyToOne
    private Department department;
}
