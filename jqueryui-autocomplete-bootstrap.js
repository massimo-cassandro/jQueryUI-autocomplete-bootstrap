/*!@license
* jQuery UI autocomplete
* http://jqueryui.com
* Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.position.js, jquery.ui.autocomplete.js, jquery.ui.menu.js
* Copyright 2014 jQuery Foundation and other contributors; Licensed MIT
*/

/*
	NB: jQuery UI is not present in the repository, except file included in the minified version of the script
*/

/*
@codekit-prepend '../jquery-ui-master/ui/core.js';
@codekit-prepend '../jquery-ui-master/ui/widget.js';
@codekit-prepend '../jquery-ui-master/ui/position.js';
@codekit-prepend '../jquery-ui-master/ui/autocomplete.js';
@codekit-prepend '../jquery-ui-master/ui/menu.js';
*/


/*
 * Jquery UI autocomplete Bootstrap theming
 * Massimo Cassandro
 */


$.widget( "ui.autocomplete", $.ui.autocomplete, {

   _renderMenu: function( ul, items ) {
    var that = this;
	    ul.attr("class", "nav nav-pills nav-stacked  bs-autocomplete-menu" );
	    $.each( items, function( index, item ) {
	        that._renderItemData( ul, item );
	    });
	},

	_resizeMenu: function() {
		var ul = this.menu.element;
		ul.outerWidth( Math.min(
			// Firefox wraps long text (possibly a rounding bug)
			// so we add 1px to avoid the wrapping (#7513)
			ul.width( "" ).outerWidth() + 1,
			this.element.outerWidth()
		) );
	}

});


(function() {
	"use strict";

    $('.bs-autocomplete').each( function() {
	    var _this = $(this),
	    	_data = _this.data(),
	    	_hidden_field = $('#' + _data.hidden_field_id)
	    ;

	    _this.after('<div class="bs-autocomplete-feedback form-control-feedback"><div class="loader">Loading...</div></div>')
	    .parent('.form-group').addClass('has-feedback');

	    var feedback_icon = _this.next('.bs-autocomplete-feedback');
	    feedback_icon.hide();

	    _this.autocomplete({
            minLength:2,
            autoFocus: true,

            source: function(request, response) {
                $.ajax({
                    url: _data.source,
                    dataType: "json",
                    data: {
						q: request.term
		            },
                    success: function(data) {
                        response ( data );
                    }
                });
            },

            search: function () {
                feedback_icon.show();
                _hidden_field.val('');
            },

            response: function() {
                feedback_icon.hide();
            },

            focus: function(event, ui) {
                _this.val(ui.item[_data.item_label]);
                event.preventDefault();
            },

            select: function(event, ui) {
                _this.val(ui.item[_data.item_label]);
				_hidden_field.val(ui.item[_data.item_id]);
				event.preventDefault();
            }
        })
        .data( 'ui-autocomplete' )._renderItem = function( ul, item ) {
            return $( '<li></li>' )
                .data( "item.autocomplete", item )
                .append( '<a>' + item[_data.item_label] + '</a>')
                .appendTo( ul );
        };
        // end autocomplete
    });
})();