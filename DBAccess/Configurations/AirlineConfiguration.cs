using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DBAccess.Models;

namespace DBAccess.Configurations
{
    public class AirlineConfiguration : IEntityTypeConfiguration<Airline>
    {
        public void Configure(EntityTypeBuilder<Airline> builder)
        {
            builder.HasIndex(a => a.Name).IsUnique();
            builder.Property(a => a.Name).HasMaxLength(150).IsRequired();

            builder.HasMany(a => a.Flights)
                   .WithOne(f => f.Airline)
                   .HasForeignKey(f => f.AirlineId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
