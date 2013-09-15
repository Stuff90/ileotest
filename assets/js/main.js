
(function($){
    $.fn.extend({

        slider:function(options){ // options en prévision
            return (function(self, options){ 
                var slides = self.find('#slidesWrapper > li'), // tableau de toute les slides
                    slidesNb = slides.length, 
                    hovering = false,
                    slideFeedback,

                    getCurrentIndex = function(){ // Renvoie l'index de la slide courante
                        return slides.filter('.active').index();
                    }

                    updateSlide = function(index){ // change la slide courante pour celle avec l'index donné
                        index = (index < 0)?slidesNb -1:index; // non négatif
                        index = (index > slidesNb -1)?0:index; // inférieur au total de slides

                        slideFeedback.children().removeClass('active').eq(index).addClass('active'); // upadte classe active sur les cercle feedback
                        slides.filter('.active').removeClass('active').fadeOut(700); // fade out la slide courante
                        $(slides.eq(index)).addClass('active').fadeIn(500); // fade in la slide suivante
                        ;
                    },

                    setup = function(){
                        slideFeedback = $('<ul>').addClass('slideFeedback'); // créé le conteneur ders cercles
                        
                        for (var i = slidesNb - 1; i >= 0; i--){ // boucle pour chaque slide
                            slideFeedback.prepend($('<li>').addClass((i == 0)?'active first':(slidesNb -1 == i)?'last':'') // créé un cercle + ajoute la class active si courant et les classes last et first 
                                .append($('<a>').attr({href: '#'}) // créé le lien
                                    .on('click',(function(e){ // click evenement
                                        e.preventDefault();
                                        var index = $(this).parent().index(); 
                                        if(getCurrentIndex() !== index){ // exlue la slide courante
                                            updateSlide(index); // change la slide
                                        }
                                    }))));
                        };

                        self.on({

                            // Detect si la souris survole le slider ou non
                            mouseenter: function() {hovering = true;},
                            mouseleave: function() {hovering = false;}

                        })
                        .append(slideFeedback) // Ajoute le conteneur des cercles
                        .find('#controlsWrapper > .control').on('click',function(e){ // gére le clic sur les flèches
                            e.preventDefault();
                            theControl = $(this);
                            index = getCurrentIndex();

                            if(e.target.tagName == 'A'){ // vérifie si l'elt cliqué est bien un lien
                                updateSlide(theControl.hasClass('right')?index+1:index-1);
                            }
                        });
                    },

                    timer = function(delay){ 
                        setTimeout(function(){
                            if(!hovering){ // check si le slider est survolé ou non
                                updateSlide(getCurrentIndex() + 1); // change la slide
                            };
                            timer(delay); // appel à la récursive
                        },delay);
                    }

                    construct = (function(){ // constructeur
                        timer((options.delay !== undefined)?options.delay:5000); // initialize le timer, si option non défini, delay = 5000
                        setup(); // fonction d'initialisation des comportements du slider
                        slides.first().addClass('active').show().siblings().hide(); // gère l'affichage de la première slide

                    })();

                return {};

            })($(this), (options !== undefined)?options:{});
        }
    });
})(jQuery);








jQuery(document).ready(function($) {

    $('#slider').slider();

});