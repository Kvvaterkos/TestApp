using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace WebApp.Models
{
    public class DepartmentContext : DbContext
    {
        public DbSet<Employee> Empls { get; set; }
        public DbSet<Meeting> Meetings { get; set; }
        public DepartmentContext(DbContextOptions<DepartmentContext> options) : base (options)
        { }

    }
}
