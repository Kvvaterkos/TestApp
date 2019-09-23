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
    public class MeetingsController : ControllerBase
    {
        private readonly DepartmentContext db;

        public MeetingsController(DepartmentContext context)
        {
            this.db = context;
            if (!db.Meetings.Any()) 
            {
                db.Meetings.Add(new Meeting { Name = "Kostya", EmployeesId = 1 });
                db.Meetings.Add(new Meeting { Name = "Vasya", EmployeesId = 2 });
                db.SaveChanges();
            }
        }
        // GET: api/<controller>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Meeting>>> GetMeeting()
        {
            return await db.Meetings.ToListAsync();
        }

        // GET: api/Todo/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Meeting>> GetMeetings(int id)
        {
            var meeting = await db.Meetings.FindAsync(id);

            if (meeting == null)
            {
                return NotFound();
            }

            return meeting;
        }
        [HttpPost]
        public async Task<ActionResult<Meeting>> PostMeetings(Meeting meeting)
        {
            db.Meetings.Add(meeting);
            await db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMeetings), new { id = meeting.Id }, meeting);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMeetings(int id, Meeting meeting)
        {
            if (id != meeting.Id)
            {
                return BadRequest();
            }

            db.Entry(meeting).State = EntityState.Modified;
            await db.SaveChangesAsync();

            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMeetings(int id)
        {
            var meeting = await db.Meetings.FindAsync(id);

            if (meeting == null)
            {
                return NotFound();
            }

            db.Meetings.Remove(meeting);
            await db.SaveChangesAsync();

            return NoContent();
        }
    }
}