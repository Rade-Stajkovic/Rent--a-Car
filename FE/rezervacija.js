export class Rezervacija
{
    constructor(id, datumPreuzimanja,datumVracanja,cena,vozilo,korisnik)
    {
        this.id = id;
        this.datumPreuzimanja = datumPreuzimanja;
        this.datumVracanja = datumVracanja;
        this.cena =cena;
        this.vozilo = vozilo;
        this.korisnik =korisnik;
        this.kontejner = null;

    }

    

}