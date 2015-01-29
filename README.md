WebRTCSDK Video Chat Sample
-------------------------------------------
The WebRTC chat sample is intended to demonstrate the basics of creating a real time video/voice chat app with XDK.

Intel(R) XDK
-------------------------------------------
This sample is part of the Intel(R) XDK. 
Download the Intel XDK at http://software.intel.com/en-us/html5.
To see the technical detail of the sample, please visit the sample article page 
at TBA. 

Intel(R) Collaboration Service for WebRTC
-------------------------------------------
This sample is based on Intel(R) Collaboration Service for WebRTC JavaScript SDK. To see the technical detail of the SDK, please visit https://software.intel.com/sites/landingpage/webrtc.

Application Files
-----------------
* index.html
* LICENSE
* screenshot.png
* js/app.js
* js/init-app.js
* js/init-dev.js
* js/sample.js
* css/index/defaults.less
* css/index/index_main.less
* css/index/styles/ d-margins -- margins.less
* css/index/index.css
* css/index_main.less.css
* css/old-android.css
* css/sample.css
* lib/jquery.min.js
* webrtc/adapter.js
* webrtc/chatwidget.js
* webrtc/gab.proxy.js
* webrtc/gab.websocket.js
* webrtc/init.js
* webrtc/oauth.js
* webrtc/sc.customized.js
* webrtc/sc.yahoo.js
* webrtc/socket.io.js
* webrtc/woogeen.js
* webrtc/woogeen.p2p.js

Usage
------------------
Please replace oauth app ID, consumer key and callback with your own values at line 5 - 7 of webrtc/oauth.js. You can also change these values by app designer.

Third party service
-------------------
The sample depends on Yahoo Messenger, which intend to be an IM system instead of a signaling exchange system. Chat may fail due to network instability. Please read Guidelines for Using the Yahoo Messenger IM SDK(https://developer.yahoo.com/messenger/guide/ch06s02.html) carefully before using it.

Limitation
-------------------
This sample depends on WebRTC. And it should be build with Crosswalk. iOS and Windows Phone is not supported yet.



Copyright (c) 2014, Intel Corporation. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, 
are permitted provided that the following conditions are met:

- Redistributions of source code must retain the above copyright notice, 
  this list of conditions and the following disclaimer.

- Redistributions in binary form must reproduce the above copyright notice, 
  this list of conditions and the following disclaimer in the documentation 
  and/or other materials provided with the distribution.

- Neither the name of Intel Corporation nor the names of its contributors 
  may be used to endorse or promote products derived from this software 
  without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" 
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, 
THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE 
ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE 
LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR 
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE 
GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) 
HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT 
LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT 
OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
