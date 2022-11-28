/* LOCATION / CURRENCY */

$( document ).ready(function() {

    $("ul.select-location li a").click(function(e) {
        var subdom = $(this).attr('data-subdom');
        var path = document.location.pathname;
        if (subdom == "us") {
            var dest = 'https://romesnowboards.com' + path;
        } else {
            var dest = 'https://' + subdom + '.romesnowboards.com' + path;
        }
        window.location.href = dest;
        e.preventDefault();
    });

});
  
/* END LOCATION / CURRENCY */
  
/* CUSTOM VIDEO CONTROLS */

$( document ).ready(function() {
    $('.video-button-play').click(function(e) {
        console.log('VIDEO clicked');
        var video = $(this).siblings('video');
        if (video.prop('paused')) {
            video.trigger('play');
            $(this).fadeTo(200, 0);
            console.log('VIDEO play');
        } else {
            video.trigger('pause');
            $(this).fadeTo(200, 1);
            console.log('VIDEO pause');
        }
        video.on('ended',function(){
            console.log('VIDEO ended');
            $(this).siblings('.video-button-play').fadeTo(200, 1);
        }); 
        e.preventDefault();
    });
});

/* END CUSTOM VIDEO CONTROLS */
