using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DBAccess.Models;

namespace DBAccess.Configurations
{
    public class FlightConfiguration : IEntityTypeConfiguration<Flight>
    {
        public void Configure(EntityTypeBuilder<Flight> builder)
        {
            builder.Property(f => f.FlightNumber).HasMaxLength(20).IsRequired();
            builder.Property(f => f.DepartureTime).IsRequired();
            builder.Property(f => f.ArrivalTime).IsRequired();
            builder.Property(f => f.FromAirport).HasMaxLength(3).IsRequired();
            builder.Property(f => f.ToAirport).HasMaxLength(3).IsRequired();

            builder.HasMany(f => f.Complaints)
                   .WithOne(c => c.Flight)
                   .HasForeignKey(c => c.FlightId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
