using DBAccess.Models;

namespace MVC.Repositories.Interfaces
{
    public interface IFlightRepository
    {
        Task<List<Flight>> GetAllAsync();
        Task<Flight?> GetByIdAsync(Guid id);
    }
}
