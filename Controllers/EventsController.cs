using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Upmeet.Models;

namespace Upmeet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly EventsDbContext _context;

        public EventsController(EventsDbContext context)
        {
            _context = context;
        }

        // GET: api/Events
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Event>>> GetEvents()
        {
            return await _context.Events.ToListAsync();
        }

        // GET: api/Events/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Event>> GetEvent(int id)
        {
            var @event = await _context.Events.FindAsync(id);

            if (@event == null)
            {
                return NotFound();
            }

            return @event;
        }

        [HttpGet("search/{searchQuery}")]
        public async Task<IEnumerable<Event>> SearchEvents(string searchQuery)
        {
            Console.WriteLine(searchQuery);
            var allEvents = await _context.Events.ToListAsync();
            Console.WriteLine(allEvents[0].Name);
            var searchResults = allEvents.Where(x => x.Name.ToLower().Contains(searchQuery.ToLower())).ToList();
            var Results2 = allEvents.Where(x => x.Description.ToLower().Contains(searchQuery.ToLower())).ToList();
            var Results3 = allEvents.Where(x => x.HostedBy.ToLower().Contains(searchQuery.ToLower())).ToList();
            var Results4 = allEvents.Where(x => x.Type.ToLower().Contains(searchQuery.ToLower())).ToList();

			var cityEvents = allEvents.Where(x => x.City.ToLower().Contains(searchQuery.ToLower())).ToList();
			var stateEvents = allEvents.Where(x => x.State.ToLower().Contains(searchQuery.ToLower())).ToList();
			List<Event> output = searchResults.Union(Results2).ToList();
            List<Event> out2 = output.Union(Results3).ToList();
            List<Event> out3 = out2.Union(Results4).ToList();
			List<Event> out4 = out3.Union(cityEvents).ToList();
			List<Event> out5 = out4.Union(stateEvents).ToList();
			if (out5 == null)
            {
                return (IEnumerable<Event>)NotFound();
            }

            return out5;
        }

        // PUT: api/Events/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEvent(int id, Event @event)
        {
            if (id != @event.Id)
            {
                return BadRequest();
            }

            _context.Entry(@event).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EventExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Events
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Event>> PostEvent(Event @event)
        {
            _context.Events.Add(@event);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEvent", new { id = @event.Id }, @event);
        }

        // DELETE: api/Events/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            var @event = await _context.Events.FindAsync(id);
            if (@event == null)
            {
                return NotFound();
            }

            _context.Events.Remove(@event);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EventExists(int id)
        {
            return _context.Events.Any(e => e.Id == id);
        }
    }
}
