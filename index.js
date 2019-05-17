/**
 * Tinder Auto Like
 * Author: Paolo Carrara
 * 
 * This is a simple js script for people that like me does not care for what I'm liking on Tinder,
 * because if I dont't like the match I just go and unmatch it. That simple.
 * 
 * If you are subscriber of one of Tinder's plans that gives you infinite likes you can just use this script
 * to like everyone. They say you can like an 'unlimited' number of times, don't take that as granted as I already
 * got 429 (Too Many Requests) code after some thousands.
 * 
 * Anyway, go have fun and don't take Tinder very serious, it's full of retarde people, including me.
 */ 

var TinderAutoLike = (function () {
    /**
     * Time between two consecutive clicks.
     * Don't set intervals smaller than 500 miliseconds, Tinder will block your requests.
     */
    var intervalBetweenClicks = 1 * 1000; // 1 second

    /**
     * The game pad is the place where the main Tinder buttons are.
     */
    var gamePad;

    /**
     * The beloved like button.
     */
    var likeButton;

    /**
     * The superlike button.
     * We are not using it here, be feel free to modify the code and use it.
     */
    var superLikeButton;

    /**
     * The "no uglies for me today" button.
     * We are not using it here, be feel free to modify the code and use it.
     */
    var passButton;

    /**
     * The set interval id, needs to be saved in case you wanna stop.
     */
    var setIntervalId;

    /**
     * A flag that tells if the process is running or not.
     */
    var doesItStarted = false;

    /**
     * Gets all the interesting buttons and stuff.
     * 
     * If you pay close attention you will notice that the buttons are got in 'best guess' manner, iee, we hope
     * that the button at index 1 is the pass button, index 2 is the super like button and index 3 the like button,
     * that means, if Tinder decides to changes its game pad disposition we'll need to adapt.
     */
    function beforeStart () {
        gamePad = document.getElementsByClassName('recsGamepad')[0];
        passButton = gamePad.getElementsByTagName('button')[1]
        superLikeButton = gamePad.getElementsByTagName('button')[2]
        likeButton = gamePad.getElementsByTagName('button')[3]
    }

    /**
     * It does what is says it does.
     * If the process is running it restarts the process so the changes takes effect.
     */
    function setIntervalBetweenClicks (newInterval) {
        intervalBetweenClicks = newInterval;

        if (doesItStarted) {
            stop();
            start();
        }
    }

    /**
     * It does what is says it does.
     */
    function setStartedFlat (value) {
        doesItStarted = value;
    }

    /**
     * Starts the process.
     */
    function start () {
        beforeStart();

        if (!doesItStarted) {
            setStartedFlat(true);

            setIntervalId = setInterval(function () {
                likeButton.click();
            }, intervalBetweenClicks);
        }
    }

    /**
     * Stops the process.
     */
    function stop () {
        if (doesItStarted) {
            setStartedFlat(false);

            clearInterval(setIntervalId);
        }
    }

    /**
     * Prints how to do the basic use of the script.
     */
    function usage () {
        console.log('Tinder Auto Like usage instructions:');
        console.log('To start just run: TinderAutoLike.start();');
        console.log('Yeah, that simple, it\'s gonna start the liking process until you run out of likes to give.');
    }

    usage();

    /**
     * TinderAutoLike interface.
     */
    return {
        setIntervalBetweenClicks: setIntervalBetweenClicks,
        start: start,
        stop: stop,
        usage: usage
    }
})();