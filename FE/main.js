import { Vozilo } from "./vozilo.js";




var dugme = document.getElementById("rez");
  

dugme.onclick=ev=>{
    fun();
}

/*var dugemVozila = document.getElementById("voz");
console.log(dugemVozila);
dugemVozila.onclick=ev=>{
  window.location="./prikazKorisnik.html";*/


var dugmeRez = document.getElementById("rez1");

dugmeRez.onclick=ev=>{
  window.location="./prikazKorisnik.html";
}
 







function fun()
{
  var ime = document.getElementById("ime").value;
  var lozinka = document.getElementById("lozinka").value;
  
    if (ime == "admin" && lozinka == "admin")
        window.location="./prikazVlasnik.html"
    else
       alert("Pogresno korisnicko ime ili lozinka!")

}


function forma()
{
  //const openModalButtons = document.querySelectorAll('[data-modal-target]');

  const closeModalButtons = document.querySelectorAll('[data-close-button]');

  var divForme = document.querySelector('.modal-body');

  const overlay =document.getElementById('overlay');
  const modal1 = document.querySelector('.modal');
  openModal(modal1);
  /*openModalButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
      const modal = document.querySelector(button.dataset.modalTarget);
      openModal(modal);
    })
  })*/

  closeModalButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
      const modal = button.closest('.modal');
      closeModal(modal,divForme);
    })
  })


  function openModal(modal)
  {
    if(modal == null) return
    modal.classList.add("active");
    overlay.classList.add("active");
  }

  function closeModal(modal)
  {
    if(modal == null) return
    modal.classList.remove('active');
    overlay.classList.remove ('active');

    divForme.appendChild(divZaOtkaz);
    divForme.removeChild(divZaOtkaz);
    var div = document.querySelector(".divKorsnikovihRezervacija")
    if(div!=null)
       divForme.removeChild(div);
    
  

  }

  
  const modal = document.getElementById("modal-body");
  console.log(modal);

  var divZaOtkaz = document.createElement("div");
  divZaOtkaz.classList.add("divZaOtkaz");
  divForme.appendChild(divZaOtkaz);
  

  var labela = document.createElement("label");
  labela.innerHTML="Unesite broj licne karte";
  labela.classList.add("labelaOtkaz");


  divZaOtkaz.appendChild(labela);

  var licnaKarta = document.createElement("input");
  licnaKarta.type="number";
  licnaKarta.classList.add("inputOtkaz");
  divZaOtkaz.appendChild(licnaKarta);

  var dugmePotvrdiOtkaz = document.createElement("button");
  dugmePotvrdiOtkaz.classList.add("dugmePotvrdiOtkaz")
  dugmePotvrdiOtkaz.innerHTML="Potvrdi";
  divZaOtkaz.appendChild(dugmePotvrdiOtkaz);
  dugmePotvrdiOtkaz.onclick=ev=>{

    divForme.removeChild(divZaOtkaz);
    
    divForme.appendChild(divKorisnikovihRezervacija);
    
    var brlk = licnaKarta.value;
    console.log(brlk);

    crtajRezervacije(divKorisnikovihRezervacija,brlk);
  }

  var divKorisnikovihRezervacija = document.createElement("div");
  divKorisnikovihRezervacija.classList.add("divKorsnikovihRezervacija");
  
  
}

var dugmeRez = document.querySelector(".dugmeOtkazi");
dugmeRez.onclick=ev=>
{
  forma();
}

 function crtajRezervacije(host,brlk)
{
  fetch("https://localhost:5001/Rezervacije/Rezervacije/"+brlk)
  .then(p=>{
    p.json().then(q =>{
      if(q==0)
      {
        var label = document.createElement("label");
        label.innerHTML="Nemate rezervacije";
        label.classList.add("poruka");
        host.appendChild(label);
      }
      q.forEach(p=>{
        console.log(p);
        var div = document.createElement("div");
        div.classList.add("JednaRezervacija");
        host.appendChild(div);
        var lista = ["Ime vozila", "Datum preuzimanja", "Datum vracanja","Cena"];
        
        var podaci = [p.naziv,p.datumPr,p.datumVr,p.cena];
        lista.forEach((p,ind)=>{
          var labela = document.createElement("label");
          labela.classList.add("labele");
          labela.innerHTML=p+": "+podaci[ind];
          div.appendChild(labela);
        })
        var dugme = document.createElement("button");
        dugme.innerHTML="Otkazi";
        dugme.classList.add("dugmeOtkaziRezervaciju"); 
        div.appendChild(dugme);  
        dugme.onclick=ev=>{
          var datum = new Date();
          var godina = datum.getUTCFullYear();
         var dan = datum.getDate();
         var mesec = datum.getMonth();
         
         mesec+=1;
 
         if(mesec<10)
         {
           mesec = '0'+mesec;
         }
         if(dan < 10)
         {
           dan= '0'+dan;
         }
 
         var datum = godina + "-" + mesec + "-" + dan;

          if (p.datumPr<datum) {
            alert("Ne mozete otkazati ovu rezervaciju");
            
          }
          else
          {
            obrisiRezervaciju(host,div,p.id,p.idVozila);
          }
        }
     })
    })
  })



}
function obrisiRezervaciju(host,div,id,idVozila)
{

 

  host.removeChild(div);
  fetch("https://localhost:5001/Rezervacije/IzbrisiJednuRezervaciju/"+id+"/"+idVozila, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json"
    }        
    })
    .then(response=>
        {
            if(response.ok)
            {
               // alert("Uspesno ste obrisali vozilo sa ID:"+id );
            }
        }).catch(error => console.log("error unpacking response " + error));

       
      
    


}





  