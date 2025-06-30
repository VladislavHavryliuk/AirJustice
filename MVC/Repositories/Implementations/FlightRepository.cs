using DBAccess.Models;
using DBAccess;
using Microsoft.EntityFrameworkCore;
using MVC.Repositories.Interfaces;

namespace MVC.Repositories.Implementations
{
    public class FlightRepository : IFlightRepository
    {
        private readonly ApplicationDbContext _context;

        public FlightRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Flight>> GetAllAsync()
        {
            return await _context.Flights
                .Include(f => f.Airline)
                .ToListAsync();
        }

        public async Task<Flight?> GetByIdAsync(Guid id)
        {
            return await _context.Flights
                .Include(f => f.Airline)
                .FirstOrDefaultAsync(f => f.Id == id);
        }
    }
}
