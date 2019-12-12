window.onload = function() 
{
    "use strict";

    //----------------Declaration des variables Globales--------------------------------------
    let count = 7; //nombre de vie au debut du jeu
    const countConstante = count;
    const tableau = [];
    const difficult = [150,175,200,250];
    let niveau=0;
    let hasard = Math.round(Math.random() * difficult[niveau]); //choix aléatoire entre 0 et n
    //let hasard= 15; //pour faire le test
    let dateDebut= new Date();
 
    //-------------------------Declaration des variables HTML---------------------------------
    const idBouton2 = document.getElementById("bouton2"); 
    const idBouton3 = document.getElementById("bouton3");  
    const idInput2  = document.getElementById("input2");
    const idBtHome  = document.getElementById("btHome");

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

    const idMute  = document.getElementById("imgMute"); 
    let soundBool=true;
    let audio;   

     //------------------------Fonction Bienvenue----------------------------------------------
    function intro() //Valide le pseudo et creation de la trame de jeu
    {
   
        audio=document.getElementById("intro");
        audio.play();
        const welcome="<p><strong>Mode Difficile:</strong> Tu as <b>"
                    +count
                    +"</b> vies par niveau!</p>";
        document.getElementById("bienvenue").innerHTML = welcome;
  
    //-----------------Creation du tableau de vie--------------------------------------------
        let td1, td2;
        let imgCoeur;

        for (let i = 0; i < count; i++) 
        {
            td1 = document.createElement("td");
            document.getElementById("ligneCoeur").appendChild(td1);

            imgCoeur = document.createElement("img");
            imgCoeur.setAttribute("src", "img/coeur2.png");
            imgCoeur.setAttribute("class", "coeur");
            document.querySelectorAll("#ligneCoeur td")[i].appendChild(imgCoeur);

            td2 = document.createElement("td");
            td2.setAttribute("class", "nombreJoueur");
            document.getElementById("ligneNombre").appendChild(td2);
            tableau[i] = document.querySelectorAll("#ligneNombre td")[i].textContent = "???";
        }

    //------------------------------------------------------------------------------------------
        document.getElementById("score").style.display="none";
        document.getElementById("divClavier").style.display="block"; //rend visible le clavier
        document.getElementById("affichageNombre").style.visibility = "visible"; //rend visible l'affichage Nombre
        document.querySelector("#affichageNiveau p").innerHTML ="Niveau " 
                                                                + "<font color='red'>"
                                                                +(niveau+1)+"</font>" 
                                                                +" :Choisis un nombre entre 0 et " 
                                                                +"<strong>"+difficult[niveau]+"</strong";
    }

    //-----------------Demarrage Jeu------------------------------------------------------------
    function jeu() 
    {
        if(count==2 && idInput2.value!=hasard)  //Blinking Bg à la derniere vie
            {
            document.getElementById("partie2").style.backgroundImage="none";
            document.getElementById("partie2").className="blinking";
            }


        audio.pause();
    //-------------------Verification input2---------------------------------------------------     
        idInput2.max=difficult[niveau];

        if (idInput2.value.length==0 || !idInput2.checkValidity())
        {
            alert("Entrez un nombre plus petit que "+ idInput2.max);
            idInput2.value="";
        }
    //------------------Mise à jour gagné/perdu------------------------------------------------
        else
        {
            tableau[countConstante - count] = idInput2.value;

            if (tableau[countConstante - count] != hasard) 
            {
                if (count == 1) //condition de sortie si toutes les vies ont été epuisées
                    {     
                        document.getElementById("affichageNombre").style.visibility = "hidden";
                        document.getElementById("plusMoins").style.visibility="hidden";
                        document.getElementById("score").style.display="flex";
                        document.getElementById("divClavier").style.display="none";
                        audio=document.getElementById('perdu');
                        audio.play();             
                        document.querySelector("#score p").innerHTML = "Tu as perdu!"
                                                                     +"\nMon nombre était " 
                                                                     +"<strong>" 
                                                                     +hasard 
                                                                     +"</strong>" + "!";
                       
                        document.querySelectorAll("#ligneNombre td")[countConstante - count].textContent = tableau[countConstante - count];
                        document.querySelectorAll("#ligneNombre td")[countConstante - count].style.color = "red";
                        idBouton3.style.visibility = "visible";
                        niveau=0; 
                        idBouton3.textContent="Rejouer!"; 
                        audio=document.getElementById('rejouer');                      
                    } 

                else
                    {test();}

                count--;
                idInput2.value = "";
            } 

            else
            {

                if (tableau[countConstante - count] == hasard && count > 0) 
                {
                    audio=document.getElementById('correct');
                    audio.play();

                    let dateFin = new Date();

                    let bravo;
                    const bravo1="Bravo tu as gagné!\nMon nombre était bien: " 
                              +"<strong>" +hasard +"</strong>" + "!";

                    const bravo2="Bravo! Tu as reussi tous les niveaux en mode difficile."
                                +"\nEn "
                                +"<strong>"+(dateFin.getMinutes()-dateDebut.getMinutes())+"</strong>"
                                +" minutes.";

    //-------------------Gestion du bouton changer de niveau/rejouer-----------------------------
        
                    if(niveau<3)
                    {
                        bravo=bravo1;
                        audio=document.getElementById('correct');
                        audio.play();

                        niveau++;
                        idBouton3.textContent="Niveau Suivant";
                        idBouton3.style.visibility = "visible";
                        audio=document.getElementById('suivant'); 
                    }

                    else
                    {
                        bravo=bravo2;
                        audio=document.getElementById('victoire');
                        audio.play();

                        niveau=0;
                        idBouton3.textContent="Rejouer!";
                        idBouton3.style.visibility = "visible";
                        audio=document.getElementById('rejouer');
                    }

                    document.querySelector("#score p").innerHTML = bravo;

                    document.querySelectorAll("#ligneNombre td")[countConstante - count].textContent = tableau[countConstante - count];
                    document.querySelectorAll("#ligneNombre td")[countConstante - count].style.color = "green";  

                    document.getElementById("affichageNombre").style.visibility = "hidden";
                    document.getElementById("plusMoins").style.visibility="hidden";

                    document.getElementById("partie2").style.backgroundImage="linear-gradient(#7cb7b6, #e28956)";

                    document.getElementById("score").style.display="flex";
                    document.getElementById("divClavier").style.display="none";
  
                }
            }
        }         
    }
    //-----------------------------Mise à jour Vie----------------------------------------------- 
    function test() 
    {
        audio=document.getElementById('error');
        audio.play();
   
        const vie = document.querySelectorAll("#ligneCoeur .coeur");
        vie[countConstante - count].src = 'img/coeurbarre2.png';
        const erreurNombre = document.querySelectorAll("#ligneNombre .nombreJoueur");
        erreurNombre[countConstante - count].style.background = "url('img/casebarre2.png') center";

        document.querySelectorAll("#ligneNombre td")[countConstante - count].textContent = tableau[countConstante - count];
    //-------------------------------------------------------------------------------------------
        let diff = Math.abs(tableau[countConstante - count] - hasard);

        if (tableau[countConstante - count] < hasard) 
        {

            if (diff > 9)
                {document.querySelector("#plusMoins img").src = 'img/plus.png';}

            else
                {document.querySelector("#plusMoins img").src = 'img/petitplus.png';}
        } 

        else if (tableau[countConstante - count] > hasard) 
        {
            if (diff > 9)
                {document.querySelector("#plusMoins img").src = 'img/moins.png';}

            else
                {document.querySelector("#plusMoins img").src = 'img/petitmoins.png';}
        }

    }
  
//---------------------Reinitialise le tableau de vie--------------------------------------------
   function resetVie()
    {
        for(let i=0;i<countConstante;i++)
        {
            const vie = document.querySelectorAll("#ligneCoeur .coeur");
            vie[i].src = 'img/coeur2.png'; 
            const erreurNombre = document.querySelectorAll("#ligneNombre .nombreJoueur");
            erreurNombre[i].style.background = "rgba(137, 137, 137, 0.5)";
            document.querySelectorAll("#ligneNombre td")[i].style.color="black";
            tableau[i] = document.querySelectorAll("#ligneNombre td")[i].textContent = "???";
            document.querySelector("#affichageNiveau p").innerHTML ="Niveau " 
                                                                + "<font color='red'>"
                                                                +(niveau+1)+"</font>" 
                                                                +" :Choisis un nombre entre 0 et " 
                                                                +"<strong>"+difficult[niveau]+"</strong";
        }
    }

//-----------------------------------------------------------------------------------------------
    function rejouer() 
    {
        audio.play(); 
        resetVie();

        document.getElementById("partie2").className="normal";
        document.getElementById("partie2").style.backgroundImage="linear-gradient(#7cb7b6, #e28956)";

        document.querySelector("#plusMoins img").src="img/logo.png";
        document.getElementById("plusMoins").style.visibility="visible";
        document.getElementById("affichageNombre").style.visibility = "visible";


        document.getElementById("score").style.display="none";
        document.getElementById("divClavier").style.display="block";

        document.querySelector("#score p").textContent="";
        idBouton3.style.visibility = "hidden";
        count=7;
        hasard = Math.round(Math.random() * difficult[niveau]);
        //hasard=20; //test
        idInput2.value="";
    }

//-------------------Lancement du jeu via addlistener-------------------------------------------
    intro();

    idBouton2.addEventListener('click', jeu);
    idInput2.onkeyup = function() {if (event.keyCode == 13)jeu();}; //valide par touche entrée

    idBouton3.addEventListener('click', rejouer);

//----------------------------- Gestion du Clavier----------------------------------------------   

    idBt0.addEventListener('click',function()
    {
        idInput2.value+=0;
    });

    idBt1.addEventListener('click',function()
    {
        idInput2.value+=1;
    });

    idBt2.addEventListener('click',function()
    {
        idInput2.value+=2;
    });

    idBt3.addEventListener('click',function()
    {
        idInput2.value+=3;
    });

    idBt4.addEventListener('click',function()
    {
        idInput2.value+=4;
    });

    idBt5.addEventListener('click',function()
    {
        idInput2.value+=5;
    });

    idBt6.addEventListener('click',function()
    {
        idInput2.value+=6;
    });

    idBt7.addEventListener('click',function()
    {
        idInput2.value+=7;
    });

        idBt8.addEventListener('click',function()
    {
        idInput2.value+=8;
    });

    idBt9.addEventListener('click',function()
    {
        idInput2.value+=9;
    });

    idBtDel.addEventListener('click',function()
    {
        idInput2.value="";
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
                            "audio/victoire.mp3"];

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


//-----------------------------------------------Fin--------------------------------------
}