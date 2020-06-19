var e=function(){var e=null,t=null,n=null,o=null,r=null,i=function(){return null==o&&$.ajax({method:"POST",url:"https://gis5.stuttgart.de/geoline/geoline.config/config.aspx",data:{v:"@version@",epsg:e,url:location.href},dataType:"json",async:!1,cache:!1,success:function(e){e.ags_hosts=$.map(e.ags_services,function(e){return e.ags_host}),o=e},error:function(e,t){console.error("OHOH",e,t)}}),o},a=function(n,o,r,a){$.ajax({url:n+"?f=json",type:"POST",dataType:"jsonp",success:function(c){try{if(void 0!==c.error)return void console.warn("Eigenschaften des Kartendienstes "+n+" konnten nicht abgerufen werden.",c.error);var u=new URL(n);if(jQuery.inArray(u.hostname,i().ags_hosts)>-1&&(null!=c.copyrightText&&0!=c.copyrightText.length||(c.copyrightText="© Stadtmessungsamt, LHS Stuttgart")),u.hostname.indexOf("arcgisonline.com")>-1||u.hostname.indexOf("arcgis.com")>-1){var d=$.grep(t.getControls().getArray(),function(e,t){return ol.control.Attribution.prototype.isPrototypeOf(e)})[0];d.setCollapsible(!1),d.setCollapsed(!1)}if(10.05==c.currentVersion&&null==c.spatialReference.latestWkid)switch(c.spatialReference.wkid){case 102100:c.spatialReference.latestWkid=3857}e!="EPSG:"+c.spatialReference.wkid&&e!="EPSG:"+c.spatialReference.latestWkid&&console.warn("Projektion der Karte und des Kartendienstes stimmen nicht überein. Karte: "+e+", Kartendienst: EPSG:",c.spatialReference.wkid+" / EPSG:"+c.spatialReference.latestWkid,n),1==c.singleFusedMapCache?s(n,o,r,c,a):l(n,o,r,c,a)}catch(e){console.error("Fehler beim Initalisieren des Layers "+n,e)}},error:function(e,t){console.error("OHOH",e,t)}})},s=function(e,o,a,s,l){var c=[];$.each(s.tileInfo.lods,function(e,t){c.push(t.resolution)});var u,d=new ol.tilegrid.TileGrid({origin:[s.tileInfo.origin.x,s.tileInfo.origin.y],extent:[s.fullExtent.xmin,s.fullExtent.ymin,s.fullExtent.xmax,s.fullExtent.ymax],minZoom:0,resolutions:c,tileSize:[s.tileInfo.rows,s.tileInfo.cols]});t.getView().getProjection().getCode()!=u&&($.extend(!0,n,{resolutions:c}),t.setView(new ol.View(n))),u=null!=s.spatialReference.latestWkid?s.spatialReference.latestWkid:s.spatialReference.wkid;var g={minZoom:"0"},f={tileGrid:d,projection:ol.proj.get("EPSG:"+u),attributions:s.copyrightText,url:e+"/tile/{z}/{y}/{x}"};null!=r&&(f.tileLoadFunction=r),$.extend(!0,g,a,f);var p=10,h=new URL(e);jQuery.inArray(h.hostname,i().ags_hosts)>-1&&(p=20);var y={zIndex:p},m={source:new ol.source.XYZ(g)};$.extend(!0,y,o,m);var v=new ol.layer.Tile(y);t.addLayer(v),"function"==typeof l&&l(v)},l=function(e,n,o,r,a){var s={params:{layers:"show:0"}},l={ratio:1,url:e,attributions:[new ol.Attribution({html:r.copyrightText})]};$.extend(!0,s,o,l);var c=40,u=new URL(e);jQuery.inArray(u.hostname,i().ags_hosts)>-1&&(c=50);var d={zIndex:c},g={source:new ol.source.ImageArcGISRest(s)};$.extend(!0,d,n,g);var f=new ol.layer.Image(d);t.addLayer(f),"function"==typeof a&&a(f)};this.initMap=function(i,a,s,l){ol.proj.addProjection(new ol.proj.Projection({code:"EPSG:25832",units:"m"})),ol.proj.addProjection(new ol.proj.Projection({code:"EPSG:31467",units:"m"})),e="EPSG:"+i,null==ol.proj.get(e)&&console.error("Projektion "+e+" nicht gefunden. Es kann zu falscher Darstellung der Karte kommen"),null!=l&&null!=l.tileLoadFunction&&(r=l.tileLoadFunction),null!=l&&null!=l.config&&(console.warn("Konfiguration wurde manuell gesetzt und wird nicht vom Server des Stadtmessungamtes geladen. Bitte stellen Sie sicher, dass die Konfiguration immer aktuell ist."),o=l.config);var c={target:"map",controls:ol.control.defaults({attribution:!0,attributionOptions:{tipLabel:"Copyright"}})};if($.extend(!0,c,a,{logo:!1,pixelRatio:1,loadTilesWhileAnimating:!0,loadTilesWhileInteracting:!0}),null!=c.controls){var u=!1;c.controls.forEach(function(e,t){ol.control.Attribution.prototype.isPrototypeOf(e)&&(u=!0)}),0==u&&c.controls.push(new ol.control.Attribution({tipLabel:"Copyright"}))}n=$.extend(!0,{},{center:[513785,5402232],zoom:2},s,{projection:ol.proj.get(e)}),t=new ol.Map(c),$(".ol-viewport").on("contextmenu",function(e){e.preventDefault()}),t.updateSize()},this.addEsriLayer=function(e,t,n,o){var r=new URL(e);jQuery.inArray(r.hostname,i().ags_hosts)>-1?console.error("Kartendienste des Stadtmessungsamtes über die Methode addStmaEsriLayer hinzufügen"):a(e,t,n,o)},this.addStmaEsriLayer=function(e,t,n,o){a("https://"+i().ags_host+"/"+i().ags_instance+"/rest/services/"+e+"/MapServer",t,n,o)},this.addStmaBaseLayer=function(e,t,n,o){null!=i().ags_services[e]?a("https://"+i().ags_services[e].ags_host+"/"+i().ags_services[e].ags_instance+"/rest/services/"+i().ags_services[e].ags_service+"/MapServer",t,n,o):console.error("Karte '"+e+"' nicht gefunden")},this.addPoints=function(e,n,o){for(var r=[],i=0;i<e.length;i++)r.push(new ol.Feature({geometry:new ol.geom.Point(e[i])}));var a=new ol.layer.Vector({zIndex:60,source:new ol.source.Vector({features:r}),style:new ol.style.Style({image:new ol.style.Icon({anchor:[.5,1],src:n})})});t.addLayer(a),"function"==typeof o&&o(a)},this.addStmaEsriFeatureLayer=function(n,o,r,a){var s=e.replace("EPSG:","");console.warn("_epsgCode: "+s);var l=new ol.format.EsriJSON,c=new ol.source.Vector({loader:function(e,t,r){var a="https://"+i().ags_host+"/"+i().ags_instance+"/rest/services/"+n+"/MapServer/"+o+"/query/",u={f:"json",returnGeometry:!0,spatialRel:"esriSpatialRelIntersects",geometry:encodeURIComponent('{"xmin":'+e[0]+',"ymin":'+e[1]+',"xmax":'+e[2]+',"ymax":'+e[3]+',"spatialReference":{"wkid":'+s+"}}"),geometryType:"esriGeometryEnvelope",inSR:s,outFields:"*",outSR:s};$.ajax({method:"POST",url:a,data:u,dataType:"jsonp",success:function(e){if(e.error)alert(e.error.message+"\n"+e.error.details.join("\n"));else{var t=l.readFeatures(e,{featureProjection:r});t.length>0&&c.addFeatures(t)}}})},strategy:ol.loadingstrategy.tile(ol.tilegrid.createXYZ({tileSize:512}))}),u=new ol.layer.Vector({zIndex:60,source:c,style:r});t.addLayer(u),"function"==typeof a&&a(u)},this.getMap=function(){return t},this.getConfig=function(){return i()}};export{e as stma_openlayers};
//# sourceMappingURL=geoline.ol.ol.module.js.map
