using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DBAccess.Models;

namespace DBAccess.Configurations
{
    public class ComplaintConfiguration : IEntityTypeConfiguration<Complaint>
    {
        public void Configure(EntityTypeBuilder<Complaint> builder)
        {
            builder.Property(c => c.AdditionalInfo)
                   .HasMaxLength(1000);

            builder.Property(c => c.Status)
                   .HasConversion<string>() // enum as string
                   .IsRequired();

            builder.Property(c => c.SubmittedAt)
                   .IsRequired();

            builder.HasMany(c => c.Documents)
                   .WithOne(d => d.Complaint)
                   .HasForeignKey(d => d.ComplaintId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
