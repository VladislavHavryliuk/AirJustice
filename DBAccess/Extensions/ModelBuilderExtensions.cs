using Microsoft.EntityFrameworkCore;

namespace DBAccess.Extensions
{
    public static class ModelBuilderExtensions
    {
        public static void ApplyConfigurations(this ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(ModelBuilderExtensions).Assembly);
        }
    }
}
