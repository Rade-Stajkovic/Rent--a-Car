using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Web;
using Models;

using System.Text.Json.Serialization;


namespace WebProjekat.Controllers
{
    [ApiController]
    [Route("[controller]")]
 
    public class KorisnikController : ControllerBase
    {
        public RentCarContext Context { get; set;}

        public KorisnikController(RentCarContext  context)
        {
            Context = context;
        }

        [Route("DodajKorisnika")]
        [HttpPost]
         public  ActionResult Dodaj([FromBody] Korisnik korisnik)
        {
            try
            {
            

                Context.Korisnici.Add(korisnik);
                Context.SaveChangesAsync();
                return Ok($"Korisnik je dodat, ID je {korisnik.ID}");
            }
            
            catch (Exception e)
            {
                
               return BadRequest(e.Message);
            }

        }

        /// KORISTIM

         [Route("DodajKorisnika/{brlk}/{ime}/{prezime}/{datumPr}/{datumVr}/{cena}/{email}/{idVozila}")]
         [HttpPost]
         public async Task<ActionResult> Dodaj2(int brlk,string ime,string prezime,DateTime datumPr,DateTime datumVr,int cena,string email,int idVozila)
        {
         try{
                if (brlk<=0 || brlk>99999999 || string.IsNullOrWhiteSpace(ime) || string.IsNullOrWhiteSpace(prezime) || cena <= 0)
                {

                    return BadRequest("Pogresni podaci");
                    
                }

            

                var vozilo = Context.Vozila.Where(p=>p.ID==idVozila).FirstOrDefault();
                if (vozilo == null)
                {
                    return BadRequest("Vozilo ne postoji");
                    
                }
                vozilo.Status = false;

                var rezervacija = new Rezervacija();
                rezervacija.Cena = cena;
                rezervacija.DatumPreuzimanja=datumPr;
                rezervacija.DatumVracanja = datumVr;
                
                rezervacija.Vozilo = vozilo;
                Context.Rezervacije.Add(rezervacija);

                
               

                var korisnik = Context.Korisnici.Where(p=>p.BrojLicneKarte==brlk).FirstOrDefault();
                if(korisnik == null)
                {
                    var korisnik2 = new Korisnik();
                    korisnik2.BrojLicneKarte=brlk;
                    korisnik2.Ime = ime;
                    korisnik2.Prezime = prezime;
                    korisnik2.Email =email;
                    rezervacija.Korisnik = korisnik2;
                    Context.Korisnici.Add(korisnik2);
                    await Context.SaveChangesAsync();
                    return Ok($"Korisnik je dodat, ID je {korisnik2.ID}");
                }

                rezervacija.Korisnik = korisnik;
                

                Context.Korisnici.Update(korisnik);
                await Context.SaveChangesAsync();
                return Ok($"Korisnik je dodat, ID je {korisnik.ID}");
            }
            
            catch (Exception e)
            {
                
               return BadRequest(e.Message);
            }

        }

      

         [Route("PreuzmiKorisnike")]
        [HttpGet]
         public  ActionResult PreuzmiKorisnike()
        {
            return Ok(Context.Korisnici);
        }

        
        [Route("IzbrisiKorisnika/{id}")]
        [HttpDelete]

        public async Task<ActionResult> Izbrisi(int id)
        {
          

            try
            {
                var korisnik = await Context.Korisnici.FindAsync(id);
                if (korisnik==null)
                {
                    return BadRequest("Korisnik ne postoji");
                    
                }
                Context.Korisnici.Remove(korisnik);
                await Context.SaveChangesAsync();
                return Ok($"Uspsno izbrisano vozilo sa ID: {id}");
            }
            catch (Exception e)
            {
                
                return BadRequest(e.Message);
            }
        }

    }
}