using Microsoft.EntityFrameworkCore;
using Storage.Entities;

namespace Storage
{
    public class StorageContext : DbContext
    {
        public DbSet<Person> Persons { get; set; }
        public DbSet<PersonContact> PersonContacts { get; set; }
        public DbSet<Position> Positions { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Vacation> Vacations { get; set; }
        public DbSet<NotificationsChannel> NotificationsChannel { get; set; }
        public DbSet<PersonRole> PersonRoles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PersonContact>().HasKey(p => new {p.PersonId, p.ContactId});

            modelBuilder.Entity<PersonRole>().HasKey(r => new {r.PersonId, r.RoleId});

            modelBuilder.Entity<Person>().HasOne(p => p.Position).WithMany().OnDelete(DeleteBehavior.NoAction).IsRequired();

            modelBuilder.Entity<Person>().HasIndex(p => p.Login).IsUnique();
            modelBuilder.Entity<Person>().HasIndex(p => p.Telegram).IsUnique();
            modelBuilder.Entity<Person>().HasIndex(p => p.Slack).IsUnique();
            modelBuilder.Entity<Person>().HasIndex(p => p.SlackId).IsUnique();
            modelBuilder.Entity<Person>().HasIndex(p => p.Email).IsUnique();
            modelBuilder.Entity<Person>().HasIndex(p => p.PhoneNumber).IsUnique();

            modelBuilder.Entity<Role>().HasIndex(r => r.Name).IsUnique();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            const string connectionString = "Host=localhost;Port=5432;Username=postgres;Password=wt;Database=postgres;";
            optionsBuilder.UseNpgsql(connectionString)
                .UseLazyLoadingProxies();
        }
    }
}