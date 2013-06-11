define(['jquery', 'uri', 'base/ui'],
  function ($, URI, UI ) {
  'use strict';

  var makeURL,
      page,
      make,
      setup = {};

  function getTags( tagList ) {
    var tag,
        obj = {};

    if ( !tagList ) {
      return obj;
    }

    for ( var i = 0; i < tagList.length; i++ ) {
      tag = tagList[ i ].split( ":" );
      if ( tag.length === 2 ) {
        obj[ tag[ 0 ] ] = tag[ 1 ];
      } else {
        obj[ tag[ 0 ] ] = true;
      }
    }
    return obj;
  }

  setup.template = function() {
    $( ".ui-code" ).each( function( i, el ) {
      var html = el.innerHTML;
      $( el ).text( html );
    });
    UI.select( '#select-test', function( val ) {
      console.log( val );
    });
  };

  setup.page = function( page ) {
    if ( setup[ page ] ) {
      setup[ page ]();
    }
  };

  var self = {
    init: function( options ) {
      makeURL = options.makeURL;
      page = options.page;
      make = new Make({ apiURL: makeURL });
      setup.page( page );
    },
    doSearch: function( options, limit, callback, pageNo ) {
      var sortBy = 'createdAt',
          sortOrder = 'desc';

      options = options || {};

      if (options.title) {
        sortBy = 'title';
        sortOrder = 'asc';
      }

      make
      .find( options )
      .limit( limit )
      .page ( pageNo || 1 )
      .sortByField( sortBy, sortOrder )
      .then( callback );
    }
  };

  return self;
});
