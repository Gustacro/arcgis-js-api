// COPYRIGHT © 2017 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.

define(["require","exports","../../../core/screenUtils","../../../symbols/support/Symbol3DOutline","../../../symbols/support/symbolPreview","../../../core/promiseUtils","dojo/_base/lang","dojo/Deferred","dojo/dom-construct","dojo/on","dojo/i18n!../nls/SymbolStyler"],function(e,t,r,n,i,o,u,l,s,c,f){function a(e,t){e[t]||(e[t]={})}function d(e,t){return e.indexOf(t)>-1}function h(e){return j(e)}function m(e){return e&&"Icon"===e.type}function p(e){return e&&"Object"===e.type}function y(e){return e&&"Line"===e.type}function b(e){return e&&"Path"===e.type}function v(e){return e&&"Extrude"===e.type}function g(e){return e&&"Fill"===e.type}function w(e){return e&&"Text"===e.type}function x(e){return C(e,"simple-line","2d")}function z(e){return C(e,"simple-marker","2d")}function S(e){return C(e,"simple-fill","2d")}function O(e){return C(e,"picture-marker","2d")}function P(e){return C(e,"fill","2d")}function j(e){return d(e.type,"3d")}function k(e){return e.symbolLayers.getItemAt(0)}function F(e,t){return C(e,"marker",t)||C(e,"point",t)}function L(e){return h(e)&&v(k(e))}function T(e){return h(e)&&w(k(e))}function C(e,t,r){var n=e&&e.type,i=d(n,t+"-symbol");return r?i&&("3d"===r?j(e):!j(e)):i}function I(e,t){return C(e,"line",t)}function M(e,t){return C(e,"fill",t)}function D(e){return e&&"string"==typeof e.style}function E(e){return h(e)?!1:D(e)&&d(Ee,e.style)}function N(e){return h(e)?U(e):A(e)}function U(e){var t=k(e);return g(t)||m(t)&&ze(t)?{color:t.outline.color,size:r.pt2px(t.outline.size)}:y(t)||b(t)?{color:t.material&&t.material.color,size:r.pt2px(t.size)}:null}function A(e){return x(e)?{color:e.color,size:e.width}:P(e)||z(e)?{color:e.get("outline.color"),size:e.get("outline.width")}:null}function q(e,t){!isNaN(t)&&e&&(h(e)?R(e,t):B(e,t))}function R(e,t){var n=k(e);m(n)||g(n)?(a(n,"outline"),n.outline.size=r.px2pt(t)):y(n)?(a(n,"size"),n.size=r.px2pt(t)):b(n)&&(a(n,"size"),n.size=t)}function B(e,t){x(e)?e.width=t:de(e)&&(e.outline.width=t)}function H(e,t){t&&e&&!j(e)&&(t=N(e).color?t:"none",x(e)?e.style=t:de(e)&&(e.outline.style=t))}function V(e,t){e&&!isNaN(t)&&(h(e)?W(e,t):G(e,t))}function W(e,t){var n=k(e);m(n)||w(n)?n.size=r.px2pt(t):p(n)?_(n,t):v(n)&&(n.size=t)}function _(e,t){var r=e.width,n=e.height,i=e.depth,o=Math.max(r,n,i),u=t/o;e.set({width:r*u,height:n*u,depth:i*u})}function G(e,t){var r=e.width,n=t;if(r!==n)if(O(e)){var i=e.url,o=te({dimensions:e,targetDimension:"width",targetSize:n});if(e.height=o.height,e.width=o.width,!i||"http://"===i||!d(i,"http://")&&!d(i,"data:"))return;if(e.xoffset||e.yoffset){var u=e.width/r;e.xoffset=Math.round(e.xoffset*u),e.yoffset=Math.round(e.yoffset*u)}}else e.size=n}function J(e){if(!h(e))return z(e)?e.size:O(e)?K(e):void 0;var t=k(e);return m(t)||w(t)?r.pt2px(t.size):p(t)?K(t):v(t)?t.size:void 0}function K(e){return Math.max(e.width,e.height,e.depth)}function Q(e,t){h(e)?pe(e,{color:t}):e.color=t}function X(e){return h(e)?Y(e):Z(e)}function Y(e){return k(e).get("material.color")}function Z(e){return e.color}function $(e,t){if(h(e)){var r=k(e);return y(r)||b(r)?void pe(e,{color:t}):(a(r,"outline"),void(r.outline.color=t))}N(e).color=t}function ee(e,t,r){return void 0===r&&(r=24),i.renderPreviewHTML(e,{node:t,size:r})}function te(e){var t=e.dimensions,r="height"===e.targetDimension?"height":"width",n=e.targetSize;return"height"===r?{height:n,width:t.width/t.height*n}:{height:t.height/t.width*n,width:n}}function re(e){var t=new l,r=s.create("img"),n=c(r,"load",function(){return 0===r.width&&0===r.height?void t.reject("image has both width and height of 0"):void t.resolve({width:r.width,height:r.height})}),i=c(r,"error",function(e){t.reject("error ocurred while loading image",e)});return r.src=e,t.promise.always(function(){n.remove(),i.remove(),s.destroy(r)}),t.promise}function ne(e){h(e.symbol)?ie(e):oe(e)}function ie(e){V(e.symbol,e.size)}function oe(e){V(e.symbol,e.size)}function ue(e){h(e.symbol)?le(e):se(e)}function le(e){Q(e.symbol,e.color)}function se(e){Q(e.symbol,e.color)}function ce(e){h(e.symbol)?fe(e):ae(e)}function fe(e){$(e.symbol,e.color),q(e.symbol,e.size)}function ae(e){$(e.symbol,e.color),H(e.symbol,e.pattern),q(e.symbol,e.size)}function de(e){return e&&e.outline}function he(e){if(h(e))return!1;var t=void 0;return t=de(e)?e.outline.color:e.color,me(t)}function me(e){return e&&e.r>246&&e.g>246&&e.b>246}function pe(e,t){var r=k(e);return t.color?void(r.material=u.mixin({},r.material,t)):void(r.material=void 0)}function ye(e){S(e)&&"solid"!==e.style&&"none"!==e.style&&(e.style="solid")}function be(e,t){return void 0===t&&(t=[]),h(e)?we(e,t):ge(e,t)}function ve(e){var t=["circle","square","diamond"];return d(t,e.style)}function ge(e,t){var r=e.type,n=["simple-marker-symbol","picture-marker-symbol"],i=["simple-marker-symbol","simple-fill-symbol"],o=["simple-marker-symbol","simple-line-symbol","simple-fill-symbol"],u=I(e),l=M(e);return{shape:{state:d(t,"shape")||u||l?"excluded":d(n,r)?"enabled":"disabled"},fill:{state:d(t,"fill")||u?"excluded":i[0]===r&&ve(e)||i[1]===r?"enabled":"disabled"},outline:{state:d(t,"outline")?"excluded":d(o,r)?"enabled":"disabled"}}}function we(e,t){var r=k(e),n=r.type,i=["Icon","Object"],o=["Icon","Object","Fill","Extrude","Text"],u=["Icon","Fill","Line","Path"];return{shape:{state:d(t,"shape")||!d(i,n)?"excluded":"enabled"},fill:{state:d(t,"fill")||!d(o,n)?"excluded":xe(r)?"disabled":"enabled"},outline:{state:d(t,"outline")||!d(u,n)?"excluded":!m(r)||ze(r)||xe(r)?"enabled":"disabled"}}}function xe(e){return m(e)&&d(Ee,e.get("resource.primitive"))}function ze(e){return m(e)?e.outline&&!e.get("resource.href"):!1}function Se(e){if(h(e)){var t=k(e).type;if("Extrude"===t||"Object"===t)return"meters"}return"pixels"}function Oe(e){if(h(e)){var t=k(e).type;if("Path"===t)return"meters"}return"pixels"}function Pe(e){if(h(e)){if(F(e)){var t=k(e);return p(t)?"web-style:volumetric":m(t)?"web-style:flat":"web-style"}return"web-style"}return"symbol-set"}function je(e){var t=k(e).type;return"Object"===t||"Path"===t||"Extrude"===t?"volumetric":"flat"}function ke(e){if(h(e)){var t=k(e);if(m(t)&&(t.outline||(t.outline=new n.Symbol3DOutline({color:void 0,size:0})),void 0===t.size))return t.computeSize().then(function(r){return t.size=r[0],e});if(p(t)&&void 0===t.width&&void 0===t.height&&void 0===t.depth)return t.computeSize().then(function(r){return t.set({width:r[0],height:r[1],depth:r[2]}),e})}return o.resolve(e)}function Fe(e,t){if(h(e)&&h(t)){var r=k(e),n=k(t);return m(r)&&p(n)&&!!r.resource.href&&!n.resource.href&&!!n.resource.primitive}return O(e)&&z(t)}function Le(e,t){if(h(e)&&h(t)){var r=k(e),n=k(t);return m(r)&&m(n)&&!r.resource.href&&!n.resource.href&&!d(Ee,r.resource.primitive)&&d(Ee,n.resource.primitive)}return Ce(e,t)}function Te(e,t){return h(e)&&h(t)?Le(t,e):Ce(t,e)}function Ce(e,t){return z(e)&&z(t)&&!E(e)&&E(t)}function Ie(e){if(!h(e))return"";var t=k(e);if(!m(t)&&!p(t))return"";if(e.styleOrigin)return e.styleOrigin.name;if(!De(t))return"";var r=t.get("resource.primitive");if(m(t))return f[r];if(p(t)){var n={sphere:f.sphere,cylinder:f.cylinder,"tall-cylinder":f.tallCylinder,cube:f.cube,"tall-cube":f.tallCube,cone:f.cone,"tall-cone":f.tallCone,"inverted-cone":f.invertedCone,diamond:f.diamond,tetrahedron:f.tetrahedron};return n[Me(t)?"tall-"+r:r]}}function Me(e){var t=e.depth,r=e.height,n=e.width;return n&&t&&r&&n===t&&r>n}function De(e){return!e.get("resource.href")&&!!e.get("resource.primitive")}var Ee=["x","cross"];t.is3d=j,t.getSymbolLayer=k,t.isPoint=F,t.hasExtrudeSymbolLayer=L,t.hasTextSymbolLayer=T,t.isLine=I,t.isPolygon=M,t.hasPureOutlineStyle=E,t.getOutline=N,t.setOutlineWidth=q,t.setOutlineStyle=H,t.setSize=V,t.getMarkerLength=J,t.setFillColor=Q,t.getFillColor=X,t.setOutlineColor=$,t.renderOnSurface=ee,t.preserveAspectRatio=te,t.testImageUrl=re,t.updateShape=ne,t.updateFill=ue,t.updateOutline=ce,t.blendsIntoBackground=he,t.updateMaterial=pe,t.ensureSupportedSimpleFillSymbolStyle=ye,t.getApplicableTabs=be,t.getSizeUnit=Se,t.getOutlineUnit=Oe,t.getSymbolSource=Pe,t.getDimensionality=je,t.ensureProps=ke,t.switchedFromRasterToVectorSymbol=Fe,t.switchedToPureOutline=Le,t.switchedFromPureOutline=Te,t.switchedSmsStyleToPureOutline=Ce,t.getSymbolName=Ie});