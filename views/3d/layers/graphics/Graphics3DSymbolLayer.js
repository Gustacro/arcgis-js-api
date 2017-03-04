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

define(["require","exports","../../../../core/tsSupport/extendsHelper","dojo/_base/lang","../../support/PromiseLightweight","../../support/mathUtils","./ElevationInfo","./graphicUtils","../../../../core/Logger","../../../../Color"],function(t,e,r,o,i,n,a,s,l,p){function f(t,e){var r=null!=t?e.attributes[t]:0;return null!=r&&isFinite(r)||(r=0),r}function c(t,e){var r=f(t.field,e),o="arithmetic"===t.rotationType?90-r:r;return n.deg2rad(o)}var u=new a,y=l.getLogger("esri.symbols.Symbol3D"),h=function(t){function e(e,r,o){var i=t.call(this)||this;return i.symbol=e,i._context=r,i._symbolLayerOrder=r.layerOrder,i._symbolLayerOrderDelta=r.layerOrderDelta,i._elevationInfo=new a,i._material=null,i._updateDrivenProperties(o),i._updateElevationInfo(),i._prepareResources(),i}return r(e,t),e.prototype._logWarning=function(t){y.warn(t)},e.prototype._prepareResources=function(t){throw new Error("This is an abstract base class")},e.prototype._defaultElevationInfoNoZ=function(){return _},e.prototype._defaultElevationInfoZ=function(){return v},e.prototype._updateElevationInfo=function(){for(var t in this._elevationInfo)this._elevationInfo[t]=void 0;var e=this._context.layer.elevationInfo;e&&(this._elevationInfo=o.mixin(this._elevationInfo,e));var r=this.symbol.elevationInfo;r&&(this._elevationInfo=o.mixin(this._elevationInfo,this.symbol.elevationInfo))},e.prototype._getGraphicElevationInfo=function(t){var e=t.geometry.hasZ?this._defaultElevationInfoZ():this._defaultElevationInfoNoZ();return u.mode=this._elevationInfo.mode||e.mode,u.offset=null!=this._elevationInfo.offset?this._elevationInfo.offset:e.offset,u.featureExpression=this._elevationInfo.featureExpression,u.offset=u.offset/this._context.renderCoordsHelper.unitInMeters,u},e.prototype._getDrapedZ=function(){return-2},e.prototype._updateDrivenProperties=function(t){var e={color:!1,opacity:!1,size:!1};if(!t){var r=this._context.renderer;r&&(e.color=!!r.colorInfo,e.size=!!r.sizeInfo,r.visualVariables&&r.visualVariables.forEach(function(t){switch(t.type){case"color":if(e.color=!0,t.colors)for(var r=0;r<t.colors.length;r++){var o=t.colors[r];o&&(Array.isArray(o)&&o.length>3&&255!==o[3]||void 0!==o.a&&255!==o.a)&&(e.opacity=!0)}if(t.stops)for(var r=0;r<t.stops.length;r++){var o=t.stops[r].color;o&&(Array.isArray(o)&&o.length>3&&255!==o[3]||void 0!==o.a&&255!==o.a)&&(e.opacity=!0)}break;case"opacity":e.opacity=!0;break;case"size":e.size=!0}}))}this._drivenProperties=e},e.prototype._isPropertyDriven=function(t){return this._drivenProperties[t]},e.prototype._getLayerOpacity=function(){if(this._context.layerView&&"fullOpacity"in this._context.layerView)return this._context.layerView.fullOpacity;var t=this._context.layer.opacity;return null==t?1:t},e.prototype._getMaterialOpacity=function(){var t=1;t*=this._getLayerOpacity();var e=this.symbol.material;return e&&!this._isPropertyDriven("opacity")&&(t*=e.color.a),t},e.prototype._getMaterialOpacityAndColor=function(){var t=this.symbol.material,e=this._getMaterialOpacity(),r=this._isPropertyDriven("color")||!t?null:p.toUnitRGB(t.color);return s.mixinColorAndOpacity(r,e)},e.prototype._getVertexOpacityAndColor=function(t,e,r){var o=this._isPropertyDriven("color")?t.color:null,i=this._isPropertyDriven("opacity")?t.opacity:null,n=s.mixinColorAndOpacity(o,i);return r&&(n[0]*=r,n[1]*=r,n[2]*=r,n[3]*=r),e?new e(n):n},e.prototype._getStageIdHint=function(){return this._context.layer.id+"_symbol"},e.prototype.isFastUpdatesEnabled=function(){return this._fastUpdates&&this._fastUpdates.enabled},e.prototype.setDrawOrder=function(t,e,r){this._material&&(this._material.setRenderPriority(t),r[this._material.getId()]=!0)},e.prototype.createGraphics3DGraphic=function(t,e){for(var r=[],o=2;o<arguments.length;o++)r[o-2]=arguments[o];throw new Error("This is an abstract base class")},e.prototype.destroy=function(){throw new Error("This is an abstract base class")},e.prototype.layerPropertyChanged=function(t,e,r){return!1},e.prototype.applyRendererDiff=function(t,e,r,o){return!1},e.prototype._getFastUpdateAttrValues=function(t){if(!this._fastUpdates.enabled)return null;var e=this._fastUpdates.visualVariables,r=e.size?f(e.size.field,t):0,o=e.color?f(e.color.field,t):0,i=e.rotation?c(e.rotation,t):0;return[r,o,i,0]},e}(i.Promise),_={mode:a.MODES.ON_THE_GROUND,offset:0},v={mode:a.MODES.ABSOLUTE_HEIGHT,offset:0};return h});