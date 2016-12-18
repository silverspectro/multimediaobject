!function(t){function e(i){if(n[i])return n[i].exports;var s=n[i]={exports:{},id:i,loaded:!1};return t[i].call(s.exports,s,s.exports,e),s.loaded=!0,s.exports}var n={};return e.m=t,e.c=n,e.p="build/",e(0)}([function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();n(4);var r=n(7),o=n(6),u=n(3),h=n(5),l=n(1)(),d=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"block",n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"multimediaObject",a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:60;i(this,t),"object"===("undefined"==typeof e?"undefined":s(e))?(this.name=n||e.name,this._style={},this.style={},this.events={},this._events={},this.functions={},this.breakpoints=[],this.animations={},this.animated=!1,this.computedAnimations=[],this.childs=[],this.dependencies=[],this.innerHTML="",this.fps=a,this.then=performance.now()||Date.now(),this.interval=1e3/this.fps,this.totalIteration=0,this.counter=0,this.reverse=!1,this.repeat=0,this.animationStarted=!1,this.loadFromJSON(e),this.applyFunctions(),this.addDefaultParameters(),this.init(),this.applyAttributes(),this.applyStyle(this.style),this.applyEvents(),this.applyBreakpoints()):(this.uuid=r.generateUUID(),this.name=n,this.type=e,this.data={},this._style={},this.style={},this.attributes={},this.events={},this._events={},this.functions={},this.animations={},this.breakpoints=[],this.animated=!1,this.computedAnimations=[],this.childs=[],this.dependencies=[],this.innerHTML="",this.DOMParent=null,this.fps=a,this.then=performance.now()||Date.now(),this.interval=1e3/this.fps,this.totalIteration=0,this.counter=0,this.reverse=!1,this.repeat=0,this.animationStarted=!1,this.init(),this.addDefaultParameters())}return a(t,[{key:"init",value:function(){this.generate(r.Atoms(this.type)),this.element.innerHTML=this.innerHTML,this.getSortedSteps(),window.MultimediaObjectEditor||(window[l.namespace]?(this.appendElementTo(document.getElementById(window[l.namespace].containerId)),this.data.autostart&&this.startAnimation()):this.appendElementTo()),this.attributes.id||this.applyAttributes({id:this.name})}},{key:"addDefaultParameters",value:function(){if(l.defaultAttributes[this.type])for(var t in l.defaultAttributes[this.type])this.attributes[t]||(this.attributes[t]=l.defaultAttributes[this.type][t]);this.data.autostart=this.data.autostart||!0,this.element&&this.applyAttributes()}},{key:"applyDependencies",value:function(t){if(t){var e=this.dependencies.indexOf(t);e<0&&this.dependencies.push(t)}return this}},{key:"removeDependencies",value:function(t){var e=this.dependencies.indexOf(t);return e>=0&&this.dependencies.splice(e,1),this}},{key:"requireDependencies",value:function(t){this.dependencies.length>0?(h(this.dependencies,"dependencies"),h.ready("dependencies",t)):t()}},{key:"addGlobalStyle",value:function(t,e){var n=document.createElement("style"),i=t;return n.innerHTML=i,n.id=this.uuid+"-style",n.type="text/css",document.head.appendChild(n),e&&window.setTimeout(e,100),this}},{key:"applyStyle",value:function(t,e){var n,i,s,a=Object.keys(this._style).length,e=e||!1;i=[];for(n in t)s=t[n],r.transformProperties.contains(n)?(i.push([n,s]),(a<1||e)&&(this._style[n]=s),this.style[n]=s):(s=""+s+r.unitForProperty(n,s),this.style[r.propertyWithPrefix(n)]=s,(a<1||e)&&(this._style[r.propertyWithPrefix(n)]=s),s.indexOf("{{absoluteAssetURL}}")>=0&&window[l.namespace]&&(s=s.replace("{{absoluteAssetURL}}",window.MultimediaObjectEditor?this.data.absoluteAssetURL:window[l.namespace].absoluteAssetURL)),this.element.style[r.propertyWithPrefix(n)]=s);var o=[0,1,2],h={x:this._style.translateX?r.getNumFromString(this._style.translateX):0,y:this._style.translateY?r.getNumFromString(this._style.translateY):0,z:this._style.translateZ?r.getNumFromString(this._style.translateZ):0,xU:this._style.translateX?r.getUnitFromString(this._style.translateX):"px",yU:this._style.translateY?r.getUnitFromString(this._style.translateY):"px",zU:this._style.translateZ?r.getUnitFromString(this._style.translateZ):"px"},d={value:this._style.rotate?r.getNumFromString(this._style.rotate):0,u:"deg"},c={x:this._style.scaleX?r.getNumFromString(this._style.scaleX):1,y:this._style.scaleY?r.getNumFromString(this._style.scaleY):1};return i.length>0&&(s=i.map(function(t){return r.transformValueForProperty(t[0],t[1])}),s=s.map(function(t,e){t.indexOf("translateX")>=0?(h.x=r.getNumFromString(t),h.xU=r.getUnitFromString(t)):t.indexOf("translateY")>=0?(h.y=r.getNumFromString(t),h.yU=r.getUnitFromString(t)):t.indexOf("translateZ")>=0&&(h.z=r.getNumFromString(t),h.zU=r.getUnitFromString(t)),t.indexOf("rotate")>=0&&(d.value=r.getNumFromString(t)),t.indexOf("scaleX")>=0?c.x=r.getNumFromString(t):t.indexOf("scaleY")>=0?c.y=r.getNumFromString(t):t.indexOf("scale")>=0&&(c.x=r.getNumFromString(t),c.y=r.getNumFromString(t))}),o[0]="translate3d("+h.x+h.xU+","+h.y+h.yU+","+h.z+h.zU+")",o[1]="rotate("+d.value+d.u+")",o[2]="scale("+c.x+","+c.y+")",o=o.filter(function(t){return!/^[0-9]/.test(t)}).join(" "),this.element.style[r.propertyWithPrefix("transform")]=o,u.dispatchEvent("actualize-style",this._style)),this}},{key:"applyFunctions",value:function(t){if(t)for(var e in t)this[e]=t[e],this.functions[e]=t[e];else for(var n in this.functions)this[n]=this.functions[n];return this}},{key:"applyAttributes",value:function(t){if(t)for(var e in t){var n=t[e];"string"==typeof t[e]&&t[e].indexOf("{{absoluteAssetURL}}")>=0&&window[l.namespace]&&(n=t[e].replace("{{absoluteAssetURL}}",window.MultimediaObjectEditor?this.data.absoluteAssetURL:window[l.namespace].absoluteAssetURL)),this.attributes[e]=t[e],this.element.setAttribute(e,n||t[e])}else for(var i in this.attributes){var s=this.attributes[i];"string"==typeof this.attributes[i]&&this.attributes[i].indexOf("{{absoluteAssetURL}}")>=0&&window[l.namespace]&&(s=this.attributes[i].replace("{{absoluteAssetURL}}",window.MultimediaObjectEditor?this.data.absoluteAssetURL:window[l.namespace].absoluteAssetURL)),this.element.setAttribute(i,s||this.attributes[i])}return this}},{key:"applyBreakpoints",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return(this.breakpoints.length>0||e.length>0)&&(e.forEach(function(e,n){t.breakpoints.indexOf(e)===-1&&t.breakpoints.push(e)}),this.checkBreakpoints()),this}},{key:"applyEvents",value:function(t){var e=this;if(t){var n=function(n){e.events[n]||e._events[n]||(e.events[n]=t[n],e._events[n]=e.transformEvent(t[n]),r.checkEvent(n)&&"swipe"!==n?e.element.addEventListener(n,e._events[n]):"swipe"===n?!function(){var t=!!("ontouchstart"in window)||!!("ontouchstart"in document.documentElement)||!!window.ontouchstart||!!window.onmsgesturechange||window.DocumentTouch&&window.document instanceof window.DocumentTouch,i=e;s={},i.evtStarted=!1,e.evtStart=function(t){t.preventDefault();var e=t.changedTouches?t.changedTouches[0]:t;i.evtStarted=!0,s={start:{left:e.pageX,top:e.pageY}}},e.evtEnd=function(t){if(t.preventDefault(),i.evtStarted){var e=t.changedTouches?t.changedTouches[0]:t;s.end={left:e.pageX,top:e.pageY},s.dx=s.end.left-s.start.left,s.dy=s.end.top-s.start.top,s.angle=Math.atan2(s.dy,s.dx),s.angle*=180/Math.PI,s.inMotion="touchmove"==t.type||"mousemove"==t.type,s.direction=Math.abs(s.dx)>Math.abs(s.dy)?(""+s.dx).indexOf("-")!=-1?"left":"right":(""+s.dy).indexOf("-")!=-1?"top":"bottom",i.events[n].apply(i,[t,s]),0==s.inMotion&&(i.evtStarted=!1)}},t?(e.element.addEventListener("touchstart",e.evtStart,!1),e.element.addEventListener("touchmove",e.evtEnd,!1),e.element.addEventListener("touchend",e.evtEnd,!1)):(e.element.addEventListener("mousedown",e.evtStart,!1),e.element.addEventListener("mousemove",e.evtEnd,!1),e.element.addEventListener("mouseup",e.evtEnd,!1))}():e.addListener(n,e.events[n]))};for(var i in t){var s;n(i)}}else if(Object.keys(this.events).length>0)for(var a in this.events)this._events[a]=this.transformEvent(this.events[a]),r.checkEvent(a)?this.element.addEventListener(a,this._events[a]):this.addListener(a,this.events[a]);return this}},{key:"removeEvent",value:function(t){return r.checkEvent(t)?this.events[t]?(this.element.removeEventListener(t,this._events[t]),delete this.events[t],delete this._events[t]):console.log("Event does not exist"):"swipe"===t?(this.element.removeEventListener("touchstart",this.evtStart),this.element.removeEventListener("touchmove",this.evtEnd),this.element.removeEventListener("touchend",this.evtEnd),this.element.removeEventListener("mousedown",this.evtStart),this.element.removeEventListener("mousemove",this.evtEnd),this.element.removeEventListener("mouseup",this.evtEnd),delete this.events[t],delete this._events[t]):this.events[t]?(this.removeListener(t,this._events[t]),delete this.events[t],delete this._events[t]):console.log("Event does not exist"),this}},{key:"deactivateEvent",value:function(t){this.events[t]?r.checkEvent(t)?this.element.removeEventListener(t,this._events[t]):this.removeListener(t,this._events[t]):console.log("Event does not exist")}},{key:"removeFunction",value:function(t){return this.functions[t]?delete this.functions[t]:console.log("Function does not exist"),this}},{key:"removePropertie",value:function(t,e){switch(t){case"attributes":this.attributes[e]?(this.element.setAttribute(e,""),delete this.attributes[e]):console.log(e+" attribute does not exist");break;case"data":this.data[e]?delete this.data[e]:console.log(e+" data does not exist");break;case"style":default:this._style[e]?(this.element.style[r.propertyWithPrefix(e)]="",this.element.style[e]="",r.transformProperties.contains(e)&&(this.element.style[r.propertyWithPrefix("transform")]="",this.element.style.transform=""),delete this.style[e],delete this._style[e]):console.log(e+" style does not exist")}return this}},{key:"transformEvent",value:function(t){var e=this;return function(n){t.apply(e,[n])}}},{key:"checkBreakpoints",value:function(){var t=this,e=window.MultimediaObjectEditor?"parseInt(getComputedStyle(document.getElementById('"+l.container+"')).width)":"window.innerWidth",n=window.MultimediaObjectEditor?"parseInt(getComputedStyle(document.getElementById('"+l.container+"')).height)":"window.innerHeight";this.breakpoints.length>0&&!function(){var i={};for(var s in t._style)i[s]=t._style[s];if(t.breakpoints.forEach(function(t,s){var a=[];for(var r in t.querie)"orientation"===r?a.push(""+("landscape"===t.querie[r]?e+" > "+n:n+" > "+e)):a.push((/height/.test(r)?n:e)+" "+(/min/.test(r)?">=":"<=")+" "+parseInt(t.querie[r]));var o="";if(a.forEach(function(t,e){o+=e>=1?" && "+t:t}),(o=new Function("return "+o))())for(var u in t.style)i[u]=t.style[u]}),t.computedAnimations.length>0)for(var a in t.computedAnimations[t.currentIteration])i[a]=t.computedAnimations[t.currentIteration][a];t.applyStyle(i)}()}},{key:"generate",value:function(t){var e=this;return this.element=document.createElement(t),this.type=t,window.addEventListener("resize",function(){e.checkBreakpoints()}),u.addListener("resize-scene",function(){e.checkBreakpoints()}),this}},{key:"appendElementTo",value:function(e){var n=this;if(e){e instanceof t?e.element.appendChild(this.element):e.appendChild(this.element),this.DOMParent=e;var i=this.childs.length;i>0&&this.childs.forEach(function(t,e){t.DOMParent=n,t.appendElementTo(n)})}else{document.body.appendChild(this.element),this.DOMParent=document.body;var s=this.childs.length;s>0&&this.childs.forEach(function(t,e){t.DOMParent=n,t.appendElementTo(n)})}return this.initializer&&this.initializer(),this}},{key:"add",value:function(e){return this.childs.push(e),e instanceof t?this.element.appendChild(e.element):this.element.appendChild(e),e.DOMParent=this,u.dispatchEvent("actualize-DOM-elements"),this}},{key:"remove",value:function(e){var n=this.childs.indexOf(e);return n>=0&&(this.childs.splice(n,1),e instanceof t?this.element.removeChild(e.element):this.element.removeChild(e),e.DOMParent=null),u.dispatchEvent("actualize-DOM-elements"),this}},{key:"getComputedStyle",value:function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(t){return getComputedStyle(this.element,null).getPropertyValue(t)})},{key:"preInterpolateStep",value:function(t){this.getSortedSteps();var e=r.getMaxOfArray(this.numericSteps),n=Math.floor(e*t);this.animatedProps={};for(var i=void 0,s=0;s<this.numericSteps.length;s++){var a=this.numericSteps[s].toFixed(2);for(var u in this.animations[a])if("easing"!==u){this.animatedProps[u]||(this.animatedProps[u]={},this.animatedProps[u].label=u,this.animatedProps[u].steps={}),this.animatedProps[u].steps[a]||(this.animatedProps[u].steps[a]={});var h=Object.keys(this.animatedProps[u].steps),l=h.length>1?h[h.length-2]:void 0;if(i=l?this.animatedProps[u].steps[l]:void 0,/color/gi.test(u)){var d=r.transformToColor(this.animations[a][u]);this.animatedProps[u].steps[a].startValue=i?i.endValue:this._style[u]?r.transformToColor(this._style[u]):{r:0,g:0,b:0},this.animatedProps[u].steps[a].unit="string"==typeof this.animations[a][u]?r.getUnitFromString(this.animations[a][u]||""):"",this.animatedProps[u].steps[a].endValue=d,this.animatedProps[u].steps[a].changeInValue={r:this.animatedProps[u].steps[a].endValue.r-this.animatedProps[u].steps[a].startValue.r,g:this.animatedProps[u].steps[a].endValue.g-this.animatedProps[u].steps[a].startValue.g,b:this.animatedProps[u].steps[a].endValue.b-this.animatedProps[u].steps[a].startValue.b,a:this.animatedProps[u].steps[a].endValue.a-this.animatedProps[u].steps[a].startValue.a},this.animatedProps[u].steps[a].initIteration=l?Math.floor(l*t):0,this.animatedProps[u].steps[a].totalStepIteration=Math.floor(a*t-this.animatedProps[u].steps[a].initIteration),this.animatedProps[u].steps[a].easing=this.animations[a].easing,this.animatedProps[u].steps[a].currentIteration=0}else/\d/g.test(this.animations[a][u])?(this.animatedProps[u].steps[a].startValue=parseFloat(i?i.endValue:this._style[u]?parseFloat(this._style[u]):0),this.animatedProps[u].steps[a].unit="string"==typeof this.animations[a][u]&&/px|%/g.test(this.animations[a][u])?r.getUnitFromString(this.animations[a][u]||""):"",this.animatedProps[u].steps[a].endValue=parseFloat(this.animations[a][u]),this.animatedProps[u].steps[a].changeInValue=parseFloat(this.animatedProps[u].steps[a].endValue-this.animatedProps[u].steps[a].startValue),this.animatedProps[u].steps[a].initIteration=l?Math.floor(l*t):0,this.animatedProps[u].steps[a].totalStepIteration=Math.floor(a*t)-this.animatedProps[u].steps[a].initIteration,this.animatedProps[u].steps[a].easing=this.animations[a].easing,this.animatedProps[u].steps[a].currentIteration=0):(this.animatedProps[u].steps[a].startValue=i?i.endValue:this._style[u]?this._style[u]:"auto",this.animatedProps[u].steps[a].unit="",this.animatedProps[u].steps[a].endValue=this.animations[a][u],this.animatedProps[u].steps[a].changeInValue=this.animatedProps[u].steps[a].endValue,this.animatedProps[u].steps[a].initIteration=l?Math.floor(l*t):0,this.animatedProps[u].steps[a].totalStepIteration=Math.floor(a*t)-this.animatedProps[u].steps[a].initIteration,this.animatedProps[u].steps[a].easing=this.animations[a].easing,this.animatedProps[u].steps[a].currentIteration=0)}}this.computedAnimations=!this.computedAnimations||[];for(var c in this.animatedProps)for(var p=0;p<=n;p++){var m=Object.keys(this.animatedProps[c].steps),f=p/n*e,v=isFinite(f)?Number(f).toFixed(2):0,g=r.closest(v,m);if(this.computedAnimations[p]||(this.computedAnimations[p]={}),/color/gi.test(c)){var y=this.animatedProps[c].steps[g].easing||"linearEase",b=this.animatedProps[c].steps[g].currentIteration,x=this.animatedProps[c].steps[g].startValue,w=this.animatedProps[c].steps[g].endValue,P=this.animatedProps[c].steps[g].changeInValue,S=this.animatedProps[c].steps[g].totalStepIteration,I=b<S?parseInt(o[y](b,x.r,P.r,S)):w.r,E=b<S?parseInt(o[y](b,x.g,P.g,S)):w.g,A=b<S?parseInt(o[y](b,x.b,P.b,S)):w.b,k=b<S?Number(o[y](b,x.a,P.a,S).toFixed(2)):w.a;this.computedAnimations[p][c]="rgba("+I+","+E+","+A+","+k+")"}else if(/\d/g.test(this.animatedProps[c].steps[g].startValue)){var O=this.animatedProps[c].steps[g].easing||"linearEase",M=this.animatedProps[c].steps[g].currentIteration,F=this.animatedProps[c].steps[g].startValue,L=this.animatedProps[c].steps[g].endValue,U=this.animatedProps[c].steps[g].changeInValue,T=this.animatedProps[c].steps[g].totalStepIteration,_=M<T-1?o[O](M,F,U,T):L;this.computedAnimations[p][c]=_+this.animatedProps[c].steps[g].unit}else{var C=(this.animatedProps[c].steps[g].easing||"linearEase",this.animatedProps[c].steps[g].currentIteration),R=this.animatedProps[c].steps[g].startValue,D=this.animatedProps[c].steps[g].endValue,V=(this.animatedProps[c].steps[g].changeInValue,this.animatedProps[c].steps[g].totalStepIteration),j=C<V-1?R:D;this.computedAnimations[p][c]=j+this.animatedProps[c].steps[g].unit}p>=this.animatedProps[c].steps[g].initIteration&&this.animatedProps[c].steps[g].currentIteration<=this.animatedProps[c].steps[g].totalStepIteration&&this.animatedProps[c].steps[g].currentIteration++}return this}},{key:"interpolateStep",value:function(t,e,n){var i=this.computedAnimations.length;return i<=0&&this.preInterpolateStep(n),t<=1&&!this.animationStarted&&(u.dispatchEvent(this.uuid+"-animationStart"),this.currentIteration=t,this.applyStyle(this.computedAnimations[t])),i>t&&(this.animated=!0,this.currentIteration=t,this.applyStyle(this.computedAnimations[t]),this.checkBreakpoints()),i===t&&(this.stopAnimation(),this.currentIteration=i-1,u.dispatchEvent(this.uuid+"-animationEnd")),this}},{key:"restartAnimation",value:function(){this.stopAnimation(),this.counter=0,this.runAnimation()}},{key:"startAnimation",value:function(){this.animationStarted=!0,this.runAnimation(),this.childs.forEach(function(t){t.startAnimation()})}},{key:"stopAnimation",value:function(){this.animationStarted=!1,this.animated=!1,window.cancelAnimationFrame(this.rafID)}},{key:"runAnimation",value:function(){var t=this;if(this.rafID=window.requestAnimationFrame(function(e){t.runAnimation()}),Object.keys(this.animations).length>0)if(this.now=performance.now()||Date.now(),this.delta=this.now-this.then,this.animationStarted){if(this.delta>this.interval){this.then=this.now-this.delta%this.interval,this.reverse?(this.counter<=0&&(this.counter=this.totalIteration),this.counter--):this.counter++;var e=performance.now()||Date.now(),n=(new Date(e-this.startTime),this.counter/this.totalIteration*this.totalTime);this.secondsElapsed=isFinite(n)?Number(n).toFixed(2):0,this.interpolateStep(this.counter,this.secondsElapsed,this.fps),this.counter>=this.totalIteration&&!this.reverse?this.repeat>0&&this.repeatCounter<this.repeat&&(this.counter=0,this.repeatCounter++):1==this.counter&&this.reverse&&this.repeat>0&&this.repeatCounter<this.repeat&&(this.counter=0,this.repeatCounter++)}}else this.animationStarted=!0,this.totalTime=Number(this.getSortedSteps()[this.getSortedSteps().length-1]),this.totalIteration=this.totalTime*this.fps}},{key:"addListener",value:function(t,e){var n=this;return u.addListener(this.uuid+"-"+t,function(){return e.call(n)})}},{key:"removeListener",value:function(t,e){return e instanceof Function?u.removeListener(this.uuid+"-"+t,e):u.removeListener(this.uuid+"-"+t,this[e])}},{key:"dispatchEvent",value:function(t,e,n){return n?u.dispatchEvent(t,e,this):u.dispatchEvent(this.uuid+"-"+t,e,this)}},{key:"addAnimationProperties",value:function(t){var e=this,n=Object.keys(this.animatedProps),i=Number(this.timeline.secondsElapsed);return i=0===i?.02:i,t.forEach(function(t,s){n.indexOf(t)===-1&&(e.animations[i]||(e.animations[i]={}),e.animations[i][t]=0)}),this.preInterpolateStep(this.timeline.fps||this.fps),this.timeline&&this.timeline.computeSteps(),this.timeline.UI&&this.timeline.UI.insertInterface(),this}},{key:"deleteAnimationProperties",value:function(t){var e=this;return t.forEach(function(t,n){for(var i in e.animations)for(var s in e.animations[i])s===t&&delete e.animations[i][s]}),this.preInterpolateStep(this.timeline.fps||this.fps),this.timeline&&this.timeline.computeSteps(),this.timeline.UI&&(this.timeline.UI.drawTimelineProperties(),this.timeline.UI.actualizeAnimationUI(),this.timeline.UI.listenScroll()),this}},{key:"getSortedSteps",value:function(){var t=Object.keys(this.animations).map(function(t,e){return parseFloat(t)});t.sort(function(t,e){return t-e}),this.numericSteps=t;for(var e in this.animations)/\d\.\d{2}/.test(e)?0===Object.keys(this.animations[e]).length&&delete this.animations[e]:(this.animations[parseFloat(e).toFixed(2)]=this.animations[e],delete this.animations[e]);return this.numericSteps}},{key:"getTotalAnimationTime",value:function(){return this.getSortedSteps(),this.totalAnimationTime=r.getMaxOfArray(this.numericSteps),this.totalAnimationTime}},{key:"exportToJSON",value:function(){var t={};t.exportedEvents={},t.exportedFunctions={},t.childs=[];for(var e in this)"undefined"!=typeof this[e]&&null!==this[e]&&("function"==typeof this[e]||this[e].element||this[e].children||this[e].elements||/exportedFunctions|exportedEvents|childs|interval|then|now|delta|animated|animationStarted|currentIteration|computedAnimations|totalTime|secondsElapsed|rafID|numericSteps|counter|totalIteration|animationStarted|direction|coords|bounds|geo|infowindow|map|marker|shop/.test(e)||(t[e]=this[e]));for(var n in this.events){var i=this.events[n].toString(),s=i.slice(i.indexOf("(")+1,i.indexOf(")")).split(","),a=i.slice(i.indexOf("{")+1,i.lastIndexOf("}")).replace(/\s(?!.)/gm,"");t.exportedEvents[n]={args:s.map(function(t){return t.replace(/\s+|\n+|(\/\*\*\/\n)+/g,"")}),body:a}}for(var r in this.functions){var o=this.functions[r].toString(),u=o.slice(o.indexOf("(")+1,o.indexOf(")")).split(","),h=o.slice(o.indexOf("{")+1,o.lastIndexOf("}")).replace(/\s(?!.)/gm,"");t.exportedFunctions[r]={args:u.map(function(t){return t.replace(/\s+|\n+|(\/\*\*\/\n)+/g,"")}),body:h}}return this.childs.forEach(function(e){t.childs.push(e.exportToJSON())}),t.style=this._style,t.attributes=this.attributes,t.breakpoints=this.breakpoints,t.globalStyle=this.globalStyle,t.data=this.data||{},t.animations=this.animations,t.load=!0,t.type=this.type,t.data.absoluteAssetURL=this.data.absoluteAssetURL||"./",t}},{key:"loadFromJSON",value:function(e){var n=this;for(var i in e)this[i]=e[i];for(var s in e.exportedEvents){var a=e.exportedEvents[s].args.map(function(t){return t.replace(/\s+|\n+|(\/\*\*\/\n)+/g,"")}),o=e.exportedEvents[s].body;this.events[s]=new Function(a,o)}for(var u in e.exportedFunctions){var h=e.exportedFunctions[u].args.map(function(t){return t.replace(/\s+|\n+|(\/\*\*\/\n)+/g,"")}),d=e.exportedFunctions[u].body;this.functions[u]=new Function(h,d)}e.childs&&e.childs.forEach(function(i,s){i.load=!0,e.data&&(i.data=i.data||{},i.data.absoluteAssetURL=i.data.absoluteAssetURL||""),n.childs[s]=new t(i),n.childs[s].DOMParent=n}),this.uuid=r.generateUUID(),this.data=e.data||{},this.type=e.type,this.data.absoluteAssetURL=e.data?e.data.absoluteAssetURL:"",window[l.namespace]?"undefined"!==window[l.namespace].absoluteAssetURL&&""!==window[l.namespace].absoluteAssetURL?this.data.absoluteAssetURL=window[l.namespace].absoluteAssetURL:"undefined"!=typeof e.data.absoluteAssetURL&&""!==e.data.absoluteAssetURL&&"./"!==e.data.absoluteAssetURL&&(window[l.namespace].absoluteAssetURL=e.data.absoluteAssetURL):this.data.absoluteAssetURL="undefined"!=typeof e.data.absoluteAssetURL&&""!==e.data.absoluteAssetURL?e.data.absoluteAssetURL:"./"}}]),t}();t.exports=d},function(t,e){"use strict";t.exports=function(){return{namespace:"_s4mConfig",container:"scene",defaultAttributes:{video:{src:"",type:"video/mp4",controls:"true",muted:"true",loop:"true",preload:"true","webkit-playsinline":"true"},img:{src:""},iframe:{src:""},form:{name:""},input:{name:""},audio:{src:""}}}}},function(t,e){"use strict";var n=function(t){this.obj={},t&&this.add(t)};n.prototype={contains:function(t){return 1===this.obj[t]},add:function(t){var e,n,i;for(e=0,n=t.length;e<n;e++)i=t[e],this.obj[i]=1}},t.exports=n},function(t,e){"use strict";var n=function(){this.listeners={}};n.prototype={addListener:function(t,e){return this.listeners[t]?e instanceof Function&&this.listeners[t].indexOf(e)<0&&this.listeners[t].push(e):(this.listeners[t]=[],this.addListener(t,e)),this},dispatchEvent:function(t,e,n){return e=e||{},this.listeners[t]&&(n?this.listeners[t].forEach(function(t,i){t.call(n,e)}):this.listeners[t].forEach(function(t,n){t.call(window,e)})),this},removeListener:function(t,e){var n=this.listeners[t].indexOf(e);return n>0&&this.listeners[t].splice(n,1),this}};var i=new n;t.exports=i},function(t,e){"use strict";t.exports=function(){for(var t=0,e=["ms","moz","webkit","o"],n=0;n<e.length&&!window.requestAnimationFrame;++n)window.requestAnimationFrame=window[e[n]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[e[n]+"CancelAnimationFrame"]||window[e[n]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(e,n){var i=(new Date).getTime(),s=Math.max(0,16-(i-t)),a=window.setTimeout(function(){e(i+s)},s);return t=i+s,a}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)})}()},function(t,e,n){var i,s;/*!
	  * $script.js JS loader & dependency manager
	  * https://github.com/ded/script.js
	  * (c) Dustin Diaz 2014 | License MIT
	  */
!function(a,r){"undefined"!=typeof t&&t.exports?t.exports=r():(i=r,s="function"==typeof i?i.call(e,n,e,t):i,!(void 0!==s&&(t.exports=s)))}("$script",function(){function t(t,e){for(var n=0,i=t.length;n<i;++n)if(!e(t[n]))return u;return 1}function e(e,n){t(e,function(t){return n(t),1})}function n(a,r,o){function u(t){return t.call?t():c[t]}function l(){if(!--y){c[g]=1,v&&v();for(var n in m)t(n.split("|"),u)&&!e(m[n],u)&&(m[n]=[])}}a=a[h]?a:[a];var d=r&&r.call,v=d?r:o,g=d?a.join(""):r,y=a.length;return setTimeout(function(){e(a,function t(e,n){return null===e?l():(!n&&!/^https?:\/\//.test(e)&&s&&(e=e.indexOf(".js")===-1?s+e+".js":s+e),f[e]?(g&&(p[g]=1),2==f[e]?l():setTimeout(function(){t(e,!0)},0)):(f[e]=1,g&&(p[g]=1),i(e,l),void 0))})},0),n}function i(t,e){var n,i=r.createElement("script");i.onload=i.onerror=i[d]=function(){i[l]&&!/^c|loade/.test(i[l])||n||(i.onload=i[d]=null,n=1,f[t]=2,e())},i.async=1,i.src=a?t+(t.indexOf("?")===-1?"?":"&")+a:t,o.insertBefore(i,o.lastChild)}var s,a,r=document,o=r.getElementsByTagName("head")[0],u=!1,h="push",l="readyState",d="onreadystatechange",c={},p={},m={},f={};return n.get=i,n.order=function(t,e,i){!function s(a){a=t.shift(),t.length?n(a,s):n(a,e,i)}()},n.path=function(t){s=t},n.urlArgs=function(t){a=t},n.ready=function(i,s,a){i=i[h]?i:[i];var r=[];return!e(i,function(t){c[t]||r[h](t)})&&t(i,function(t){return c[t]})?s():!function(t){m[t]=m[t]||[],m[t][h](s),a&&a(r)}(i.join("|")),n},n.done=function(t){n([null],t)},n})},function(t,e){"use strict";var n={linearEase:function(t,e,n,i){return n*t/i+e},easeInQuad:function(t,e,n,i){return n*(t/=i)*t+e},easeOutQuad:function(t,e,n,i){return-n*(t/=i)*(t-2)+e},easeInOutQuad:function(t,e,n,i){return(t/=i/2)<1?n/2*t*t+e:-n/2*(--t*(t-2)-1)+e},easeInCubic:function(t,e,n,i){return n*(t/=i)*t*t+e},easeOutCubic:function(t,e,n,i){return n*((t=t/i-1)*t*t+1)+e},easeInOutCubic:function(t,e,n,i){return(t/=i/2)<1?n/2*t*t*t+e:n/2*((t-=2)*t*t+2)+e},easeInQuart:function(t,e,n,i){return n*(t/=i)*t*t*t+e},easeOutQuart:function(t,e,n,i){return-n*((t=t/i-1)*t*t*t-1)+e},easeInOutQuart:function(t,e,n,i){return(t/=i/2)<1?n/2*t*t*t*t+e:-n/2*((t-=2)*t*t*t-2)+e},easeInQuint:function(t,e,n,i){return n*(t/=i)*t*t*t*t+e},easeOutQuint:function(t,e,n,i){return n*((t=t/i-1)*t*t*t*t+1)+e},easeInOutQuint:function(t,e,n,i){return(t/=i/2)<1?n/2*t*t*t*t*t+e:n/2*((t-=2)*t*t*t*t+2)+e},easeInSine:function(t,e,n,i){return-n*Math.cos(t/i*(Math.PI/2))+n+e},easeOutSine:function(t,e,n,i){return n*Math.sin(t/i*(Math.PI/2))+e},easeInOutSine:function(t,e,n,i){return-n/2*(Math.cos(Math.PI*t/i)-1)+e},easeInExpo:function(t,e,n,i){return 0==t?e:n*Math.pow(2,10*(t/i-1))+e},easeOutExpo:function(t,e,n,i){return t==i?e+n:n*(-Math.pow(2,-10*t/i)+1)+e},easeInOutExpo:function(t,e,n,i){return 0==t?e:t==i?e+n:(t/=i/2)<1?n/2*Math.pow(2,10*(t-1))+e:n/2*(-Math.pow(2,-10*--t)+2)+e},easeInCirc:function(t,e,n,i){return-n*(Math.sqrt(1-(t/=i)*t)-1)+e},easeOutCirc:function(t,e,n,i){return n*Math.sqrt(1-(t=t/i-1)*t)+e},easeInOutCirc:function(t,e,n,i){return(t/=i/2)<1?-n/2*(Math.sqrt(1-t*t)-1)+e:n/2*(Math.sqrt(1-(t-=2)*t)+1)+e},easeInElastic:function(t,e,n,i){var s=1.70158,a=0,r=n;if(0==t)return e;if(1==(t/=i))return e+n;if(a||(a=.3*i),r<Math.abs(n)){r=n;var s=a/4}else var s=a/(2*Math.PI)*Math.asin(n/r);return-(r*Math.pow(2,10*(t-=1))*Math.sin((t*i-s)*(2*Math.PI)/a))+e},easeOutElastic:function(t,e,n,i){var s=1.70158,a=0,r=n;if(0==t)return e;if(1==(t/=i))return e+n;if(a||(a=.3*i),r<Math.abs(n)){r=n;var s=a/4}else var s=a/(2*Math.PI)*Math.asin(n/r);return r*Math.pow(2,-10*t)*Math.sin((t*i-s)*(2*Math.PI)/a)+n+e},easeInOutElastic:function(t,e,n,i){var s=1.70158,a=0,r=n;if(0==t)return e;if(2==(t/=i/2))return e+n;if(a||(a=i*(.3*1.5)),r<Math.abs(n)){r=n;var s=a/4}else var s=a/(2*Math.PI)*Math.asin(n/r);return t<1?-.5*(r*Math.pow(2,10*(t-=1))*Math.sin((t*i-s)*(2*Math.PI)/a))+e:r*Math.pow(2,-10*(t-=1))*Math.sin((t*i-s)*(2*Math.PI)/a)*.5+n+e},easeInBack:function(t,e,n,i,s){return void 0==s&&(s=1.70158),n*(t/=i)*t*((s+1)*t-s)+e},easeOutBack:function(t,e,n,i,s){return void 0==s&&(s=1.70158),n*((t=t/i-1)*t*((s+1)*t+s)+1)+e},easeInOutBack:function(t,e,n,i,s){return void 0==s&&(s=1.70158),(t/=i/2)<1?n/2*(t*t*(((s*=1.525)+1)*t-s))+e:n/2*((t-=2)*t*(((s*=1.525)+1)*t+s)+2)+e},easeInBounce:function(t,e,i,s){return i-n.easeOutBounce(s-t,0,i,s)+e},easeOutBounce:function(t,e,n,i){return(t/=i)<1/2.75?n*(7.5625*t*t)+e:t<2/2.75?n*(7.5625*(t-=1.5/2.75)*t+.75)+e:t<2.5/2.75?n*(7.5625*(t-=2.25/2.75)*t+.9375)+e:n*(7.5625*(t-=2.625/2.75)*t+.984375)+e},easeInOutBounce:function(t,e,i,s){return t<s/2?.5*n.easeInBounce(2*t,0,i,s)+e:.5*n.easeOutBounce(2*t-s,0,i,s)+.5*i+e}};t.exports=n},function(t,e,n){"use strict";var i=n(2),s=function(t){var e;return e={},function(){var n,i,s,a,r;for(s="",n=0,a=arguments.length;n<a;n++)i=arguments[n],s+=i.toString()+",";return r=e[s],r||(e[s]=r=t.apply(this,arguments)),r}},a={Atoms:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"block",e={block:"div",div:"div",header:"header",footer:"footer",aside:"aside",article:"article",main:"main",nav:"nav",navigation:"nav",span:"span",text:"p",p:"p",paragraphe:"p","ulist-container":"ul",ulist:"ul",ul:"ul","unordered-list":"ul","olist-container":"ol",olist:"ol",ol:"ol","ordered-list":"ol","list-element":"li",li:"li",code:"pre",pre:"pre",input:"input",textarea:"textarea",form:"form",image:"img",img:"img",button:"button",iframe:"iframe",video:"video",canvas:"canvas",audio:"audio"};return e[t]},convertLeftToTime:function(t,e){var n=parseInt(window.getComputedStyle(document.getElementById("timeline-interface"),null).width),i=100*t/n,s=i/98*e;return parseFloat(s).toFixed(2)},concatObject:function(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];for(var i={},s=arguments.length,a=0;a<s;a++)for(var r in e[a])e[a].hasOwnProperty(r)&&(i[r]=e[a][r]);return i},checkEvent:function(t){return/click|mousedown|mouseup|mousemove|change|touchstart|touchmove|touchend|input|focus|dlclick|mouseenter|mouseleave|mouseover|mouseout|blur|search|submit|play|pause|canplay|progress/gi.test(t)},getElementsWithAttribute:function(t,e,n){for(var i=[],s=n?n instanceof Array?n:document.querySelectorAll(n):document.getElementsByTagName("*"),a=0,r=s.length;a<r;a++){s[a].getAttribute(t);null!==s[a].getAttribute(t)&&(e?s[a].getAttribute(t)===e&&i.push(s[a]):i.push(s[a]))}return i},getObjectUnderCursor:function(t,e,n){var i=!1;return t.forEach(function(t,n){var s=t.element?t.element.getBoundingClientRect():t.getBoundingClientRect();e.x>=s.left&&e.x<=s.right&&e.y>=s.top&&e.y<=s.bottom&&(i=t)}),n&&n(i),i},isEmpty:function(t){var e=Object.prototype.hasOwnProperty;if(null==t)return!0;if(t.length>0)return!1;if(0===t.length)return!0;for(var n in t)if(e.call(t,n))return!1;return!0},generateRandomHexColor:function(){return"#"+Math.floor(16777215*Math.random()).toString(16)},closest:function(t,e){for(var n=e.sort(function(t,e){return t-e}),i=0;i<n.length;i++)if(t<n[i])return n[i];return n[n.length-1]},pxProperties:new i("marginTop,marginLeft,marginBottom,marginRight,paddingTop,paddingLeft,paddingBottom,paddingRight,top,left,bottom,right,translateX,translateY,translateZ,perspectiveX,perspectiveY,perspectiveZ,width,height,maxWidth,maxHeight,minWidth,minHeight,borderRadius".split(",")),degProperties:new i("rotate,rotateX,rotateY,rotateZ,skew,skewX,skewY,skewZ".split(",")),transformProperties:new i("translate,translateX,translateY,translateZ,scale,scaleX,scaleY,scaleZ,rotate,rotateX,rotateY,rotateZ,rotateC,rotateCX,rotateCY,skew,skewX,skewY,skewZ,perspective".split(",")),styleProperties:new i("opacity,z-index".split(",")),isUnitProp:function(t){return/position|background|display|visibility|opacity|scale|transform-origin|font-weight|line-height|letter-spacing|z-index|outline|text-align|skew|rotate|transform|overflow|border-style|border-color|word/.test(t)},constrain:function(t,e,n){return e>t?e:n<t?n:t},getRandomInt:function(t,e){return Math.floor(Math.random()*(e-t+1))+t},applyDefaults:function(t,e){var n,i,s;i=[];for(n in e)s=e[n],i.push(null!=t[n]?t[n]:t[n]=s);return i},clone:function(t){var e,n,i;n={};for(e in t)i=t[e],n[e]=i;return n},roundf:function(t,e){var n;return n=Math.pow(10,e),Math.round(t*n)/n},toDashed:function(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})},prefixFor:s(function(t){var e,n,i,s,a,r,o,u,h,l;if(void 0!==document.body.style[t])return"";for(u=t.split("-"),h="",e=0,s=u.length;e<s;e++)o=u[e],h+=o.substring(0,1).toUpperCase()+o.substring(1);for(l=["Webkit","Moz","ms"],n=0,a=l.length;n<a;n++)if(r=l[n],i=r+h,void 0!==document.body.style[i])return r;return""}),propertyWithPrefix:s(function(t){var e;return e=a.prefixFor(t),"Moz"===e?""+e+(t.substring(0,1).toUpperCase()+t.substring(1)):""!==e?"-"+e.toLowerCase()+"-"+a.toDashed(t):a.toDashed(t)}),unitForProperty:function(t,e){return"number"!=typeof e?"":a.pxProperties.contains(t)?"px":a.degProperties.contains(t)?"deg":""},getMaxOfArray:function(t){return Math.max.apply(null,t)},transformValueForProperty:function(t,e){var n,i;return n=(""+e).match(/^([0-9.-]*)([^0-9]*)$/),null!=n?(e=n[1],i=n[2]):e=parseFloat(e),e=a.roundf(parseFloat(e),10),null!=i&&""!==i||(i=a.unitForProperty(t,e)),t+"("+e+i+")"},generateUUID:function(){var t=(new Date).getTime();window.performance&&"function"==typeof window.performance.now&&(t+=performance.now());var e="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var n=(t+16*Math.random())%16|0;return t=Math.floor(t/16),("x"==e?n:3&n|8).toString(16)});return e},getNumFromString:function(t){var e=t.match(/-(?=\d)|\d+|\.\d+/g);return null!==e?parseFloat(e.join("")):t},getUnitFromString:function(t){var e=t.match(/%|px/g),n=null!==e?e[0]:"px";return n},hexToR:function(t){return parseInt(a.cutHex(t).substring(0,2),16)},hexToG:function(t){return parseInt(a.cutHex(t).substring(2,4),16)},hexToB:function(t){return parseInt(a.cutHex(t).substring(4,6),16)},cutHex:function(t){return"#"==t.charAt(0)?t.substring(1,7):t},rgb2hex:function(t,e,n){var i=n|e<<8|t<<16;return"#"+(16777216+i).toString(16).slice(1)},transformToColor:function(t){var e=void 0;if("#"===t[0])e={r:a.hexToR(t),g:a.hexToG(t),b:a.hexToB(t),a:1};else{var n="string"==typeof t?t.indexOf("("):-1;n>=0&&(t=t.slice(n+1,t.length-1));var i="string"==typeof t?t.split(","):[0,0,0,0];e={r:parseInt(i[0]),g:parseInt(i[1]),b:parseInt(i[2]),a:parseFloat(i[3]||1)}}return e}};t.exports=a}]);