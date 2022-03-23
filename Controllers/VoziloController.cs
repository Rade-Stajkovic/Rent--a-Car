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
 
    public class VoziloController : ControllerBase
    {
        public RentCarContext Context { get; set;}

        public VoziloController(RentCarContext  context)
        {
            Context = context;
        }


        [Route("PreuzmiVozila/{vlasnikID}")]
        [HttpGet]
        public  ActionResult Preuzmi(int vlasnikID)
        {
            try
            {

              if (vlasnikID<= 0)
                {
                    return BadRequest("Pogresan ID");
                    
                }


            return Ok(Context.Vozila.Where(p=> p.Vlasnik.ID==vlasnikID));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

          [Route("PreuzmiSlobodnaVozila/{vlasnikID}")]
        [HttpGet]
        public  ActionResult PreuzmiSlobodna(int vlasnikID)
        {
            try
            {
                if (vlasnikID<= 0)
                {
                    return BadRequest("Pogresan ID");
                    
                }

                return Ok(Context.Vozila.Where(p=> p.Vlasnik.ID==vlasnikID && p.Status==true));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("Vozila{vlasnikID}")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiVozila(int vlasnikID)
        {
            var vozila = await Context.Rezervacije
            .Include(p => p.Vozilo)
            .ThenInclude(p =>p.Naziv).ToListAsync();
             return Ok(Context.Vozila);
        }

        [Route("DodajVozilo/{vlasnikId}")]
        [HttpPost]

        public async Task<ActionResult> DodajVozilo(int vlasnikId,[FromBody] Vozilo vozilo)
        {
            if (string.IsNullOrWhiteSpace(vozilo.Naziv) || vozilo.Naziv.Length > 50 || vozilo.Cena<=0 || vlasnikId <=0) 
            {
                 return BadRequest("Pogresni podaci!");
                
            }

            try
            {
                var firma = await Context.Vlasnici.Where(v=>v.ID == vlasnikId).FirstOrDefaultAsync();
                if (firma == null)
                {
                    return BadRequest("Firma ne postoji!");
                    
                }
                vozilo.Vlasnik = firma;
                Context.Vozila.Add(vozilo);
                await Context.SaveChangesAsync();
                return Ok($"Vozilo je dodato! ID je: {firma.KorisnickoIme} a vlasnik je ");
                
            }
            catch (Exception e)
            {
                
               return BadRequest(e.Message);
            }

            


        }

        [Route("DodajVozilo2/{id}/{naziv}/{cena}/{slika}/{status}")]
        [HttpPost]

        public async Task<ActionResult> DodajVozilo2(int id, string naziv,int cena, string slika, bool status)
        {
            if (string.IsNullOrWhiteSpace(naziv) || naziv.Length > 50 || cena<=0 || id<=0 || string.IsNullOrWhiteSpace(slika))
            {
                 return BadRequest("Greska sa podacima!");
                
            }
            

            try
            {
                var vlasnik = Context.Vlasnici.Where(v=> v.ID==id).FirstOrDefault();
                if (vlasnik == null)
                {
                    return BadRequest("Vlasnik ne postoji");
 
                    
                }
                var vozilo = new Vozilo();
                vozilo.Naziv = naziv;
                vozilo.Cena = cena;
                vozilo.Slika = slika;
                vozilo.Status = status;
                vozilo.Vlasnik=vlasnik;

                Context.Vozila.Add(vozilo);
                await Context.SaveChangesAsync();
                return Ok($"Vozilo je dodato! ID je: {vozilo.ID}");
                
            }
            catch (Exception e)
            {
                
               return BadRequest(e.Message);
            }

        }

   


        [Route("PromeniVozilo/{idVozila}/{cena}/{status}/{ime}/{slika}")]
        [HttpPut]
        
        public async Task<ActionResult> Promeni(int idVozila, int cena, bool status,string ime,string slika)
        {
          try
          {
            if (string.IsNullOrWhiteSpace(ime) || ime.Length > 50 || cena<=0 || string.IsNullOrWhiteSpace(slika))
            {
                 return BadRequest("Greska sa podacima!");
                
            }


           var vozilo =    Context.Vozila.Where(p => p.ID == idVozila).FirstOrDefault();
           if (vozilo != null)
           {
               vozilo.Naziv = ime;
               vozilo.Cena = cena;
               vozilo.Status = status;
               vozilo.Slika = slika;
               await Context.SaveChangesAsync();
               return Ok($"Uspesno promenjeno vozilo! ID: {vozilo.ID}");
           }
           else
           {
               return BadRequest("Vozilo nije pronadjeno!");
           }
            
          }
          catch (Exception e)
          {
              return BadRequest(e.Message);
          }
        }
        

        [Route("PromeniVoziloFromBody")]
        [HttpPut]
        
        public async Task<ActionResult> PromeniFromBody([FromBody] Vozilo vozilo)
        {
          try
          {
            if (string.IsNullOrWhiteSpace(vozilo.Naziv) || vozilo.Naziv.Length > 50 || vozilo.Cena<=0 ) 
            {
                 return BadRequest("Pogresni podaci!");
                
            }
            
              Context.Vozila.Update(vozilo);

              await Context.SaveChangesAsync();
              return Ok($"Vozilo sa ID: {vozilo.ID} je uspesno izmenjen!");
         
          }
         
            
          
          catch (Exception e)
          {
              return BadRequest(e.Message);
          }
        }

        [Route("PromeniStatusVozilu/{id}")]
        [HttpPut]
        
        public async Task<ActionResult> PromeniStatus(int id)
        {
          try
          {
              if (id<=0)
              {
                  return BadRequest("Pogresan ID");
              }
              var vozilo = new Vozilo();
              vozilo = Context.Vozila.Where(v => v.ID == id).FirstOrDefault();
              if(vozilo == null )
                 return BadRequest("Ne postoji vozilo");
              vozilo.Status = false;
              Context.Vozila.Update(vozilo);

              await Context.SaveChangesAsync();
              return Ok($"Vozilo sa ID: {vozilo.ID} je uspesno izmenjen!");
         
          }
         
            
          
          catch (Exception e)
          {
              return BadRequest(e.Message);
          }
        }

        [Route("IzbrisiVozilo/{id}")]
        [HttpDelete]

        public async Task<ActionResult> Izbrisi(int id)
        {
          

            try
            {
                var vozilo = await Context.Vozila.FindAsync(id);
                if(vozilo == null )
                  return BadRequest("Ne postoji vozilo");
                
                Context.Vozila.Remove(vozilo);
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