import { Vozilo } from "./Vozilo.js";
import { Firma } from "./Firma.js";

var div = document.createElement("div");
div.classList.add("GlavniDivZaKorisnika");
document.body.appendChild(div);

document.body.appendChild(div);
let listaFirmi = [];
function firma(){
    fetch("https://localhost:5001/Firma/PreuzmiFirme")
    .then(p => {console.log(p);
        p.json().then(q =>{
        q.forEach(p=>{console.log(p);
            var firma = new Firma(p.id, p.korisnickoIme);
            listaFirmi.push(firma);
        });console.log(listaFirmi);
        listaFirmi.forEach(firma =>{

          firma.kontejner = document.createElement("div");
          firma.kontejner.classList.add("divZaVozilaKorisnika");
          div.appendChild(firma.kontejner);
          crtajVozila(firma.id,firma.kontejner,firma.naziv);

          

          
        })

      })
  });
}
firma();

function crtajVozila(id,host,ime)
{
          let lab = document.createElement("labela");
          lab.classList.add("ImeFirme");
          lab.innerHTML = ime;
       
          host.appendChild(lab);

          var div = document.createElement("div");
          div.classList.add("vozilaDiv");
          host.appendChild(div);

          fetch("https://localhost:5001/Vozilo/PreuzmiSlobodnaVozila/"+id)
          .then(p => {console.log(p);
                  p.json().then(q =>{
                        console.log(q);
                      q.forEach(element => {
                            var vozilo = new Vozilo(element.id,element.naziv,element.cena,element.status,element.slika)
                           // vozilo.crtajZaKorisnike(divZaVozila);
                     
                           vozilo.kontejner =document.createElement("div");
                           vozilo.kontejner.classList.add("voziloDiv");
                           vozilo.kontejner.id="voziloDiv"
                           crtajJednoVozilo(vozilo.kontejner,vozilo.naziv,vozilo.cena,vozilo.id,vozilo.slika);
                           div.appendChild(vozilo.kontejner);
                           
                            
                      });
            
                 })
                      
                    
  
              });
          
        

    

}


function crtajJednoVozilo(host, naziv, cena,id,slika)
{
                      var div1 = document.createElement("div");
                      div1.classList.add("divZaSliku");
                      host.appendChild(div1);
                    
                
                      const image=document.createElement("img");
                      image.classList.add("image");
                      image.src="/Slike/"+slika+".jpg";
                      div1.appendChild(image);
                
                      var div2 = document.createElement("div");
                      div2.classList.add("divZaPodatke");
                      host.appendChild(div2);
                
                
                      const rezervisiBtn=document.createElement("button");
                      rezervisiBtn.classList.add("rezervisiBtn");
                      rezervisiBtn.id="rezevbtn";
                      rezervisiBtn.innerHTML="Rezervisi";
                     
                      rezervisiBtn.onclick=ev=>
                      {
                        
                       // p.status=false;
                        otvoriFormu(rezervisiBtn,naziv, cena,id);
                        //alert("Rezervisali ste vozilo");
                        
                      }
                
                      let voziloNaziv=document.createElement("p");
                      voziloNaziv.innerHTML="Naziv: "+ naziv;
                      voziloNaziv.classList.add("voziloNaziv");
                      div2.appendChild(voziloNaziv);
                
                      let voziloCena=document.createElement("p");
                      voziloCena.innerHTML=cena+"$ /day";
                      voziloCena.classList.add("voziloCena");
                      div2.appendChild(voziloCena);
                      div2.appendChild(rezervisiBtn);
}










     function otvoriFormu(btn, ime, cena,id){
         

      //const openModalButtons = document.querySelectorAll('[data-modal-target]');

        const closeModalButtons = document.querySelectorAll('[data-close-button]');
        
        const overlay =document.getElementById('overlay');
        
     
        const modal = document.querySelector('.modal');
        openModal(modal);
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
        var divForme = document.querySelector('.modal-body');
        
        function closeModal(modal,divForme)
        {
          if(modal == null) return
          modal.classList.remove('active');
          overlay.classList.remove ('active');
          var modal2 = divZaRezervaciju.parentNode;

          console.log(modal2);
          //obrisiSadrzaj(modal2);

          //divForme.removeChild(dugme);
          divForme.appendChild(divZaRezervaciju);
          divForme.appendChild(divZaKorisnika);
          divForme.removeChild(divZaRezervaciju);
          divForme.removeChild(divZaKorisnika);
        }
        
        function obrisiSadrzaj(divForme)
        {
          var mod = document.querySelector("modal-body");
          console.log(mod);
          //divForme.removeChild(dugme);
          divForme.removeChild(divZaRezervaciju);
          divForme.removeChild(divZaKorisnika);

        }
        
       
        
        const selectOpcije = document.createElement("select");

        
        
        const divZaRezervaciju  = document.createElement("div");
        divZaRezervaciju.classList.add("divZaRezervaciju");
        divForme.appendChild(divZaRezervaciju);

        let naziv = document.createElement("label");
        naziv.classList.add("nazivLabela");
        naziv.innerHTML= ime;
        
        divZaRezervaciju.appendChild(naziv);


        let nazivDatuma = document.createElement("label");
        nazivDatuma.classList.add("labelaZaDatum");
        nazivDatuma.innerHTML= "Datum preuzimanja";
        divZaRezervaciju.appendChild(nazivDatuma);
        let datumPreuzimanja = document.createElement("input");
        datumPreuzimanja.setAttribute("type","date");
        datumPreuzimanja.classList.add("izaberiDatum");
        //datumPreuzimanja.setAttribute("min",)
        var date = new Date();
        
        var godina = date.getUTCFullYear();
        var dan = date.getDate();
        var mesec = date.getMonth();
        
        mesec+=1;

        if(mesec<10)
        {
          mesec = '0'+mesec;
        }
        if(dan < 10)
        {
          dan= '0'+dan;
        }

        var courentDay = godina + "-" + mesec + "-" + dan;
        
       // console.log(dat);
   

       


       datumPreuzimanja.defaultValue=courentDay;
       var nextDay = new Date();
        //naziv.classList=("nazivLabela");
        datumPreuzimanja.innerHTML= "Datum preuzimanja";
        divZaRezervaciju.appendChild( datumPreuzimanja);
        datumPreuzimanja.setAttribute("min",courentDay);

        datumPreuzimanja.addEventListener('change', ()=>{
          
         var nextDay = new Date(datumPreuzimanja.value);
        // nextDay = datumPreuzimanja.value;
         nextDay.setDate(nextDay.getDate()+1);
 
         var godina = nextDay.getUTCFullYear();
         var dan = nextDay.getDate();
         var mesec = nextDay.getMonth();
         mesec+=1;

        if(mesec<10)
        {
          mesec = '0'+mesec;
        }
        if(dan < 10)
        {
          dan= '0'+dan;
        }

        

          var nextDay = godina + "-" + mesec + "-" + dan;
          console.log(nextDay);
          datumVracanja.defaultValue=nextDay;
          datumVracanja.setAttribute("min",nextDay);
          var datum1 = new Date(datumPreuzimanja.value);
          var datum2 = new Date(datumVracanja.value);
          datum1 = datum1.getTime();
          datum2 = datum2.getTime();
          var razlika =  datum2 - datum1
          var msInDay = 1000 * 3600 *24;
          var rezultat = razlika/msInDay; 
          ukupnaCena = cena*rezultat;
          labela.innerHTML="Ukupna cena je "+ukupnaCena+" $";

        });

     
       
        var nextDay = new Date();
        nextDay.setDate(nextDay.getDate()+1);
 
        var godina = nextDay.getUTCFullYear();
         var dan = nextDay.getDate();
         var mesec = nextDay.getMonth();
         
         mesec+=1;
 
         if(mesec<10)
         {
           mesec = '0'+mesec;
         }
         if(dan < 10)
         {
           dan= '0'+dan;
         }
 
         var nextDay = godina + "-" + mesec + "-" + dan;

        

        let nazivDatuma2 = document.createElement("label");
        nazivDatuma2.classList.add("labelaZaDatum");
      //  naziv.classList=("nazivLabela");
        nazivDatuma2.innerHTML= "Datum vracanja";
        divZaRezervaciju.appendChild(nazivDatuma2);
       
        let datumVracanja = document.createElement("input");
        datumVracanja.setAttribute("type","date");
        datumVracanja.setAttribute("min",nextDay);
        datumVracanja.classList.add("izaberiDatum");

        datumVracanja.defaultValue = nextDay;
        //naziv.classList=("nazivLabela");
        datumPreuzimanja.innerHTML= "Datum vracanja";
        divZaRezervaciju.appendChild( datumVracanja);

        datumVracanja.addEventListener('change', ()=>{

         
          var datum1 = new Date(datumPreuzimanja.value);
          var datum2 = new Date(datumVracanja.value);
          datum1 = datum1.getTime();
          datum2 = datum2.getTime();
          var razlika =  datum2 - datum1
          var msInDay = 1000 * 3600 *24;
          var rezultat = razlika/msInDay; 
          ukupnaCena = cena*rezultat;
          labela.innerHTML="Ukupna cena je "+ukupnaCena+" $";

        });

        var datum1 = new Date(datumPreuzimanja.value);
        var datum2 = new Date(datumVracanja.value);
        datum1 = datum1.getTime();
        datum2 = datum2.getTime();
        var razlika =  datum2 - datum1
        var msInDay = 1000 * 3600 *24;
        var rezultat = razlika/msInDay; 
       

        let ukupnaCena = cena*rezultat;
        var dugme  = document.createElement("labela");
        dugme.innerHTML="";
        divZaRezervaciju.appendChild(dugme);
        let labela = document.createElement("label");
        labela.innerHTML="Ukupna cena je "+ukupnaCena+" $";
        labela.classList.add("labelaZaCenu");
        divZaRezervaciju.appendChild(labela);
       
        dugme.onclick=ev=>{
          var datum1 = new Date(datumPreuzimanja.value);
          var datum2 = new Date(datumVracanja.value);
          datum1 = datum1.getDate();
          datum2 = datum2.getDate();

          var rez = datum2 - datum1;
          ukupnaCena = cena*rez;
          

         // alert(cena1);
         labela.innerHTML=ukupnaCena+" $";
        dugmePotvrdi.removeAttribute('disabled');
        dugmePotvrdi.style.visibility='visible';

        }
        console.log(ukupnaCena);

        var dugmePotvrdi = document.createElement("button");
        dugmePotvrdi.innerHTML="Potvrdi"
        dugmePotvrdi.classList.add("dugmePotvrdi");
       


       // POTVRDI REZERVACIJU
        divZaRezervaciju.appendChild(dugmePotvrdi);
        dugmePotvrdi.onclick=ev=>{


          var imee = document.querySelector(".input0").value;
          var prezimee = document.querySelector(".input1").value;
          var brlkk = document.querySelector(".input2").value;
          if (imee == "" || prezimee=="" || brlkk==0) {
            alert("Morate uneti sve podatke!");
          }
          else
          {


            dodajKorisnikaIRezervaciju(id,ukupnaCena,datumPreuzimanja.value,datumVracanja.value,brlkk,imee,prezimee);
  
          }

          



        }


        const divZaKorisnika  = document.createElement("div");
        divZaKorisnika.classList.add("divZaKorisnika");
        divForme.appendChild(divZaKorisnika);

        let podaci = ["Ime","Prezime","Brojelicnekarte"];
        let tip = ["text","text","number"];
        podaci.forEach((p,ind)=>{
          
        let l = document.createElement("label");
        l.classList.add(p);
        l.innerHTML= p;
        divZaKorisnika.appendChild(l);

        let input = document.createElement("input");
        input.type=tip[ind];
        input.classList.add("input"+ind);
        divZaKorisnika.appendChild(input);

        })
      }

      function dodajKorisnikaIRezervaciju(id,cenaa,datumPr,datumVr,brlkk,imee,prezimee)
      {
        console.log(cenaa);
               
                
                console.log(datumPr);
                console.log(datumVr);
        
     


                

                var emaill = "rade25@gmail.com";

                console.log(brlkk);
                console.log(imee);

                console.log(prezimee);

                console.log(datumPr);

                console.log(datumVr);
                console.log(id);
                console.log(cenaa);






                fetch("https://localhost:5001/Korisnik/DodajKorisnika/"+brlkk+"/"+imee+"/"+prezimee+"/"+datumPr+"/"+datumVr+"/"+cenaa+"/rade@gmail.com/"+id,{
                  method: "POST",
             
                  }).then(p => {console.log(p);
                    if(p.ok){
                        console.log("Succesful")
                        location.reload();
                            }
                    else if(p.status == 400){
                        alert("Pogresni podaci!");
                        }
                  }).catch(p=>
                            {
                                console.log("Error: "+p);
                            });
               
                
              
            }             
    
                                
                              

        

