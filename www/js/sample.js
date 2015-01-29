$(document).ready(function(){
  $('.uib_w_1, .ad_webrtc').hide();

  $('.login .webrtcbutton').click(function(){
    $('.uib_w_2').hide();
    $('.uib_w_1, .ad_webrtc').show();
  });
});
