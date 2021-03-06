/*
 * jQuery ajaxform
 *
 * Version: 1.0.1
 * Author: Yves Van Broekhoven
 */

(function($){
  
  var _submit
  ,   _handleResponse
  ,   _handleError
  ,   _successClb
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
        _successClb(ctx);
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

  _successClb = function(ctx){
    var opts = $.fn.ajaxform.options;
    if ($.isFunction(opts.successClb)) {
      opts.successClb.call();
    }
  };

  $.fn.ajaxform = function(options){
    var _this = $(this);
  
    $.fn.ajaxform.options = options ? $.extend({}, $.fn.ajaxform.defaults, options) : $.fn.ajaxform.defaults;
  
    _this.live("submit", _submit);
  
    return _this;
  };

  $.fn.ajaxform.defaults = {
    successClb: false
  };
  
}(jQuery));

