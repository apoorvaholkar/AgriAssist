(self.webpackChunkBhoomi=self.webpackChunkBhoomi||[]).push([[830],{6829:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>d});var r=n(2791),i=n(2903),o=n(1425),a=n.n(o);const s=n.p+"static/media/wheat.a846d34bf6475df655ed.jpg",c=n.p+"static/media/rice.d5089c826991e38a46d4.jpg",u=n.p+"static/media/barley.34b8a716b92261a54269.jpg",l=n.p+"static/media/maize.285951b32208c503a986.jpg",f=n.p+"static/media/croprec.7a6d453bbc33aa7c6eab.avif";var h=n(4022),p=n(184);const d=()=>{const[t,e]=(0,r.useState)({soil_ph:"",soil_moisture:"",temperature:"",rainfall:"",humidity:""}),[n,o]=(0,r.useState)(""),[d,v]=(0,r.useState)(!1),[b,y]=(0,r.useState)(""),[m,g]=(0,r.useState)(f),[O,w]=(0,r.useState)(!1),x=n=>{e({...t,[n.target.name]:n.target.value})};return(0,p.jsxs)("div",{className:"crop-recommendation-container",children:[(0,p.jsx)("div",{className:"confetti-container",children:O&&(0,p.jsx)(a(),{numberOfPieces:400,gravity:.2,wind:.01,recycle:!1})}),(0,p.jsx)("h1",{className:"crhp1",children:"Crop Recommendation System"}),(0,p.jsxs)("div",{className:"form-and-result-container",children:[(0,p.jsxs)("form",{className:"recommendation-form",onSubmit:async e=>{e.preventDefault(),v(!0),y(""),w(!1);try{const e=await i.Z.post("http://127.0.0.1:5000/recommend",t);switch(o(e.data.recommended_crop),e.data.recommended_crop){case"Wheat":g(s);break;case"Rice":g(c);break;case"Barley":g(u);break;case"Maize":g(l);break;case"Sugarcane":g(h);break;default:g(f)}w(!0),setTimeout((()=>w(!1)),3e3)}catch(b){y("Error fetching recommendation. Please try again.")}finally{v(!1)}},children:[(0,p.jsxs)("label",{children:["Soil pH:",(0,p.jsx)("input",{className:"crop-input",type:"number",name:"soil_ph",value:t.soil_ph,onChange:x})]}),(0,p.jsx)("br",{}),(0,p.jsxs)("label",{children:["Soil Moisture:",(0,p.jsx)("input",{className:"crop-input",type:"number",name:"soil_moisture",value:t.soil_moisture,onChange:x})]}),(0,p.jsx)("br",{}),(0,p.jsxs)("label",{children:["Temperature:",(0,p.jsx)("input",{className:"crop-input",type:"number",name:"temperature",value:t.temperature,onChange:x})]}),(0,p.jsx)("br",{}),(0,p.jsxs)("label",{children:["Rainfall:",(0,p.jsx)("input",{className:"crop-input",type:"number",name:"rainfall",value:t.rainfall,onChange:x})]}),(0,p.jsx)("br",{}),(0,p.jsxs)("label",{children:["Humidity:",(0,p.jsx)("input",{className:"crop-input",type:"number",name:"humidity",value:t.humidity,onChange:x})]}),(0,p.jsx)("br",{}),(0,p.jsxs)("div",{style:{display:"flex"},children:[(0,p.jsx)("button",{className:"recommendsubmit",type:"submit",disabled:d,children:"Get Recommendation"}),(0,p.jsx)("button",{className:"clear-button",type:"button",onClick:()=>{e({soil_ph:"",soil_moisture:"",temperature:"",rainfall:"",humidity:""}),o(""),y(""),g(f),w(!1)},children:"Clear"})]})]}),(0,p.jsxs)("div",{className:"result-container",children:[(0,p.jsx)("h2",{children:n?"Recommended Crop: ".concat(n):""}),(0,p.jsx)("img",{src:m,alt:n||"placeholder",className:"crop-image"})]})]}),d&&(0,p.jsx)("p",{children:"Loading..."}),b&&(0,p.jsx)("p",{className:"error-message",children:b})]})}},1425:function(t,e,n){var r;"undefined"!=typeof self&&self,t.exports=(r=n(2791),function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=2)}([function(t,e){t.exports=r},function(t,e,n){"use strict";var r={linear:function(t,e,n,r){return(n-e)*t/r+e},easeInQuad:function(t,e,n,r){return(n-e)*(t/=r)*t+e},easeOutQuad:function(t,e,n,r){return-(n-e)*(t/=r)*(t-2)+e},easeInOutQuad:function(t,e,n,r){var i=n-e;return(t/=r/2)<1?i/2*t*t+e:-i/2*(--t*(t-2)-1)+e},easeInCubic:function(t,e,n,r){return(n-e)*(t/=r)*t*t+e},easeOutCubic:function(t,e,n,r){return(n-e)*((t=t/r-1)*t*t+1)+e},easeInOutCubic:function(t,e,n,r){var i=n-e;return(t/=r/2)<1?i/2*t*t*t+e:i/2*((t-=2)*t*t+2)+e},easeInQuart:function(t,e,n,r){return(n-e)*(t/=r)*t*t*t+e},easeOutQuart:function(t,e,n,r){return-(n-e)*((t=t/r-1)*t*t*t-1)+e},easeInOutQuart:function(t,e,n,r){var i=n-e;return(t/=r/2)<1?i/2*t*t*t*t+e:-i/2*((t-=2)*t*t*t-2)+e},easeInQuint:function(t,e,n,r){return(n-e)*(t/=r)*t*t*t*t+e},easeOutQuint:function(t,e,n,r){return(n-e)*((t=t/r-1)*t*t*t*t+1)+e},easeInOutQuint:function(t,e,n,r){var i=n-e;return(t/=r/2)<1?i/2*t*t*t*t*t+e:i/2*((t-=2)*t*t*t*t+2)+e},easeInSine:function(t,e,n,r){var i=n-e;return-i*Math.cos(t/r*(Math.PI/2))+i+e},easeOutSine:function(t,e,n,r){return(n-e)*Math.sin(t/r*(Math.PI/2))+e},easeInOutSine:function(t,e,n,r){return-(n-e)/2*(Math.cos(Math.PI*t/r)-1)+e},easeInExpo:function(t,e,n,r){return 0==t?e:(n-e)*Math.pow(2,10*(t/r-1))+e},easeOutExpo:function(t,e,n,r){var i=n-e;return t==r?e+i:i*(1-Math.pow(2,-10*t/r))+e},easeInOutExpo:function(t,e,n,r){var i=n-e;return 0===t?e:t===r?e+i:(t/=r/2)<1?i/2*Math.pow(2,10*(t-1))+e:i/2*(2-Math.pow(2,-10*--t))+e},easeInCirc:function(t,e,n,r){return-(n-e)*(Math.sqrt(1-(t/=r)*t)-1)+e},easeOutCirc:function(t,e,n,r){return(n-e)*Math.sqrt(1-(t=t/r-1)*t)+e},easeInOutCirc:function(t,e,n,r){var i=n-e;return(t/=r/2)<1?-i/2*(Math.sqrt(1-t*t)-1)+e:i/2*(Math.sqrt(1-(t-=2)*t)+1)+e},easeInElastic:function(t,e,n,r){var i,o,a,s=n-e;return a=1.70158,0===t?e:1==(t/=r)?e+s:((o=0)||(o=.3*r),(i=s)<Math.abs(s)?(i=s,a=o/4):a=o/(2*Math.PI)*Math.asin(s/i),-i*Math.pow(2,10*(t-=1))*Math.sin((t*r-a)*(2*Math.PI)/o)+e)},easeOutElastic:function(t,e,n,r){var i,o,a,s=n-e;return a=1.70158,0===t?e:1==(t/=r)?e+s:((o=0)||(o=.3*r),(i=s)<Math.abs(s)?(i=s,a=o/4):a=o/(2*Math.PI)*Math.asin(s/i),i*Math.pow(2,-10*t)*Math.sin((t*r-a)*(2*Math.PI)/o)+s+e)},easeInOutElastic:function(t,e,n,r){var i,o,a,s=n-e;return a=1.70158,0===t?e:2==(t/=r/2)?e+s:((o=0)||(o=r*(.3*1.5)),(i=s)<Math.abs(s)?(i=s,a=o/4):a=o/(2*Math.PI)*Math.asin(s/i),t<1?i*Math.pow(2,10*(t-=1))*Math.sin((t*r-a)*(2*Math.PI)/o)*-.5+e:i*Math.pow(2,-10*(t-=1))*Math.sin((t*r-a)*(2*Math.PI)/o)*.5+s+e)},easeInBack:function(t,e,n,r,i){return void 0===i&&(i=1.70158),(n-e)*(t/=r)*t*((i+1)*t-i)+e},easeOutBack:function(t,e,n,r,i){return void 0===i&&(i=1.70158),(n-e)*((t=t/r-1)*t*((i+1)*t+i)+1)+e},easeInOutBack:function(t,e,n,r,i){var o=n-e;return void 0===i&&(i=1.70158),(t/=r/2)<1?o/2*(t*t*((1+(i*=1.525))*t-i))+e:o/2*((t-=2)*t*((1+(i*=1.525))*t+i)+2)+e},easeInBounce:function(t,e,n,i){var o=n-e;return o-r.easeOutBounce(i-t,0,o,i)+e},easeOutBounce:function(t,e,n,r){var i=n-e;return(t/=r)<1/2.75?i*(7.5625*t*t)+e:t<2/2.75?i*(7.5625*(t-=1.5/2.75)*t+.75)+e:t<2.5/2.75?i*(7.5625*(t-=2.25/2.75)*t+.9375)+e:i*(7.5625*(t-=2.625/2.75)*t+.984375)+e},easeInOutBounce:function(t,e,n,i){var o=n-e;return t<i/2?.5*r.easeInBounce(2*t,0,o,i)+e:.5*r.easeOutBounce(2*t-i,0,o,i)+.5*o+e}};t.exports=r},function(t,e,n){t.exports=n(3)},function(t,e,n){"use strict";n.r(e),n.d(e,"ReactConfetti",(function(){return q}));var r,i,o=n(0),a=n.n(o),s=n(1),c=n.n(s);function u(t,e){return t+Math.random()*(e-t)}function l(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function f(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}!function(t){t[t.Circle=0]="Circle",t[t.Square=1]="Square",t[t.Strip=2]="Strip"}(r||(r={})),function(t){t[t.Positive=1]="Positive",t[t.Negative=-1]="Negative"}(i||(i={}));var h=function(){function t(e,n,r,o){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),f(this,"context",void 0),f(this,"radius",void 0),f(this,"x",void 0),f(this,"y",void 0),f(this,"w",void 0),f(this,"h",void 0),f(this,"vx",void 0),f(this,"vy",void 0),f(this,"shape",void 0),f(this,"angle",void 0),f(this,"angularSpin",void 0),f(this,"color",void 0),f(this,"rotateY",void 0),f(this,"rotationDirection",void 0),f(this,"getOptions",void 0),this.getOptions=n;var a,s,c=this.getOptions(),l=c.colors,h=c.initialVelocityX,p=c.initialVelocityY;this.context=e,this.x=r,this.y=o,this.w=u(5,20),this.h=u(5,20),this.radius=u(5,10),this.vx="number"==typeof h?u(-h,h):u(h.min,h.max),this.vy="number"==typeof p?u(-p,0):u(p.min,p.max),this.shape=(a=0,s=2,Math.floor(a+Math.random()*(s-a+1))),this.angle=u(0,360)*Math.PI/180,this.angularSpin=u(-.2,.2),this.color=l[Math.floor(Math.random()*l.length)],this.rotateY=u(0,1),this.rotationDirection=u(0,1)?i.Positive:i.Negative}var e,n,o;return e=t,(n=[{key:"update",value:function(){var t=this.getOptions(),e=t.gravity,n=t.wind,o=t.friction,a=t.opacity,s=t.drawShape;this.x+=this.vx,this.y+=this.vy,this.vy+=e,this.vx+=n,this.vx*=o,this.vy*=o,this.rotateY>=1&&this.rotationDirection===i.Positive?this.rotationDirection=i.Negative:this.rotateY<=-1&&this.rotationDirection===i.Negative&&(this.rotationDirection=i.Positive);var c=.1*this.rotationDirection;if(this.rotateY+=c,this.angle+=this.angularSpin,this.context.save(),this.context.translate(this.x,this.y),this.context.rotate(this.angle),this.context.scale(1,this.rotateY),this.context.rotate(this.angle),this.context.beginPath(),this.context.fillStyle=this.color,this.context.strokeStyle=this.color,this.context.globalAlpha=a,this.context.lineCap="round",this.context.lineWidth=2,s&&"function"==typeof s)s.call(this,this.context);else switch(this.shape){case r.Circle:this.context.beginPath(),this.context.arc(0,0,this.radius,0,2*Math.PI),this.context.fill();break;case r.Square:this.context.fillRect(-this.w/2,-this.h/2,this.w,this.h);break;case r.Strip:this.context.fillRect(-this.w/6,-this.h/2,this.w/3,this.h)}this.context.closePath(),this.context.restore()}}])&&l(e.prototype,n),o&&l(e,o),t}();function p(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var d=function t(e,n){var r=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),p(this,"canvas",void 0),p(this,"context",void 0),p(this,"getOptions",void 0),p(this,"x",0),p(this,"y",0),p(this,"w",0),p(this,"h",0),p(this,"lastNumberOfPieces",0),p(this,"tweenInitTime",Date.now()),p(this,"particles",[]),p(this,"particlesGenerated",0),p(this,"removeParticleAt",(function(t){r.particles.splice(t,1)})),p(this,"getParticle",(function(){var t=u(r.x,r.w+r.x),e=u(r.y,r.h+r.y);return new h(r.context,r.getOptions,t,e)})),p(this,"animate",(function(){var t=r.canvas,e=r.context,n=r.particlesGenerated,i=r.lastNumberOfPieces,o=r.getOptions(),a=o.run,s=o.recycle,c=o.numberOfPieces,u=o.debug,l=o.tweenFunction,f=o.tweenDuration;if(!a)return!1;var h=r.particles.length,p=s?h:n,d=Date.now();if(p<c){i!==c&&(r.tweenInitTime=d,r.lastNumberOfPieces=c);for(var v=r.tweenInitTime,b=l(d-v>f?f:Math.max(0,d-v),p,c,f),y=Math.round(b-p),m=0;m<y;m++)r.particles.push(r.getParticle());r.particlesGenerated+=y}return u&&(e.font="12px sans-serif",e.fillStyle="#333",e.textAlign="right",e.fillText("Particles: ".concat(h),t.width-10,t.height-20)),r.particles.forEach((function(e,n){e.update(),(e.y>t.height||e.y<-100||e.x>t.width+100||e.x<-100)&&(s&&p<=c?r.particles[n]=r.getParticle():r.removeParticleAt(n))})),h>0||p<c})),this.canvas=e;var i=this.canvas.getContext("2d");if(!i)throw new Error("Could not get canvas context");this.context=i,this.getOptions=n};function v(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function b(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?v(Object(n),!0).forEach((function(e){m(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):v(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function y(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function m(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var g={width:"undefined"!=typeof window?window.innerWidth:300,height:"undefined"!=typeof window?window.innerHeight:200,numberOfPieces:200,friction:.99,wind:0,gravity:.1,initialVelocityX:4,initialVelocityY:10,colors:["#f44336","#e91e63","#9c27b0","#673ab7","#3f51b5","#2196f3","#03a9f4","#00bcd4","#009688","#4CAF50","#8BC34A","#CDDC39","#FFEB3B","#FFC107","#FF9800","#FF5722","#795548"],opacity:1,debug:!1,tweenFunction:c.a.easeInOutQuad,tweenDuration:5e3,recycle:!0,run:!0},O=function(){function t(e,n){var r=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),m(this,"canvas",void 0),m(this,"context",void 0),m(this,"_options",void 0),m(this,"generator",void 0),m(this,"rafId",void 0),m(this,"setOptionsWithDefaults",(function(t){var e={confettiSource:{x:0,y:0,w:r.canvas.width,h:0}};r._options=b(b(b({},e),g),t),Object.assign(r,t.confettiSource)})),m(this,"update",(function(){var t=r.options,e=t.run,n=t.onConfettiComplete,i=r.canvas,o=r.context;e&&(o.fillStyle="white",o.clearRect(0,0,i.width,i.height)),r.generator.animate()?r.rafId=requestAnimationFrame(r.update):(n&&"function"==typeof n&&r.generator.particlesGenerated>0&&n.call(r,r),r._options.run=!1)})),m(this,"reset",(function(){r.generator&&r.generator.particlesGenerated>0&&(r.generator.particlesGenerated=0,r.generator.particles=[],r.generator.lastNumberOfPieces=0)})),m(this,"stop",(function(){r.options={run:!1},r.rafId&&(cancelAnimationFrame(r.rafId),r.rafId=void 0)})),this.canvas=e;var i=this.canvas.getContext("2d");if(!i)throw new Error("Could not get canvas context");this.context=i,this.generator=new d(this.canvas,(function(){return r.options})),this.options=n,this.update()}var e,n,r;return e=t,(n=[{key:"options",get:function(){return this._options},set:function(t){var e=this._options&&this._options.run,n=this._options&&this._options.recycle;this.setOptionsWithDefaults(t),this.generator&&(Object.assign(this.generator,this.options.confettiSource),"boolean"==typeof t.recycle&&t.recycle&&!1===n&&(this.generator.lastNumberOfPieces=this.generator.particles.length)),"boolean"==typeof t.run&&t.run&&!1===e&&this.update()}}])&&y(e.prototype,n),r&&y(e,r),t}();function w(t){return function(t){if(Array.isArray(t))return C(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||I(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function x(t){return(x="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function j(){return(j=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function P(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function S(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?P(Object(n),!0).forEach((function(e){B(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):P(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function M(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t)){var n=[],r=!0,i=!1,o=void 0;try{for(var a,s=t[Symbol.iterator]();!(r=(a=s.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){i=!0,o=t}finally{try{r||null==s.return||s.return()}finally{if(i)throw o}}return n}}(t,e)||I(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function I(t,e){if(t){if("string"==typeof t)return C(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?C(t,e):void 0}}function C(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function _(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function k(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function D(t,e){return(D=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function E(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=A(t);if(e){var i=A(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return N(this,n)}}function N(t,e){return!e||"object"!==x(e)&&"function"!=typeof e?R(t):e}function R(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function A(t){return(A=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function B(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var T=a.a.createRef(),F=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&D(t,e)}(o,t);var e,n,r,i=E(o);function o(t){var e;_(this,o);for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return B(R(e=i.call.apply(i,[this,t].concat(r))),"canvas",a.a.createRef()),B(R(e),"confetti",void 0),e.canvas=t.canvasRef||T,e}return e=o,(n=[{key:"componentDidMount",value:function(){if(this.canvas.current){var t=Q(this.props)[0];this.confetti=new O(this.canvas.current,t)}}},{key:"componentDidUpdate",value:function(){var t=Q(this.props)[0];this.confetti&&(this.confetti.options=t)}},{key:"componentWillUnmount",value:function(){this.confetti&&this.confetti.stop(),this.confetti=void 0}},{key:"render",value:function(){var t=M(Q(this.props),2),e=t[0],n=t[1],r=S({zIndex:2,position:"absolute",pointerEvents:"none",top:0,left:0,bottom:0,right:0},n.style);return a.a.createElement("canvas",j({width:e.width,height:e.height,ref:this.canvas},n,{style:r}))}}])&&k(e.prototype,n),r&&k(e,r),o}(o.Component);function Q(t){var e={},n={},r=[].concat(w(Object.keys(g)),["confettiSource","drawShape","onConfettiComplete"]),i=["canvasRef"];for(var o in t){var a=t[o];r.includes(o)?e[o]=a:i.includes(o)?i[o]=a:n[o]=a}return[e,n,{}]}B(F,"defaultProps",S({},g)),B(F,"displayName","ReactConfetti");var q=a.a.forwardRef((function(t,e){return a.a.createElement(F,j({canvasRef:e},t))}));e.default=q}]).default)},4022:(t,e,n)=>{"use strict";t.exports=n.p+"static/media/sugarcane.e62ce0bf5cf5df8249b9.avif"}}]);
//# sourceMappingURL=830.74b87826.chunk.js.map