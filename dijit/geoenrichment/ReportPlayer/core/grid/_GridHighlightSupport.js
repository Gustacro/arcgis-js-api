// COPYRIGHT © 201 Esri
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
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.

define(["dojo/_base/declare","dojo/on","dojo/dom-class","dojo/dom-geometry","esri/dijit/geoenrichment/utils/MouseUtil","./coreUtils/GridQueryUtil"],function(e,o,i,r,n,d){return e(null,{_highlightRowsOnHoverHandle:null,_setHighlightRowsOnHoverAttr:function(e){if(this._highlightRowsOnHoverHandle&&this._highlightRowsOnHoverHandle.remove(),this._highlightRowsOnHoverHandle=null,e){var r=this;this._highlightRowsOnHoverHandle=o(this.domNode,"mouseover",function(){var e=o(document.body,"mousemove",function(o){var t;if(r.getFieldCells().forEach(function(e){i.remove(e.domNode,"gridCellOver"),n.isMouseOver(e&&e.domNode)&&(t=e)}),!t)return void e.remove();var l=d.queryCells(r,{rowIndex:t.gridData.index});l&&l.forEach(function(e){i.add(e.domNode,"gridCellOver")})})})}}})});