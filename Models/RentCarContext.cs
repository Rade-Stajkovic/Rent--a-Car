using Microsoft.EntityFrameworkCore;

namespace Models
{
    public class RentCarContext : DbContext
    {
        public DbSet<Korisnik> Korisnici { get; set; }

        public DbSet<Vlasnik> Vlasnici { get; set;}

        public DbSet<Rezervacija> Rezervacije { get; set; }

        public DbSet<Vozilo> Vozila { get; set; }

        public RentCarContext(DbContextOptions options) : base(options)
        {
            
        }
    
     
    }


}