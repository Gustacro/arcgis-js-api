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
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.

define(["../../declare","dojox/mvc/Templated","dojo/text!./templates/BufferOptions.html","dojo/i18n!../../nls/jsapi","../../tasks/geoenrichment/RingBuffer","../../tasks/geoenrichment/DriveBuffer","../../tasks/geoenrichment/DriveUnits","./NumberSpinner","dijit/form/Select"],function(e,i,t,s,n,a,r){return s=s.geoenrichment.dijit.BufferOptions,e("esri.dijit.geoenrichment.BufferOptions",[i],{templateString:t,nls:s,geomType:"",_distRadius:null,_timeRadius:null,buildRendering:function(){function e(e){i.push({value:e,label:s.units[e]})}this.inherited(arguments);var i=[];e(r.MILES),e(r.KILOMETERS),e(r.FEET),e(r.METERS),this.unitsSelect.set("options",i),this._updateUI("Ring",1,r.MILES)},_setGeomTypeAttr:function(e){switch(e){case"point":this.radiusTr.style.display=this.studyAreaTr.style.display="";break;case"polyline":this.studyAreaTr.style.display="none",this.radiusTr.style.display="",this.radiusLabel.innerHTML=s.buffer;break;case"polygon":this.radiusTr.style.display=this.studyAreaTr.style.display="none",this.radiusLabel.innerHTML=s.buffer}this.geomType=e},_getBufferAttr:function(){var e=this._getRadius(),i=this.unitsSelect.get("value");switch(this.typeSelect.get("value")){case"Ring":return new n({radius:e,units:i});case"DriveTime":return new a({radius:e});case"DriveDistance":return new a({radius:e,units:i})}},_setBufferAttr:function(e){if(this._buffer!==e){var i,t=e.radii[0];if(e instanceof n)i="Ring",this._distRadius=t;else{if(!(e instanceof a))throw new Error("Unexpected buffer type");e.units==r.MINUTES?(i="DriveTime",this._timeRadius=t):(i="DriveDistance",this._distRadius=t)}this._updateUI(i,t,e.units)}},_getRadius:function(){switch(this.typeSelect.get("value")){case"Ring":case"DriveDistance":if(this._distRadius)return this._distRadius;break;case"DriveTime":return this._timeRadius||5}switch(this.unitsSelect.get("value")){case r.MILES:case r.KILOMETERS:return 1;case r.FEET:return 1500;case r.METERS:return 500}},_updateUI:function(e,i,t){e?this.typeSelect.set("value",e):e=this.typeSelect.get("value"),i?this.radiusSpinner.set("value",i):i=this.radiusSpinner.get("value"),t?this.unitsSelect.set("value",t):t=this.unitsSelect.get("value"),"DriveTime"===e?(this.minutesSpan.style.display="",this.unitsSelect.domNode.style.display="none"):(this.minutesSpan.style.display="none",this.unitsSelect.domNode.style.display="");var s,n;if("DriveTime"===e)s=1,n=300;else{var a="Ring"===e;switch(t){case r.MILES:s=.25,n=a?1e3:300;break;case r.KILOMETERS:s=.4,n=a?1600:450;break;case r.FEET:s=1300,n=a?528e4:15e5;break;case r.METERS:s=400,n=a?1609e3:45e4}}this.radiusSpinner.set("constraints",{min:s,max:n}),i<s?this.radiusSpinner.set("value",s):i>n&&this.radiusSpinner.set("value",n)},_typeChange:function(e){this._updateUI(null,this._getRadius(),null)},_unitsChange:function(){this._updateUI(null,null,null),this._onChange()},_radiusChange:function(){if(this.radiusSpinner.isValid()){var e=this.radiusSpinner.get("value");switch(this.typeSelect.get("value")){case"Ring":case"DriveDistance":this._distRadius=e;break;case"DriveTime":this._timeRadius=e}this._onChange()}else this._onError()},_onChange:function(){this.onChange()},onChange:function(){},_onError:function(){this.onError()},onError:function(){}})});