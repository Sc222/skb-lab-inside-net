using Microsoft.EntityFrameworkCore;

namespace Storage
{
    public class StorageContext : DbContext
    {
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = "Host=localhost;Port=5432;Username=postgres;Password=wt;Database=multimarket;";
            optionsBuilder.UseNpgsql(connectionString)
                .UseLazyLoadingProxies();
        }
    }
}