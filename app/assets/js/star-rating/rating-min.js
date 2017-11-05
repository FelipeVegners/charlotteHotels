/* jQuery Star Rating Plugin
 * 
 * @Author
 * Copyright Nov 02 2010, Irfan Durmus - http://irfandurmus.com/
 *
 * @Version
 * 0.3b
 *
 * @License
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Visit the plugin page for more information.
 * http://irfandurmus.com/projects/jquery-star-rating-plugin/
 *
 */
!function($){$.fn.rating=function(t){t=t||function(){},this.each(function(i,n){$(n).data("rating",{callback:t}).bind("init.rating",$.fn.rating.init).bind("set.rating",$.fn.rating.set).bind("hover.rating",$.fn.rating.hover).trigger("init.rating")})},$.extend($.fn.rating,{init:function(t){for(var i=$(this),n="",a=null,e=i.children(),r=0,s=e.length;r<s;r++)n=n+'<a class="star" title="'+$(e[r]).val()+'" />',$(e[r]).is(":checked")&&(a=$(e[r]).val());e.hide(),i.append('<div class="stars">'+n+"</div>").trigger("set.rating",a),$("a",i).bind("click",$.fn.rating.click),i.trigger("hover.rating")},set:function(t,i){var n=$(this),a=$("a",n),e=void 0;i&&(a.removeClass("fullStar"),e=a.filter(function(t){return $(this).attr("title")==i&&$(this)}),e.addClass("fullStar").prevAll().addClass("fullStar"))},hover:function(t){var i=$(this),n=$("a",i);n.bind("mouseenter",function(t){$(this).addClass("tmp_fs").prevAll().addClass("tmp_fs"),$(this).nextAll().addClass("tmp_es")}),n.bind("mouseleave",function(t){$(this).removeClass("tmp_fs").prevAll().removeClass("tmp_fs"),$(this).nextAll().removeClass("tmp_es")})},click:function(t){t.preventDefault();var i=$(t.target),n=i.parent().parent(),a=n.children("input"),e=i.attr("title");matchInput=a.filter(function(t){return $(this).val()==e}),matchInput.prop("checked",!0).siblings("input").prop("checked",!1),n.trigger("set.rating",matchInput.val()).data("rating").callback(e,t)}})}(jQuery);