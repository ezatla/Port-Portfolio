//  Template Name : Autowy 
// Author : BazarTheme

jQuery(document).ready(function($) {
    'use strict';
    //Preloader
    $('#loader-wrapper').css('display', "none");
    $('#preloader').css('display', "none");

    // STICKY NAGIGATION
    $("#sticky-nav").sticky({ topSpacing: 0 });
    //Navigation-animated

    var prev = 0;
    var $window = $(window);
    var navbar = $('.navbar');

    $window.on('scroll', function() {
        var scrollTop = $window.scrollTop();
        navbar.toggleClass('swingOutX', scrollTop > prev).delay(900);
        prev = scrollTop;
    });

    $window.scroll(function() {
        var scrollTop = $window.scrollTop();
        if (scrollTop == 0) {
            navbar.addClass('navbar-transparent');
        } else {
            navbar.removeClass('navbar-transparent');
        }
    });


    // animated-text
    //set animation timing
    var animationDelay = 3000,
        //clip effect 
        revealAnimationDelay = 500;

    initHeadline();


    function initHeadline() {
        //initialise headline animation
        animateHeadline($('.cd-headline'));
    }



    function animateHeadline($headlines) {
        var duration = animationDelay;
        $headlines.each(function() {
            var headline = $(this);

            if (headline.hasClass('clip')) {
                var spanWrapper = headline.find('.cd-words-wrapper'),
                    newWidth = spanWrapper.width() + 10
                spanWrapper.css('width', newWidth);
            }
            //trigger animation
            setTimeout(function() { hideWord(headline.find('.is-visible').eq(0)) }, duration);
        });
    }

    function hideWord($word) {
        var nextWord = takeNext($word);

        if ($word.parents('.cd-headline').hasClass('type')) {
            var parentSpan = $word.parent('.cd-words-wrapper');
            parentSpan.addClass('selected').removeClass('waiting');
            setTimeout(function() {
                parentSpan.removeClass('selected');
                $word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
            }, selectionDuration);
            setTimeout(function() { showWord(nextWord, typeLettersDelay) }, typeAnimationDelay);

        } else {
            switchWord($word, nextWord);
            setTimeout(function() { hideWord(nextWord) }, animationDelay);
        }
    }

    function takeNext($word) {
        return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
    }

    function switchWord($oldWord, $newWord) {
        $oldWord.removeClass('is-visible').addClass('is-hidden');
        $newWord.removeClass('is-hidden').addClass('is-visible');
    }

    // Smooth scroll 
    var $root = $('html, body');
    $('a').on('click', function() {
        $root.animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 1200, 'easeInOutCubic');
        return false;
    });


    // parallax
    $(function() {
        $.stellar({
            horizontalScrolling: false,
            verticalOffset: 40
        });
    });
    // fancybox
    $('.fancybox').fancybox({
        closeBtn: true,
        helpers: {
            title: null,
        }

    });
    // owl-carousel
    $('.owl-carousel').owlCarousel({
        loop: true,
        autoplay: 500,
        margin: 100,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    })


});
// Google Map
/*Google map Latitude and longitude*/
var lat = -37.817849;
var long = 144.958231;

var centerLong = long;

var myLatlng = new google.maps.LatLng(lat, long);
var centerPosition = new google.maps.LatLng(lat, centerLong);


/*Maps Style 1 optios*/
var googlemap1options = {
    zoom: 14,
    center: centerPosition,
    center: myLatlng,
    scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
}


var map1 = new google.maps.Map(document.getElementById("googlemap1"), googlemap1options);

var marker1 = new google.maps.Marker({
    position: myLatlng,
    title: "Hello World!"
});

marker1.setMap(map1);
