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
 
    public class FirmaController : ControllerBase
    {
        public RentCarContext Context { get; set;}

        public FirmaController(RentCarContext  context)
        {
            Context = context;
        }

        [Route("PreuzmiFirme")]
        [HttpGet]
         public  ActionResult PreuzmiFirme()
        {
            return Ok(Context.Vlasnici);
        }

    }
}