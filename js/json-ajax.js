$(document).ready(function(){
	//ajax to retrieve and print values of API
	$.ajax({ 
		type: 'GET', 
		url: './js/data.json', 
		data: { get_param: 'results' }, 
		dataType: 'json',
		success: function (data) {	
			/* dropdown assign first element to show */
			$(".dropdown").find('.btn').html(data.sort_filters["top-deals"] + ' <span class="caret"></span>');
			/* retrieve and inject values dropdown */
			var elementDropdown ='';
			$.each(data.sort_filters, function(keyJson, valueJson){
				elementDropdown += "<li><a href=#"+ keyJson +" id="+ keyJson+">"+ valueJson +"</a></li>";
			});
			$('.dropdown-menu').append(elementDropdown);
			
			/* retrieve & inject header dynamic load {#hotels} hotel{s} in {#location} */
			var elementHeaderHotels = 
				"<strong id='numberhotels'>"+ data.hotels.length +"</strong> \
				<span class='italic'>hotel" + (data.hotels.length>1 ? 's ' : ' ') + "in</span> \
				<label id='city' class='strong'>"+ data.query.location +"</label>";
			$('.header-hotels').append(elementHeaderHotels);
			
			/* module Free cancelation */
			var freeCancelation = 
				"<div class='fg-green pull-left clear'> \
					<i class='icon-check pull-left'></i> \
					<small>Free cancellation</small> \
				</div>";
			
			/* loop to print all hotels from JSON */
			$.each(data.hotels, function(index, hotel){
				var elementHotel = 
					"<div class='hotel hotel-"+ index +"' data-name="+ hotel.title.replace(/\s/g,'') +" data-price="+ hotel.rooms[0].price.replace(/[^0-9\.]/g, '') +" data-savings="+ hotel.rooms[0].savings.replace(/[^0-9\.]/g, '') +"> \
					<div class='hotel-img pull-left clear'> \
						<div class='relative'> \
							<img src='"+ hotel.image +"' alt='hotel'> \
							<small class='module-promotion fg-red strong small'>"+ hotel.promotion +"</small> \
						</div> \
					</div> \
					<div class='hotel-info'> \
						<div class='col-md-12 col-xs-12'> \
							<div class='col-md-10 col-xs-12 border-grey'> \
								<div class='col-md-9 nopadding'> \
									<h3 class='strong pull-left truncate'>"+ hotel.title +"</h3> \
									<div class='module-rating pull-left'>";
									/* render icon self-star yellow */
									for (i=0; i<parseInt(hotel.rating); i++)
									{	
										elementHotel += "<i class='icon-"+ hotel.rating_type +"-yellow pull-left'></i>";
									};
									/* if decimal, render half icon self-star yellow */									
									if (hotel.rating % 1 != 0)
									{
										elementHotel += "<i class='icon-"+ hotel.rating_type +"-half pull-left'></i>";
									}
									/* render icon self-star grey */
									for (i=Math.round(hotel.rating); i<5; i++)
									{	
										elementHotel += "<i class='icon-"+ hotel.rating_type +"-grey pull-left'></i>";
									};	
									/* elementHotel += "<div class='fg-yellow pull-left'>"+ hotel.rating +"</div> \ */
									elementHotel += "</div> \
									<small class='hotel-address fg-grey pull-left clear'>"+ hotel.address +"</small> \
									<a href='#' class='fg-red pull-left clear small'>"+ hotel.rooms[0].name +"</a>";
									elementHotel += (hotel.rooms[0].free_cancellation == "true" ? freeCancelation : '') +" \
									</div>";
									
									/* module Qantas Points Earned */
									var qantasPointsEarned = 
									"<div class='col-md-3 module-gold fg-gold margintop30 text-right'> \
										<small>Qantas Points earned*</small> \
										<p>"+ hotel.rooms[0].points_earned +"</p> \
									</div>";								
									elementHotel += (hotel.rooms[0].points_earned !='0' ? qantasPointsEarned : '') +" \
								</div> \
							<div class='module-price col-md-2 col-xs-12 border-grey text-right'> \
								<div class='col-md-12 nopadding margintop30'> \
									<strong class='strong'>1</strong> \
									<small> night total ("+ hotel.rooms[0].currency +")</small> \
								</div> \
								<div class='col-md-12 nopadding'> \
									<h2 class='pull-right text-right'>"+ hotel.rooms[0].price.replace(/[^0-9\.]/g, '') +"</h2> \
									<label class='currency pull-right'>"+ hotel.rooms[0].price.substring(0,1) +"</label> \
								</div>";
								var savings = hotel.rooms[0].savings != '0' ? "<p class='module-savings fg-red strong'>Save "+ hotel.rooms[0].savings  +"</p>" : '';
								elementHotel += savings +"\
							</div> \
						</div> \
					</div>\
				</div>";
				$('.list-hotels').append(elementHotel);
			});
		}
	}).done(function(){ 
		/* callback response */
	});
});