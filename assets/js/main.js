
(function($){
    $.fn.extend({

        slider:function(options){
            return (function(self, options){
                var slides = self.find('#slidesWrapper > li'),
                    slidesNb = slides.length,
                    hovering = false,

                    showSlide = function(index){
                        index = (index < 0)?slidesNb -1:index;
                        index = (index > slidesNb -1)?0:index;


                        slides.filter('.active').removeClass('active').fadeOut(500);
                        $(slides.get(index)).addClass('active').fadeIn(300);
                        ;
                    },

                    setup = function(){
                        self.on({

                            mouseenter: function() {hovering = true;},
                            mouseleave: function() {hovering = false;}

                        }).find('#controlsWrapper > .control').on('click',function(e){
                            e.preventDefault();
                            theControl = $(this);
                            index = slides.filter('.active').index();

                            if(e.target.tagName == 'A'){
                                showSlide(theControl.hasClass('right')?index+1:index-1);
                            }
                        });
                    },

                    updateSlide = function(index){
                        index = (index < 0)?0:index;
                        index = (index < 0)?0:index;
                    },

                    timer = function(delay){
                        setTimeout(function(){
                            if(!hovering){
                                showSlide(slides.filter('.active').index() + 1);
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