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
    public class FavEventsController : ControllerBase
    {
        private readonly EventsDbContext _context;

        public FavEventsController(EventsDbContext context)
        {
            _context = context;
        }

        // GET: api/FavEvents
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FavEvent>>> GetFavEvents()
        {
            return await _context.FavEvents.ToListAsync();
        }

        // GET: api/FavEvents/5
        [HttpGet("{id}/{user}")]
        public async Task<IEnumerable<FavEvent>> GetFavEvent(int id,int user)
        {
            var favEvent =  await _context.FavEvents.ToListAsync();
            var newFav = favEvent.Where(x => x.EventId == id && x.UserId == user);

            if (favEvent == null)
            {
                return (IEnumerable<FavEvent>)NotFound();

            }

            return newFav;
        }

        // PUT: api/FavEvents/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFavEvent(int id, FavEvent favEvent)
        {
            if (id != favEvent.Id)
            {
                return BadRequest();
            }

            _context.Entry(favEvent).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FavEventExists(id))
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

        // POST: api/FavEvents
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<FavEvent>> PostFavEvent(FavEvent favEvent)
        {
            _context.FavEvents.Add(favEvent);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFavEvent", new { id = favEvent.Id }, favEvent);
        }

        // DELETE: api/FavEvents/5
        [HttpDelete("{eventid}/{user}")]
        public async Task<IActionResult> DeleteFavEvent(int eventid, int user)
        {
            var favEvent = await _context.FavEvents.ToListAsync();
            //var favEvent = await _context.FavEvents.ToListAsync();
            var newFav = favEvent.Where(x => x.EventId == eventid && x.UserId == user).First();
            Console.WriteLine(favEvent[0]);
            if (favEvent == null)
            {
                return NotFound();
            }

            _context.FavEvents.Remove(newFav);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FavEventExists(int id)
        {
            return _context.FavEvents.Any(e => e.Id == id);
        }
    }
}
