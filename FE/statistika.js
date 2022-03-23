import { Firma } from "./Firma.js";
import { Vozilo } from "./vozilo.js";


var graf = document.getElementById("statistikaGraf");

graf.style.display="flex";

var vrednostix = [];
var vrednostiy = [];
var i = 0;
var j = 0;




function crtaj(id)
{
    chart(id);
    async function  crtajGrafike(id)
    {
            
            fetch("https://localhost:5001/Vozilo/PreuzmiVozila/"+id)
                .then(p => {//console.log(p);
                        
                        p.json().then(q =>{
                            console.log(q);
                            q.forEach(element => {//console.log(element);
                                vrednostix[i++] = element.naziv;
                            
                                fetch("https://localhost:5001/Rezervacije/PreuzmiRezervacije/"+element.id)
                                .then(p => {//console.log(p);
                        
                                    p.json().then(q =>{ 
                                    
                                        console.log(q);
                                        var rezervacija =0;
                                        
                                        q.forEach(element => {
                                        console.log(rezervacija);
                                        rezervacija+=1;
                            
                                        });
                                        vrednostiy[j++] = rezervacija;

                                    });

                                })
                            });
                        })
                    })
                }
                       
               async function chart(id){
                   await crtajGrafike(id);

                            console.log(vrednostix);
                            console.log(vrednostiy);    

                            var graf=  new Chart("statistikaGraf", {
                                type: "bar",
                                data: {
                                labels: vrednostix,
                                datasets: [{
                                label:'Broj rezervacija',
                                backgroundColor:  'rgb(255,165,0)',
                                data: vrednostiy
                                }]
                            },
                            options: {
                                scales: {
                                x: {
                                    title: {
                                    font: {
                                        size: 25,
                                        weight: "bold"
                                    },
                                    color: 'gold'
                                    },
                            
                                    ticks: {
                                    font: {
                                        size: 15,
                                        weight: "bold"
                                    },
                                    color: 'gold',
                                    },
                                },
                            
                                y: {
                                    title: {
                                    font: {
                                        /*size: 40,*/
                                    // weight: "bold"
                                    },
                                    //color: 'gold'
                                    },
                            
                                 ticks: {
                                    beginAtZero: true,
                                    font: {
                                        size: 40,
                                        weight: "gold"
                                    },
                                    color: 'gold'
                                    }
                                }
                                }
                            }
                    }) 
                }
            }

    fetch("https://localhost:5001/Firma/PreuzmiFirme")
    .then(p => {console.log(p);
        p.json().then(q =>{
          q.forEach(p=>{console.log(p);
           crtaj(p.id);
            });
        })
    })


/*var glavniDiv = document.createElement("div");
glavniDiv.classList.add("glavniDiv");
document.body.appendChild(glavniDiv);

function firma(){
let listaFirmi = [];
fetch("https://localhost:5001/Firma/PreuzmiFirme")
    .then(p => {console.log(p);
        p.json().then(q =>{
        q.forEach(p=>{console.log(p);
            var firma = new Firma(p.id, p.korisnickoIme);
            listaFirmi.push(firma);
        });console.log(listaFirmi);
        listaFirmi.forEach(firma =>{
            console.log(firma);
            firma.kontejner = document.createElement("div");
            firma.kontejner.classList.add("divFirme");
            glavniDiv.appendChild(firma.kontejner)

           crtajStatistiku(firma.id, firma.kontejner);



        
        
        })
    })
  
})
}firma();

function crtajStatistiku(id, host)
{
    let listaVozila = [];
    fetch("https://localhost:5001/Vozilo/PreuzmiVozila/"+id)
    .then(p => {//console.log(p);
            
            p.json().then(q =>{
                console.log(q);
                q.forEach(element => {//console.log(element);
                    var vozilo = new Vozilo(element.id,element.naziv,element.cena,element.status, element.slika)
                   
                     listaVozila.push(vozilo);
                });
                listaVozila.forEach(vozilo=>{
                    vozilo.kontejner = document.createElement("div");
                    vozilo.kontejner.classList.add("divVozila");
                    host.appendChild(vozilo.kontejner);
                    let labela = document.createElement("label");
                    labela.classList.add("naziv");
                    labela.innerHTML=vozilo.naziv;
                    vozilo.kontejner.appendChild(labela);
                    crtajRezervacije(vozilo.kontejner,vozilo.id);
                   
                })
        
                        
            })
        });
}

function crtajRezervacije(host, id)
{
    var div = document.createElement("div");
    div.classList.add("divZaGraf");
   
    let rezervacije = 0;
    fetch("https://localhost:5001/Rezervacije/PreuzmiRezervacije/"+id)
    .then(p => {//console.log(p);
            
        p.json().then(q =>{
            console.log(q);
            q.forEach(element => {console.log(element);
                
               rezervacije = rezervacije+1;
               console.log(rezervacije);
                
            });
      
            console.log(rezervacije);
            let labela = document.createElement("label");
            labela.classList.add("brRez");
            labela.innerHTML="Broj rezervacija "+rezervacije;
            console.log(labela);
            host.appendChild(labela);
            host.appendChild(div);
        
            for (let index = 0; index < rezervacije; index++) {
               var crveniDiv = document.createElement("div");
               crveniDiv.classList.add("cerveniDiv");
               div.appendChild(crveniDiv);
                
            }
            
    
                    
        })
    });


}*/




















var dugemVozila = document.getElementById("voz");
console.log(dugemVozila);
dugemVozila.onclick=ev=>{
window.location="./prikazVlasnik.html";
}

var dugemVozila = document.getElementById("statistika");
console.log(dugemVozila);
dugemVozila.onclick=ev=>{
window.location="./statistika.html";
}