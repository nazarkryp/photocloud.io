webpackJsonp([1],{

/***/ "../../../../../src async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../../../../src async recursive";

/***/ }),

/***/ "../../../../../src/app/app-material/app-material.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("../../../material/@angular/material.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppMaterialModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AppMaterialModule = (function () {
    function AppMaterialModule() {
    }
    return AppMaterialModule;
}());
AppMaterialModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["a" /* MdToolbarModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["b" /* MdButtonModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["c" /* MdRippleModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["d" /* MdCardModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["e" /* MdIconModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["f" /* MdTooltipModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["g" /* MdMenuModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["h" /* MdInputModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["i" /* MdProgressBarModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["j" /* MdDialogModule */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["a" /* MdToolbarModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["b" /* MdButtonModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["c" /* MdRippleModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["d" /* MdCardModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["e" /* MdIconModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["f" /* MdTooltipModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["g" /* MdMenuModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["h" /* MdInputModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["i" /* MdProgressBarModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["j" /* MdDialogModule */]
        ]
    })
], AppMaterialModule);

//# sourceMappingURL=app-material.module.js.map

/***/ }),

/***/ "../../../../../src/app/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_posts_posts_component__ = __webpack_require__("../../../../../src/app/components/posts/posts.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_user_posts_user_posts_component__ = __webpack_require__("../../../../../src/app/components/user-posts/user-posts.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_signin_signin_component__ = __webpack_require__("../../../../../src/app/components/signin/signin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_not_found_not_found_component__ = __webpack_require__("../../../../../src/app/components/not-found/not-found.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__infrastructure_guards_authentication_guard_service__ = __webpack_require__("../../../../../src/app/infrastructure/guards/authentication-guard.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_2__components_posts_posts_component__["a" /* PostsComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_6__infrastructure_guards_authentication_guard_service__["a" /* AuthenticationGuard */]]
    },
    {
        path: 'signin',
        component: __WEBPACK_IMPORTED_MODULE_4__components_signin_signin_component__["a" /* SigninComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_6__infrastructure_guards_authentication_guard_service__["a" /* AuthenticationGuard */]]
    },
    {
        path: '404',
        component: __WEBPACK_IMPORTED_MODULE_5__components_not_found_not_found_component__["a" /* NotFoundComponent */]
    },
    {
        path: ':username',
        component: __WEBPACK_IMPORTED_MODULE_3__components_user_posts_user_posts_component__["a" /* UserPostsComponent */]
    }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forRoot(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */]]
    })
], AppRoutingModule);

//# sourceMappingURL=app-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<app-navbar></app-navbar>\r\n<router-outlet></router-outlet>"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app';
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_routing_module__ = __webpack_require__("../../../../../src/app/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_material_app_material_module__ = __webpack_require__("../../../../../src/app/app-material/app-material.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_flex_layout__ = __webpack_require__("../../../flex-layout/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_posts_posts_component__ = __webpack_require__("../../../../../src/app/components/posts/posts.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_navbar_navbar_component__ = __webpack_require__("../../../../../src/app/components/navbar/navbar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_post_post_component__ = __webpack_require__("../../../../../src/app/components/post/post.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_signin_signin_component__ = __webpack_require__("../../../../../src/app/components/signin/signin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_user_posts_user_posts_component__ = __webpack_require__("../../../../../src/app/components/user-posts/user-posts.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_not_found_not_found_component__ = __webpack_require__("../../../../../src/app/components/not-found/not-found.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_shared_post_details_post_details_component__ = __webpack_require__("../../../../../src/app/components/shared/post-details/post-details.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_shared_comments_comments_component__ = __webpack_require__("../../../../../src/app/components/shared/comments/comments.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__services_post_service__ = __webpack_require__("../../../../../src/app/services/post.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__services_user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__services_account_service__ = __webpack_require__("../../../../../src/app/services/account.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__infrastructure_services_current_user_service__ = __webpack_require__("../../../../../src/app/infrastructure/services/current-user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__infrastructure_guards_authentication_guard_service__ = __webpack_require__("../../../../../src/app/infrastructure/guards/authentication-guard.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__infrastructure_session_session_service__ = __webpack_require__("../../../../../src/app/infrastructure/session/session.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__infrastructure_security_token_service__ = __webpack_require__("../../../../../src/app/infrastructure/security/token.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__infrastructure_communication_http__ = __webpack_require__("../../../../../src/app/infrastructure/communication/http.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__infrastructure_communication_communication_service__ = __webpack_require__("../../../../../src/app/infrastructure/communication/communication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__infrastructure_mapping_token_mapper__ = __webpack_require__("../../../../../src/app/infrastructure/mapping/token.mapper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__infrastructure_mapping_user_mapper__ = __webpack_require__("../../../../../src/app/infrastructure/mapping/user.mapper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27_time_ago_pipe__ = __webpack_require__("../../../../time-ago-pipe/time-ago-pipe.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27_time_ago_pipe___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_27_time_ago_pipe__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pipes_relationship_action_pipe__ = __webpack_require__("../../../../../src/app/pipes/relationship-action.pipe.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





























var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_8__components_posts_posts_component__["a" /* PostsComponent */],
            __WEBPACK_IMPORTED_MODULE_9__components_navbar_navbar_component__["a" /* NavbarComponent */],
            __WEBPACK_IMPORTED_MODULE_10__components_post_post_component__["a" /* PostComponent */],
            __WEBPACK_IMPORTED_MODULE_27_time_ago_pipe__["TimeAgoPipe"],
            __WEBPACK_IMPORTED_MODULE_11__components_signin_signin_component__["a" /* SigninComponent */],
            __WEBPACK_IMPORTED_MODULE_12__components_user_posts_user_posts_component__["a" /* UserPostsComponent */],
            __WEBPACK_IMPORTED_MODULE_13__components_not_found_not_found_component__["a" /* NotFoundComponent */],
            __WEBPACK_IMPORTED_MODULE_14__components_shared_post_details_post_details_component__["a" /* PostDetailsComponent */],
            __WEBPACK_IMPORTED_MODULE_28__pipes_relationship_action_pipe__["a" /* RelationshipActionPipe */],
            __WEBPACK_IMPORTED_MODULE_15__components_shared_comments_comments_component__["a" /* CommentsComponent */]
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_14__components_shared_post_details_post_details_component__["a" /* PostDetailsComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_4__app_routing_module__["a" /* AppRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_5__app_material_app_material_module__["a" /* AppMaterialModule */],
            __WEBPACK_IMPORTED_MODULE_6__angular_flex_layout__["a" /* FlexLayoutModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_16__services_post_service__["a" /* PostService */],
            __WEBPACK_IMPORTED_MODULE_17__services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_18__services_account_service__["a" /* AccountService */],
            __WEBPACK_IMPORTED_MODULE_19__infrastructure_services_current_user_service__["a" /* CurrentUserService */],
            __WEBPACK_IMPORTED_MODULE_20__infrastructure_guards_authentication_guard_service__["a" /* AuthenticationGuard */],
            __WEBPACK_IMPORTED_MODULE_21__infrastructure_session_session_service__["a" /* SessionService */],
            __WEBPACK_IMPORTED_MODULE_22__infrastructure_security_token_service__["a" /* TokenService */],
            __WEBPACK_IMPORTED_MODULE_23__infrastructure_communication_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_24__infrastructure_communication_communication_service__["a" /* CommunicationService */],
            __WEBPACK_IMPORTED_MODULE_25__infrastructure_mapping_token_mapper__["a" /* TokenMapper */],
            __WEBPACK_IMPORTED_MODULE_26__infrastructure_mapping_user_mapper__["a" /* UserMapper */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/common/models/collection-model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CollectionModel; });
var CollectionModel = (function () {
    function CollectionModel() {
    }
    return CollectionModel;
}());

//# sourceMappingURL=collection-model.js.map

/***/ }),

/***/ "../../../../../src/app/common/models/current-user.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CurrentUser; });
var CurrentUser = (function () {
    function CurrentUser() {
    }
    return CurrentUser;
}());

//# sourceMappingURL=current-user.js.map

/***/ }),

/***/ "../../../../../src/app/common/models/post.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Post; });
var Post = (function () {
    function Post() {
        this.activeAttachment = 0;
    }
    return Post;
}());

//# sourceMappingURL=post.js.map

/***/ }),

/***/ "../../../../../src/app/common/models/relationship-status.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RelationshipStatus; });
var RelationshipStatus;
(function (RelationshipStatus) {
    RelationshipStatus[RelationshipStatus["None"] = 1] = "None";
    RelationshipStatus[RelationshipStatus["Following"] = 2] = "Following";
    RelationshipStatus[RelationshipStatus["Requested"] = 3] = "Requested";
    RelationshipStatus[RelationshipStatus["Blocked"] = 4] = "Blocked";
})(RelationshipStatus || (RelationshipStatus = {}));
//# sourceMappingURL=relationship-status.js.map

/***/ }),

/***/ "../../../../../src/app/common/models/token.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccessToken; });
var AccessToken = (function () {
    function AccessToken() {
    }
    return AccessToken;
}());

//# sourceMappingURL=token.js.map

/***/ }),

/***/ "../../../../../src/app/common/models/user.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
var User = (function () {
    function User() {
    }
    return User;
}());

//# sourceMappingURL=user.js.map

/***/ }),

/***/ "../../../../../src/app/components/navbar/navbar.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".navbar {\r\n    background-color: white;\r\n}\r\n\r\n.logo {\r\n    font-weight: 300;\r\n    font-size: 24px;\r\n    cursor: pointer;\r\n    outline: none;\r\n}\r\n\r\n.avatar {\r\n    width: 40px;\r\n    height: 40px;\r\n    border-radius: 90px;\r\n    -o-object-fit: cover;\r\n       object-fit: cover;\r\n    cursor: pointer;\r\n    outline: none;\r\n}\r\n\r\n.toolbar-tools {\r\n    -webkit-box-flex: 1;\r\n        -ms-flex: 1 1 auto;\r\n            flex: 1 1 auto;\r\n}\r\n\r\n.progress-bar {\r\n    height: 3px;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/navbar/navbar.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- <md-progress-bar class=\"progress-bar\" color=\"warn\" [value]=\"value\"></md-progress-bar>  -->\r\n<md-toolbar class=\"navbar z-depth-1\">\r\n    <div class=\"toolbar-tools\" fxLayout=\"row\" fxLayoutAlign=\"center center\">\r\n        <div class=\"container\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\r\n            <h1 class=\"logo\" routerLink=\"/\">photocloud</h1>\r\n            <!-- <img class=\"avatar\" [routerLink]=\"['/', accessToken.username]\" src=\"{{accessToken.pictureUri}}\" alt=\"user\" *ngIf=\"accessToken\"> -->\r\n            <img class=\"avatar\" (click)='navigateToProfile()' src=\"{{accessToken.pictureUri}}\" alt=\"user\" *ngIf=\"accessToken\">\r\n        </div>\r\n    </div>\r\n</md-toolbar>\r\n"

/***/ }),

/***/ "../../../../../src/app/components/navbar/navbar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_account_service__ = __webpack_require__("../../../../../src/app/services/account.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__infrastructure_communication_communication_service__ = __webpack_require__("../../../../../src/app/infrastructure/communication/communication.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavbarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NavbarComponent = (function () {
    function NavbarComponent(communicationService, accountService, router) {
        this.communicationService = communicationService;
        this.accountService = accountService;
        this.router = router;
    }
    NavbarComponent.prototype.navigateToProfile = function () {
        var currentUser = this.accountService.getCurrentUser();
        // this.router.navigateByUrl(`${currentUser.username}`);
        this.router.navigate(["" + currentUser.username]);
    };
    NavbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.communicationService
            .getState()
            .subscribe(function (accessToken) {
            _this.accessToken = accessToken;
        });
    };
    NavbarComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    return NavbarComponent;
}());
NavbarComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-navbar',
        template: __webpack_require__("../../../../../src/app/components/navbar/navbar.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/navbar/navbar.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__infrastructure_communication_communication_service__["a" /* CommunicationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__infrastructure_communication_communication_service__["a" /* CommunicationService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_account_service__["a" /* AccountService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_account_service__["a" /* AccountService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _c || Object])
], NavbarComponent);

var _a, _b, _c;
//# sourceMappingURL=navbar.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/not-found/not-found.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".content {\r\n    height: calc(100vh - 75px);\r\n    position: relative;\r\n}\r\n\r\na {\r\n    text-decoration: none;\r\n    color: deeppink;\r\n}\r\n\r\n.error {\r\n    position: absolute;\r\n    top: 150px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/not-found/not-found.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"content\" fxLayout=\"row\" fxLayoutAlign=\"center start\">\n    <div class=\"error\" fxLayout=\"column\" fxLayoutAlign=\"center center\">\n        <span class=\"mat-headline\">Sorry, this page isn't available.</span>\n        <p>The link you followed may be broken, or the page may have been removed. Go back to <a routerLink=\"/\">PhotoCloud</a>.</p>\n    </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/components/not-found/not-found.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotFoundComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NotFoundComponent = (function () {
    function NotFoundComponent() {
    }
    NotFoundComponent.prototype.ngOnInit = function () {
    };
    return NotFoundComponent;
}());
NotFoundComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-not-found',
        template: __webpack_require__("../../../../../src/app/components/not-found/not-found.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/not-found/not-found.component.css")]
    }),
    __metadata("design:paramtypes", [])
], NotFoundComponent);

//# sourceMappingURL=not-found.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/post/post.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "a {\r\n    text-decoration: none;\r\n    color: inherit;\r\n}\r\n\r\nhr {\r\n    display: block;\r\n    margin-top: 0px;\r\n    margin-bottom: 0px;\r\n    margin-left: 15px;\r\n    margin-right: 15px;\r\n    border-top: 1px solid #d8d8d8;\r\n}\r\n\r\n.post {\r\n    background-color: white;\r\n    margin-bottom: 50px;\r\n    position: relative;\r\n    border-radius: 2px;\r\n    /*border: 1px solid #d8d8d8;*/\r\n}\r\n\r\n.post-header {\r\n    padding: 10px;\r\n}\r\n\r\n.post-footer {\r\n    padding: 15px;\r\n}\r\n\r\n.post-caption {\r\n    padding: 10px 0 10px 0;\r\n    line-height: 1.6em;\r\n}\r\n\r\n.post-actions {\r\n    padding: 10px;\r\n}\r\n\r\n.post-avatar {\r\n    width: 50px;\r\n    height: 50px;\r\n    border-radius: 90px;\r\n    -o-object-fit: cover;\r\n       object-fit: cover;\r\n    outline: none;\r\n}\r\n\r\n.post-author {\r\n    padding-left: 10px;\r\n}\r\n\r\n.attachment {\r\n    width: 100%;\r\n    height: auto;\r\n    vertical-align: bottom;\r\n    pointer-events: none;\r\n    user-select: none;\r\n    -moz-user-select: none;\r\n    -webkit-user-drag: none;\r\n    -webkit-user-select: none;\r\n    -ms-user-select: none;\r\n}\r\n\r\n.comment-input {\r\n    outline: none;\r\n    border: none;\r\n    width: 100%;\r\n}\r\n\r\n.post-content {\r\n    width: 100%;\r\n    position: relative;\r\n    height: auto;\r\n}\r\n\r\n.post-content .post-content-buttons {\r\n    position: absolute;\r\n    opacity: 0;\r\n    top: 50%;\r\n    left: 50%;\r\n    -webkit-transform: translate(-50%, -50%);\r\n            transform: translate(-50%, -50%);\r\n    width: 100%;\r\n    padding: 0 10px 0 10px;\r\n}\r\n\r\n.post-content:not([disabled]):hover .post-content-buttons {\r\n    opacity: 1;\r\n}\r\n\r\n.post-created {\r\n    font-size: 14px;\r\n    color: gray;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/post/post.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"post z-depth-2\">\r\n    <div class=\"post-header\" fxLayout=\"row\">\r\n        <img class=\"post-avatar\" [routerLink]=\"['/', post.user.username]\" src=\"{{post.user.pictureUri}}\" alt=\"profile\">\r\n        <div class=\"post-author\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\" fxFlex>\r\n            <a class=\"mat-body-1\" [routerLink]=\"['/', post.user.username]\">{{post.user.username}}</a>\r\n            <div>\r\n                <button md-icon-button type=\"button\" [mdMenuTriggerFor]=\"menu\">\r\n                <md-icon>expand_more</md-icon>\r\n            </button>\r\n                <md-menu #menu=\"mdMenu\" xPosition=\"before\">\r\n                    <button md-menu-item>\r\n                    <md-icon>edit</md-icon>\r\n                    <span>Edit</span>\r\n                </button>\r\n                    <button md-menu-item>\r\n                    <md-icon>delete</md-icon>\r\n                    <span>Remove</span>\r\n                </button>\r\n                </md-menu>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div md-ripple class=\"post-content\">\r\n        <div class=\"post-content-buttons\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\" *ngIf=\"post.attachments.length > 1\">\r\n            <div>\r\n                <button md-raised-button md-icon-button *ngIf=\"post.activeAttachment > 0\" (click)=\"previous()\">\r\n                    <md-icon class=\"post-icon\">chevron_left</md-icon>\r\n                </button>\r\n            </div>\r\n            <div>\r\n                <button md-raised-button md-icon-button *ngIf=\"post.activeAttachment != post.attachments.length - 1\" (click)=\"next()\">\r\n                    <md-icon class=\"post-icon\">chevron_right</md-icon>\r\n                </button>\r\n            </div>\r\n        </div>\r\n         <img class=\"attachment\" src=\"{{post.attachments[post.activeAttachment].uri}}\" alt=\"post-image\"> \r\n    </div>\r\n    <div class=\"post-footer\">\r\n        <div fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\r\n            <span><strong>{{post.likesCount}} likes</strong></span>\r\n        </div>\r\n        <div class=\"post-caption\">\r\n            <a><strong>{{post.user.username}}</strong></a>\r\n            <span>{{post.caption}}</span>\r\n        </div>\r\n        <div>\r\n            <span class=\"post-created\">{{post.created | timeAgo}}</span>\r\n        </div>\r\n    </div>\r\n    <hr/>\r\n    <div class=\"post-actions\" fxLayout=\"row\">\r\n        <button md-icon-button>\r\n            <md-icon>favorite_border</md-icon>\r\n        </button>\r\n        <input class=\"comment-input\" type=\"text\" placeholder=\"Add comment\" />\r\n        <button md-icon-button mdTooltip=\"Copy to clipboard\" mdTooltipPosition=\"left\">\r\n            <md-icon>share</md-icon>\r\n        </button>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/components/post/post.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_models_post__ = __webpack_require__("../../../../../src/app/common/models/post.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PostComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PostComponent = (function () {
    function PostComponent() {
    }
    PostComponent.prototype.next = function () {
        if (this.post.activeAttachment < this.post.attachments.length - 1) {
            this.post.activeAttachment++;
        }
    };
    PostComponent.prototype.previous = function () {
        if (this.post.activeAttachment > 0) {
            this.post.activeAttachment--;
        }
    };
    PostComponent.prototype.ngOnInit = function () {
        this.post.activeAttachment = 0;
    };
    return PostComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__common_models_post__["a" /* Post */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__common_models_post__["a" /* Post */]) === "function" && _a || Object)
], PostComponent.prototype, "post", void 0);
PostComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-post',
        template: __webpack_require__("../../../../../src/app/components/post/post.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/post/post.component.css")]
    })
], PostComponent);

var _a;
//# sourceMappingURL=post.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/posts/posts.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".posts-container {\r\n    width: 600px;\r\n    margin: 50px 0 50px 0;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/posts/posts.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" fxLayoutAlign=\"start center\" fxFlex>\r\n    <div class=\"posts-container\" *ngIf=\"page\">\r\n        <app-post *ngFor=\"let post of page.data; trackBy: index;\" [post]=\"post\"></app-post>\r\n        <div fxLayout=\"row\" fxLayoutAlign=\"center center\" *ngIf=\"page.hasMoreItems\">\r\n            <button md-raised-button (click)=\"getPosts()\" [disabled]=\"isLoading\">Load More</button>\r\n        </div>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/components/posts/posts.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_post_service__ = __webpack_require__("../../../../../src/app/services/post.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_models_collection_model__ = __webpack_require__("../../../../../src/app/common/models/collection-model.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PostsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



var PostsComponent = (function () {
    function PostsComponent(postService) {
        this.postService = postService;
        this.page = new __WEBPACK_IMPORTED_MODULE_2__common_models_collection_model__["a" /* CollectionModel */]();
        this.isLoading = false;
        this.page.data = new Array();
        this.page.hasMoreItems = false;
    }
    PostsComponent.prototype.getPosts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var page, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isLoading = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, this.postService.getPosts(this.page.pagination)];
                    case 2:
                        page = _a.sent();
                        this.page.hasMoreItems = page.hasMoreItems;
                        this.page.pagination = page.pagination;
                        this.page.data = this.page.data.concat(page.data);
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        this.isLoading = false;
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PostsComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPosts()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return PostsComponent;
}());
PostsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-posts',
        template: __webpack_require__("../../../../../src/app/components/posts/posts.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/posts/posts.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_post_service__["a" /* PostService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_post_service__["a" /* PostService */]) === "function" && _a || Object])
], PostsComponent);

var _a;
//# sourceMappingURL=posts.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/shared/comments/comments.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/shared/comments/comments.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  comments works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/components/shared/comments/comments.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_comment_service__ = __webpack_require__("../../../../../src/app/services/comment.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommentsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



var CommentsComponent = (function () {
    function CommentsComponent(commentService, router) {
        this.commentService = commentService;
        this.router = router;
    }
    CommentsComponent.prototype.getComments = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.isLoading = true;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, 4, 5]);
                        _a = this.post;
                        return [4 /*yield*/, this.commentService.getComments(this.post.id)];
                    case 2:
                        _a.comments = _b.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        this.isLoading = false;
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CommentsComponent.prototype.createComment = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.isLoading = true;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, 4, 5]);
                        _a = this.post;
                        return [4 /*yield*/, this.commentService.getComments(this.post.id)];
                    case 2:
                        _a.comments = _b.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        error_2 = _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        this.isLoading = false;
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CommentsComponent.prototype.ngOnInit = function () {
    };
    return CommentsComponent;
}());
CommentsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-comments',
        template: __webpack_require__("../../../../../src/app/components/shared/comments/comments.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/shared/comments/comments.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_comment_service__["a" /* CommentService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_comment_service__["a" /* CommentService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _b || Object])
], CommentsComponent);

var _a, _b;
//# sourceMappingURL=comments.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/shared/post-details/post-details.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "a {\r\n    text-decoration: none;\r\n    color: inherit;\r\n}\r\n\r\nhr {\r\n    display: block;\r\n    margin-top: 0px;\r\n    margin-bottom: 0px;\r\n    margin-left: 15px;\r\n    margin-right: 15px;\r\n    border-top: 1px solid #d8d8d8;\r\n}\r\n\r\n.post-details {\r\n    padding: 15px 15px;\r\n}\r\n\r\nmd-dialog-content {\r\n    padding: 0;\r\n}\r\n\r\n.post {\r\n    background-color: white;\r\n    margin-bottom: 50px;\r\n    position: relative;\r\n    border-radius: 2px;\r\n    /*border: 1px solid #d8d8d8;*/\r\n}\r\n\r\n.post-header {\r\n    padding: 10px;\r\n    width: 400px;\r\n}\r\n\r\n.post-footer {\r\n    padding: 15px;\r\n}\r\n\r\n.post-caption {\r\n    padding: 10px 0 0 0;\r\n    line-height: 1.6em;\r\n}\r\n\r\n.post-date {\r\n    padding: 10px 0 10px 0;\r\n}\r\n\r\n.post-actions {\r\n    padding: 10px;\r\n}\r\n\r\n.post-avatar {\r\n    width: 50px;\r\n    height: 50px;\r\n    border-radius: 90px;\r\n    -o-object-fit: cover;\r\n       object-fit: cover;\r\n    outline: none;\r\n}\r\n\r\n.post-author {\r\n    padding-left: 10px;\r\n}\r\n\r\n.attachment {\r\n    width: 100% auto;\r\n    height: 100% auto;\r\n    max-height: calc(100vh - 75px);\r\n    max-width: calc(100vw - 800px);\r\n    pointer-events: none;\r\n    user-select: none;\r\n    vertical-align: bottom;\r\n    -moz-user-select: none;\r\n    -webkit-user-drag: none;\r\n    -webkit-user-select: none;\r\n    -ms-user-select: none;\r\n}\r\n\r\n.comment-input {\r\n    outline: none;\r\n    border: none;\r\n    width: 100%;\r\n}\r\n\r\n.post-content {\r\n    width: 100%;\r\n    position: relative;\r\n    height: auto;\r\n}\r\n\r\n.post-content .post-content-buttons {\r\n    position: absolute;\r\n    opacity: 0;\r\n    top: 50%;\r\n    left: 50%;\r\n    -webkit-transform: translate(-50%, -50%);\r\n            transform: translate(-50%, -50%);\r\n    width: 100%;\r\n    padding: 0 10px 0 10px;\r\n}\r\n\r\n.post-content:not([disabled]):hover .post-content-buttons {\r\n    opacity: 1;\r\n}\r\n\r\n.post-created {\r\n    font-size: 14px;\r\n    color: gray;\r\n}\r\n\r\n.mat-dialog-container {\r\n    padding: 0px !important;\r\n}\r\n\r\nmd-dialog-container {\r\n    padding: 0px !important;\r\n}\r\n\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/shared/post-details/post-details.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"row\" fxLayoutAlign=\"start stretch\">\r\n    <div md-ripple class=\"post-content\">\r\n        <div class=\"post-content-buttons\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\" *ngIf=\"post.attachments.length > 1\">\r\n            <div>\r\n                <button md-raised-button md-icon-button *ngIf=\"post.activeAttachment > 0\" (click)=\"previous()\">\r\n                    <md-icon class=\"post-icon\">chevron_left</md-icon>\r\n                </button>\r\n            </div>\r\n            <div>\r\n                <button md-raised-button md-icon-button *ngIf=\"post.activeAttachment != post.attachments.length - 1\" (click)=\"next()\">\r\n                    <md-icon class=\"post-icon\">chevron_right</md-icon>\r\n                </button>\r\n            </div>\r\n        </div>\r\n        <img class=\"attachment\" src=\"{{post.attachments[post.activeAttachment].uri}}\" alt=\"post-image\">\r\n    </div>\r\n    <div fxLayout=\"column\">\r\n        <div class=\"post-header\" fxLayout=\"row\">\r\n            <img class=\"post-avatar\" [routerLink]=\"['/', post.user.username]\" src=\"{{post.user.pictureUri}}\" alt=\"profile\">\r\n            <div class=\"post-author\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\" fxFlex>\r\n                <a class=\"mat-body-1\" [routerLink]=\"['/', post.user.username]\">{{post.user.username}}</a>\r\n                <div>\r\n                    <button md-icon-button type=\"button\" [mdMenuTriggerFor]=\"menu\">\r\n                <md-icon>expand_more</md-icon>\r\n            </button>\r\n                    <md-menu #menu=\"mdMenu\" xPosition=\"before\">\r\n                        <button md-menu-item>\r\n                    <md-icon>edit</md-icon>\r\n                    <span>Edit</span>\r\n                </button>\r\n                        <button md-menu-item>\r\n                    <md-icon>delete</md-icon>\r\n                    <span>Remove</span>\r\n                </button>\r\n                    </md-menu>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <hr/>\r\n        <div class=\"post-details\" fxFlex>\r\n            <div fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\r\n                <span><strong>{{post.likesCount}} likes</strong></span>\r\n            </div>\r\n            <div class=\"post-caption\" *ngIf=\"post.caption\">\r\n                <a><strong>{{post.user.username}}</strong></a>\r\n                <span>{{post.caption}}</span>\r\n            </div>\r\n            <div class=\"post-date\">\r\n                <span class=\"post-created\">{{post.created | timeAgo}}</span>\r\n            </div>\r\n        </div>\r\n        <hr/>\r\n        <div class=\"post-actions\" fxLayout=\"row\">\r\n            <button md-icon-button><md-icon>favorite_border</md-icon></button>\r\n            <input class=\"comment-input\" type=\"text\" placeholder=\"Add comment\" />\r\n            <button md-icon-button mdTooltip=\"Copy to clipboard\" mdTooltipPosition=\"left\">\r\n            <md-icon>share</md-icon>\r\n        </button>\r\n        </div>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/components/shared/post-details/post-details.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/@angular/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_models_post__ = __webpack_require__("../../../../../src/app/common/models/post.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PostDetailsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var PostDetailsComponent = (function () {
    function PostDetailsComponent(dialogRef, post) {
        this.dialogRef = dialogRef;
        this.post = post;
        this.post.activeAttachment = 0;
    }
    PostDetailsComponent.prototype.next = function () {
        if (this.post.activeAttachment < this.post.attachments.length - 1) {
            this.post.activeAttachment++;
        }
    };
    PostDetailsComponent.prototype.previous = function () {
        if (this.post.activeAttachment > 0) {
            this.post.activeAttachment--;
        }
    };
    return PostDetailsComponent;
}());
PostDetailsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-post-details',
        template: __webpack_require__("../../../../../src/app/components/shared/post-details/post-details.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/shared/post-details/post-details.component.css")],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
    }),
    __param(1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__angular_material__["k" /* MD_DIALOG_DATA */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["l" /* MdDialogRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["l" /* MdDialogRef */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__common_models_post__["a" /* Post */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__common_models_post__["a" /* Post */]) === "function" && _b || Object])
], PostDetailsComponent);

var _a, _b;
//# sourceMappingURL=post-details.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/signin/signin.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "md-progress-bar {\r\n    margin: 0 -25px 0 -25px;\r\n    width: calc(100% + 50px);\r\n    height: 3px;\r\n}\r\n\r\n.content {\r\n    height: calc(100vh - 85px);\r\n}\r\n\r\n.form {\r\n    background-color: white;\r\n    width: 35%;\r\n    max-width: 400px;\r\n    padding: 0 25px 25px 25px;\r\n}\r\n\r\n.md-padding {\r\n    padding: 16px 0 16px 0;\r\n}\r\n\r\n.md-padding .bottom {\r\n    padding: 0 0 16px 0;\r\n}\r\n\r\n.error {\r\n    text-align: center;\r\n    color: red;\r\n}\r\n\r\n.mat-headline {\r\n    margin-bottom: 5px;\r\n}\r\n\r\n.md-description {\r\n    color: gray;\r\n    font-weight: lighter;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/signin/signin.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"content\" fxLayout=\"row\" fxLayoutAlign=\"center center\">\r\n    <form class=\"form z-depth-1\" fxLayout=\"column\" (ngSubmit)=\"signIn()\" autocomplete=\"off\">\r\n        <md-progress-bar color=\"primary\" mode=\"indeterminate\" *ngIf=\"isLoading\"></md-progress-bar>\r\n        <div class=\"md-padding\" fxLayout=\"column\">\r\n            <span class=\"mat-headline\">Sign In</span>\r\n            <span class=\"mat-subhead md-description\">to continue to PhotoCloud</span>\r\n        </div>\r\n        <div fxLayout=\"column\">\r\n            <md-input-container fxFlex>\r\n                <input mdInput placeholder=\"Username\" type=\"text\" [(ngModel)]=\"account.username\" name=\"username\" autocomplete=\"off\" [disabled]=\"isLoading\">\r\n            </md-input-container>\r\n            <md-input-container fxFlex>\r\n                <input mdInput placeholder=\"Password\" type=\"password\" [(ngModel)]=\"account.password\" name=\"password\" autocomplete=\"off\" [disabled]=\"isLoading\">\r\n            </md-input-container>\r\n        </div>\r\n        <div class=\"md-padding\" fxLayout=\"row\" fxLayoutAlign=\"center center\" *ngIf=\"errorMessage\">\r\n            <span class=\"mat-subhead error\">{{errorMessage}}</span>\r\n        </div>\r\n        <div fxLayout=\"row\" fxLayoutAlign=\"end center\">\r\n            <button md-raised-button color=\"primary\" type=\"sumbit\" [disabled]=\"isLoading\">Sign In</button>\r\n        </div>\r\n    </form>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/components/signin/signin.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_account_service__ = __webpack_require__("../../../../../src/app/services/account.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SigninComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



var SigninComponent = (function () {
    function SigninComponent(accountService, router) {
        this.accountService = accountService;
        this.router = router;
        this.account = {
            username: '',
            password: ''
        };
        this.isLoading = false;
    }
    SigninComponent.prototype.signIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            var accessToken, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isLoading = true;
                        this.errorMessage = '';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, this.accountService.signIn(this.account)];
                    case 2:
                        accessToken = _a.sent();
                        this.router.navigateByUrl('/');
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        this.errorMessage = error_1.error;
                        return [3 /*break*/, 5];
                    case 4:
                        this.isLoading = false;
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return SigninComponent;
}());
SigninComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-signin',
        template: __webpack_require__("../../../../../src/app/components/signin/signin.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/signin/signin.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_account_service__["a" /* AccountService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_account_service__["a" /* AccountService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _b || Object])
], SigninComponent);

var _a, _b;
//# sourceMappingURL=signin.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/user-posts/user-posts.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".posts-container {\r\n    margin: 50px 0 50px 0;\r\n}\r\n\r\n.user-posts {\r\n    display: -ms-grid;\r\n    display: grid;\r\n    -ms-grid-columns: 300px 300px 300px;\r\n        grid-template-columns: 300px 300px 300px;\r\n    grid-gap: 30px;\r\n    margin-bottom: 50px;\r\n}\r\n\r\n.post-item {\r\n    width: 300px;\r\n    height: 300px;\r\n    /*padding: 20px;*/\r\n}\r\n\r\n.image-container {\r\n    width: 100%;\r\n    height: 100%;\r\n    position: relative;\r\n}\r\n\r\n.image-container .after {\r\n    position: absolute;\r\n    width: 100%;\r\n    height: 100%;\r\n    color: #ffffff;\r\n    opacity: 0;\r\n    border-style: none;\r\n    padding: 0px 50px 0px 50px;\r\n    /*transition: opacity 0.1s linear;*/\r\n}\r\n\r\n.image-container:not([disabled]):hover .after {\r\n    cursor: pointer;\r\n    background: rgba(0, 0, 0, .4);\r\n    opacity: 1;\r\n    width: 100%;\r\n    height: 100%;\r\n}\r\n\r\n.thumbnail {\r\n    width: 100%;\r\n    height: 100%;\r\n    -o-object-fit: cover;\r\n       object-fit: cover;\r\n    overflow: hidden;\r\n}\r\n\r\n.post-icon {\r\n    color: white;\r\n}\r\n\r\n.post-number {\r\n    margin-left: 10px;\r\n}\r\n\r\n.thumbnail-big {\r\n    width: 150px;\r\n    height: 150px;\r\n    -o-object-fit: cover;\r\n       object-fit: cover;\r\n    overflow: hidden;\r\n    border-radius: 90px;\r\n}\r\n\r\n.user-info {\r\n    height: 195px;\r\n    width: 650px;\r\n    margin-bottom: 65px;\r\n}\r\n\r\n.mat-display-1 {\r\n    font-weight: lighter;\r\n}\r\n\r\n.md-padding {\r\n    padding: 16px 0px 0 16px;\r\n}\r\n\r\n.user-details {\r\n    margin-top: 16px;\r\n}\r\n\r\n.counters {\r\n    margin-top: 16px;\r\n}\r\n\r\n.mat-subhead.full-name {\r\n    font-size: 17px;\r\n    font-weight: bold;\r\n    padding-right: 10px;\r\n}\r\n\r\n.mat-subhead.bio {\r\n    font-size: 17px;\r\n    font-weight: normal;\r\n    padding-right: 10px;\r\n}\r\n\r\n.button-bordered {\r\n    border: 1px solid red;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/user-posts/user-posts.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" fxLayoutAlign=\"center center\" *ngIf=\"!isLoading\">\r\n    <div class=\"user-info\" fxLayout=\"row\" fxLayoutAlign=\"center end\">\r\n        <img class=\"thumbnail-big z-depth-3\" src=\"{{user.pictureUri}}\" alt=\"profile\" />\r\n        <div fxLayout=\"column\" fxFlex>\r\n            <div class=\"md-padding\" fxLayout=\"row\" fxLayoutAlign=\"space-between end\">\r\n                <div>\r\n                    <span class=\"mat-display-1\">{{user.username}}</span>\r\n                </div>\r\n                <button md-icon-button mdTooltip=\"Settings\" mdTooltipPosition=\"above\" *ngIf=\"user.id === currentUser.id\">\r\n                    <md-icon>settings</md-icon>\r\n                </button>\r\n                <button md-icon-button mdTooltip=\"Logout\" mdTooltipPosition=\"above\" (click)=\"logout()\" *ngIf=\"user.id === currentUser.id\">\r\n                    <md-icon>exit_to_app</md-icon>\r\n                </button>\r\n                <button md-raised-button color=\"warn\" *ngIf=\"user.id !== currentUser.id\" (click)=\"modifyRelationship()\" [disabled]=\"isModifyingRelationship\">{{user.outgoingStatus | relationshipAction | uppercase }}</button>\r\n            </div>\r\n            <div class=\"md-padding\" fxLayout=\"row\" fxLayoutAlign=\"start center\">\r\n                <div fxFlex>\r\n                    <span class=\"mat-title\">{{user.posts}} </span>\r\n                    <span class=\"mat-subhead\">posts </span>\r\n                </div>\r\n                <div fxFlex>\r\n                    <span class=\"mat-title\">{{user.followers}} </span>\r\n                    <span class=\"mat-subhead\">followers </span>\r\n                </div>\r\n                <div fxFlex>\r\n                    <span class=\"mat-title\">{{user.following}} </span>\r\n                    <span class=\"mat-subhead\">following</span>\r\n                </div>\r\n            </div>\r\n            <div class=\"md-padding\" fxLayout=\"row\" fxLayoutAlign=\"start center\">\r\n                <span class=\"mat-subhead full-name\">{{user.fullName}}</span>\r\n                <span class=\"mat-subhead bio\">{{user.bio}}</span>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"posts-container\">\r\n        <div class=\"user-posts\">\r\n            <div class=\"post-item\" *ngFor=\"let post of page.data;\">\r\n                <div class=\"image-container z-depth-3\" fxLayout=\"column\" fxLayoutAlign=\"center center\" (click)=\"openPostDialog(post)\">\r\n                    <img class=\"thumbnail\" src=\"{{post.attachments[0].uri}}\" alt=\"{{post.attachments[0].uri}}\">\r\n                    <div class=\"after md-padding\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\r\n                        <div fxLayout=\"row\" fxLayoutAlign=\"center center\">\r\n                            <md-icon class=\"post-icon\">favorite</md-icon>\r\n                            <span class=\"post-number\">{{post.likesCount}}</span>\r\n                        </div>\r\n                        <div fxLayout=\"row\" fxLayoutAlign=\"center center\">\r\n                            <md-icon class=\"post-icon\">mode_comment</md-icon>\r\n                            <span class=\"post-number\">{{post.commentsCount}}</span>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div fxLayout=\"row\" fxLayoutAlign=\"center center\" *ngIf=\"page.hasMoreItems\">\r\n            <button md-raised-button (click)=\"getPosts()\" [disabled]=\"isLoadingPosts\">Load More</button>\r\n        </div>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/components/user-posts/user-posts.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("../../../material/@angular/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_account_service__ = __webpack_require__("../../../../../src/app/services/account.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_post_service__ = __webpack_require__("../../../../../src/app/services/post.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_models_user__ = __webpack_require__("../../../../../src/app/common/models/user.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__common_models_relationship_status__ = __webpack_require__("../../../../../src/app/common/models/relationship-status.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__common_models_collection_model__ = __webpack_require__("../../../../../src/app/common/models/collection-model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__shared_post_details_post_details_component__ = __webpack_require__("../../../../../src/app/components/shared/post-details/post-details.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserPostsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};











var UserPostsComponent = (function () {
    function UserPostsComponent(accountService, postService, userService, router, route, dialog) {
        this.accountService = accountService;
        this.postService = postService;
        this.userService = userService;
        this.router = router;
        this.route = route;
        this.dialog = dialog;
        this.isLoading = false;
        this.isModifyingRelationship = false;
        this.user = new __WEBPACK_IMPORTED_MODULE_6__common_models_user__["a" /* User */]();
    }
    UserPostsComponent.prototype.getUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        return [4 /*yield*/, this.userService.getUser(this.user.username)];
                    case 1:
                        user = _a.sent();
                        this.user = user;
                        return [2 /*return*/, this.user];
                    case 2:
                        error_1 = _a.sent();
                        if (error_1.status === 404) {
                            this.router.navigateByUrl('/404', { skipLocationChange: true });
                        }
                        return [2 /*return*/, null];
                    case 3: return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserPostsComponent.prototype.getPosts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var page, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isLoadingPosts = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, this.postService.getUserPosts(this.user.username, this.page.pagination)];
                    case 2:
                        page = _a.sent();
                        this.page.hasMoreItems = page.hasMoreItems;
                        this.page.pagination = page.pagination;
                        this.page.data = this.page.data.concat(page.data);
                        return [2 /*return*/, page];
                    case 3:
                        error_2 = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        this.isLoadingPosts = false;
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserPostsComponent.prototype.logout = function () {
        this.accountService.signOut();
        this.router.navigateByUrl('/signin');
    };
    UserPostsComponent.prototype.openPostDialog = function (post) {
        var dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_9__shared_post_details_post_details_component__["a" /* PostDetailsComponent */], {
            data: post
        });
    };
    UserPostsComponent.prototype.modifyRelationship = function () {
        return __awaiter(this, void 0, void 0, function () {
            var action, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isModifyingRelationship = true;
                        if (this.user.outgoingStatus === __WEBPACK_IMPORTED_MODULE_7__common_models_relationship_status__["a" /* RelationshipStatus */].None) {
                            action = 0;
                        }
                        else if (this.user.outgoingStatus === __WEBPACK_IMPORTED_MODULE_7__common_models_relationship_status__["a" /* RelationshipStatus */].Following) {
                            action = 1;
                        }
                        else if (this.user.outgoingStatus === __WEBPACK_IMPORTED_MODULE_7__common_models_relationship_status__["a" /* RelationshipStatus */].Requested) {
                            action = 1;
                        }
                        else if (this.user.outgoingStatus === __WEBPACK_IMPORTED_MODULE_7__common_models_relationship_status__["a" /* RelationshipStatus */].Blocked) {
                            action = 4;
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, this.userService.modifyRelationship(this.user.id, {
                                action: action
                            })];
                    case 2:
                        _a.sent();
                        if (action === 0) {
                            this.user.outgoingStatus = __WEBPACK_IMPORTED_MODULE_7__common_models_relationship_status__["a" /* RelationshipStatus */].Following;
                        }
                        else if (action === 1) {
                            this.user.outgoingStatus = __WEBPACK_IMPORTED_MODULE_7__common_models_relationship_status__["a" /* RelationshipStatus */].None;
                        }
                        else if (action === 1) {
                            this.user.outgoingStatus = __WEBPACK_IMPORTED_MODULE_7__common_models_relationship_status__["a" /* RelationshipStatus */].None;
                        }
                        return [3 /*break*/, 5];
                    case 3:
                        error_3 = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        this.isModifyingRelationship = false;
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserPostsComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.currentUser = this.accountService.getCurrentUser();
                this.subscription = this.route.params.subscribe(function (params) { return __awaiter(_this, void 0, void 0, function () {
                    var user;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.initializePage();
                                this.user.username = params['username'];
                                this.isLoading = true;
                                return [4 /*yield*/, this.getUser()];
                            case 1:
                                user = _a.sent();
                                if (!!user) return [3 /*break*/, 2];
                                return [2 /*return*/];
                            case 2:
                                if (!!user.isActive) return [3 /*break*/, 3];
                                console.log(user.username + " is not active");
                                return [3 /*break*/, 6];
                            case 3:
                                if (!(user.isPrivate && user.outgoingStatus !== __WEBPACK_IMPORTED_MODULE_7__common_models_relationship_status__["a" /* RelationshipStatus */].Following)) return [3 /*break*/, 4];
                                console.log(user.username + " is private");
                                return [3 /*break*/, 6];
                            case 4: return [4 /*yield*/, this.getPosts()];
                            case 5:
                                _a.sent();
                                _a.label = 6;
                            case 6:
                                this.isLoading = false;
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    UserPostsComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    UserPostsComponent.prototype.initializePage = function () {
        this.page = new __WEBPACK_IMPORTED_MODULE_8__common_models_collection_model__["a" /* CollectionModel */]();
        this.page.hasMoreItems = false;
        this.page.pagination = null;
        this.page.data = [];
    };
    return UserPostsComponent;
}());
UserPostsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-user-posts',
        template: __webpack_require__("../../../../../src/app/components/user-posts/user-posts.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/user-posts/user-posts.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_account_service__["a" /* AccountService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_account_service__["a" /* AccountService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__services_post_service__["a" /* PostService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_post_service__["a" /* PostService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_user_service__["a" /* UserService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__angular_material__["m" /* MdDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_material__["m" /* MdDialog */]) === "function" && _f || Object])
], UserPostsComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=user-posts.component.js.map

/***/ }),

/***/ "../../../../../src/app/infrastructure/communication/communication.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommunicationService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

// import { BehaviorSubject } from 'rxjs/BehaviorSubject';

var CommunicationService = (function () {
    function CommunicationService() {
        // private $state = new BehaviorSubject<any>('defaultState');
        this.$state = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
    }
    CommunicationService.prototype.changeState = function (stateObject) {
        this.$state.next(stateObject);
    };
    CommunicationService.prototype.getState = function () {
        return this.$state.asObservable();
    };
    return CommunicationService;
}());
CommunicationService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], CommunicationService);

//# sourceMappingURL=communication.service.js.map

/***/ }),

/***/ "../../../../../src/app/infrastructure/communication/http.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__security_token_service__ = __webpack_require__("../../../../../src/app/infrastructure/security/token.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpClient; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var HttpClient = (function () {
    function HttpClient(http, tokenService) {
        this.http = http;
        this.tokenService = tokenService;
    }
    HttpClient.prototype.get = function (requestUri) {
        return __awaiter(this, void 0, void 0, function () {
            var options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getRequestOptions()];
                    case 1:
                        options = _a.sent();
                        return [2 /*return*/, this.http.get(__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].apiUri + requestUri, options)
                                .toPromise()];
                }
            });
        });
    };
    HttpClient.prototype.post = function (requestUri, data) {
        return __awaiter(this, void 0, void 0, function () {
            var options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getRequestOptions()];
                    case 1:
                        options = _a.sent();
                        return [2 /*return*/, this.http.post(__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].apiUri + requestUri, data, options)
                                .toPromise()];
                }
            });
        });
    };
    HttpClient.prototype.put = function (requestUri, data) {
        return __awaiter(this, void 0, void 0, function () {
            var options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getRequestOptions()];
                    case 1:
                        options = _a.sent();
                        return [2 /*return*/, this.http.put(__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].apiUri + requestUri, data, options)
                                .toPromise()];
                }
            });
        });
    };
    HttpClient.prototype.delete = function (requestUri) {
        return __awaiter(this, void 0, void 0, function () {
            var options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getRequestOptions()];
                    case 1:
                        options = _a.sent();
                        return [2 /*return*/, this.http.delete(__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].apiUri + requestUri, options)
                                .toPromise()];
                }
            });
        });
    };
    HttpClient.prototype.patch = function (requestUri, data) {
        return __awaiter(this, void 0, void 0, function () {
            var options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getRequestOptions()];
                    case 1:
                        options = _a.sent();
                        return [2 /*return*/, this.http.patch(__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].apiUri + requestUri, data, options)
                                .toPromise()];
                }
            });
        });
    };
    HttpClient.prototype.getRequestOptions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var accessToken, options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tokenService.getAccessToken()];
                    case 1:
                        accessToken = _a.sent();
                        options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* RequestOptions */]();
                        if (accessToken != null) {
                            options.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]({
                                'Authorization': 'Bearer ' + accessToken.accessToken
                            });
                        }
                        return [2 /*return*/, options];
                }
            });
        });
    };
    return HttpClient;
}());
HttpClient = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__security_token_service__["a" /* TokenService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__security_token_service__["a" /* TokenService */]) === "function" && _b || Object])
], HttpClient);

var _a, _b;
//# sourceMappingURL=http.js.map

/***/ }),

/***/ "../../../../../src/app/infrastructure/guards/authentication-guard.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__security_token_service__ = __webpack_require__("../../../../../src/app/infrastructure/security/token.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



var AuthenticationGuard = (function () {
    function AuthenticationGuard(router, tokenService) {
        this.router = router;
        this.tokenService = tokenService;
    }
    AuthenticationGuard.prototype.canActivate = function (route, state) {
        return __awaiter(this, void 0, void 0, function () {
            var accessToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tokenService.getAccessToken()];
                    case 1:
                        accessToken = _a.sent();
                        if (accessToken != null && state.url === '/signin') {
                            this.router.navigateByUrl('/');
                            return [2 /*return*/, false];
                        }
                        if (accessToken == null && state.url === '/signin') {
                            return [2 /*return*/, true];
                        }
                        if (accessToken != null) {
                            return [2 /*return*/, true];
                        }
                        this.router.navigateByUrl('/signin');
                        return [2 /*return*/, false];
                }
            });
        });
    };
    return AuthenticationGuard;
}());
AuthenticationGuard = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__security_token_service__["a" /* TokenService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__security_token_service__["a" /* TokenService */]) === "function" && _b || Object])
], AuthenticationGuard);

var _a, _b;
//# sourceMappingURL=authentication-guard.service.js.map

/***/ }),

/***/ "../../../../../src/app/infrastructure/mapping/token.mapper.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_models_token__ = __webpack_require__("../../../../../src/app/common/models/token.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TokenMapper; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var TokenMapper = (function () {
    function TokenMapper() {
    }
    TokenMapper.prototype.mapResponseToAccessToken = function (response) {
        var accessToken = new __WEBPACK_IMPORTED_MODULE_1__common_models_token__["a" /* AccessToken */]();
        accessToken.accessToken = response['access_token'];
        accessToken.refreshToken = response['refresh_token'];
        accessToken.tokenType = response['token_type'];
        accessToken.expiresIn = response['expires_in'];
        accessToken.issued = new Date(response['.issued']);
        accessToken.expires = new Date(response['.expires']);
        accessToken.userId = Number(response['userId']);
        accessToken.username = response['userName'];
        accessToken.isPrivate = response['isPrivate'];
        accessToken.isActive = response['isActive'];
        accessToken.pictureUri = response['pictureUri'];
        return accessToken;
    };
    return TokenMapper;
}());
TokenMapper = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], TokenMapper);

//# sourceMappingURL=token.mapper.js.map

/***/ }),

/***/ "../../../../../src/app/infrastructure/mapping/user.mapper.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_models_user__ = __webpack_require__("../../../../../src/app/common/models/user.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_models_relationship_status__ = __webpack_require__("../../../../../src/app/common/models/relationship-status.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserMapper; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var UserMapper = (function () {
    function UserMapper() {
    }
    UserMapper.prototype.mapResponseToUser = function (response) {
        var user = new __WEBPACK_IMPORTED_MODULE_1__common_models_user__["a" /* User */]();
        user.id = response.id;
        user.username = response.username;
        user.fullName = response.fullName;
        user.bio = response.bio;
        user.pictureUri = response.pictureUri;
        user.isPrivate = response.isPrivate;
        user.isActive = response.isActive;
        user.posts = response.posts;
        user.followers = response.followers;
        user.following = response.following;
        if (response.outgoingStatus === 'None') {
            user.outgoingStatus = __WEBPACK_IMPORTED_MODULE_2__common_models_relationship_status__["a" /* RelationshipStatus */].None;
        }
        else if (response.outgoingStatus === 'Following') {
            user.outgoingStatus = __WEBPACK_IMPORTED_MODULE_2__common_models_relationship_status__["a" /* RelationshipStatus */].Following;
        }
        else if (response.outgoingStatus === 'Requested') {
            user.outgoingStatus = __WEBPACK_IMPORTED_MODULE_2__common_models_relationship_status__["a" /* RelationshipStatus */].Requested;
        }
        else if (response.outgoingStatus === 'Blocked') {
            user.outgoingStatus = __WEBPACK_IMPORTED_MODULE_2__common_models_relationship_status__["a" /* RelationshipStatus */].Blocked;
        }
        return user;
    };
    return UserMapper;
}());
UserMapper = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], UserMapper);

//# sourceMappingURL=user.mapper.js.map

/***/ }),

/***/ "../../../../../src/app/infrastructure/security/token.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__communication_communication_service__ = __webpack_require__("../../../../../src/app/infrastructure/communication/communication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__session_session_service__ = __webpack_require__("../../../../../src/app/infrastructure/session/session.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__infrastructure_mapping_token_mapper__ = __webpack_require__("../../../../../src/app/infrastructure/mapping/token.mapper.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TokenService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};






var TokenService = (function () {
    function TokenService(sessionService, http, communicationService, tokenMapper) {
        this.sessionService = sessionService;
        this.http = http;
        this.communicationService = communicationService;
        this.tokenMapper = tokenMapper;
        this.refreshTimeout = 5;
    }
    TokenService.prototype.getAccessToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var accessToken, now, expiresIn, useRefreshToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        accessToken = this.sessionService.getSession();
                        if (!accessToken) {
                            return [2 /*return*/, null];
                        }
                        now = new Date();
                        expiresIn = (accessToken.expires.getTime() - now.getTime()) / 1000 / 60;
                        useRefreshToken = accessToken.refreshToken && expiresIn < this.refreshTimeout;
                        if (!(useRefreshToken && expiresIn > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.refreshToken(accessToken.refreshToken)];
                    case 1:
                        accessToken = _a.sent();
                        this.sessionService.setSession(accessToken);
                        _a.label = 2;
                    case 2:
                        if (expiresIn <= 0) {
                            this.sessionService.clearSession();
                            this.communicationService.changeState(null);
                            return [2 /*return*/, null];
                        }
                        this.communicationService.changeState(accessToken);
                        return [2 /*return*/, accessToken];
                }
            });
        });
    };
    TokenService.prototype.refreshToken = function (refreshToken) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var data;
            return __generator(this, function (_a) {
                data = 'grant_type=refresh_token&refresh_token=' + refreshToken;
                return [2 /*return*/, this.http.post(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUri + 'authorize', data)
                        .toPromise()
                        .then(function (response) { return _this.tokenMapper.mapResponseToAccessToken(response.json()); })];
            });
        });
    };
    TokenService.prototype.handleError = function (error) {
        return Promise.reject(error.message || error);
    };
    return TokenService;
}());
TokenService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__session_session_service__["a" /* SessionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__session_session_service__["a" /* SessionService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__communication_communication_service__["a" /* CommunicationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__communication_communication_service__["a" /* CommunicationService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__infrastructure_mapping_token_mapper__["a" /* TokenMapper */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__infrastructure_mapping_token_mapper__["a" /* TokenMapper */]) === "function" && _d || Object])
], TokenService);

var _a, _b, _c, _d;
//# sourceMappingURL=token.service.js.map

/***/ }),

/***/ "../../../../../src/app/infrastructure/services/current-user.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CurrentUserService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CurrentUserService = (function () {
    function CurrentUserService() {
    }
    return CurrentUserService;
}());
CurrentUserService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], CurrentUserService);

//# sourceMappingURL=current-user.service.js.map

/***/ }),

/***/ "../../../../../src/app/infrastructure/session/session.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SessionService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SessionService = (function () {
    function SessionService() {
        this.sessionKey = 'photocloud_session';
    }
    SessionService.prototype.setSession = function (token) {
        var json = JSON.stringify(token);
        localStorage.setItem(this.sessionKey, json);
    };
    SessionService.prototype.getSession = function () {
        var json = localStorage.getItem(this.sessionKey);
        if (!json) {
            return null;
        }
        var data = JSON.parse(json);
        var accessToken = data;
        accessToken.expires = new Date(accessToken.expires);
        accessToken.issued = new Date(accessToken.issued);
        return accessToken;
    };
    SessionService.prototype.clearSession = function () {
        localStorage.removeItem(this.sessionKey);
    };
    return SessionService;
}());
SessionService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], SessionService);

//# sourceMappingURL=session.service.js.map

/***/ }),

/***/ "../../../../../src/app/pipes/relationship-action.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_models_relationship_status__ = __webpack_require__("../../../../../src/app/common/models/relationship-status.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RelationshipActionPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var RelationshipActionPipe = (function () {
    function RelationshipActionPipe() {
    }
    RelationshipActionPipe.prototype.transform = function (relationshipStatus) {
        if (relationshipStatus === __WEBPACK_IMPORTED_MODULE_1__common_models_relationship_status__["a" /* RelationshipStatus */].None) {
            return 'Follow';
        }
        if (relationshipStatus === __WEBPACK_IMPORTED_MODULE_1__common_models_relationship_status__["a" /* RelationshipStatus */].Following) {
            return 'Unfollow';
        }
        if (relationshipStatus === __WEBPACK_IMPORTED_MODULE_1__common_models_relationship_status__["a" /* RelationshipStatus */].Requested) {
            return 'Unfollow';
        }
        return 'Unknown';
    };
    return RelationshipActionPipe;
}());
RelationshipActionPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'relationshipAction'
    })
], RelationshipActionPipe);

//# sourceMappingURL=relationship-action.pipe.js.map

/***/ }),

/***/ "../../../../../src/app/services/account.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__infrastructure_communication_http__ = __webpack_require__("../../../../../src/app/infrastructure/communication/http.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__infrastructure_session_session_service__ = __webpack_require__("../../../../../src/app/infrastructure/session/session.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_models_current_user__ = __webpack_require__("../../../../../src/app/common/models/current-user.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__infrastructure_communication_communication_service__ = __webpack_require__("../../../../../src/app/infrastructure/communication/communication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__infrastructure_mapping_token_mapper__ = __webpack_require__("../../../../../src/app/infrastructure/mapping/token.mapper.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};






var AccountService = (function () {
    function AccountService(http, sessionService, communicationService, tokenMapper) {
        this.http = http;
        this.sessionService = sessionService;
        this.communicationService = communicationService;
        this.tokenMapper = tokenMapper;
    }
    AccountService.prototype.signIn = function (account) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var body, accessToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = 'grant_type=password&username=' + account.username + '&password=' + account.password;
                        return [4 /*yield*/, this.http.post('authorize', body)
                                .then(function (response) { return _this.tokenMapper.mapResponseToAccessToken(response.json()); })
                                .catch(this.handleError)];
                    case 1:
                        accessToken = _a.sent();
                        this.sessionService.setSession(accessToken);
                        return [2 /*return*/, accessToken];
                }
            });
        });
    };
    AccountService.prototype.signOut = function () {
        this.sessionService.clearSession();
        this.communicationService.changeState(null);
    };
    AccountService.prototype.getCurrentUser = function () {
        var accessToken = this.sessionService.getSession();
        var currentUser = new __WEBPACK_IMPORTED_MODULE_3__common_models_current_user__["a" /* CurrentUser */]();
        currentUser.id = accessToken.userId;
        currentUser.username = accessToken.username;
        currentUser.pictureUri = accessToken.pictureUri;
        currentUser.isPrivate = accessToken.isPrivate;
        currentUser.isActive = accessToken.isActive;
        return currentUser;
    };
    AccountService.prototype.handleError = function (error) {
        return Promise.reject(error.json());
    };
    return AccountService;
}());
AccountService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__infrastructure_communication_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__infrastructure_communication_http__["a" /* HttpClient */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__infrastructure_session_session_service__["a" /* SessionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__infrastructure_session_session_service__["a" /* SessionService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__infrastructure_communication_communication_service__["a" /* CommunicationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__infrastructure_communication_communication_service__["a" /* CommunicationService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__infrastructure_mapping_token_mapper__["a" /* TokenMapper */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__infrastructure_mapping_token_mapper__["a" /* TokenMapper */]) === "function" && _d || Object])
], AccountService);

var _a, _b, _c, _d;
//# sourceMappingURL=account.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/comment.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__infrastructure_communication_http__ = __webpack_require__("../../../../../src/app/infrastructure/communication/http.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommentService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CommentService = (function () {
    function CommentService(httpClient) {
        this.httpClient = httpClient;
    }
    CommentService.prototype.getComments = function (postId) {
        return this.httpClient.get(postId + "/comments")
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CommentService.prototype.createComment = function (postId, comment) {
        return this.httpClient.post(postId + "/comments", comment)
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CommentService.prototype.editComment = function (postId, commentId, comment) {
        return this.httpClient.put(postId + "/comments/" + commentId, comment)
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CommentService.prototype.removeComment = function (postId, commentId) {
        return this.httpClient.delete(postId + "/comments/" + commentId)
            .then(function (response) { })
            .catch(this.handleError);
    };
    CommentService.prototype.handleError = function (error) {
        return Promise.reject(error.message || error);
    };
    return CommentService;
}());
CommentService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__infrastructure_communication_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__infrastructure_communication_http__["a" /* HttpClient */]) === "function" && _a || Object])
], CommentService);

var _a;
//# sourceMappingURL=comment.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/post.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_toPromise__ = __webpack_require__("../../../../rxjs/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__infrastructure_security_token_service__ = __webpack_require__("../../../../../src/app/infrastructure/security/token.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__infrastructure_communication_http__ = __webpack_require__("../../../../../src/app/infrastructure/communication/http.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PostService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PostService = (function () {
    function PostService(http, tokenService) {
        this.http = http;
        this.tokenService = tokenService;
    }
    PostService.prototype.getPosts = function (pagination) {
        var requestUri = 'posts';
        if (pagination != null && pagination.next != null) {
            requestUri = requestUri + '?next=' + pagination.next;
        }
        return this.http.get(requestUri)
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    PostService.prototype.getUserPosts = function (username, pagination) {
        var requestUri = 'posts/' + username;
        if (pagination != null && pagination.next != null) {
            requestUri = requestUri + '?next=' + pagination.next;
        }
        return this.http.get(requestUri)
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    PostService.prototype.handleError = function (error) {
        return Promise.reject(error.message || error);
    };
    return PostService;
}());
PostService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__infrastructure_communication_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__infrastructure_communication_http__["a" /* HttpClient */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__infrastructure_security_token_service__["a" /* TokenService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__infrastructure_security_token_service__["a" /* TokenService */]) === "function" && _b || Object])
], PostService);

var _a, _b;
//# sourceMappingURL=post.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/user.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__infrastructure_communication_http__ = __webpack_require__("../../../../../src/app/infrastructure/communication/http.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__infrastructure_mapping_user_mapper__ = __webpack_require__("../../../../../src/app/infrastructure/mapping/user.mapper.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserService = (function () {
    function UserService(httpClient, userMapper) {
        this.httpClient = httpClient;
        this.userMapper = userMapper;
    }
    UserService.prototype.getUser = function (username) {
        var _this = this;
        return this.httpClient.get("users/" + username)
            .then(function (response) { return _this.userMapper.mapResponseToUser(response.json()); })
            .catch(this.handleError);
    };
    UserService.prototype.modifyRelationship = function (userId, relationshipModel) {
        return this.httpClient.put("users/" + userId + "/relationship", relationshipModel)
            .then(function (response) { })
            .catch(this.handleError);
    };
    UserService.prototype.handleError = function (error) {
        return Promise.reject(error.message || error);
    };
    return UserService;
}());
UserService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__infrastructure_communication_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__infrastructure_communication_http__["a" /* HttpClient */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__infrastructure_mapping_user_mapper__["a" /* UserMapper */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__infrastructure_mapping_user_mapper__["a" /* UserMapper */]) === "function" && _b || Object])
], UserService);

var _a, _b;
//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false,
    apiUri: 'https://krypapp.azurewebsites.net/'
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map