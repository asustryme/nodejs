/**
	Core script to handle the entire theme and core functions
**/

var Layout = function() {
// Handles the footer
    var handleContentHeight = function() {
        var height;
		height = Layout.getViewPort().height -
			$('.iheader').outerHeight(true) - 
			$('.ifooter').outerHeight(true);
		$('.icontainer').css('min-height', height );
    };

	var handleHeroesTable = function() {
		$.ajax({
			type: "GET",
			url: "/heroes",
			data: null,
			dataType: "json",
			success: function(response) {
				if( !$.isEmptyObject(response) ){
					$(".heroes-alert").remove();
					$("#heroes tbody tr").remove();
					$.each(response,function(index,value){
						$("#heroes tbody").append("<tr id='hero_tr_"+index+"'><td>"+index+"</td><td>"+value.Type+"</td><td>"+value.Life+"</td><td>"+value.Weapon+"</td></tr>");
					});
				}else{
					$(".heroes-alert").remove();
					$("#heroes").after("<div class='alert alert-info heroes-alert'>Empty list of heroes</div>");
				}
				
			}, // succes zár
			error: function(){
				console.log("hiba");
			}
		});	// .ajax zár
	};

    return {
    // methods //
		getViewPort: function() {
			var e = window,
				a = 'inner';
			if (!('innerWidth' in window)) {
				a = 'client';
				e = document.documentElement || document.body;	
			}
			return {
				width: e[a + 'Width'],
				height: e[a + 'Height']
			};
		},	
        initContent: function() {
            handleContentHeight();
        },
        initAjax: function() {
        	handleHeroesTable();
        },
        heroesTable: function() {
        	handleHeroesTable();
        },
    // setters //
	    addWarrior : function() {
	    	$.ajax({
				type: "GET",
				url: "/addhero",
				data: "type=warrior&life=30",
				dataType: "json",
				success: function(response) {
					handleHeroesTable();
				}
			});	// .ajax zár
	    },
	    addPriest :function() {
	    	$.ajax({
				type: "GET",
				url: "/addhero",
				data: "type=priest&life=30",
				dataType: "json",
				success: function(response) {
					handleHeroesTable();
				}
			});	// .ajax zár
	    },
	    addWeapon : function(type,hero) {
	    	$.ajax({
				type: "GET",
				url: "/addweapon",
				data: "weapon="+type+"&hero="+hero,
				dataType: "json",
				success: function(response) {
					handleHeroesTable();
				}
			});	// .ajax zár
	    },
	    sethp : function() {

	    },
	// init //
        init: function () {            
            this.initContent();
            this.initAjax();
        }
    };
}();

$(document).ready(function(e) {
    Layout.init();
    $("#heroes_refresh").click(function(e){
    	Layout.heroesTable();
    });
    $("#priest_add").click(function(e){
    	Layout.addPriest();
    });
    $("#warrior_add").click(function(e){
    	Layout.addWarrior();
    });
});

$(window).resize(function(e) {
    Layout.initContent();
});