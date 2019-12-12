window.onload = function() 
{
    "use strict";



//----------------Declaration des variables Globales-------------------------------------   
let nomP1;
let hasard;
let tour=0;
let tableau1=[];
let tableau2=[];
let dateDebut;
let list=[];
let essaiIA;
let inputMax;

//-------------------------Declaration des variables HTML--------------------------------
const idBtHome      = document.getElementById("btHome");
const idPseudo1     = document.getElementById("pseudo1");
const idInputMax    = document.getElementById("inputMax");
const idBtPseudo    = document.getElementById("btPseudo");
const idInputSaisie = document.getElementById("inputSaisie");
const idBtRejouer   = document.getElementById("btRejouer");

const idMute  = document.getElementById("imgMute"); 
let soundBool=true;
let audio;  


//--------------------------Fonction Validation Pseudo-----------------------------------
function validationPseudo()
{
    
    if(idInputMax.checkValidity() && idInputMax.value<10000)

    {
        audio=document.getElementById("intro");
        audio.play();

        nomP1 = (idPseudo1.value=="") ? "Joueur 1" : idPseudo1.value;
        hasard = Math.round(Math.random() * idInputMax.value);
        //hasard=3; //test
        dateDebut= new Date();

        add_td(tableau1,1);
        add_td(tableau2,2);

        document.getElementById("resultat").style.display="none";
        document.getElementById("divClavier").style.display="flex";
        document.getElementById("divPseudo").style.display="none";
        document.querySelector("#plusMoins img").src="img/logo.png";
        document.getElementById("affichageJeu").style.display="flex"; 
        document.getElementById("tour").innerHTML=`<p>Tour: <strong>${tour+1}</strong></p>
                                <p><font color="blue">${nomP1}</font></p>
                                <p>Maximum: <font color="red">${idInputMax.value}</font></p>`; 

        //-------Initialisation de la premiere occurence IA--------------------------------
        for(let i=0;i<=idInputMax.value;i++) list[i]=i;
        inputMax=parseInt(idInputMax.value);
        essaiIA= Math.floor(inputMax/2)-5 + Math.round(Math.random()*10);
        //---------------------------------------------------------------------------------
    }

    else 
    {
        alert("Entrez un nombre entre 10 et 9999");
        idInputMax.value="";
        idInputMax.focus();
    }

}

//----------------------Creation du tableau---------------------------------------------
function add_td(tableau,n)
{
    let td1,td2;
    let imgPlusMoins;

    td1 = document.createElement("td");
    document.getElementById("lignePlusMoins"+n).appendChild(td1);

    imgPlusMoins = document.createElement("img");
    imgPlusMoins.setAttribute("src", "img/interrogation.png");
    imgPlusMoins.setAttribute("class", "imgPlusMoins");
    document.querySelectorAll("#lignePlusMoins"+n+" td")[tour].appendChild(imgPlusMoins);

    td2 = document.createElement("td");
    td2.setAttribute("class", "nombreJoueur");
    document.getElementById("ligneNombre"+n).appendChild(td2);
    tableau[tour] = document.querySelectorAll("#ligneNombre"+n+ " td")[tour].textContent = "???";
}




//--------------------------------Gestion de l'interface du jeu------------------------------

function jeu()
{
    document.getElementById("tour").innerHTML=`<p>Tour: <strong>${tour+1}</strong></p>
    <p><font color="blue">${nomP1}</font></p><p><font color="red">${idInputMax.value}</font></p>`;

    //----------------------------Verification Saisie-------------------------------------------     
    idInputSaisie.max=idInputMax.value;
    
    if (idInputSaisie.value.length==0 || !idInputSaisie.checkValidity())
    {
        alert("Entrez un nombre plus petit que "+ idInputMax.value);
        idInputSaisie.value="";
    }
    //-----------------------------------------------------------------------------------------

    else
    {   tableau1[tour]=idInputSaisie.value;
        

        //---------------------------En cas de Victoire P1--------------------------------------------

        if(idInputSaisie.value==hasard)
        {
            audio=document.getElementById("victoire");
            audio.play();

            let dateFin= new Date();
            let minutes = dateFin.getMinutes()-dateDebut.getMinutes();

            document.querySelectorAll("#ligneNombre1 td")[tour].textContent = tableau1[tour];
            document.querySelectorAll("#ligneNombre1 td")[tour].style.color = "green";

            document.querySelector("#plusMoins img").src = 'img/gagne.png';

            document.getElementById("divClavier").style.display="none";
            document.getElementById("resultat").style.display="flex";
            document.querySelector("#resultat p").innerHTML =
            `Félicitations <strong>${nomP1}</strong>, le nombre était bien
            <strong>${hasard}</strong>.
            <br>
            Tu as gagné en <strong>${tour+1}</strong> tour(s) 
            et en <strong>${minutes}</strong> minutes.`;

            for(let i=0;i<tour;i++) document.querySelectorAll("#ligneNombre2 td")[i].textContent = tableau2[i];

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

            else
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
        }//fin else gestion erreur P1

    


//---------------------------------Intelligence Artificiel------------------------------------------
    tableau2[tour]=essaiIA;

    //---------------------------En cas de Victoire IA--------------------------------------------
    if(essaiIA==hasard && idInputSaisie.value!=hasard)
    {
        audio=document.getElementById("perdu");
        audio.play();

        let dateFin= new Date();
        let minutes = dateFin.getMinutes()-dateDebut.getMinutes();

        for(let i=0;i<=tour;i++) document.querySelectorAll("#ligneNombre2 td")[i].textContent = tableau2[i];
        document.querySelectorAll("#ligneNombre2 td")[tour].style.color = "green";

        document.querySelector("#plusMoins img").src = 'img/perdu.png';

        document.getElementById("divClavier").style.display="none";
        document.getElementById("resultat").style.display="flex";
        document.querySelector("#resultat p").innerHTML =`<font color="red">Terminator</font> vous a terminé en 
                                                        <strong>${tour+1} </strong> 
                                                         tours et en <strong>${minutes}</strong> minutes. Le nombre était
                                                        <strong>${hasard}</strong>.`;
    }

    //--------------------------Gestions des essais/erreurs IA-----------------------------------

    else if (essaiIA!=hasard && idInputSaisie.value!=hasard) //Else Gestion Erreur IA
    {
        let diff=Math.abs(essaiIA - hasard);

        if(essaiIA < hasard) // si plus petit que 
        {
            if(diff>9)
            { 
                let index= list.indexOf(essaiIA);
                list=list.slice(index+9);
                essaiIA=Math.floor((list[0]+list[list.length - 1])/2)-5+Math.round(Math.random()*10);
                if(!list.includes(essaiIA)) essaiIA=list[0];

                document.querySelectorAll("#lignePlusMoins2 .imgPlusMoins")[tour].src='img/plusplus.png';
            }
  
            else
            {
                if(list.length<3)
                {
                    list.splice(list.indexOf(essaiIA), 1);
                    essaiIA=list[0];
                }

                else
                {
                    let index= list.indexOf(essaiIA);
                    let fin=index+10; if(fin>inputMax) fin=inputMax;
                    list=list.slice(index+1,fin+1);
                    essaiIA=Math.floor( (list[0]+list[list.length - 1])/2 );
                }

                document.querySelectorAll("#lignePlusMoins2 .imgPlusMoins")[tour].src='img/2pplus.png';
            }
    
        }

    
        else //si plus grand
        {
            if(diff>9)
            {
                let index= list.indexOf(essaiIA);
                list=list.slice(0,index-9);
                essaiIA=Math.floor( (list[list.length - 1])/2 )-5+Math.round(Math.random()*10); 
                if(!list.includes(essaiIA)) essaiIA=list[0];

                document.querySelectorAll("#lignePlusMoins2 .imgPlusMoins")[tour].src='img/moinsmoins.png';
            }
    
            else
            {
                if(list.length<3)
                {
                    list.splice(list.indexOf(essaiIA), 1);
                    essaiIA=list[0];
                }
        
                else
                {
                    let index= list.indexOf(essaiIA);
                    let debut= index-10; if(debut<0) debut=0;
                    list=list.slice(debut,index);
                    essaiIA=list[0];
                }

                document.querySelectorAll("#lignePlusMoins2 .imgPlusMoins")[tour].src='img/2pmoins.png';
            }
        }



//---------------------------------------Préparation tour suivant---------------------------------------
        //document.querySelectorAll("#ligneNombre2 td")[tour].textContent = tableau2[tour];
        document.querySelectorAll("#ligneNombre2 .nombreJoueur")[tour].style.background="url('img/casebarre.png') center /100% 100%";

        tour++;
        idInputSaisie.value="";
        add_td(tableau1,1);
        add_td(tableau2,2);
       
    }    //fin else Gestion Erreur IA 
    }//fin else global P1
    
} 
//--------------------------------Fonction Rejouer---------------------------------------------
function rejouer()
{
    audio=document.getElementById("rejouer");
    audio.play();
    
    
    idInputSaisie.value="";
    tour=0;
    idInputMax.value="";
   

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
idInputMax.addEventListener('focus', (event) => {event.target.value="";});//verifie si saisie de valeur Max

idBtPseudo.addEventListener("click", validationPseudo);
idInputMax.onkeyup = function() {if (event.keyCode == 13)validationPseudo();};

idBtRejouer.addEventListener("click", rejouer);





//--------------------------------Fin----------------------------------------------------

}