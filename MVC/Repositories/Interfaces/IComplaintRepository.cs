using DBAccess.Models;

namespace MVC.Repositories.Interfaces
{
    public interface IComplaintRepository
    {
        Task<Complaint?> GetByIdAsync(Guid id);
        Task<List<Complaint>> GetByUserIdAsync(Guid userId);
        Task AddAsync(Complaint complaint);
        Task SaveChangesAsync();
    }
}
