
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Text.Json.Serialization;
namespace Models
{
    public class Rezervacija
    {
        [Key]
      
        public int ID { get; set; }

        [Required]
        public DateTime DatumPreuzimanja { get; set; }

        [Required]
        public DateTime DatumVracanja { get; set; }

        [Required]
        public int Cena { get; set; }

        
        public Vozilo Vozilo { get; set;}
        
        public Korisnik Korisnik { get; set;}

    }

}