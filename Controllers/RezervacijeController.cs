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
 
    public class RezervacijeController : ControllerBase
    {
        public RentCarContext Context { get; set;}

        public RezervacijeController(RentCarContext  context)
        {
            Context = context;
        }

        [Route("DodajRezervaciju/{brlkKorisnika}/{idVozila}/{datumPr}/{datumVr}/{cena}")]
        [HttpPost]
         public  async  Task<ActionResult> Dodaj(int idVozila,int brlkKorisnika,DateTime datumPr,DateTime datumVr,int cena)
        {
            try{
            
            var korisnik = await Context.Korisnici.Where(v=>v.BrojLicneKarte == brlkKorisnika).FirstOrDefaultAsync();
         
             if (korisnik == null)
             {
                 return BadRequest("nema korisnika");
                 
             }

             var vozilo = await Context.Vozila.Where(v=>v.ID == idVozila).FirstOrDefaultAsync();
              
              if (vozilo == null)
             {
                 return BadRequest("nema vozilo");
                 
             }
             var rezervacija = new Rezervacija();
             rezervacija.DatumPreuzimanja = datumPr;
             rezervacija.DatumVracanja = datumVr;
             rezervacija.Cena = cena;
             rezervacija.Korisnik = korisnik;
             rezervacija.Vozilo = vozilo;
             
             vozilo.Status = false;
             Context.Update(vozilo);
             Context.Rezervacije.Add(rezervacija);
            await Context.SaveChangesAsync();
            return Ok($"Rezervacija je dodata, ID je {rezervacija.ID}");
            }
            
            catch (Exception e)
            {
                
               return BadRequest(e.Message);
            }

        }



        


         [Route("PreuzmiRezervacije/{idVozila}")]
        [HttpGet]
         public  ActionResult PreuzmiRezervacije(int idVozila)
        {
      
            return Ok(Context.Rezervacije.Where(p=> p.Vozilo.ID==idVozila));
        }

        [Route("Rezervacije/{korisnikBrlk}")]
        [HttpGet]
        public ActionResult PreuzmiVozila(int korisnikBrlk)
        {
            var rezervacije = Context.Rezervacije
          
            .Where(p=> p.Korisnik.BrojLicneKarte==korisnikBrlk);
           
           //.Include(p =>p.Vozilo.ID)
           //.Include(p=>p.Vozilo.Naziv);
          return Ok( rezervacije.Select(p=>
                  new{
                      ID = p.ID,
                      DatumPr = p.DatumPreuzimanja.ToShortDateString(),
                      DatumVr = p.DatumVracanja.ToShortDateString(),
                      Cena = p.Cena,
                      Naziv = p.Vozilo.Naziv,
                      IDVozila = p.Vozilo.ID

                  }
           
           ).ToList()
          );
           
           
        }

         [Route("IzbrisiRezervaciju/{id}")]
        [HttpDelete]

        public async Task<ActionResult> Izbrisi(int id)
        {
          
            try
            {
                var rezervacije = Context.Rezervacije.Where(p => p.Vozilo.ID==id);
              
                {
                    
                }
                foreach(var rezervacija in rezervacije){
               
                Context.Rezervacije.Remove(rezervacija);
                
                
                }
                  await Context.SaveChangesAsync();
                return Ok($"Uspsno izbrisane rezervacije vozila sa ID: {id}");
                
            }
            catch (Exception e)
            {
                
                return BadRequest(e.Message);
            }
        }

    

    
        [Route("IzbrisiJednuRezervaciju/{idRez}/{idVozila}")]
        [HttpDelete]

        public async Task<ActionResult> IzbrisiJednu(int idRez,int idVozila)
        {
          

            try
            {
                var rezervacija = Context.Rezervacije.Where(p => p.ID==idRez).FirstOrDefault();
                if (rezervacija == null)
                {
                    return BadRequest("Rezervacija ne postoji");
                    
                }
               // rezervacija.foreach (var rezervacija in collection)
                var vozilo = Context.Vozila.Where(p=> p.ID == idVozila).FirstOrDefault();
                if (vozilo == null)
                {
                     return BadRequest("Vozilo ne postoji");
                }

                vozilo.Status = true;
                    
                Context.Vozila.Update(vozilo);
               
                Context.Rezervacije.Remove(rezervacija);

                await Context.SaveChangesAsync();

                
                
                
                 
                return Ok($"Uspsno izbrisane rezervacije vozila sa ID: {idVozila}");
                
            }
            catch (Exception e)
            {
                
                return BadRequest(e.Message);
            }
        }

    
}



}