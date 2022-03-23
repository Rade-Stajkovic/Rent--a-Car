using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;
namespace Models
{
    public class Vlasnik
    {
         [Key]
        public int ID { get; set; }

        [Required]
        public string KorisnickoIme { get; set; }
        
        [Required]
        public string Lozinka { get; set; }

        [JsonIgnore]
        public List<Vozilo> Vozila { get; set;}

    }
}