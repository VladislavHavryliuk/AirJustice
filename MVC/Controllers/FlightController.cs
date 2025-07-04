using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DBAccess;
using DBAccess.Models;

namespace MVC.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FlightController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FlightController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetFlights()
        {
            var flights = await _context.Flights
                .Include(f => f.Airline)
                .Select(f => new
                {
                    f.Id,
                    f.FlightNumber,
                    f.DepartureTime,
                    f.ArrivalTime,
                    f.FromAirport,
                    f.ToAirport,
                    Airline = f.Airline.Name
                })
                .ToListAsync();

            return Ok(flights);
        }

        [HttpGet("airlines")]
        public async Task<IActionResult> GetAirlines()
        {
            var airlines = await _context.Airlines
                .Select(a => new { a.Id, a.Name })
                .ToListAsync();

            return Ok(airlines);
        }
    }
}
