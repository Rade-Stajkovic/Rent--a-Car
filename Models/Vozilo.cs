using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
namespace Models
{
    public class Vozilo
    {

    
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(50)]
        public string Naziv { get; set; }

        [Required]
        public int Cena { get; set; }

        public bool Status { get; set; }

        public string Slika { get; set; }

      
        public Vlasnik Vlasnik { get; set;}
    }

}