/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 38);
/******/ })
/************************************************************************/
/******/ ({

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(8);


/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * alertifyjs 1.9.0 http://alertifyjs.com
 * AlertifyJS is a javascript framework for developing pretty browser dialogs and notifications.
 * Copyright 2017 Mohammad Younes <Mohammad@alertifyjs.com> (http://alertifyjs.com) 
 * Licensed under GPL 3 <https://opensource.org/licenses/gpl-3.0>*/
( function ( window ) {
    'use strict';
    
    /**
     * Keys enum
     * @type {Object}
     */
    var keys = {
        ENTER: 13,
        ESC: 27,
        F1: 112,
        F12: 123,
        LEFT: 37,
        RIGHT: 39
    };
    /**
     * Default options 
     * @type {Object}
     */
    var defaults = {
        autoReset:true,
        basic:false,
        closable:true,
        closableByDimmer:true,
        frameless:false,
        maintainFocus:true, //global default not per instance, applies to all dialogs
        maximizable:true,
        modal:true,
        movable:true,
        moveBounded:false,
        overflow:true,
        padding: true,
        pinnable:true,
        pinned:true,
        preventBodyShift:false, //global default not per instance, applies to all dialogs
        resizable:true,
        startMaximized:false,
        transition:'pulse',
        notifier:{
            delay:5,
            position:'bottom-right',
            closeButton:false
        },
        glossary:{
            title:'AlertifyJS',
            ok: 'OK',
            cancel: 'Cancel',
            acccpt: 'Accept',
            deny: 'Deny',
            confirm: 'Confirm',
            decline: 'Decline',
            close: 'Close',
            maximize: 'Maximize',
            restore: 'Restore',
        },
        theme:{
            input:'ajs-input',
            ok:'ajs-ok',
            cancel:'ajs-cancel',
        }
    };
    
    //holds open dialogs instances
    var openDialogs = [];

    /**
     * [Helper]  Adds the specified class(es) to the element.
     *
     * @element {node}      The element
     * @className {string}  One or more space-separated classes to be added to the class attribute of the element.
     * 
     * @return {undefined}
     */
    function addClass(element,classNames){
        element.className += ' ' + classNames;
    }
    
    /**
     * [Helper]  Removes the specified class(es) from the element.
     *
     * @element {node}      The element
     * @className {string}  One or more space-separated classes to be removed from the class attribute of the element.
     * 
     * @return {undefined}
     */
    function removeClass(element, classNames) {
        var original = element.className.split(' ');
        var toBeRemoved = classNames.split(' ');
        for (var x = 0; x < toBeRemoved.length; x += 1) {
            var index = original.indexOf(toBeRemoved[x]);
            if (index > -1){
                original.splice(index,1);
            }
        }
        element.className = original.join(' ');
    }

    /**
     * [Helper]  Checks if the document is RTL
     *
     * @return {Boolean} True if the document is RTL, false otherwise.
     */
    function isRightToLeft(){
        return window.getComputedStyle(document.body).direction === 'rtl';
    }
    /**
     * [Helper]  Get the document current scrollTop
     *
     * @return {Number} current document scrollTop value
     */
    function getScrollTop(){
        return ((document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop);
    }

    /**
     * [Helper]  Get the document current scrollLeft
     *
     * @return {Number} current document scrollLeft value
     */
    function getScrollLeft(){
        return ((document.documentElement && document.documentElement.scrollLeft) || document.body.scrollLeft);
    }

    /**
    * Helper: clear contents
    *
    */
    function clearContents(element){
        while (element.lastChild) {
            element.removeChild(element.lastChild);
        }
    }
    /**
     * Extends a given prototype by merging properties from base into sub.
     *
     * @sub {Object} sub The prototype being overwritten.
     * @base {Object} base The prototype being written.
     *
     * @return {Object} The extended prototype.
     */
    function copy(src) {
        if(null === src){
            return src;
        }
        var cpy;
        if(Array.isArray(src)){
            cpy = [];
            for(var x=0;x<src.length;x+=1){
                cpy.push(copy(src[x]));
            }
            return cpy;
        }
      
        if(src instanceof Date){
            return new Date(src.getTime());
        }
      
        if(src instanceof RegExp){
            cpy = new RegExp(src.source);
            cpy.global = src.global;
            cpy.ignoreCase = src.ignoreCase;
            cpy.multiline = src.multiline;
            cpy.lastIndex = src.lastIndex;
            return cpy;
        }
        
        if(typeof src === 'object'){
            cpy = {};
            // copy dialog pototype over definition.
            for (var prop in src) {
                if (src.hasOwnProperty(prop)) {
                    cpy[prop] = copy(src[prop]);
                }
            }
            return cpy;
        }
        return src;
    }
    /**
      * Helper: destruct the dialog
      *
      */
    function destruct(instance, initialize){
        //delete the dom and it's references.
        var root = instance.elements.root;
        root.parentNode.removeChild(root);
        delete instance.elements;
        //copy back initial settings.
        instance.settings = copy(instance.__settings);
        //re-reference init function.
        instance.__init = initialize;
        //delete __internal variable to allow re-initialization.
        delete instance.__internal;
    }

    /**
     * Use a closure to return proper event listener method. Try to use
     * `addEventListener` by default but fallback to `attachEvent` for
     * unsupported browser. The closure simply ensures that the test doesn't
     * happen every time the method is called.
     *
     * @param    {Node}     el    Node element
     * @param    {String}   event Event type
     * @param    {Function} fn    Callback of event
     * @return   {Function}
     */
    var on = (function () {
        if (document.addEventListener) {
            return function (el, event, fn, useCapture) {
                el.addEventListener(event, fn, useCapture === true);
            };
        } else if (document.attachEvent) {
            return function (el, event, fn) {
                el.attachEvent('on' + event, fn);
            };
        }
    }());

    /**
     * Use a closure to return proper event listener method. Try to use
     * `removeEventListener` by default but fallback to `detachEvent` for
     * unsupported browser. The closure simply ensures that the test doesn't
     * happen every time the method is called.
     *
     * @param    {Node}     el    Node element
     * @param    {String}   event Event type
     * @param    {Function} fn    Callback of event
     * @return   {Function}
     */
    var off = (function () {
        if (document.removeEventListener) {
            return function (el, event, fn, useCapture) {
                el.removeEventListener(event, fn, useCapture === true);
            };
        } else if (document.detachEvent) {
            return function (el, event, fn) {
                el.detachEvent('on' + event, fn);
            };
        }
    }());

    /**
     * Prevent default event from firing
     *
     * @param  {Event} event Event object
     * @return {undefined}

    function prevent ( event ) {
        if ( event ) {
            if ( event.preventDefault ) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        }
    }
    */
    var transition = (function () {
        var t, type;
        var supported = false;
        var transitions = {
            'animation'        : 'animationend',
            'OAnimation'       : 'oAnimationEnd oanimationend',
            'msAnimation'      : 'MSAnimationEnd',
            'MozAnimation'     : 'animationend',
            'WebkitAnimation'  : 'webkitAnimationEnd'
        };

        for (t in transitions) {
            if (document.documentElement.style[t] !== undefined) {
                type = transitions[t];
                supported = true;
                break;
            }
        }

        return {
            type: type,
            supported: supported
        };
    }());

    /**
    * Creates event handler delegate that sends the instance as last argument.
    * 
    * @return {Function}    a function wrapper which sends the instance as last argument.
    */
    function delegate(context, method) {
        return function () {
            if (arguments.length > 0) {
                var args = [];
                for (var x = 0; x < arguments.length; x += 1) {
                    args.push(arguments[x]);
                }
                args.push(context);
                return method.apply(context, args);
            }
            return method.apply(context, [null, context]);
        };
    }
    /**
    * Helper for creating a dialog close event.
    * 
    * @return {object}
    */
    function createCloseEvent(index, button) {
        return {
            index: index,
            button: button,
            cancel: false
        };
    }
    /**
    * Helper for dispatching events.
    *
    * @param  {string} evenType The type of the event to disptach.
    * @param  {object} instance The dialog instance disptaching the event.
    *
    * @return {object}
    */
    function dispatchEvent(eventType, instance) {
        if ( typeof instance.get(eventType) === 'function' ) {
            instance.get(eventType).call(instance);
        }
    }


    /**
     * Super class for all dialogs
     *
     * @return {Object}		base dialog prototype
     */
    var dialog = (function () {
        var //holds the list of used keys.
            usedKeys = [],
            //dummy variable, used to trigger dom reflow.
            reflow = null,
            //condition for detecting safari
            isSafari = window.navigator.userAgent.indexOf('Safari') > -1 && window.navigator.userAgent.indexOf('Chrome') < 0,
            //dialog building blocks
            templates = {
                dimmer:'<div class="ajs-dimmer"></div>',
                /*tab index required to fire click event before body focus*/
                modal: '<div class="ajs-modal" tabindex="0"></div>',
                dialog: '<div class="ajs-dialog" tabindex="0"></div>',
                reset: '<button class="ajs-reset"></button>',
                commands: '<div class="ajs-commands"><button class="ajs-pin"></button><button class="ajs-maximize"></button><button class="ajs-close"></button></div>',
                header: '<div class="ajs-header"></div>',
                body: '<div class="ajs-body"></div>',
                content: '<div class="ajs-content"></div>',
                footer: '<div class="ajs-footer"></div>',
                buttons: { primary: '<div class="ajs-primary ajs-buttons"></div>', auxiliary: '<div class="ajs-auxiliary ajs-buttons"></div>' },
                button: '<button class="ajs-button"></button>',
                resizeHandle: '<div class="ajs-handle"></div>',
            },
            //common class names
            classes = {
                animationIn: 'ajs-in',
                animationOut: 'ajs-out',
                base: 'alertify',
                basic:'ajs-basic',
                capture: 'ajs-capture',
                closable:'ajs-closable',
                fixed: 'ajs-fixed',
                frameless:'ajs-frameless',
                hidden: 'ajs-hidden',
                maximize: 'ajs-maximize',
                maximized: 'ajs-maximized',
                maximizable:'ajs-maximizable',
                modeless: 'ajs-modeless',
                movable: 'ajs-movable',
                noSelection: 'ajs-no-selection',
                noOverflow: 'ajs-no-overflow',
                noPadding:'ajs-no-padding',
                pin:'ajs-pin',
                pinnable:'ajs-pinnable',
                prefix: 'ajs-',
                resizable: 'ajs-resizable',
                restore: 'ajs-restore',
                shake:'ajs-shake',
                unpinned:'ajs-unpinned',
            };

        /**
         * Helper: initializes the dialog instance
         * 
         * @return	{Number}	The total count of currently open modals.
         */
        function initialize(instance){
            
            if(!instance.__internal){

                //no need to expose init after this.
                delete instance.__init;
              
                //keep a copy of initial dialog settings
                if(!instance.__settings){
                    instance.__settings = copy(instance.settings);
                }
                //in case the script was included before body.
                //after first dialog gets initialized, it won't be null anymore!
                if(null === reflow){
                    // set tabindex attribute on body element this allows script to give it
                    // focus after the dialog is closed
                    document.body.setAttribute( 'tabindex', '0' );
                }

                //get dialog buttons/focus setup
                var setup;
                if(typeof instance.setup === 'function'){
                    setup = instance.setup();
                    setup.options = setup.options  || {};
                    setup.focus = setup.focus  || {};
                }else{
                    setup = {
                        buttons:[],
                        focus:{
                            element:null,
                            select:false
                        },
                        options:{
                        }
                    };
                }
                
                //initialize hooks object.
                if(typeof instance.hooks !== 'object'){
                    instance.hooks = {};
                }

                //copy buttons defintion
                var buttonsDefinition = [];
                if(Array.isArray(setup.buttons)){
                    for(var b=0;b<setup.buttons.length;b+=1){
                        var ref  = setup.buttons[b],
                            cpy = {};
                        for (var i in ref) {
                            if (ref.hasOwnProperty(i)) {
                                cpy[i] = ref[i];
                            }
                        }
                        buttonsDefinition.push(cpy);
                    }
                }

                var internal = instance.__internal = {
                    /**
                     * Flag holding the open state of the dialog
                     * 
                     * @type {Boolean}
                     */
                    isOpen:false,
                    /**
                     * Active element is the element that will receive focus after
                     * closing the dialog. It defaults as the body tag, but gets updated
                     * to the last focused element before the dialog was opened.
                     *
                     * @type {Node}
                     */
                    activeElement:document.body,
                    timerIn:undefined,
                    timerOut:undefined,
                    buttons: buttonsDefinition,
                    focus: setup.focus,
                    options: {
                        title: undefined,
                        modal: undefined,
                        basic:undefined,
                        frameless:undefined,
                        pinned: undefined,
                        movable: undefined,
                        moveBounded:undefined,
                        resizable: undefined,
                        autoReset: undefined,
                        closable: undefined,
                        closableByDimmer: undefined,
                        maximizable: undefined,
                        startMaximized: undefined,
                        pinnable: undefined,
                        transition: undefined,
                        padding:undefined,
                        overflow:undefined,
                        onshow:undefined,
                        onclose:undefined,
                        onfocus:undefined,
                        onmove:undefined,
                        onmoved:undefined,
                        onresize:undefined,
                        onresized:undefined,
                        onmaximize:undefined,
                        onmaximized:undefined,
                        onrestore:undefined,
                        onrestored:undefined
                    },
                    resetHandler:undefined,
                    beginMoveHandler:undefined,
                    beginResizeHandler:undefined,
                    bringToFrontHandler:undefined,
                    modalClickHandler:undefined,
                    buttonsClickHandler:undefined,
                    commandsClickHandler:undefined,
                    transitionInHandler:undefined,
                    transitionOutHandler:undefined,
                    destroy:undefined
                };

                var elements = {};
                //root node
                elements.root = document.createElement('div');
                
                elements.root.className = classes.base + ' ' + classes.hidden + ' ';

                elements.root.innerHTML = templates.dimmer + templates.modal;
                
                //dimmer
                elements.dimmer = elements.root.firstChild;

                //dialog
                elements.modal = elements.root.lastChild;
                elements.modal.innerHTML = templates.dialog;
                elements.dialog = elements.modal.firstChild;
                elements.dialog.innerHTML = templates.reset + templates.commands + templates.header + templates.body + templates.footer + templates.resizeHandle + templates.reset;

                //reset links
                elements.reset = [];
                elements.reset.push(elements.dialog.firstChild);
                elements.reset.push(elements.dialog.lastChild);
                
                //commands
                elements.commands = {};
                elements.commands.container = elements.reset[0].nextSibling;
                elements.commands.pin = elements.commands.container.firstChild;
                elements.commands.maximize = elements.commands.pin.nextSibling;
                elements.commands.close = elements.commands.maximize.nextSibling;
                
                //header
                elements.header = elements.commands.container.nextSibling;

                //body
                elements.body = elements.header.nextSibling;
                elements.body.innerHTML = templates.content;
                elements.content = elements.body.firstChild;

                //footer
                elements.footer = elements.body.nextSibling;
                elements.footer.innerHTML = templates.buttons.auxiliary + templates.buttons.primary;
                
                //resize handle
                elements.resizeHandle = elements.footer.nextSibling;

                //buttons
                elements.buttons = {};
                elements.buttons.auxiliary = elements.footer.firstChild;
                elements.buttons.primary = elements.buttons.auxiliary.nextSibling;
                elements.buttons.primary.innerHTML = templates.button;
                elements.buttonTemplate = elements.buttons.primary.firstChild;
                //remove button template
                elements.buttons.primary.removeChild(elements.buttonTemplate);
                               
                for(var x=0; x < instance.__internal.buttons.length; x+=1) {
                    var button = instance.__internal.buttons[x];
                    
                    // add to the list of used keys.
                    if(usedKeys.indexOf(button.key) < 0){
                        usedKeys.push(button.key);
                    }

                    button.element = elements.buttonTemplate.cloneNode();
                    button.element.innerHTML = button.text;
                    if(typeof button.className === 'string' &&  button.className !== ''){
                        addClass(button.element, button.className);
                    }
                    for(var key in button.attrs){
                        if(key !== 'className' && button.attrs.hasOwnProperty(key)){
                            button.element.setAttribute(key, button.attrs[key]);
                        }
                    }
                    if(button.scope === 'auxiliary'){
                        elements.buttons.auxiliary.appendChild(button.element);
                    }else{
                        elements.buttons.primary.appendChild(button.element);
                    }
                }
                //make elements pubic
                instance.elements = elements;
                
                //save event handlers delegates
                internal.resetHandler = delegate(instance, onReset);
                internal.beginMoveHandler = delegate(instance, beginMove);
                internal.beginResizeHandler = delegate(instance, beginResize);
                internal.bringToFrontHandler = delegate(instance, bringToFront);
                internal.modalClickHandler = delegate(instance, modalClickHandler);
                internal.buttonsClickHandler = delegate(instance, buttonsClickHandler);
                internal.commandsClickHandler = delegate(instance, commandsClickHandler);
                internal.transitionInHandler = delegate(instance, handleTransitionInEvent);
                internal.transitionOutHandler = delegate(instance, handleTransitionOutEvent);

                //settings
                for(var opKey in internal.options){
                    if(setup.options[opKey] !== undefined){
                        // if found in user options
                        instance.set(opKey, setup.options[opKey]);
                    }else if(alertify.defaults.hasOwnProperty(opKey)) {
                        // else if found in defaults options
                        instance.set(opKey, alertify.defaults[opKey]);
                    }else if(opKey === 'title' ) {
                        // else if title key, use alertify.defaults.glossary
                        instance.set(opKey, alertify.defaults.glossary[opKey]);
                    }
                }

                // allow dom customization
                if(typeof instance.build === 'function'){
                    instance.build();
                }
            }
            
            //add to the end of the DOM tree.
            document.body.appendChild(instance.elements.root);
        }

        /**
         * Helper: maintains scroll position
         *
         */
        var scrollX, scrollY;
        function saveScrollPosition(){
            scrollX = getScrollLeft();
            scrollY = getScrollTop();
        }
        function restoreScrollPosition(){
            window.scrollTo(scrollX, scrollY);
        }

        /**
         * Helper: adds/removes no-overflow class from body
         *
         */
        function ensureNoOverflow(){
            var requiresNoOverflow = 0;
            for(var x=0;x<openDialogs.length;x+=1){
                var instance = openDialogs[x];
                if(instance.isModal() || instance.isMaximized()){
                    requiresNoOverflow+=1;
                }
            }
            if(requiresNoOverflow === 0 && document.body.className.indexOf(classes.noOverflow) >= 0){
                //last open modal or last maximized one
                removeClass(document.body, classes.noOverflow);
                preventBodyShift(false);
            }else if(requiresNoOverflow > 0 && document.body.className.indexOf(classes.noOverflow) < 0){
                //first open modal or first maximized one
                preventBodyShift(true);
                addClass(document.body, classes.noOverflow);
            }
        }
        var top = '', topScroll = 0;
        /**
         * Helper: prevents body shift.
         *
         */
        function preventBodyShift(add){
            if(alertify.defaults.preventBodyShift && document.documentElement.scrollHeight > document.documentElement.clientHeight){
                if(add ){//&& openDialogs[openDialogs.length-1].elements.dialog.clientHeight <= document.documentElement.clientHeight){
                    topScroll = scrollY;
                    top = window.getComputedStyle(document.body).top;
                    addClass(document.body, classes.fixed);
                    document.body.style.top = -scrollY + 'px';
                } else {
                    scrollY = topScroll;
                    document.body.style.top = top;
                    removeClass(document.body, classes.fixed);
                    restoreScrollPosition();
                }
            }
        }
		
        /**
         * Sets the name of the transition used to show/hide the dialog
         * 
         * @param {Object} instance The dilog instance.
         *
         */
        function updateTransition(instance, value, oldValue){
            if(typeof oldValue === 'string'){
                removeClass(instance.elements.root,classes.prefix +  oldValue);
            }
            addClass(instance.elements.root, classes.prefix + value);
            reflow = instance.elements.root.offsetWidth;
        }
		
        /**
         * Toggles the dialog display mode
         *
         * @param {Object} instance The dilog instance.
         *
         * @return {undefined}
         */
        function updateDisplayMode(instance){
            if(instance.get('modal')){

                //make modal
                removeClass(instance.elements.root, classes.modeless);

                //only if open
                if(instance.isOpen()){
                    unbindModelessEvents(instance);

                    //in case a pinned modless dialog was made modal while open.
                    updateAbsPositionFix(instance);

                    ensureNoOverflow();
                }
            }else{
                //make modelss
                addClass(instance.elements.root, classes.modeless);

                //only if open
                if(instance.isOpen()){
                    bindModelessEvents(instance);

                    //in case pin/unpin was called while a modal is open
                    updateAbsPositionFix(instance);

                    ensureNoOverflow();
                }
            }
        }

        /**
         * Toggles the dialog basic view mode 
         *
         * @param {Object} instance The dilog instance.
         *
         * @return {undefined}
         */
        function updateBasicMode(instance){
            if (instance.get('basic')) {
                // add class
                addClass(instance.elements.root, classes.basic);
            } else {
                // remove class
                removeClass(instance.elements.root, classes.basic);
            }
        }

        /**
         * Toggles the dialog frameless view mode 
         *
         * @param {Object} instance The dilog instance.
         *
         * @return {undefined}
         */
        function updateFramelessMode(instance){
            if (instance.get('frameless')) {
                // add class
                addClass(instance.elements.root, classes.frameless);
            } else {
                // remove class
                removeClass(instance.elements.root, classes.frameless);
            }
        }
		
        /**
         * Helper: Brings the modeless dialog to front, attached to modeless dialogs.
         *
         * @param {Event} event Focus event
         * @param {Object} instance The dilog instance.
         *
         * @return {undefined}
         */
        function bringToFront(event, instance){
            
            // Do not bring to front if preceeded by an open modal
            var index = openDialogs.indexOf(instance);
            for(var x=index+1;x<openDialogs.length;x+=1){
                if(openDialogs[x].isModal()){
                    return;
                }
            }
			
            // Bring to front by making it the last child.
            if(document.body.lastChild !== instance.elements.root){
                document.body.appendChild(instance.elements.root);
                //also make sure its at the end of the list
                openDialogs.splice(openDialogs.indexOf(instance),1);
                openDialogs.push(instance);
                setFocus(instance);
            }
			
            return false;
        }
		
        /**
         * Helper: reflects dialogs options updates
         *
         * @param {Object} instance The dilog instance.
         * @param {String} option The updated option name.
         *
         * @return	{undefined}	
         */
        function optionUpdated(instance, option, oldValue, newValue){
            switch(option){
            case 'title':
                instance.setHeader(newValue);
                break;
            case 'modal':
                updateDisplayMode(instance);
                break;
            case 'basic':
                updateBasicMode(instance);
                break;
            case 'frameless':
                updateFramelessMode(instance);
                break;
            case 'pinned':
                updatePinned(instance);
                break;
            case 'closable':
                updateClosable(instance);
                break;
            case 'maximizable':
                updateMaximizable(instance);
                break;
            case 'pinnable':
                updatePinnable(instance);
                break;
            case 'movable':
                updateMovable(instance);
                break;
            case 'resizable':
                updateResizable(instance);
                break;
            case 'transition':
                updateTransition(instance,newValue, oldValue);
                break;
            case 'padding':
                if(newValue){
                    removeClass(instance.elements.root, classes.noPadding);
                }else if(instance.elements.root.className.indexOf(classes.noPadding) < 0){
                    addClass(instance.elements.root, classes.noPadding);
                }
                break;
            case 'overflow':
                if(newValue){
                    removeClass(instance.elements.root, classes.noOverflow);
                }else if(instance.elements.root.className.indexOf(classes.noOverflow) < 0){
                    addClass(instance.elements.root, classes.noOverflow);
                }
                break;
            case 'transition':
                updateTransition(instance,newValue, oldValue);
                break;
            }

            // internal on option updated event
            if(typeof instance.hooks.onupdate === 'function'){
                instance.hooks.onupdate.call(instance, option, oldValue, newValue);
            }
        }
		
        /**
         * Helper: reflects dialogs options updates
         *
         * @param {Object} instance The dilog instance.
         * @param {Object} obj The object to set/get a value on/from.
         * @param {Function} callback The callback function to call if the key was found.
         * @param {String|Object} key A string specifying a propery name or a collection of key value pairs.
         * @param {Object} value Optional, the value associated with the key (in case it was a string).
         * @param {String} option The updated option name.
         *
         * @return	{Object} result object 
         *	The result objects has an 'op' property, indicating of this is a SET or GET operation.
         *		GET: 
         *		- found: a flag indicating if the key was found or not.
         *		- value: the property value.
         *		SET:
         *		- items: a list of key value pairs of the properties being set.
         *				each contains:
         *					- found: a flag indicating if the key was found or not.
         *					- key: the property key.
         *					- value: the property value.
         */
        function update(instance, obj, callback, key, value){
            var result = {op:undefined, items: [] };
            if(typeof value === 'undefined' && typeof key === 'string') {
                //get
                result.op = 'get';
                if(obj.hasOwnProperty(key)){
                    result.found = true;
                    result.value = obj[key];
                }else{
                    result.found = false;
                    result.value = undefined;
                }
            }
            else
            {
                var old;
                //set
                result.op = 'set';
                if(typeof key === 'object'){
                    //set multiple
                    var args = key;
                    for (var prop in args) {
                        if (obj.hasOwnProperty(prop)) {
                            if(obj[prop] !== args[prop]){
                                old = obj[prop];
                                obj[prop] = args[prop];
                                callback.call(instance,prop, old, args[prop]);
                            }
                            result.items.push({ 'key': prop, 'value': args[prop], 'found':true});
                        }else{
                            result.items.push({ 'key': prop, 'value': args[prop], 'found':false});
                        }
                    }
                } else if (typeof key === 'string'){
                    //set single
                    if (obj.hasOwnProperty(key)) {
                        if(obj[key] !== value){
                            old  = obj[key];
                            obj[key] = value;
                            callback.call(instance,key, old, value);
                        }
                        result.items.push({'key': key, 'value': value , 'found':true});

                    }else{
                        result.items.push({'key': key, 'value': value , 'found':false});
                    }
                } else {
                    //invalid params
                    throw new Error('args must be a string or object');
                }
            }
            return result;
        }


        /**
         * Triggers a close event.
         *
         * @param {Object} instance	The dilog instance.
         * 
         * @return {undefined}
         */
        function triggerClose(instance) {
            var found;
            triggerCallback(instance, function (button) {
                return found = (button.invokeOnClose === true);
            });
            //none of the buttons registered as onclose callback
            //close the dialog
            if (!found && instance.isOpen()) {
                instance.close();
            }
        }

        /**
         * Dialogs commands event handler, attached to the dialog commands element.
         *
         * @param {Event} event	DOM event object.
         * @param {Object} instance	The dilog instance.
         * 
         * @return {undefined}
         */
        function commandsClickHandler(event, instance) {
            var target = event.srcElement || event.target;
            switch (target) {
            case instance.elements.commands.pin:
                if (!instance.isPinned()) {
                    pin(instance);
                } else {
                    unpin(instance);
                }
                break;
            case instance.elements.commands.maximize:
                if (!instance.isMaximized()) {
                    maximize(instance);
                } else {
                    restore(instance);
                }
                break;
            case instance.elements.commands.close:
                triggerClose(instance);
                break;
            }
            return false;
        }

        /**
         * Helper: pins the modeless dialog.
         *
         * @param {Object} instance	The dialog instance.
         * 
         * @return {undefined}
         */
        function pin(instance) {
            //pin the dialog
            instance.set('pinned', true);
        }

        /**
         * Helper: unpins the modeless dialog.
         *
         * @param {Object} instance	The dilog instance.
         * 
         * @return {undefined}
         */
        function unpin(instance) {
            //unpin the dialog 
            instance.set('pinned', false);
        }


        /**
         * Helper: enlarges the dialog to fill the entire screen.
         *
         * @param {Object} instance	The dilog instance.
         * 
         * @return {undefined}
         */
        function maximize(instance) {
            // allow custom `onmaximize` method
            dispatchEvent('onmaximize', instance);
            //maximize the dialog 
            addClass(instance.elements.root, classes.maximized);
            if (instance.isOpen()) {
                ensureNoOverflow();
            }
            // allow custom `onmaximized` method
            dispatchEvent('onmaximized', instance);
        }

        /**
         * Helper: returns the dialog to its former size.
         *
         * @param {Object} instance	The dilog instance.
         * 
         * @return {undefined}
         */
        function restore(instance) {
            // allow custom `onrestore` method
            dispatchEvent('onrestore', instance);
            //maximize the dialog 
            removeClass(instance.elements.root, classes.maximized);
            if (instance.isOpen()) {
                ensureNoOverflow();
            }
            // allow custom `onrestored` method
            dispatchEvent('onrestored', instance);
        }

        /**
         * Show or hide the maximize box.
         *
         * @param {Object} instance The dilog instance.
         * @param {Boolean} on True to add the behavior, removes it otherwise.
         *
         * @return {undefined}
         */
        function updatePinnable(instance) {
            if (instance.get('pinnable')) {
                // add class
                addClass(instance.elements.root, classes.pinnable);
            } else {
                // remove class
                removeClass(instance.elements.root, classes.pinnable);
            }
        }

        /**
         * Helper: Fixes the absolutly positioned modal div position.
         *
         * @param {Object} instance The dialog instance.
         *
         * @return {undefined}
         */
        function addAbsPositionFix(instance) {
            var scrollLeft = getScrollLeft();
            instance.elements.modal.style.marginTop = getScrollTop() + 'px';
            instance.elements.modal.style.marginLeft = scrollLeft + 'px';
            instance.elements.modal.style.marginRight = (-scrollLeft) + 'px';
        }

        /**
         * Helper: Removes the absolutly positioned modal div position fix.
         *
         * @param {Object} instance The dialog instance.
         *
         * @return {undefined}
         */
        function removeAbsPositionFix(instance) {
            var marginTop = parseInt(instance.elements.modal.style.marginTop, 10);
            var marginLeft = parseInt(instance.elements.modal.style.marginLeft, 10);
            instance.elements.modal.style.marginTop = '';
            instance.elements.modal.style.marginLeft = '';
            instance.elements.modal.style.marginRight = '';

            if (instance.isOpen()) {
                var top = 0,
                    left = 0
                ;
                if (instance.elements.dialog.style.top !== '') {
                    top = parseInt(instance.elements.dialog.style.top, 10);
                }
                instance.elements.dialog.style.top = (top + (marginTop - getScrollTop())) + 'px';

                if (instance.elements.dialog.style.left !== '') {
                    left = parseInt(instance.elements.dialog.style.left, 10);
                }
                instance.elements.dialog.style.left = (left + (marginLeft - getScrollLeft())) + 'px';
            }
        }
        /**
         * Helper: Adds/Removes the absolutly positioned modal div position fix based on its pinned setting.
         *
         * @param {Object} instance The dialog instance.
         *
         * @return {undefined}
         */
        function updateAbsPositionFix(instance) {
            // if modeless and unpinned add fix
            if (!instance.get('modal') && !instance.get('pinned')) {
                addAbsPositionFix(instance);
            } else {
                removeAbsPositionFix(instance);
            }
        }
        /**
         * Toggles the dialog position lock | modeless only.
         *
         * @param {Object} instance The dilog instance.
         * @param {Boolean} on True to make it modal, false otherwise.
         *
         * @return {undefined}
         */
        function updatePinned(instance) {
            if (instance.get('pinned')) {
                removeClass(instance.elements.root, classes.unpinned);
                if (instance.isOpen()) {
                    removeAbsPositionFix(instance);
                }
            } else {
                addClass(instance.elements.root, classes.unpinned);
                if (instance.isOpen() && !instance.isModal()) {
                    addAbsPositionFix(instance);
                }
            }
        }

        /**
         * Show or hide the maximize box.
         *
         * @param {Object} instance The dilog instance.
         * @param {Boolean} on True to add the behavior, removes it otherwise.
         *
         * @return {undefined}
         */
        function updateMaximizable(instance) {
            if (instance.get('maximizable')) {
                // add class
                addClass(instance.elements.root, classes.maximizable);
            } else {
                // remove class
                removeClass(instance.elements.root, classes.maximizable);
            }
        }

        /**
         * Show or hide the close box.
         *
         * @param {Object} instance The dilog instance.
         * @param {Boolean} on True to add the behavior, removes it otherwise.
         *
         * @return {undefined}
         */
        function updateClosable(instance) {
            if (instance.get('closable')) {
                // add class
                addClass(instance.elements.root, classes.closable);
                bindClosableEvents(instance);
            } else {
                // remove class
                removeClass(instance.elements.root, classes.closable);
                unbindClosableEvents(instance);
            }
        }

        // flag to cancel click event if already handled by end resize event (the mousedown, mousemove, mouseup sequence fires a click event.).
        var cancelClick = false;

        /**
         * Helper: closes the modal dialog when clicking the modal
         *
         * @param {Event} event	DOM event object.
         * @param {Object} instance The dilog instance.
         *
         * @return {undefined}
         */
        function modalClickHandler(event, instance) {
            var target = event.srcElement || event.target;
            if (!cancelClick && target === instance.elements.modal && instance.get('closableByDimmer') === true) {
                triggerClose(instance);
            }
            cancelClick = false;
            return false;
        }

        // flag to cancel keyup event if already handled by click event (pressing Enter on a focusted button).
        var cancelKeyup = false;
        /** 
         * Helper: triggers a button callback
         *
         * @param {Object}		The dilog instance.
         * @param {Function}	Callback to check which button triggered the event.
         *
         * @return {undefined}
         */
        function triggerCallback(instance, check) {
            for (var idx = 0; idx < instance.__internal.buttons.length; idx += 1) {
                var button = instance.__internal.buttons[idx];
                if (!button.element.disabled && check(button)) {
                    var closeEvent = createCloseEvent(idx, button);
                    if (typeof instance.callback === 'function') {
                        instance.callback.apply(instance, [closeEvent]);
                    }
                    //close the dialog only if not canceled.
                    if (closeEvent.cancel === false) {
                        instance.close();
                    }
                    break;
                }
            }
        }

        /**
         * Clicks event handler, attached to the dialog footer.
         *
         * @param {Event}		DOM event object.
         * @param {Object}		The dilog instance.
         * 
         * @return {undefined}
         */
        function buttonsClickHandler(event, instance) {
            var target = event.srcElement || event.target;
            triggerCallback(instance, function (button) {
                // if this button caused the click, cancel keyup event
                return button.element === target && (cancelKeyup = true);
            });
        }

        /**
         * Keyup event handler, attached to the document.body
         *
         * @param {Event}		DOM event object.
         * @param {Object}		The dilog instance.
         * 
         * @return {undefined}
         */
        function keyupHandler(event) {
            //hitting enter while button has focus will trigger keyup too.
            //ignore if handled by clickHandler
            if (cancelKeyup) {
                cancelKeyup = false;
                return;
            }
            var instance = openDialogs[openDialogs.length - 1];
            var keyCode = event.keyCode;
            if (instance.__internal.buttons.length === 0 && keyCode === keys.ESC && instance.get('closable') === true) {
                triggerClose(instance);
                return false;
            }else if (usedKeys.indexOf(keyCode) > -1) {
                triggerCallback(instance, function (button) {
                    return button.key === keyCode;
                });
                return false;
            }
        }
        /**
        * Keydown event handler, attached to the document.body
        *
        * @param {Event}		DOM event object.
        * @param {Object}		The dilog instance.
        * 
        * @return {undefined}
        */
        function keydownHandler(event) {
            var instance = openDialogs[openDialogs.length - 1];
            var keyCode = event.keyCode;
            if (keyCode === keys.LEFT || keyCode === keys.RIGHT) {
                var buttons = instance.__internal.buttons;
                for (var x = 0; x < buttons.length; x += 1) {
                    if (document.activeElement === buttons[x].element) {
                        switch (keyCode) {
                        case keys.LEFT:
                            buttons[(x || buttons.length) - 1].element.focus();
                            return;
                        case keys.RIGHT:
                            buttons[(x + 1) % buttons.length].element.focus();
                            return;
                        }
                    }
                }
            }else if (keyCode < keys.F12 + 1 && keyCode > keys.F1 - 1 && usedKeys.indexOf(keyCode) > -1) {
                event.preventDefault();
                event.stopPropagation();
                triggerCallback(instance, function (button) {
                    return button.key === keyCode;
                });
                return false;
            }
        }


        /**
         * Sets focus to proper dialog element
         *
         * @param {Object} instance The dilog instance.
         * @param {Node} [resetTarget=undefined] DOM element to reset focus to.
         *
         * @return {undefined}
         */
        function setFocus(instance, resetTarget) {
            // reset target has already been determined.
            if (resetTarget) {
                resetTarget.focus();
            } else {
                // current instance focus settings
                var focus = instance.__internal.focus;
                // the focus element.
                var element = focus.element;

                switch (typeof focus.element) {
                // a number means a button index
                case 'number':
                    if (instance.__internal.buttons.length > focus.element) {
                        //in basic view, skip focusing the buttons.
                        if (instance.get('basic') === true) {
                            element = instance.elements.reset[0];
                        } else {
                            element = instance.__internal.buttons[focus.element].element;
                        }
                    }
                    break;
                // a string means querySelector to select from dialog body contents.
                case 'string':
                    element = instance.elements.body.querySelector(focus.element);
                    break;
                // a function should return the focus element.
                case 'function':
                    element = focus.element.call(instance);
                    break;
                }
                
                // if no focus element, default to first reset element.
                if ((typeof element === 'undefined' || element === null) && instance.__internal.buttons.length === 0) {
                    element = instance.elements.reset[0];
                }
                // focus
                if (element && element.focus) {
                    element.focus();
                    // if selectable
                    if (focus.select && element.select) {
                        element.select();
                    }
                }
            }
        }

        /**
         * Focus event handler, attached to document.body and dialogs own reset links.
         * handles the focus for modal dialogs only.
         *
         * @param {Event} event DOM focus event object.
         * @param {Object} instance The dilog instance.
         *
         * @return {undefined}
         */
        function onReset(event, instance) {

            // should work on last modal if triggered from document.body 
            if (!instance) {
                for (var x = openDialogs.length - 1; x > -1; x -= 1) {
                    if (openDialogs[x].isModal()) {
                        instance = openDialogs[x];
                        break;
                    }
                }
            }
            // if modal
            if (instance && instance.isModal()) {
                // determine reset target to enable forward/backward tab cycle.
                var resetTarget, target = event.srcElement || event.target;
                var lastResetElement = target === instance.elements.reset[1] || (instance.__internal.buttons.length === 0 && target === document.body);

                // if last reset link, then go to maximize or close
                if (lastResetElement) {
                    if (instance.get('maximizable')) {
                        resetTarget = instance.elements.commands.maximize;
                    } else if (instance.get('closable')) {
                        resetTarget = instance.elements.commands.close;
                    }
                }
                // if no reset target found, try finding the best button
                if (resetTarget === undefined) {
                    if (typeof instance.__internal.focus.element === 'number') {
                        // button focus element, go to first available button
                        if (target === instance.elements.reset[0]) {
                            resetTarget = instance.elements.buttons.auxiliary.firstChild || instance.elements.buttons.primary.firstChild;
                        } else if (lastResetElement) {
                            //restart the cycle by going to first reset link
                            resetTarget = instance.elements.reset[0];
                        }
                    } else {
                        // will reach here when tapping backwards, so go to last child
                        // The focus element SHOULD NOT be a button (logically!).
                        if (target === instance.elements.reset[0]) {
                            resetTarget = instance.elements.buttons.primary.lastChild || instance.elements.buttons.auxiliary.lastChild;
                        }
                    }
                }
                // focus
                setFocus(instance, resetTarget);
            }
        }
        /**
         * Transition in transitionend event handler. 
         *
         * @param {Event}		TransitionEnd event object.
         * @param {Object}		The dilog instance.
         *
         * @return {undefined}
         */
        function handleTransitionInEvent(event, instance) {
            // clear the timer
            clearTimeout(instance.__internal.timerIn);

            // once transition is complete, set focus
            setFocus(instance);

            //restore scroll to prevent document jump
            restoreScrollPosition();

            // allow handling key up after transition ended.
            cancelKeyup = false;

            // allow custom `onfocus` method
            dispatchEvent('onfocus', instance);

            // unbind the event
            off(instance.elements.dialog, transition.type, instance.__internal.transitionInHandler);

            removeClass(instance.elements.root, classes.animationIn);
        }

        /**
         * Transition out transitionend event handler. 
         *
         * @param {Event}		TransitionEnd event object.
         * @param {Object}		The dilog instance.
         *
         * @return {undefined}
         */
        function handleTransitionOutEvent(event, instance) {
            // clear the timer
            clearTimeout(instance.__internal.timerOut);
            // unbind the event
            off(instance.elements.dialog, transition.type, instance.__internal.transitionOutHandler);

            // reset move updates
            resetMove(instance);
            // reset resize updates
            resetResize(instance);

            // restore if maximized
            if (instance.isMaximized() && !instance.get('startMaximized')) {
                restore(instance);
            }

            // return focus to the last active element
            if (alertify.defaults.maintainFocus && instance.__internal.activeElement) {
                instance.__internal.activeElement.focus();
                instance.__internal.activeElement = null;
            }
            
            //destory the instance
            if (typeof instance.__internal.destroy === 'function') {
                instance.__internal.destroy.apply(instance);
            }
        }
        /* Controls moving a dialog around */
        //holde the current moving instance
        var movable = null,
            //holds the current X offset when move starts
            offsetX = 0,
            //holds the current Y offset when move starts
            offsetY = 0,
            xProp = 'pageX',
            yProp = 'pageY',
            bounds = null,
            refreshTop = false,
            moveDelegate = null
        ;

        /**
         * Helper: sets the element top/left coordinates
         *
         * @param {Event} event	DOM event object.
         * @param {Node} element The element being moved.
         * 
         * @return {undefined}
         */
        function moveElement(event, element) {
            var left = (event[xProp] - offsetX),
                top  = (event[yProp] - offsetY);

            if(refreshTop){
                top -= document.body.scrollTop;
            }
           
            element.style.left = left + 'px';
            element.style.top = top + 'px';
           
        }
        /**
         * Helper: sets the element top/left coordinates within screen bounds
         *
         * @param {Event} event	DOM event object.
         * @param {Node} element The element being moved.
         * 
         * @return {undefined}
         */
        function moveElementBounded(event, element) {
            var left = (event[xProp] - offsetX),
                top  = (event[yProp] - offsetY);

            if(refreshTop){
                top -= document.body.scrollTop;
            }
            
            element.style.left = Math.min(bounds.maxLeft, Math.max(bounds.minLeft, left)) + 'px';
            if(refreshTop){
                element.style.top = Math.min(bounds.maxTop, Math.max(bounds.minTop, top)) + 'px';
            }else{
                element.style.top = Math.max(bounds.minTop, top) + 'px';
            }
        }
            

        /**
         * Triggers the start of a move event, attached to the header element mouse down event.
         * Adds no-selection class to the body, disabling selection while moving.
         *
         * @param {Event} event	DOM event object.
         * @param {Object} instance The dilog instance.
         * 
         * @return {Boolean} false
         */
        function beginMove(event, instance) {
            if (resizable === null && !instance.isMaximized() && instance.get('movable')) {
                var eventSrc, left=0, top=0;
                if (event.type === 'touchstart') {
                    event.preventDefault();
                    eventSrc = event.targetTouches[0];
                    xProp = 'clientX';
                    yProp = 'clientY';
                } else if (event.button === 0) {
                    eventSrc = event;
                }

                if (eventSrc) {

                    var element = instance.elements.dialog;
                    addClass(element, classes.capture);

                    if (element.style.left) {
                        left = parseInt(element.style.left, 10);
                    }

                    if (element.style.top) {
                        top = parseInt(element.style.top, 10);
                    }
                    
                    offsetX = eventSrc[xProp] - left;
                    offsetY = eventSrc[yProp] - top;

                    if(instance.isModal()){
                        offsetY += instance.elements.modal.scrollTop;
                    }else if(instance.isPinned()){
                        offsetY -= document.body.scrollTop;
                    }
                    
                    if(instance.get('moveBounded')){
                        var current = element,
                            offsetLeft = -left,
                            offsetTop = -top;
                        
                        //calc offset
                        do {
                            offsetLeft += current.offsetLeft;
                            offsetTop += current.offsetTop;
                        } while (current = current.offsetParent);
                        
                        bounds = {
                            maxLeft : offsetLeft,
                            minLeft : -offsetLeft,
                            maxTop  : document.documentElement.clientHeight - element.clientHeight - offsetTop,
                            minTop  : -offsetTop
                        };
                        moveDelegate = moveElementBounded;
                    }else{
                        bounds = null;
                        moveDelegate = moveElement;
                    }
                    
                    // allow custom `onmove` method
                    dispatchEvent('onmove', instance);

                    refreshTop = !instance.isModal() && instance.isPinned();
                    movable = instance;
                    moveDelegate(eventSrc, element);
                    addClass(document.body, classes.noSelection);
                    return false;
                }
            }
        }

        /**
         * The actual move handler,  attached to document.body mousemove event.
         *
         * @param {Event} event	DOM event object.
         * 
         * @return {undefined}
         */
        function move(event) {
            if (movable) {
                var eventSrc;
                if (event.type === 'touchmove') {
                    event.preventDefault();
                    eventSrc = event.targetTouches[0];
                } else if (event.button === 0) {
                    eventSrc = event;
                }
                if (eventSrc) {
                    moveDelegate(eventSrc, movable.elements.dialog);
                }
            }
        }

        /**
         * Triggers the end of a move event,  attached to document.body mouseup event.
         * Removes no-selection class from document.body, allowing selection.
         *
         * @return {undefined}
         */
        function endMove() {
            if (movable) {
                var instance = movable;
                movable = bounds = null;
                removeClass(document.body, classes.noSelection);
                removeClass(instance.elements.dialog, classes.capture);
                // allow custom `onmoved` method
                dispatchEvent('onmoved', instance);
            }
        }

        /**
         * Resets any changes made by moving the element to its original state,
         *
         * @param {Object} instance The dilog instance.
         *
         * @return {undefined}
         */
        function resetMove(instance) {
            movable = null;
            var element = instance.elements.dialog;
            element.style.left = element.style.top = '';
        }

        /**
         * Updates the dialog move behavior.
         *
         * @param {Object} instance The dilog instance.
         * @param {Boolean} on True to add the behavior, removes it otherwise.
         *
         * @return {undefined}
         */
        function updateMovable(instance) {
            if (instance.get('movable')) {
                // add class
                addClass(instance.elements.root, classes.movable);
                if (instance.isOpen()) {
                    bindMovableEvents(instance);
                }
            } else {

                //reset
                resetMove(instance);
                // remove class
                removeClass(instance.elements.root, classes.movable);
                if (instance.isOpen()) {
                    unbindMovableEvents(instance);
                }
            }
        }

        /* Controls moving a dialog around */
        //holde the current instance being resized		
        var resizable = null,
            //holds the staring left offset when resize starts.
            startingLeft = Number.Nan,
            //holds the staring width when resize starts.
            startingWidth = 0,
            //holds the initial width when resized for the first time.
            minWidth = 0,
            //holds the offset of the resize handle.
            handleOffset = 0
        ;

        /**
         * Helper: sets the element width/height and updates left coordinate if neccessary.
         *
         * @param {Event} event	DOM mousemove event object.
         * @param {Node} element The element being moved.
         * @param {Boolean} pinned A flag indicating if the element being resized is pinned to the screen.
         * 
         * @return {undefined}
         */
        function resizeElement(event, element, pageRelative) {

            //calculate offsets from 0,0
            var current = element;
            var offsetLeft = 0;
            var offsetTop = 0;
            do {
                offsetLeft += current.offsetLeft;
                offsetTop += current.offsetTop;
            } while (current = current.offsetParent);

            // determine X,Y coordinates.
            var X, Y;
            if (pageRelative === true) {
                X = event.pageX;
                Y = event.pageY;
            } else {
                X = event.clientX;
                Y = event.clientY;
            }
            // rtl handling
            var isRTL = isRightToLeft();
            if (isRTL) {
                // reverse X 
                X = document.body.offsetWidth - X;
                // if has a starting left, calculate offsetRight
                if (!isNaN(startingLeft)) {
                    offsetLeft = document.body.offsetWidth - offsetLeft - element.offsetWidth;
                }
            }

            // set width/height
            element.style.height = (Y - offsetTop + handleOffset) + 'px';
            element.style.width = (X - offsetLeft + handleOffset) + 'px';

            // if the element being resized has a starting left, maintain it.
            // the dialog is centered, divide by half the offset to maintain the margins.
            if (!isNaN(startingLeft)) {
                var diff = Math.abs(element.offsetWidth - startingWidth) * 0.5;
                if (isRTL) {
                    //negate the diff, why?
                    //when growing it should decrease left
                    //when shrinking it should increase left
                    diff *= -1;
                }
                if (element.offsetWidth > startingWidth) {
                    //growing
                    element.style.left = (startingLeft + diff) + 'px';
                } else if (element.offsetWidth >= minWidth) {
                    //shrinking
                    element.style.left = (startingLeft - diff) + 'px';
                }
            }
        }

        /**
         * Triggers the start of a resize event, attached to the resize handle element mouse down event.
         * Adds no-selection class to the body, disabling selection while moving.
         *
         * @param {Event} event	DOM event object.
         * @param {Object} instance The dilog instance.
         * 
         * @return {Boolean} false
         */
        function beginResize(event, instance) {
            if (!instance.isMaximized()) {
                var eventSrc;
                if (event.type === 'touchstart') {
                    event.preventDefault();
                    eventSrc = event.targetTouches[0];
                } else if (event.button === 0) {
                    eventSrc = event;
                }
                if (eventSrc) {
                    // allow custom `onresize` method
                    dispatchEvent('onresize', instance);
                    
                    resizable = instance;
                    handleOffset = instance.elements.resizeHandle.offsetHeight / 2;
                    var element = instance.elements.dialog;
                    addClass(element, classes.capture);
                    startingLeft = parseInt(element.style.left, 10);
                    element.style.height = element.offsetHeight + 'px';
                    element.style.minHeight = instance.elements.header.offsetHeight + instance.elements.footer.offsetHeight + 'px';
                    element.style.width = (startingWidth = element.offsetWidth) + 'px';

                    if (element.style.maxWidth !== 'none') {
                        element.style.minWidth = (minWidth = element.offsetWidth) + 'px';
                    }
                    element.style.maxWidth = 'none';
                    addClass(document.body, classes.noSelection);
                    return false;
                }
            }
        }

        /**
         * The actual resize handler,  attached to document.body mousemove event.
         *
         * @param {Event} event	DOM event object.
         * 
         * @return {undefined}
         */
        function resize(event) {
            if (resizable) {
                var eventSrc;
                if (event.type === 'touchmove') {
                    event.preventDefault();
                    eventSrc = event.targetTouches[0];
                } else if (event.button === 0) {
                    eventSrc = event;
                }
                if (eventSrc) {
                    resizeElement(eventSrc, resizable.elements.dialog, !resizable.get('modal') && !resizable.get('pinned'));
                }
            }
        }

        /**
         * Triggers the end of a resize event,  attached to document.body mouseup event.
         * Removes no-selection class from document.body, allowing selection.
         *
         * @return {undefined}
         */
        function endResize() {
            if (resizable) {
                var instance = resizable;
                resizable = null;
                removeClass(document.body, classes.noSelection);
                removeClass(instance.elements.dialog, classes.capture);
                cancelClick = true;
                // allow custom `onresized` method
                dispatchEvent('onresized', instance);
            }
        }

        /**
         * Resets any changes made by resizing the element to its original state.
         *
         * @param {Object} instance The dilog instance.
         *
         * @return {undefined}
         */
        function resetResize(instance) {
            resizable = null;
            var element = instance.elements.dialog;
            if (element.style.maxWidth === 'none') {
                //clear inline styles.
                element.style.maxWidth = element.style.minWidth = element.style.width = element.style.height = element.style.minHeight = element.style.left = '';
                //reset variables.
                startingLeft = Number.Nan;
                startingWidth = minWidth = handleOffset = 0;
            }
        }


        /**
         * Updates the dialog move behavior.
         *
         * @param {Object} instance The dilog instance.
         * @param {Boolean} on True to add the behavior, removes it otherwise.
         *
         * @return {undefined}
         */
        function updateResizable(instance) {
            if (instance.get('resizable')) {
                // add class
                addClass(instance.elements.root, classes.resizable);
                if (instance.isOpen()) {
                    bindResizableEvents(instance);
                }
            } else {
                //reset
                resetResize(instance);
                // remove class
                removeClass(instance.elements.root, classes.resizable);
                if (instance.isOpen()) {
                    unbindResizableEvents(instance);
                }
            }
        }

        /**
         * Reset move/resize on window resize.
         *
         * @param {Event} event	window resize event object.
         *
         * @return {undefined}
         */
        function windowResize(/*event*/) {
            for (var x = 0; x < openDialogs.length; x += 1) {
                var instance = openDialogs[x];
                if (instance.get('autoReset')) {
                    resetMove(instance);
                    resetResize(instance);
                }
            }
        }
        /**
         * Bind dialogs events
         *
         * @param {Object} instance The dilog instance.
         *
         * @return {undefined}
         */
        function bindEvents(instance) {
            // if first dialog, hook global handlers
            if (openDialogs.length === 1) {
                //global
                on(window, 'resize', windowResize);
                on(document.body, 'keyup', keyupHandler);
                on(document.body, 'keydown', keydownHandler);
                on(document.body, 'focus', onReset);

                //move
                on(document.documentElement, 'mousemove', move);
                on(document.documentElement, 'touchmove', move);
                on(document.documentElement, 'mouseup', endMove);
                on(document.documentElement, 'touchend', endMove);
                //resize
                on(document.documentElement, 'mousemove', resize);
                on(document.documentElement, 'touchmove', resize);
                on(document.documentElement, 'mouseup', endResize);
                on(document.documentElement, 'touchend', endResize);
            }

            // common events
            on(instance.elements.commands.container, 'click', instance.__internal.commandsClickHandler);
            on(instance.elements.footer, 'click', instance.__internal.buttonsClickHandler);
            on(instance.elements.reset[0], 'focus', instance.__internal.resetHandler);
            on(instance.elements.reset[1], 'focus', instance.__internal.resetHandler);

            //prevent handling key up when dialog is being opened by a key stroke.
            cancelKeyup = true;
            // hook in transition handler
            on(instance.elements.dialog, transition.type, instance.__internal.transitionInHandler);

            // modelss only events
            if (!instance.get('modal')) {
                bindModelessEvents(instance);
            }

            // resizable
            if (instance.get('resizable')) {
                bindResizableEvents(instance);
            }

            // movable
            if (instance.get('movable')) {
                bindMovableEvents(instance);
            }
        }

        /**
         * Unbind dialogs events
         *
         * @param {Object} instance The dilog instance.
         *
         * @return {undefined}
         */
        function unbindEvents(instance) {
            // if last dialog, remove global handlers
            if (openDialogs.length === 1) {
                //global
                off(window, 'resize', windowResize);
                off(document.body, 'keyup', keyupHandler);
                off(document.body, 'keydown', keydownHandler);
                off(document.body, 'focus', onReset);
                //move
                off(document.documentElement, 'mousemove', move);
                off(document.documentElement, 'mouseup', endMove);
                //resize
                off(document.documentElement, 'mousemove', resize);
                off(document.documentElement, 'mouseup', endResize);
            }

            // common events
            off(instance.elements.commands.container, 'click', instance.__internal.commandsClickHandler);
            off(instance.elements.footer, 'click', instance.__internal.buttonsClickHandler);
            off(instance.elements.reset[0], 'focus', instance.__internal.resetHandler);
            off(instance.elements.reset[1], 'focus', instance.__internal.resetHandler);

            // hook out transition handler
            on(instance.elements.dialog, transition.type, instance.__internal.transitionOutHandler);

            // modelss only events
            if (!instance.get('modal')) {
                unbindModelessEvents(instance);
            }

            // movable
            if (instance.get('movable')) {
                unbindMovableEvents(instance);
            }

            // resizable
            if (instance.get('resizable')) {
                unbindResizableEvents(instance);
            }

        }

        /**
         * Bind modeless specific events
         *
         * @param {Object} instance The dilog instance.
         *
         * @return {undefined}
         */
        function bindModelessEvents(instance) {
            on(instance.elements.dialog, 'focus', instance.__internal.bringToFrontHandler, true);
        }

        /**
         * Unbind modeless specific events
         *
         * @param {Object} instance The dilog instance.
         *
         * @return {undefined}
         */
        function unbindModelessEvents(instance) {
            off(instance.elements.dialog, 'focus', instance.__internal.bringToFrontHandler, true);
        }



        /**
         * Bind movable specific events
         *
         * @param {Object} instance The dilog instance.
         *
         * @return {undefined}
         */
        function bindMovableEvents(instance) {
            on(instance.elements.header, 'mousedown', instance.__internal.beginMoveHandler);
            on(instance.elements.header, 'touchstart', instance.__internal.beginMoveHandler);
        }

        /**
         * Unbind movable specific events
         *
         * @param {Object} instance The dilog instance.
         *
         * @return {undefined}
         */
        function unbindMovableEvents(instance) {
            off(instance.elements.header, 'mousedown', instance.__internal.beginMoveHandler);
            off(instance.elements.header, 'touchstart', instance.__internal.beginMoveHandler);
        }



        /**
         * Bind resizable specific events
         *
         * @param {Object} instance The dilog instance.
         *
         * @return {undefined}
         */
        function bindResizableEvents(instance) {
            on(instance.elements.resizeHandle, 'mousedown', instance.__internal.beginResizeHandler);
            on(instance.elements.resizeHandle, 'touchstart', instance.__internal.beginResizeHandler);
        }

        /**
         * Unbind resizable specific events
         *
         * @param {Object} instance The dilog instance.
         *
         * @return {undefined}
         */
        function unbindResizableEvents(instance) {
            off(instance.elements.resizeHandle, 'mousedown', instance.__internal.beginResizeHandler);
            off(instance.elements.resizeHandle, 'touchstart', instance.__internal.beginResizeHandler);
        }

        /**
         * Bind closable events
         *
         * @param {Object} instance The dilog instance.
         *
         * @return {undefined}
         */
        function bindClosableEvents(instance) {
            on(instance.elements.modal, 'click', instance.__internal.modalClickHandler);
        }

        /**
         * Unbind closable specific events
         *
         * @param {Object} instance The dilog instance.
         *
         * @return {undefined}
         */
        function unbindClosableEvents(instance) {
            off(instance.elements.modal, 'click', instance.__internal.modalClickHandler);
        }
        // dialog API
        return {
            __init:initialize,
            /**
             * Check if dialog is currently open
             *
             * @return {Boolean}
             */
            isOpen: function () {
                return this.__internal.isOpen;
            },
            isModal: function (){
                return this.elements.root.className.indexOf(classes.modeless) < 0;
            },
            isMaximized:function(){
                return this.elements.root.className.indexOf(classes.maximized) > -1;
            },
            isPinned:function(){
                return this.elements.root.className.indexOf(classes.unpinned) < 0;
            },
            maximize:function(){
                if(!this.isMaximized()){
                    maximize(this);
                }
                return this;
            },
            restore:function(){
                if(this.isMaximized()){
                    restore(this);
                }
                return this;
            },
            pin:function(){
                if(!this.isPinned()){
                    pin(this);
                }
                return this;
            },
            unpin:function(){
                if(this.isPinned()){
                    unpin(this);
                }
                return this;
            },
            bringToFront:function(){
                bringToFront(null, this);
                return this;
            },
            /**
             * Move the dialog to a specific x/y coordinates
             *
             * @param {Number} x    The new dialog x coordinate in pixels.
             * @param {Number} y    The new dialog y coordinate in pixels.
             *
             * @return {Object} The dialog instance.
             */
            moveTo:function(x,y){
                if(!isNaN(x) && !isNaN(y)){
                    // allow custom `onmove` method
                    dispatchEvent('onmove', this);
                    
                    var element = this.elements.dialog,
                        current = element,
                        offsetLeft = 0,
                        offsetTop = 0;
                    
                    //subtract existing left,top
                    if (element.style.left) {
                        offsetLeft -= parseInt(element.style.left, 10);
                    }
                    if (element.style.top) {
                        offsetTop -= parseInt(element.style.top, 10);
                    }
                    //calc offset
                    do {
                        offsetLeft += current.offsetLeft;
                        offsetTop += current.offsetTop;
                    } while (current = current.offsetParent);

                    //calc left, top
                    var left = (x - offsetLeft);
                    var top  = (y - offsetTop);

                    //// rtl handling
                    if (isRightToLeft()) {
                        left *= -1;
                    }

                    element.style.left = left + 'px';
                    element.style.top = top + 'px';
                    
                    // allow custom `onmoved` method
                    dispatchEvent('onmoved', this);
                }
                return this;
            },
            /**
             * Resize the dialog to a specific width/height (the dialog must be 'resizable').
             * The dialog can be resized to:
             *  A minimum width equal to the initial display width
             *  A minimum height equal to the sum of header/footer heights.
             *
             *
             * @param {Number or String} width    The new dialog width in pixels or in percent.
             * @param {Number or String} height   The new dialog height in pixels or in percent.
             *
             * @return {Object} The dialog instance.
             */
            resizeTo:function(width,height){
                var w = parseFloat(width),
                    h = parseFloat(height),
                    regex = /(\d*\.\d+|\d+)%/
                ;

                if(!isNaN(w) && !isNaN(h) && this.get('resizable') === true){
                    
                    // allow custom `onresize` method
                    dispatchEvent('onresize', this);
                    
                    if(('' + width).match(regex)){
                        w = w / 100 * document.documentElement.clientWidth ;
                    }

                    if(('' + height).match(regex)){
                        h = h / 100 * document.documentElement.clientHeight;
                    }

                    var element = this.elements.dialog;
                    if (element.style.maxWidth !== 'none') {
                        element.style.minWidth = (minWidth = element.offsetWidth) + 'px';
                    }
                    element.style.maxWidth = 'none';
                    element.style.minHeight = this.elements.header.offsetHeight + this.elements.footer.offsetHeight + 'px';
                    element.style.width = w + 'px';
                    element.style.height = h + 'px';
                    
                    // allow custom `onresized` method
                    dispatchEvent('onresized', this);
                }
                return this;
            },
            /**
             * Gets or Sets dialog settings/options 
             *
             * @param {String|Object} key A string specifying a propery name or a collection of key/value pairs.
             * @param {Object} value Optional, the value associated with the key (in case it was a string).
             *
             * @return {undefined}
             */
            setting : function (key, value) {
                var self = this;
                var result = update(this, this.__internal.options, function(k,o,n){ optionUpdated(self,k,o,n); }, key, value);
                if(result.op === 'get'){
                    if(result.found){
                        return result.value;
                    }else if(typeof this.settings !== 'undefined'){
                        return update(this, this.settings, this.settingUpdated || function(){}, key, value).value;
                    }else{
                        return undefined;
                    }
                }else if(result.op === 'set'){
                    if(result.items.length > 0){
                        var callback = this.settingUpdated || function(){};
                        for(var x=0;x<result.items.length;x+=1){
                            var item = result.items[x];
                            if(!item.found && typeof this.settings !== 'undefined'){
                                update(this, this.settings, callback, item.key, item.value);
                            }
                        }
                    }
                    return this;
                }
            },
            /**
             * [Alias] Sets dialog settings/options 
             */
            set:function(key, value){
                this.setting(key,value);
                return this;
            },
            /**
             * [Alias] Gets dialog settings/options 
             */
            get:function(key){
                return this.setting(key);
            },
            /**
            * Sets dialog header
            * @content {string or element}
            *
            * @return {undefined}
            */
            setHeader:function(content){
                if(typeof content === 'string'){
                    clearContents(this.elements.header);
                    this.elements.header.innerHTML = content;
                }else if (content instanceof window.HTMLElement && this.elements.header.firstChild !== content){
                    clearContents(this.elements.header);
                    this.elements.header.appendChild(content);
                }
                return this;
            },
            /**
            * Sets dialog contents
            * @content {string or element}
            *
            * @return {undefined}
            */
            setContent:function(content){
                if(typeof content === 'string'){
                    clearContents(this.elements.content);
                    this.elements.content.innerHTML = content;
                }else if (content instanceof window.HTMLElement && this.elements.content.firstChild !== content){
                    clearContents(this.elements.content);
                    this.elements.content.appendChild(content);
                }
                return this;
            },
            /**
             * Show the dialog as modal
             *
             * @return {Object} the dialog instance.
             */
            showModal: function(className){
                return this.show(true, className);
            },
            /**
             * Show the dialog
             *
             * @return {Object} the dialog instance.
             */
            show: function (modal, className) {
                
                // ensure initialization
                initialize(this);

                if ( !this.__internal.isOpen ) {

                    // add to open dialogs
                    this.__internal.isOpen = true;
                    openDialogs.push(this);

                    // save last focused element
                    if(alertify.defaults.maintainFocus){
                        this.__internal.activeElement = document.activeElement;
                    }

                    //allow custom dom manipulation updates before showing the dialog.
                    if(typeof this.prepare === 'function'){
                        this.prepare();
                    }

                    bindEvents(this);

                    if(modal !== undefined){
                        this.set('modal', modal);
                    }

                    //save scroll to prevent document jump
                    saveScrollPosition();

                    ensureNoOverflow();

                    // allow custom dialog class on show
                    if(typeof className === 'string' && className !== ''){
                        this.__internal.className = className;
                        addClass(this.elements.root, className);
                    }

                    // maximize if start maximized
                    if ( this.get('startMaximized')) {
                        this.maximize();
                    }else if(this.isMaximized()){
                        restore(this);
                    }

                    updateAbsPositionFix(this);

                    removeClass(this.elements.root, classes.animationOut);
                    addClass(this.elements.root, classes.animationIn);

                    // set 1s fallback in case transition event doesn't fire
                    clearTimeout( this.__internal.timerIn);
                    this.__internal.timerIn = setTimeout( this.__internal.transitionInHandler, transition.supported ? 1000 : 100 );

                    if(isSafari){
                        // force desktop safari reflow
                        var root = this.elements.root;
                        root.style.display  = 'none';
                        setTimeout(function(){root.style.display  = 'block';}, 0);
                    }

                    //reflow
                    reflow = this.elements.root.offsetWidth;
                  
                    // show dialog
                    removeClass(this.elements.root, classes.hidden);

                    // internal on show event
                    if(typeof this.hooks.onshow === 'function'){
                        this.hooks.onshow.call(this);
                    }

                    // allow custom `onshow` method
                    dispatchEvent('onshow', this);

                }else{
                    // reset move updates
                    resetMove(this);
                    // reset resize updates
                    resetResize(this);
                    // shake the dialog to indicate its already open
                    addClass(this.elements.dialog, classes.shake);
                    var self = this;
                    setTimeout(function(){
                        removeClass(self.elements.dialog, classes.shake);
                    },200);
                }
                return this;
            },
            /**
             * Close the dialog
             *
             * @return {Object} The dialog instance
             */
            close: function () {
                if (this.__internal.isOpen ) {

                    unbindEvents(this);

                    removeClass(this.elements.root, classes.animationIn);
                    addClass(this.elements.root, classes.animationOut);

                    // set 1s fallback in case transition event doesn't fire
                    clearTimeout( this.__internal.timerOut );
                    this.__internal.timerOut = setTimeout( this.__internal.transitionOutHandler, transition.supported ? 1000 : 100 );
                    // hide dialog
                    addClass(this.elements.root, classes.hidden);
                    //reflow
                    reflow = this.elements.modal.offsetWidth;

                    // remove custom dialog class on hide
                    if (typeof this.__internal.className !== 'undefined' && this.__internal.className !== '') {
                        removeClass(this.elements.root, this.__internal.className);
                    }

                    // internal on close event
                    if(typeof this.hooks.onclose === 'function'){
                        this.hooks.onclose.call(this);
                    }

                    // allow custom `onclose` method
                    dispatchEvent('onclose', this);

                    //remove from open dialogs
                    openDialogs.splice(openDialogs.indexOf(this),1);
                    this.__internal.isOpen = false;

                    ensureNoOverflow();

                }
                return this;
            },
            /**
             * Close all open dialogs except this.
             *
             * @return {undefined}
             */
            closeOthers:function(){
                alertify.closeAll(this);
                return this;
            },
            /**
             * Destroys this dialog instance
             *
             * @return {undefined}
             */
            destroy:function(){
                if (this.__internal.isOpen ) {
                    //mark dialog for destruction, this will be called on tranistionOut event.
                    this.__internal.destroy = function(){
                        destruct(this, initialize);
                    };
                    //close the dialog to unbind all events.
                    this.close();
                }else{
                    destruct(this, initialize);
                }
                return this;
            },
        };
	} () );
    var notifier = (function () {
        var reflow,
            element,
            openInstances = [],
            classes = {
                base: 'alertify-notifier',
                message: 'ajs-message',
                top: 'ajs-top',
                right: 'ajs-right',
                bottom: 'ajs-bottom',
                left: 'ajs-left',
                visible: 'ajs-visible',
                hidden: 'ajs-hidden',
                close: 'ajs-close'
            };
        /**
         * Helper: initializes the notifier instance
         * 
         */
        function initialize(instance) {

            if (!instance.__internal) {
                instance.__internal = {
                    position: alertify.defaults.notifier.position,
                    delay: alertify.defaults.notifier.delay,
                };

                element = document.createElement('DIV');

                updatePosition(instance);
            }

            //add to DOM tree.
            if (element.parentNode !== document.body) {
                document.body.appendChild(element);
            }
        }
        
        function pushInstance(instance) {
            instance.__internal.pushed = true;
            openInstances.push(instance);
        }
        function popInstance(instance) {
            openInstances.splice(openInstances.indexOf(instance), 1);
            instance.__internal.pushed = false;
        }
        /**
         * Helper: update the notifier instance position
         * 
         */
        function updatePosition(instance) {
            element.className = classes.base;
            switch (instance.__internal.position) {
            case 'top-right':
                addClass(element, classes.top + ' ' + classes.right);
                break;
            case 'top-left':
                addClass(element, classes.top + ' ' + classes.left);
                break;
            case 'bottom-left':
                addClass(element, classes.bottom + ' ' + classes.left);
                break;

            default:
            case 'bottom-right':
                addClass(element, classes.bottom + ' ' + classes.right);
                break;
            }
        }

        /**
        * creates a new notification message
        *
        * @param  {DOMElement} message	The notifier message element
        * @param  {Number} wait   Time (in ms) to wait before the message is dismissed, a value of 0 means keep open till clicked.
        * @param  {Function} callback A callback function to be invoked when the message is dismissed.
        *
        * @return {undefined}
        */
        function create(div, callback) {

            function clickDelegate(event, instance) {
                if(!instance.__internal.closeButton || event.target.getAttribute('data-close') === 'true'){
                    instance.dismiss(true);
                }
            }

            function transitionDone(event, instance) {
                // unbind event
                off(instance.element, transition.type, transitionDone);
                // remove the message
                element.removeChild(instance.element);
            }

            function initialize(instance) {
                if (!instance.__internal) {
                    instance.__internal = {
                        pushed: false,
                        delay : undefined,
                        timer: undefined,
                        clickHandler: undefined,
                        transitionEndHandler: undefined,
                        transitionTimeout: undefined
                    };
                    instance.__internal.clickHandler = delegate(instance, clickDelegate);
                    instance.__internal.transitionEndHandler = delegate(instance, transitionDone);
                }
                return instance;
            }
            function clearTimers(instance) {
                clearTimeout(instance.__internal.timer);
                clearTimeout(instance.__internal.transitionTimeout);
            }
            return initialize({
                /* notification DOM element*/
                element: div,
                /*
                 * Pushes a notification message 
                 * @param {string or DOMElement} content The notification message content
                 * @param {Number} wait The time (in seconds) to wait before the message is dismissed, a value of 0 means keep open till clicked.
                 * 
                 */
                push: function (_content, _wait) {
                    if (!this.__internal.pushed) {

                        pushInstance(this);
                        clearTimers(this);

                        var content, wait;
                        switch (arguments.length) {
                        case 0:
                            wait = this.__internal.delay;
                            break;
                        case 1:
                            if (typeof (_content) === 'number') {
                                wait = _content;
                            } else {
                                content = _content;
                                wait = this.__internal.delay;
                            }
                            break;
                        case 2:
                            content = _content;
                            wait = _wait;
                            break;
                        }
                        this.__internal.closeButton = alertify.defaults.notifier.closeButton;
                        // set contents
                        if (typeof content !== 'undefined') {
                            this.setContent(content);
                        }
                        // append or insert
                        if (notifier.__internal.position.indexOf('top') < 0) {
                            element.appendChild(this.element);
                        } else {
                            element.insertBefore(this.element, element.firstChild);
                        }
                        reflow = this.element.offsetWidth;
                        addClass(this.element, classes.visible);
                        // attach click event
                        on(this.element, 'click', this.__internal.clickHandler);
                        return this.delay(wait);
                    }
                    return this;
                },
                /*
                 * {Function} callback function to be invoked before dismissing the notification message.
                 * Remarks: A return value === 'false' will cancel the dismissal
                 * 
                 */
                ondismiss: function () { },
                /*
                 * {Function} callback function to be invoked when the message is dismissed.
                 * 
                 */
                callback: callback,
                /*
                 * Dismisses the notification message 
                 * @param {Boolean} clicked A flag indicating if the dismissal was caused by a click.
                 * 
                 */
                dismiss: function (clicked) {
                    if (this.__internal.pushed) {
                        clearTimers(this);
                        if (!(typeof this.ondismiss === 'function' && this.ondismiss.call(this) === false)) {
                            //detach click event
                            off(this.element, 'click', this.__internal.clickHandler);
                            // ensure element exists
                            if (typeof this.element !== 'undefined' && this.element.parentNode === element) {
                                //transition end or fallback
                                this.__internal.transitionTimeout = setTimeout(this.__internal.transitionEndHandler, transition.supported ? 1000 : 100);
                                removeClass(this.element, classes.visible);

                                // custom callback on dismiss
                                if (typeof this.callback === 'function') {
                                    this.callback.call(this, clicked);
                                }
                            }
                            popInstance(this);
                        }
                    }
                    return this;
                },
                /*
                 * Delays the notification message dismissal
                 * @param {Number} wait The time (in seconds) to wait before the message is dismissed, a value of 0 means keep open till clicked.
                 * 
                 */
                delay: function (wait) {
                    clearTimers(this);
                    this.__internal.delay = typeof wait !== 'undefined' && !isNaN(+wait) ? +wait : notifier.__internal.delay;
                    if (this.__internal.delay > 0) {
                        var  self = this;
                        this.__internal.timer = setTimeout(function () { self.dismiss(); }, this.__internal.delay * 1000);
                    }
                    return this;
                },
                /*
                 * Sets the notification message contents
                 * @param {string or DOMElement} content The notification message content
                 * 
                 */
                setContent: function (content) {
                    if (typeof content === 'string') {
                        clearContents(this.element);
                        this.element.innerHTML = content;
                    } else if (content instanceof window.HTMLElement && this.element.firstChild !== content) {
                        clearContents(this.element);
                        this.element.appendChild(content);
                    }
                    if(this.__internal.closeButton){
                        var close = document.createElement('span');
                        addClass(close, classes.close);
                        close.setAttribute('data-close', true);
                        this.element.appendChild(close);
                    }
                    return this;
                },
                /*
                 * Dismisses all open notifications except this.
                 * 
                 */
                dismissOthers: function () {
                    notifier.dismissAll(this);
                    return this;
                }
            });
        }

        //notifier api
        return {
            /**
             * Gets or Sets notifier settings. 
             *
             * @param {string} key The setting name
             * @param {Variant} value The setting value.
             *
             * @return {Object}	if the called as a setter, return the notifier instance.
             */
            setting: function (key, value) {
                //ensure init
                initialize(this);

                if (typeof value === 'undefined') {
                    //get
                    return this.__internal[key];
                } else {
                    //set
                    switch (key) {
                    case 'position':
                        this.__internal.position = value;
                        updatePosition(this);
                        break;
                    case 'delay':
                        this.__internal.delay = value;
                        break;
                    }
                }
                return this;
            },
            /**
             * [Alias] Sets dialog settings/options 
             */
            set:function(key,value){
                this.setting(key,value);
                return this;
            },
            /**
             * [Alias] Gets dialog settings/options 
             */
            get:function(key){
                return this.setting(key);
            },
            /**
             * Creates a new notification message
             *
             * @param {string} type The type of notification message (simply a CSS class name 'ajs-{type}' to be added).
             * @param {Function} callback  A callback function to be invoked when the message is dismissed.
             *
             * @return {undefined}
             */
            create: function (type, callback) {
                //ensure notifier init
                initialize(this);
                //create new notification message
                var div = document.createElement('div');
                div.className = classes.message + ((typeof type === 'string' && type !== '') ? ' ajs-' + type : '');
                return create(div, callback);
            },
            /**
             * Dismisses all open notifications.
             *
             * @param {Object} excpet [optional] The notification object to exclude from dismissal.
             *
             */
            dismissAll: function (except) {
                var clone = openInstances.slice(0);
                for (var x = 0; x < clone.length; x += 1) {
                    var  instance = clone[x];
                    if (except === undefined || except !== instance) {
                        instance.dismiss();
                    }
                }
            }
        };
    })();
    /**
     * Alertify public API
     * This contains everything that is exposed through the alertify object.
     *
     * @return {Object}
     */
    function Alertify() {

        // holds a references of created dialogs
        var dialogs = {};

        /**
         * Extends a given prototype by merging properties from base into sub.
         *
         * @sub {Object} sub The prototype being overwritten.
         * @base {Object} base The prototype being written.
         *
         * @return {Object} The extended prototype.
         */
        function extend(sub, base) {
            // copy dialog pototype over definition.
            for (var prop in base) {
                if (base.hasOwnProperty(prop)) {
                    sub[prop] = base[prop];
                }
            }
            return sub;
        }


        /**
        * Helper: returns a dialog instance from saved dialogs.
        * and initializes the dialog if its not already initialized.
        *
        * @name {String} name The dialog name.
        *
        * @return {Object} The dialog instance.
        */
        function get_dialog(name) {
            var dialog = dialogs[name].dialog;
            //initialize the dialog if its not already initialized.
            if (dialog && typeof dialog.__init === 'function') {
                dialog.__init(dialog);
            }
            return dialog;
        }

        /**
         * Helper:  registers a new dialog definition.
         *
         * @name {String} name The dialog name.
         * @Factory {Function} Factory a function resposible for creating dialog prototype.
         * @transient {Boolean} transient True to create a new dialog instance each time the dialog is invoked, false otherwise.
         * @base {String} base the name of another dialog to inherit from.
         *
         * @return {Object} The dialog definition.
         */
        function register(name, Factory, transient, base) {
            var definition = {
                dialog: null,
                factory: Factory
            };

            //if this is based on an existing dialog, create a new definition
            //by applying the new protoype over the existing one.
            if (base !== undefined) {
                definition.factory = function () {
                    return extend(new dialogs[base].factory(), new Factory());
                };
            }

            if (!transient) {
                //create a new definition based on dialog
                definition.dialog = extend(new definition.factory(), dialog);
            }
            return dialogs[name] = definition;
        }

        return {
            /**
             * Alertify defaults
             * 
             * @type {Object}
             */
            defaults: defaults,
            /**
             * Dialogs factory 
             *
             * @param {string}      Dialog name.
             * @param {Function}    A Dialog factory function.
             * @param {Boolean}     Indicates whether to create a singleton or transient dialog.
             * @param {String}      The name of the base type to inherit from.
             */
            dialog: function (name, Factory, transient, base) {

                // get request, create a new instance and return it.
                if (typeof Factory !== 'function') {
                    return get_dialog(name);
                }

                if (this.hasOwnProperty(name)) {
                    throw new Error('alertify.dialog: name already exists');
                }

                // register the dialog
                var definition = register(name, Factory, transient, base);

                if (transient) {

                    // make it public
                    this[name] = function () {
                        //if passed with no params, consider it a get request
                        if (arguments.length === 0) {
                            return definition.dialog;
                        } else {
                            var instance = extend(new definition.factory(), dialog);
                            //ensure init
                            if (instance && typeof instance.__init === 'function') {
                                instance.__init(instance);
                            }
                            instance['main'].apply(instance, arguments);
                            return instance['show'].apply(instance);
                        }
                    };
                } else {
                    // make it public
                    this[name] = function () {
                        //ensure init
                        if (definition.dialog && typeof definition.dialog.__init === 'function') {
                            definition.dialog.__init(definition.dialog);
                        }
                        //if passed with no params, consider it a get request
                        if (arguments.length === 0) {
                            return definition.dialog;
                        } else {
                            var dialog = definition.dialog;
                            dialog['main'].apply(definition.dialog, arguments);
                            return dialog['show'].apply(definition.dialog);
                        }
                    };
                }
            },
            /**
             * Close all open dialogs.
             *
             * @param {Object} excpet [optional] The dialog object to exclude from closing.
             *
             * @return {undefined}
             */
            closeAll: function (except) {
                var clone = openDialogs.slice(0);
                for (var x = 0; x < clone.length; x += 1) {
                    var instance = clone[x];
                    if (except === undefined || except !== instance) {
                        instance.close();
                    }
                }
            },
            /**
             * Gets or Sets dialog settings/options. if the dialog is transient, this call does nothing.
             *
             * @param {string} name The dialog name.
             * @param {String|Object} key A string specifying a propery name or a collection of key/value pairs.
             * @param {Variant} value Optional, the value associated with the key (in case it was a string).
             *
             * @return {undefined}
             */
            setting: function (name, key, value) {

                if (name === 'notifier') {
                    return notifier.setting(key, value);
                }

                var dialog = get_dialog(name);
                if (dialog) {
                    return dialog.setting(key, value);
                }
            },
            /**
             * [Alias] Sets dialog settings/options 
             */
            set: function(name,key,value){
                return this.setting(name, key,value);
            },
            /**
             * [Alias] Gets dialog settings/options 
             */
            get: function(name, key){
                return this.setting(name, key);
            },
            /**
             * Creates a new notification message.
             * If a type is passed, a class name "ajs-{type}" will be added.
             * This allows for custom look and feel for various types of notifications.
             *
             * @param  {String | DOMElement}    [message=undefined]		Message text
             * @param  {String}                 [type='']				Type of log message
             * @param  {String}                 [wait='']				Time (in seconds) to wait before auto-close
             * @param  {Function}               [callback=undefined]	A callback function to be invoked when the log is closed.
             *
             * @return {Object} Notification object.
             */
            notify: function (message, type, wait, callback) {
                return notifier.create(type, callback).push(message, wait);
            },
            /**
             * Creates a new notification message.
             *
             * @param  {String}		[message=undefined]		Message text
             * @param  {String}     [wait='']				Time (in seconds) to wait before auto-close
             * @param  {Function}	[callback=undefined]	A callback function to be invoked when the log is closed.
             *
             * @return {Object} Notification object.
             */
            message: function (message, wait, callback) {
                return notifier.create(null, callback).push(message, wait);
            },
            /**
             * Creates a new notification message of type 'success'.
             *
             * @param  {String}		[message=undefined]		Message text
             * @param  {String}     [wait='']				Time (in seconds) to wait before auto-close
             * @param  {Function}	[callback=undefined]	A callback function to be invoked when the log is closed.
             *
             * @return {Object} Notification object.
             */
            success: function (message, wait, callback) {
                return notifier.create('success', callback).push(message, wait);
            },
            /**
             * Creates a new notification message of type 'error'.
             *
             * @param  {String}		[message=undefined]		Message text
             * @param  {String}     [wait='']				Time (in seconds) to wait before auto-close
             * @param  {Function}	[callback=undefined]	A callback function to be invoked when the log is closed.
             *
             * @return {Object} Notification object.
             */
            error: function (message, wait, callback) {
                return notifier.create('error', callback).push(message, wait);
            },
            /**
             * Creates a new notification message of type 'warning'.
             *
             * @param  {String}		[message=undefined]		Message text
             * @param  {String}     [wait='']				Time (in seconds) to wait before auto-close
             * @param  {Function}	[callback=undefined]	A callback function to be invoked when the log is closed.
             *
             * @return {Object} Notification object.
             */
            warning: function (message, wait, callback) {
                return notifier.create('warning', callback).push(message, wait);
            },
            /**
             * Dismisses all open notifications
             *
             * @return {undefined}
             */
            dismissAll: function () {
                notifier.dismissAll();
            }
        };
    }
    var alertify = new Alertify();

    /**
    * Alert dialog definition
    *
    * invoked by:
    *	alertify.alert(message);
    *	alertify.alert(title, message);
    *	alertify.alert(message, onok);
    *	alertify.alert(title, message, onok);
     */
    alertify.dialog('alert', function () {
        return {
            main: function (_title, _message, _onok) {
                var title, message, onok;
                switch (arguments.length) {
                case 1:
                    message = _title;
                    break;
                case 2:
                    if (typeof _message === 'function') {
                        message = _title;
                        onok = _message;
                    } else {
                        title = _title;
                        message = _message;
                    }
                    break;
                case 3:
                    title = _title;
                    message = _message;
                    onok = _onok;
                    break;
                }
                this.set('title', title);
                this.set('message', message);
                this.set('onok', onok);
                return this;
            },
            setup: function () {
                return {
                    buttons: [
                        {
                            text: alertify.defaults.glossary.ok,
                            key: keys.ESC,
                            invokeOnClose: true,
                            className: alertify.defaults.theme.ok,
                        }
                    ],
                    focus: {
                        element: 0,
                        select: false
                    },
                    options: {
                        maximizable: false,
                        resizable: false
                    }
                };
            },
            build: function () {
                // nothing
            },
            prepare: function () {
                //nothing
            },
            setMessage: function (message) {
                this.setContent(message);
            },
            settings: {
                message: undefined,
                onok: undefined,
                label: undefined,
            },
            settingUpdated: function (key, oldValue, newValue) {
                switch (key) {
                case 'message':
                    this.setMessage(newValue);
                    break;
                case 'label':
                    if (this.__internal.buttons[0].element) {
                        this.__internal.buttons[0].element.innerHTML = newValue;
                    }
                    break;
                }
            },
            callback: function (closeEvent) {
                if (typeof this.get('onok') === 'function') {
                    var returnValue = this.get('onok').call(this, closeEvent);
                    if (typeof returnValue !== 'undefined') {
                        closeEvent.cancel = !returnValue;
                    }
                }
            }
        };
    });
    /**
     * Confirm dialog object
     *
     *	alertify.confirm(message);
     *	alertify.confirm(message, onok);
     *	alertify.confirm(message, onok, oncancel);
     *	alertify.confirm(title, message, onok, oncancel);
     */
    alertify.dialog('confirm', function () {

        var autoConfirm = {
            timer: null,
            index: null,
            text: null,
            duration: null,
            task: function (event, self) {
                if (self.isOpen()) {
                    self.__internal.buttons[autoConfirm.index].element.innerHTML = autoConfirm.text + ' (&#8207;' + autoConfirm.duration + '&#8207;) ';
                    autoConfirm.duration -= 1;
                    if (autoConfirm.duration === -1) {
                        clearAutoConfirm(self);
                        var button = self.__internal.buttons[autoConfirm.index];
                        var closeEvent = createCloseEvent(autoConfirm.index, button);

                        if (typeof self.callback === 'function') {
                            self.callback.apply(self, [closeEvent]);
                        }
                        //close the dialog.
                        if (closeEvent.close !== false) {
                            self.close();
                        }
                    }
                } else {
                    clearAutoConfirm(self);
                }
            }
        };

        function clearAutoConfirm(self) {
            if (autoConfirm.timer !== null) {
                clearInterval(autoConfirm.timer);
                autoConfirm.timer = null;
                self.__internal.buttons[autoConfirm.index].element.innerHTML = autoConfirm.text;
            }
        }

        function startAutoConfirm(self, index, duration) {
            clearAutoConfirm(self);
            autoConfirm.duration = duration;
            autoConfirm.index = index;
            autoConfirm.text = self.__internal.buttons[index].element.innerHTML;
            autoConfirm.timer = setInterval(delegate(self, autoConfirm.task), 1000);
            autoConfirm.task(null, self);
        }


        return {
            main: function (_title, _message, _onok, _oncancel) {
                var title, message, onok, oncancel;
                switch (arguments.length) {
                case 1:
                    message = _title;
                    break;
                case 2:
                    message = _title;
                    onok = _message;
                    break;
                case 3:
                    message = _title;
                    onok = _message;
                    oncancel = _onok;
                    break;
                case 4:
                    title = _title;
                    message = _message;
                    onok = _onok;
                    oncancel = _oncancel;
                    break;
                }
                this.set('title', title);
                this.set('message', message);
                this.set('onok', onok);
                this.set('oncancel', oncancel);
                return this;
            },
            setup: function () {
                return {
                    buttons: [
                        {
                            text: alertify.defaults.glossary.ok,
                            key: keys.ENTER,
                            className: alertify.defaults.theme.ok,
                        },
                        {
                            text: alertify.defaults.glossary.cancel,
                            key: keys.ESC,
                            invokeOnClose: true,
                            className: alertify.defaults.theme.cancel,
                        }
                    ],
                    focus: {
                        element: 0,
                        select: false
                    },
                    options: {
                        maximizable: false,
                        resizable: false
                    }
                };
            },
            build: function () {
                //nothing
            },
            prepare: function () {
                //nothing
            },
            setMessage: function (message) {
                this.setContent(message);
            },
            settings: {
                message: null,
                labels: null,
                onok: null,
                oncancel: null,
                defaultFocus: null,
                reverseButtons: null,
            },
            settingUpdated: function (key, oldValue, newValue) {
                switch (key) {
                case 'message':
                    this.setMessage(newValue);
                    break;
                case 'labels':
                    if ('ok' in newValue && this.__internal.buttons[0].element) {
                        this.__internal.buttons[0].text = newValue.ok;
                        this.__internal.buttons[0].element.innerHTML = newValue.ok;
                    }
                    if ('cancel' in newValue && this.__internal.buttons[1].element) {
                        this.__internal.buttons[1].text = newValue.cancel;
                        this.__internal.buttons[1].element.innerHTML = newValue.cancel;
                    }
                    break;
                case 'reverseButtons':
                    if (newValue === true) {
                        this.elements.buttons.primary.appendChild(this.__internal.buttons[0].element);
                    } else {
                        this.elements.buttons.primary.appendChild(this.__internal.buttons[1].element);
                    }
                    break;
                case 'defaultFocus':
                    this.__internal.focus.element = newValue === 'ok' ? 0 : 1;
                    break;
                }
            },
            callback: function (closeEvent) {
                clearAutoConfirm(this);
                var returnValue;
                switch (closeEvent.index) {
                case 0:
                    if (typeof this.get('onok') === 'function') {
                        returnValue = this.get('onok').call(this, closeEvent);
                        if (typeof returnValue !== 'undefined') {
                            closeEvent.cancel = !returnValue;
                        }
                    }
                    break;
                case 1:
                    if (typeof this.get('oncancel') === 'function') {
                        returnValue = this.get('oncancel').call(this, closeEvent);
                        if (typeof returnValue !== 'undefined') {
                            closeEvent.cancel = !returnValue;
                        }
                    }
                    break;
                }
            },
            autoOk: function (duration) {
                startAutoConfirm(this, 0, duration);
                return this;
            },
            autoCancel: function (duration) {
                startAutoConfirm(this, 1, duration);
                return this;
            }
        };
    });
    /**
     * Prompt dialog object
     *
     * invoked by:
     *	alertify.prompt(message);
     *	alertify.prompt(message, value);
     *	alertify.prompt(message, value, onok);
     *	alertify.prompt(message, value, onok, oncancel);
     *	alertify.prompt(title, message, value, onok, oncancel);
     */
    alertify.dialog('prompt', function () {
        var input = document.createElement('INPUT');
        var p = document.createElement('P');
        return {
            main: function (_title, _message, _value, _onok, _oncancel) {
                var title, message, value, onok, oncancel;
                switch (arguments.length) {
                case 1:
                    message = _title;
                    break;
                case 2:
                    message = _title;
                    value = _message;
                    break;
                case 3:
                    message = _title;
                    value = _message;
                    onok = _value;
                    break;
                case 4:
                    message = _title;
                    value = _message;
                    onok = _value;
                    oncancel = _onok;
                    break;
                case 5:
                    title = _title;
                    message = _message;
                    value = _value;
                    onok = _onok;
                    oncancel = _oncancel;
                    break;
                }
                this.set('title', title);
                this.set('message', message);
                this.set('value', value);
                this.set('onok', onok);
                this.set('oncancel', oncancel);
                return this;
            },
            setup: function () {
                return {
                    buttons: [
                        {
                            text: alertify.defaults.glossary.ok,
                            key: keys.ENTER,
                            className: alertify.defaults.theme.ok,
                        },
                        {
                            text: alertify.defaults.glossary.cancel,
                            key: keys.ESC,
                            invokeOnClose: true,
                            className: alertify.defaults.theme.cancel,
                        }
                    ],
                    focus: {
                        element: input,
                        select: true
                    },
                    options: {
                        maximizable: false,
                        resizable: false
                    }
                };
            },
            build: function () {
                input.className = alertify.defaults.theme.input;
                input.setAttribute('type', 'text');
                input.value = this.get('value');
                this.elements.content.appendChild(p);
                this.elements.content.appendChild(input);
            },
            prepare: function () {
                //nothing
            },
            setMessage: function (message) {
                if (typeof message === 'string') {
                    clearContents(p);
                    p.innerHTML = message;
                } else if (message instanceof window.HTMLElement && p.firstChild !== message) {
                    clearContents(p);
                    p.appendChild(message);
                }
            },
            settings: {
                message: undefined,
                labels: undefined,
                onok: undefined,
                oncancel: undefined,
                value: '',
                type:'text',
                reverseButtons: undefined,
            },
            settingUpdated: function (key, oldValue, newValue) {
                switch (key) {
                case 'message':
                    this.setMessage(newValue);
                    break;
                case 'value':
                    input.value = newValue;
                    break;
                case 'type':
                    switch (newValue) {
                    case 'text':
                    case 'color':
                    case 'date':
                    case 'datetime-local':
                    case 'email':
                    case 'month':
                    case 'number':
                    case 'password':
                    case 'search':
                    case 'tel':
                    case 'time':
                    case 'week':
                        input.type = newValue;
                        break;
                    default:
                        input.type = 'text';
                        break;
                    }
                    break;
                case 'labels':
                    if (newValue.ok && this.__internal.buttons[0].element) {
                        this.__internal.buttons[0].element.innerHTML = newValue.ok;
                    }
                    if (newValue.cancel && this.__internal.buttons[1].element) {
                        this.__internal.buttons[1].element.innerHTML = newValue.cancel;
                    }
                    break;
                case 'reverseButtons':
                    if (newValue === true) {
                        this.elements.buttons.primary.appendChild(this.__internal.buttons[0].element);
                    } else {
                        this.elements.buttons.primary.appendChild(this.__internal.buttons[1].element);
                    }
                    break;
                }
            },
            callback: function (closeEvent) {
                var returnValue;
                switch (closeEvent.index) {
                case 0:
                    this.settings.value = input.value;
                    if (typeof this.get('onok') === 'function') {
                        returnValue = this.get('onok').call(this, closeEvent, this.settings.value);
                        if (typeof returnValue !== 'undefined') {
                            closeEvent.cancel = !returnValue;
                        }
                    }
                    break;
                case 1:
                    if (typeof this.get('oncancel') === 'function') {
                        returnValue = this.get('oncancel').call(this, closeEvent);
                        if (typeof returnValue !== 'undefined') {
                            closeEvent.cancel = !returnValue;
                        }
                    }
                    if(!closeEvent.cancel){
                        input.value = this.settings.value;
                    }
                    break;
                }
            }
        };
    });

    // CommonJS
    if ( typeof module === 'object' && typeof module.exports === 'object' ) {
        module.exports = alertify;
    // AMD
    } else if ( true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
            return alertify;
        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    // window
    } else if ( !window.alertify ) {
        window.alertify = alertify;
    }

} ( typeof window !== 'undefined' ? window : this ) );


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTkzOTBmNWQxZDZlMjIwNmNiYzM/YmUxOCIsIndlYnBhY2s6Ly8vLi9+L2FsZXJ0aWZ5anMvYnVpbGQvYWxlcnRpZnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixLQUFLO0FBQ3RCLG1CQUFtQixPQUFPO0FBQzFCO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixLQUFLO0FBQ3RCLG1CQUFtQixPQUFPO0FBQzFCO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHdCQUF3QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsUUFBUTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixjQUFjLE9BQU87QUFDckI7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGFBQWE7QUFDckM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLEtBQUs7QUFDdkIsa0JBQWtCLE9BQU87QUFDekIsa0JBQWtCLFNBQVM7QUFDM0Isa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLEtBQUs7QUFDdkIsa0JBQWtCLE9BQU87QUFDekIsa0JBQWtCLFNBQVM7QUFDM0Isa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLE1BQU07QUFDdEIsZ0JBQWdCOztBQUVoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLGVBQWUsU0FBUztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLHNCQUFzQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixxSEFBcUg7QUFDL0k7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLHVCQUF1QjtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDRCQUE0Qix3Q0FBd0M7QUFDcEU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IscUJBQXFCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLE9BQU87QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixPQUFPO0FBQzFCO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsT0FBTztBQUMxQjtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixPQUFPO0FBQzFCO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLE1BQU07QUFDekIsbUJBQW1CLE9BQU87QUFDMUI7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsOEJBQThCLHFCQUFxQjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLE9BQU87QUFDMUIsbUJBQW1CLE9BQU87QUFDMUI7QUFDQSxvQkFBb0IsVTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLE9BQU87QUFDMUIsbUJBQW1CLE9BQU87QUFDMUIsbUJBQW1CLFNBQVM7QUFDNUIsbUJBQW1CLGNBQWM7QUFDakMsbUJBQW1CLE9BQU87QUFDMUIsbUJBQW1CLE9BQU87QUFDMUI7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLGdEQUFnRDtBQUMvRix5QkFBeUI7QUFDekIsK0NBQStDLGlEQUFpRDtBQUNoRztBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLDBDQUEwQzs7QUFFckYscUJBQXFCO0FBQ3JCLDJDQUEyQywyQ0FBMkM7QUFDdEY7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsT0FBTztBQUMxQjtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsTUFBTTtBQUN6QixtQkFBbUIsT0FBTztBQUMxQjtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixPQUFPO0FBQzFCO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLE9BQU87QUFDMUI7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLE9BQU87QUFDMUI7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixPQUFPO0FBQzFCO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsT0FBTztBQUMxQixtQkFBbUIsUUFBUTtBQUMzQjtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixPQUFPO0FBQzFCO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixPQUFPO0FBQzFCO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLE9BQU87QUFDMUI7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsT0FBTztBQUMxQixtQkFBbUIsUUFBUTtBQUMzQjtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7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O0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFNBQVM7QUFBQTtBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUEsQ0FBQyIsImZpbGUiOiJkaXN0L2FsZXJ0aWZ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiLi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAzOCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMTkzOTBmNWQxZDZlMjIwNmNiYzMiLCIvKipcclxuICogYWxlcnRpZnlqcyAxLjkuMCBodHRwOi8vYWxlcnRpZnlqcy5jb21cclxuICogQWxlcnRpZnlKUyBpcyBhIGphdmFzY3JpcHQgZnJhbWV3b3JrIGZvciBkZXZlbG9waW5nIHByZXR0eSBicm93c2VyIGRpYWxvZ3MgYW5kIG5vdGlmaWNhdGlvbnMuXHJcbiAqIENvcHlyaWdodCAyMDE3IE1vaGFtbWFkIFlvdW5lcyA8TW9oYW1tYWRAYWxlcnRpZnlqcy5jb20+IChodHRwOi8vYWxlcnRpZnlqcy5jb20pIFxyXG4gKiBMaWNlbnNlZCB1bmRlciBHUEwgMyA8aHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9ncGwtMy4wPiovXHJcbiggZnVuY3Rpb24gKCB3aW5kb3cgKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogS2V5cyBlbnVtXHJcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICovXHJcbiAgICB2YXIga2V5cyA9IHtcclxuICAgICAgICBFTlRFUjogMTMsXHJcbiAgICAgICAgRVNDOiAyNyxcclxuICAgICAgICBGMTogMTEyLFxyXG4gICAgICAgIEYxMjogMTIzLFxyXG4gICAgICAgIExFRlQ6IDM3LFxyXG4gICAgICAgIFJJR0hUOiAzOVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogRGVmYXVsdCBvcHRpb25zIFxyXG4gICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAqL1xyXG4gICAgdmFyIGRlZmF1bHRzID0ge1xyXG4gICAgICAgIGF1dG9SZXNldDp0cnVlLFxyXG4gICAgICAgIGJhc2ljOmZhbHNlLFxyXG4gICAgICAgIGNsb3NhYmxlOnRydWUsXHJcbiAgICAgICAgY2xvc2FibGVCeURpbW1lcjp0cnVlLFxyXG4gICAgICAgIGZyYW1lbGVzczpmYWxzZSxcclxuICAgICAgICBtYWludGFpbkZvY3VzOnRydWUsIC8vZ2xvYmFsIGRlZmF1bHQgbm90IHBlciBpbnN0YW5jZSwgYXBwbGllcyB0byBhbGwgZGlhbG9nc1xyXG4gICAgICAgIG1heGltaXphYmxlOnRydWUsXHJcbiAgICAgICAgbW9kYWw6dHJ1ZSxcclxuICAgICAgICBtb3ZhYmxlOnRydWUsXHJcbiAgICAgICAgbW92ZUJvdW5kZWQ6ZmFsc2UsXHJcbiAgICAgICAgb3ZlcmZsb3c6dHJ1ZSxcclxuICAgICAgICBwYWRkaW5nOiB0cnVlLFxyXG4gICAgICAgIHBpbm5hYmxlOnRydWUsXHJcbiAgICAgICAgcGlubmVkOnRydWUsXHJcbiAgICAgICAgcHJldmVudEJvZHlTaGlmdDpmYWxzZSwgLy9nbG9iYWwgZGVmYXVsdCBub3QgcGVyIGluc3RhbmNlLCBhcHBsaWVzIHRvIGFsbCBkaWFsb2dzXHJcbiAgICAgICAgcmVzaXphYmxlOnRydWUsXHJcbiAgICAgICAgc3RhcnRNYXhpbWl6ZWQ6ZmFsc2UsXHJcbiAgICAgICAgdHJhbnNpdGlvbjoncHVsc2UnLFxyXG4gICAgICAgIG5vdGlmaWVyOntcclxuICAgICAgICAgICAgZGVsYXk6NSxcclxuICAgICAgICAgICAgcG9zaXRpb246J2JvdHRvbS1yaWdodCcsXHJcbiAgICAgICAgICAgIGNsb3NlQnV0dG9uOmZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnbG9zc2FyeTp7XHJcbiAgICAgICAgICAgIHRpdGxlOidBbGVydGlmeUpTJyxcclxuICAgICAgICAgICAgb2s6ICdPSycsXHJcbiAgICAgICAgICAgIGNhbmNlbDogJ0NhbmNlbCcsXHJcbiAgICAgICAgICAgIGFjY2NwdDogJ0FjY2VwdCcsXHJcbiAgICAgICAgICAgIGRlbnk6ICdEZW55JyxcclxuICAgICAgICAgICAgY29uZmlybTogJ0NvbmZpcm0nLFxyXG4gICAgICAgICAgICBkZWNsaW5lOiAnRGVjbGluZScsXHJcbiAgICAgICAgICAgIGNsb3NlOiAnQ2xvc2UnLFxyXG4gICAgICAgICAgICBtYXhpbWl6ZTogJ01heGltaXplJyxcclxuICAgICAgICAgICAgcmVzdG9yZTogJ1Jlc3RvcmUnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGhlbWU6e1xyXG4gICAgICAgICAgICBpbnB1dDonYWpzLWlucHV0JyxcclxuICAgICAgICAgICAgb2s6J2Fqcy1vaycsXHJcbiAgICAgICAgICAgIGNhbmNlbDonYWpzLWNhbmNlbCcsXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFxyXG4gICAgLy9ob2xkcyBvcGVuIGRpYWxvZ3MgaW5zdGFuY2VzXHJcbiAgICB2YXIgb3BlbkRpYWxvZ3MgPSBbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFtIZWxwZXJdICBBZGRzIHRoZSBzcGVjaWZpZWQgY2xhc3MoZXMpIHRvIHRoZSBlbGVtZW50LlxyXG4gICAgICpcclxuICAgICAqIEBlbGVtZW50IHtub2RlfSAgICAgIFRoZSBlbGVtZW50XHJcbiAgICAgKiBAY2xhc3NOYW1lIHtzdHJpbmd9ICBPbmUgb3IgbW9yZSBzcGFjZS1zZXBhcmF0ZWQgY2xhc3NlcyB0byBiZSBhZGRlZCB0byB0aGUgY2xhc3MgYXR0cmlidXRlIG9mIHRoZSBlbGVtZW50LlxyXG4gICAgICogXHJcbiAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGFkZENsYXNzKGVsZW1lbnQsY2xhc3NOYW1lcyl7XHJcbiAgICAgICAgZWxlbWVudC5jbGFzc05hbWUgKz0gJyAnICsgY2xhc3NOYW1lcztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBbSGVscGVyXSAgUmVtb3ZlcyB0aGUgc3BlY2lmaWVkIGNsYXNzKGVzKSBmcm9tIHRoZSBlbGVtZW50LlxyXG4gICAgICpcclxuICAgICAqIEBlbGVtZW50IHtub2RlfSAgICAgIFRoZSBlbGVtZW50XHJcbiAgICAgKiBAY2xhc3NOYW1lIHtzdHJpbmd9ICBPbmUgb3IgbW9yZSBzcGFjZS1zZXBhcmF0ZWQgY2xhc3NlcyB0byBiZSByZW1vdmVkIGZyb20gdGhlIGNsYXNzIGF0dHJpYnV0ZSBvZiB0aGUgZWxlbWVudC5cclxuICAgICAqIFxyXG4gICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiByZW1vdmVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWVzKSB7XHJcbiAgICAgICAgdmFyIG9yaWdpbmFsID0gZWxlbWVudC5jbGFzc05hbWUuc3BsaXQoJyAnKTtcclxuICAgICAgICB2YXIgdG9CZVJlbW92ZWQgPSBjbGFzc05hbWVzLnNwbGl0KCcgJyk7XHJcbiAgICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCB0b0JlUmVtb3ZlZC5sZW5ndGg7IHggKz0gMSkge1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSBvcmlnaW5hbC5pbmRleE9mKHRvQmVSZW1vdmVkW3hdKTtcclxuICAgICAgICAgICAgaWYgKGluZGV4ID4gLTEpe1xyXG4gICAgICAgICAgICAgICAgb3JpZ2luYWwuc3BsaWNlKGluZGV4LDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gb3JpZ2luYWwuam9pbignICcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogW0hlbHBlcl0gIENoZWNrcyBpZiB0aGUgZG9jdW1lbnQgaXMgUlRMXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgZG9jdW1lbnQgaXMgUlRMLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGlzUmlnaHRUb0xlZnQoKXtcclxuICAgICAgICByZXR1cm4gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSkuZGlyZWN0aW9uID09PSAncnRsJztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogW0hlbHBlcl0gIEdldCB0aGUgZG9jdW1lbnQgY3VycmVudCBzY3JvbGxUb3BcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IGN1cnJlbnQgZG9jdW1lbnQgc2Nyb2xsVG9wIHZhbHVlXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGdldFNjcm9sbFRvcCgpe1xyXG4gICAgICAgIHJldHVybiAoKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wKSB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBbSGVscGVyXSAgR2V0IHRoZSBkb2N1bWVudCBjdXJyZW50IHNjcm9sbExlZnRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IGN1cnJlbnQgZG9jdW1lbnQgc2Nyb2xsTGVmdCB2YWx1ZVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBnZXRTY3JvbGxMZWZ0KCl7XHJcbiAgICAgICAgcmV0dXJuICgoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0KSB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBIZWxwZXI6IGNsZWFyIGNvbnRlbnRzXHJcbiAgICAqXHJcbiAgICAqL1xyXG4gICAgZnVuY3Rpb24gY2xlYXJDb250ZW50cyhlbGVtZW50KXtcclxuICAgICAgICB3aGlsZSAoZWxlbWVudC5sYXN0Q2hpbGQpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVDaGlsZChlbGVtZW50Lmxhc3RDaGlsZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBFeHRlbmRzIGEgZ2l2ZW4gcHJvdG90eXBlIGJ5IG1lcmdpbmcgcHJvcGVydGllcyBmcm9tIGJhc2UgaW50byBzdWIuXHJcbiAgICAgKlxyXG4gICAgICogQHN1YiB7T2JqZWN0fSBzdWIgVGhlIHByb3RvdHlwZSBiZWluZyBvdmVyd3JpdHRlbi5cclxuICAgICAqIEBiYXNlIHtPYmplY3R9IGJhc2UgVGhlIHByb3RvdHlwZSBiZWluZyB3cml0dGVuLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIGV4dGVuZGVkIHByb3RvdHlwZS5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gY29weShzcmMpIHtcclxuICAgICAgICBpZihudWxsID09PSBzcmMpe1xyXG4gICAgICAgICAgICByZXR1cm4gc3JjO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY3B5O1xyXG4gICAgICAgIGlmKEFycmF5LmlzQXJyYXkoc3JjKSl7XHJcbiAgICAgICAgICAgIGNweSA9IFtdO1xyXG4gICAgICAgICAgICBmb3IodmFyIHg9MDt4PHNyYy5sZW5ndGg7eCs9MSl7XHJcbiAgICAgICAgICAgICAgICBjcHkucHVzaChjb3B5KHNyY1t4XSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBjcHk7XHJcbiAgICAgICAgfVxyXG4gICAgICBcclxuICAgICAgICBpZihzcmMgaW5zdGFuY2VvZiBEYXRlKXtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHNyYy5nZXRUaW1lKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgXHJcbiAgICAgICAgaWYoc3JjIGluc3RhbmNlb2YgUmVnRXhwKXtcclxuICAgICAgICAgICAgY3B5ID0gbmV3IFJlZ0V4cChzcmMuc291cmNlKTtcclxuICAgICAgICAgICAgY3B5Lmdsb2JhbCA9IHNyYy5nbG9iYWw7XHJcbiAgICAgICAgICAgIGNweS5pZ25vcmVDYXNlID0gc3JjLmlnbm9yZUNhc2U7XHJcbiAgICAgICAgICAgIGNweS5tdWx0aWxpbmUgPSBzcmMubXVsdGlsaW5lO1xyXG4gICAgICAgICAgICBjcHkubGFzdEluZGV4ID0gc3JjLmxhc3RJbmRleDtcclxuICAgICAgICAgICAgcmV0dXJuIGNweTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodHlwZW9mIHNyYyA9PT0gJ29iamVjdCcpe1xyXG4gICAgICAgICAgICBjcHkgPSB7fTtcclxuICAgICAgICAgICAgLy8gY29weSBkaWFsb2cgcG90b3R5cGUgb3ZlciBkZWZpbml0aW9uLlxyXG4gICAgICAgICAgICBmb3IgKHZhciBwcm9wIGluIHNyYykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNyYy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNweVtwcm9wXSA9IGNvcHkoc3JjW3Byb3BdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gY3B5O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3JjO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgICogSGVscGVyOiBkZXN0cnVjdCB0aGUgZGlhbG9nXHJcbiAgICAgICpcclxuICAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGRlc3RydWN0KGluc3RhbmNlLCBpbml0aWFsaXplKXtcclxuICAgICAgICAvL2RlbGV0ZSB0aGUgZG9tIGFuZCBpdCdzIHJlZmVyZW5jZXMuXHJcbiAgICAgICAgdmFyIHJvb3QgPSBpbnN0YW5jZS5lbGVtZW50cy5yb290O1xyXG4gICAgICAgIHJvb3QucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChyb290KTtcclxuICAgICAgICBkZWxldGUgaW5zdGFuY2UuZWxlbWVudHM7XHJcbiAgICAgICAgLy9jb3B5IGJhY2sgaW5pdGlhbCBzZXR0aW5ncy5cclxuICAgICAgICBpbnN0YW5jZS5zZXR0aW5ncyA9IGNvcHkoaW5zdGFuY2UuX19zZXR0aW5ncyk7XHJcbiAgICAgICAgLy9yZS1yZWZlcmVuY2UgaW5pdCBmdW5jdGlvbi5cclxuICAgICAgICBpbnN0YW5jZS5fX2luaXQgPSBpbml0aWFsaXplO1xyXG4gICAgICAgIC8vZGVsZXRlIF9faW50ZXJuYWwgdmFyaWFibGUgdG8gYWxsb3cgcmUtaW5pdGlhbGl6YXRpb24uXHJcbiAgICAgICAgZGVsZXRlIGluc3RhbmNlLl9faW50ZXJuYWw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVc2UgYSBjbG9zdXJlIHRvIHJldHVybiBwcm9wZXIgZXZlbnQgbGlzdGVuZXIgbWV0aG9kLiBUcnkgdG8gdXNlXHJcbiAgICAgKiBgYWRkRXZlbnRMaXN0ZW5lcmAgYnkgZGVmYXVsdCBidXQgZmFsbGJhY2sgdG8gYGF0dGFjaEV2ZW50YCBmb3JcclxuICAgICAqIHVuc3VwcG9ydGVkIGJyb3dzZXIuIFRoZSBjbG9zdXJlIHNpbXBseSBlbnN1cmVzIHRoYXQgdGhlIHRlc3QgZG9lc24ndFxyXG4gICAgICogaGFwcGVuIGV2ZXJ5IHRpbWUgdGhlIG1ldGhvZCBpcyBjYWxsZWQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICAgIHtOb2RlfSAgICAgZWwgICAgTm9kZSBlbGVtZW50XHJcbiAgICAgKiBAcGFyYW0gICAge1N0cmluZ30gICBldmVudCBFdmVudCB0eXBlXHJcbiAgICAgKiBAcGFyYW0gICAge0Z1bmN0aW9ufSBmbiAgICBDYWxsYmFjayBvZiBldmVudFxyXG4gICAgICogQHJldHVybiAgIHtGdW5jdGlvbn1cclxuICAgICAqL1xyXG4gICAgdmFyIG9uID0gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGVsLCBldmVudCwgZm4sIHVzZUNhcHR1cmUpIHtcclxuICAgICAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGZuLCB1c2VDYXB0dXJlID09PSB0cnVlKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmF0dGFjaEV2ZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoZWwsIGV2ZW50LCBmbikge1xyXG4gICAgICAgICAgICAgICAgZWwuYXR0YWNoRXZlbnQoJ29uJyArIGV2ZW50LCBmbik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfSgpKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFVzZSBhIGNsb3N1cmUgdG8gcmV0dXJuIHByb3BlciBldmVudCBsaXN0ZW5lciBtZXRob2QuIFRyeSB0byB1c2VcclxuICAgICAqIGByZW1vdmVFdmVudExpc3RlbmVyYCBieSBkZWZhdWx0IGJ1dCBmYWxsYmFjayB0byBgZGV0YWNoRXZlbnRgIGZvclxyXG4gICAgICogdW5zdXBwb3J0ZWQgYnJvd3Nlci4gVGhlIGNsb3N1cmUgc2ltcGx5IGVuc3VyZXMgdGhhdCB0aGUgdGVzdCBkb2Vzbid0XHJcbiAgICAgKiBoYXBwZW4gZXZlcnkgdGltZSB0aGUgbWV0aG9kIGlzIGNhbGxlZC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gICAge05vZGV9ICAgICBlbCAgICBOb2RlIGVsZW1lbnRcclxuICAgICAqIEBwYXJhbSAgICB7U3RyaW5nfSAgIGV2ZW50IEV2ZW50IHR5cGVcclxuICAgICAqIEBwYXJhbSAgICB7RnVuY3Rpb259IGZuICAgIENhbGxiYWNrIG9mIGV2ZW50XHJcbiAgICAgKiBAcmV0dXJuICAge0Z1bmN0aW9ufVxyXG4gICAgICovXHJcbiAgICB2YXIgb2ZmID0gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGVsLCBldmVudCwgZm4sIHVzZUNhcHR1cmUpIHtcclxuICAgICAgICAgICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGZuLCB1c2VDYXB0dXJlID09PSB0cnVlKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmRldGFjaEV2ZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoZWwsIGV2ZW50LCBmbikge1xyXG4gICAgICAgICAgICAgICAgZWwuZGV0YWNoRXZlbnQoJ29uJyArIGV2ZW50LCBmbik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfSgpKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFByZXZlbnQgZGVmYXVsdCBldmVudCBmcm9tIGZpcmluZ1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge0V2ZW50fSBldmVudCBFdmVudCBvYmplY3RcclxuICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cclxuXHJcbiAgICBmdW5jdGlvbiBwcmV2ZW50ICggZXZlbnQgKSB7XHJcbiAgICAgICAgaWYgKCBldmVudCApIHtcclxuICAgICAgICAgICAgaWYgKCBldmVudC5wcmV2ZW50RGVmYXVsdCApIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgKi9cclxuICAgIHZhciB0cmFuc2l0aW9uID0gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgdCwgdHlwZTtcclxuICAgICAgICB2YXIgc3VwcG9ydGVkID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIHRyYW5zaXRpb25zID0ge1xyXG4gICAgICAgICAgICAnYW5pbWF0aW9uJyAgICAgICAgOiAnYW5pbWF0aW9uZW5kJyxcclxuICAgICAgICAgICAgJ09BbmltYXRpb24nICAgICAgIDogJ29BbmltYXRpb25FbmQgb2FuaW1hdGlvbmVuZCcsXHJcbiAgICAgICAgICAgICdtc0FuaW1hdGlvbicgICAgICA6ICdNU0FuaW1hdGlvbkVuZCcsXHJcbiAgICAgICAgICAgICdNb3pBbmltYXRpb24nICAgICA6ICdhbmltYXRpb25lbmQnLFxyXG4gICAgICAgICAgICAnV2Via2l0QW5pbWF0aW9uJyAgOiAnd2Via2l0QW5pbWF0aW9uRW5kJ1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZvciAodCBpbiB0cmFuc2l0aW9ucykge1xyXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlW3RdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHR5cGUgPSB0cmFuc2l0aW9uc1t0XTtcclxuICAgICAgICAgICAgICAgIHN1cHBvcnRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdHlwZTogdHlwZSxcclxuICAgICAgICAgICAgc3VwcG9ydGVkOiBzdXBwb3J0ZWRcclxuICAgICAgICB9O1xyXG4gICAgfSgpKTtcclxuXHJcbiAgICAvKipcclxuICAgICogQ3JlYXRlcyBldmVudCBoYW5kbGVyIGRlbGVnYXRlIHRoYXQgc2VuZHMgdGhlIGluc3RhbmNlIGFzIGxhc3QgYXJndW1lbnQuXHJcbiAgICAqIFxyXG4gICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gICAgYSBmdW5jdGlvbiB3cmFwcGVyIHdoaWNoIHNlbmRzIHRoZSBpbnN0YW5jZSBhcyBsYXN0IGFyZ3VtZW50LlxyXG4gICAgKi9cclxuICAgIGZ1bmN0aW9uIGRlbGVnYXRlKGNvbnRleHQsIG1ldGhvZCkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgYXJndW1lbnRzLmxlbmd0aDsgeCArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGFyZ3VtZW50c1t4XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBhcmdzLnB1c2goY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWV0aG9kLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBtZXRob2QuYXBwbHkoY29udGV4dCwgW251bGwsIGNvbnRleHRdKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIEhlbHBlciBmb3IgY3JlYXRpbmcgYSBkaWFsb2cgY2xvc2UgZXZlbnQuXHJcbiAgICAqIFxyXG4gICAgKiBAcmV0dXJuIHtvYmplY3R9XHJcbiAgICAqL1xyXG4gICAgZnVuY3Rpb24gY3JlYXRlQ2xvc2VFdmVudChpbmRleCwgYnV0dG9uKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgICAgICBidXR0b246IGJ1dHRvbixcclxuICAgICAgICAgICAgY2FuY2VsOiBmYWxzZVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICogSGVscGVyIGZvciBkaXNwYXRjaGluZyBldmVudHMuXHJcbiAgICAqXHJcbiAgICAqIEBwYXJhbSAge3N0cmluZ30gZXZlblR5cGUgVGhlIHR5cGUgb2YgdGhlIGV2ZW50IHRvIGRpc3B0YWNoLlxyXG4gICAgKiBAcGFyYW0gIHtvYmplY3R9IGluc3RhbmNlIFRoZSBkaWFsb2cgaW5zdGFuY2UgZGlzcHRhY2hpbmcgdGhlIGV2ZW50LlxyXG4gICAgKlxyXG4gICAgKiBAcmV0dXJuIHtvYmplY3R9XHJcbiAgICAqL1xyXG4gICAgZnVuY3Rpb24gZGlzcGF0Y2hFdmVudChldmVudFR5cGUsIGluc3RhbmNlKSB7XHJcbiAgICAgICAgaWYgKCB0eXBlb2YgaW5zdGFuY2UuZ2V0KGV2ZW50VHlwZSkgPT09ICdmdW5jdGlvbicgKSB7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLmdldChldmVudFR5cGUpLmNhbGwoaW5zdGFuY2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdXBlciBjbGFzcyBmb3IgYWxsIGRpYWxvZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XHRcdGJhc2UgZGlhbG9nIHByb3RvdHlwZVxyXG4gICAgICovXHJcbiAgICB2YXIgZGlhbG9nID0gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgLy9ob2xkcyB0aGUgbGlzdCBvZiB1c2VkIGtleXMuXHJcbiAgICAgICAgICAgIHVzZWRLZXlzID0gW10sXHJcbiAgICAgICAgICAgIC8vZHVtbXkgdmFyaWFibGUsIHVzZWQgdG8gdHJpZ2dlciBkb20gcmVmbG93LlxyXG4gICAgICAgICAgICByZWZsb3cgPSBudWxsLFxyXG4gICAgICAgICAgICAvL2NvbmRpdGlvbiBmb3IgZGV0ZWN0aW5nIHNhZmFyaVxyXG4gICAgICAgICAgICBpc1NhZmFyaSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ1NhZmFyaScpID4gLTEgJiYgd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignQ2hyb21lJykgPCAwLFxyXG4gICAgICAgICAgICAvL2RpYWxvZyBidWlsZGluZyBibG9ja3NcclxuICAgICAgICAgICAgdGVtcGxhdGVzID0ge1xyXG4gICAgICAgICAgICAgICAgZGltbWVyOic8ZGl2IGNsYXNzPVwiYWpzLWRpbW1lclwiPjwvZGl2PicsXHJcbiAgICAgICAgICAgICAgICAvKnRhYiBpbmRleCByZXF1aXJlZCB0byBmaXJlIGNsaWNrIGV2ZW50IGJlZm9yZSBib2R5IGZvY3VzKi9cclxuICAgICAgICAgICAgICAgIG1vZGFsOiAnPGRpdiBjbGFzcz1cImFqcy1tb2RhbFwiIHRhYmluZGV4PVwiMFwiPjwvZGl2PicsXHJcbiAgICAgICAgICAgICAgICBkaWFsb2c6ICc8ZGl2IGNsYXNzPVwiYWpzLWRpYWxvZ1wiIHRhYmluZGV4PVwiMFwiPjwvZGl2PicsXHJcbiAgICAgICAgICAgICAgICByZXNldDogJzxidXR0b24gY2xhc3M9XCJhanMtcmVzZXRcIj48L2J1dHRvbj4nLFxyXG4gICAgICAgICAgICAgICAgY29tbWFuZHM6ICc8ZGl2IGNsYXNzPVwiYWpzLWNvbW1hbmRzXCI+PGJ1dHRvbiBjbGFzcz1cImFqcy1waW5cIj48L2J1dHRvbj48YnV0dG9uIGNsYXNzPVwiYWpzLW1heGltaXplXCI+PC9idXR0b24+PGJ1dHRvbiBjbGFzcz1cImFqcy1jbG9zZVwiPjwvYnV0dG9uPjwvZGl2PicsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXI6ICc8ZGl2IGNsYXNzPVwiYWpzLWhlYWRlclwiPjwvZGl2PicsXHJcbiAgICAgICAgICAgICAgICBib2R5OiAnPGRpdiBjbGFzcz1cImFqcy1ib2R5XCI+PC9kaXY+JyxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICc8ZGl2IGNsYXNzPVwiYWpzLWNvbnRlbnRcIj48L2Rpdj4nLFxyXG4gICAgICAgICAgICAgICAgZm9vdGVyOiAnPGRpdiBjbGFzcz1cImFqcy1mb290ZXJcIj48L2Rpdj4nLFxyXG4gICAgICAgICAgICAgICAgYnV0dG9uczogeyBwcmltYXJ5OiAnPGRpdiBjbGFzcz1cImFqcy1wcmltYXJ5IGFqcy1idXR0b25zXCI+PC9kaXY+JywgYXV4aWxpYXJ5OiAnPGRpdiBjbGFzcz1cImFqcy1hdXhpbGlhcnkgYWpzLWJ1dHRvbnNcIj48L2Rpdj4nIH0sXHJcbiAgICAgICAgICAgICAgICBidXR0b246ICc8YnV0dG9uIGNsYXNzPVwiYWpzLWJ1dHRvblwiPjwvYnV0dG9uPicsXHJcbiAgICAgICAgICAgICAgICByZXNpemVIYW5kbGU6ICc8ZGl2IGNsYXNzPVwiYWpzLWhhbmRsZVwiPjwvZGl2PicsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vY29tbW9uIGNsYXNzIG5hbWVzXHJcbiAgICAgICAgICAgIGNsYXNzZXMgPSB7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb25JbjogJ2Fqcy1pbicsXHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb25PdXQ6ICdhanMtb3V0JyxcclxuICAgICAgICAgICAgICAgIGJhc2U6ICdhbGVydGlmeScsXHJcbiAgICAgICAgICAgICAgICBiYXNpYzonYWpzLWJhc2ljJyxcclxuICAgICAgICAgICAgICAgIGNhcHR1cmU6ICdhanMtY2FwdHVyZScsXHJcbiAgICAgICAgICAgICAgICBjbG9zYWJsZTonYWpzLWNsb3NhYmxlJyxcclxuICAgICAgICAgICAgICAgIGZpeGVkOiAnYWpzLWZpeGVkJyxcclxuICAgICAgICAgICAgICAgIGZyYW1lbGVzczonYWpzLWZyYW1lbGVzcycsXHJcbiAgICAgICAgICAgICAgICBoaWRkZW46ICdhanMtaGlkZGVuJyxcclxuICAgICAgICAgICAgICAgIG1heGltaXplOiAnYWpzLW1heGltaXplJyxcclxuICAgICAgICAgICAgICAgIG1heGltaXplZDogJ2Fqcy1tYXhpbWl6ZWQnLFxyXG4gICAgICAgICAgICAgICAgbWF4aW1pemFibGU6J2Fqcy1tYXhpbWl6YWJsZScsXHJcbiAgICAgICAgICAgICAgICBtb2RlbGVzczogJ2Fqcy1tb2RlbGVzcycsXHJcbiAgICAgICAgICAgICAgICBtb3ZhYmxlOiAnYWpzLW1vdmFibGUnLFxyXG4gICAgICAgICAgICAgICAgbm9TZWxlY3Rpb246ICdhanMtbm8tc2VsZWN0aW9uJyxcclxuICAgICAgICAgICAgICAgIG5vT3ZlcmZsb3c6ICdhanMtbm8tb3ZlcmZsb3cnLFxyXG4gICAgICAgICAgICAgICAgbm9QYWRkaW5nOidhanMtbm8tcGFkZGluZycsXHJcbiAgICAgICAgICAgICAgICBwaW46J2Fqcy1waW4nLFxyXG4gICAgICAgICAgICAgICAgcGlubmFibGU6J2Fqcy1waW5uYWJsZScsXHJcbiAgICAgICAgICAgICAgICBwcmVmaXg6ICdhanMtJyxcclxuICAgICAgICAgICAgICAgIHJlc2l6YWJsZTogJ2Fqcy1yZXNpemFibGUnLFxyXG4gICAgICAgICAgICAgICAgcmVzdG9yZTogJ2Fqcy1yZXN0b3JlJyxcclxuICAgICAgICAgICAgICAgIHNoYWtlOidhanMtc2hha2UnLFxyXG4gICAgICAgICAgICAgICAgdW5waW5uZWQ6J2Fqcy11bnBpbm5lZCcsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEhlbHBlcjogaW5pdGlhbGl6ZXMgdGhlIGRpYWxvZyBpbnN0YW5jZVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5cdHtOdW1iZXJ9XHRUaGUgdG90YWwgY291bnQgb2YgY3VycmVudGx5IG9wZW4gbW9kYWxzLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGluaXRpYWxpemUoaW5zdGFuY2Upe1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoIWluc3RhbmNlLl9faW50ZXJuYWwpe1xyXG5cclxuICAgICAgICAgICAgICAgIC8vbm8gbmVlZCB0byBleHBvc2UgaW5pdCBhZnRlciB0aGlzLlxyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGluc3RhbmNlLl9faW5pdDtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8va2VlcCBhIGNvcHkgb2YgaW5pdGlhbCBkaWFsb2cgc2V0dGluZ3NcclxuICAgICAgICAgICAgICAgIGlmKCFpbnN0YW5jZS5fX3NldHRpbmdzKXtcclxuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZS5fX3NldHRpbmdzID0gY29weShpbnN0YW5jZS5zZXR0aW5ncyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2luIGNhc2UgdGhlIHNjcmlwdCB3YXMgaW5jbHVkZWQgYmVmb3JlIGJvZHkuXHJcbiAgICAgICAgICAgICAgICAvL2FmdGVyIGZpcnN0IGRpYWxvZyBnZXRzIGluaXRpYWxpemVkLCBpdCB3b24ndCBiZSBudWxsIGFueW1vcmUhXHJcbiAgICAgICAgICAgICAgICBpZihudWxsID09PSByZWZsb3cpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNldCB0YWJpbmRleCBhdHRyaWJ1dGUgb24gYm9keSBlbGVtZW50IHRoaXMgYWxsb3dzIHNjcmlwdCB0byBnaXZlIGl0XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZm9jdXMgYWZ0ZXIgdGhlIGRpYWxvZyBpcyBjbG9zZWRcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnNldEF0dHJpYnV0ZSggJ3RhYmluZGV4JywgJzAnICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy9nZXQgZGlhbG9nIGJ1dHRvbnMvZm9jdXMgc2V0dXBcclxuICAgICAgICAgICAgICAgIHZhciBzZXR1cDtcclxuICAgICAgICAgICAgICAgIGlmKHR5cGVvZiBpbnN0YW5jZS5zZXR1cCA9PT0gJ2Z1bmN0aW9uJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dXAgPSBpbnN0YW5jZS5zZXR1cCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldHVwLm9wdGlvbnMgPSBzZXR1cC5vcHRpb25zICB8fCB7fTtcclxuICAgICAgICAgICAgICAgICAgICBzZXR1cC5mb2N1cyA9IHNldHVwLmZvY3VzICB8fCB7fTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHNldHVwID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidXR0b25zOltdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb2N1czp7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50Om51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6ZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczp7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvL2luaXRpYWxpemUgaG9va3Mgb2JqZWN0LlxyXG4gICAgICAgICAgICAgICAgaWYodHlwZW9mIGluc3RhbmNlLmhvb2tzICE9PSAnb2JqZWN0Jyl7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UuaG9va3MgPSB7fTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL2NvcHkgYnV0dG9ucyBkZWZpbnRpb25cclxuICAgICAgICAgICAgICAgIHZhciBidXR0b25zRGVmaW5pdGlvbiA9IFtdO1xyXG4gICAgICAgICAgICAgICAgaWYoQXJyYXkuaXNBcnJheShzZXR1cC5idXR0b25zKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBiPTA7YjxzZXR1cC5idXR0b25zLmxlbmd0aDtiKz0xKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlZiAgPSBzZXR1cC5idXR0b25zW2JdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3B5ID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgaW4gcmVmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVmLmhhc093blByb3BlcnR5KGkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3B5W2ldID0gcmVmW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbnNEZWZpbml0aW9uLnB1c2goY3B5KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGludGVybmFsID0gaW5zdGFuY2UuX19pbnRlcm5hbCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICAgICAgICAgKiBGbGFnIGhvbGRpbmcgdGhlIG9wZW4gc3RhdGUgb2YgdGhlIGRpYWxvZ1xyXG4gICAgICAgICAgICAgICAgICAgICAqIFxyXG4gICAgICAgICAgICAgICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxyXG4gICAgICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgICAgIGlzT3BlbjpmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICAgICAgICAgKiBBY3RpdmUgZWxlbWVudCBpcyB0aGUgZWxlbWVudCB0aGF0IHdpbGwgcmVjZWl2ZSBmb2N1cyBhZnRlclxyXG4gICAgICAgICAgICAgICAgICAgICAqIGNsb3NpbmcgdGhlIGRpYWxvZy4gSXQgZGVmYXVsdHMgYXMgdGhlIGJvZHkgdGFnLCBidXQgZ2V0cyB1cGRhdGVkXHJcbiAgICAgICAgICAgICAgICAgICAgICogdG8gdGhlIGxhc3QgZm9jdXNlZCBlbGVtZW50IGJlZm9yZSB0aGUgZGlhbG9nIHdhcyBvcGVuZWQuXHJcbiAgICAgICAgICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICAgICAgICAgKiBAdHlwZSB7Tm9kZX1cclxuICAgICAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgICAgICBhY3RpdmVFbGVtZW50OmRvY3VtZW50LmJvZHksXHJcbiAgICAgICAgICAgICAgICAgICAgdGltZXJJbjp1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGltZXJPdXQ6dW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbnM6IGJ1dHRvbnNEZWZpbml0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIGZvY3VzOiBzZXR1cC5mb2N1cyxcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGFsOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhc2ljOnVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJhbWVsZXNzOnVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGlubmVkOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmFibGU6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZUJvdW5kZWQ6dW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNpemFibGU6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b1Jlc2V0OiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NhYmxlOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NhYmxlQnlEaW1tZXI6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4aW1pemFibGU6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRNYXhpbWl6ZWQ6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGlubmFibGU6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOnVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3ZlcmZsb3c6dW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbnNob3c6dW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbmNsb3NlOnVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25mb2N1czp1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ubW92ZTp1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ubW92ZWQ6dW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbnJlc2l6ZTp1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ucmVzaXplZDp1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ubWF4aW1pemU6dW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbm1heGltaXplZDp1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ucmVzdG9yZTp1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ucmVzdG9yZWQ6dW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICByZXNldEhhbmRsZXI6dW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIGJlZ2luTW92ZUhhbmRsZXI6dW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIGJlZ2luUmVzaXplSGFuZGxlcjp1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgYnJpbmdUb0Zyb250SGFuZGxlcjp1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kYWxDbGlja0hhbmRsZXI6dW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbnNDbGlja0hhbmRsZXI6dW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmRzQ2xpY2tIYW5kbGVyOnVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uSW5IYW5kbGVyOnVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uT3V0SGFuZGxlcjp1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzdHJveTp1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnRzID0ge307XHJcbiAgICAgICAgICAgICAgICAvL3Jvb3Qgbm9kZVxyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMucm9vdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5yb290LmNsYXNzTmFtZSA9IGNsYXNzZXMuYmFzZSArICcgJyArIGNsYXNzZXMuaGlkZGVuICsgJyAnO1xyXG5cclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzLnJvb3QuaW5uZXJIVE1MID0gdGVtcGxhdGVzLmRpbW1lciArIHRlbXBsYXRlcy5tb2RhbDtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy9kaW1tZXJcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzLmRpbW1lciA9IGVsZW1lbnRzLnJvb3QuZmlyc3RDaGlsZDtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2RpYWxvZ1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMubW9kYWwgPSBlbGVtZW50cy5yb290Lmxhc3RDaGlsZDtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzLm1vZGFsLmlubmVySFRNTCA9IHRlbXBsYXRlcy5kaWFsb2c7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5kaWFsb2cgPSBlbGVtZW50cy5tb2RhbC5maXJzdENoaWxkO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMuZGlhbG9nLmlubmVySFRNTCA9IHRlbXBsYXRlcy5yZXNldCArIHRlbXBsYXRlcy5jb21tYW5kcyArIHRlbXBsYXRlcy5oZWFkZXIgKyB0ZW1wbGF0ZXMuYm9keSArIHRlbXBsYXRlcy5mb290ZXIgKyB0ZW1wbGF0ZXMucmVzaXplSGFuZGxlICsgdGVtcGxhdGVzLnJlc2V0O1xyXG5cclxuICAgICAgICAgICAgICAgIC8vcmVzZXQgbGlua3NcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzLnJlc2V0ID0gW107XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5yZXNldC5wdXNoKGVsZW1lbnRzLmRpYWxvZy5maXJzdENoaWxkKTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzLnJlc2V0LnB1c2goZWxlbWVudHMuZGlhbG9nLmxhc3RDaGlsZCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vY29tbWFuZHNcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzLmNvbW1hbmRzID0ge307XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5jb21tYW5kcy5jb250YWluZXIgPSBlbGVtZW50cy5yZXNldFswXS5uZXh0U2libGluZztcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzLmNvbW1hbmRzLnBpbiA9IGVsZW1lbnRzLmNvbW1hbmRzLmNvbnRhaW5lci5maXJzdENoaWxkO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMuY29tbWFuZHMubWF4aW1pemUgPSBlbGVtZW50cy5jb21tYW5kcy5waW4ubmV4dFNpYmxpbmc7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5jb21tYW5kcy5jbG9zZSA9IGVsZW1lbnRzLmNvbW1hbmRzLm1heGltaXplLm5leHRTaWJsaW5nO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvL2hlYWRlclxyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMuaGVhZGVyID0gZWxlbWVudHMuY29tbWFuZHMuY29udGFpbmVyLm5leHRTaWJsaW5nO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vYm9keVxyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMuYm9keSA9IGVsZW1lbnRzLmhlYWRlci5uZXh0U2libGluZztcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzLmJvZHkuaW5uZXJIVE1MID0gdGVtcGxhdGVzLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5jb250ZW50ID0gZWxlbWVudHMuYm9keS5maXJzdENoaWxkO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vZm9vdGVyXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5mb290ZXIgPSBlbGVtZW50cy5ib2R5Lm5leHRTaWJsaW5nO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMuZm9vdGVyLmlubmVySFRNTCA9IHRlbXBsYXRlcy5idXR0b25zLmF1eGlsaWFyeSArIHRlbXBsYXRlcy5idXR0b25zLnByaW1hcnk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vcmVzaXplIGhhbmRsZVxyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMucmVzaXplSGFuZGxlID0gZWxlbWVudHMuZm9vdGVyLm5leHRTaWJsaW5nO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vYnV0dG9uc1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMuYnV0dG9ucyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMuYnV0dG9ucy5hdXhpbGlhcnkgPSBlbGVtZW50cy5mb290ZXIuZmlyc3RDaGlsZDtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzLmJ1dHRvbnMucHJpbWFyeSA9IGVsZW1lbnRzLmJ1dHRvbnMuYXV4aWxpYXJ5Lm5leHRTaWJsaW5nO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMuYnV0dG9ucy5wcmltYXJ5LmlubmVySFRNTCA9IHRlbXBsYXRlcy5idXR0b247XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5idXR0b25UZW1wbGF0ZSA9IGVsZW1lbnRzLmJ1dHRvbnMucHJpbWFyeS5maXJzdENoaWxkO1xyXG4gICAgICAgICAgICAgICAgLy9yZW1vdmUgYnV0dG9uIHRlbXBsYXRlXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5idXR0b25zLnByaW1hcnkucmVtb3ZlQ2hpbGQoZWxlbWVudHMuYnV0dG9uVGVtcGxhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIHg9MDsgeCA8IGluc3RhbmNlLl9faW50ZXJuYWwuYnV0dG9ucy5sZW5ndGg7IHgrPTEpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYnV0dG9uID0gaW5zdGFuY2UuX19pbnRlcm5hbC5idXR0b25zW3hdO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFkZCB0byB0aGUgbGlzdCBvZiB1c2VkIGtleXMuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYodXNlZEtleXMuaW5kZXhPZihidXR0b24ua2V5KSA8IDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VkS2V5cy5wdXNoKGJ1dHRvbi5rZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uLmVsZW1lbnQgPSBlbGVtZW50cy5idXR0b25UZW1wbGF0ZS5jbG9uZU5vZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBidXR0b24uZWxlbWVudC5pbm5lckhUTUwgPSBidXR0b24udGV4dDtcclxuICAgICAgICAgICAgICAgICAgICBpZih0eXBlb2YgYnV0dG9uLmNsYXNzTmFtZSA9PT0gJ3N0cmluZycgJiYgIGJ1dHRvbi5jbGFzc05hbWUgIT09ICcnKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkQ2xhc3MoYnV0dG9uLmVsZW1lbnQsIGJ1dHRvbi5jbGFzc05hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGtleSBpbiBidXR0b24uYXR0cnMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihrZXkgIT09ICdjbGFzc05hbWUnICYmIGJ1dHRvbi5hdHRycy5oYXNPd25Qcm9wZXJ0eShrZXkpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5lbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIGJ1dHRvbi5hdHRyc1trZXldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZihidXR0b24uc2NvcGUgPT09ICdhdXhpbGlhcnknKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHMuYnV0dG9ucy5hdXhpbGlhcnkuYXBwZW5kQ2hpbGQoYnV0dG9uLmVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50cy5idXR0b25zLnByaW1hcnkuYXBwZW5kQ2hpbGQoYnV0dG9uLmVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vbWFrZSBlbGVtZW50cyBwdWJpY1xyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuZWxlbWVudHMgPSBlbGVtZW50cztcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy9zYXZlIGV2ZW50IGhhbmRsZXJzIGRlbGVnYXRlc1xyXG4gICAgICAgICAgICAgICAgaW50ZXJuYWwucmVzZXRIYW5kbGVyID0gZGVsZWdhdGUoaW5zdGFuY2UsIG9uUmVzZXQpO1xyXG4gICAgICAgICAgICAgICAgaW50ZXJuYWwuYmVnaW5Nb3ZlSGFuZGxlciA9IGRlbGVnYXRlKGluc3RhbmNlLCBiZWdpbk1vdmUpO1xyXG4gICAgICAgICAgICAgICAgaW50ZXJuYWwuYmVnaW5SZXNpemVIYW5kbGVyID0gZGVsZWdhdGUoaW5zdGFuY2UsIGJlZ2luUmVzaXplKTtcclxuICAgICAgICAgICAgICAgIGludGVybmFsLmJyaW5nVG9Gcm9udEhhbmRsZXIgPSBkZWxlZ2F0ZShpbnN0YW5jZSwgYnJpbmdUb0Zyb250KTtcclxuICAgICAgICAgICAgICAgIGludGVybmFsLm1vZGFsQ2xpY2tIYW5kbGVyID0gZGVsZWdhdGUoaW5zdGFuY2UsIG1vZGFsQ2xpY2tIYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgIGludGVybmFsLmJ1dHRvbnNDbGlja0hhbmRsZXIgPSBkZWxlZ2F0ZShpbnN0YW5jZSwgYnV0dG9uc0NsaWNrSGFuZGxlcik7XHJcbiAgICAgICAgICAgICAgICBpbnRlcm5hbC5jb21tYW5kc0NsaWNrSGFuZGxlciA9IGRlbGVnYXRlKGluc3RhbmNlLCBjb21tYW5kc0NsaWNrSGFuZGxlcik7XHJcbiAgICAgICAgICAgICAgICBpbnRlcm5hbC50cmFuc2l0aW9uSW5IYW5kbGVyID0gZGVsZWdhdGUoaW5zdGFuY2UsIGhhbmRsZVRyYW5zaXRpb25JbkV2ZW50KTtcclxuICAgICAgICAgICAgICAgIGludGVybmFsLnRyYW5zaXRpb25PdXRIYW5kbGVyID0gZGVsZWdhdGUoaW5zdGFuY2UsIGhhbmRsZVRyYW5zaXRpb25PdXRFdmVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9zZXR0aW5nc1xyXG4gICAgICAgICAgICAgICAgZm9yKHZhciBvcEtleSBpbiBpbnRlcm5hbC5vcHRpb25zKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihzZXR1cC5vcHRpb25zW29wS2V5XSAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgZm91bmQgaW4gdXNlciBvcHRpb25zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlLnNldChvcEtleSwgc2V0dXAub3B0aW9uc1tvcEtleV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGFsZXJ0aWZ5LmRlZmF1bHRzLmhhc093blByb3BlcnR5KG9wS2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBlbHNlIGlmIGZvdW5kIGluIGRlZmF1bHRzIG9wdGlvbnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2Uuc2V0KG9wS2V5LCBhbGVydGlmeS5kZWZhdWx0c1tvcEtleV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKG9wS2V5ID09PSAndGl0bGUnICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBlbHNlIGlmIHRpdGxlIGtleSwgdXNlIGFsZXJ0aWZ5LmRlZmF1bHRzLmdsb3NzYXJ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlLnNldChvcEtleSwgYWxlcnRpZnkuZGVmYXVsdHMuZ2xvc3Nhcnlbb3BLZXldKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gYWxsb3cgZG9tIGN1c3RvbWl6YXRpb25cclxuICAgICAgICAgICAgICAgIGlmKHR5cGVvZiBpbnN0YW5jZS5idWlsZCA9PT0gJ2Z1bmN0aW9uJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UuYnVpbGQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9hZGQgdG8gdGhlIGVuZCBvZiB0aGUgRE9NIHRyZWUuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaW5zdGFuY2UuZWxlbWVudHMucm9vdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBIZWxwZXI6IG1haW50YWlucyBzY3JvbGwgcG9zaXRpb25cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHZhciBzY3JvbGxYLCBzY3JvbGxZO1xyXG4gICAgICAgIGZ1bmN0aW9uIHNhdmVTY3JvbGxQb3NpdGlvbigpe1xyXG4gICAgICAgICAgICBzY3JvbGxYID0gZ2V0U2Nyb2xsTGVmdCgpO1xyXG4gICAgICAgICAgICBzY3JvbGxZID0gZ2V0U2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlc3RvcmVTY3JvbGxQb3NpdGlvbigpe1xyXG4gICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oc2Nyb2xsWCwgc2Nyb2xsWSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBIZWxwZXI6IGFkZHMvcmVtb3ZlcyBuby1vdmVyZmxvdyBjbGFzcyBmcm9tIGJvZHlcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGVuc3VyZU5vT3ZlcmZsb3coKXtcclxuICAgICAgICAgICAgdmFyIHJlcXVpcmVzTm9PdmVyZmxvdyA9IDA7XHJcbiAgICAgICAgICAgIGZvcih2YXIgeD0wO3g8b3BlbkRpYWxvZ3MubGVuZ3RoO3grPTEpe1xyXG4gICAgICAgICAgICAgICAgdmFyIGluc3RhbmNlID0gb3BlbkRpYWxvZ3NbeF07XHJcbiAgICAgICAgICAgICAgICBpZihpbnN0YW5jZS5pc01vZGFsKCkgfHwgaW5zdGFuY2UuaXNNYXhpbWl6ZWQoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZXNOb092ZXJmbG93Kz0xO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHJlcXVpcmVzTm9PdmVyZmxvdyA9PT0gMCAmJiBkb2N1bWVudC5ib2R5LmNsYXNzTmFtZS5pbmRleE9mKGNsYXNzZXMubm9PdmVyZmxvdykgPj0gMCl7XHJcbiAgICAgICAgICAgICAgICAvL2xhc3Qgb3BlbiBtb2RhbCBvciBsYXN0IG1heGltaXplZCBvbmVcclxuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKGRvY3VtZW50LmJvZHksIGNsYXNzZXMubm9PdmVyZmxvdyk7XHJcbiAgICAgICAgICAgICAgICBwcmV2ZW50Qm9keVNoaWZ0KGZhbHNlKTtcclxuICAgICAgICAgICAgfWVsc2UgaWYocmVxdWlyZXNOb092ZXJmbG93ID4gMCAmJiBkb2N1bWVudC5ib2R5LmNsYXNzTmFtZS5pbmRleE9mKGNsYXNzZXMubm9PdmVyZmxvdykgPCAwKXtcclxuICAgICAgICAgICAgICAgIC8vZmlyc3Qgb3BlbiBtb2RhbCBvciBmaXJzdCBtYXhpbWl6ZWQgb25lXHJcbiAgICAgICAgICAgICAgICBwcmV2ZW50Qm9keVNoaWZ0KHRydWUpO1xyXG4gICAgICAgICAgICAgICAgYWRkQ2xhc3MoZG9jdW1lbnQuYm9keSwgY2xhc3Nlcy5ub092ZXJmbG93KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgdG9wID0gJycsIHRvcFNjcm9sbCA9IDA7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSGVscGVyOiBwcmV2ZW50cyBib2R5IHNoaWZ0LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gcHJldmVudEJvZHlTaGlmdChhZGQpe1xyXG4gICAgICAgICAgICBpZihhbGVydGlmeS5kZWZhdWx0cy5wcmV2ZW50Qm9keVNoaWZ0ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQgPiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KXtcclxuICAgICAgICAgICAgICAgIGlmKGFkZCApey8vJiYgb3BlbkRpYWxvZ3Nbb3BlbkRpYWxvZ3MubGVuZ3RoLTFdLmVsZW1lbnRzLmRpYWxvZy5jbGllbnRIZWlnaHQgPD0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9wU2Nyb2xsID0gc2Nyb2xsWTtcclxuICAgICAgICAgICAgICAgICAgICB0b3AgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5KS50b3A7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkQ2xhc3MoZG9jdW1lbnQuYm9keSwgY2xhc3Nlcy5maXhlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS50b3AgPSAtc2Nyb2xsWSArICdweCc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFkgPSB0b3BTY3JvbGw7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS50b3AgPSB0b3A7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3MoZG9jdW1lbnQuYm9keSwgY2xhc3Nlcy5maXhlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdG9yZVNjcm9sbFBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblx0XHRcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXRzIHRoZSBuYW1lIG9mIHRoZSB0cmFuc2l0aW9uIHVzZWQgdG8gc2hvdy9oaWRlIHRoZSBkaWFsb2dcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2UgVGhlIGRpbG9nIGluc3RhbmNlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlVHJhbnNpdGlvbihpbnN0YW5jZSwgdmFsdWUsIG9sZFZhbHVlKXtcclxuICAgICAgICAgICAgaWYodHlwZW9mIG9sZFZhbHVlID09PSAnc3RyaW5nJyl7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyhpbnN0YW5jZS5lbGVtZW50cy5yb290LGNsYXNzZXMucHJlZml4ICsgIG9sZFZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhZGRDbGFzcyhpbnN0YW5jZS5lbGVtZW50cy5yb290LCBjbGFzc2VzLnByZWZpeCArIHZhbHVlKTtcclxuICAgICAgICAgICAgcmVmbG93ID0gaW5zdGFuY2UuZWxlbWVudHMucm9vdC5vZmZzZXRXaWR0aDtcclxuICAgICAgICB9XHJcblx0XHRcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUb2dnbGVzIHRoZSBkaWFsb2cgZGlzcGxheSBtb2RlXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2UgVGhlIGRpbG9nIGluc3RhbmNlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZURpc3BsYXlNb2RlKGluc3RhbmNlKXtcclxuICAgICAgICAgICAgaWYoaW5zdGFuY2UuZ2V0KCdtb2RhbCcpKXtcclxuXHJcbiAgICAgICAgICAgICAgICAvL21ha2UgbW9kYWxcclxuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKGluc3RhbmNlLmVsZW1lbnRzLnJvb3QsIGNsYXNzZXMubW9kZWxlc3MpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vb25seSBpZiBvcGVuXHJcbiAgICAgICAgICAgICAgICBpZihpbnN0YW5jZS5pc09wZW4oKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdW5iaW5kTW9kZWxlc3NFdmVudHMoaW5zdGFuY2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2luIGNhc2UgYSBwaW5uZWQgbW9kbGVzcyBkaWFsb2cgd2FzIG1hZGUgbW9kYWwgd2hpbGUgb3Blbi5cclxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVBYnNQb3NpdGlvbkZpeChpbnN0YW5jZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGVuc3VyZU5vT3ZlcmZsb3coKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAvL21ha2UgbW9kZWxzc1xyXG4gICAgICAgICAgICAgICAgYWRkQ2xhc3MoaW5zdGFuY2UuZWxlbWVudHMucm9vdCwgY2xhc3Nlcy5tb2RlbGVzcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9vbmx5IGlmIG9wZW5cclxuICAgICAgICAgICAgICAgIGlmKGluc3RhbmNlLmlzT3BlbigpKXtcclxuICAgICAgICAgICAgICAgICAgICBiaW5kTW9kZWxlc3NFdmVudHMoaW5zdGFuY2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2luIGNhc2UgcGluL3VucGluIHdhcyBjYWxsZWQgd2hpbGUgYSBtb2RhbCBpcyBvcGVuXHJcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlQWJzUG9zaXRpb25GaXgoaW5zdGFuY2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBlbnN1cmVOb092ZXJmbG93KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRvZ2dsZXMgdGhlIGRpYWxvZyBiYXNpYyB2aWV3IG1vZGUgXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2UgVGhlIGRpbG9nIGluc3RhbmNlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZUJhc2ljTW9kZShpbnN0YW5jZSl7XHJcbiAgICAgICAgICAgIGlmIChpbnN0YW5jZS5nZXQoJ2Jhc2ljJykpIHtcclxuICAgICAgICAgICAgICAgIC8vIGFkZCBjbGFzc1xyXG4gICAgICAgICAgICAgICAgYWRkQ2xhc3MoaW5zdGFuY2UuZWxlbWVudHMucm9vdCwgY2xhc3Nlcy5iYXNpYyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgY2xhc3NcclxuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKGluc3RhbmNlLmVsZW1lbnRzLnJvb3QsIGNsYXNzZXMuYmFzaWMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUb2dnbGVzIHRoZSBkaWFsb2cgZnJhbWVsZXNzIHZpZXcgbW9kZSBcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZSBUaGUgZGlsb2cgaW5zdGFuY2UuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlRnJhbWVsZXNzTW9kZShpbnN0YW5jZSl7XHJcbiAgICAgICAgICAgIGlmIChpbnN0YW5jZS5nZXQoJ2ZyYW1lbGVzcycpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBhZGQgY2xhc3NcclxuICAgICAgICAgICAgICAgIGFkZENsYXNzKGluc3RhbmNlLmVsZW1lbnRzLnJvb3QsIGNsYXNzZXMuZnJhbWVsZXNzKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBjbGFzc1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3MoaW5zdGFuY2UuZWxlbWVudHMucm9vdCwgY2xhc3Nlcy5mcmFtZWxlc3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cdFx0XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSGVscGVyOiBCcmluZ3MgdGhlIG1vZGVsZXNzIGRpYWxvZyB0byBmcm9udCwgYXR0YWNoZWQgdG8gbW9kZWxlc3MgZGlhbG9ncy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IEZvY3VzIGV2ZW50XHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlIFRoZSBkaWxvZyBpbnN0YW5jZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBicmluZ1RvRnJvbnQoZXZlbnQsIGluc3RhbmNlKXtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIERvIG5vdCBicmluZyB0byBmcm9udCBpZiBwcmVjZWVkZWQgYnkgYW4gb3BlbiBtb2RhbFxyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSBvcGVuRGlhbG9ncy5pbmRleE9mKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgZm9yKHZhciB4PWluZGV4KzE7eDxvcGVuRGlhbG9ncy5sZW5ndGg7eCs9MSl7XHJcbiAgICAgICAgICAgICAgICBpZihvcGVuRGlhbG9nc1t4XS5pc01vZGFsKCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cdFx0XHRcclxuICAgICAgICAgICAgLy8gQnJpbmcgdG8gZnJvbnQgYnkgbWFraW5nIGl0IHRoZSBsYXN0IGNoaWxkLlxyXG4gICAgICAgICAgICBpZihkb2N1bWVudC5ib2R5Lmxhc3RDaGlsZCAhPT0gaW5zdGFuY2UuZWxlbWVudHMucm9vdCl7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGluc3RhbmNlLmVsZW1lbnRzLnJvb3QpO1xyXG4gICAgICAgICAgICAgICAgLy9hbHNvIG1ha2Ugc3VyZSBpdHMgYXQgdGhlIGVuZCBvZiB0aGUgbGlzdFxyXG4gICAgICAgICAgICAgICAgb3BlbkRpYWxvZ3Muc3BsaWNlKG9wZW5EaWFsb2dzLmluZGV4T2YoaW5zdGFuY2UpLDEpO1xyXG4gICAgICAgICAgICAgICAgb3BlbkRpYWxvZ3MucHVzaChpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICBzZXRGb2N1cyhpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHRcdFx0XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblx0XHRcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBIZWxwZXI6IHJlZmxlY3RzIGRpYWxvZ3Mgb3B0aW9ucyB1cGRhdGVzXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2UgVGhlIGRpbG9nIGluc3RhbmNlLlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb24gVGhlIHVwZGF0ZWQgb3B0aW9uIG5hbWUuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJuXHR7dW5kZWZpbmVkfVx0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gb3B0aW9uVXBkYXRlZChpbnN0YW5jZSwgb3B0aW9uLCBvbGRWYWx1ZSwgbmV3VmFsdWUpe1xyXG4gICAgICAgICAgICBzd2l0Y2gob3B0aW9uKXtcclxuICAgICAgICAgICAgY2FzZSAndGl0bGUnOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2Uuc2V0SGVhZGVyKG5ld1ZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdtb2RhbCc6XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVEaXNwbGF5TW9kZShpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYmFzaWMnOlxyXG4gICAgICAgICAgICAgICAgdXBkYXRlQmFzaWNNb2RlKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdmcmFtZWxlc3MnOlxyXG4gICAgICAgICAgICAgICAgdXBkYXRlRnJhbWVsZXNzTW9kZShpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAncGlubmVkJzpcclxuICAgICAgICAgICAgICAgIHVwZGF0ZVBpbm5lZChpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnY2xvc2FibGUnOlxyXG4gICAgICAgICAgICAgICAgdXBkYXRlQ2xvc2FibGUoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ21heGltaXphYmxlJzpcclxuICAgICAgICAgICAgICAgIHVwZGF0ZU1heGltaXphYmxlKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdwaW5uYWJsZSc6XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVQaW5uYWJsZShpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbW92YWJsZSc6XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVNb3ZhYmxlKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdyZXNpemFibGUnOlxyXG4gICAgICAgICAgICAgICAgdXBkYXRlUmVzaXphYmxlKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICd0cmFuc2l0aW9uJzpcclxuICAgICAgICAgICAgICAgIHVwZGF0ZVRyYW5zaXRpb24oaW5zdGFuY2UsbmV3VmFsdWUsIG9sZFZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdwYWRkaW5nJzpcclxuICAgICAgICAgICAgICAgIGlmKG5ld1ZhbHVlKXtcclxuICAgICAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyhpbnN0YW5jZS5lbGVtZW50cy5yb290LCBjbGFzc2VzLm5vUGFkZGluZyk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihpbnN0YW5jZS5lbGVtZW50cy5yb290LmNsYXNzTmFtZS5pbmRleE9mKGNsYXNzZXMubm9QYWRkaW5nKSA8IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZENsYXNzKGluc3RhbmNlLmVsZW1lbnRzLnJvb3QsIGNsYXNzZXMubm9QYWRkaW5nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdvdmVyZmxvdyc6XHJcbiAgICAgICAgICAgICAgICBpZihuZXdWYWx1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3MoaW5zdGFuY2UuZWxlbWVudHMucm9vdCwgY2xhc3Nlcy5ub092ZXJmbG93KTtcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGluc3RhbmNlLmVsZW1lbnRzLnJvb3QuY2xhc3NOYW1lLmluZGV4T2YoY2xhc3Nlcy5ub092ZXJmbG93KSA8IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZENsYXNzKGluc3RhbmNlLmVsZW1lbnRzLnJvb3QsIGNsYXNzZXMubm9PdmVyZmxvdyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAndHJhbnNpdGlvbic6XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVUcmFuc2l0aW9uKGluc3RhbmNlLG5ld1ZhbHVlLCBvbGRWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gaW50ZXJuYWwgb24gb3B0aW9uIHVwZGF0ZWQgZXZlbnRcclxuICAgICAgICAgICAgaWYodHlwZW9mIGluc3RhbmNlLmhvb2tzLm9udXBkYXRlID09PSAnZnVuY3Rpb24nKXtcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlLmhvb2tzLm9udXBkYXRlLmNhbGwoaW5zdGFuY2UsIG9wdGlvbiwgb2xkVmFsdWUsIG5ld1ZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHRcdFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEhlbHBlcjogcmVmbGVjdHMgZGlhbG9ncyBvcHRpb25zIHVwZGF0ZXNcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZSBUaGUgZGlsb2cgaW5zdGFuY2UuXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIHNldC9nZXQgYSB2YWx1ZSBvbi9mcm9tLlxyXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIFRoZSBjYWxsYmFjayBmdW5jdGlvbiB0byBjYWxsIGlmIHRoZSBrZXkgd2FzIGZvdW5kLlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0ga2V5IEEgc3RyaW5nIHNwZWNpZnlpbmcgYSBwcm9wZXJ5IG5hbWUgb3IgYSBjb2xsZWN0aW9uIG9mIGtleSB2YWx1ZSBwYWlycy5cclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gdmFsdWUgT3B0aW9uYWwsIHRoZSB2YWx1ZSBhc3NvY2lhdGVkIHdpdGggdGhlIGtleSAoaW4gY2FzZSBpdCB3YXMgYSBzdHJpbmcpLlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb24gVGhlIHVwZGF0ZWQgb3B0aW9uIG5hbWUuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJuXHR7T2JqZWN0fSByZXN1bHQgb2JqZWN0IFxyXG4gICAgICAgICAqXHRUaGUgcmVzdWx0IG9iamVjdHMgaGFzIGFuICdvcCcgcHJvcGVydHksIGluZGljYXRpbmcgb2YgdGhpcyBpcyBhIFNFVCBvciBHRVQgb3BlcmF0aW9uLlxyXG4gICAgICAgICAqXHRcdEdFVDogXHJcbiAgICAgICAgICpcdFx0LSBmb3VuZDogYSBmbGFnIGluZGljYXRpbmcgaWYgdGhlIGtleSB3YXMgZm91bmQgb3Igbm90LlxyXG4gICAgICAgICAqXHRcdC0gdmFsdWU6IHRoZSBwcm9wZXJ0eSB2YWx1ZS5cclxuICAgICAgICAgKlx0XHRTRVQ6XHJcbiAgICAgICAgICpcdFx0LSBpdGVtczogYSBsaXN0IG9mIGtleSB2YWx1ZSBwYWlycyBvZiB0aGUgcHJvcGVydGllcyBiZWluZyBzZXQuXHJcbiAgICAgICAgICpcdFx0XHRcdGVhY2ggY29udGFpbnM6XHJcbiAgICAgICAgICpcdFx0XHRcdFx0LSBmb3VuZDogYSBmbGFnIGluZGljYXRpbmcgaWYgdGhlIGtleSB3YXMgZm91bmQgb3Igbm90LlxyXG4gICAgICAgICAqXHRcdFx0XHRcdC0ga2V5OiB0aGUgcHJvcGVydHkga2V5LlxyXG4gICAgICAgICAqXHRcdFx0XHRcdC0gdmFsdWU6IHRoZSBwcm9wZXJ0eSB2YWx1ZS5cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiB1cGRhdGUoaW5zdGFuY2UsIG9iaiwgY2FsbGJhY2ssIGtleSwgdmFsdWUpe1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0ge29wOnVuZGVmaW5lZCwgaXRlbXM6IFtdIH07XHJcbiAgICAgICAgICAgIGlmKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGtleSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgIC8vZ2V0XHJcbiAgICAgICAgICAgICAgICByZXN1bHQub3AgPSAnZ2V0JztcclxuICAgICAgICAgICAgICAgIGlmKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKXtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQuZm91bmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IG9ialtrZXldO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmZvdW5kID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIG9sZDtcclxuICAgICAgICAgICAgICAgIC8vc2V0XHJcbiAgICAgICAgICAgICAgICByZXN1bHQub3AgPSAnc2V0JztcclxuICAgICAgICAgICAgICAgIGlmKHR5cGVvZiBrZXkgPT09ICdvYmplY3QnKXtcclxuICAgICAgICAgICAgICAgICAgICAvL3NldCBtdWx0aXBsZVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0ga2V5O1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHByb3AgaW4gYXJncykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KHByb3ApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihvYmpbcHJvcF0gIT09IGFyZ3NbcHJvcF0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9sZCA9IG9ialtwcm9wXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmpbcHJvcF0gPSBhcmdzW3Byb3BdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoaW5zdGFuY2UscHJvcCwgb2xkLCBhcmdzW3Byb3BdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5pdGVtcy5wdXNoKHsgJ2tleSc6IHByb3AsICd2YWx1ZSc6IGFyZ3NbcHJvcF0sICdmb3VuZCc6dHJ1ZX0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5pdGVtcy5wdXNoKHsgJ2tleSc6IHByb3AsICd2YWx1ZSc6IGFyZ3NbcHJvcF0sICdmb3VuZCc6ZmFsc2V9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGtleSA9PT0gJ3N0cmluZycpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vc2V0IHNpbmdsZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihvYmpba2V5XSAhPT0gdmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2xkICA9IG9ialtrZXldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqW2tleV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoaW5zdGFuY2Usa2V5LCBvbGQsIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuaXRlbXMucHVzaCh7J2tleSc6IGtleSwgJ3ZhbHVlJzogdmFsdWUgLCAnZm91bmQnOnRydWV9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5pdGVtcy5wdXNoKHsna2V5Jzoga2V5LCAndmFsdWUnOiB2YWx1ZSAsICdmb3VuZCc6ZmFsc2V9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vaW52YWxpZCBwYXJhbXNcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2FyZ3MgbXVzdCBiZSBhIHN0cmluZyBvciBvYmplY3QnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRyaWdnZXJzIGEgY2xvc2UgZXZlbnQuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcdFRoZSBkaWxvZyBpbnN0YW5jZS5cclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gdHJpZ2dlckNsb3NlKGluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIHZhciBmb3VuZDtcclxuICAgICAgICAgICAgdHJpZ2dlckNhbGxiYWNrKGluc3RhbmNlLCBmdW5jdGlvbiAoYnV0dG9uKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZm91bmQgPSAoYnV0dG9uLmludm9rZU9uQ2xvc2UgPT09IHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy9ub25lIG9mIHRoZSBidXR0b25zIHJlZ2lzdGVyZWQgYXMgb25jbG9zZSBjYWxsYmFja1xyXG4gICAgICAgICAgICAvL2Nsb3NlIHRoZSBkaWFsb2dcclxuICAgICAgICAgICAgaWYgKCFmb3VuZCAmJiBpbnN0YW5jZS5pc09wZW4oKSkge1xyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuY2xvc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGlhbG9ncyBjb21tYW5kcyBldmVudCBoYW5kbGVyLCBhdHRhY2hlZCB0byB0aGUgZGlhbG9nIGNvbW1hbmRzIGVsZW1lbnQuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudFx0RE9NIGV2ZW50IG9iamVjdC5cclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcdFRoZSBkaWxvZyBpbnN0YW5jZS5cclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gY29tbWFuZHNDbGlja0hhbmRsZXIoZXZlbnQsIGluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBldmVudC5zcmNFbGVtZW50IHx8IGV2ZW50LnRhcmdldDtcclxuICAgICAgICAgICAgc3dpdGNoICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgY2FzZSBpbnN0YW5jZS5lbGVtZW50cy5jb21tYW5kcy5waW46XHJcbiAgICAgICAgICAgICAgICBpZiAoIWluc3RhbmNlLmlzUGlubmVkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBwaW4oaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1bnBpbihpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBpbnN0YW5jZS5lbGVtZW50cy5jb21tYW5kcy5tYXhpbWl6ZTpcclxuICAgICAgICAgICAgICAgIGlmICghaW5zdGFuY2UuaXNNYXhpbWl6ZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1heGltaXplKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdG9yZShpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBpbnN0YW5jZS5lbGVtZW50cy5jb21tYW5kcy5jbG9zZTpcclxuICAgICAgICAgICAgICAgIHRyaWdnZXJDbG9zZShpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBIZWxwZXI6IHBpbnMgdGhlIG1vZGVsZXNzIGRpYWxvZy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVx0VGhlIGRpYWxvZyBpbnN0YW5jZS5cclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gcGluKGluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIC8vcGluIHRoZSBkaWFsb2dcclxuICAgICAgICAgICAgaW5zdGFuY2Uuc2V0KCdwaW5uZWQnLCB0cnVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEhlbHBlcjogdW5waW5zIHRoZSBtb2RlbGVzcyBkaWFsb2cuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcdFRoZSBkaWxvZyBpbnN0YW5jZS5cclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gdW5waW4oaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgLy91bnBpbiB0aGUgZGlhbG9nIFxyXG4gICAgICAgICAgICBpbnN0YW5jZS5zZXQoJ3Bpbm5lZCcsIGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBIZWxwZXI6IGVubGFyZ2VzIHRoZSBkaWFsb2cgdG8gZmlsbCB0aGUgZW50aXJlIHNjcmVlbi5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVx0VGhlIGRpbG9nIGluc3RhbmNlLlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBtYXhpbWl6ZShpbnN0YW5jZSkge1xyXG4gICAgICAgICAgICAvLyBhbGxvdyBjdXN0b20gYG9ubWF4aW1pemVgIG1ldGhvZFxyXG4gICAgICAgICAgICBkaXNwYXRjaEV2ZW50KCdvbm1heGltaXplJywgaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAvL21heGltaXplIHRoZSBkaWFsb2cgXHJcbiAgICAgICAgICAgIGFkZENsYXNzKGluc3RhbmNlLmVsZW1lbnRzLnJvb3QsIGNsYXNzZXMubWF4aW1pemVkKTtcclxuICAgICAgICAgICAgaWYgKGluc3RhbmNlLmlzT3BlbigpKSB7XHJcbiAgICAgICAgICAgICAgICBlbnN1cmVOb092ZXJmbG93KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gYWxsb3cgY3VzdG9tIGBvbm1heGltaXplZGAgbWV0aG9kXHJcbiAgICAgICAgICAgIGRpc3BhdGNoRXZlbnQoJ29ubWF4aW1pemVkJywgaW5zdGFuY2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSGVscGVyOiByZXR1cm5zIHRoZSBkaWFsb2cgdG8gaXRzIGZvcm1lciBzaXplLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXHRUaGUgZGlsb2cgaW5zdGFuY2UuXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIHJlc3RvcmUoaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgLy8gYWxsb3cgY3VzdG9tIGBvbnJlc3RvcmVgIG1ldGhvZFxyXG4gICAgICAgICAgICBkaXNwYXRjaEV2ZW50KCdvbnJlc3RvcmUnLCBpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIC8vbWF4aW1pemUgdGhlIGRpYWxvZyBcclxuICAgICAgICAgICAgcmVtb3ZlQ2xhc3MoaW5zdGFuY2UuZWxlbWVudHMucm9vdCwgY2xhc3Nlcy5tYXhpbWl6ZWQpO1xyXG4gICAgICAgICAgICBpZiAoaW5zdGFuY2UuaXNPcGVuKCkpIHtcclxuICAgICAgICAgICAgICAgIGVuc3VyZU5vT3ZlcmZsb3coKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBhbGxvdyBjdXN0b20gYG9ucmVzdG9yZWRgIG1ldGhvZFxyXG4gICAgICAgICAgICBkaXNwYXRjaEV2ZW50KCdvbnJlc3RvcmVkJywgaW5zdGFuY2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2hvdyBvciBoaWRlIHRoZSBtYXhpbWl6ZSBib3guXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2UgVGhlIGRpbG9nIGluc3RhbmNlLlxyXG4gICAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb24gVHJ1ZSB0byBhZGQgdGhlIGJlaGF2aW9yLCByZW1vdmVzIGl0IG90aGVyd2lzZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVQaW5uYWJsZShpbnN0YW5jZSkge1xyXG4gICAgICAgICAgICBpZiAoaW5zdGFuY2UuZ2V0KCdwaW5uYWJsZScpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBhZGQgY2xhc3NcclxuICAgICAgICAgICAgICAgIGFkZENsYXNzKGluc3RhbmNlLmVsZW1lbnRzLnJvb3QsIGNsYXNzZXMucGlubmFibGUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGNsYXNzXHJcbiAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyhpbnN0YW5jZS5lbGVtZW50cy5yb290LCBjbGFzc2VzLnBpbm5hYmxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSGVscGVyOiBGaXhlcyB0aGUgYWJzb2x1dGx5IHBvc2l0aW9uZWQgbW9kYWwgZGl2IHBvc2l0aW9uLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlIFRoZSBkaWFsb2cgaW5zdGFuY2UuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gYWRkQWJzUG9zaXRpb25GaXgoaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgdmFyIHNjcm9sbExlZnQgPSBnZXRTY3JvbGxMZWZ0KCk7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLmVsZW1lbnRzLm1vZGFsLnN0eWxlLm1hcmdpblRvcCA9IGdldFNjcm9sbFRvcCgpICsgJ3B4JztcclxuICAgICAgICAgICAgaW5zdGFuY2UuZWxlbWVudHMubW9kYWwuc3R5bGUubWFyZ2luTGVmdCA9IHNjcm9sbExlZnQgKyAncHgnO1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5lbGVtZW50cy5tb2RhbC5zdHlsZS5tYXJnaW5SaWdodCA9ICgtc2Nyb2xsTGVmdCkgKyAncHgnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSGVscGVyOiBSZW1vdmVzIHRoZSBhYnNvbHV0bHkgcG9zaXRpb25lZCBtb2RhbCBkaXYgcG9zaXRpb24gZml4LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlIFRoZSBkaWFsb2cgaW5zdGFuY2UuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gcmVtb3ZlQWJzUG9zaXRpb25GaXgoaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgdmFyIG1hcmdpblRvcCA9IHBhcnNlSW50KGluc3RhbmNlLmVsZW1lbnRzLm1vZGFsLnN0eWxlLm1hcmdpblRvcCwgMTApO1xyXG4gICAgICAgICAgICB2YXIgbWFyZ2luTGVmdCA9IHBhcnNlSW50KGluc3RhbmNlLmVsZW1lbnRzLm1vZGFsLnN0eWxlLm1hcmdpbkxlZnQsIDEwKTtcclxuICAgICAgICAgICAgaW5zdGFuY2UuZWxlbWVudHMubW9kYWwuc3R5bGUubWFyZ2luVG9wID0gJyc7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLmVsZW1lbnRzLm1vZGFsLnN0eWxlLm1hcmdpbkxlZnQgPSAnJztcclxuICAgICAgICAgICAgaW5zdGFuY2UuZWxlbWVudHMubW9kYWwuc3R5bGUubWFyZ2luUmlnaHQgPSAnJztcclxuXHJcbiAgICAgICAgICAgIGlmIChpbnN0YW5jZS5pc09wZW4oKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRvcCA9IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdCA9IDBcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZS5lbGVtZW50cy5kaWFsb2cuc3R5bGUudG9wICE9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvcCA9IHBhcnNlSW50KGluc3RhbmNlLmVsZW1lbnRzLmRpYWxvZy5zdHlsZS50b3AsIDEwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGluc3RhbmNlLmVsZW1lbnRzLmRpYWxvZy5zdHlsZS50b3AgPSAodG9wICsgKG1hcmdpblRvcCAtIGdldFNjcm9sbFRvcCgpKSkgKyAncHgnO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZS5lbGVtZW50cy5kaWFsb2cuc3R5bGUubGVmdCAhPT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gcGFyc2VJbnQoaW5zdGFuY2UuZWxlbWVudHMuZGlhbG9nLnN0eWxlLmxlZnQsIDEwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGluc3RhbmNlLmVsZW1lbnRzLmRpYWxvZy5zdHlsZS5sZWZ0ID0gKGxlZnQgKyAobWFyZ2luTGVmdCAtIGdldFNjcm9sbExlZnQoKSkpICsgJ3B4JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBIZWxwZXI6IEFkZHMvUmVtb3ZlcyB0aGUgYWJzb2x1dGx5IHBvc2l0aW9uZWQgbW9kYWwgZGl2IHBvc2l0aW9uIGZpeCBiYXNlZCBvbiBpdHMgcGlubmVkIHNldHRpbmcuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2UgVGhlIGRpYWxvZyBpbnN0YW5jZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVBYnNQb3NpdGlvbkZpeChpbnN0YW5jZSkge1xyXG4gICAgICAgICAgICAvLyBpZiBtb2RlbGVzcyBhbmQgdW5waW5uZWQgYWRkIGZpeFxyXG4gICAgICAgICAgICBpZiAoIWluc3RhbmNlLmdldCgnbW9kYWwnKSAmJiAhaW5zdGFuY2UuZ2V0KCdwaW5uZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgYWRkQWJzUG9zaXRpb25GaXgoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlQWJzUG9zaXRpb25GaXgoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRvZ2dsZXMgdGhlIGRpYWxvZyBwb3NpdGlvbiBsb2NrIHwgbW9kZWxlc3Mgb25seS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZSBUaGUgZGlsb2cgaW5zdGFuY2UuXHJcbiAgICAgICAgICogQHBhcmFtIHtCb29sZWFufSBvbiBUcnVlIHRvIG1ha2UgaXQgbW9kYWwsIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVQaW5uZWQoaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgaWYgKGluc3RhbmNlLmdldCgncGlubmVkJykpIHtcclxuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKGluc3RhbmNlLmVsZW1lbnRzLnJvb3QsIGNsYXNzZXMudW5waW5uZWQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlLmlzT3BlbigpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQWJzUG9zaXRpb25GaXgoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWRkQ2xhc3MoaW5zdGFuY2UuZWxlbWVudHMucm9vdCwgY2xhc3Nlcy51bnBpbm5lZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2UuaXNPcGVuKCkgJiYgIWluc3RhbmNlLmlzTW9kYWwoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZEFic1Bvc2l0aW9uRml4KGluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2hvdyBvciBoaWRlIHRoZSBtYXhpbWl6ZSBib3guXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2UgVGhlIGRpbG9nIGluc3RhbmNlLlxyXG4gICAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb24gVHJ1ZSB0byBhZGQgdGhlIGJlaGF2aW9yLCByZW1vdmVzIGl0IG90aGVyd2lzZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVNYXhpbWl6YWJsZShpbnN0YW5jZSkge1xyXG4gICAgICAgICAgICBpZiAoaW5zdGFuY2UuZ2V0KCdtYXhpbWl6YWJsZScpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBhZGQgY2xhc3NcclxuICAgICAgICAgICAgICAgIGFkZENsYXNzKGluc3RhbmNlLmVsZW1lbnRzLnJvb3QsIGNsYXNzZXMubWF4aW1pemFibGUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGNsYXNzXHJcbiAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyhpbnN0YW5jZS5lbGVtZW50cy5yb290LCBjbGFzc2VzLm1heGltaXphYmxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2hvdyBvciBoaWRlIHRoZSBjbG9zZSBib3guXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2UgVGhlIGRpbG9nIGluc3RhbmNlLlxyXG4gICAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb24gVHJ1ZSB0byBhZGQgdGhlIGJlaGF2aW9yLCByZW1vdmVzIGl0IG90aGVyd2lzZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVDbG9zYWJsZShpbnN0YW5jZSkge1xyXG4gICAgICAgICAgICBpZiAoaW5zdGFuY2UuZ2V0KCdjbG9zYWJsZScpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBhZGQgY2xhc3NcclxuICAgICAgICAgICAgICAgIGFkZENsYXNzKGluc3RhbmNlLmVsZW1lbnRzLnJvb3QsIGNsYXNzZXMuY2xvc2FibGUpO1xyXG4gICAgICAgICAgICAgICAgYmluZENsb3NhYmxlRXZlbnRzKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBjbGFzc1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3MoaW5zdGFuY2UuZWxlbWVudHMucm9vdCwgY2xhc3Nlcy5jbG9zYWJsZSk7XHJcbiAgICAgICAgICAgICAgICB1bmJpbmRDbG9zYWJsZUV2ZW50cyhpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGZsYWcgdG8gY2FuY2VsIGNsaWNrIGV2ZW50IGlmIGFscmVhZHkgaGFuZGxlZCBieSBlbmQgcmVzaXplIGV2ZW50ICh0aGUgbW91c2Vkb3duLCBtb3VzZW1vdmUsIG1vdXNldXAgc2VxdWVuY2UgZmlyZXMgYSBjbGljayBldmVudC4pLlxyXG4gICAgICAgIHZhciBjYW5jZWxDbGljayA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBIZWxwZXI6IGNsb3NlcyB0aGUgbW9kYWwgZGlhbG9nIHdoZW4gY2xpY2tpbmcgdGhlIG1vZGFsXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudFx0RE9NIGV2ZW50IG9iamVjdC5cclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2UgVGhlIGRpbG9nIGluc3RhbmNlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIG1vZGFsQ2xpY2tIYW5kbGVyKGV2ZW50LCBpbnN0YW5jZSkge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gZXZlbnQuc3JjRWxlbWVudCB8fCBldmVudC50YXJnZXQ7XHJcbiAgICAgICAgICAgIGlmICghY2FuY2VsQ2xpY2sgJiYgdGFyZ2V0ID09PSBpbnN0YW5jZS5lbGVtZW50cy5tb2RhbCAmJiBpbnN0YW5jZS5nZXQoJ2Nsb3NhYmxlQnlEaW1tZXInKSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgdHJpZ2dlckNsb3NlKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYW5jZWxDbGljayA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBmbGFnIHRvIGNhbmNlbCBrZXl1cCBldmVudCBpZiBhbHJlYWR5IGhhbmRsZWQgYnkgY2xpY2sgZXZlbnQgKHByZXNzaW5nIEVudGVyIG9uIGEgZm9jdXN0ZWQgYnV0dG9uKS5cclxuICAgICAgICB2YXIgY2FuY2VsS2V5dXAgPSBmYWxzZTtcclxuICAgICAgICAvKiogXHJcbiAgICAgICAgICogSGVscGVyOiB0cmlnZ2VycyBhIGJ1dHRvbiBjYWxsYmFja1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9XHRcdFRoZSBkaWxvZyBpbnN0YW5jZS5cclxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufVx0Q2FsbGJhY2sgdG8gY2hlY2sgd2hpY2ggYnV0dG9uIHRyaWdnZXJlZCB0aGUgZXZlbnQuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gdHJpZ2dlckNhbGxiYWNrKGluc3RhbmNlLCBjaGVjaykge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCBpbnN0YW5jZS5fX2ludGVybmFsLmJ1dHRvbnMubGVuZ3RoOyBpZHggKz0gMSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGJ1dHRvbiA9IGluc3RhbmNlLl9faW50ZXJuYWwuYnV0dG9uc1tpZHhdO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFidXR0b24uZWxlbWVudC5kaXNhYmxlZCAmJiBjaGVjayhidXR0b24pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNsb3NlRXZlbnQgPSBjcmVhdGVDbG9zZUV2ZW50KGlkeCwgYnV0dG9uKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGluc3RhbmNlLmNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlLmNhbGxiYWNrLmFwcGx5KGluc3RhbmNlLCBbY2xvc2VFdmVudF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL2Nsb3NlIHRoZSBkaWFsb2cgb25seSBpZiBub3QgY2FuY2VsZWQuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsb3NlRXZlbnQuY2FuY2VsID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZS5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ2xpY2tzIGV2ZW50IGhhbmRsZXIsIGF0dGFjaGVkIHRvIHRoZSBkaWFsb2cgZm9vdGVyLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtFdmVudH1cdFx0RE9NIGV2ZW50IG9iamVjdC5cclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH1cdFx0VGhlIGRpbG9nIGluc3RhbmNlLlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBidXR0b25zQ2xpY2tIYW5kbGVyKGV2ZW50LCBpbnN0YW5jZSkge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gZXZlbnQuc3JjRWxlbWVudCB8fCBldmVudC50YXJnZXQ7XHJcbiAgICAgICAgICAgIHRyaWdnZXJDYWxsYmFjayhpbnN0YW5jZSwgZnVuY3Rpb24gKGJ1dHRvbikge1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgdGhpcyBidXR0b24gY2F1c2VkIHRoZSBjbGljaywgY2FuY2VsIGtleXVwIGV2ZW50XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYnV0dG9uLmVsZW1lbnQgPT09IHRhcmdldCAmJiAoY2FuY2VsS2V5dXAgPSB0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBLZXl1cCBldmVudCBoYW5kbGVyLCBhdHRhY2hlZCB0byB0aGUgZG9jdW1lbnQuYm9keVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtFdmVudH1cdFx0RE9NIGV2ZW50IG9iamVjdC5cclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH1cdFx0VGhlIGRpbG9nIGluc3RhbmNlLlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBrZXl1cEhhbmRsZXIoZXZlbnQpIHtcclxuICAgICAgICAgICAgLy9oaXR0aW5nIGVudGVyIHdoaWxlIGJ1dHRvbiBoYXMgZm9jdXMgd2lsbCB0cmlnZ2VyIGtleXVwIHRvby5cclxuICAgICAgICAgICAgLy9pZ25vcmUgaWYgaGFuZGxlZCBieSBjbGlja0hhbmRsZXJcclxuICAgICAgICAgICAgaWYgKGNhbmNlbEtleXVwKSB7XHJcbiAgICAgICAgICAgICAgICBjYW5jZWxLZXl1cCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IG9wZW5EaWFsb2dzW29wZW5EaWFsb2dzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICB2YXIga2V5Q29kZSA9IGV2ZW50LmtleUNvZGU7XHJcbiAgICAgICAgICAgIGlmIChpbnN0YW5jZS5fX2ludGVybmFsLmJ1dHRvbnMubGVuZ3RoID09PSAwICYmIGtleUNvZGUgPT09IGtleXMuRVNDICYmIGluc3RhbmNlLmdldCgnY2xvc2FibGUnKSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgdHJpZ2dlckNsb3NlKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfWVsc2UgaWYgKHVzZWRLZXlzLmluZGV4T2Yoa2V5Q29kZSkgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgdHJpZ2dlckNhbGxiYWNrKGluc3RhbmNlLCBmdW5jdGlvbiAoYnV0dG9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJ1dHRvbi5rZXkgPT09IGtleUNvZGU7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAqIEtleWRvd24gZXZlbnQgaGFuZGxlciwgYXR0YWNoZWQgdG8gdGhlIGRvY3VtZW50LmJvZHlcclxuICAgICAgICAqXHJcbiAgICAgICAgKiBAcGFyYW0ge0V2ZW50fVx0XHRET00gZXZlbnQgb2JqZWN0LlxyXG4gICAgICAgICogQHBhcmFtIHtPYmplY3R9XHRcdFRoZSBkaWxvZyBpbnN0YW5jZS5cclxuICAgICAgICAqIFxyXG4gICAgICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxyXG4gICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24ga2V5ZG93bkhhbmRsZXIoZXZlbnQpIHtcclxuICAgICAgICAgICAgdmFyIGluc3RhbmNlID0gb3BlbkRpYWxvZ3Nbb3BlbkRpYWxvZ3MubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgIHZhciBrZXlDb2RlID0gZXZlbnQua2V5Q29kZTtcclxuICAgICAgICAgICAgaWYgKGtleUNvZGUgPT09IGtleXMuTEVGVCB8fCBrZXlDb2RlID09PSBrZXlzLlJJR0hUKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYnV0dG9ucyA9IGluc3RhbmNlLl9faW50ZXJuYWwuYnV0dG9ucztcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgYnV0dG9ucy5sZW5ndGg7IHggKz0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBidXR0b25zW3hdLmVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChrZXlDb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2Uga2V5cy5MRUZUOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uc1soeCB8fCBidXR0b25zLmxlbmd0aCkgLSAxXS5lbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2Uga2V5cy5SSUdIVDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbnNbKHggKyAxKSAlIGJ1dHRvbnMubGVuZ3RoXS5lbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNlIGlmIChrZXlDb2RlIDwga2V5cy5GMTIgKyAxICYmIGtleUNvZGUgPiBrZXlzLkYxIC0gMSAmJiB1c2VkS2V5cy5pbmRleE9mKGtleUNvZGUpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIHRyaWdnZXJDYWxsYmFjayhpbnN0YW5jZSwgZnVuY3Rpb24gKGJ1dHRvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBidXR0b24ua2V5ID09PSBrZXlDb2RlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXRzIGZvY3VzIHRvIHByb3BlciBkaWFsb2cgZWxlbWVudFxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlIFRoZSBkaWxvZyBpbnN0YW5jZS5cclxuICAgICAgICAgKiBAcGFyYW0ge05vZGV9IFtyZXNldFRhcmdldD11bmRlZmluZWRdIERPTSBlbGVtZW50IHRvIHJlc2V0IGZvY3VzIHRvLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIHNldEZvY3VzKGluc3RhbmNlLCByZXNldFRhcmdldCkge1xyXG4gICAgICAgICAgICAvLyByZXNldCB0YXJnZXQgaGFzIGFscmVhZHkgYmVlbiBkZXRlcm1pbmVkLlxyXG4gICAgICAgICAgICBpZiAocmVzZXRUYXJnZXQpIHtcclxuICAgICAgICAgICAgICAgIHJlc2V0VGFyZ2V0LmZvY3VzKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjdXJyZW50IGluc3RhbmNlIGZvY3VzIHNldHRpbmdzXHJcbiAgICAgICAgICAgICAgICB2YXIgZm9jdXMgPSBpbnN0YW5jZS5fX2ludGVybmFsLmZvY3VzO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhlIGZvY3VzIGVsZW1lbnQuXHJcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IGZvY3VzLmVsZW1lbnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0eXBlb2YgZm9jdXMuZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgLy8gYSBudW1iZXIgbWVhbnMgYSBidXR0b24gaW5kZXhcclxuICAgICAgICAgICAgICAgIGNhc2UgJ251bWJlcic6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlLl9faW50ZXJuYWwuYnV0dG9ucy5sZW5ndGggPiBmb2N1cy5lbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaW4gYmFzaWMgdmlldywgc2tpcCBmb2N1c2luZyB0aGUgYnV0dG9ucy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlLmdldCgnYmFzaWMnKSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudCA9IGluc3RhbmNlLmVsZW1lbnRzLnJlc2V0WzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudCA9IGluc3RhbmNlLl9faW50ZXJuYWwuYnV0dG9uc1tmb2N1cy5lbGVtZW50XS5lbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgLy8gYSBzdHJpbmcgbWVhbnMgcXVlcnlTZWxlY3RvciB0byBzZWxlY3QgZnJvbSBkaWFsb2cgYm9keSBjb250ZW50cy5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudCA9IGluc3RhbmNlLmVsZW1lbnRzLmJvZHkucXVlcnlTZWxlY3Rvcihmb2N1cy5lbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIC8vIGEgZnVuY3Rpb24gc2hvdWxkIHJldHVybiB0aGUgZm9jdXMgZWxlbWVudC5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50ID0gZm9jdXMuZWxlbWVudC5jYWxsKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gaWYgbm8gZm9jdXMgZWxlbWVudCwgZGVmYXVsdCB0byBmaXJzdCByZXNldCBlbGVtZW50LlxyXG4gICAgICAgICAgICAgICAgaWYgKCh0eXBlb2YgZWxlbWVudCA9PT0gJ3VuZGVmaW5lZCcgfHwgZWxlbWVudCA9PT0gbnVsbCkgJiYgaW5zdGFuY2UuX19pbnRlcm5hbC5idXR0b25zLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBpbnN0YW5jZS5lbGVtZW50cy5yZXNldFswXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIGZvY3VzXHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudCAmJiBlbGVtZW50LmZvY3VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHNlbGVjdGFibGVcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZm9jdXMuc2VsZWN0ICYmIGVsZW1lbnQuc2VsZWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc2VsZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBGb2N1cyBldmVudCBoYW5kbGVyLCBhdHRhY2hlZCB0byBkb2N1bWVudC5ib2R5IGFuZCBkaWFsb2dzIG93biByZXNldCBsaW5rcy5cclxuICAgICAgICAgKiBoYW5kbGVzIHRoZSBmb2N1cyBmb3IgbW9kYWwgZGlhbG9ncyBvbmx5LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgRE9NIGZvY3VzIGV2ZW50IG9iamVjdC5cclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2UgVGhlIGRpbG9nIGluc3RhbmNlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIG9uUmVzZXQoZXZlbnQsIGluc3RhbmNlKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBzaG91bGQgd29yayBvbiBsYXN0IG1vZGFsIGlmIHRyaWdnZXJlZCBmcm9tIGRvY3VtZW50LmJvZHkgXHJcbiAgICAgICAgICAgIGlmICghaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHggPSBvcGVuRGlhbG9ncy5sZW5ndGggLSAxOyB4ID4gLTE7IHggLT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcGVuRGlhbG9nc1t4XS5pc01vZGFsKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBvcGVuRGlhbG9nc1t4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGlmIG1vZGFsXHJcbiAgICAgICAgICAgIGlmIChpbnN0YW5jZSAmJiBpbnN0YW5jZS5pc01vZGFsKCkpIHtcclxuICAgICAgICAgICAgICAgIC8vIGRldGVybWluZSByZXNldCB0YXJnZXQgdG8gZW5hYmxlIGZvcndhcmQvYmFja3dhcmQgdGFiIGN5Y2xlLlxyXG4gICAgICAgICAgICAgICAgdmFyIHJlc2V0VGFyZ2V0LCB0YXJnZXQgPSBldmVudC5zcmNFbGVtZW50IHx8IGV2ZW50LnRhcmdldDtcclxuICAgICAgICAgICAgICAgIHZhciBsYXN0UmVzZXRFbGVtZW50ID0gdGFyZ2V0ID09PSBpbnN0YW5jZS5lbGVtZW50cy5yZXNldFsxXSB8fCAoaW5zdGFuY2UuX19pbnRlcm5hbC5idXR0b25zLmxlbmd0aCA9PT0gMCAmJiB0YXJnZXQgPT09IGRvY3VtZW50LmJvZHkpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGlmIGxhc3QgcmVzZXQgbGluaywgdGhlbiBnbyB0byBtYXhpbWl6ZSBvciBjbG9zZVxyXG4gICAgICAgICAgICAgICAgaWYgKGxhc3RSZXNldEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2UuZ2V0KCdtYXhpbWl6YWJsZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc2V0VGFyZ2V0ID0gaW5zdGFuY2UuZWxlbWVudHMuY29tbWFuZHMubWF4aW1pemU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpbnN0YW5jZS5nZXQoJ2Nsb3NhYmxlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzZXRUYXJnZXQgPSBpbnN0YW5jZS5lbGVtZW50cy5jb21tYW5kcy5jbG9zZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBpZiBubyByZXNldCB0YXJnZXQgZm91bmQsIHRyeSBmaW5kaW5nIHRoZSBiZXN0IGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgaWYgKHJlc2V0VGFyZ2V0ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGluc3RhbmNlLl9faW50ZXJuYWwuZm9jdXMuZWxlbWVudCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYnV0dG9uIGZvY3VzIGVsZW1lbnQsIGdvIHRvIGZpcnN0IGF2YWlsYWJsZSBidXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldCA9PT0gaW5zdGFuY2UuZWxlbWVudHMucmVzZXRbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc2V0VGFyZ2V0ID0gaW5zdGFuY2UuZWxlbWVudHMuYnV0dG9ucy5hdXhpbGlhcnkuZmlyc3RDaGlsZCB8fCBpbnN0YW5jZS5lbGVtZW50cy5idXR0b25zLnByaW1hcnkuZmlyc3RDaGlsZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsYXN0UmVzZXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3Jlc3RhcnQgdGhlIGN5Y2xlIGJ5IGdvaW5nIHRvIGZpcnN0IHJlc2V0IGxpbmtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc2V0VGFyZ2V0ID0gaW5zdGFuY2UuZWxlbWVudHMucmVzZXRbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB3aWxsIHJlYWNoIGhlcmUgd2hlbiB0YXBwaW5nIGJhY2t3YXJkcywgc28gZ28gdG8gbGFzdCBjaGlsZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgZm9jdXMgZWxlbWVudCBTSE9VTEQgTk9UIGJlIGEgYnV0dG9uIChsb2dpY2FsbHkhKS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldCA9PT0gaW5zdGFuY2UuZWxlbWVudHMucmVzZXRbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc2V0VGFyZ2V0ID0gaW5zdGFuY2UuZWxlbWVudHMuYnV0dG9ucy5wcmltYXJ5Lmxhc3RDaGlsZCB8fCBpbnN0YW5jZS5lbGVtZW50cy5idXR0b25zLmF1eGlsaWFyeS5sYXN0Q2hpbGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBmb2N1c1xyXG4gICAgICAgICAgICAgICAgc2V0Rm9jdXMoaW5zdGFuY2UsIHJlc2V0VGFyZ2V0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUcmFuc2l0aW9uIGluIHRyYW5zaXRpb25lbmQgZXZlbnQgaGFuZGxlci4gXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge0V2ZW50fVx0XHRUcmFuc2l0aW9uRW5kIGV2ZW50IG9iamVjdC5cclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH1cdFx0VGhlIGRpbG9nIGluc3RhbmNlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZVRyYW5zaXRpb25JbkV2ZW50KGV2ZW50LCBpbnN0YW5jZSkge1xyXG4gICAgICAgICAgICAvLyBjbGVhciB0aGUgdGltZXJcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGluc3RhbmNlLl9faW50ZXJuYWwudGltZXJJbik7XHJcblxyXG4gICAgICAgICAgICAvLyBvbmNlIHRyYW5zaXRpb24gaXMgY29tcGxldGUsIHNldCBmb2N1c1xyXG4gICAgICAgICAgICBzZXRGb2N1cyhpbnN0YW5jZSk7XHJcblxyXG4gICAgICAgICAgICAvL3Jlc3RvcmUgc2Nyb2xsIHRvIHByZXZlbnQgZG9jdW1lbnQganVtcFxyXG4gICAgICAgICAgICByZXN0b3JlU2Nyb2xsUG9zaXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFsbG93IGhhbmRsaW5nIGtleSB1cCBhZnRlciB0cmFuc2l0aW9uIGVuZGVkLlxyXG4gICAgICAgICAgICBjYW5jZWxLZXl1cCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgLy8gYWxsb3cgY3VzdG9tIGBvbmZvY3VzYCBtZXRob2RcclxuICAgICAgICAgICAgZGlzcGF0Y2hFdmVudCgnb25mb2N1cycsIGluc3RhbmNlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHVuYmluZCB0aGUgZXZlbnRcclxuICAgICAgICAgICAgb2ZmKGluc3RhbmNlLmVsZW1lbnRzLmRpYWxvZywgdHJhbnNpdGlvbi50eXBlLCBpbnN0YW5jZS5fX2ludGVybmFsLnRyYW5zaXRpb25JbkhhbmRsZXIpO1xyXG5cclxuICAgICAgICAgICAgcmVtb3ZlQ2xhc3MoaW5zdGFuY2UuZWxlbWVudHMucm9vdCwgY2xhc3Nlcy5hbmltYXRpb25Jbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUcmFuc2l0aW9uIG91dCB0cmFuc2l0aW9uZW5kIGV2ZW50IGhhbmRsZXIuIFxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtFdmVudH1cdFx0VHJhbnNpdGlvbkVuZCBldmVudCBvYmplY3QuXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9XHRcdFRoZSBkaWxvZyBpbnN0YW5jZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBoYW5kbGVUcmFuc2l0aW9uT3V0RXZlbnQoZXZlbnQsIGluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIC8vIGNsZWFyIHRoZSB0aW1lclxyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoaW5zdGFuY2UuX19pbnRlcm5hbC50aW1lck91dCk7XHJcbiAgICAgICAgICAgIC8vIHVuYmluZCB0aGUgZXZlbnRcclxuICAgICAgICAgICAgb2ZmKGluc3RhbmNlLmVsZW1lbnRzLmRpYWxvZywgdHJhbnNpdGlvbi50eXBlLCBpbnN0YW5jZS5fX2ludGVybmFsLnRyYW5zaXRpb25PdXRIYW5kbGVyKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHJlc2V0IG1vdmUgdXBkYXRlc1xyXG4gICAgICAgICAgICByZXNldE1vdmUoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAvLyByZXNldCByZXNpemUgdXBkYXRlc1xyXG4gICAgICAgICAgICByZXNldFJlc2l6ZShpbnN0YW5jZSk7XHJcblxyXG4gICAgICAgICAgICAvLyByZXN0b3JlIGlmIG1heGltaXplZFxyXG4gICAgICAgICAgICBpZiAoaW5zdGFuY2UuaXNNYXhpbWl6ZWQoKSAmJiAhaW5zdGFuY2UuZ2V0KCdzdGFydE1heGltaXplZCcpKSB7XHJcbiAgICAgICAgICAgICAgICByZXN0b3JlKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gcmV0dXJuIGZvY3VzIHRvIHRoZSBsYXN0IGFjdGl2ZSBlbGVtZW50XHJcbiAgICAgICAgICAgIGlmIChhbGVydGlmeS5kZWZhdWx0cy5tYWludGFpbkZvY3VzICYmIGluc3RhbmNlLl9faW50ZXJuYWwuYWN0aXZlRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuX19pbnRlcm5hbC5hY3RpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5fX2ludGVybmFsLmFjdGl2ZUVsZW1lbnQgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL2Rlc3RvcnkgdGhlIGluc3RhbmNlXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaW5zdGFuY2UuX19pbnRlcm5hbC5kZXN0cm95ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5fX2ludGVybmFsLmRlc3Ryb3kuYXBwbHkoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qIENvbnRyb2xzIG1vdmluZyBhIGRpYWxvZyBhcm91bmQgKi9cclxuICAgICAgICAvL2hvbGRlIHRoZSBjdXJyZW50IG1vdmluZyBpbnN0YW5jZVxyXG4gICAgICAgIHZhciBtb3ZhYmxlID0gbnVsbCxcclxuICAgICAgICAgICAgLy9ob2xkcyB0aGUgY3VycmVudCBYIG9mZnNldCB3aGVuIG1vdmUgc3RhcnRzXHJcbiAgICAgICAgICAgIG9mZnNldFggPSAwLFxyXG4gICAgICAgICAgICAvL2hvbGRzIHRoZSBjdXJyZW50IFkgb2Zmc2V0IHdoZW4gbW92ZSBzdGFydHNcclxuICAgICAgICAgICAgb2Zmc2V0WSA9IDAsXHJcbiAgICAgICAgICAgIHhQcm9wID0gJ3BhZ2VYJyxcclxuICAgICAgICAgICAgeVByb3AgPSAncGFnZVknLFxyXG4gICAgICAgICAgICBib3VuZHMgPSBudWxsLFxyXG4gICAgICAgICAgICByZWZyZXNoVG9wID0gZmFsc2UsXHJcbiAgICAgICAgICAgIG1vdmVEZWxlZ2F0ZSA9IG51bGxcclxuICAgICAgICA7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEhlbHBlcjogc2V0cyB0aGUgZWxlbWVudCB0b3AvbGVmdCBjb29yZGluYXRlc1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnRcdERPTSBldmVudCBvYmplY3QuXHJcbiAgICAgICAgICogQHBhcmFtIHtOb2RlfSBlbGVtZW50IFRoZSBlbGVtZW50IGJlaW5nIG1vdmVkLlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBtb3ZlRWxlbWVudChldmVudCwgZWxlbWVudCkge1xyXG4gICAgICAgICAgICB2YXIgbGVmdCA9IChldmVudFt4UHJvcF0gLSBvZmZzZXRYKSxcclxuICAgICAgICAgICAgICAgIHRvcCAgPSAoZXZlbnRbeVByb3BdIC0gb2Zmc2V0WSk7XHJcblxyXG4gICAgICAgICAgICBpZihyZWZyZXNoVG9wKXtcclxuICAgICAgICAgICAgICAgIHRvcCAtPSBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSBsZWZ0ICsgJ3B4JztcclxuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS50b3AgPSB0b3AgKyAncHgnO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBIZWxwZXI6IHNldHMgdGhlIGVsZW1lbnQgdG9wL2xlZnQgY29vcmRpbmF0ZXMgd2l0aGluIHNjcmVlbiBib3VuZHNcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XHRET00gZXZlbnQgb2JqZWN0LlxyXG4gICAgICAgICAqIEBwYXJhbSB7Tm9kZX0gZWxlbWVudCBUaGUgZWxlbWVudCBiZWluZyBtb3ZlZC5cclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gbW92ZUVsZW1lbnRCb3VuZGVkKGV2ZW50LCBlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBsZWZ0ID0gKGV2ZW50W3hQcm9wXSAtIG9mZnNldFgpLFxyXG4gICAgICAgICAgICAgICAgdG9wICA9IChldmVudFt5UHJvcF0gLSBvZmZzZXRZKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHJlZnJlc2hUb3Ape1xyXG4gICAgICAgICAgICAgICAgdG9wIC09IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSBNYXRoLm1pbihib3VuZHMubWF4TGVmdCwgTWF0aC5tYXgoYm91bmRzLm1pbkxlZnQsIGxlZnQpKSArICdweCc7XHJcbiAgICAgICAgICAgIGlmKHJlZnJlc2hUb3Ape1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS50b3AgPSBNYXRoLm1pbihib3VuZHMubWF4VG9wLCBNYXRoLm1heChib3VuZHMubWluVG9wLCB0b3ApKSArICdweCc7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS50b3AgPSBNYXRoLm1heChib3VuZHMubWluVG9wLCB0b3ApICsgJ3B4JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRyaWdnZXJzIHRoZSBzdGFydCBvZiBhIG1vdmUgZXZlbnQsIGF0dGFjaGVkIHRvIHRoZSBoZWFkZXIgZWxlbWVudCBtb3VzZSBkb3duIGV2ZW50LlxyXG4gICAgICAgICAqIEFkZHMgbm8tc2VsZWN0aW9uIGNsYXNzIHRvIHRoZSBib2R5LCBkaXNhYmxpbmcgc2VsZWN0aW9uIHdoaWxlIG1vdmluZy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XHRET00gZXZlbnQgb2JqZWN0LlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZSBUaGUgZGlsb2cgaW5zdGFuY2UuXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybiB7Qm9vbGVhbn0gZmFsc2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBiZWdpbk1vdmUoZXZlbnQsIGluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXNpemFibGUgPT09IG51bGwgJiYgIWluc3RhbmNlLmlzTWF4aW1pemVkKCkgJiYgaW5zdGFuY2UuZ2V0KCdtb3ZhYmxlJykpIHtcclxuICAgICAgICAgICAgICAgIHZhciBldmVudFNyYywgbGVmdD0wLCB0b3A9MDtcclxuICAgICAgICAgICAgICAgIGlmIChldmVudC50eXBlID09PSAndG91Y2hzdGFydCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50U3JjID0gZXZlbnQudGFyZ2V0VG91Y2hlc1swXTtcclxuICAgICAgICAgICAgICAgICAgICB4UHJvcCA9ICdjbGllbnRYJztcclxuICAgICAgICAgICAgICAgICAgICB5UHJvcCA9ICdjbGllbnRZJztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnQuYnV0dG9uID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRTcmMgPSBldmVudDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnRTcmMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBpbnN0YW5jZS5lbGVtZW50cy5kaWFsb2c7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkQ2xhc3MoZWxlbWVudCwgY2xhc3Nlcy5jYXB0dXJlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuc3R5bGUubGVmdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gcGFyc2VJbnQoZWxlbWVudC5zdHlsZS5sZWZ0LCAxMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5zdHlsZS50b3ApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wID0gcGFyc2VJbnQoZWxlbWVudC5zdHlsZS50b3AsIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WCA9IGV2ZW50U3JjW3hQcm9wXSAtIGxlZnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WSA9IGV2ZW50U3JjW3lQcm9wXSAtIHRvcDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaW5zdGFuY2UuaXNNb2RhbCgpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WSArPSBpbnN0YW5jZS5lbGVtZW50cy5tb2RhbC5zY3JvbGxUb3A7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoaW5zdGFuY2UuaXNQaW5uZWQoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldFkgLT0gZG9jdW1lbnQuYm9keS5zY3JvbGxUb3A7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGluc3RhbmNlLmdldCgnbW92ZUJvdW5kZWQnKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50ID0gZWxlbWVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldExlZnQgPSAtbGVmdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldFRvcCA9IC10b3A7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NhbGMgb2Zmc2V0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldExlZnQgKz0gY3VycmVudC5vZmZzZXRMZWZ0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0VG9wICs9IGN1cnJlbnQub2Zmc2V0VG9wO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IHdoaWxlIChjdXJyZW50ID0gY3VycmVudC5vZmZzZXRQYXJlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm91bmRzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4TGVmdCA6IG9mZnNldExlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5MZWZ0IDogLW9mZnNldExlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhUb3AgIDogZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCAtIGVsZW1lbnQuY2xpZW50SGVpZ2h0IC0gb2Zmc2V0VG9wLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluVG9wICA6IC1vZmZzZXRUb3BcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZURlbGVnYXRlID0gbW92ZUVsZW1lbnRCb3VuZGVkO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBib3VuZHMgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3ZlRGVsZWdhdGUgPSBtb3ZlRWxlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYWxsb3cgY3VzdG9tIGBvbm1vdmVgIG1ldGhvZFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoRXZlbnQoJ29ubW92ZScsIGluc3RhbmNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmVmcmVzaFRvcCA9ICFpbnN0YW5jZS5pc01vZGFsKCkgJiYgaW5zdGFuY2UuaXNQaW5uZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICBtb3ZhYmxlID0gaW5zdGFuY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZURlbGVnYXRlKGV2ZW50U3JjLCBlbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICBhZGRDbGFzcyhkb2N1bWVudC5ib2R5LCBjbGFzc2VzLm5vU2VsZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRoZSBhY3R1YWwgbW92ZSBoYW5kbGVyLCAgYXR0YWNoZWQgdG8gZG9jdW1lbnQuYm9keSBtb3VzZW1vdmUgZXZlbnQuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudFx0RE9NIGV2ZW50IG9iamVjdC5cclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gbW92ZShldmVudCkge1xyXG4gICAgICAgICAgICBpZiAobW92YWJsZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGV2ZW50U3JjO1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09ICd0b3VjaG1vdmUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICBldmVudFNyYyA9IGV2ZW50LnRhcmdldFRvdWNoZXNbMF07XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmJ1dHRvbiA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50U3JjID0gZXZlbnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnRTcmMpIHtcclxuICAgICAgICAgICAgICAgICAgICBtb3ZlRGVsZWdhdGUoZXZlbnRTcmMsIG1vdmFibGUuZWxlbWVudHMuZGlhbG9nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVHJpZ2dlcnMgdGhlIGVuZCBvZiBhIG1vdmUgZXZlbnQsICBhdHRhY2hlZCB0byBkb2N1bWVudC5ib2R5IG1vdXNldXAgZXZlbnQuXHJcbiAgICAgICAgICogUmVtb3ZlcyBuby1zZWxlY3Rpb24gY2xhc3MgZnJvbSBkb2N1bWVudC5ib2R5LCBhbGxvd2luZyBzZWxlY3Rpb24uXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gZW5kTW92ZSgpIHtcclxuICAgICAgICAgICAgaWYgKG1vdmFibGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IG1vdmFibGU7XHJcbiAgICAgICAgICAgICAgICBtb3ZhYmxlID0gYm91bmRzID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKGRvY3VtZW50LmJvZHksIGNsYXNzZXMubm9TZWxlY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3MoaW5zdGFuY2UuZWxlbWVudHMuZGlhbG9nLCBjbGFzc2VzLmNhcHR1cmUpO1xyXG4gICAgICAgICAgICAgICAgLy8gYWxsb3cgY3VzdG9tIGBvbm1vdmVkYCBtZXRob2RcclxuICAgICAgICAgICAgICAgIGRpc3BhdGNoRXZlbnQoJ29ubW92ZWQnLCBpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlc2V0cyBhbnkgY2hhbmdlcyBtYWRlIGJ5IG1vdmluZyB0aGUgZWxlbWVudCB0byBpdHMgb3JpZ2luYWwgc3RhdGUsXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2UgVGhlIGRpbG9nIGluc3RhbmNlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIHJlc2V0TW92ZShpbnN0YW5jZSkge1xyXG4gICAgICAgICAgICBtb3ZhYmxlID0gbnVsbDtcclxuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBpbnN0YW5jZS5lbGVtZW50cy5kaWFsb2c7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IGVsZW1lbnQuc3R5bGUudG9wID0gJyc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVcGRhdGVzIHRoZSBkaWFsb2cgbW92ZSBiZWhhdmlvci5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZSBUaGUgZGlsb2cgaW5zdGFuY2UuXHJcbiAgICAgICAgICogQHBhcmFtIHtCb29sZWFufSBvbiBUcnVlIHRvIGFkZCB0aGUgYmVoYXZpb3IsIHJlbW92ZXMgaXQgb3RoZXJ3aXNlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZU1vdmFibGUoaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgaWYgKGluc3RhbmNlLmdldCgnbW92YWJsZScpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBhZGQgY2xhc3NcclxuICAgICAgICAgICAgICAgIGFkZENsYXNzKGluc3RhbmNlLmVsZW1lbnRzLnJvb3QsIGNsYXNzZXMubW92YWJsZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2UuaXNPcGVuKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBiaW5kTW92YWJsZUV2ZW50cyhpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9yZXNldFxyXG4gICAgICAgICAgICAgICAgcmVzZXRNb3ZlKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBjbGFzc1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3MoaW5zdGFuY2UuZWxlbWVudHMucm9vdCwgY2xhc3Nlcy5tb3ZhYmxlKTtcclxuICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZS5pc09wZW4oKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVuYmluZE1vdmFibGVFdmVudHMoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiBDb250cm9scyBtb3ZpbmcgYSBkaWFsb2cgYXJvdW5kICovXHJcbiAgICAgICAgLy9ob2xkZSB0aGUgY3VycmVudCBpbnN0YW5jZSBiZWluZyByZXNpemVkXHRcdFxyXG4gICAgICAgIHZhciByZXNpemFibGUgPSBudWxsLFxyXG4gICAgICAgICAgICAvL2hvbGRzIHRoZSBzdGFyaW5nIGxlZnQgb2Zmc2V0IHdoZW4gcmVzaXplIHN0YXJ0cy5cclxuICAgICAgICAgICAgc3RhcnRpbmdMZWZ0ID0gTnVtYmVyLk5hbixcclxuICAgICAgICAgICAgLy9ob2xkcyB0aGUgc3RhcmluZyB3aWR0aCB3aGVuIHJlc2l6ZSBzdGFydHMuXHJcbiAgICAgICAgICAgIHN0YXJ0aW5nV2lkdGggPSAwLFxyXG4gICAgICAgICAgICAvL2hvbGRzIHRoZSBpbml0aWFsIHdpZHRoIHdoZW4gcmVzaXplZCBmb3IgdGhlIGZpcnN0IHRpbWUuXHJcbiAgICAgICAgICAgIG1pbldpZHRoID0gMCxcclxuICAgICAgICAgICAgLy9ob2xkcyB0aGUgb2Zmc2V0IG9mIHRoZSByZXNpemUgaGFuZGxlLlxyXG4gICAgICAgICAgICBoYW5kbGVPZmZzZXQgPSAwXHJcbiAgICAgICAgO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBIZWxwZXI6IHNldHMgdGhlIGVsZW1lbnQgd2lkdGgvaGVpZ2h0IGFuZCB1cGRhdGVzIGxlZnQgY29vcmRpbmF0ZSBpZiBuZWNjZXNzYXJ5LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnRcdERPTSBtb3VzZW1vdmUgZXZlbnQgb2JqZWN0LlxyXG4gICAgICAgICAqIEBwYXJhbSB7Tm9kZX0gZWxlbWVudCBUaGUgZWxlbWVudCBiZWluZyBtb3ZlZC5cclxuICAgICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHBpbm5lZCBBIGZsYWcgaW5kaWNhdGluZyBpZiB0aGUgZWxlbWVudCBiZWluZyByZXNpemVkIGlzIHBpbm5lZCB0byB0aGUgc2NyZWVuLlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiByZXNpemVFbGVtZW50KGV2ZW50LCBlbGVtZW50LCBwYWdlUmVsYXRpdmUpIHtcclxuXHJcbiAgICAgICAgICAgIC8vY2FsY3VsYXRlIG9mZnNldHMgZnJvbSAwLDBcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnQgPSBlbGVtZW50O1xyXG4gICAgICAgICAgICB2YXIgb2Zmc2V0TGVmdCA9IDA7XHJcbiAgICAgICAgICAgIHZhciBvZmZzZXRUb3AgPSAwO1xyXG4gICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICBvZmZzZXRMZWZ0ICs9IGN1cnJlbnQub2Zmc2V0TGVmdDtcclxuICAgICAgICAgICAgICAgIG9mZnNldFRvcCArPSBjdXJyZW50Lm9mZnNldFRvcDtcclxuICAgICAgICAgICAgfSB3aGlsZSAoY3VycmVudCA9IGN1cnJlbnQub2Zmc2V0UGFyZW50KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGRldGVybWluZSBYLFkgY29vcmRpbmF0ZXMuXHJcbiAgICAgICAgICAgIHZhciBYLCBZO1xyXG4gICAgICAgICAgICBpZiAocGFnZVJlbGF0aXZlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBYID0gZXZlbnQucGFnZVg7XHJcbiAgICAgICAgICAgICAgICBZID0gZXZlbnQucGFnZVk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBYID0gZXZlbnQuY2xpZW50WDtcclxuICAgICAgICAgICAgICAgIFkgPSBldmVudC5jbGllbnRZO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHJ0bCBoYW5kbGluZ1xyXG4gICAgICAgICAgICB2YXIgaXNSVEwgPSBpc1JpZ2h0VG9MZWZ0KCk7XHJcbiAgICAgICAgICAgIGlmIChpc1JUTCkge1xyXG4gICAgICAgICAgICAgICAgLy8gcmV2ZXJzZSBYIFxyXG4gICAgICAgICAgICAgICAgWCA9IGRvY3VtZW50LmJvZHkub2Zmc2V0V2lkdGggLSBYO1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgaGFzIGEgc3RhcnRpbmcgbGVmdCwgY2FsY3VsYXRlIG9mZnNldFJpZ2h0XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKHN0YXJ0aW5nTGVmdCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBvZmZzZXRMZWZ0ID0gZG9jdW1lbnQuYm9keS5vZmZzZXRXaWR0aCAtIG9mZnNldExlZnQgLSBlbGVtZW50Lm9mZnNldFdpZHRoO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBzZXQgd2lkdGgvaGVpZ2h0XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gKFkgLSBvZmZzZXRUb3AgKyBoYW5kbGVPZmZzZXQpICsgJ3B4JztcclxuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS53aWR0aCA9IChYIC0gb2Zmc2V0TGVmdCArIGhhbmRsZU9mZnNldCkgKyAncHgnO1xyXG5cclxuICAgICAgICAgICAgLy8gaWYgdGhlIGVsZW1lbnQgYmVpbmcgcmVzaXplZCBoYXMgYSBzdGFydGluZyBsZWZ0LCBtYWludGFpbiBpdC5cclxuICAgICAgICAgICAgLy8gdGhlIGRpYWxvZyBpcyBjZW50ZXJlZCwgZGl2aWRlIGJ5IGhhbGYgdGhlIG9mZnNldCB0byBtYWludGFpbiB0aGUgbWFyZ2lucy5cclxuICAgICAgICAgICAgaWYgKCFpc05hTihzdGFydGluZ0xlZnQpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGlmZiA9IE1hdGguYWJzKGVsZW1lbnQub2Zmc2V0V2lkdGggLSBzdGFydGluZ1dpZHRoKSAqIDAuNTtcclxuICAgICAgICAgICAgICAgIGlmIChpc1JUTCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vbmVnYXRlIHRoZSBkaWZmLCB3aHk/XHJcbiAgICAgICAgICAgICAgICAgICAgLy93aGVuIGdyb3dpbmcgaXQgc2hvdWxkIGRlY3JlYXNlIGxlZnRcclxuICAgICAgICAgICAgICAgICAgICAvL3doZW4gc2hyaW5raW5nIGl0IHNob3VsZCBpbmNyZWFzZSBsZWZ0XHJcbiAgICAgICAgICAgICAgICAgICAgZGlmZiAqPSAtMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50Lm9mZnNldFdpZHRoID4gc3RhcnRpbmdXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vZ3Jvd2luZ1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IChzdGFydGluZ0xlZnQgKyBkaWZmKSArICdweCc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnQub2Zmc2V0V2lkdGggPj0gbWluV2lkdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL3Nocmlua2luZ1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IChzdGFydGluZ0xlZnQgLSBkaWZmKSArICdweCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRyaWdnZXJzIHRoZSBzdGFydCBvZiBhIHJlc2l6ZSBldmVudCwgYXR0YWNoZWQgdG8gdGhlIHJlc2l6ZSBoYW5kbGUgZWxlbWVudCBtb3VzZSBkb3duIGV2ZW50LlxyXG4gICAgICAgICAqIEFkZHMgbm8tc2VsZWN0aW9uIGNsYXNzIHRvIHRoZSBib2R5LCBkaXNhYmxpbmcgc2VsZWN0aW9uIHdoaWxlIG1vdmluZy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XHRET00gZXZlbnQgb2JqZWN0LlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZSBUaGUgZGlsb2cgaW5zdGFuY2UuXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybiB7Qm9vbGVhbn0gZmFsc2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBiZWdpblJlc2l6ZShldmVudCwgaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgaWYgKCFpbnN0YW5jZS5pc01heGltaXplZCgpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZXZlbnRTcmM7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ3RvdWNoc3RhcnQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICBldmVudFNyYyA9IGV2ZW50LnRhcmdldFRvdWNoZXNbMF07XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmJ1dHRvbiA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50U3JjID0gZXZlbnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnRTcmMpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBhbGxvdyBjdXN0b20gYG9ucmVzaXplYCBtZXRob2RcclxuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaEV2ZW50KCdvbnJlc2l6ZScsIGluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICByZXNpemFibGUgPSBpbnN0YW5jZTtcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVPZmZzZXQgPSBpbnN0YW5jZS5lbGVtZW50cy5yZXNpemVIYW5kbGUub2Zmc2V0SGVpZ2h0IC8gMjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IGluc3RhbmNlLmVsZW1lbnRzLmRpYWxvZztcclxuICAgICAgICAgICAgICAgICAgICBhZGRDbGFzcyhlbGVtZW50LCBjbGFzc2VzLmNhcHR1cmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0aW5nTGVmdCA9IHBhcnNlSW50KGVsZW1lbnQuc3R5bGUubGVmdCwgMTApO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gZWxlbWVudC5vZmZzZXRIZWlnaHQgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUubWluSGVpZ2h0ID0gaW5zdGFuY2UuZWxlbWVudHMuaGVhZGVyLm9mZnNldEhlaWdodCArIGluc3RhbmNlLmVsZW1lbnRzLmZvb3Rlci5vZmZzZXRIZWlnaHQgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUud2lkdGggPSAoc3RhcnRpbmdXaWR0aCA9IGVsZW1lbnQub2Zmc2V0V2lkdGgpICsgJ3B4JztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuc3R5bGUubWF4V2lkdGggIT09ICdub25lJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLm1pbldpZHRoID0gKG1pbldpZHRoID0gZWxlbWVudC5vZmZzZXRXaWR0aCkgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLm1heFdpZHRoID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZENsYXNzKGRvY3VtZW50LmJvZHksIGNsYXNzZXMubm9TZWxlY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhlIGFjdHVhbCByZXNpemUgaGFuZGxlciwgIGF0dGFjaGVkIHRvIGRvY3VtZW50LmJvZHkgbW91c2Vtb3ZlIGV2ZW50LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnRcdERPTSBldmVudCBvYmplY3QuXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIHJlc2l6ZShldmVudCkge1xyXG4gICAgICAgICAgICBpZiAocmVzaXphYmxlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZXZlbnRTcmM7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ3RvdWNobW92ZScpIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50U3JjID0gZXZlbnQudGFyZ2V0VG91Y2hlc1swXTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnQuYnV0dG9uID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRTcmMgPSBldmVudDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChldmVudFNyYykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc2l6ZUVsZW1lbnQoZXZlbnRTcmMsIHJlc2l6YWJsZS5lbGVtZW50cy5kaWFsb2csICFyZXNpemFibGUuZ2V0KCdtb2RhbCcpICYmICFyZXNpemFibGUuZ2V0KCdwaW5uZWQnKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRyaWdnZXJzIHRoZSBlbmQgb2YgYSByZXNpemUgZXZlbnQsICBhdHRhY2hlZCB0byBkb2N1bWVudC5ib2R5IG1vdXNldXAgZXZlbnQuXHJcbiAgICAgICAgICogUmVtb3ZlcyBuby1zZWxlY3Rpb24gY2xhc3MgZnJvbSBkb2N1bWVudC5ib2R5LCBhbGxvd2luZyBzZWxlY3Rpb24uXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gZW5kUmVzaXplKCkge1xyXG4gICAgICAgICAgICBpZiAocmVzaXphYmxlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5zdGFuY2UgPSByZXNpemFibGU7XHJcbiAgICAgICAgICAgICAgICByZXNpemFibGUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3MoZG9jdW1lbnQuYm9keSwgY2xhc3Nlcy5ub1NlbGVjdGlvbik7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyhpbnN0YW5jZS5lbGVtZW50cy5kaWFsb2csIGNsYXNzZXMuY2FwdHVyZSk7XHJcbiAgICAgICAgICAgICAgICBjYW5jZWxDbGljayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAvLyBhbGxvdyBjdXN0b20gYG9ucmVzaXplZGAgbWV0aG9kXHJcbiAgICAgICAgICAgICAgICBkaXNwYXRjaEV2ZW50KCdvbnJlc2l6ZWQnLCBpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlc2V0cyBhbnkgY2hhbmdlcyBtYWRlIGJ5IHJlc2l6aW5nIHRoZSBlbGVtZW50IHRvIGl0cyBvcmlnaW5hbCBzdGF0ZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZSBUaGUgZGlsb2cgaW5zdGFuY2UuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gcmVzZXRSZXNpemUoaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgcmVzaXphYmxlID0gbnVsbDtcclxuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBpbnN0YW5jZS5lbGVtZW50cy5kaWFsb2c7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50LnN0eWxlLm1heFdpZHRoID09PSAnbm9uZScpIHtcclxuICAgICAgICAgICAgICAgIC8vY2xlYXIgaW5saW5lIHN0eWxlcy5cclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUubWF4V2lkdGggPSBlbGVtZW50LnN0eWxlLm1pbldpZHRoID0gZWxlbWVudC5zdHlsZS53aWR0aCA9IGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gZWxlbWVudC5zdHlsZS5taW5IZWlnaHQgPSBlbGVtZW50LnN0eWxlLmxlZnQgPSAnJztcclxuICAgICAgICAgICAgICAgIC8vcmVzZXQgdmFyaWFibGVzLlxyXG4gICAgICAgICAgICAgICAgc3RhcnRpbmdMZWZ0ID0gTnVtYmVyLk5hbjtcclxuICAgICAgICAgICAgICAgIHN0YXJ0aW5nV2lkdGggPSBtaW5XaWR0aCA9IGhhbmRsZU9mZnNldCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVcGRhdGVzIHRoZSBkaWFsb2cgbW92ZSBiZWhhdmlvci5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZSBUaGUgZGlsb2cgaW5zdGFuY2UuXHJcbiAgICAgICAgICogQHBhcmFtIHtCb29sZWFufSBvbiBUcnVlIHRvIGFkZCB0aGUgYmVoYXZpb3IsIHJlbW92ZXMgaXQgb3RoZXJ3aXNlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZVJlc2l6YWJsZShpbnN0YW5jZSkge1xyXG4gICAgICAgICAgICBpZiAoaW5zdGFuY2UuZ2V0KCdyZXNpemFibGUnKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gYWRkIGNsYXNzXHJcbiAgICAgICAgICAgICAgICBhZGRDbGFzcyhpbnN0YW5jZS5lbGVtZW50cy5yb290LCBjbGFzc2VzLnJlc2l6YWJsZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2UuaXNPcGVuKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBiaW5kUmVzaXphYmxlRXZlbnRzKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vcmVzZXRcclxuICAgICAgICAgICAgICAgIHJlc2V0UmVzaXplKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBjbGFzc1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3MoaW5zdGFuY2UuZWxlbWVudHMucm9vdCwgY2xhc3Nlcy5yZXNpemFibGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlLmlzT3BlbigpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdW5iaW5kUmVzaXphYmxlRXZlbnRzKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVzZXQgbW92ZS9yZXNpemUgb24gd2luZG93IHJlc2l6ZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XHR3aW5kb3cgcmVzaXplIGV2ZW50IG9iamVjdC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiB3aW5kb3dSZXNpemUoLypldmVudCovKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgb3BlbkRpYWxvZ3MubGVuZ3RoOyB4ICs9IDEpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IG9wZW5EaWFsb2dzW3hdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlLmdldCgnYXV0b1Jlc2V0JykpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNldE1vdmUoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc2V0UmVzaXplKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBCaW5kIGRpYWxvZ3MgZXZlbnRzXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2UgVGhlIGRpbG9nIGluc3RhbmNlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGJpbmRFdmVudHMoaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgLy8gaWYgZmlyc3QgZGlhbG9nLCBob29rIGdsb2JhbCBoYW5kbGVyc1xyXG4gICAgICAgICAgICBpZiAob3BlbkRpYWxvZ3MubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAvL2dsb2JhbFxyXG4gICAgICAgICAgICAgICAgb24od2luZG93LCAncmVzaXplJywgd2luZG93UmVzaXplKTtcclxuICAgICAgICAgICAgICAgIG9uKGRvY3VtZW50LmJvZHksICdrZXl1cCcsIGtleXVwSGFuZGxlcik7XHJcbiAgICAgICAgICAgICAgICBvbihkb2N1bWVudC5ib2R5LCAna2V5ZG93bicsIGtleWRvd25IYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgIG9uKGRvY3VtZW50LmJvZHksICdmb2N1cycsIG9uUmVzZXQpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vbW92ZVxyXG4gICAgICAgICAgICAgICAgb24oZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCAnbW91c2Vtb3ZlJywgbW92ZSk7XHJcbiAgICAgICAgICAgICAgICBvbihkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsICd0b3VjaG1vdmUnLCBtb3ZlKTtcclxuICAgICAgICAgICAgICAgIG9uKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgJ21vdXNldXAnLCBlbmRNb3ZlKTtcclxuICAgICAgICAgICAgICAgIG9uKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgJ3RvdWNoZW5kJywgZW5kTW92ZSk7XHJcbiAgICAgICAgICAgICAgICAvL3Jlc2l6ZVxyXG4gICAgICAgICAgICAgICAgb24oZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCAnbW91c2Vtb3ZlJywgcmVzaXplKTtcclxuICAgICAgICAgICAgICAgIG9uKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgJ3RvdWNobW92ZScsIHJlc2l6ZSk7XHJcbiAgICAgICAgICAgICAgICBvbihkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsICdtb3VzZXVwJywgZW5kUmVzaXplKTtcclxuICAgICAgICAgICAgICAgIG9uKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgJ3RvdWNoZW5kJywgZW5kUmVzaXplKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gY29tbW9uIGV2ZW50c1xyXG4gICAgICAgICAgICBvbihpbnN0YW5jZS5lbGVtZW50cy5jb21tYW5kcy5jb250YWluZXIsICdjbGljaycsIGluc3RhbmNlLl9faW50ZXJuYWwuY29tbWFuZHNDbGlja0hhbmRsZXIpO1xyXG4gICAgICAgICAgICBvbihpbnN0YW5jZS5lbGVtZW50cy5mb290ZXIsICdjbGljaycsIGluc3RhbmNlLl9faW50ZXJuYWwuYnV0dG9uc0NsaWNrSGFuZGxlcik7XHJcbiAgICAgICAgICAgIG9uKGluc3RhbmNlLmVsZW1lbnRzLnJlc2V0WzBdLCAnZm9jdXMnLCBpbnN0YW5jZS5fX2ludGVybmFsLnJlc2V0SGFuZGxlcik7XHJcbiAgICAgICAgICAgIG9uKGluc3RhbmNlLmVsZW1lbnRzLnJlc2V0WzFdLCAnZm9jdXMnLCBpbnN0YW5jZS5fX2ludGVybmFsLnJlc2V0SGFuZGxlcik7XHJcblxyXG4gICAgICAgICAgICAvL3ByZXZlbnQgaGFuZGxpbmcga2V5IHVwIHdoZW4gZGlhbG9nIGlzIGJlaW5nIG9wZW5lZCBieSBhIGtleSBzdHJva2UuXHJcbiAgICAgICAgICAgIGNhbmNlbEtleXVwID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gaG9vayBpbiB0cmFuc2l0aW9uIGhhbmRsZXJcclxuICAgICAgICAgICAgb24oaW5zdGFuY2UuZWxlbWVudHMuZGlhbG9nLCB0cmFuc2l0aW9uLnR5cGUsIGluc3RhbmNlLl9faW50ZXJuYWwudHJhbnNpdGlvbkluSGFuZGxlcik7XHJcblxyXG4gICAgICAgICAgICAvLyBtb2RlbHNzIG9ubHkgZXZlbnRzXHJcbiAgICAgICAgICAgIGlmICghaW5zdGFuY2UuZ2V0KCdtb2RhbCcpKSB7XHJcbiAgICAgICAgICAgICAgICBiaW5kTW9kZWxlc3NFdmVudHMoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyByZXNpemFibGVcclxuICAgICAgICAgICAgaWYgKGluc3RhbmNlLmdldCgncmVzaXphYmxlJykpIHtcclxuICAgICAgICAgICAgICAgIGJpbmRSZXNpemFibGVFdmVudHMoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBtb3ZhYmxlXHJcbiAgICAgICAgICAgIGlmIChpbnN0YW5jZS5nZXQoJ21vdmFibGUnKSkge1xyXG4gICAgICAgICAgICAgICAgYmluZE1vdmFibGVFdmVudHMoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVbmJpbmQgZGlhbG9ncyBldmVudHNcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZSBUaGUgZGlsb2cgaW5zdGFuY2UuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gdW5iaW5kRXZlbnRzKGluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIC8vIGlmIGxhc3QgZGlhbG9nLCByZW1vdmUgZ2xvYmFsIGhhbmRsZXJzXHJcbiAgICAgICAgICAgIGlmIChvcGVuRGlhbG9ncy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIC8vZ2xvYmFsXHJcbiAgICAgICAgICAgICAgICBvZmYod2luZG93LCAncmVzaXplJywgd2luZG93UmVzaXplKTtcclxuICAgICAgICAgICAgICAgIG9mZihkb2N1bWVudC5ib2R5LCAna2V5dXAnLCBrZXl1cEhhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgb2ZmKGRvY3VtZW50LmJvZHksICdrZXlkb3duJywga2V5ZG93bkhhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgb2ZmKGRvY3VtZW50LmJvZHksICdmb2N1cycsIG9uUmVzZXQpO1xyXG4gICAgICAgICAgICAgICAgLy9tb3ZlXHJcbiAgICAgICAgICAgICAgICBvZmYoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCAnbW91c2Vtb3ZlJywgbW92ZSk7XHJcbiAgICAgICAgICAgICAgICBvZmYoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCAnbW91c2V1cCcsIGVuZE1vdmUpO1xyXG4gICAgICAgICAgICAgICAgLy9yZXNpemVcclxuICAgICAgICAgICAgICAgIG9mZihkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsICdtb3VzZW1vdmUnLCByZXNpemUpO1xyXG4gICAgICAgICAgICAgICAgb2ZmKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgJ21vdXNldXAnLCBlbmRSZXNpemUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBjb21tb24gZXZlbnRzXHJcbiAgICAgICAgICAgIG9mZihpbnN0YW5jZS5lbGVtZW50cy5jb21tYW5kcy5jb250YWluZXIsICdjbGljaycsIGluc3RhbmNlLl9faW50ZXJuYWwuY29tbWFuZHNDbGlja0hhbmRsZXIpO1xyXG4gICAgICAgICAgICBvZmYoaW5zdGFuY2UuZWxlbWVudHMuZm9vdGVyLCAnY2xpY2snLCBpbnN0YW5jZS5fX2ludGVybmFsLmJ1dHRvbnNDbGlja0hhbmRsZXIpO1xyXG4gICAgICAgICAgICBvZmYoaW5zdGFuY2UuZWxlbWVudHMucmVzZXRbMF0sICdmb2N1cycsIGluc3RhbmNlLl9faW50ZXJuYWwucmVzZXRIYW5kbGVyKTtcclxuICAgICAgICAgICAgb2ZmKGluc3RhbmNlLmVsZW1lbnRzLnJlc2V0WzFdLCAnZm9jdXMnLCBpbnN0YW5jZS5fX2ludGVybmFsLnJlc2V0SGFuZGxlcik7XHJcblxyXG4gICAgICAgICAgICAvLyBob29rIG91dCB0cmFuc2l0aW9uIGhhbmRsZXJcclxuICAgICAgICAgICAgb24oaW5zdGFuY2UuZWxlbWVudHMuZGlhbG9nLCB0cmFuc2l0aW9uLnR5cGUsIGluc3RhbmNlLl9faW50ZXJuYWwudHJhbnNpdGlvbk91dEhhbmRsZXIpO1xyXG5cclxuICAgICAgICAgICAgLy8gbW9kZWxzcyBvbmx5IGV2ZW50c1xyXG4gICAgICAgICAgICBpZiAoIWluc3RhbmNlLmdldCgnbW9kYWwnKSkge1xyXG4gICAgICAgICAgICAgICAgdW5iaW5kTW9kZWxlc3NFdmVudHMoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBtb3ZhYmxlXHJcbiAgICAgICAgICAgIGlmIChpbnN0YW5jZS5nZXQoJ21vdmFibGUnKSkge1xyXG4gICAgICAgICAgICAgICAgdW5iaW5kTW92YWJsZUV2ZW50cyhpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHJlc2l6YWJsZVxyXG4gICAgICAgICAgICBpZiAoaW5zdGFuY2UuZ2V0KCdyZXNpemFibGUnKSkge1xyXG4gICAgICAgICAgICAgICAgdW5iaW5kUmVzaXphYmxlRXZlbnRzKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEJpbmQgbW9kZWxlc3Mgc3BlY2lmaWMgZXZlbnRzXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2UgVGhlIGRpbG9nIGluc3RhbmNlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGJpbmRNb2RlbGVzc0V2ZW50cyhpbnN0YW5jZSkge1xyXG4gICAgICAgICAgICBvbihpbnN0YW5jZS5lbGVtZW50cy5kaWFsb2csICdmb2N1cycsIGluc3RhbmNlLl9faW50ZXJuYWwuYnJpbmdUb0Zyb250SGFuZGxlciwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVbmJpbmQgbW9kZWxlc3Mgc3BlY2lmaWMgZXZlbnRzXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2UgVGhlIGRpbG9nIGluc3RhbmNlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIHVuYmluZE1vZGVsZXNzRXZlbnRzKGluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIG9mZihpbnN0YW5jZS5lbGVtZW50cy5kaWFsb2csICdmb2N1cycsIGluc3RhbmNlLl9faW50ZXJuYWwuYnJpbmdUb0Zyb250SGFuZGxlciwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEJpbmQgbW92YWJsZSBzcGVjaWZpYyBldmVudHNcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZSBUaGUgZGlsb2cgaW5zdGFuY2UuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gYmluZE1vdmFibGVFdmVudHMoaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgb24oaW5zdGFuY2UuZWxlbWVudHMuaGVhZGVyLCAnbW91c2Vkb3duJywgaW5zdGFuY2UuX19pbnRlcm5hbC5iZWdpbk1vdmVIYW5kbGVyKTtcclxuICAgICAgICAgICAgb24oaW5zdGFuY2UuZWxlbWVudHMuaGVhZGVyLCAndG91Y2hzdGFydCcsIGluc3RhbmNlLl9faW50ZXJuYWwuYmVnaW5Nb3ZlSGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVbmJpbmQgbW92YWJsZSBzcGVjaWZpYyBldmVudHNcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZSBUaGUgZGlsb2cgaW5zdGFuY2UuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gdW5iaW5kTW92YWJsZUV2ZW50cyhpbnN0YW5jZSkge1xyXG4gICAgICAgICAgICBvZmYoaW5zdGFuY2UuZWxlbWVudHMuaGVhZGVyLCAnbW91c2Vkb3duJywgaW5zdGFuY2UuX19pbnRlcm5hbC5iZWdpbk1vdmVIYW5kbGVyKTtcclxuICAgICAgICAgICAgb2ZmKGluc3RhbmNlLmVsZW1lbnRzLmhlYWRlciwgJ3RvdWNoc3RhcnQnLCBpbnN0YW5jZS5fX2ludGVybmFsLmJlZ2luTW92ZUhhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBCaW5kIHJlc2l6YWJsZSBzcGVjaWZpYyBldmVudHNcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZSBUaGUgZGlsb2cgaW5zdGFuY2UuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gYmluZFJlc2l6YWJsZUV2ZW50cyhpbnN0YW5jZSkge1xyXG4gICAgICAgICAgICBvbihpbnN0YW5jZS5lbGVtZW50cy5yZXNpemVIYW5kbGUsICdtb3VzZWRvd24nLCBpbnN0YW5jZS5fX2ludGVybmFsLmJlZ2luUmVzaXplSGFuZGxlcik7XHJcbiAgICAgICAgICAgIG9uKGluc3RhbmNlLmVsZW1lbnRzLnJlc2l6ZUhhbmRsZSwgJ3RvdWNoc3RhcnQnLCBpbnN0YW5jZS5fX2ludGVybmFsLmJlZ2luUmVzaXplSGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVbmJpbmQgcmVzaXphYmxlIHNwZWNpZmljIGV2ZW50c1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlIFRoZSBkaWxvZyBpbnN0YW5jZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiB1bmJpbmRSZXNpemFibGVFdmVudHMoaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgb2ZmKGluc3RhbmNlLmVsZW1lbnRzLnJlc2l6ZUhhbmRsZSwgJ21vdXNlZG93bicsIGluc3RhbmNlLl9faW50ZXJuYWwuYmVnaW5SZXNpemVIYW5kbGVyKTtcclxuICAgICAgICAgICAgb2ZmKGluc3RhbmNlLmVsZW1lbnRzLnJlc2l6ZUhhbmRsZSwgJ3RvdWNoc3RhcnQnLCBpbnN0YW5jZS5fX2ludGVybmFsLmJlZ2luUmVzaXplSGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBCaW5kIGNsb3NhYmxlIGV2ZW50c1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlIFRoZSBkaWxvZyBpbnN0YW5jZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBiaW5kQ2xvc2FibGVFdmVudHMoaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgb24oaW5zdGFuY2UuZWxlbWVudHMubW9kYWwsICdjbGljaycsIGluc3RhbmNlLl9faW50ZXJuYWwubW9kYWxDbGlja0hhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVW5iaW5kIGNsb3NhYmxlIHNwZWNpZmljIGV2ZW50c1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlIFRoZSBkaWxvZyBpbnN0YW5jZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiB1bmJpbmRDbG9zYWJsZUV2ZW50cyhpbnN0YW5jZSkge1xyXG4gICAgICAgICAgICBvZmYoaW5zdGFuY2UuZWxlbWVudHMubW9kYWwsICdjbGljaycsIGluc3RhbmNlLl9faW50ZXJuYWwubW9kYWxDbGlja0hhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBkaWFsb2cgQVBJXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgX19pbml0OmluaXRpYWxpemUsXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBDaGVjayBpZiBkaWFsb2cgaXMgY3VycmVudGx5IG9wZW5cclxuICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICogQHJldHVybiB7Qm9vbGVhbn1cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGlzT3BlbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19pbnRlcm5hbC5pc09wZW47XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGlzTW9kYWw6IGZ1bmN0aW9uICgpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudHMucm9vdC5jbGFzc05hbWUuaW5kZXhPZihjbGFzc2VzLm1vZGVsZXNzKSA8IDA7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGlzTWF4aW1pemVkOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50cy5yb290LmNsYXNzTmFtZS5pbmRleE9mKGNsYXNzZXMubWF4aW1pemVkKSA+IC0xO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpc1Bpbm5lZDpmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudHMucm9vdC5jbGFzc05hbWUuaW5kZXhPZihjbGFzc2VzLnVucGlubmVkKSA8IDA7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG1heGltaXplOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBpZighdGhpcy5pc01heGltaXplZCgpKXtcclxuICAgICAgICAgICAgICAgICAgICBtYXhpbWl6ZSh0aGlzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZXN0b3JlOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmlzTWF4aW1pemVkKCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3RvcmUodGhpcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcGluOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBpZighdGhpcy5pc1Bpbm5lZCgpKXtcclxuICAgICAgICAgICAgICAgICAgICBwaW4odGhpcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdW5waW46ZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNQaW5uZWQoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdW5waW4odGhpcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYnJpbmdUb0Zyb250OmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBicmluZ1RvRnJvbnQobnVsbCwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIE1vdmUgdGhlIGRpYWxvZyB0byBhIHNwZWNpZmljIHgveSBjb29yZGluYXRlc1xyXG4gICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0geCAgICBUaGUgbmV3IGRpYWxvZyB4IGNvb3JkaW5hdGUgaW4gcGl4ZWxzLlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0geSAgICBUaGUgbmV3IGRpYWxvZyB5IGNvb3JkaW5hdGUgaW4gcGl4ZWxzLlxyXG4gICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBkaWFsb2cgaW5zdGFuY2UuXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBtb3ZlVG86ZnVuY3Rpb24oeCx5KXtcclxuICAgICAgICAgICAgICAgIGlmKCFpc05hTih4KSAmJiAhaXNOYU4oeSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFsbG93IGN1c3RvbSBgb25tb3ZlYCBtZXRob2RcclxuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaEV2ZW50KCdvbm1vdmUnLCB0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXMuZWxlbWVudHMuZGlhbG9nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50ID0gZWxlbWVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0TGVmdCA9IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldFRvcCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zdWJ0cmFjdCBleGlzdGluZyBsZWZ0LHRvcFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LnN0eWxlLmxlZnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0TGVmdCAtPSBwYXJzZUludChlbGVtZW50LnN0eWxlLmxlZnQsIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuc3R5bGUudG9wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldFRvcCAtPSBwYXJzZUludChlbGVtZW50LnN0eWxlLnRvcCwgMTApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL2NhbGMgb2Zmc2V0XHJcbiAgICAgICAgICAgICAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXRMZWZ0ICs9IGN1cnJlbnQub2Zmc2V0TGVmdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0VG9wICs9IGN1cnJlbnQub2Zmc2V0VG9wO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gd2hpbGUgKGN1cnJlbnQgPSBjdXJyZW50Lm9mZnNldFBhcmVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vY2FsYyBsZWZ0LCB0b3BcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbGVmdCA9ICh4IC0gb2Zmc2V0TGVmdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvcCAgPSAoeSAtIG9mZnNldFRvcCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vLy8gcnRsIGhhbmRsaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzUmlnaHRUb0xlZnQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0ICo9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gbGVmdCArICdweCc7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS50b3AgPSB0b3AgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFsbG93IGN1c3RvbSBgb25tb3ZlZGAgbWV0aG9kXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2hFdmVudCgnb25tb3ZlZCcsIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBSZXNpemUgdGhlIGRpYWxvZyB0byBhIHNwZWNpZmljIHdpZHRoL2hlaWdodCAodGhlIGRpYWxvZyBtdXN0IGJlICdyZXNpemFibGUnKS5cclxuICAgICAgICAgICAgICogVGhlIGRpYWxvZyBjYW4gYmUgcmVzaXplZCB0bzpcclxuICAgICAgICAgICAgICogIEEgbWluaW11bSB3aWR0aCBlcXVhbCB0byB0aGUgaW5pdGlhbCBkaXNwbGF5IHdpZHRoXHJcbiAgICAgICAgICAgICAqICBBIG1pbmltdW0gaGVpZ2h0IGVxdWFsIHRvIHRoZSBzdW0gb2YgaGVhZGVyL2Zvb3RlciBoZWlnaHRzLlxyXG4gICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge051bWJlciBvciBTdHJpbmd9IHdpZHRoICAgIFRoZSBuZXcgZGlhbG9nIHdpZHRoIGluIHBpeGVscyBvciBpbiBwZXJjZW50LlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge051bWJlciBvciBTdHJpbmd9IGhlaWdodCAgIFRoZSBuZXcgZGlhbG9nIGhlaWdodCBpbiBwaXhlbHMgb3IgaW4gcGVyY2VudC5cclxuICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgZGlhbG9nIGluc3RhbmNlLlxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgcmVzaXplVG86ZnVuY3Rpb24od2lkdGgsaGVpZ2h0KXtcclxuICAgICAgICAgICAgICAgIHZhciB3ID0gcGFyc2VGbG9hdCh3aWR0aCksXHJcbiAgICAgICAgICAgICAgICAgICAgaCA9IHBhcnNlRmxvYXQoaGVpZ2h0KSxcclxuICAgICAgICAgICAgICAgICAgICByZWdleCA9IC8oXFxkKlxcLlxcZCt8XFxkKyklL1xyXG4gICAgICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKCFpc05hTih3KSAmJiAhaXNOYU4oaCkgJiYgdGhpcy5nZXQoJ3Jlc2l6YWJsZScpID09PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvLyBhbGxvdyBjdXN0b20gYG9ucmVzaXplYCBtZXRob2RcclxuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaEV2ZW50KCdvbnJlc2l6ZScsIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCgnJyArIHdpZHRoKS5tYXRjaChyZWdleCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ID0gdyAvIDEwMCAqIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZigoJycgKyBoZWlnaHQpLm1hdGNoKHJlZ2V4KSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGggPSBoIC8gMTAwICogZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gdGhpcy5lbGVtZW50cy5kaWFsb2c7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuc3R5bGUubWF4V2lkdGggIT09ICdub25lJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLm1pbldpZHRoID0gKG1pbldpZHRoID0gZWxlbWVudC5vZmZzZXRXaWR0aCkgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLm1heFdpZHRoID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUubWluSGVpZ2h0ID0gdGhpcy5lbGVtZW50cy5oZWFkZXIub2Zmc2V0SGVpZ2h0ICsgdGhpcy5lbGVtZW50cy5mb290ZXIub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLndpZHRoID0gdyArICdweCc7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5oZWlnaHQgPSBoICsgJ3B4JztcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvLyBhbGxvdyBjdXN0b20gYG9ucmVzaXplZGAgbWV0aG9kXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2hFdmVudCgnb25yZXNpemVkJywgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEdldHMgb3IgU2V0cyBkaWFsb2cgc2V0dGluZ3Mvb3B0aW9ucyBcclxuICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBrZXkgQSBzdHJpbmcgc3BlY2lmeWluZyBhIHByb3BlcnkgbmFtZSBvciBhIGNvbGxlY3Rpb24gb2Yga2V5L3ZhbHVlIHBhaXJzLlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gdmFsdWUgT3B0aW9uYWwsIHRoZSB2YWx1ZSBhc3NvY2lhdGVkIHdpdGggdGhlIGtleSAoaW4gY2FzZSBpdCB3YXMgYSBzdHJpbmcpLlxyXG4gICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBzZXR0aW5nIDogZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB1cGRhdGUodGhpcywgdGhpcy5fX2ludGVybmFsLm9wdGlvbnMsIGZ1bmN0aW9uKGssbyxuKXsgb3B0aW9uVXBkYXRlZChzZWxmLGssbyxuKTsgfSwga2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBpZihyZXN1bHQub3AgPT09ICdnZXQnKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHQuZm91bmQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHR5cGVvZiB0aGlzLnNldHRpbmdzICE9PSAndW5kZWZpbmVkJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1cGRhdGUodGhpcywgdGhpcy5zZXR0aW5ncywgdGhpcy5zZXR0aW5nVXBkYXRlZCB8fCBmdW5jdGlvbigpe30sIGtleSwgdmFsdWUpLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHJlc3VsdC5vcCA9PT0gJ3NldCcpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdC5pdGVtcy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gdGhpcy5zZXR0aW5nVXBkYXRlZCB8fCBmdW5jdGlvbigpe307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcih2YXIgeD0wO3g8cmVzdWx0Lml0ZW1zLmxlbmd0aDt4Kz0xKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gcmVzdWx0Lml0ZW1zW3hdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIWl0ZW0uZm91bmQgJiYgdHlwZW9mIHRoaXMuc2V0dGluZ3MgIT09ICd1bmRlZmluZWQnKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGUodGhpcywgdGhpcy5zZXR0aW5ncywgY2FsbGJhY2ssIGl0ZW0ua2V5LCBpdGVtLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIFtBbGlhc10gU2V0cyBkaWFsb2cgc2V0dGluZ3Mvb3B0aW9ucyBcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHNldDpmdW5jdGlvbihrZXksIHZhbHVlKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZyhrZXksdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBbQWxpYXNdIEdldHMgZGlhbG9nIHNldHRpbmdzL29wdGlvbnMgXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBnZXQ6ZnVuY3Rpb24oa2V5KXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldHRpbmcoa2V5KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICogU2V0cyBkaWFsb2cgaGVhZGVyXHJcbiAgICAgICAgICAgICogQGNvbnRlbnQge3N0cmluZyBvciBlbGVtZW50fVxyXG4gICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxyXG4gICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBzZXRIZWFkZXI6ZnVuY3Rpb24oY29udGVudCl7XHJcbiAgICAgICAgICAgICAgICBpZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyQ29udGVudHModGhpcy5lbGVtZW50cy5oZWFkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudHMuaGVhZGVyLmlubmVySFRNTCA9IGNvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZiAoY29udGVudCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MRWxlbWVudCAmJiB0aGlzLmVsZW1lbnRzLmhlYWRlci5maXJzdENoaWxkICE9PSBjb250ZW50KXtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhckNvbnRlbnRzKHRoaXMuZWxlbWVudHMuaGVhZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRzLmhlYWRlci5hcHBlbmRDaGlsZChjb250ZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgKiBTZXRzIGRpYWxvZyBjb250ZW50c1xyXG4gICAgICAgICAgICAqIEBjb250ZW50IHtzdHJpbmcgb3IgZWxlbWVudH1cclxuICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cclxuICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgc2V0Q29udGVudDpmdW5jdGlvbihjb250ZW50KXtcclxuICAgICAgICAgICAgICAgIGlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJDb250ZW50cyh0aGlzLmVsZW1lbnRzLmNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudHMuY29udGVudC5pbm5lckhUTUwgPSBjb250ZW50O1xyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYgKGNvbnRlbnQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTEVsZW1lbnQgJiYgdGhpcy5lbGVtZW50cy5jb250ZW50LmZpcnN0Q2hpbGQgIT09IGNvbnRlbnQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyQ29udGVudHModGhpcy5lbGVtZW50cy5jb250ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRzLmNvbnRlbnQuYXBwZW5kQ2hpbGQoY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIFNob3cgdGhlIGRpYWxvZyBhcyBtb2RhbFxyXG4gICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IHRoZSBkaWFsb2cgaW5zdGFuY2UuXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBzaG93TW9kYWw6IGZ1bmN0aW9uKGNsYXNzTmFtZSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zaG93KHRydWUsIGNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBTaG93IHRoZSBkaWFsb2dcclxuICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSB0aGUgZGlhbG9nIGluc3RhbmNlLlxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgc2hvdzogZnVuY3Rpb24gKG1vZGFsLCBjbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gZW5zdXJlIGluaXRpYWxpemF0aW9uXHJcbiAgICAgICAgICAgICAgICBpbml0aWFsaXplKHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICggIXRoaXMuX19pbnRlcm5hbC5pc09wZW4gKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFkZCB0byBvcGVuIGRpYWxvZ3NcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9faW50ZXJuYWwuaXNPcGVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBvcGVuRGlhbG9ncy5wdXNoKHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBzYXZlIGxhc3QgZm9jdXNlZCBlbGVtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYWxlcnRpZnkuZGVmYXVsdHMubWFpbnRhaW5Gb2N1cyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19pbnRlcm5hbC5hY3RpdmVFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vYWxsb3cgY3VzdG9tIGRvbSBtYW5pcHVsYXRpb24gdXBkYXRlcyBiZWZvcmUgc2hvd2luZyB0aGUgZGlhbG9nLlxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHR5cGVvZiB0aGlzLnByZXBhcmUgPT09ICdmdW5jdGlvbicpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXBhcmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJpbmRFdmVudHModGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKG1vZGFsICE9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldCgnbW9kYWwnLCBtb2RhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL3NhdmUgc2Nyb2xsIHRvIHByZXZlbnQgZG9jdW1lbnQganVtcFxyXG4gICAgICAgICAgICAgICAgICAgIHNhdmVTY3JvbGxQb3NpdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBlbnN1cmVOb092ZXJmbG93KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFsbG93IGN1c3RvbSBkaWFsb2cgY2xhc3Mgb24gc2hvd1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHR5cGVvZiBjbGFzc05hbWUgPT09ICdzdHJpbmcnICYmIGNsYXNzTmFtZSAhPT0gJycpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9faW50ZXJuYWwuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRDbGFzcyh0aGlzLmVsZW1lbnRzLnJvb3QsIGNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBtYXhpbWl6ZSBpZiBzdGFydCBtYXhpbWl6ZWRcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIHRoaXMuZ2V0KCdzdGFydE1heGltaXplZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWF4aW1pemUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmlzTWF4aW1pemVkKCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN0b3JlKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlQWJzUG9zaXRpb25GaXgodGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKHRoaXMuZWxlbWVudHMucm9vdCwgY2xhc3Nlcy5hbmltYXRpb25PdXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZENsYXNzKHRoaXMuZWxlbWVudHMucm9vdCwgY2xhc3Nlcy5hbmltYXRpb25Jbik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNldCAxcyBmYWxsYmFjayBpbiBjYXNlIHRyYW5zaXRpb24gZXZlbnQgZG9lc24ndCBmaXJlXHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KCB0aGlzLl9faW50ZXJuYWwudGltZXJJbik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX2ludGVybmFsLnRpbWVySW4gPSBzZXRUaW1lb3V0KCB0aGlzLl9faW50ZXJuYWwudHJhbnNpdGlvbkluSGFuZGxlciwgdHJhbnNpdGlvbi5zdXBwb3J0ZWQgPyAxMDAwIDogMTAwICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGlzU2FmYXJpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZm9yY2UgZGVza3RvcCBzYWZhcmkgcmVmbG93XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb290ID0gdGhpcy5lbGVtZW50cy5yb290O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb290LnN0eWxlLmRpc3BsYXkgID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7cm9vdC5zdHlsZS5kaXNwbGF5ICA9ICdibG9jayc7fSwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL3JlZmxvd1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZmxvdyA9IHRoaXMuZWxlbWVudHMucm9vdC5vZmZzZXRXaWR0aDtcclxuICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc2hvdyBkaWFsb2dcclxuICAgICAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyh0aGlzLmVsZW1lbnRzLnJvb3QsIGNsYXNzZXMuaGlkZGVuKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaW50ZXJuYWwgb24gc2hvdyBldmVudFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHR5cGVvZiB0aGlzLmhvb2tzLm9uc2hvdyA9PT0gJ2Z1bmN0aW9uJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaG9va3Mub25zaG93LmNhbGwodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBhbGxvdyBjdXN0b20gYG9uc2hvd2AgbWV0aG9kXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2hFdmVudCgnb25zaG93JywgdGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVzZXQgbW92ZSB1cGRhdGVzXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzZXRNb3ZlKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlc2V0IHJlc2l6ZSB1cGRhdGVzXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzZXRSZXNpemUodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc2hha2UgdGhlIGRpYWxvZyB0byBpbmRpY2F0ZSBpdHMgYWxyZWFkeSBvcGVuXHJcbiAgICAgICAgICAgICAgICAgICAgYWRkQ2xhc3ModGhpcy5lbGVtZW50cy5kaWFsb2csIGNsYXNzZXMuc2hha2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKHNlbGYuZWxlbWVudHMuZGlhbG9nLCBjbGFzc2VzLnNoYWtlKTtcclxuICAgICAgICAgICAgICAgICAgICB9LDIwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIENsb3NlIHRoZSBkaWFsb2dcclxuICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgZGlhbG9nIGluc3RhbmNlXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBjbG9zZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX19pbnRlcm5hbC5pc09wZW4gKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHVuYmluZEV2ZW50cyh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3ModGhpcy5lbGVtZW50cy5yb290LCBjbGFzc2VzLmFuaW1hdGlvbkluKTtcclxuICAgICAgICAgICAgICAgICAgICBhZGRDbGFzcyh0aGlzLmVsZW1lbnRzLnJvb3QsIGNsYXNzZXMuYW5pbWF0aW9uT3V0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc2V0IDFzIGZhbGxiYWNrIGluIGNhc2UgdHJhbnNpdGlvbiBldmVudCBkb2Vzbid0IGZpcmVcclxuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoIHRoaXMuX19pbnRlcm5hbC50aW1lck91dCApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19pbnRlcm5hbC50aW1lck91dCA9IHNldFRpbWVvdXQoIHRoaXMuX19pbnRlcm5hbC50cmFuc2l0aW9uT3V0SGFuZGxlciwgdHJhbnNpdGlvbi5zdXBwb3J0ZWQgPyAxMDAwIDogMTAwICk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaGlkZSBkaWFsb2dcclxuICAgICAgICAgICAgICAgICAgICBhZGRDbGFzcyh0aGlzLmVsZW1lbnRzLnJvb3QsIGNsYXNzZXMuaGlkZGVuKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3JlZmxvd1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZmxvdyA9IHRoaXMuZWxlbWVudHMubW9kYWwub2Zmc2V0V2lkdGg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBjdXN0b20gZGlhbG9nIGNsYXNzIG9uIGhpZGVcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuX19pbnRlcm5hbC5jbGFzc05hbWUgIT09ICd1bmRlZmluZWQnICYmIHRoaXMuX19pbnRlcm5hbC5jbGFzc05hbWUgIT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKHRoaXMuZWxlbWVudHMucm9vdCwgdGhpcy5fX2ludGVybmFsLmNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBpbnRlcm5hbCBvbiBjbG9zZSBldmVudFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHR5cGVvZiB0aGlzLmhvb2tzLm9uY2xvc2UgPT09ICdmdW5jdGlvbicpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhvb2tzLm9uY2xvc2UuY2FsbCh0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFsbG93IGN1c3RvbSBgb25jbG9zZWAgbWV0aG9kXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2hFdmVudCgnb25jbG9zZScsIHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL3JlbW92ZSBmcm9tIG9wZW4gZGlhbG9nc1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5EaWFsb2dzLnNwbGljZShvcGVuRGlhbG9ncy5pbmRleE9mKHRoaXMpLDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19pbnRlcm5hbC5pc09wZW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZW5zdXJlTm9PdmVyZmxvdygpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQ2xvc2UgYWxsIG9wZW4gZGlhbG9ncyBleGNlcHQgdGhpcy5cclxuICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgY2xvc2VPdGhlcnM6ZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGFsZXJ0aWZ5LmNsb3NlQWxsKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBEZXN0cm95cyB0aGlzIGRpYWxvZyBpbnN0YW5jZVxyXG4gICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBkZXN0cm95OmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fX2ludGVybmFsLmlzT3BlbiApIHtcclxuICAgICAgICAgICAgICAgICAgICAvL21hcmsgZGlhbG9nIGZvciBkZXN0cnVjdGlvbiwgdGhpcyB3aWxsIGJlIGNhbGxlZCBvbiB0cmFuaXN0aW9uT3V0IGV2ZW50LlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19pbnRlcm5hbC5kZXN0cm95ID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzdHJ1Y3QodGhpcywgaW5pdGlhbGl6ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAvL2Nsb3NlIHRoZSBkaWFsb2cgdG8gdW5iaW5kIGFsbCBldmVudHMuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVzdHJ1Y3QodGhpcywgaW5pdGlhbGl6ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG5cdH0gKCkgKTtcclxuICAgIHZhciBub3RpZmllciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHJlZmxvdyxcclxuICAgICAgICAgICAgZWxlbWVudCxcclxuICAgICAgICAgICAgb3Blbkluc3RhbmNlcyA9IFtdLFxyXG4gICAgICAgICAgICBjbGFzc2VzID0ge1xyXG4gICAgICAgICAgICAgICAgYmFzZTogJ2FsZXJ0aWZ5LW5vdGlmaWVyJyxcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdhanMtbWVzc2FnZScsXHJcbiAgICAgICAgICAgICAgICB0b3A6ICdhanMtdG9wJyxcclxuICAgICAgICAgICAgICAgIHJpZ2h0OiAnYWpzLXJpZ2h0JyxcclxuICAgICAgICAgICAgICAgIGJvdHRvbTogJ2Fqcy1ib3R0b20nLFxyXG4gICAgICAgICAgICAgICAgbGVmdDogJ2Fqcy1sZWZ0JyxcclxuICAgICAgICAgICAgICAgIHZpc2libGU6ICdhanMtdmlzaWJsZScsXHJcbiAgICAgICAgICAgICAgICBoaWRkZW46ICdhanMtaGlkZGVuJyxcclxuICAgICAgICAgICAgICAgIGNsb3NlOiAnYWpzLWNsb3NlJ1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEhlbHBlcjogaW5pdGlhbGl6ZXMgdGhlIG5vdGlmaWVyIGluc3RhbmNlXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gaW5pdGlhbGl6ZShpbnN0YW5jZSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCFpbnN0YW5jZS5fX2ludGVybmFsKSB7XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5fX2ludGVybmFsID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBhbGVydGlmeS5kZWZhdWx0cy5ub3RpZmllci5wb3NpdGlvbixcclxuICAgICAgICAgICAgICAgICAgICBkZWxheTogYWxlcnRpZnkuZGVmYXVsdHMubm90aWZpZXIuZGVsYXksXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB1cGRhdGVQb3NpdGlvbihpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vYWRkIHRvIERPTSB0cmVlLlxyXG4gICAgICAgICAgICBpZiAoZWxlbWVudC5wYXJlbnROb2RlICE9PSBkb2N1bWVudC5ib2R5KSB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIHB1c2hJbnN0YW5jZShpbnN0YW5jZSkge1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5fX2ludGVybmFsLnB1c2hlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIG9wZW5JbnN0YW5jZXMucHVzaChpbnN0YW5jZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIHBvcEluc3RhbmNlKGluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIG9wZW5JbnN0YW5jZXMuc3BsaWNlKG9wZW5JbnN0YW5jZXMuaW5kZXhPZihpbnN0YW5jZSksIDEpO1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5fX2ludGVybmFsLnB1c2hlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBIZWxwZXI6IHVwZGF0ZSB0aGUgbm90aWZpZXIgaW5zdGFuY2UgcG9zaXRpb25cclxuICAgICAgICAgKiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVQb3NpdGlvbihpbnN0YW5jZSkge1xyXG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzZXMuYmFzZTtcclxuICAgICAgICAgICAgc3dpdGNoIChpbnN0YW5jZS5fX2ludGVybmFsLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3RvcC1yaWdodCc6XHJcbiAgICAgICAgICAgICAgICBhZGRDbGFzcyhlbGVtZW50LCBjbGFzc2VzLnRvcCArICcgJyArIGNsYXNzZXMucmlnaHQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3RvcC1sZWZ0JzpcclxuICAgICAgICAgICAgICAgIGFkZENsYXNzKGVsZW1lbnQsIGNsYXNzZXMudG9wICsgJyAnICsgY2xhc3Nlcy5sZWZ0KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdib3R0b20tbGVmdCc6XHJcbiAgICAgICAgICAgICAgICBhZGRDbGFzcyhlbGVtZW50LCBjbGFzc2VzLmJvdHRvbSArICcgJyArIGNsYXNzZXMubGVmdCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGNhc2UgJ2JvdHRvbS1yaWdodCc6XHJcbiAgICAgICAgICAgICAgICBhZGRDbGFzcyhlbGVtZW50LCBjbGFzc2VzLmJvdHRvbSArICcgJyArIGNsYXNzZXMucmlnaHQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogY3JlYXRlcyBhIG5ldyBub3RpZmljYXRpb24gbWVzc2FnZVxyXG4gICAgICAgICpcclxuICAgICAgICAqIEBwYXJhbSAge0RPTUVsZW1lbnR9IG1lc3NhZ2VcdFRoZSBub3RpZmllciBtZXNzYWdlIGVsZW1lbnRcclxuICAgICAgICAqIEBwYXJhbSAge051bWJlcn0gd2FpdCAgIFRpbWUgKGluIG1zKSB0byB3YWl0IGJlZm9yZSB0aGUgbWVzc2FnZSBpcyBkaXNtaXNzZWQsIGEgdmFsdWUgb2YgMCBtZWFucyBrZWVwIG9wZW4gdGlsbCBjbGlja2VkLlxyXG4gICAgICAgICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrIEEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gYmUgaW52b2tlZCB3aGVuIHRoZSBtZXNzYWdlIGlzIGRpc21pc3NlZC5cclxuICAgICAgICAqXHJcbiAgICAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XHJcbiAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGUoZGl2LCBjYWxsYmFjaykge1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gY2xpY2tEZWxlZ2F0ZShldmVudCwgaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgIGlmKCFpbnN0YW5jZS5fX2ludGVybmFsLmNsb3NlQnV0dG9uIHx8IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2xvc2UnKSA9PT0gJ3RydWUnKXtcclxuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZS5kaXNtaXNzKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiB0cmFuc2l0aW9uRG9uZShldmVudCwgaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgIC8vIHVuYmluZCBldmVudFxyXG4gICAgICAgICAgICAgICAgb2ZmKGluc3RhbmNlLmVsZW1lbnQsIHRyYW5zaXRpb24udHlwZSwgdHJhbnNpdGlvbkRvbmUpO1xyXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSBtZXNzYWdlXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNoaWxkKGluc3RhbmNlLmVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBpbml0aWFsaXplKGluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWluc3RhbmNlLl9faW50ZXJuYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZS5fX2ludGVybmFsID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwdXNoZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxheSA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGltZXI6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2tIYW5kbGVyOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb25FbmRIYW5kbGVyOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb25UaW1lb3V0OiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlLl9faW50ZXJuYWwuY2xpY2tIYW5kbGVyID0gZGVsZWdhdGUoaW5zdGFuY2UsIGNsaWNrRGVsZWdhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlLl9faW50ZXJuYWwudHJhbnNpdGlvbkVuZEhhbmRsZXIgPSBkZWxlZ2F0ZShpbnN0YW5jZSwgdHJhbnNpdGlvbkRvbmUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNsZWFyVGltZXJzKGluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoaW5zdGFuY2UuX19pbnRlcm5hbC50aW1lcik7XHJcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoaW5zdGFuY2UuX19pbnRlcm5hbC50cmFuc2l0aW9uVGltZW91dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGluaXRpYWxpemUoe1xyXG4gICAgICAgICAgICAgICAgLyogbm90aWZpY2F0aW9uIERPTSBlbGVtZW50Ki9cclxuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGRpdixcclxuICAgICAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAgICAgKiBQdXNoZXMgYSBub3RpZmljYXRpb24gbWVzc2FnZSBcclxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nIG9yIERPTUVsZW1lbnR9IGNvbnRlbnQgVGhlIG5vdGlmaWNhdGlvbiBtZXNzYWdlIGNvbnRlbnRcclxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSB3YWl0IFRoZSB0aW1lIChpbiBzZWNvbmRzKSB0byB3YWl0IGJlZm9yZSB0aGUgbWVzc2FnZSBpcyBkaXNtaXNzZWQsIGEgdmFsdWUgb2YgMCBtZWFucyBrZWVwIG9wZW4gdGlsbCBjbGlja2VkLlxyXG4gICAgICAgICAgICAgICAgICogXHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIHB1c2g6IGZ1bmN0aW9uIChfY29udGVudCwgX3dhaXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX19pbnRlcm5hbC5wdXNoZWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hJbnN0YW5jZSh0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lcnModGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29udGVudCwgd2FpdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhaXQgPSB0aGlzLl9faW50ZXJuYWwuZGVsYXk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAoX2NvbnRlbnQpID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhaXQgPSBfY29udGVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCA9IF9jb250ZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhaXQgPSB0aGlzLl9faW50ZXJuYWwuZGVsYXk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCA9IF9jb250ZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2FpdCA9IF93YWl0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX2ludGVybmFsLmNsb3NlQnV0dG9uID0gYWxlcnRpZnkuZGVmYXVsdHMubm90aWZpZXIuY2xvc2VCdXR0b247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNldCBjb250ZW50c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldENvbnRlbnQoY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYXBwZW5kIG9yIGluc2VydFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobm90aWZpZXIuX19pbnRlcm5hbC5wb3NpdGlvbi5pbmRleE9mKCd0b3AnKSA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuaW5zZXJ0QmVmb3JlKHRoaXMuZWxlbWVudCwgZWxlbWVudC5maXJzdENoaWxkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWZsb3cgPSB0aGlzLmVsZW1lbnQub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZENsYXNzKHRoaXMuZWxlbWVudCwgY2xhc3Nlcy52aXNpYmxlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYXR0YWNoIGNsaWNrIGV2ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uKHRoaXMuZWxlbWVudCwgJ2NsaWNrJywgdGhpcy5fX2ludGVybmFsLmNsaWNrSGFuZGxlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRlbGF5KHdhaXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgICAgICoge0Z1bmN0aW9ufSBjYWxsYmFjayBmdW5jdGlvbiB0byBiZSBpbnZva2VkIGJlZm9yZSBkaXNtaXNzaW5nIHRoZSBub3RpZmljYXRpb24gbWVzc2FnZS5cclxuICAgICAgICAgICAgICAgICAqIFJlbWFya3M6IEEgcmV0dXJuIHZhbHVlID09PSAnZmFsc2UnIHdpbGwgY2FuY2VsIHRoZSBkaXNtaXNzYWxcclxuICAgICAgICAgICAgICAgICAqIFxyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICBvbmRpc21pc3M6IGZ1bmN0aW9uICgpIHsgfSxcclxuICAgICAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAgICAgKiB7RnVuY3Rpb259IGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGJlIGludm9rZWQgd2hlbiB0aGUgbWVzc2FnZSBpcyBkaXNtaXNzZWQuXHJcbiAgICAgICAgICAgICAgICAgKiBcclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxyXG4gICAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgICAqIERpc21pc3NlcyB0aGUgbm90aWZpY2F0aW9uIG1lc3NhZ2UgXHJcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGNsaWNrZWQgQSBmbGFnIGluZGljYXRpbmcgaWYgdGhlIGRpc21pc3NhbCB3YXMgY2F1c2VkIGJ5IGEgY2xpY2suXHJcbiAgICAgICAgICAgICAgICAgKiBcclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgZGlzbWlzczogZnVuY3Rpb24gKGNsaWNrZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fX2ludGVybmFsLnB1c2hlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVycyh0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEodHlwZW9mIHRoaXMub25kaXNtaXNzID09PSAnZnVuY3Rpb24nICYmIHRoaXMub25kaXNtaXNzLmNhbGwodGhpcykgPT09IGZhbHNlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kZXRhY2ggY2xpY2sgZXZlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mZih0aGlzLmVsZW1lbnQsICdjbGljaycsIHRoaXMuX19pbnRlcm5hbC5jbGlja0hhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZW5zdXJlIGVsZW1lbnQgZXhpc3RzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuZWxlbWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5lbGVtZW50LnBhcmVudE5vZGUgPT09IGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RyYW5zaXRpb24gZW5kIG9yIGZhbGxiYWNrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX2ludGVybmFsLnRyYW5zaXRpb25UaW1lb3V0ID0gc2V0VGltZW91dCh0aGlzLl9faW50ZXJuYWwudHJhbnNpdGlvbkVuZEhhbmRsZXIsIHRyYW5zaXRpb24uc3VwcG9ydGVkID8gMTAwMCA6IDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3ModGhpcy5lbGVtZW50LCBjbGFzc2VzLnZpc2libGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjdXN0b20gY2FsbGJhY2sgb24gZGlzbWlzc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5jYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrLmNhbGwodGhpcywgY2xpY2tlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9wSW5zdGFuY2UodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgICAqIERlbGF5cyB0aGUgbm90aWZpY2F0aW9uIG1lc3NhZ2UgZGlzbWlzc2FsXHJcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gd2FpdCBUaGUgdGltZSAoaW4gc2Vjb25kcykgdG8gd2FpdCBiZWZvcmUgdGhlIG1lc3NhZ2UgaXMgZGlzbWlzc2VkLCBhIHZhbHVlIG9mIDAgbWVhbnMga2VlcCBvcGVuIHRpbGwgY2xpY2tlZC5cclxuICAgICAgICAgICAgICAgICAqIFxyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICBkZWxheTogZnVuY3Rpb24gKHdhaXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVycyh0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9faW50ZXJuYWwuZGVsYXkgPSB0eXBlb2Ygd2FpdCAhPT0gJ3VuZGVmaW5lZCcgJiYgIWlzTmFOKCt3YWl0KSA/ICt3YWl0IDogbm90aWZpZXIuX19pbnRlcm5hbC5kZWxheTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fX2ludGVybmFsLmRlbGF5ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9faW50ZXJuYWwudGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgc2VsZi5kaXNtaXNzKCk7IH0sIHRoaXMuX19pbnRlcm5hbC5kZWxheSAqIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgICAgICogU2V0cyB0aGUgbm90aWZpY2F0aW9uIG1lc3NhZ2UgY29udGVudHNcclxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nIG9yIERPTUVsZW1lbnR9IGNvbnRlbnQgVGhlIG5vdGlmaWNhdGlvbiBtZXNzYWdlIGNvbnRlbnRcclxuICAgICAgICAgICAgICAgICAqIFxyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICBzZXRDb250ZW50OiBmdW5jdGlvbiAoY29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJDb250ZW50cyh0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuaW5uZXJIVE1MID0gY29udGVudDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvbnRlbnQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTEVsZW1lbnQgJiYgdGhpcy5lbGVtZW50LmZpcnN0Q2hpbGQgIT09IGNvbnRlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJDb250ZW50cyh0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQoY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuX19pbnRlcm5hbC5jbG9zZUJ1dHRvbil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjbG9zZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkQ2xhc3MoY2xvc2UsIGNsYXNzZXMuY2xvc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtY2xvc2UnLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKGNsb3NlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgICAqIERpc21pc3NlcyBhbGwgb3BlbiBub3RpZmljYXRpb25zIGV4Y2VwdCB0aGlzLlxyXG4gICAgICAgICAgICAgICAgICogXHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIGRpc21pc3NPdGhlcnM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBub3RpZmllci5kaXNtaXNzQWxsKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vbm90aWZpZXIgYXBpXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEdldHMgb3IgU2V0cyBub3RpZmllciBzZXR0aW5ncy4gXHJcbiAgICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIHNldHRpbmcgbmFtZVxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge1ZhcmlhbnR9IHZhbHVlIFRoZSBzZXR0aW5nIHZhbHVlLlxyXG4gICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9XHRpZiB0aGUgY2FsbGVkIGFzIGEgc2V0dGVyLCByZXR1cm4gdGhlIG5vdGlmaWVyIGluc3RhbmNlLlxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgc2V0dGluZzogZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIC8vZW5zdXJlIGluaXRcclxuICAgICAgICAgICAgICAgIGluaXRpYWxpemUodGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2dldFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9faW50ZXJuYWxba2V5XTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9zZXRcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3Bvc2l0aW9uJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX2ludGVybmFsLnBvc2l0aW9uID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVBvc2l0aW9uKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdkZWxheSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19pbnRlcm5hbC5kZWxheSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIFtBbGlhc10gU2V0cyBkaWFsb2cgc2V0dGluZ3Mvb3B0aW9ucyBcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHNldDpmdW5jdGlvbihrZXksdmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5nKGtleSx2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIFtBbGlhc10gR2V0cyBkaWFsb2cgc2V0dGluZ3Mvb3B0aW9ucyBcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGdldDpmdW5jdGlvbihrZXkpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZyhrZXkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQ3JlYXRlcyBhIG5ldyBub3RpZmljYXRpb24gbWVzc2FnZVxyXG4gICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBUaGUgdHlwZSBvZiBub3RpZmljYXRpb24gbWVzc2FnZSAoc2ltcGx5IGEgQ1NTIGNsYXNzIG5hbWUgJ2Fqcy17dHlwZX0nIHRvIGJlIGFkZGVkKS5cclxuICAgICAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgIEEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gYmUgaW52b2tlZCB3aGVuIHRoZSBtZXNzYWdlIGlzIGRpc21pc3NlZC5cclxuICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgY3JlYXRlOiBmdW5jdGlvbiAodHlwZSwgY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIC8vZW5zdXJlIG5vdGlmaWVyIGluaXRcclxuICAgICAgICAgICAgICAgIGluaXRpYWxpemUodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAvL2NyZWF0ZSBuZXcgbm90aWZpY2F0aW9uIG1lc3NhZ2VcclxuICAgICAgICAgICAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgIGRpdi5jbGFzc05hbWUgPSBjbGFzc2VzLm1lc3NhZ2UgKyAoKHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJyAmJiB0eXBlICE9PSAnJykgPyAnIGFqcy0nICsgdHlwZSA6ICcnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjcmVhdGUoZGl2LCBjYWxsYmFjayk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBEaXNtaXNzZXMgYWxsIG9wZW4gbm90aWZpY2F0aW9ucy5cclxuICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGV4Y3BldCBbb3B0aW9uYWxdIFRoZSBub3RpZmljYXRpb24gb2JqZWN0IHRvIGV4Y2x1ZGUgZnJvbSBkaXNtaXNzYWwuXHJcbiAgICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBkaXNtaXNzQWxsOiBmdW5jdGlvbiAoZXhjZXB0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2xvbmUgPSBvcGVuSW5zdGFuY2VzLnNsaWNlKDApO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCBjbG9uZS5sZW5ndGg7IHggKz0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciAgaW5zdGFuY2UgPSBjbG9uZVt4XTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXhjZXB0ID09PSB1bmRlZmluZWQgfHwgZXhjZXB0ICE9PSBpbnN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZS5kaXNtaXNzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH0pKCk7XHJcbiAgICAvKipcclxuICAgICAqIEFsZXJ0aWZ5IHB1YmxpYyBBUElcclxuICAgICAqIFRoaXMgY29udGFpbnMgZXZlcnl0aGluZyB0aGF0IGlzIGV4cG9zZWQgdGhyb3VnaCB0aGUgYWxlcnRpZnkgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge09iamVjdH1cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gQWxlcnRpZnkoKSB7XHJcblxyXG4gICAgICAgIC8vIGhvbGRzIGEgcmVmZXJlbmNlcyBvZiBjcmVhdGVkIGRpYWxvZ3NcclxuICAgICAgICB2YXIgZGlhbG9ncyA9IHt9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBFeHRlbmRzIGEgZ2l2ZW4gcHJvdG90eXBlIGJ5IG1lcmdpbmcgcHJvcGVydGllcyBmcm9tIGJhc2UgaW50byBzdWIuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAc3ViIHtPYmplY3R9IHN1YiBUaGUgcHJvdG90eXBlIGJlaW5nIG92ZXJ3cml0dGVuLlxyXG4gICAgICAgICAqIEBiYXNlIHtPYmplY3R9IGJhc2UgVGhlIHByb3RvdHlwZSBiZWluZyB3cml0dGVuLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgZXh0ZW5kZWQgcHJvdG90eXBlLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGV4dGVuZChzdWIsIGJhc2UpIHtcclxuICAgICAgICAgICAgLy8gY29weSBkaWFsb2cgcG90b3R5cGUgb3ZlciBkZWZpbml0aW9uLlxyXG4gICAgICAgICAgICBmb3IgKHZhciBwcm9wIGluIGJhc2UpIHtcclxuICAgICAgICAgICAgICAgIGlmIChiYXNlLmhhc093blByb3BlcnR5KHByb3ApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3ViW3Byb3BdID0gYmFzZVtwcm9wXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gc3ViO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogSGVscGVyOiByZXR1cm5zIGEgZGlhbG9nIGluc3RhbmNlIGZyb20gc2F2ZWQgZGlhbG9ncy5cclxuICAgICAgICAqIGFuZCBpbml0aWFsaXplcyB0aGUgZGlhbG9nIGlmIGl0cyBub3QgYWxyZWFkeSBpbml0aWFsaXplZC5cclxuICAgICAgICAqXHJcbiAgICAgICAgKiBAbmFtZSB7U3RyaW5nfSBuYW1lIFRoZSBkaWFsb2cgbmFtZS5cclxuICAgICAgICAqXHJcbiAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBkaWFsb2cgaW5zdGFuY2UuXHJcbiAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBnZXRfZGlhbG9nKG5hbWUpIHtcclxuICAgICAgICAgICAgdmFyIGRpYWxvZyA9IGRpYWxvZ3NbbmFtZV0uZGlhbG9nO1xyXG4gICAgICAgICAgICAvL2luaXRpYWxpemUgdGhlIGRpYWxvZyBpZiBpdHMgbm90IGFscmVhZHkgaW5pdGlhbGl6ZWQuXHJcbiAgICAgICAgICAgIGlmIChkaWFsb2cgJiYgdHlwZW9mIGRpYWxvZy5fX2luaXQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIGRpYWxvZy5fX2luaXQoZGlhbG9nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGlhbG9nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSGVscGVyOiAgcmVnaXN0ZXJzIGEgbmV3IGRpYWxvZyBkZWZpbml0aW9uLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQG5hbWUge1N0cmluZ30gbmFtZSBUaGUgZGlhbG9nIG5hbWUuXHJcbiAgICAgICAgICogQEZhY3Rvcnkge0Z1bmN0aW9ufSBGYWN0b3J5IGEgZnVuY3Rpb24gcmVzcG9zaWJsZSBmb3IgY3JlYXRpbmcgZGlhbG9nIHByb3RvdHlwZS5cclxuICAgICAgICAgKiBAdHJhbnNpZW50IHtCb29sZWFufSB0cmFuc2llbnQgVHJ1ZSB0byBjcmVhdGUgYSBuZXcgZGlhbG9nIGluc3RhbmNlIGVhY2ggdGltZSB0aGUgZGlhbG9nIGlzIGludm9rZWQsIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAgICAgKiBAYmFzZSB7U3RyaW5nfSBiYXNlIHRoZSBuYW1lIG9mIGFub3RoZXIgZGlhbG9nIHRvIGluaGVyaXQgZnJvbS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIGRpYWxvZyBkZWZpbml0aW9uLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIHJlZ2lzdGVyKG5hbWUsIEZhY3RvcnksIHRyYW5zaWVudCwgYmFzZSkge1xyXG4gICAgICAgICAgICB2YXIgZGVmaW5pdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgIGRpYWxvZzogbnVsbCxcclxuICAgICAgICAgICAgICAgIGZhY3Rvcnk6IEZhY3RvcnlcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIC8vaWYgdGhpcyBpcyBiYXNlZCBvbiBhbiBleGlzdGluZyBkaWFsb2csIGNyZWF0ZSBhIG5ldyBkZWZpbml0aW9uXHJcbiAgICAgICAgICAgIC8vYnkgYXBwbHlpbmcgdGhlIG5ldyBwcm90b3lwZSBvdmVyIHRoZSBleGlzdGluZyBvbmUuXHJcbiAgICAgICAgICAgIGlmIChiYXNlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGRlZmluaXRpb24uZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXh0ZW5kKG5ldyBkaWFsb2dzW2Jhc2VdLmZhY3RvcnkoKSwgbmV3IEZhY3RvcnkoKSk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRyYW5zaWVudCkge1xyXG4gICAgICAgICAgICAgICAgLy9jcmVhdGUgYSBuZXcgZGVmaW5pdGlvbiBiYXNlZCBvbiBkaWFsb2dcclxuICAgICAgICAgICAgICAgIGRlZmluaXRpb24uZGlhbG9nID0gZXh0ZW5kKG5ldyBkZWZpbml0aW9uLmZhY3RvcnkoKSwgZGlhbG9nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGlhbG9nc1tuYW1lXSA9IGRlZmluaXRpb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQWxlcnRpZnkgZGVmYXVsdHNcclxuICAgICAgICAgICAgICogXHJcbiAgICAgICAgICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBkZWZhdWx0czogZGVmYXVsdHMsXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBEaWFsb2dzIGZhY3RvcnkgXHJcbiAgICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSAgICAgIERpYWxvZyBuYW1lLlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSAgICBBIERpYWxvZyBmYWN0b3J5IGZ1bmN0aW9uLlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59ICAgICBJbmRpY2F0ZXMgd2hldGhlciB0byBjcmVhdGUgYSBzaW5nbGV0b24gb3IgdHJhbnNpZW50IGRpYWxvZy5cclxuICAgICAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgVGhlIG5hbWUgb2YgdGhlIGJhc2UgdHlwZSB0byBpbmhlcml0IGZyb20uXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBkaWFsb2c6IGZ1bmN0aW9uIChuYW1lLCBGYWN0b3J5LCB0cmFuc2llbnQsIGJhc2UpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBnZXQgcmVxdWVzdCwgY3JlYXRlIGEgbmV3IGluc3RhbmNlIGFuZCByZXR1cm4gaXQuXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIEZhY3RvcnkgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2V0X2RpYWxvZyhuYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignYWxlcnRpZnkuZGlhbG9nOiBuYW1lIGFscmVhZHkgZXhpc3RzJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gcmVnaXN0ZXIgdGhlIGRpYWxvZ1xyXG4gICAgICAgICAgICAgICAgdmFyIGRlZmluaXRpb24gPSByZWdpc3RlcihuYW1lLCBGYWN0b3J5LCB0cmFuc2llbnQsIGJhc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0cmFuc2llbnQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbWFrZSBpdCBwdWJsaWNcclxuICAgICAgICAgICAgICAgICAgICB0aGlzW25hbWVdID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2lmIHBhc3NlZCB3aXRoIG5vIHBhcmFtcywgY29uc2lkZXIgaXQgYSBnZXQgcmVxdWVzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmluaXRpb24uZGlhbG9nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluc3RhbmNlID0gZXh0ZW5kKG5ldyBkZWZpbml0aW9uLmZhY3RvcnkoKSwgZGlhbG9nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZW5zdXJlIGluaXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZSAmJiB0eXBlb2YgaW5zdGFuY2UuX19pbml0ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UuX19pbml0KGluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlWydtYWluJ10uYXBwbHkoaW5zdGFuY2UsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5zdGFuY2VbJ3Nob3cnXS5hcHBseShpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBtYWtlIGl0IHB1YmxpY1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXNbbmFtZV0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZW5zdXJlIGluaXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlZmluaXRpb24uZGlhbG9nICYmIHR5cGVvZiBkZWZpbml0aW9uLmRpYWxvZy5fX2luaXQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmluaXRpb24uZGlhbG9nLl9faW5pdChkZWZpbml0aW9uLmRpYWxvZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiBwYXNzZWQgd2l0aCBubyBwYXJhbXMsIGNvbnNpZGVyIGl0IGEgZ2V0IHJlcXVlc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZpbml0aW9uLmRpYWxvZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkaWFsb2cgPSBkZWZpbml0aW9uLmRpYWxvZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpYWxvZ1snbWFpbiddLmFwcGx5KGRlZmluaXRpb24uZGlhbG9nLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRpYWxvZ1snc2hvdyddLmFwcGx5KGRlZmluaXRpb24uZGlhbG9nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBDbG9zZSBhbGwgb3BlbiBkaWFsb2dzLlxyXG4gICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gZXhjcGV0IFtvcHRpb25hbF0gVGhlIGRpYWxvZyBvYmplY3QgdG8gZXhjbHVkZSBmcm9tIGNsb3NpbmcuXHJcbiAgICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGNsb3NlQWxsOiBmdW5jdGlvbiAoZXhjZXB0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2xvbmUgPSBvcGVuRGlhbG9ncy5zbGljZSgwKTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgY2xvbmUubGVuZ3RoOyB4ICs9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaW5zdGFuY2UgPSBjbG9uZVt4XTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXhjZXB0ID09PSB1bmRlZmluZWQgfHwgZXhjZXB0ICE9PSBpbnN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZS5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEdldHMgb3IgU2V0cyBkaWFsb2cgc2V0dGluZ3Mvb3B0aW9ucy4gaWYgdGhlIGRpYWxvZyBpcyB0cmFuc2llbnQsIHRoaXMgY2FsbCBkb2VzIG5vdGhpbmcuXHJcbiAgICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBkaWFsb2cgbmFtZS5cclxuICAgICAgICAgICAgICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBrZXkgQSBzdHJpbmcgc3BlY2lmeWluZyBhIHByb3BlcnkgbmFtZSBvciBhIGNvbGxlY3Rpb24gb2Yga2V5L3ZhbHVlIHBhaXJzLlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge1ZhcmlhbnR9IHZhbHVlIE9wdGlvbmFsLCB0aGUgdmFsdWUgYXNzb2NpYXRlZCB3aXRoIHRoZSBrZXkgKGluIGNhc2UgaXQgd2FzIGEgc3RyaW5nKS5cclxuICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgc2V0dGluZzogZnVuY3Rpb24gKG5hbWUsIGtleSwgdmFsdWUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobmFtZSA9PT0gJ25vdGlmaWVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBub3RpZmllci5zZXR0aW5nKGtleSwgdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBkaWFsb2cgPSBnZXRfZGlhbG9nKG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRpYWxvZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkaWFsb2cuc2V0dGluZyhrZXksIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIFtBbGlhc10gU2V0cyBkaWFsb2cgc2V0dGluZ3Mvb3B0aW9ucyBcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24obmFtZSxrZXksdmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZyhuYW1lLCBrZXksdmFsdWUpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogW0FsaWFzXSBHZXRzIGRpYWxvZyBzZXR0aW5ncy9vcHRpb25zIFxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbihuYW1lLCBrZXkpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZyhuYW1lLCBrZXkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQ3JlYXRlcyBhIG5ldyBub3RpZmljYXRpb24gbWVzc2FnZS5cclxuICAgICAgICAgICAgICogSWYgYSB0eXBlIGlzIHBhc3NlZCwgYSBjbGFzcyBuYW1lIFwiYWpzLXt0eXBlfVwiIHdpbGwgYmUgYWRkZWQuXHJcbiAgICAgICAgICAgICAqIFRoaXMgYWxsb3dzIGZvciBjdXN0b20gbG9vayBhbmQgZmVlbCBmb3IgdmFyaW91cyB0eXBlcyBvZiBub3RpZmljYXRpb25zLlxyXG4gICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0gIHtTdHJpbmcgfCBET01FbGVtZW50fSAgICBbbWVzc2FnZT11bmRlZmluZWRdXHRcdE1lc3NhZ2UgdGV4dFxyXG4gICAgICAgICAgICAgKiBAcGFyYW0gIHtTdHJpbmd9ICAgICAgICAgICAgICAgICBbdHlwZT0nJ11cdFx0XHRcdFR5cGUgb2YgbG9nIG1lc3NhZ2VcclxuICAgICAgICAgICAgICogQHBhcmFtICB7U3RyaW5nfSAgICAgICAgICAgICAgICAgW3dhaXQ9JyddXHRcdFx0XHRUaW1lIChpbiBzZWNvbmRzKSB0byB3YWl0IGJlZm9yZSBhdXRvLWNsb3NlXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSAge0Z1bmN0aW9ufSAgICAgICAgICAgICAgIFtjYWxsYmFjaz11bmRlZmluZWRdXHRBIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGJlIGludm9rZWQgd2hlbiB0aGUgbG9nIGlzIGNsb3NlZC5cclxuICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBOb3RpZmljYXRpb24gb2JqZWN0LlxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgbm90aWZ5OiBmdW5jdGlvbiAobWVzc2FnZSwgdHlwZSwgd2FpdCwgY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBub3RpZmllci5jcmVhdGUodHlwZSwgY2FsbGJhY2spLnB1c2gobWVzc2FnZSwgd2FpdCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBDcmVhdGVzIGEgbmV3IG5vdGlmaWNhdGlvbiBtZXNzYWdlLlxyXG4gICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0gIHtTdHJpbmd9XHRcdFttZXNzYWdlPXVuZGVmaW5lZF1cdFx0TWVzc2FnZSB0ZXh0XHJcbiAgICAgICAgICAgICAqIEBwYXJhbSAge1N0cmluZ30gICAgIFt3YWl0PScnXVx0XHRcdFx0VGltZSAoaW4gc2Vjb25kcykgdG8gd2FpdCBiZWZvcmUgYXV0by1jbG9zZVxyXG4gICAgICAgICAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn1cdFtjYWxsYmFjaz11bmRlZmluZWRdXHRBIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGJlIGludm9rZWQgd2hlbiB0aGUgbG9nIGlzIGNsb3NlZC5cclxuICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBOb3RpZmljYXRpb24gb2JqZWN0LlxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgbWVzc2FnZTogZnVuY3Rpb24gKG1lc3NhZ2UsIHdhaXQsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbm90aWZpZXIuY3JlYXRlKG51bGwsIGNhbGxiYWNrKS5wdXNoKG1lc3NhZ2UsIHdhaXQpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQ3JlYXRlcyBhIG5ldyBub3RpZmljYXRpb24gbWVzc2FnZSBvZiB0eXBlICdzdWNjZXNzJy5cclxuICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICogQHBhcmFtICB7U3RyaW5nfVx0XHRbbWVzc2FnZT11bmRlZmluZWRdXHRcdE1lc3NhZ2UgdGV4dFxyXG4gICAgICAgICAgICAgKiBAcGFyYW0gIHtTdHJpbmd9ICAgICBbd2FpdD0nJ11cdFx0XHRcdFRpbWUgKGluIHNlY29uZHMpIHRvIHdhaXQgYmVmb3JlIGF1dG8tY2xvc2VcclxuICAgICAgICAgICAgICogQHBhcmFtICB7RnVuY3Rpb259XHRbY2FsbGJhY2s9dW5kZWZpbmVkXVx0QSBjYWxsYmFjayBmdW5jdGlvbiB0byBiZSBpbnZva2VkIHdoZW4gdGhlIGxvZyBpcyBjbG9zZWQuXHJcbiAgICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gTm90aWZpY2F0aW9uIG9iamVjdC5cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChtZXNzYWdlLCB3YWl0LCBjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vdGlmaWVyLmNyZWF0ZSgnc3VjY2VzcycsIGNhbGxiYWNrKS5wdXNoKG1lc3NhZ2UsIHdhaXQpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQ3JlYXRlcyBhIG5ldyBub3RpZmljYXRpb24gbWVzc2FnZSBvZiB0eXBlICdlcnJvcicuXHJcbiAgICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSAge1N0cmluZ31cdFx0W21lc3NhZ2U9dW5kZWZpbmVkXVx0XHRNZXNzYWdlIHRleHRcclxuICAgICAgICAgICAgICogQHBhcmFtICB7U3RyaW5nfSAgICAgW3dhaXQ9JyddXHRcdFx0XHRUaW1lIChpbiBzZWNvbmRzKSB0byB3YWl0IGJlZm9yZSBhdXRvLWNsb3NlXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSAge0Z1bmN0aW9ufVx0W2NhbGxiYWNrPXVuZGVmaW5lZF1cdEEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gYmUgaW52b2tlZCB3aGVuIHRoZSBsb2cgaXMgY2xvc2VkLlxyXG4gICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IE5vdGlmaWNhdGlvbiBvYmplY3QuXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKG1lc3NhZ2UsIHdhaXQsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbm90aWZpZXIuY3JlYXRlKCdlcnJvcicsIGNhbGxiYWNrKS5wdXNoKG1lc3NhZ2UsIHdhaXQpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQ3JlYXRlcyBhIG5ldyBub3RpZmljYXRpb24gbWVzc2FnZSBvZiB0eXBlICd3YXJuaW5nJy5cclxuICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICogQHBhcmFtICB7U3RyaW5nfVx0XHRbbWVzc2FnZT11bmRlZmluZWRdXHRcdE1lc3NhZ2UgdGV4dFxyXG4gICAgICAgICAgICAgKiBAcGFyYW0gIHtTdHJpbmd9ICAgICBbd2FpdD0nJ11cdFx0XHRcdFRpbWUgKGluIHNlY29uZHMpIHRvIHdhaXQgYmVmb3JlIGF1dG8tY2xvc2VcclxuICAgICAgICAgICAgICogQHBhcmFtICB7RnVuY3Rpb259XHRbY2FsbGJhY2s9dW5kZWZpbmVkXVx0QSBjYWxsYmFjayBmdW5jdGlvbiB0byBiZSBpbnZva2VkIHdoZW4gdGhlIGxvZyBpcyBjbG9zZWQuXHJcbiAgICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gTm90aWZpY2F0aW9uIG9iamVjdC5cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHdhcm5pbmc6IGZ1bmN0aW9uIChtZXNzYWdlLCB3YWl0LCBjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vdGlmaWVyLmNyZWF0ZSgnd2FybmluZycsIGNhbGxiYWNrKS5wdXNoKG1lc3NhZ2UsIHdhaXQpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogRGlzbWlzc2VzIGFsbCBvcGVuIG5vdGlmaWNhdGlvbnNcclxuICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgZGlzbWlzc0FsbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgbm90aWZpZXIuZGlzbWlzc0FsbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHZhciBhbGVydGlmeSA9IG5ldyBBbGVydGlmeSgpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgKiBBbGVydCBkaWFsb2cgZGVmaW5pdGlvblxyXG4gICAgKlxyXG4gICAgKiBpbnZva2VkIGJ5OlxyXG4gICAgKlx0YWxlcnRpZnkuYWxlcnQobWVzc2FnZSk7XHJcbiAgICAqXHRhbGVydGlmeS5hbGVydCh0aXRsZSwgbWVzc2FnZSk7XHJcbiAgICAqXHRhbGVydGlmeS5hbGVydChtZXNzYWdlLCBvbm9rKTtcclxuICAgICpcdGFsZXJ0aWZ5LmFsZXJ0KHRpdGxlLCBtZXNzYWdlLCBvbm9rKTtcclxuICAgICAqL1xyXG4gICAgYWxlcnRpZnkuZGlhbG9nKCdhbGVydCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBtYWluOiBmdW5jdGlvbiAoX3RpdGxlLCBfbWVzc2FnZSwgX29ub2spIHtcclxuICAgICAgICAgICAgICAgIHZhciB0aXRsZSwgbWVzc2FnZSwgb25vaztcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBfdGl0bGU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBfbWVzc2FnZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gX3RpdGxlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbm9rID0gX21lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGUgPSBfdGl0bGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBfbWVzc2FnZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGUgPSBfdGl0bGU7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IF9tZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgIG9ub2sgPSBfb25vaztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0KCd0aXRsZScsIHRpdGxlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0KCdtZXNzYWdlJywgbWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldCgnb25vaycsIG9ub2spO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogYWxlcnRpZnkuZGVmYXVsdHMuZ2xvc3Nhcnkub2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGtleXMuRVNDLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW52b2tlT25DbG9zZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogYWxlcnRpZnkuZGVmYXVsdHMudGhlbWUub2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIGZvY3VzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQ6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdDogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4aW1pemFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNpemFibGU6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYnVpbGQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vIG5vdGhpbmdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcHJlcGFyZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy9ub3RoaW5nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldE1lc3NhZ2U6IGZ1bmN0aW9uIChtZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldENvbnRlbnQobWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICBvbm9rOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXR0aW5nVXBkYXRlZDogZnVuY3Rpb24gKGtleSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGtleSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnbWVzc2FnZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRNZXNzYWdlKG5ld1ZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2xhYmVsJzpcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fX2ludGVybmFsLmJ1dHRvbnNbMF0uZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9faW50ZXJuYWwuYnV0dG9uc1swXS5lbGVtZW50LmlubmVySFRNTCA9IG5ld1ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uIChjbG9zZUV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuZ2V0KCdvbm9rJykgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmV0dXJuVmFsdWUgPSB0aGlzLmdldCgnb25vaycpLmNhbGwodGhpcywgY2xvc2VFdmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXR1cm5WYWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VFdmVudC5jYW5jZWwgPSAhcmV0dXJuVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG4gICAgLyoqXHJcbiAgICAgKiBDb25maXJtIGRpYWxvZyBvYmplY3RcclxuICAgICAqXHJcbiAgICAgKlx0YWxlcnRpZnkuY29uZmlybShtZXNzYWdlKTtcclxuICAgICAqXHRhbGVydGlmeS5jb25maXJtKG1lc3NhZ2UsIG9ub2spO1xyXG4gICAgICpcdGFsZXJ0aWZ5LmNvbmZpcm0obWVzc2FnZSwgb25vaywgb25jYW5jZWwpO1xyXG4gICAgICpcdGFsZXJ0aWZ5LmNvbmZpcm0odGl0bGUsIG1lc3NhZ2UsIG9ub2ssIG9uY2FuY2VsKTtcclxuICAgICAqL1xyXG4gICAgYWxlcnRpZnkuZGlhbG9nKCdjb25maXJtJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICB2YXIgYXV0b0NvbmZpcm0gPSB7XHJcbiAgICAgICAgICAgIHRpbWVyOiBudWxsLFxyXG4gICAgICAgICAgICBpbmRleDogbnVsbCxcclxuICAgICAgICAgICAgdGV4dDogbnVsbCxcclxuICAgICAgICAgICAgZHVyYXRpb246IG51bGwsXHJcbiAgICAgICAgICAgIHRhc2s6IGZ1bmN0aW9uIChldmVudCwgc2VsZikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuaXNPcGVuKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLl9faW50ZXJuYWwuYnV0dG9uc1thdXRvQ29uZmlybS5pbmRleF0uZWxlbWVudC5pbm5lckhUTUwgPSBhdXRvQ29uZmlybS50ZXh0ICsgJyAoJiM4MjA3OycgKyBhdXRvQ29uZmlybS5kdXJhdGlvbiArICcmIzgyMDc7KSAnO1xyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Db25maXJtLmR1cmF0aW9uIC09IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGF1dG9Db25maXJtLmR1cmF0aW9uID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhckF1dG9Db25maXJtKHNlbGYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYnV0dG9uID0gc2VsZi5fX2ludGVybmFsLmJ1dHRvbnNbYXV0b0NvbmZpcm0uaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2xvc2VFdmVudCA9IGNyZWF0ZUNsb3NlRXZlbnQoYXV0b0NvbmZpcm0uaW5kZXgsIGJ1dHRvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHNlbGYuY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY2FsbGJhY2suYXBwbHkoc2VsZiwgW2Nsb3NlRXZlbnRdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2Nsb3NlIHRoZSBkaWFsb2cuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbG9zZUV2ZW50LmNsb3NlICE9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhckF1dG9Db25maXJtKHNlbGYpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2xlYXJBdXRvQ29uZmlybShzZWxmKSB7XHJcbiAgICAgICAgICAgIGlmIChhdXRvQ29uZmlybS50aW1lciAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChhdXRvQ29uZmlybS50aW1lcik7XHJcbiAgICAgICAgICAgICAgICBhdXRvQ29uZmlybS50aW1lciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9faW50ZXJuYWwuYnV0dG9uc1thdXRvQ29uZmlybS5pbmRleF0uZWxlbWVudC5pbm5lckhUTUwgPSBhdXRvQ29uZmlybS50ZXh0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzdGFydEF1dG9Db25maXJtKHNlbGYsIGluZGV4LCBkdXJhdGlvbikge1xyXG4gICAgICAgICAgICBjbGVhckF1dG9Db25maXJtKHNlbGYpO1xyXG4gICAgICAgICAgICBhdXRvQ29uZmlybS5kdXJhdGlvbiA9IGR1cmF0aW9uO1xyXG4gICAgICAgICAgICBhdXRvQ29uZmlybS5pbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICBhdXRvQ29uZmlybS50ZXh0ID0gc2VsZi5fX2ludGVybmFsLmJ1dHRvbnNbaW5kZXhdLmVsZW1lbnQuaW5uZXJIVE1MO1xyXG4gICAgICAgICAgICBhdXRvQ29uZmlybS50aW1lciA9IHNldEludGVydmFsKGRlbGVnYXRlKHNlbGYsIGF1dG9Db25maXJtLnRhc2spLCAxMDAwKTtcclxuICAgICAgICAgICAgYXV0b0NvbmZpcm0udGFzayhudWxsLCBzZWxmKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBtYWluOiBmdW5jdGlvbiAoX3RpdGxlLCBfbWVzc2FnZSwgX29ub2ssIF9vbmNhbmNlbCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRpdGxlLCBtZXNzYWdlLCBvbm9rLCBvbmNhbmNlbDtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBfdGl0bGU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IF90aXRsZTtcclxuICAgICAgICAgICAgICAgICAgICBvbm9rID0gX21lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IF90aXRsZTtcclxuICAgICAgICAgICAgICAgICAgICBvbm9rID0gX21lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgb25jYW5jZWwgPSBfb25vaztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZSA9IF90aXRsZTtcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gX21lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgb25vayA9IF9vbm9rO1xyXG4gICAgICAgICAgICAgICAgICAgIG9uY2FuY2VsID0gX29uY2FuY2VsO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXQoJ3RpdGxlJywgdGl0bGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXQoJ21lc3NhZ2UnLCBtZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0KCdvbm9rJywgb25vayk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldCgnb25jYW5jZWwnLCBvbmNhbmNlbCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBhbGVydGlmeS5kZWZhdWx0cy5nbG9zc2FyeS5vayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleToga2V5cy5FTlRFUixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogYWxlcnRpZnkuZGVmYXVsdHMudGhlbWUub2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IGFsZXJ0aWZ5LmRlZmF1bHRzLmdsb3NzYXJ5LmNhbmNlbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleToga2V5cy5FU0MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnZva2VPbkNsb3NlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBhbGVydGlmeS5kZWZhdWx0cy50aGVtZS5jYW5jZWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIGZvY3VzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQ6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdDogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4aW1pemFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNpemFibGU6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYnVpbGQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vbm90aGluZ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwcmVwYXJlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvL25vdGhpbmdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0TWVzc2FnZTogZnVuY3Rpb24gKG1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0Q29udGVudChtZXNzYWdlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBsYWJlbHM6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBvbm9rOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgb25jYW5jZWw6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0Rm9jdXM6IG51bGwsXHJcbiAgICAgICAgICAgICAgICByZXZlcnNlQnV0dG9uczogbnVsbCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0dGluZ1VwZGF0ZWQ6IGZ1bmN0aW9uIChrZXksIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChrZXkpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ21lc3NhZ2UnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TWVzc2FnZShuZXdWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdsYWJlbHMnOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgnb2snIGluIG5ld1ZhbHVlICYmIHRoaXMuX19pbnRlcm5hbC5idXR0b25zWzBdLmVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX2ludGVybmFsLmJ1dHRvbnNbMF0udGV4dCA9IG5ld1ZhbHVlLm9rO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9faW50ZXJuYWwuYnV0dG9uc1swXS5lbGVtZW50LmlubmVySFRNTCA9IG5ld1ZhbHVlLm9rO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJ2NhbmNlbCcgaW4gbmV3VmFsdWUgJiYgdGhpcy5fX2ludGVybmFsLmJ1dHRvbnNbMV0uZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9faW50ZXJuYWwuYnV0dG9uc1sxXS50ZXh0ID0gbmV3VmFsdWUuY2FuY2VsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9faW50ZXJuYWwuYnV0dG9uc1sxXS5lbGVtZW50LmlubmVySFRNTCA9IG5ld1ZhbHVlLmNhbmNlbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdyZXZlcnNlQnV0dG9ucyc6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudHMuYnV0dG9ucy5wcmltYXJ5LmFwcGVuZENoaWxkKHRoaXMuX19pbnRlcm5hbC5idXR0b25zWzBdLmVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudHMuYnV0dG9ucy5wcmltYXJ5LmFwcGVuZENoaWxkKHRoaXMuX19pbnRlcm5hbC5idXR0b25zWzFdLmVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2RlZmF1bHRGb2N1cyc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX2ludGVybmFsLmZvY3VzLmVsZW1lbnQgPSBuZXdWYWx1ZSA9PT0gJ29rJyA/IDAgOiAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24gKGNsb3NlRXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGNsZWFyQXV0b0NvbmZpcm0odGhpcyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmV0dXJuVmFsdWU7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGNsb3NlRXZlbnQuaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuZ2V0KCdvbm9rJykgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSB0aGlzLmdldCgnb25vaycpLmNhbGwodGhpcywgY2xvc2VFdmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmV0dXJuVmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZUV2ZW50LmNhbmNlbCA9ICFyZXR1cm5WYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuZ2V0KCdvbmNhbmNlbCcpID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblZhbHVlID0gdGhpcy5nZXQoJ29uY2FuY2VsJykuY2FsbCh0aGlzLCBjbG9zZUV2ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXR1cm5WYWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlRXZlbnQuY2FuY2VsID0gIXJldHVyblZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhdXRvT2s6IGZ1bmN0aW9uIChkdXJhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgc3RhcnRBdXRvQ29uZmlybSh0aGlzLCAwLCBkdXJhdGlvbik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYXV0b0NhbmNlbDogZnVuY3Rpb24gKGR1cmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBzdGFydEF1dG9Db25maXJtKHRoaXMsIDEsIGR1cmF0aW9uKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG4gICAgLyoqXHJcbiAgICAgKiBQcm9tcHQgZGlhbG9nIG9iamVjdFxyXG4gICAgICpcclxuICAgICAqIGludm9rZWQgYnk6XHJcbiAgICAgKlx0YWxlcnRpZnkucHJvbXB0KG1lc3NhZ2UpO1xyXG4gICAgICpcdGFsZXJ0aWZ5LnByb21wdChtZXNzYWdlLCB2YWx1ZSk7XHJcbiAgICAgKlx0YWxlcnRpZnkucHJvbXB0KG1lc3NhZ2UsIHZhbHVlLCBvbm9rKTtcclxuICAgICAqXHRhbGVydGlmeS5wcm9tcHQobWVzc2FnZSwgdmFsdWUsIG9ub2ssIG9uY2FuY2VsKTtcclxuICAgICAqXHRhbGVydGlmeS5wcm9tcHQodGl0bGUsIG1lc3NhZ2UsIHZhbHVlLCBvbm9rLCBvbmNhbmNlbCk7XHJcbiAgICAgKi9cclxuICAgIGFsZXJ0aWZ5LmRpYWxvZygncHJvbXB0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0lOUFVUJyk7XHJcbiAgICAgICAgdmFyIHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdQJyk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbWFpbjogZnVuY3Rpb24gKF90aXRsZSwgX21lc3NhZ2UsIF92YWx1ZSwgX29ub2ssIF9vbmNhbmNlbCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRpdGxlLCBtZXNzYWdlLCB2YWx1ZSwgb25vaywgb25jYW5jZWw7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gX3RpdGxlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBfdGl0bGU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBfbWVzc2FnZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gX3RpdGxlO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gX21lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgb25vayA9IF92YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gX3RpdGxlO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gX21lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgb25vayA9IF92YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBvbmNhbmNlbCA9IF9vbm9rO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlID0gX3RpdGxlO1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBfbWVzc2FnZTtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IF92YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBvbm9rID0gX29ub2s7XHJcbiAgICAgICAgICAgICAgICAgICAgb25jYW5jZWwgPSBfb25jYW5jZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldCgndGl0bGUnLCB0aXRsZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldCgnbWVzc2FnZScsIG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXQoJ3ZhbHVlJywgdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXQoJ29ub2snLCBvbm9rKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0KCdvbmNhbmNlbCcsIG9uY2FuY2VsKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXR1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBidXR0b25zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IGFsZXJ0aWZ5LmRlZmF1bHRzLmdsb3NzYXJ5Lm9rLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBrZXlzLkVOVEVSLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBhbGVydGlmeS5kZWZhdWx0cy50aGVtZS5vayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogYWxlcnRpZnkuZGVmYXVsdHMuZ2xvc3NhcnkuY2FuY2VsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBrZXlzLkVTQyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludm9rZU9uQ2xvc2U6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IGFsZXJ0aWZ5LmRlZmF1bHRzLnRoZW1lLmNhbmNlbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgZm9jdXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudDogaW5wdXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhpbWl6YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc2l6YWJsZTogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBidWlsZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaW5wdXQuY2xhc3NOYW1lID0gYWxlcnRpZnkuZGVmYXVsdHMudGhlbWUuaW5wdXQ7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dCcpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSB0aGlzLmdldCgndmFsdWUnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudHMuY29udGVudC5hcHBlbmRDaGlsZChwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudHMuY29udGVudC5hcHBlbmRDaGlsZChpbnB1dCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHByZXBhcmU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vbm90aGluZ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXRNZXNzYWdlOiBmdW5jdGlvbiAobWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyQ29udGVudHMocCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcC5pbm5lckhUTUwgPSBtZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChtZXNzYWdlIGluc3RhbmNlb2Ygd2luZG93LkhUTUxFbGVtZW50ICYmIHAuZmlyc3RDaGlsZCAhPT0gbWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyQ29udGVudHMocCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcC5hcHBlbmRDaGlsZChtZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgIGxhYmVsczogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgb25vazogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgb25jYW5jZWw6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiAnJyxcclxuICAgICAgICAgICAgICAgIHR5cGU6J3RleHQnLFxyXG4gICAgICAgICAgICAgICAgcmV2ZXJzZUJ1dHRvbnM6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0dGluZ1VwZGF0ZWQ6IGZ1bmN0aW9uIChrZXksIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChrZXkpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ21lc3NhZ2UnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TWVzc2FnZShuZXdWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICd2YWx1ZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBuZXdWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3R5cGUnOlxyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAobmV3VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICd0ZXh0JzpcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdjb2xvcic6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnZGF0ZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnZGF0ZXRpbWUtbG9jYWwnOlxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2VtYWlsJzpcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdtb250aCc6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdwYXNzd29yZCc6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnc2VhcmNoJzpcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICd0ZWwnOlxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3RpbWUnOlxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3dlZWsnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC50eXBlID0gbmV3VmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LnR5cGUgPSAndGV4dCc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2xhYmVscyc6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ld1ZhbHVlLm9rICYmIHRoaXMuX19pbnRlcm5hbC5idXR0b25zWzBdLmVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX2ludGVybmFsLmJ1dHRvbnNbMF0uZWxlbWVudC5pbm5lckhUTUwgPSBuZXdWYWx1ZS5vaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ld1ZhbHVlLmNhbmNlbCAmJiB0aGlzLl9faW50ZXJuYWwuYnV0dG9uc1sxXS5lbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19pbnRlcm5hbC5idXR0b25zWzFdLmVsZW1lbnQuaW5uZXJIVE1MID0gbmV3VmFsdWUuY2FuY2VsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3JldmVyc2VCdXR0b25zJzpcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmV3VmFsdWUgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5idXR0b25zLnByaW1hcnkuYXBwZW5kQ2hpbGQodGhpcy5fX2ludGVybmFsLmJ1dHRvbnNbMF0uZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5idXR0b25zLnByaW1hcnkuYXBwZW5kQ2hpbGQodGhpcy5fX2ludGVybmFsLmJ1dHRvbnNbMV0uZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24gKGNsb3NlRXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXR1cm5WYWx1ZTtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoY2xvc2VFdmVudC5pbmRleCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MudmFsdWUgPSBpbnB1dC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuZ2V0KCdvbm9rJykgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSB0aGlzLmdldCgnb25vaycpLmNhbGwodGhpcywgY2xvc2VFdmVudCwgdGhpcy5zZXR0aW5ncy52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmV0dXJuVmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZUV2ZW50LmNhbmNlbCA9ICFyZXR1cm5WYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuZ2V0KCdvbmNhbmNlbCcpID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblZhbHVlID0gdGhpcy5nZXQoJ29uY2FuY2VsJykuY2FsbCh0aGlzLCBjbG9zZUV2ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXR1cm5WYWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlRXZlbnQuY2FuY2VsID0gIXJldHVyblZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFjbG9zZUV2ZW50LmNhbmNlbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbHVlID0gdGhpcy5zZXR0aW5ncy52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQ29tbW9uSlNcclxuICAgIGlmICggdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0JyApIHtcclxuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGFsZXJ0aWZ5O1xyXG4gICAgLy8gQU1EXHJcbiAgICB9IGVsc2UgaWYgKCB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcclxuICAgICAgICBkZWZpbmUoIFtdLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhbGVydGlmeTtcclxuICAgICAgICB9ICk7XHJcbiAgICAvLyB3aW5kb3dcclxuICAgIH0gZWxzZSBpZiAoICF3aW5kb3cuYWxlcnRpZnkgKSB7XHJcbiAgICAgICAgd2luZG93LmFsZXJ0aWZ5ID0gYWxlcnRpZnk7XHJcbiAgICB9XHJcblxyXG59ICggdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiB0aGlzICkgKTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2FsZXJ0aWZ5anMvYnVpbGQvYWxlcnRpZnkuanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAxIl0sInNvdXJjZVJvb3QiOiIifQ==