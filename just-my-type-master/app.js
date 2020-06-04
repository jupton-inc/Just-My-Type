$(document).ready(function () {
    let sentences = ['ten ate neite ate nee enet ite ate inet ent eate',
        'Too ato too nOt enot one totA not anot tOO aNot',
        'oat itain oat tain nate eate tea anne inant nean',
        'itant eate anot eat nato inate eat anot tain eat',
        'nee ene ate ite tent tiet ent ine ene ete ene ate'];

    let letterIndex = 0;
    let startTime = 0;
    let sentenceIndex = 0;
    let mistakeCount = 0;

    let currentSentence = sentences[0];
    let currentLetter = currentSentence.charAt(0);

    $('#keyboard-upper-container').hide()

    $(document).keydown(function (e) {
        if (e.keyCode === 16) {
            $('#keyboard-lower-container').hide();
            $('#keyboard-upper-container').show();
        }
    });

    $(document).keyup(function (e) {
        let asciiCode = e.key.charCodeAt(0)
        console.log(asciiCode)

        if (e.keyCode === 16) {
            $('#keyboard-lower-container').show();
            $('#keyboard-upper-container').hide();
        }

        $(`#${e.key.charCodeAt(0)}`).css('background-color', "#f5f5f5");

    });

    $('#sentence').append(currentSentence);
    $('#target-letter').append(currentLetter);

    $(document).keypress(function (e) {
        event.preventDefault();

        $(`#${e.keyCode}`).css('background-color', "yellow");

        if (!startTime == undefined) {
            startTime = e.timeStamp;
        }
        else if (event.which === currentLetter.charCodeAt(0)) {
            $('#feedback').append('<span class="glyphicon glyphicon-ok"></span>');
        } else {
            $('#feedback').append('<span class="glyphicon glyphicon-remove"></span>');
            mistakeCount++;
        }

        letterIndex++;

        if (letterIndex === currentSentence.length) {
            sentenceIndex++;

            if (sentenceIndex === sentences.length) {
                let endTime = event.timeStamp;
                let elapsedMinutes = (endTime - startTime) / (60 * 1000)
                let wpm = 54 / elapsedMinutes - 2 * mistakeCount;
                $('#feedback').text('You typed ' + wpm + ' words per minute.');
                setTimeout(function () {
                    if (confirm('Try again?')) {

                        sentenceIndex = 0;
                        letterIndex = 0;
                        currentSentence = sentences[0];
                        currentLetter - currentSentence.charAt(0);
                        $('#sentence').text(currentSentence);
                        $('#target-letter').text(currentLetter);
                        $('#feedback').empty();
                        $('#yellow-block').css('left', '15px');
                        startTime = undefined;
                    }
                }, 3000);

            } else {

                currentSentence = sentences[sentenceIndex];
                $('#sentence').text(currentSentence);

                letterIndex = 0;
                currentLetter = currentSentence.charAt(letterIndex);
                $('#target-letter').text(currentLetter);
                $('#feedback').empty();
                $('#yellow-block').css('left', '15px');
            }

        } else {

            currentLetter = currentSentence.charAt(letterIndex);
            $('#target-letter').text(currentLetter);
            $('#yellow-block').css('left', '+=18');
        }
    });
});






