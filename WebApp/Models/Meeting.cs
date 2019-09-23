using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models
{
    public class Meeting
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public int? EmployeesId { get; set; }
    }
}
