$.ajax({
  url: 'https://api.instagram.com/v1/media/popular?client_id=ce95cb4e56c146c994457b48a839f6a8',
  dataType: 'jsonp',
  success: function(result){
    for (var i = 0; i < result.data.length; i++){
      var url = result.data[i].images.thumbnail.url;
      var user = result.data[i].user.username;
      var likes = result.data[i].likes.count;
      var filter = result.data[i].filter;

      
    $('.instagram-imgs').append('<li>' + '<img src="' + url + '"/><h2 class="overlay">' + user + ', ' + likes + '</h2>' + '</li>');
  }  

  (function carousel($){

    var limit = 20, 
        offset = 0,      
        picsCount = 20,
        totalWidth = 0,
        currentSlide = 1,
        leftMargin = 0,
        isCompleted = false,
        disable = false,
        slidesTotal = 20;
    
    var $instagram_module = $('.collection-instagram-module'),
        $picWrapper = $instagram_module.find('.instagram-imgs'),
        $buttons = $('.instagram-nav-wrap .nav'),
        slideWidth = $picWrapper.width();

    (function initializeWidget() {    

      $buttons.on('click', function() {

        var $button = $(this);

        if (disable) {
          return;
        }
        
        disable = true;      

        if ($button.hasClass('disabled')) {
          disable = false;
          return;
        }
        
        leftMargin = parseInt($picWrapper.css('margin-left').replace('px', ''));

        console.log('leftMargin', leftMargin);

        if ($button.hasClass('left')) {
         
          leftMargin += slideWidth;
          console.log('adding ' + slideWidth + ' to the left margin');
          currentSlide--;

          if (currentSlide === 1) {
            $button.addClass('disabled');
          }
        } 
        else {        
          leftMargin -= slideWidth;
          currentSlide++;

          if (currentSlide === slidesTotal) {

            if (isCompleted) {           
              $button.addClass('disabled');            
            }
            else {
              offset += limit;
              //getInstagramSubmissions(limit,offset);
              
              length = $picWrapper.find('li').length,
              slidesTotal = Math.ceil(length / 5);
            }          
          }
        }

        $button.siblings('.nav').removeClass('disabled');
        $picWrapper.animate({ "margin-left": leftMargin});

        //Prevent double click issue
        setTimeout(function(){
          disable = false;
        }, 500);

      }); //END ONCLICK

      }()); //END INITIALIZE WIDGET

    }(jQuery)); //END SELF INVOKING CAROUSEL FUNCTION

  }
});