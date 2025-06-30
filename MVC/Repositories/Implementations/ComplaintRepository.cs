using DBAccess.Models;
using DBAccess;
using Microsoft.EntityFrameworkCore;
using MVC.Repositories.Interfaces;

namespace MVC.Repositories.Implementations
{
    public class ComplaintRepository : IComplaintRepository
    {
        private readonly ApplicationDbContext _context;

        public ComplaintRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Complaint?> GetByIdAsync(Guid id)
        {
            return await _context.Complaints
                .Include(c => c.Flight)
                    .ThenInclude(f => f.Airline)
                .Include(c => c.Documents)
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<List<Complaint>> GetByUserIdAsync(Guid userId)
        {
            return await _context.Complaints
                .Where(c => c.UserId == userId)
                .Include(c => c.Flight)
                    .ThenInclude(f => f.Airline)
                .ToListAsync();
        }

        public async Task AddAsync(Complaint complaint)
        {
            await _context.Complaints.AddAsync(complaint);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
