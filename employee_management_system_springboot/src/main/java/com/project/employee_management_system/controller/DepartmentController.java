package com.project.employee_management_system.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.project.employee_management_system.exception.ResourceNotFoundException;
import com.project.employee_management_system.model.Department;
import com.project.employee_management_system.model.User;
import com.project.employee_management_system.repository.DepartmentRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1")
public class DepartmentController {
	@Autowired
	private DepartmentRepository departmentRepository;
 
	//Fetching All Data of Department
	@GetMapping("/departments")
	public List<Department> getAllDepartments() {
		return departmentRepository.findAll();
	}
	
	@GetMapping("/department/{id}")
	public ResponseEntity<Department> getDepartmentById(@PathVariable(value = "id") Long departmentId)
			throws ResourceNotFoundException {
		Department department = departmentRepository.findById(departmentId)
				.orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + departmentId));
		return ResponseEntity.ok().body(department);
	}
	
	//Add Department
	@PostMapping("/department")
	public Department createDepartment(@Valid @RequestBody Department department) {
		return departmentRepository.save(department);
	}
	
	//Checking Is Department Name Already Exist or Not?
	@GetMapping("/departments/check-department-exists/{department_name}")
	public List<Department> checkDepartmentByName(@PathVariable(value = "department_name") String department_name) {
			return departmentRepository.getDepartmentExist(department_name);
	}
	
	//Update Department
	@PutMapping("/department/{id}")
	public ResponseEntity<Department> updateDepartment(@PathVariable(value = "id") Long departmentId,
			@Valid @RequestBody Department departmentDetails) throws ResourceNotFoundException {
		final Department updateDepartment = departmentRepository.save(departmentDetails);
		return ResponseEntity.ok(updateDepartment);
	}
	
	//Delete Department
	@DeleteMapping("/departments/{id}")
	public Map<String, Boolean> deleteDepartment(@PathVariable(value = "id") Long departmentId)
			throws ResourceNotFoundException {
		Department department = departmentRepository.findById(departmentId)
				.orElseThrow(() -> new ResourceNotFoundException("Department not found for this id :: " + departmentId));
		
		departmentRepository.delete(department);
		
		
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}
	
}
