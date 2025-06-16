using DBAccess.Models;
using Microsoft.EntityFrameworkCore;
using DBAccess.Extensions;

namespace DBAccess
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // DbSets — tables
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Airline> Airlines { get; set; } = null!;
        public DbSet<Flight> Flights { get; set; } = null!;
        public DbSet<Complaint> Complaints { get; set; } = null!;
        public DbSet<Document> Documents { get; set; } = null!;

        // Model configuration
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurations(); // all configs from Configurations folder

            base.OnModelCreating(modelBuilder);
        }
    }
}
