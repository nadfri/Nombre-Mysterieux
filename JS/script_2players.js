window.onload = function() 
{
    "use strict";

//----------------Declaration des variables Globales-------------------------------------   
let nomP1;
let nomP2;
let nom;
let hasard;
let tour=0;
let tableau1=[];
let tableau2=[];
let dateDebut;


//-------------------------Declaration des variables HTML--------------------------------
const idBtHome      = document.getElementById("btHome");
const idPseudo1     = document.getElementById("pseudo1");
const idPseudo2     = document.getElementById("pseudo2");
const idInputMax    = document.getElementById("inputMax");
const idBtPseudo    = document.getElementById("btPseudo");
const idBtReady     = document.getElementById("btReady");
const idInputSaisie = document.getElementById("inputSaisie");
const idBtRejouer   = document.getElementById("btRejouer");
const idBtNextPlayer= document.getElementById("btNextPlayer");

const idMute  = document.getElementById("imgMute"); 
let soundBool=true;
let audio;  


//--------------------------Fonction Validation Pseudo-----------------------------------
function validationPseudo()
{
    
    if(idInputMax.checkValidity() && idInputMax.value<10000)

    {
        audio=document.getElementById("playerOne");
        audio.play();

        nomP1 = (idPseudo1.value=="") ? "Joueur 1" : idPseudo1.value;
        nomP2 = (idPseudo2.value=="") ? "Joueur 2" : idPseudo2.value;     

        document.getElementById("resultat").style.display="none";
        document.getElementById("divPseudo").style.display="none";
        document.getElementById("divReady").style.display="flex";
        document.getElementById("btReady").textContent=`Tour ${tour+1} de ${nomP1}`;
        document.getElementById("terminator").textContent="<<---<<---<<---"+nomP2+"--->>--->>--->>";

        nom=nomP1;
        add_tdP1();
        add_tdP2();
        hasard = Math.round(Math.random() * inputMax.value);
        //hasard=15; //test
        dateDebut= new Date();
    }

    else 
    {
        alert("Entrez un nombre entre 10 et 9999");
        idInputMax.value="";
        idInputMax.focus();

    }

}

//----------------------Creation du tableau P1---------------------------------------------
function add_tdP1()
{
    let td1,td2;
    let imgPlusMoins;

    td1 = document.createElement("td");
    document.getElementById("lignePlusMoins1").appendChild(td1);

    imgPlusMoins = document.createElement("img");
    imgPlusMoins.setAttribute("src", "img/interrogation.png");
    imgPlusMoins.setAttribute("class", "imgPlusMoins");
    document.querySelectorAll("#lignePlusMoins1 td")[tour].appendChild(imgPlusMoins);

    td2 = document.createElement("td");
    td2.setAttribute("class", "nombreJoueur");
    document.getElementById("ligneNombre1").appendChild(td2);
    tableau1[tour] = document.querySelectorAll("#ligneNombre1 td")[tour].textContent = "???";
}

//----------------------Creation du tableau P2---------------------------------------------
function add_tdP2()
{
    let td1,td2;
    let imgPlusMoins;

    td1 = document.createElement("td");
    document.getElementById("lignePlusMoins2").appendChild(td1);

    imgPlusMoins = document.createElement("img");
    imgPlusMoins.setAttribute("src", "img/interrogation.png");
    imgPlusMoins.setAttribute("class", "imgPlusMoins");
    document.querySelectorAll("#lignePlusMoins2 td")[tour].appendChild(imgPlusMoins);

    td2 = document.createElement("td");
    td2.setAttribute("class", "nombreJoueur");
    document.getElementById("ligneNombre2").appendChild(td2);
    tableau2[tour] = document.querySelectorAll("#ligneNombre2 td")[tour].textContent = "???";
}


//---------------------------------Affichage du GamePlay------------------------------------
function affGameplay()
{
    document.getElementById("divReady").style.display="none";
    document.getElementById("divClavier").style.display="flex";
    document.getElementById("affichageJeu").style.display="flex";
    document.getElementById("tour").innerHTML=`<p>Tour: <strong>${tour+1}</strong></p>
                                                <p><font color="blue">${nom}</font></p>
                                               <p>Maximum: <font color="red">${idInputMax.value}</font></p>`
    
}

//--------------------------------Gestion de l'interface du jeu------------------------------

function jeu()
{
    if(nom==nomP1) //Jeu Joueur 1
    {
     //----------------------------Verification Saisie P1-------------------------------------------     
        idInputSaisie.max=idInputMax.value;
        
        if (idInputSaisie.value.length==0 || !idInputSaisie.checkValidity())
            {
                alert("Entrez un nombre plus petit que "+ idInputMax.value);
                idInputSaisie.value="";
            }


        else
        {
            tableau1[tour]=idInputSaisie.value;

        //---------------------------En cas de Victoire P1--------------------------------------------

            if(idInputSaisie.value==hasard)
            {
                audio=document.getElementById("victoire");
                audio.play();

                let dateFin= new Date();
                let minutes = dateFin.getMinutes()-dateDebut.getMinutes();


                document.querySelectorAll("#ligneNombre1 td")[tour].textContent = tableau1[tour];
                document.querySelectorAll("#ligneNombre1 td")[tour].style.color = "green";

                for(let i=0;i<=tour;i++){document.querySelectorAll("#ligneNombre2 td")[i].style.color = "black";}

                document.querySelector("#plusMoins img").src = 'img/gagne.png';

                document.getElementById("divClavier").style.display="none";
                document.getElementById("resultat").style.display="flex";
                document.querySelector("#resultat p").innerHTML =
                `Félicitations <strong>${nom}</strong>, le nombre était bien
                <strong>${hasard}</strong>.
                <br>
                Tu as gagné en <strong>${tour+1}</strong> tour(s)
                 et en <strong>${minutes}</strong> minutes.`;



            }
        //--------------------------Gestions des essais/erreurs-----------------------------------
            else 
            {
                audio=document.getElementById("error");
                audio.play();


                let diff = Math.abs(idInputSaisie.value - hasard);

                if (idInputSaisie.value < hasard) 
                {

                    if (diff > 9)
                    {
                        document.querySelector("#plusMoins img").src = 'img/plus.png';
                        document.querySelectorAll("#lignePlusMoins1 .imgPlusMoins")[tour].src="img/plusplus.png";
                    }

                    else
                    {
                        document.querySelector("#plusMoins img").src = 'img/petitplus.png';
                        document.querySelectorAll("#lignePlusMoins1 .imgPlusMoins")[tour].src='img/2pplus.png';
                    }
                }    

                else if (idInputSaisie.value > hasard) 
                {
                    if (diff > 9)
                    {   document.querySelector("#plusMoins img").src = 'img/moins.png';
                        document.querySelectorAll("#lignePlusMoins1 .imgPlusMoins")[tour].src='img/moinsmoins.png';
                    }

                    else
                    {
                        document.querySelector("#plusMoins img").src = 'img/petitmoins.png';
                        document.querySelectorAll("#lignePlusMoins1 .imgPlusMoins")[tour].src='img/2pmoins.png';
                    }

                }

        
                document.querySelectorAll("#ligneNombre1 .nombreJoueur")[tour].style.background="url('img/casebarre.png') center /100% 100%";
                document.querySelectorAll("#ligneNombre1 td")[tour].textContent = tableau1[tour];

                //---------------------------------------Préparation tour joueur suivant---------------------------------------
                nom=nomP2;
                
                document.getElementById("divClavier").style.display="none";
                document.getElementById("divNextPlayer").style.display="flex";

            }
        }
    }

    else
    {
        //----------------------------Verification Saisie P2-------------------------------------------     
        idInputSaisie.max=idInputMax.value;
        
        if (idInputSaisie.value.length==0 || !idInputSaisie.checkValidity())
            {
                alert("Entrez un nombre plus petit que "+ idInputMax.value);
                idInputSaisie.value="";
            }


        else
        {
            tableau2[tour]=idInputSaisie.value;

        //---------------------------En cas de Victoire P2--------------------------------------------

            if(idInputSaisie.value==hasard)
            {
                audio=document.getElementById("victoire");
                audio.play();

                let dateFin= new Date();
                let minutes = dateFin.getMinutes()-dateDebut.getMinutes();

                document.querySelectorAll("#ligneNombre2 td")[tour].textContent = tableau2[tour];
                document.querySelectorAll("#ligneNombre2 td")[tour].style.color = "green";

                for(let i=0;i<=tour;i++){document.querySelectorAll("#ligneNombre1 td")[i].style.color = "black";}

                document.querySelector("#plusMoins img").src = 'img/gagne.png';

                document.getElementById("divClavier").style.display="none";
                document.getElementById("resultat").style.display="flex";
                document.querySelector("#resultat p").innerHTML =
                `Félicitations <strong>${nom}</strong>, le nombre était bien
                <strong>${hasard}</strong>.
                <br>
                Tu as gagné en <strong>${tour+1}</strong> tour(s)
                 et en <strong>${minutes}</strong> minutes.`;


            }
        //--------------------------Gestions des essais/erreurs-----------------------------------
            else 
            {
                audio=document.getElementById("error");
                audio.play();


                let diff = Math.abs(idInputSaisie.value - hasard);

                if (idInputSaisie.value < hasard) 
                {

                    if (diff > 9)
                    {
                        document.querySelector("#plusMoins img").src = 'img/plus.png';
                        document.querySelectorAll("#lignePlusMoins2 .imgPlusMoins")[tour].src='img/plusplus.png';
                    }

                    else
                    {
                        document.querySelector("#plusMoins img").src = 'img/petitplus.png';
                        document.querySelectorAll("#lignePlusMoins2 .imgPlusMoins")[tour].src='img/2pplus.png';
                    }
                }    

                else if (idInputSaisie.value > hasard) 
                {
                    if (diff > 9)
                    {   document.querySelector("#plusMoins img").src = 'img/moins.png';
                        document.querySelectorAll("#lignePlusMoins2 .imgPlusMoins")[tour].src='img/moinsmoins.png';
                    }

                    else
                    {
                        document.querySelector("#plusMoins img").src = 'img/petitmoins.png';
                        document.querySelectorAll("#lignePlusMoins2 .imgPlusMoins")[tour].src='img/2pmoins.png';
                    }

                }

        
                document.querySelectorAll("#ligneNombre2 .nombreJoueur")[tour].style.background="url('img/casebarre.png') center /100% 100%";
                document.querySelectorAll("#ligneNombre2 td")[tour].textContent = tableau2[tour];

                //---------------------------------------Préparation tour joueur suivant---------------------------------------
                nom=nomP1;
                
                document.getElementById("divClavier").style.display="none";
                document.getElementById("divNextPlayer").style.display="flex";

            }
        }
    }

}



function nextPlayer()
{
    idInputSaisie.value="";


    document.getElementById("affichageJeu").style.display="none";
    document.getElementById("divNextPlayer").style.display="none";
    document.getElementById("divClavier").style.display="flex";
    document.getElementById("divReady").style.display="flex";
    document.querySelector("#plusMoins img").src="img/logo.png";

    if(nom==nomP2) 
    {
        audio=document.getElementById('playerTwo');
        audio.play();

        for(let i=0;i<=tour;i++)
        {
        document.querySelectorAll("#ligneNombre2 td")[i].style.color = "black";
        document.querySelectorAll("#ligneNombre1 td")[i].style.color = "transparent";
        }

        document.getElementById("btReady").textContent=`Tour ${tour+1} de ${nomP2}`;    
    }
    
    else
    {
        audio=document.getElementById('playerOne');
        audio.play();

        for(let i=0;i<=tour;i++)
        {
        document.querySelectorAll("#ligneNombre1 td")[i].style.color = "";
        document.querySelectorAll("#ligneNombre2 td")[i].style.color = "transparent";
        }

        tour++;
        add_tdP1();
        add_tdP2();

        document.getElementById("btReady").textContent=`Tour ${tour+1} de ${nomP1}`;
    }



}




function rejouer()
{
    audio=document.getElementById("rejouer");
    audio.play();
    
    idInputSaisie.value="";
    tour=0;
    nom=nomP1;

    document.querySelector("#plusMoins img").src="img/logo.png";
    document.getElementById("divPseudo").style.display="";
    document.getElementById("affichageJeu").style.display="none";
    document.getElementById("affichageTableau").innerHTML=`
        <div id="tableau1"> 
            <table>
                <tr id="lignePlusMoins1"></tr>
                <tr id="ligneNombre1"></tr>
            </table>
        </div>

        <div id="terminator"><<---<<---<<---TeRmiNaToR--->>--->>--->></div>

        <div id="tableau2">
            <table>            
                <tr id="lignePlusMoins2"></tr>
                <tr id="ligneNombre2"></tr>
            </table>
        </div>`;

}


//----------------------------- Gestion du Clavier-----------------------------------------   
    const idBt0   = document.getElementById("bt0");
    const idBt1   = document.getElementById("bt1");
    const idBt2   = document.getElementById("bt2");
    const idBt3   = document.getElementById("bt3");
    const idBt4   = document.getElementById("bt4");
    const idBt5   = document.getElementById("bt5");
    const idBt6   = document.getElementById("bt6");
    const idBt7   = document.getElementById("bt7");
    const idBt8   = document.getElementById("bt8");
    const idBt9   = document.getElementById("bt9");
    const idBtDel = document.getElementById("btDel");
    const idBtOk  = document.getElementById("btOk");

    idBt0.addEventListener('click',function()
    {
        idInputSaisie.value+=0;
    });

    idBt1.addEventListener('click',function()
    {
        idInputSaisie.value+=1;
    });

    idBt2.addEventListener('click',function()
    {
        idInputSaisie.value+=2;
    });

    idBt3.addEventListener('click',function()
    {
        idInputSaisie.value+=3;
    });

    idBt4.addEventListener('click',function()
    {
        idInputSaisie.value+=4;
    });

    idBt5.addEventListener('click',function()
    {
        idInputSaisie.value+=5;
    });

    idBt6.addEventListener('click',function()
    {
        idInputSaisie.value+=6;
    });

    idBt7.addEventListener('click',function()
    {
        idInputSaisie.value+=7;
    });

        idBt8.addEventListener('click',function()
    {
        idInputSaisie.value+=8;
    });

    idBt9.addEventListener('click',function()
    {
        idInputSaisie.value+=9;
    });

    idBtDel.addEventListener('click',function()
    {
        idInputSaisie.value="";
    });

    idBtOk.addEventListener('click',jeu);


//------------------------------------Supprimer le son--------------------------------


function mute()
{
    const audioAll=document.getElementsByTagName("audio");


    if (soundBool==true)
    {
        idMute.src="img/v_off.png";
        soundBool=false;
       
       for (let audio of audioAll)
        {
            audio.src="audio/blank.mp3";
        }
        
    }

    else
    {
        idMute.src="img/v_on.png";
        soundBool=true;

        let tableauSon=["audio/intro.mp3","audio/rejouer.mp3",
                        "audio/error.mp3","audio/correct.mp3",
                        "audio/suivant.mp3","audio/perdu.mp3",
                        "audio/victoire.mp3",
                        "audio/playerOne.m4a","audio/playerTwo.m4a"];

        for (let i=0; i<tableauSon.length;i++)
        {
            audioAll[i].src=tableauSon[i];
        }
    }


}

idMute.addEventListener('click', mute);


//----------------------------------------Retour Home-------------------------------------
idBtHome.addEventListener('click',function()
{
    if(confirm("Es-tu sure de vouloir revenir au menu?\nToute progession sera annulée."))
        window.location="index.html";
    
});


//--------------------------------Lancement----------------------------------------------
idInputMax.addEventListener('focus', (event) => {
  event.target.value="";   //verifie si saisie de valeur Max
});

idBtPseudo.addEventListener("click", validationPseudo);
idInputMax.onkeyup = function() {if (event.keyCode == 13)validationPseudo();};

idBtReady.addEventListener("click",  affGameplay);

idBtRejouer.addEventListener("click", rejouer);

idBtNextPlayer.addEventListener("click", nextPlayer);


//-------------------------------Confirmation avant changement de page------------------
window.addEventListener("beforeunload", function (e) {
  var confirmationMessage = "\o/";

  e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
  return confirmationMessage;              // Gecko, WebKit, Chrome <34
});





//-----------------------------------------------Fin-------------------------------------
}

