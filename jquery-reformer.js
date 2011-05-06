/*
 * jQuery reFormer
 *
 * Version: 1.0.0
 * Author: Yves Van Broekhoven
 */

(function($){
  
  var _submit
  ,   _handleResponse
  ,   _handleError
  ;
  
  _submit = function(event){
    var ctx = $(this);
    event.preventDefault();
    $.ajax({
      type:     'POST',
      url:      ctx.attr('action'),
      data:     ctx.serialize(),
      success:  function(data){
        _handleResponse(data, ctx);
      },
      error:    _handleError
    });
  };
  
  _handleResponse = function(data, ctx){
    var form = $("#" + ctx[0].id, data).first();
    ctx.replaceWith(form);
  };
  
  _handleError = function(){
    console.log("something went wrong baby");
  };
  
  $.fn.reformer = function(){
    return this.live("submit", _submit);
  };
  
}(jQuery));
