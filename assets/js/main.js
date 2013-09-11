
(function($){
    $.fn.extend({

        slider:function(){
            return (function(self){
                var slides = self.find('#slidesWrapper > li'),
                    slidesNb = slides.length,

                    setupControls = function(){
                        self.find('#controlsWrapper > .control').on('click',function(e){
                            e.preventDefault();
                            theControl = $(this);
                            index = self.find('#slidesWrapper > .active').index();
                            index = theControl.hasClass('right')?index+1:index-1;
                            console.log(index);
                        });
                    },

                    updateSlide = function(index){
                        index = (index < 0)?0:index;
                        index = (index < 0)?0:index;
                    },

                    construct = (function(){
                        // slidesCount
                        setupControls();
                    })();

                return {};

            })($(this));
        }
    });
})(jQuery);



jQuery(document).ready(function($) {
    
    $('#slider').slider();

});