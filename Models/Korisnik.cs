using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;


namespace  Models


{
    [Table("Korisnik")]
    public class Korisnik
    {
        [Key]
        public int ID { get; set;}

        [Required]
        public int BrojLicneKarte { get; set; }
        
        [Required]
        [MaxLength(50)]   
        public string Ime { get; set; }
        
        [Required]
        [MaxLength(50)]
        public string Prezime { get; set; }

        [Required]
        [RegularExpression(@"\A(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\Z")]
        public string Email { get; set; }

        [JsonIgnore]
        public List<Rezervacija> Rezervacije {get; set;}
    }
}