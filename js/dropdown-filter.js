$(document).ready(function(){
	$('.dropdown-menu').on('click', 'a', function(){
		$(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
		$(this).parents(".dropdown").find('.btn').val($(this).data('value'));
		
		/* binding each dropdown select onClick */
		switch ($(this).attr("id"))
		{
			case 'top-deals':
				sortByPriceTopDeals('topdeals');
				break;
			case 'price-desc':
				sortByPriceTopDeals('desc');
				break;
			case 'price-asc':
				sortByPriceTopDeals('asc');
				break;
			case 'name-asc':
				sortByName();
				break;
		}	
	});
	/* function to sort hotels by price (desc and asc) and by top deals (savings) */
	function sortByPriceTopDeals(param)
	{
		var attrData = (param=="topdeals" ? "data-savings" : "data-price");
		var filterHotel = getSorted('.list-hotels .hotel', attrData);
			$('.list-hotels').children().remove();
			$('.list-hotels').append(filterHotel);
			
		function getSorted(selector, attrName) {
			return $($(selector).toArray().sort(function(a, b){
				var aVal = parseInt(a.getAttribute(attrName)),
					bVal = parseInt(b.getAttribute(attrName));
					var obj = (param=='asc' ? aVal - bVal : bVal - aVal);	
					return obj;
			}));
		}
	};
	/* function to sort hotels by name */
	function sortByName()
	{
		var filterHotel = getSorted('.list-hotels .hotel', 'data-name');
			$('.list-hotels').children().remove();
			$('.list-hotels').append(filterHotel);
			
		function getSorted(selector, attrName) {
			return $($(selector).toArray().sort(function(a, b){
				var aVal = a.getAttribute(attrName),
					bVal = b.getAttribute(attrName);
					return (aVal.localeCompare(bVal));
			}));
		}
	};
});