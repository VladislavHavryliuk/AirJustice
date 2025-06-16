using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DBAccess.Models;

namespace DBAccess.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasIndex(u => u.Email).IsUnique();
            builder.Property(u => u.FullName).HasMaxLength(100).IsRequired();
            builder.Property(u => u.Email).HasMaxLength(100).IsRequired();
            builder.Property(u => u.PasswordHash).IsRequired();

            builder.HasMany(u => u.Complaints)
                   .WithOne(c => c.User)
                   .HasForeignKey(c => c.UserId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
