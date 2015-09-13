/* globals React */
'use strict';

var Index = React.createClass({

  authenticateEmployee: function() {
    $.ajax({
      type: 'POST',
      url: game.saveURL,
      dataType: 'json',
      headers: {
        'X-HTTP-Method-Override': 'PUT'
      },
      data: {
        id: game.id,
        state: gameState
      },
      success: function(response) {
        this.setAlert(game.title + response.message);
      }.bind(this),
      error: function(jqXHR, textStatus, errorThrown) {
        this.setAlert(game.title + ' save failed!');
      }.bind(this)
    });
  },
  render: function() {
    return <div />;
  }
});
