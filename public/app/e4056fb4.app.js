"use strict";angular.module("killmenos9App",["ngCookies","ngResource","ngSanitize","ngRoute","cfp.hotkeys","ngDialog"]).config(["$routeProvider","$locationProvider",function(a,b){a.otherwise({redirectTo:"/"}),b.html5Mode(!0)}]),angular.module("killmenos9App").controller("MainCtrl",["$scope","$http","$timeout","$window","$interval","$sce","hotkeys","$routeParams","ngDialog",function(a,b,c,d,e,f,g,h,i){function j(){for(var b=a.listaPalabras.length-1;b>=0;b--)g.add({combo:a.listaPalabras[b].letra,description:a.listaPalabras[b],callback:function(b,c){c.description.clase="metadato-activo",a.buscarPatron(c.description.name)}})}function k(b){a.errorMesaje='<p class="mensaje-modal">'+b+"<span>|</span></p>";i.open({template:"errorKill",className:"ngdialog-theme-kill",scope:a}),c(function(){d.location.reload()},5500)}function l(d){var e=[];b.get("/api/patron/"+d).success(function(b){0==b.length&&k("KILL -9 PALABRAS NO COMBINADAS, REBOOT...");for(var d=b.length-1;d>=0;d--)e.push(b[d].id);a.porcentaje=100,a.listaUsuarios=b,a.msg="<p>ANALIZANDO TWEETS<span>|</span></p>";c(function(){a.msg="<p>COMPARANDO TWEETS CON NUESTRO ALGORITMO, BUSCANDO COINCIDENCIAS <span>|</span></p>";c(function(){m(e)},7e3)},7e3)})}function m(d){b.get("/api/recogerTweets/"+d).success(function(b){if(a.resultadoAlgoritmo=b,a.total=b.length,0==b.length)k("KILL-9 NO MATCH REBOOT...");else{a.msg="<p>KILL-9 GENERANDO LISTA DE OBJETIVOS <span>|</span></p>";{c(function(){a.msg="<p>KILL-9 ENVIANDO DRON HACIA EL OBJETIVO<span>|</span></p>"},9e3),c(function(){a.videoObjeto=f.trustAsHtml('<img src="/assets/video/dron.gif" width="374px">')},8e3)}}c(function(){a.objetivos=b},9e3)})}a.listaPalabras=[{name:"pamplona",id:1,clase:"metadato-palabra",letra:"a"},{name:"desahucios",id:2,clase:"metadato-palabra",letra:"s"},{name:"crisis",id:3,clase:"metadato-palabra",letra:"d"},{name:"ramplona",id:5,clase:"metadato-palabra",letra:"f"},{name:"madrid",id:6,clase:"metadato-palabra",letra:"g"}],a.listaUsuarios=[],a.selection=[],a.resultadoAlgoritmo=[],a.objetivos=[],a.porcentaje=0,a.controlEjecutar=0;c(function(){k("KILL -9 SESION TERMINADA: MANTENIMIENTO")},3e5);b.get("/api/estado/cambiar").success(function(a){console.log(a)}),j(),g.add({combo:"z",description:"ejecutar",callback:function(){a.ejecutar()}}),g.add({combo:"c",description:"reset",callback:function(){a.reset()}}),g.add({combo:"x",description:"misil",callback:function(){a.misil()}}),a.misil=function(){k('ERROR BOTON MISIL ACTIVADO, DESACTIVAR<br><div class="img-center"><img src="assets/images/missile-error-verde.gif"></div>')},a.reset=function(){k("ERROR DEMASIADAS SELECCIONES")},a.msg="<p>MSG<span>_</span></p>";var n;a.contadorPorcentaje=function(){angular.isDefined(n)||(n=e(function(){100!=a.porcentaje?a.porcentaje=a.porcentaje+2:a.stopContadorPorcentaje()},100))},a.stopContadorPorcentaje=function(){angular.isDefined(n)&&(e.cancel(n),n=void 0)},a.$on("$destroy",function(){a.stopContadorPorcentaje()}),a.buscarPatron=function(b){var d=(c(function(){a.contadorPorcentaje()},1500),a.selection.indexOf(b));if(d>-1?a.selection.splice(d,1):a.selection.push(b),a.selection.length>=4)k("KILL-9 ERROR MIN 4 WORD, REBOOT...");else{a.msg="<p>LOCALIZANDO USUARIOS QUE HAN USADO LAS PALABRAS SELECCIONADAS <span>_</span> </p>";{c(function(){l(a.selection)},7e3)}}},a.ejecutar=function(){if(0==a.controlEjecutar)if(a.ejecutar=1,0==a.objetivos.length){a.textoBuscando="<p>KILL-9 ERROR NO TARGET, REBOOT.. <span>|</span></p>";{c(function(){d.location.reload()},4e3)}}else{var b=Math.floor(Math.random()*a.objetivos.length+0);a.msg="<p>KILL-9 OBJETIVO SELECIONADO <span>|</span></p>";{c(function(){a.objetivos[b].clase="blink eliminar"},5e3),c(function(){a.generarImagen(a.objetivos[b])},5e3)}}},a.generarImagen=function(d){angular.toJson(d);b.get("/api/images/crear",{params:{name:d.name,id:d.id,fraseOrig:d.fraseOrig,palabras:d.palabras,patron:a.selection,fecha:d.fecha}}).success(function(b){a.notificacionImg=b.name;c(function(){i.open({template:"notificacion",overlay:!1,showClose:!1,className:"ngdialog-theme-notificacion",scope:a})},2e3),c(function(){k("KILL -9 SESION TERMINADA: REINICIO")},1e4)})}}]),angular.module("killmenos9App").config(["$routeProvider",function(a){a.when("/",{templateUrl:"app/main/main.html",controller:"MainCtrl"})}]),angular.module("killmenos9App").controller("NavbarCtrl",["$scope","$location",function(a,b){a.menu=[{title:"Home",link:"/"}],a.isCollapsed=!0,a.isActive=function(a){return a===b.path()}}]),angular.module("killmenos9App").run(["$templateCache",function(a){a.put("app/main/main.html",'<script type=text/ng-template id=errorKill><div>\n    <div class="titulo-container"><h3>KILL -9 ERROR</h3></div>\n    <div class="monk"></div>\n    <div class="intro-uno texto-modal" ng-bind-html="errorMesaje"></div>\n  </div></script><script type=text/ng-template id=notificacion><div class="notificacion">\n  <img src="/assets/images/notificaciones/{{notificacionImg}}.png">\n  </div></script><div class=wrapper ng-keydown=myFunct($event)><div class=super-container><div class=header><img src=/assets/images/kill-logo.png></div><div class=intro><!-- <h2>Seleccion de objetivos<h2> --><div class=intro-dos ng-bind-html=msg></div></div><!-- box left --><div class=box><div class=titulo-container><h3>Metadatos</h3></div><div class=monk></div><ul class=metadatos ng-repeat="palabras in listaPalabras"><li class={{palabras.clase}}>{{$index+1}} > {{palabras.name}}</li></ul><div class=titulo-container><h3>Buscando objetivos</h3></div><div class=monk></div><div class=divide-10></div><!-- empieza buscando objetivos --><div class=buscando-objetivos><div class=row><div ng-show=!listaUsuarios.length class=intro-uno><div class=intro-uno ng-bind-html=textoBuscando></div></div><div class=col-sm-2 ng-repeat="usuario in listaUsuarios"><img id={{usuario.id}} src={{usuario.img}} class="thumbnail img-objetivos img-responsive magictime puffIn"></div></div><div class="texto-pie pull-right">BUSCANDO {{porcentaje}}%</div></div><!-- fin de buscando objetivos --><div class=divide-50></div><div class=analizando-datos><div class=titulo-container><h3>Analizando datos</h3></div><div class=monk></div><!-- Objeto twitter --><div ng-show=!resultadoAlgoritmo.length class=intro-uno><div class=intro-uno ng-bind-html=textoAlgoritmo></div></div><div class=media ng-repeat="res in resultadoAlgoritmo"><div class="media-left magictime puffIn"><img class=media-object src={{res.img}}></div><div class="media-body analizando-texto" ng-bind-html=res.text></div></div><!-- fin de objeto twitter --><div class=analizando-footer></div><div class="texto-pie pull-right">coincidencias: {{total}}</div></div></div><!-- fin box left --><div class=divide-pantalla></div><!-- box rigth --><div class=box><div class=titulo-container><h3>Objetivo confirmados</h3></div><div class=monk></div><div class=objetivo-wrapper><!-- Objetivo --><div class=intro-uno ng-bind-html=textoResultadoFin></div><div ng-show=!objetivos.length class=intro-uno><div class=intro-uno ng-bind-html=textoObjetivos></div></div><div class=media ng-repeat="blanco in objetivos"><div class="media-left magictime puffIn"><div class=objetivo-img><div class=objetivo-img-wrapper><img class=media-object src={{blanco.img}}></div></div></div><div class="media-body objetivo-texto"><p>@{{blanco.name}}</p><p>confirmacion: 100%</p><p><span class={{blanco.clase}}>eliminar</span></p></div></div><!-- fin de objetivo--></div><div class=titulo-container><h3>DRONE VISION</h3></div><div ng-show=!objetivos.length class=intro-uno><div class=intro-uno ng-bind-html=textoDrone></div></div><div class=drone-vision ng-bind-html=videoObjeto></div></div><!-- fin box rigth --></div></div>'),a.put("components/navbar/navbar.html",'<div class="navbar navbar-default navbar-static-top" ng-controller=NavbarCtrl><div class=container><div class=navbar-header><button class=navbar-toggle type=button ng-click="isCollapsed = !isCollapsed"><span class=sr-only>Toggle navigation</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button> <a href="/" class=navbar-brand>killmenos9</a></div><div collapse=isCollapsed class="navbar-collapse collapse" id=navbar-main><ul class="nav navbar-nav"><li ng-repeat="item in menu" ng-class="{active: isActive(item.link)}"><a ng-href={{item.link}}>{{item.title}}</a></li></ul></div></div></div>')}]);