
import $ from 'jquery';
import { gameSounds, gameInfos } from './globals';

/**
 * Fonction qui permet d'allumer la console
 */
export const powerOn = () => {
    $('#power-on').off('click').one('click', () => {
        $('#power-on').css({"-webkit-transform":"translateY(30px)"});
        $('#led').toggleClass('led-on led-off');
        $('#intro').toggleClass('intro-on intro-off');
        setTimeout(() => {
            $('#player-names').css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0});
        }, 1000);
        gameSounds.startup.play();
        setTimeout(() => {
            gameSounds.intro.play();
            gameSounds.intro.loop = true;
        }, 1000);
        $('.message').css('visibility','hidden');
        checkForm();
        //Lancement d'un écouteur d'évènement pour éteindre la gameboy
        powerOff();
    })
}
/**
 * Fonction qui permet d'éteindre la console
 */
export const powerOff = () => {
    $('#power-on').off('click').one('click', () => {
        $('#power-on').css({"-webkit-transform":"translateY(0px)"});
        setTimeout(() => {
            location.reload();
        }, 500);
    });
}

/**
 * Fonction qui démarre le jeu
 */

const checkForm = () => {
    $(document).on('keypress',(e) =>{
        if(e.which == 13) {
            const
            valuePlayer0 = checkEachInputForm($('#player0').val(),'#player0','.player-names-error-message-player0'),
            valuePlayer1 = checkEachInputForm($('#player1').val(),'#player1','.player-names-error-message-player1');
            if(valuePlayer0 && valuePlayer1){
                const
                player0 = $('#player0').val(),
                player1 = $('#player1').val();
                gameInfos.players[0].name = player0;
                gameInfos.players[1].name = player1;
                gameInfos.scoreboards[0].addPlayerName(0,player0);
                gameInfos.scoreboards[1].addPlayerName(1,player1);
                gameSounds.intro.pause();
                gameSounds.ambiance.play();
                gameSounds.ambiance.loop = true;
                displayGame();
                $(document).unbind('keypress');
            }
        }
    });
}
/**
 * Fonction qui contrôle les données entrées dans le formulaire
 */
const checkEachInputForm = (value,elementPlayer,messageError) => {
    const regex = /^[a-zA-Z0-9]{3,9}$/;
    if(value.length >= 3 && value.length <= 9 && value.match(regex)){
        $(messageError)[0].innerHTML = '';
        $(elementPlayer).removeClass('input-text-intro-error');
        $(elementPlayer).addClass('input-text-intro-ok');
        return true;
    } else {
        $(messageError)[0].innerHTML = 'Entrez au moins 3 caractères de type alphanumérique';
        $(elementPlayer).removeClass('input-text-intro-ok');
        $(elementPlayer).addClass('input-text-intro-error');
        return false;
    }
}

/**
 * Fonction qui affiche les éléments du jeu
 */

const displayGame = () => {
    $('#intro').fadeOut();
    $('#player-names').fadeOut();
    $('#board').fadeIn();
    $('#console').fadeIn();
    $('#scoreboard').fadeIn();
    $('#intro').toggleClass('intro-on intro-off');
    $('#fight-buttons').toggleClass('display-none inline-block');
    setTimeout(() => {
        //Affichage d'une modal
        displayModalText(gameInfos.data.rulesBoard);
        window.onclick = (event) => {
            if (event.target.className !== 'background-modal-content' && event.target.className !== 'background-modal-content-text') {
              closeModalText();
              event.stopPropagation();
              window.onclick = null;
            }
          }
          $('.background-modal-content-close').off('click').one("click",() => {
            closeModalText();
          })
    }, 1000);
}
/**
 * Fonction qui affiche une modal avec un tableau passé en paramètre
 */
export const displayModalText = (arrayText) => {
    $('.background-modal').fadeIn();
    $('.background-modal-content').slideDown();
    for (let i = 0; i < arrayText.length; i++) {
        $('.background-modal-content-text').append(arrayText[i] + '<br />' + '<br />');
    }
}
/**
 * Fonction qui ferme une modal
 */
export const closeModalText = () => {
    $('.background-modal').fadeOut();
    $('.background-modal-content').slideDown();
    $('.background-modal-content-text').html('');
}