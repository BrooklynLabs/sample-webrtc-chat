var Woogeen=Woogeen||{};
Woogeen.EventDispatcher=function(f){var c={};f.dispatcher={};f.dispatcher.eventListeners={};c.addEventListener=function(c,e){void 0===f.dispatcher.eventListeners[c]&&(f.dispatcher.eventListeners[c]=[]);f.dispatcher.eventListeners[c].push(e)};c.removeEventListener=function(c,e){var i;i=f.dispatcher.eventListeners[c].indexOf(e);-1!==i&&f.dispatcher.eventListeners[c].splice(i,1)};c.dispatchEvent=function(c){for(var e in f.dispatcher.eventListeners[c.type])if(f.dispatcher.eventListeners[c.type].hasOwnProperty(e))f.dispatcher.eventListeners[c.type][e](c)};return c};
Woogeen.WoogeenEvent=function(f){var c={};c.type=f.type;return c};Woogeen.RoomEvent=function(f){var c=Woogeen.WoogeenEvent(f);c.streams=f.streams;return c};Woogeen.StreamEvent=function(f){var c=Woogeen.WoogeenEvent(f);c.stream=f.stream;c.msg=f.msg;return c};Woogeen.PublisherEvent=function(f){return Woogeen.WoogeenEvent(f)};Woogeen.ServerEvent=function(f){return Woogeen.WoogeenEvent(f)};Woogeen.ChatEvent=function(f){var c=Woogeen.WoogeenEvent(f);c.senderId=f.senderId;c.peerId=f.peerId;return c};
Woogeen.DataEvent=function(f){var c=Woogeen.WoogeenEvent(f);f.data&&(c.data=f.data);f.senderId&&(c.senderId=f.senderId);f.peerId&&(c.peerId=f.peerId);return c};Woogeen.RecorderEvent=function(f){var c=Woogeen.WoogeenEvent(f);f.audio&&(c.audio=f.audio);return c};Woogeen=Woogeen||{};
Woogeen.Error={STREAM_LOCAL_ACCESS_DENIED:{code:1101,message:"Cannot access to camera or micphone."},P2P_CONN_SERVER_UNKNOWN:{code:2100,message:"Server unknown error."},P2P_CONN_SERVER_UNAVAILABLE:{code:2101,message:"Server is unavaliable."},P2P_CONN_SERVER_BUSY:{code:2102,message:"Server is too busy."},P2P_CONN_SERVER_NOT_SUPPORTED:{code:2103,message:"Method has not been supported by server"},P2P_CONN_CLIENT_UNKNOWN:{code:2110,message:"Client unknown error."},P2P_CONN_CLIENT_NOT_INITIALIZED:{code:2111,message:"Connection is not initialized."},
P2P_CONN_AUTH_UNKNOWN:{code:2120,message:"Authentication unknown error."},P2P_CONN_AUTH_FAILED:{code:2121,message:"Wrong username or token."},P2P_MESSAGING_TARGET_UNREACHABLE:{code:2201,message:"Remote user cannot be reached."},P2P_CHATROOM_ATTENDEE_EXCEED:{code:2301,message:"Exceed room's limitation"},P2P_CHATROOM_PEER_NOT_FOUND:{code:2302,message:"Peer not found. Only one client in the room."},P2P_CLIENT_UNKNOWN:{code:2400,message:"Unknown errors."},P2P_CLIENT_UNSUPPORTED_METHOD:{code:2401,message:"This method is unsupported in current browser."},
P2P_CLIENT_ILLEGAL_ARGUMENT:{code:2402,message:"Illegal argument."},P2P_CLIENT_INVALID_STATE:{code:2403,message:"Invalid peer state."},getErrorByCode:function(f){return{1101:Woogeen.Error.STREAM_LOCAL_ACCESS_DENIED,2100:Woogeen.Error.P2P_CONN_SERVER_UNKNOWN,2101:Woogeen.Error.P2P_CONN_SERVER_UNAVAILABLE,2102:Woogeen.Error.P2P_CONN_SERVER_BUSY,2103:Woogeen.Error.P2P_CONN_SERVER_NOT_SUPPORTED,2110:Woogeen.Error.P2P_CONN_CLIENT_UNKNOWN,2111:Woogeen.Error.P2P_CONN_CLIENT_NOT_INITIALIZED,2120:Woogeen.Error.P2P_CONN_AUTH_UNKNOWN,
2121:Woogeen.Error.P2P_CONN_AUTH_FAILED,2201:Woogeen.Error.P2P_MESSAGING_TARGET_UNREACHABLE,2301:Woogeen.Error.P2P_CHATROOM_ATTENDEE_EXCEED,2302:Woogeen.Error.P2P_CHATROOM_PEER_NOT_FOUND,2400:Woogeen.Error.P2P_CLIENT_UNKNOWN,2401:Woogeen.Error.P2P_CLIENT_UNSUPPORTED_METHOD,2402:Woogeen.Error.P2P_CLIENT_ILLEGAL_ARGUMENT,2403:Woogeen.Error.P2P_CLIENT_INVALID_STATE}[f]}};Woogeen=Woogeen||{};
Woogeen.PeerClient=function(f){var c=Woogeen.EventDispatcher({}),g=null,e={},i={},h={},j=null,G={optional:[{DtlsSrtpKeyAgreement:"true"}]},p=null;f&&(p={},f.iceServers&&(p.iceServers=function(a){for(var b=[],d=0;d<a.length;d++){var c=a[d];if("[object Array]"===Object.prototype.toString.call(c.urls))for(var e=0;e<c.urls.length;e++)b.push({url:c.urls[e],username:c.username,credential:c.credential});else b.push({url:c.urls,username:c.username,credential:c.credential})}return b}(f.iceServers)));var n=
function(a){var b;b=null;try{b=q(a)}catch(d){}if(b=b&&b.host&&b.id?b:null){a=b.id;a=h[a]?h[a].peer:void 0;return a?a.id:null}return a},k=function(a,b){if(a.state==6||a.state==5){a.sendDataChannel&&a.sendDataChannel.close();a.receiveDataChannel&&a.receiveDataChannel.close();a.connection&&a.connection.iceConnectionState!=="closed"&&a.connection.close();if(a.state!==1){a.state=1;c.dispatchEvent(Woogeen.ChatEvent({type:"chat-stopped",peerId:a.id,senderId:b}))}}},H=function(){c.dispatchEvent(Woogeen.ServerEvent({type:"server-connected"}))},
I=function(){for(var a in e){k(e[a],j);delete e[a]}c.dispatchEvent(Woogeen.ServerEvent({type:"server-disconnected"}))},J=function(a){var b=e[a];if(!b){m(a);b=e[a]}if(b.state===1||b.state===4){e[a].state=4;c.dispatchEvent(Woogeen.ChatEvent({type:"chat-invited",senderId:a}))}else if(b.state===3&&j.localeCompare(a)<0){b.state=4;t(a,function(){c.dispatchEvent(Woogeen.ChatEvent({type:"chat-accepted",senderId:a}))})}},K=function(a){var b=e[a];if(b&&b.connection){b.sendDataChannel&&b.sendDataChannel.close();
b.receiveDataChannel&&b.receiveDataChannel.close();b.connection.close();delete e[a]}c.dispatchEvent(Woogeen.ChatEvent({type:"chat-denied",senderId:a}))},L=function(a){Woogeen.Logger.debug("Received chat accepted.");var b=e[a];if(b){b.state=2;r(null,a);c.dispatchEvent(Woogeen.ChatEvent({type:"chat-accepted",senderId:a}))}},M=function(a){var b=e[a];if(b&&b.connection){k(b,a);delete e[a]}},P=function(a,b){var d=e[a];d&&d.state===5&&(d.connection||o(d));Woogeen.Logger.debug("S->C: "+JSON.stringify(b));
if(b.type==="offer")N(d,{message:b});else if(b.type==="answer")O(d,{message:b});else if(b.type==="candidate"){d&&Woogeen.Logger.debug("On remote ice candidate from peer "+d.id);if(d&&(d.state===3||d.state===5||d.state===6)){var c=new RTCIceCandidate({candidate:b.candidate,sdpMid:b.sdpMid,sdpMLineIndex:b.sdpMLineIndex});if(d.connection){Woogeen.Logger.debug("Add remote ice candidates.");d.connection.addIceCandidate(c,u,v)}else{Woogeen.Logger.debug("Cache remote ice candidates.");d.remoteIceCandidates?
d.remoteIceCandidates=[]:d.remoteIceCandidates.push(c)}}}},Q=function(a,b){i[b.streamId]=b.type;Woogeen.Logger.debug("remote stream label:"+b.streamId+",type:"+i[b.streamId])},R=function(a,b,d){e[a]||m(a);var l=e[a];if(l.state===1&&o(l)){l.state=2;l.roomId=b;h[room.id]={peer:l};c.dispatchEvent(Woogeen.ChatEvent({type:"chat-ready",roomId:b,peerId:a}))}d&&r(null,a)},S=function(){c.dispatchEvent(Woogeen.ChatEvent({type:"chat-wait"}))},T=function(a){j=a},N=function(a,b){if(a)switch(a.state){case 3:case 2:a.state=
5;o(a);case 5:case 6:a.connection.setRemoteDescription(new RTCSessionDescription(b.message),function(){U(a);w(a)},function(a){Woogeen.Logger.debug("Set remote description failed. Message: "+JSON.stringify(a))});break;default:Woogeen.Logger.debug("Unexpected peer state: "+a.state)}else Woogeen.Logger.debug('"peer" cannot be null or undefined')},O=function(a,b){a&&(a.state===5||a.state===6)&&a.connection.setRemoteDescription(new RTCSessionDescription(b.message),function(){Woogeen.Logger.debug("Set remote descripiton successfully.");
w(a);x(a)},function(a){Woogeen.Logger.debug("Set remote description failed. Message: "+a)})},u=function(){Woogeen.Logger.debug("Add ice candidate success.")},v=function(a){Woogeen.Logger.debug("Add ice candidate failed. Error: "+a)},o=function(a){if(!a||a.connection)return true;try{a.connection=new RTCPeerConnection(p,G);a.connection.onicecandidate=function(b){b.candidate&&g.sendSignalMessage(a.id,{type:"candidate",candidate:b.candidate.candidate,sdpMid:b.candidate.sdpMid,sdpMLineIndex:b.candidate.sdpMLineIndex})};
a.connection.onaddstream=function(a){Woogeen.Logger.debug("Remote stream added.");a=Woogeen.StreamEvent({type:"stream-subscribed",stream:{stream:a.stream,type:i[a.stream.label]||"video"}});c.dispatchEvent(a)};a.connection.onremovestream=function(){Woogeen.Logger.debug("Remote stream removed.");var a=Woogeen.StreamEvent({type:"stream-removed"});c.dispatchEvent(a)};a.connection.oniceconnectionstatechange=function(){if(a){Woogeen.Logger.debug("Ice connection state changed. State: "+a.connection.iceConnectionState);
if(a.connection.iceConnectionState==="closed"&&a.state===6){k(a,a.id);g.sendChatStopped(a.id);delete e[a.id]}if(a.connection.iceConnectionState==="connected"&&a.state!==6){a.state=6;c.dispatchEvent(Woogeen.ChatEvent({type:"chat-started",peerId:a.id}))}if(a.connection.iceConnectionState==="completed"&&a.state!==6){a.state=6;c.dispatchEvent(Woogeen.ChatEvent({type:"chat-started",peerId:a.id}))}}};a.connection.onnegotiationneeded=function(){Woogeen.Logger.debug("On negotiation needed.");if(!a.isNegotiationNeeded){a.isNegotiationNeeded=
true;g.sendNegotiationNeeded(a.id)}};a.connection.onsignalingstatechange=function(){if(a.connection.signalingState==="closed"){k(a,a.id);delete e[a.id]}else if(a.connection.signalingState==="stable"&&a.isRemoteNegotiationNeeded){g.sendNegotiationAccepted(a.id);a.isRemoteNegotiationNeeded=false}};a.connection.ondatachannel=function(b){Woogeen.Logger.debug(j+": On data channel");if(!a.dataChannels[b.channel.label]){a.dataChannels[b.channel.label]=b.channel;Woogeen.Logger.debug("Save remote created data channel.")}y(b.channel,
a)}}catch(b){Woogeen.Logger.debug("Failed to create PeerConnection, exception: "+b.message);return false}return true},y=function(a,b){a.onmessage=function(a){a=Woogeen.DataEvent({type:"data-received",senderId:b.id,data:a.data});c.dispatchEvent(a)};a.onopen=function(a){Woogeen.Logger.debug("Data Channel is opened");var e=Woogeen.DataEvent({type:"data-opened",senderId:b.id});c.dispatchEvent(e);if(a.target.label=="message"){Woogeen.Logger.debug("Data channel for messages is opened.");x(b)}};a.onclose=
function(){Woogeen.Logger.debug("Data Channel is closed")};a.onerror=function(a){Woogeen.Logger.debug("Data Channel Error:",a)}},A=function(a,b){b||(b="message");z(n(a),b)},z=function(a,b){var d=e[a];if(d&&!d.dataChannels[b]){Woogeen.Logger.debug("Do create data channel.");try{var c=d.connection.createDataChannel(b,null);y(c,d);d.dataChannels.message=c}catch(f){Woogeen.Logger.debug("Failed to create SendDataChannel, exception: "+f.message)}}},m=function(a){e[a]||(e[a]={state:1,id:a,pendingStreams:[],
pendingUnpublishStreams:[],remoteIceCandidates:[],dataChannels:{},pendingMessages:[]});return e[a]},q=function(a){return room=JSON.parse(a)},V=function(a){var b=e[a];if(b)b.isNegotiationNeeded&&j.localeCompare(a)<0&&b.connection.signalingState==="stable"?b.isRemoteNegotiationNeeded=true:g.sendNegotiationAccepted(a)},W=function(a){if(a=e[a]){B(a);a.isNegotiationNeeded=false}},t=function(a,b,d){g||d(Woogeen.Error.P2P_CONN_CLIENT_NOT_INITIALIZED);e[a]||m(a);var c=e[a];if(c.state===4){c.state=2;g.sendChatAccepted(a,
b,function(a){c.state=4;d(Woogeen.Error.getErrorByCode(a))})}else{Woogeen.Logger.debug("Invalid state. Will not send acceptance.");d(Woogeen.Error.P2P_CLIENT_INVALID_STATE)}},B=function(a){if(a.connection){s(a);a.pendingMessages.length&&z(a);navigator.mozGetUserMedia&&!a.pendingStreams.length&&!a.connection.getLocalStreams().length&&A(a.id);a.connection.createOffer(function(b){b.sdp=C(b.sdp);a.connection.setLocalDescription(b,function(){Woogeen.Logger.debug("Set local descripiton successfully.");
g.sendSignalMessage(a.id,b)},function(a){Woogeen.Logger.debug("Set local description failed. Message: "+JSON.stringify(a))})},function(a){Woogeen.Logger.debug("Create offer failed. Error info: "+JSON.stringify(a))})}else Woogeen.Logger.error("Peer connection have not been created.")},w=function(a){if(a&&a.connection&&a.remoteIceCandidates&&a.remoteIceCandidates.length!==0){for(var b=0;b<a.remoteIceCandidates.length;b++){Woogeen.Logger.debug("remoteIce, length:"+remoteIceCandidates.length+", current:"+
b);(a.state===6||a.state===5)&&a.connection.addIceCandidate(remoteIceCandidates[b],u,v)}a.remoteIceCandidates=[]}},s=function(a){Woogeen.Logger.debug("Draining pending streams.");if(a.connection){Woogeen.Logger.debug("Peer connection is ready for draining pending streams.");for(var b=0;b<a.pendingStreams.length;b++){D(a.pendingStreams[b],a);Woogeen.Logger.debug("Sent stream type.");a.connection.addStream(a.pendingStreams[b].stream);Woogeen.Logger.debug("Added stream to peer connection.")}a.pendingStreams=
[];for(b=0;b<a.pendingUnpublishStreams.length;b++){a.connection.removeStream(a.pendingUnpublishStreams[b].stream);Woogeen.Logger.debug("Remove stream.")}a.pendingUnpublishStreams=[]}},x=function(a){Woogeen.Logger.debug("Draining pendding messages.");var b=a.dataChannels.message;if(b&&b.readyState==="open"){for(var d=0;d<a.pendingMessages.length;d++)b.send(a.pendingMessages[d]);a.pendingMessages=[]}},U=function(a){a.connection?a.connection.createAnswer(function(b){b.sdp=C(b.sdp);a.connection.setLocalDescription(b,
function(){Woogeen.Logger.debug("Set local description successfully.");g.sendSignalMessage(a.id,b);Woogeen.Logger.debug("Sent answer.")},function(a){Woogeen.Logger.error("Error occurred while setting local description. Error message:"+a)})},function(a){Woogeen.Logger.error("Create answer failed. Message: "+a)}):Woogeen.Logger.error("Peer connection have not been created.")},r=function(a,b,d,c){b=n(b);Woogeen.Logger.debug("Publish to: "+b);if(b){e[b]||m(b);b=e[b];Object.prototype.toString.call(a)===
"[object Array]"?b.pendingStreams.concat(a):a&&b.pendingStreams.push(a);switch(b.state){case 2:case 4:o(b);b.state=5;b.pendingStreams.length===0&&B(b);case 5:case 6:b.pendingStreams.length>0&&s(b);break;default:Woogeen.Logger.debug("Unexpected peer state: "+b.state);c&&c(Woogeen.Error.P2P_CLIENT_INVALID_STATE);return}d&&d()}else c&&c(Woogeen.Error.P2P_CHATROOM_PEER_NOT_FOUND)},D=function(a,b){if(a!==null){var d="audio";a.hasVideo()?d="video":a.hasScreen()&&(d="screen");g.sendStreamType(b.id,{streamId:a.stream.label,
type:d})}},E=function(a,b,d){if(g){if(a){d=e[a];if(!d)return;g.sendChatStopped(d.id);k(d,j);delete e[a]}else for(var c in e){d=e[c];g.sendChatStopped(d.id);k(d,j);delete e[d.id]}b&&b()}else d&&d(Woogeen.Error.P2P_CONN_CLIENT_NOT_INITIALIZED)},F=function(a,b,d){var c=h[a];if(c){E(c.peer.id);if(!g){d&&d(Woogeen.Error.P2P_CONN_CLIENT_NOT_INITIALIZED);return}g.sendLeaveRoom(a);delete h[a]}b&&b()},C=function(a){var b=/video \d*? RTP\/SAVPF( \d*?)* 96/ig,d=a.match(b);if(d&&d.length){d[0]=d[0].replace(" 96",
"");a=a.replace(b,d[0]);a=a.replace(/a=rtpmap:96 rtx\/90000\r\n/ig,"");a=a.replace(/a=fmtp:96 apt=100\r\n/ig,"")}return a};c.connect=function(a,b,d){g=new Gab(a,b,d);g.onConnected=H;g.onDisconnected=I;g.onChatStopped=M;g.onChatAccepted=L;g.onChatDenied=K;g.onChatInvitation=J;g.onChatSignal=P;g.onStreamType=Q;g.onNegotiationNeeded=V;g.onNegotiationAccepted=W;g.onChatWait=S;g.onChatReady=R;g.onAuthenticated=T};c.disconnect=function(){g&&g.finalize();g=null};c.invite=function(a,b,d){if(g){e[a]||m(a);
var c=e[a];if(c.state===1){Woogeen.Logger.debug("Send invitation to "+a);c.state=3;g.sendChatInvitation(a,function(){b&&b()},function(a){c.state=1;d(Woogeen.Error.getErrorByCode(a))})}else{Woogeen.Logger.debug("Invalid state. Will not send invitation.");d(Woogeen.Error.P2P_CLIENT_INVALID_STATE)}}else d(new Woogeen.Error.P2P_CONN_CLIENT_NOT_INITIALIZED)};c.publish=function(a,b,c,e){!a||!b?e&&e(Woogeen.Error.P2P_CLIENT_ILLEGAL_ARGUMENT):r(a,b,c,e)};c.unpublish=function(a,b,c,f){Woogeen.Logger.debug("Unpublish stream.");
if(b=n(b)){if(e[b]){b=e[b];b.pendingUnpublishStreams.push(a);b.state===6&&s(b);c&&c()}}else f&&f(Woogeen.Error.P2P_CHATROOM_PEER_NOT_FOUND)};c.deny=function(a,b,c){if(e[a]&&e[a].state===4)if(g){g.sendChatDenied(a,b,function(a){c&&c(Woogeen.Error.getErrorByCode(a))});delete e[a]}else c(Woogeen.Error.P2P_CONN_CLIENT_NOT_INITIALIZED)};c.accept=t;c.stop=E;c.joinRoom=function(a,b,c){a=q(a);h[a.id]||(g?g.sendJoinRoom(a.id,b,function(a){c&&c(Woogeen.Error.getErrorByCode(a))}):c&&c(Woogeen.Error.P2P_CONN_CLIENT_NOT_INITIALIZED))};
c.leaveRoom=function(a,b,c){if(a){room=q(a);F(room.id,b,c)}else for(var e in h)F(h[e],b,c)};c.sendData=function(a,b,c){var b=n(b),f=e[b];if(f){var g=f.dataChannels.message;if(g&&g.readyState==="open")g.send(a);else{f.pendingMessages.push(a);A(b)}}c&&c()};c.switchStream=function(a,b,c,f){c=e[c];a!==null&&c.connection.removeStream(a.stream);D(b,c);c.connection.addStream(b.stream);f&&f()};return c};
