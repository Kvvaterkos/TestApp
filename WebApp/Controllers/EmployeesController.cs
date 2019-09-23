using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.Models;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly DepartmentContext db;

        public EmployeesController(DepartmentContext context)
        {
            this.db = context;
            //if (!db.Employees.Any())
            //{
            //    db.Employees.Add(new Employee { Name = "Kostya", Age = 22 });
            //    db.Employees.Add(new Employee { Name = "Vasya", Age = 33 });
            //    db.SaveChanges();
            //}
        }
        // GET: api/<controller>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            return await db.Empls.ToListAsync();
        }

        // GET: api/Todo/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployees(int id)
        {
            var employee = await db.Empls.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployees(Employee employee)
        {
            db.Empls.Add(employee);
            await db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEmployees), new { id = employee.Id }, employee);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployees(int id, Employee employee)
        {
            if (id != employee.Id)
            {
                return BadRequest();
            }

            db.Entry(employee).State = EntityState.Modified;
            await db.SaveChangesAsync();

            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployees(int id)
        {
            var employee = await db.Empls.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            db.Empls.Remove(employee);
            await db.SaveChangesAsync();

            return NoContent();
        }
    }
}