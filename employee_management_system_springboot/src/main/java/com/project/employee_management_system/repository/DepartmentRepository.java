package com.project.employee_management_system.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.project.employee_management_system.model.Department;
 
@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {

	@Query(value = "SELECT * FROM department WHERE department_name = ?1", nativeQuery = true)
	public List<Department> getDepartmentExist(String department_name);
}
