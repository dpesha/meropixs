var setMobileEvent=function(element){
	
	element.on('tap', function (event) {
        event.preventDefault();
        SS.api.playToggle();       
    });
	
	element.on('swipe', function (event) {
       event.preventDefault();
       if (event.direction == "left") {
		   SS.api.nextSlide();
	   }
	   if (event.direction == "right") {
		   SS.api.prevSlide();
	   }      
    });
	
//	$(element)
//	   .hammer({
//		   prevent_default:true
//	   })
//	   .bind("tap", function(ev) {		   
//		   SS.api.playToggle();
//	   });
//	
//	$(element)
//	   .hammer({
//		   prevent_default:true
//	   })
//	   .bind("drag", function(ev) {
//		   if (ev.direction == "left") {
//			   SS.api.nextSlide();
//		   }
//		   if (ev.direction == "right") {
//			   SS.api.prevSlide();
//		   }
//	   });
}
