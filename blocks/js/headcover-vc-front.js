/**
 * Generic JS for viewing and managing async reports.
 *
 * @author Roger Coathup.
 */
 (function( $ ) {
	'use strict';

	/**
	 * 
	 * @param {*} nonce 
	 * @param {*} data 
	 */
	function generateReport( nonce, data, baseAction, $reports ) {

		var options = {
			message: "Starting the report"
		};

		HoldOn.open(options);

		var params = {
			action: baseAction + '_trigger',
			context: data,
			nonce: nonce
		}

		$.post( jc_async_reports.ajaxurl, params, function( result ) {

			var status = $(result).find( 'response_data' ).text();

			if ( status === 'started' ) {

				var template = $(result).find( 'supplemental template' ).text();
				$reports.prepend( template );
				HoldOn.close();

			} else {

				var message = $(result).find( 'supplemental message' ).text();
				$reports.find('.notice').show().html( message );
				HoldOn.close();
			}

		});
	}

	function redeemCovers( nonce, data, action, $reports ) {

		var options = {
			message: "Starting the redemptions"
		};

		HoldOn.open(options);

		var params = {
			action: action + '_trigger',
			context: data,
			nonce: nonce
		}

		$.post( jc_async_reports.ajaxurl, params, function( result ) {

			var status = $(result).find( 'response_data' ).text();

			if ( status === 'started' ) {

				var template = $(result).find( 'supplemental template' ).text();
				$reports.prepend( template );
				HoldOn.close();

			} else {

				var message = $(result).find( 'supplemental message' ).text();
				$reports.find('.notice').show().html( message );
				HoldOn.close();
			}

		});
	}

    /**
     * document ready handling
     */
    $(function() {

		var baseAction = 'jc_headcover_report';
		var renewalsAction = 'jc_headcover_report_renewals';
		var $reports = $('.async-report-vc .reports');

		$('#generate-headcover-report').click( function(e) {

			var nonce = '';
			var data = '';
			e.preventDefault();
			generateReport( nonce, data, baseAction, $reports );

		});

		$('#generate-headcover-report-renewals').click( function(e) {

			var nonce = '';
			var data = '';
			e.preventDefault();
			generateReport( nonce, data, renewalsAction, $reports );

		});

		var redemptionAction = 'jc_headcover_redemption';
		$('#redeem-headcovers').submit( function(e) {

			e.preventDefault();
			var data = $("#redeem-headcovers :input").serialize();
			var nonce = $("#_wpnonce").val();
			redeemCovers( nonce, data, redemptionAction, $reports );

		});

		$('.choices').change( function() {
			var selected = $('input[name="redeem"]:checked').val();

			if ( selected === 'no-preference' ) {
				$('.no-preference').slideDown();
			} else {
				$('.no-preference').slideUp();
			
			}

		});

    });
})( jQuery );