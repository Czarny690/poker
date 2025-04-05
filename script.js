  
  let pierwsza = document.getElementById('Pierwsza');
    let druga = document.getElementById('Druga');
    let w1 = document.getElementById('w1');
    let w2 = document.getElementById('w2');
    let w3 = document.getElementById('w3');
    let w4 = document.getElementById('w4');
    let w5 = document.getElementById('w5');
    let kasa = document.getElementById('Pieniadze')
    let PodBtn = document.getElementById('Podbij')
    let PodBlok = document.getElementById('podbijanieBlok')
    let tablicaKart = []
    let tylna = document.getElementById('tylna')
    let animacjaCzas = document.getElementById('Czas')
    let zwyciezcy = []
    let UkladyGraczy = []
    const sprawdzanieKart = [
        czyPara,
        czyDwiePary,
        czyTrojka,
        czyStraight,
        czyKolor,
    czyFullHouse,
    czyCzworka,
    czyStraightFlush,
    czyRoyalFlush
]
let wygrane = false;
let k = 0;
let poprzedni = null; 
let wspolne =0
let wspBlok = document.getElementById('Wsp')
let pierwszeKlikniecie = true;
let kolko=0
let poddane=[]
let ktoraRunda=1;
let jakasReka = document.getElementById('TwojaReka')
let check = document.getElementById('Check')
let poddajBtn = document.getElementById('Poddaj')
let KolorUi = document.getElementById('Kolor')
let intervalId = null; 
let CzyKoniec = false
let minimalna=0;
let kolory = ['pink', 'red', 'blue', 'yellow'];
let poczatek = document.getElementById('poczatek');
let gracz2, gracz3, gracz4, gracz5;
let kolejnoscGry = []
const liczbaGraczyInput = document.getElementById("liczbaGraczy");
const liczbaGraczyWartosc = document.getElementById("liczbaGraczyWartosc");
let aleGowno=false;
    let nazwy = []
  if(localStorage.getItem('liczbaGraczy') == null) {
        localStorage.setItem('liczbaGraczy', 4)
        localStorage.setItem('CzyOdswiezono', 0)
    }
    document.addEventListener("DOMContentLoaded", () => {
        for (let i = 2; i <= 5; i++) {
            let ryzInp = document.querySelector(`#g${i} #ryzyko`);
            let ostInp = document.querySelector(`#g${i} #ostroznosc`);
    
            let savedRyzyko = localStorage.getItem(`gracz${i}_ryzyko`);
            let savedOstroznosc = localStorage.getItem(`gracz${i}_ostroznosc`);
    
            if (savedRyzyko !== null) {
                ryzInp.value = savedRyzyko;
            } else {
                localStorage.setItem(`gracz${i}_ryzyko`, ryzInp.value);
            }
    
            if (savedOstroznosc !== null) {
                ostInp.value = savedOstroznosc;
            } else {
                localStorage.setItem(`gracz${i}_ostroznosc`, ostInp.value);
            }
    
            liczbaGraczyInput.addEventListener("input", () => localStorage.setItem('liczbaGraczy', liczbaGraczy))
            ryzInp.addEventListener("input", () => updateValues(i, "ryzyko", ryzInp.value));
            ostInp.addEventListener("input", () => updateValues(i, "ostroznosc", ostInp.value));
        }
        liczbaGraczy = parseInt(localStorage.getItem('liczbaGraczy'))
        liczbaGraczyWartosc.textContent = parseInt(localStorage.getItem('liczbaGraczy'))
        liczbaGraczyInput.value = parseInt(localStorage.getItem('liczbaGraczy'))
    });
    
    function updateValues(playerNumber, type, value) {
        localStorage.setItem(`gracz${playerNumber}_${type}`, value);
    }
    
    function wybranieGraczy() {
        localStorage.setItem('liczbaGraczy', liczbaGraczy);
        
        for (let i = 0; i < liczbaGraczy; i++) {
            let kartaNazwa = document.querySelector(`#g${i+2} p`).textContent;
            
            let ostValue = localStorage.getItem(`gracz${i+2}_ostroznosc`);
            let ryzValue = localStorage.getItem(`gracz${i+2}_ryzyko`);
            
            ostValue = ostValue !== null ? parseInt(ostValue) : parseInt(ostInp.value);
            ryzValue = ryzValue !== null ? parseInt(ryzValue) : parseInt(ryzInp.value);
            
            if (i === 0) gracz2 = new Gracz(kartaNazwa, kolory[i], i+2, ryzValue, ostValue);
            if (i === 1) gracz3 = new Gracz(kartaNazwa, kolory[i], i+2, ryzValue, ostValue);
            if (i === 2) gracz4 = new Gracz(kartaNazwa, kolory[i], i+2, ryzValue, ostValue);
            if (i === 3) gracz5 = new Gracz(kartaNazwa, kolory[i], i+2, ryzValue, ostValue);
        }
        
        poczatek.style.display = 'none';
        kolejnoscGry[0] = gracz;
        nazwy[0] = 'gracz';
        
        if (Gracz.Gracze.length === 2) {
            kolejnoscGry[1] = gracz2;
            nazwy[1] = 'gracz2';
        } else if (Gracz.Gracze.length === 3) {
            kolejnoscGry[1] = gracz2;
            kolejnoscGry[2] = gracz3;
            nazwy[1] = 'gracz2';
            nazwy[2] = 'gracz3';
        } else if (Gracz.Gracze.length === 4) {
            kolejnoscGry[1] = gracz4;
            kolejnoscGry[2] = gracz2;
            kolejnoscGry[3] = gracz3;
            nazwy[1] = 'gracz4';
            nazwy[2] = 'gracz2';
            nazwy[3] = 'gracz3';
        } else {
            kolejnoscGry[1] = gracz4;
            kolejnoscGry[2] = gracz2;
            kolejnoscGry[3] = gracz3;
            kolejnoscGry[4] = gracz5;
            nazwy[1] = 'gracz4';
            nazwy[2] = 'gracz2';
            nazwy[3] = 'gracz3';
            nazwy[4] = 'gracz5';
        }
        if(localStorage.getItem('CzyOdswiezono') == false) {

        rozpocznijGre();
        }
    }

let liczbaGraczy

if(localStorage.getItem('CzyOdswiezono')==null || localStorage.getItem('CzyOdswiezono') == 0) {
    const karty = document.querySelectorAll(".karta-gracza");
    let lool = parseInt(localStorage.getItem('liczbaGraczy'))

    liczbaGraczyInput.addEventListener("input", () => {
        liczbaGraczy = parseInt(liczbaGraczyInput.value);
        liczbaGraczyWartosc.textContent = liczbaGraczy;
        
        karty.forEach((karta, index) => {
            if (index < liczbaGraczy) {
                karta.classList.remove("nieaktywny");
            } else {
                karta.classList.add("nieaktywny");
            }
        });
    });
    
    liczbaGraczyInput.dispatchEvent(new Event("input"));
    karty.forEach((karta, index) => {
        if (index >= lool) {
            karta.classList.add("nieaktywny");
        }
    });
} else {
    liczbaGraczy = parseInt(localStorage.getItem('liczbaGraczy'))
}






    PodBtn.addEventListener('click', (event) => {
        event.stopPropagation()
        if(pierwszeKlikniecie && nazwy[k] == 'gracz') {
        PodBlok.style.opacity = '1'
        PodBlok.style.width = '18.1vw'
        pierwszeKlikniecie = false
    } else {
         PodBlok.style.opacity = '0'
        PodBlok.style.width = '0'
        pierwszeKlikniecie = true
    }
    })
    document.addEventListener('click', (event) => {
        event.stopPropagation()
        PodBlok.style.opacity = '0'
        PodBlok.style.width = '0'
        pierwszeKlikniecie = true
    })
    PodBlok.addEventListener('click', (event) => {
        event.stopPropagation()

    })
    class Karta {
        static wszystkieKarty = [];
    
        static CzyPowtarzaSie(nowaKarta) {
            for (let karta of this.wszystkieKarty) {
                if (karta.kolor === nowaKarta.kolor && karta.moc === nowaKarta.moc) {
                    return true; 
                }
            }
            return false;
        }
    
        constructor() {
            let nowaKarta;
            do {
                let losowa = Math.floor(Math.random() *4);
                let moc = Math.floor(Math.random() *13) + 2;
                let kolor = ["♥️", "♠️", "♦️", "♣️"][losowa];
                let symbol = moc === 11 ? "J" : moc === 12 ? "Q" : moc === 13 ? "K" : moc === 14 ? "A" : moc;
    
                nowaKarta = { kolor, moc, symbol };
            } while (Karta.CzyPowtarzaSie(nowaKarta));
    
            this.kolor = nowaKarta.kolor;
            this.moc = nowaKarta.moc;
            this.symbol = nowaKarta.symbol;
    
            Karta.wszystkieKarty.push(this);
        }
    
        static pokazWszystkie() {
            console.log(Karta.wszystkieKarty);
        }
    }




    class Gracz {
        static Gracze = [];
    
        constructor(nazwa, kolor, numerek,ryzykownosc, ostroznosc) {
            this.nazwa = nazwa;
            this.karta1 = new Karta();
            this.karta2 = new Karta();
            this.kolor = kolor;
            this.pieniadze = 10000;
            this.obstawiane = 0;
            this.numerek = numerek;
            this.poziom = 1;
            this.KartyGracza = [this.karta1, this.karta2]
            this.nazwaReki ='Wysoka Karta'
            this.uklad = []
            this.karty = [this.karta1, this.karta2]
            this.ryzykownosc =ryzykownosc
            this.ostroznosc =ostroznosc
            Gracz.Gracze.push(this);
        }
        ujawnijKarty() {
            let zakryta = document.querySelectorAll(`.gracz${this.numerek} .karta #tylna`)
            zakryta.forEach(div => {div.style.display = 'none';
            }
            )
        }
    }
    
    function pokazKarte(karta, kartaElement) {
        let symbole = kartaElement.querySelectorAll('.symbol');
        let kolory = kartaElement.querySelectorAll('.kolor');
        let srodek = kartaElement.querySelector('.srodek');

        symbole[0].innerText = karta.symbol;
        symbole[1].innerText = karta.symbol;
        srodek.innerText = karta.kolor;

        if (karta.kolor === '♥️' || karta.kolor === '♦️') {
            kolory[0].classList.add('red');
            kolory[1].classList.add('red');
        } else {
            kolory[0].classList.add('black');
            kolory[1].classList.add('black');
        }

        kolory[0].innerText = karta.kolor;
        kolory[1].innerText = karta.kolor;
    }

    gracz = new Gracz('Artur', 'purple', 1, 0, 0)

    
        
    
    for (let i = 0; i < 5; i++) {
        let kartaSrodkowa = new Karta
        tablicaKart.push(kartaSrodkowa)
    }

    let wspolneZakryte = document.querySelectorAll(`.Wspolne .karta #tylna`)
    function faza1() {
        for(let i=0; i<kolejnoscGry.length;i++) {
            kolejnoscGry[i].KartyGracza.push(tablicaKart[0], tablicaKart[1] ,tablicaKart[2])
        }
        pokazKarte(tablicaKart[0], w1)
        pokazKarte(tablicaKart[1], w2)
        pokazKarte(tablicaKart[2], w3)
        for(let o=0;o<3;o++) {
            wspolneZakryte[o].style.zIndex = '-1';
        }
        zbierzOdWszystkich()

    }
    function faza2() { 
        for(let i=0; i<kolejnoscGry.length;i++) {
            kolejnoscGry[i].KartyGracza.push(tablicaKart[3])
        }
        pokazKarte(tablicaKart[3], w4)
         wspolneZakryte[3].style.zIndex = '-1';
         zbierzOdWszystkich()
        }
        
    function faza3() {
        for(let i=0; i<kolejnoscGry.length;i++) {
            kolejnoscGry[i].KartyGracza.push(tablicaKart[4])
        }
        pokazKarte(tablicaKart[4], w5)
        wspolneZakryte[4].style.zIndex = '-1';
        zbierzOdWszystkich()
        sprawdzKartyKazdego()    

    }
    kasa.innerText = `${gracz.pieniadze} | ${gracz.obstawiane}`
   

    function Obstaw(n, gosc, p=0) {
        if(gosc.pieniadze == 0) {
            return
        }
        if (n > gosc.pieniadze) {
            n=gosc.pieniadze
        }
    
        gosc.pieniadze -= n;
        gosc.obstawiane += n;
    
        if (gosc != gracz) {
            if(p==0) p=k
            let updateKasy = document.querySelectorAll(`.${nazwy[p]} .Dane .pieniadzeObstawianie`);
            updateKasy.forEach(el => el.textContent = `${gosc.pieniadze} | ${gosc.obstawiane}`);
        } else {    
            kasa.textContent = `${gosc.pieniadze} | ${gosc.obstawiane}`;
        }
    }
    
    

    function zmienBorder() {
        if(nazwy[k] == 'gracz' && kolejnoscGry[k].pieniadze == 0) {
            Sprawdz('gracz')
        }
        if (intervalId) {
            clearInterval(intervalId);
        }
        let skip = 0;
        if(CzyKoniec == false ) {
        intervalId = setInterval(() => {
            skip++;
            if(skip==10) {
                Sprawdz(nazwy[k])
            }
        }, 1000);
    
        animacjaCzas.classList.remove('zmianaKoloru');
        void animacjaCzas.offsetWidth;
        animacjaCzas.classList.add('zmianaKoloru');
        }
        if (nazwy[k] != 'gracz') {   
            let ZmianaBorderu = document.querySelectorAll(`.${nazwy[k]} .karta`);
            
            ZmianaBorderu.forEach(div => div.style.outline = 'yellow 5px solid');
    
            if (poprzedni) {
                poprzedni.forEach(div => div.style.outline = '0'); 
            }
    
            poprzedni = ZmianaBorderu;
            check.style.filter = 'brightness(50%)';
            PodBtn.style.filter = 'brightness(50%)';
            poddajBtn.style.filter = 'brightness(50%)';
    
        } else {
            check.style.filter = 'brightness(100%)';
            PodBtn.style.filter = 'brightness(100%)';
            poddajBtn.style.filter = 'brightness(100%)';
            let ZmianaBorderu = document.querySelectorAll(`#TwojeKarty .karta`);
            ZmianaBorderu.forEach(div => div.style.outline = 'yellow 5px solid');
    
            if (poprzedni) {
                poprzedni.forEach(div => div.style.outline = '0'); 
            }
    
            poprzedni = ZmianaBorderu;
        }
    }
    
    function sprawdzIleMoznaObstawic() {
        const rangeInput = document.getElementById("Podbijanie");
        const valueDisplay = document.getElementById("IleDoObstawienia");
    
        const min = minimalna+20;
        const max = gracz.pieniadze;
    
    
        function updateRange() {
            rangeInput.min = min;
            rangeInput.max = max;
            rangeInput.value = Math.max(min, Math.min(rangeInput.value, max));
            valueDisplay.textContent = rangeInput.value;
        }
    
        rangeInput.addEventListener("input", function () {
            valueDisplay.textContent = rangeInput.value;
        });
        updateRange();

}
    
    function zbierzOdWszystkich() {
        
        for (let p = 0; p < kolejnoscGry.length; p++) {
                wspolne += kolejnoscGry[p].obstawiane;
                kolejnoscGry[p].obstawiane = 0;
            if (nazwy[p] != 'gracz') {
                let updateKasy = document.querySelectorAll(`.gracz${kolejnoscGry[p].numerek} .Dane .pieniadzeObstawianie`);
                updateKasy.forEach(el => el.textContent = `${kolejnoscGry[p].pieniadze} | ${kolejnoscGry[p].obstawiane}`);
                
            } else {
                kasa.textContent = `${kolejnoscGry[p].pieniadze} | ${kolejnoscGry[p].obstawiane}`;
            }
        }
        for(let i=0; i<poddane.length;i++) {
            wspolne += poddane[i].obstawiane;
            poddane[i].obstawiane = 0;
            if (poddane[i].nazwa != gracz.nazwa) {
                let updateKasy = document.querySelectorAll(`.gracz${poddane[i].numerek} .Dane .pieniadzeObstawianie`);
                updateKasy.forEach(el => el.textContent = `${poddane[i].pieniadze} | ${poddane[i].obstawiane}`);
                
            } else {
                kasa.textContent = `${poddane[i].pieniadze} | ${poddane[i].obstawiane}`;
            }
        }
        let wspBlok = document.getElementById('Wsp');
        minimalna=0
        if (wspBlok) {
            wspBlok.textContent = wspolne;
        }
    

    }
    
    
    function Sprawdz(gracz) {
        if(gracz == nazwy[k]) {
            if(kolejnoscGry[k].obstawiane >= minimalna) {
                if (k < nazwy.length-1) {
                    k++;
                    zmienBorder(); 
                } else {
                    k=0
                    zmienBorder()
                }
            } else {
                Obstaw((minimalna-kolejnoscGry[k].obstawiane), kolejnoscGry[k])
                if (k < nazwy.length-1) {
                    k++;
                    zmienBorder(); 
                } else {
                    k=0
                    zmienBorder()
                }
            }
            decyzja(2)
            if(gracz == 'gracz') {
                check.textContent = 'Sprawdź'
                check.style.backgroundColor = 'white'
                zagrajJakoBot()
            }
    }else {
        console.log('Nie twoja kolej!')
    }
    }

    function Poddaj(ktoraOsoba, gracz) {
        if(gracz == nazwy[k]) {
            poddane.push(kolejnoscGry[ktoraOsoba])
            if (nazwy[ktoraOsoba] !== 'gracz') {
                let kartaPoddana = document.getElementsByClassName(nazwy[ktoraOsoba]);
                Array.from(kartaPoddana).forEach(karta => {
                    karta.style.filter = 'brightness(50%)';
                });
                if(k==kolejnoscGry.length-1)k=0
    
            } else {
                KolorUi.style.filter = 'brightness(50%)'
                jakasReka.textContent = ''
                kasa.style.filter = 'brightness(50%)'
                jakasReka.style.filter = 'brightness(50%)'
                let karta1 = document.getElementById('Pierwsza');
                let karta2 = document.getElementById('Druga');
                karta1.style.filter = 'brightness(50%)';
                karta2.style.filter = 'brightness(50%)';
                zmienBorder()
                zagrajJakoBot()
        }
        
        kolejnoscGry.splice(ktoraOsoba, 1);
        nazwy.splice(ktoraOsoba, 1); 
        
        
        if (kolejnoscGry.length === 1) {
            zbierzOdWszystkich()
            zmienBorder()
            zwyciezcy[0] = kolejnoscGry[0]
            wygrany()
            return;
        }
        
        zmienBorder();
        decyzja(1)
    } else {
        console.log('Nie twoja kolej')
    }
}
    

    function Podbij(ilePodbic, gracz) {
        if(gracz == nazwy[k]) {
            if(ilePodbic > kolejnoscGry[k].pieniadze) {
                ilePodbic = kolejnoscGry[k].pieniadze
            }
            if(gracz == 'gracz') {
                if(pierwszeKlikniecie != true) {
                    var Pieniadzee = parseInt(document.getElementById('IleDoObstawienia').textContent)
                    minimalna = Pieniadzee+kolejnoscGry[k].obstawiane
                    parseInt(minimalna)
                    PodBlok.style.opacity = 0
                    PodBlok.style.width = 0
                    Obstaw(Pieniadzee, kolejnoscGry[k])
                    if(gracz == nazwy[k]) {
                        if (k < nazwy.length-1) {
                            k++;
                            zmienBorder(); 
                        } else {
                            k=0
                            zmienBorder()
                        }
                    }
                    zagrajJakoBot()
                }
        } else {
            minimalna = kolejnoscGry[k].obstawiane+ilePodbic
            Obstaw(ilePodbic, kolejnoscGry[k])
            parseInt(minimalna)
            if(gracz == nazwy[k]) {
                if (k < nazwy.length-1) {
                    k++;
                    zmienBorder(); 
                } else {
                    k=0
                    zmienBorder()
                }
            }
        }
        decyzja(3)
    } else {
        console.log('Nie twoja kolej')
    }
}

function zagrajJakoBot() {
    if (!CzyKoniec) {
        let graczBot = kolejnoscGry[k];
        let ryzyko = graczBot.ryzykownosc / 9;
        let ostroznosc = graczBot.ostroznosc / 9;
        let poziom = graczBot.poziom;
        
        let liczba = 100;
        let losowa = Math.floor(Math.random() * liczba);
        
        let szansaPodbicia = ryzyko * 80 * poziom;
        let szansaPoddania = (1 - ostroznosc) * 40 * poziom;
        
        let losowyCzas = (Math.floor(Math.random() * 4000) + 3000);
        let losowePodbicie = Math.floor((Math.random() * 150 + 50) * ryzyko * poziom);
        losowePodbicie = Math.ceil(losowePodbicie / 10) * 10;
        
        if (kolejnoscGry[k].pieniadze == 0) {
            Sprawdz(nazwy[k]);
            if (nazwy[k] !== 'gracz') {
                zagrajJakoBot();
            }
        } else {
            setTimeout(() => {
                let ostatniaRunda = (kolko >= 3);
                if (ostatniaRunda) {
                    szansaPoddania *= 0.5; 
                }
                
                if (minimalna > 0) {
                    if (minimalna > losowePodbicie * 2 && losowa < szansaPoddania) {
                        Poddaj(k, nazwy[k]);
                    } else if (losowa < szansaPodbicia && minimalna <= losowePodbicie * 2) {
                        let nowePodbicie = Math.ceil((minimalna + losowePodbicie) / 10) * 10;
                        Podbij(nowePodbicie, nazwy[k]);
                    } else {
                        Sprawdz(nazwy[k]);
                    }
                } else {
                    if (losowa < szansaPodbicia) {
                        Podbij(losowePodbicie, nazwy[k]);
                    } else if (losowa < szansaPoddania) {
                        Poddaj(k, nazwy[k]);
                    } else {
                        Sprawdz(nazwy[k]);
                    }
                }
                
                if (nazwy[k] !== 'gracz') {
                    zagrajJakoBot();
                }
            },losowyCzas);
        }
    }
}




function sprawdzKartyKazdego() {
    for (let i = 0; i < kolejnoscGry.length; i++) {
        sprawdzanieKart.forEach(funkcja => funkcja(kolejnoscGry[i]));
    }
    UkladyGraczy = [...kolejnoscGry];
    for (let i = 0; i < UkladyGraczy.length; i++) {
        if (UkladyGraczy[i].nazwaReki !== '') {
        }
    }

    UkladyGraczy.sort((a, b) => b.poziom - a.poziom);
    jakasReka.textContent = gracz.nazwaReki
}



function CzyMinimalna() {
    for(let i=0;i<kolejnoscGry.length;i++) {
            if (kolejnoscGry[i].obstawiane < minimalna) {
                if(kolejnoscGry[i].nazwa == gracz.nazwa) {
                    ileDOObstawienia = minimalna-gracz.obstawiane
                    check.textContent =  `Dobij: ${ileDOObstawienia}`
                    check.style.backgroundColor = '#a56262'
                }
            }
        }
    }
    function czyCalaKolejka() {
        if(kolko>=kolejnoscGry.length) {
            return true
        } 
        return false
    }
    function decyzja(decyzja=2) {
        if(decyzja!=3) {
            kolko++
        } else {
            kolko=0
        }
        CzyMinimalna()
        sprawdzIleMoznaObstawic()
        pokazKartySrodkowe()
    }
    
    function czyPara(gracz) {
        let licznik = new Map();

    

        for (let karta of gracz.KartyGracza) {
            let wartoscKarty = karta.moc;
            licznik.set(wartoscKarty, (licznik.get(wartoscKarty) || 0) + 1);
        }
    
        let pary = [];
    
        for (let [wartosc, ilosc] of licznik) {
            if (ilosc === 2) {
                pary.push(wartosc);
            }
        }
    
        if (pary.length > 0) {
            gracz.poziom = 2; 
            gracz.nazwaReki = 'Para';

            pary.sort((a, b) => b - a);
    
            let najwyzszaPara = pary[0];
            let kartyPary = gracz.KartyGracza.filter(karta => karta.moc === najwyzszaPara);
            gracz.uklad = []
            gracz.uklad.push(...kartyPary);
        }
    }
    
    
    function czyTrojka(gracz) {
        let licznik = new Map();

        for (let karta of gracz.KartyGracza) {
            let wartoscKarty = karta.moc;
            licznik.set(wartoscKarty, (licznik.get(wartoscKarty) || 0) + 1);
        }
    
        for (let [wartosc, ilosc] of licznik) {
            if (ilosc === 3) {
                gracz.poziom = 4;
                gracz.nazwaReki = 'Trójka';
                gracz.uklad = gracz.KartyGracza.filter(karta => karta.moc === wartosc);
                return;
            }
        }
    }
    
    function czyDwiePary(gracz) {
        let licznik = new Map();
    
        for (let karta of gracz.KartyGracza) {
            let wartoscKarty = karta.moc;
            licznik.set(wartoscKarty, (licznik.get(wartoscKarty) || 0) + 1);
        }
    
        let pary = [];
    
        for (let [wartosc, liczba] of licznik.entries()) {
            if (liczba === 2) {
                
                pary.push(wartosc);
            }
        }
    
        if (pary.length >= 2) {
            gracz.poziom = 3; 
            gracz.nazwaReki = 'Dwie Pary';
            pary.sort((a, b) => b - a)
    
            let najwyzszePary = pary.slice(0, 2);
            gracz.uklad = gracz.KartyGracza.filter(karta => najwyzszePary.includes(karta.moc));
        }
    }
    

    function czyStraight(gracz) {
        let kartyPosortowane = gracz.KartyGracza.slice().sort((a, b) => a.moc - b.moc);
    
        let licznik = 1;
    
        for (let i = 1; i < kartyPosortowane.length; i++) {
            if (kartyPosortowane[i].moc === kartyPosortowane[i - 1].moc + 1) {
                licznik++;
            } else if (kartyPosortowane[i].moc !== kartyPosortowane[i - 1].moc) {
                licznik = 1; 
            }
    
        
            if (licznik === 5) {
                gracz.poziom = 5;
                gracz.nazwaReki = 'Strit';
                gracz.uklad = kartyPosortowane.slice(i - 4, i + 1); 
                return;
            }
        }
    }
    
    function czyKolor(gracz) {
        let licznik = new Map();
    
        for (let karta of gracz.KartyGracza) {
            let wartoscKarty = karta.kolor;
            licznik.set(wartoscKarty, (licznik.get(wartoscKarty) || 0) + 1);
        }
    
        for (let [kolor, ilosc] of licznik) {
            if (ilosc === 5) {
                gracz.poziom = 6;
                gracz.nazwaReki = 'Kolor';
                gracz.uklad = gracz.KartyGracza.filter(karta => karta.kolor === kolor); 
                return;
            }
        }
    }
    
    function czyFullHouse(gracz) {
        let Para = false;
        let Trojka = false;
        let licznik = new Map();
    
        for (let karta of gracz.KartyGracza) {
            let wartoscKarty = karta.moc;
            licznik.set(wartoscKarty, (licznik.get(wartoscKarty) || 0) + 1);
        }
    
        let paraMoc = null;
        let trojkaMoc = null;
    
        for (let [wartosc, liczba] of licznik.entries()) {
            if (liczba === 2) {
                Para = true;
                paraMoc = wartosc;  
            } else if (liczba === 3) {
                Trojka = true;
                trojkaMoc = wartosc;  
            }
        }
    

        if (Para && Trojka) {
            gracz.poziom = 7;  
            gracz.nazwaReki = 'Full House';  
    
            gracz.uklad = gracz.KartyGracza.filter(karta => karta.moc === paraMoc || karta.moc === trojkaMoc);

            return true;
        }
    
        return false;
    }
    
    
    function czyCzworka(gracz) {
        let licznik = new Map();
    
        for (let karta of gracz.KartyGracza) {
            let wartoscKarty = karta.moc;
            licznik.set(wartoscKarty, (licznik.get(wartoscKarty) || 0) + 1);
        }
    
        let czworka = null;
    
        for (let [wartosc, ilosc] of licznik.entries()) {
            if (ilosc === 4) {
                czworka = wartosc;
                break; 
            }
        }
    
        if (czworka !== null) {
            gracz.poziom = 8; 
            gracz.nazwaReki = 'Kareta';
    
            gracz.uklad = gracz.KartyGracza.filter(karta => karta.moc === czworka);
        }
    }
    
    function czyStraightFlush(gracz) {
        let kartyPosortowane = gracz.KartyGracza.slice().sort((a, b) => a.moc - b.moc);
    
        let licznik = 1;
    
        for (let i = 1; i < kartyPosortowane.length; i++) {
            if (kartyPosortowane[i].moc === kartyPosortowane[i - 1].moc + 1 && kartyPosortowane[i].kolor === kartyPosortowane[i - 1].kolor) {
                licznik++;
            } else if (kartyPosortowane[i].moc !== kartyPosortowane[i - 1].moc) {
                licznik = 1;
            }
    
            if (licznik === 5) {
                gracz.poziom = 9; 
                gracz.nazwaReki = 'Poker';
    

                gracz.uklad = kartyPosortowane.slice(i - 4, i + 1); 
                return;
            }
        }
    }
    
    function czyRoyalFlush(gracz) {
        let kartyPosortowane = gracz.KartyGracza.slice().sort((a, b) => a.moc - b.moc);
    
        let kolor = kartyPosortowane[0].kolor;
        let kartyRoyal = [10, 11, 12, 13, 14]; 
        let znalezioneKarty = [];
    
        for (let i = 0; i < kartyPosortowane.length; i++) {
            let karta = kartyPosortowane[i];
    
            if (karta.kolor === kolor && kartyRoyal.includes(karta.moc)) {
                znalezioneKarty.push(karta.moc);
            }
        }
    
        if (znalezioneKarty.length === 5 && 
            znalezioneKarty.includes(10) && 
            znalezioneKarty.includes(11) && 
            znalezioneKarty.includes(12) && 
            znalezioneKarty.includes(13) && 
            znalezioneKarty.includes(14)) {
            gracz.poziom = 10;  
            gracz.nazwaReki = 'Poker Królewski';
    

            gracz.uklad = kartyPosortowane.filter(karta => kartyRoyal.includes(karta.moc) && karta.kolor === kolor);
        }
    }
    
    function porownajKarty() {
        let PierwszyUklad = UkladyGraczy[0]; 
        let TeSameUklady = [PierwszyUklad];
        for(let m=0; m<UkladyGraczy.length;m++) {
            UkladyGraczy[m].ujawnijKarty()
        } 
        if(nazwy[k] != 'gracz') {
        let ostatniBlok = document.querySelectorAll(`.${nazwy[k]} .karta`)
        ostatniBlok.forEach(div => div.style.outline = '0');
        } else {
            pierwsza.style.outline = '0';
            druga.style.outline = '0';
            
        }

        for (let i = 1; i < UkladyGraczy.length; i++) {
            if (PierwszyUklad.poziom === UkladyGraczy[i].poziom) {
                TeSameUklady.push(UkladyGraczy[i]);
            } else {
                break; 
            }
        }
    
        if (TeSameUklady.length === 1) {
            zwyciezcy[0] = TeSameUklady[0]
           wygrany()
        } else {
            for (let j = 0; j < TeSameUklady.length; j++) {
                TeSameUklady[j].uklad.sort((a, b) => b.moc - a.moc);
            }
    

            let remisy = false;
            TeSameUklady.sort((a, b) => {
                for (let i = 0; i < a.uklad.length; i++) {
                    if (a.uklad[i].moc > b.uklad[i].moc) {
                        return -1;
                    } else if (a.uklad[i].moc < b.uklad[i].moc) {
                        return 1;
                    }
                }
                remisy = true;
                return 0; 
            });
    
            if (remisy) {
                for (let p = 0; p < TeSameUklady.length; p++) {
                    if (TeSameUklady[p].uklad.includes(TeSameUklady[p].karta1)) {
                        TeSameUklady[p].karty.splice(0, 1); 
                    }
                    if (TeSameUklady[p].uklad.includes(TeSameUklady[p].karta2)) {
                        TeSameUklady[p].karty.splice(1, 1); 
                    }
                }
            
                TeSameUklady.sort((a, b) => {
                    const mocA = a.karty[0] ? a.karty[0].moc : 0;
                    const mocB = b.karty[0] ? b.karty[0].moc : 0;
                    return mocB - mocA; 
                });
            
                let maxMoc = TeSameUklady[0].karty[0].moc; 
                for (let penis = 0; penis < TeSameUklady.length; penis++) {
                    if (TeSameUklady[penis].karty[0].moc === maxMoc) {
                        zwyciezcy.push(TeSameUklady[penis]);
                    } else {
                        break; 
                    }
                }
            
                if (zwyciezcy.length > 1) {
                    const podzielonaNagroda = wspolne / zwyciezcy.length;
                    zwyciezcy.forEach(graczz => {
                        graczz.pieniadze += podzielonaNagroda
                        wspBlok.textContent = wspolne
                    });
                    wygrany()
                    wspolne = 0
                } else {
                    wygrany()
                }
            
            } else {
                zwyciezcy[0] = TeSameUklady[0]
                wygrany()
            }
            
            
            
        }
    }
    
    

    function pokazKartySrodkowe() {
        if(czyCalaKolejka()) {
            kolko=0;
            if(ktoraRunda==1) {
                faza1()
                sprawdzKartyKazdego()    
            }
            else if(ktoraRunda==2) {faza2()
                sprawdzKartyKazdego()    
            }
            else {faza3()
        CzyKoniec=true
        
        animacjaCzas.style.display='none'
        zbierzOdWszystkich()
        sprawdzKartyKazdego()
                porownajKarty()}

            ktoraRunda++    
        }
        
    }
    let divWygrany = document.createElement('div')
    divWygrany.id = 'WygranyDiv'
    function wygrany() {
        if(zwyciezcy.length == 1) {
        if(gracz.pieniadze == 0) {
            divWygrany.innerHTML = `
            <p>Przegrałeś!</p>
            <p>Nie masz już wystarczająco pieniędzy</p>
            <button onclick="location.reload()">Zagraj ponownie</button>
            `
        } else {
                    divWygrany.innerHTML = `
                    <p>Wygrywa gracz ${zwyciezcy[0].nazwa}</p>
                    <p>Układ: ${zwyciezcy[0].nazwaReki}</p>
                    <p>Wygrana: ${wspolne}</p>
                    <button onclick="odswiez()">Zagraj ponownie</button>`
        }
                    document.body.appendChild(divWygrany)
                    divWygrany.style.display = 'block'
                    zwyciezcy[0].pieniadze += wspolne
                    wspolne = 0
                    wspBlok.textContent = wspolne
                    animacjaCzas.style.width = '0'
                    zwyciezcy[0].ujawnijKarty()
                    CzyKoniec=true
                    Sprawdz(nazwy[k])
    } else {
        divWygrany.innerHTML = `
                    <p>Wygrywają gracze ${zwyciezcy[0].nazwa} i ${zwyciezcy[1].nazwa}</p>
                    <p>Układ: ${zwyciezcy[0].nazwaReki}</p>
                    <p>Wygrana: po ${wspolne/2}</p>
                    <button onclick="odswiez()">Zagraj ponownie</button>`
                    document.body.appendChild(divWygrany)
                    divWygrany.style.display = 'block'
                    animacjaCzas.style.width = '0'
                    zwyciezcy[0].ujawnijKarty()
                    zwyciezcy[1].ujawnijKarty()
                    CzyKoniec=true
                    Sprawdz(nazwy[k])
    }
}
    pierwsza.style.display = 'none'
    druga.style.display = 'none'
    KolorUi.style.backgroundColor = gracz.kolor
    function odswiez() {
        let licznikk=0
        for (let i = 0; i < Gracz.Gracze.length; i++) { 
            if(Gracz.Gracze[i].pieniadze > 0) {
                licznikk++
            }
        }
        if(licznikk == 1) {
        location.reload()
        return 0;
        }
        localStorage.setItem('CzyOdswiezono', 1)
        for(let i=0;i<Gracz.Gracze.length;i++) {
            localStorage.setItem(`gracz${Gracz.Gracze[i].numerek}`, Gracz.Gracze[i].pieniadze)
        }
        location.reload()
    }


    function rozpocznijGre() { 
        for (let i = 1; i < Gracz.Gracze.length; i++) {
            let stworzBlok = document.createElement('div')
            stworzBlok.id = `gracz`
            stworzBlok.classList.add(`gracz${i+1}`)
            stworzBlok.innerHTML = `<div id="gracz-1" class="karta">
            <div id="tylna"></div>
            <p class="symbol top-left"></p>
            <p class="kolor top-left"></p>
            <div class="srodek"></div>
            <p class="kolor bottom-right"></p>
            <p class="symbol bottom-right"></p>
            </div>
            `
            let stworzDrugi = document.createElement('div')
            stworzDrugi.id = `gracz-2`
            stworzDrugi.classList.add(`karta`)
            stworzDrugi.innerHTML =
            `
            <div id="tylna"></div> 
            <p class="symbol top-left"></p>
            <p class="kolor top-left"></p>
            <div class="srodek"></div>
            <p class="kolor bottom-right"></p>
            <p class="symbol bottom-right"></p>`
            let stworzDane = document.createElement('div')
            stworzDane.id = `DaneGracza`
            stworzDane.classList.add(`Dane`)
            stworzDane.innerHTML = `
            <div style="background-color: ${Gracz.Gracze[i].kolor};"> 
            </div>
            <p>${Gracz.Gracze[i].nazwa}</p>
            <h1 class="pieniadzeObstawianie">${Gracz.Gracze[i].pieniadze} | ${Gracz.Gracze[i].obstawiane}</h1>
            `
            document.body.appendChild(stworzBlok)
            stworzBlok.appendChild(stworzDrugi)
            stworzBlok.appendChild(stworzDane)
            pokazKarte(Gracz.Gracze[i].karta1, stworzBlok) 
            pokazKarte(Gracz.Gracze[i].karta2, stworzDrugi) 
        }
    for (let p = 0; p < kolejnoscGry.length; p++) {
    Obstaw(20, kolejnoscGry[p], p);
    }
        PodBtn.style.pointerEvents = 'all'
        check.style.pointerEvents = 'all'
        poddajBtn.style.pointerEvents = 'all'
        sprawdzKartyKazdego()    
        zmienBorder()
        pierwsza.style.display = 'flex'
    druga.style.display = 'flex'
        pokazKarte(gracz.karta1, pierwsza);
        pokazKarte(gracz.karta2, druga);
    }
    if(parseInt(localStorage.getItem('CzyOdswiezono')) == 1) {
        wybranieGraczy()
            localStorage.setItem('CzyOdswiezono', 0)
            divWygrany.style.display = 'none'
            for(let i=0;i<Gracz.Gracze.length;i++) {
                Gracz.Gracze[i].pieniadze = parseInt(localStorage.getItem(`gracz${Gracz.Gracze[i].numerek}`))
            }
    
            for (let i = 0; i < Gracz.Gracze.length; i++) {
              if(Gracz.Gracze[i].pieniadze <= 0) {
                nazwy = nazwy.filter(nazwa => !nazwa.includes(Gracz.Gracze[i].numerek));
                kolejnoscGry = kolejnoscGry.filter(obj => obj.numerek !== Gracz.Gracze[i].numerek);
    
                zbierzOdWszystkich()
                
            }
        }
            rozpocznijGre()
    }
