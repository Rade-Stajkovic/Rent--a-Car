export class Vozilo
{
    constructor(id, naziv,cena,status,slika) 
    {
        this.id = id;
        this.naziv = naziv;
        this.cena = cena;
        this.slika = slika;
        this.status = status;
        this.kontejner = null;
        this.divZaFormu = null;
        this.prethodniDiv =null;
        
    }

     crtajVozilo(host, divForma) 
    {
       this.divZaFormu = divForma;
       
       this.kontejner =document.createElement("div");
     
       
       
       this.kontejner.classList.add("voziloDiv");
       host.appendChild(this.kontejner);

       if(this.status==false)
       
          this.kontejner.classList.add("voziloDiv2");

       
       var div1 = document.createElement("div");
       div1.classList.add("divZaSliku");
       this.kontejner.appendChild(div1);
       
      
       const image=document.createElement("img");
        image.classList.add("image");
        image.src="/Slike/"+this.slika +".jpg";
        //image.src="/Slike/OpelCorsa.jpg";
        div1.appendChild(image);

       var div2 = document.createElement("div");
       div2.classList.add("divZaPodatke");

       this.kontejner.appendChild(div2);
       let voziloNaziv=document.createElement("label");
       div2.appendChild(voziloNaziv);
       let voziloCena=document.createElement("label");
       div2.appendChild(voziloCena);
       let voziloStatus=document.createElement("label");
       div2.appendChild(voziloStatus);

       const deleteBtn=document.createElement("button");
       deleteBtn.classList.add("deleteBtn");
       deleteBtn.innerHTML="X";
       div2.appendChild(deleteBtn);
       deleteBtn.onclick=ev=>
       {
         if(this.status==false)
         alert("Ne mozete obrisati rezervisano vozilo");
         else{
        const parent=this.kontejner.parentNode;
        parent.removeChild(this.kontejner);
        console.log(this.id);
        this.obrisiVozilo(this.id);
      }
        
       }
      

       const updateBtn=document.createElement("button");
       updateBtn.classList.add("updateBtn");
       updateBtn.innerHTML="Izmeni";
       updateBtn.onclick=ev=>
       {
         var vozilo = document.querySelector(".promeniBorder");
         if (vozilo !=null) {
           vozilo.classList.remove("promeniBorder")
         }
         
          this.kontejner.classList.add("promeniBorder");
         
           
           this.fillEditForm();
           
        }
       div2.appendChild(updateBtn);

     
       voziloNaziv.innerHTML=this.naziv;
       voziloNaziv.classList.add("voziloNaziv");
      

       
       voziloCena.innerHTML=this.cena+"$ /day";
       voziloCena.classList.add("voziloCena");
      

      
       console.log(this.naziv);
       console.log(this.status);
       if (this.status===true) {
        voziloStatus.innerHTML="Slobodno";
       }
       else
       {
       voziloStatus.innerHTML="Rezervisano";
       }
       voziloStatus.classList.add("voziloCena");
       

       



    } 



   async obrisiVozilo(id)
    {
      await this.obrisiRezervaciju(id);
        fetch("https://localhost:5001/Vozilo/IzbrisiVozilo/"+id,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }        
        })
        .then(response=>
            {
                if(response.ok)
                {
                    alert("Uspesno ste obrisali vozilo " + this.naziv);
                }
            }).catch(error => console.log("error unpacking response " + error));
             
    }

    crtajZaKorisnike(host)
    {

        this.kontejner =document.createElement("div");
       this.kontejner.classList.add("voziloDiv");
       this.kontejner.id="voziloDiv"
       host.appendChild(this.kontejner);
       

       var div1 = document.createElement("div");
       div1.classList.add("divZaSliku");
       this.kontejner.appendChild(div1);

       const image=document.createElement("img");
        image.classList.add("image");
        image.src="/Slike/OpelCorsa.jpg";
        div1.appendChild(image);

        var div2 = document.createElement("div");
        div2.classList.add("divZaPodatke");
        this.kontejner.appendChild(div2);


        const rezervisiBtn=document.createElement("button");
        rezervisiBtn.classList.add("rezervisiBtn");
        rezervisiBtn.id="rezevbtn";
        rezervisiBtn.innerHTML="Rezervisi";
        div2.appendChild(rezervisiBtn);
        rezervisiBtn.onclick=ev=>
        {
          alert("Rezervisali ste vozilo sa"+this.naziv);
          this.status=false;
          this.otvoriFormu();
         
        }

        let voziloNaziv=document.createElement("p");
        voziloNaziv.innerHTML="Naziv: "+this.naziv;
        voziloNaziv.classList.add("voziloNaziv");
        div2.appendChild(voziloNaziv);
 
        let voziloCena=document.createElement("p");
        voziloCena.innerHTML=this.cena+"$ /day";
        voziloCena.classList.add("voziloCena");
        div2.appendChild(voziloCena);
 


    }

    fillEditForm()
    {
        let edit=this.divZaFormu.querySelector(".inputNaziv");
        console.log(edit);
        edit.value=this.naziv;

        edit=this.divZaFormu.querySelector(".inputSlika");
        edit.value=this.performer;

        edit=this.divZaFormu.querySelector(".inputCena");
        edit.value=this.cena;

        edit = this.divZaFormu.querySelector(".inputSlika")
        edit.value = this.slika;

        

        edit=this.divZaFormu.querySelector(".dodajDugme");
        edit.innerHTML="Izmeni";
        edit.value=this.id;

    }


     otvoriFormu (){

     const openModalButtons = document.querySelectorAll('[data-modal-target]');

        const closeModalButtons = document.querySelectorAll('[data-close-button]');
        
        const overlay =document.getElementById('overlay');
        
        openModalButtons.forEach(button =>{
          button.addEventListener('click', ()=>{
            const modal = document.querySelector(button.dataset.modalTarget);
            openModal(modal);
          })
        })
        
        closeModalButtons.forEach(button =>{
          button.addEventListener('click', ()=>{
            const modal = button.closest('.modal');
            closeModal(modal);
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
        }
        
        
        const modal = document.getElementsByClassName("modal");
        
        const selectOpcije = document.createElement("select");
        
    }

     

   async obrisiRezervaciju(id) {

      fetch("https://localhost:5001/Rezervacije/IzbrisiRezervaciju/"+id,{
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

 

}