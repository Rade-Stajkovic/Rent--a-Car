import {Vozilo} from "./vozilo.js"


   
        var div = document.createElement("div");
        div.classList.add("GlavniDivZaVlasnika");
        document.body.appendChild(div);


        var divZaFormu = document.createElement("div");
        divZaFormu.classList.add("divZaFormu");
        div.appendChild(divZaFormu);


        

        var divZaVozila = document.createElement("div");
        divZaVozila.classList.add("divZaVozila");
        div.appendChild(divZaVozila);

        var izaberiFirmu = document.createElement("select");
        divZaFormu.appendChild(izaberiFirmu);
        izaberiFirmu.classList.add("izaberiFirmu");

      




        let firme= [];
        let opcija;

    
            fetch("https://localhost:5001/Firma/PreuzmiFirme")
            .then(p => {console.log(p);
                p.json().then(q =>{
                q.forEach(p=>{
                opcija = document.createElement("option");
                opcija.value=p.id;
                opcija.innerHTML=p.korisnickoIme;
                izaberiFirmu.appendChild(opcija);
                });
               crtajOstalo();
        
        })
        });
       
      
function crtajOstalo(){

    var dugmePrikazi = document.createElement("button");
    dugmePrikazi.innerHTML="Prikazi";
    //divZaFormu.appendChild(dugmePrikazi);
   /* dugmePrikazi.onclick=ev=>{
        
           prikaziVozila();
    }*/
    prikaziFormu(divZaFormu);

        var opcija2 = div.querySelector('.izaberiFirmu');
        console.log(opcija2);
       
        var id = opcija2.value;
        console.log(id);

        opcija2.addEventListener('change', ()=>{

            prikaziVozila(opcija2.value,divZaVozila);
        });
    


        function prikaziVozila(id,host){
           var div = document.createElement("div");
            div = obrisiPrethodno();
            div.classList.add("divZaVozila");
           console.log(id);

        fetch("https://localhost:5001/Vozilo/PreuzmiVozila/"+id)
            .then(p => {//console.log(p);
                    
                    p.json().then(q =>{
                        console.log(q);
                        q.forEach(element => {//console.log(element);
                            var vozilo = new Vozilo(element.id,element.naziv,element.cena,element.status, element.slika)
                            vozilo.crtajVozilo(div,divZaFormu ); 
                            //listaVozila.push(vozilo);
                        });
                
                                
                    })
                });
            
            }prikaziVozila(id);



            function prikaziFormu(host){

                var host = document.createElement("div");
                host.classList.add("divZaFormuTren");
                divZaFormu.appendChild(host);
               // host = obrisiPrethodno();
                
                let labelHTML=["Naziv","Cena","Slika"];
                let inputType=["text","number","text"];
                
                for (let index = 0; index < labelHTML.length ;index++) 
                {
                        let label= document.createElement("label");
                        label.innerHTML=labelHTML[index];
                        label.classList.add(labelHTML[index]);
                        host.appendChild(label);
                
                        var input=document.createElement("input");
                        input.type=inputType[index];
                        input.classList.add("input"+labelHTML[index]);
                        input.placeholder="Enter..";
                        host.appendChild(input);  
                    
                        
                }
                
                let l = document.createElement("label");
                l.innerHTML="Slobodno";
                l.classList.add("labelaStatus");
                host.appendChild(l);
                var statusSlobodno = document.createElement("input");
                statusSlobodno.type="radio";
                statusSlobodno.innerHTML="pozz";
                statusSlobodno.name="status";
                statusSlobodno.classList.add("dugmeStatus");
                statusSlobodno.value=true;
                host.appendChild(statusSlobodno);

                let l1 = document.createElement("label");
                l1.innerHTML="Rezervisano";
                l1.classList.add("labelaStatus");
                host.appendChild(l1);
                var statusRez = document.createElement("input");
                statusRez.type="radio";
                statusRez.innerHTML="pozz";
                statusRez.name="status";
                statusRez.classList.add("dugmeStatusRezervisano");
                statusRez.value=false;
                host.appendChild(statusRez);

                var dodajDugme = document.createElement("button");
                dodajDugme.innerHTML="Dodaj";
                dodajDugme.classList.add("dodajDugme");
                dodajDugme.onclick=ev=>{
                    dodajIliAzuriraj(dodajDugme.innerHTML);
                }
                host.appendChild(dodajDugme);
        
            }



        function dodajIliAzuriraj(type)
        {
                var opcija2 = divZaFormu.querySelector("select");
                var idVlasnika = opcija2.options[opcija2.selectedIndex].value;
                const nazivv = divZaFormu.querySelector(".inputNaziv").value;
                
                console.log(nazivv);
                const  cenaa = divZaFormu.querySelector(".inputCena").value;
                console.log(cenaa);
                const slikaa= divZaFormu.querySelector(".inputSlika").value;
                console.log(slikaa);
                const statuss1 = divZaFormu.querySelector("input[type='radio']:checked");
                console.log(statuss1);
                console.log(idVlasnika);
                const idd=divZaFormu.querySelector(".dodajDugme").value;
                if (nazivv=="" || cenaa==0 || slikaa=="" || statuss1 == null) 
                {
                    alert("Morate uneti sve podatke");
                    
                }

                else
                {
              
                  const statuss = statuss1.value;

                    
            

                
                        
                        if (type=="Dodaj") 
                        {    
                            const idd =0;
                            var vozilo = new Vozilo(nazivv,)

                            fetch("https://localhost:5001/Vozilo/DodajVozilo2/"+idVlasnika+"/"+nazivv+"/"+cenaa+"/"+slikaa+"/"+statuss,{
                                    method: "POST",
                                     
                            }).then(p => {console.log(p);
                                    if(p.ok){
                                        console.log("Succesful")
                                        location.reload();
                                    }
                                    else if(p.status == 400){
                                        alert("Pogresni podaci");
                                    }
                                }).catch(p=>
                                            {
                                                console.log("Error: "+p);
                                            });

                        // location.reload();
                        }
                    

                        else if(type=="Izmeni")
                        {
                            
                    
                            fetch("https://localhost:5001/Vozilo/PromeniVozilo/"+idd+"/"+cenaa+"/"+statuss+"/"+nazivv+"/"+slikaa,{
                                            method: "PUT"
                                
                                    }).then(p => {console.log(p);
                                        if(p.ok){
                                            console.log("Succesful")
                                            location.reload();
                                        }
                                        else if(p.status == 400){
                                            alert("Pogresni podaci");
                                        }
                                    }).catch(p=>
                                                {
                                                    console.log("Error: "+p);
                                                });
                        }
                    // location.reload();
                }
                    
                    
                            
                    
                        

                    
                        
                }

                function fillEditForm(p)
                    {
                        let edit=divZaFormu.querySelector(".inputNaziv");
                        console.log(edit);
                        edit.value=p.naziv;

                        edit=divZaFormu.querySelector(".inputSlika");
                        edit.value=p.slika;

                        edit=divZaFormu.querySelector(".inputCena");
                        edit.value=p.cena;

                        

                        edit=this.divZaFormu.querySelector(".dodajDugme");
                        edit.innerHTML="Update";
                        edit.value=p.id;

                    }


                    function obrisiPrethodno()
                    {
                    

                        var div1 = document.querySelector(".divZaVozila")
                        console.log(div1);
                        var roditelj = div1.parentNode;
                        console.log(roditelj);

                        roditelj.removeChild(div1);

                        var dete =  document.createElement("div");
                        dete.classList.add(".divZaVozila")
                        roditelj.appendChild(dete);
                        return dete;

                        

                    }
                

        }

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

