using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DBAccess.Models;

namespace DBAccess.Configurations
{
    public class DocumentConfiguration : IEntityTypeConfiguration<Document>
    {
        public void Configure(EntityTypeBuilder<Document> builder)
        {
            builder.Property(d => d.FileName)
                   .HasMaxLength(255)
                   .IsRequired();

            builder.Property(d => d.ContentType)
                   .HasMaxLength(100)
                   .IsRequired();

            builder.Property(d => d.FileData)
                   .IsRequired();

            builder.Property(d => d.UploadedAt)
                   .IsRequired();
        }
    }
}
