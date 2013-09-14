
(function($){
    $.fn.extend({

        slider:function(options){
            return (function(self, options){
                var slides = self.find('#slidesWrapper > li'),
                    slidesNb = slides.length,
                    hovering = false,
                    slideFeedback,

                    getCurrentIndex = function(){
                        return slides.filter('.active').index();
                    }

                    updateSlide = function(index){
                        index = (index < 0)?slidesNb -1:index;
                        index = (index > slidesNb -1)?0:index;

                        slideFeedback.children().removeClass('active').eq(index).addClass('active');
                        slides.filter('.active').removeClass('active').fadeOut(700);
                        $(slides.eq(index)).addClass('active').fadeIn(500);
                        ;
                    },

                    setup = function(){
                        slideFeedback = $('<ul>').addClass('slideFeedback');
                        
                        for (var i = slidesNb - 1; i >= 0; i--){
                            slideFeedback.prepend($('<li>').addClass((i == 0)?'active first':(slidesNb -1 == i)?'last':'')
                                .append($('<a>').attr({href: '#'})
                                    .on('click',(function(e){
                                        e.preventDefault();
                                        var index = $(this).parent().index();
                                        if(getCurrentIndex() !== index){
                                            updateSlide(index);
                                        }
                                    }))));
                        };

                        self.on({

                            mouseenter: function() {hovering = true;},
                            mouseleave: function() {hovering = false;}

                        })
                        .append(slideFeedback)
                        .find('#controlsWrapper > .control').on('click',function(e){
                            e.preventDefault();
                            theControl = $(this);
                            index = getCurrentIndex();

                            if(e.target.tagName == 'A'){
                                updateSlide(theControl.hasClass('right')?index+1:index-1);
                            }
                        });
                    },

                    timer = function(delay){
                        setTimeout(function(){
                            if(!hovering){
                                updateSlide(getCurrentIndex() + 1);
                            };
                            timer(delay);
                        },delay);
                    }

                    construct = (function(){
                        timer((options.delay !== undefined)?options.delay:5000);
                        setup();
                        slides.first().addClass('active').show().siblings().hide();
                    })();

                return {};

            })($(this), (options !== undefined)?options:{});
        }
    });
})(jQuery);








jQuery(document).ready(function($) {
    
    $('#slider').slider();

});