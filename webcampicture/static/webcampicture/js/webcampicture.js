const Webcam = function(fieldName, initialValue, options) {
    this.fieldName = fieldName;
    this.initialValue = initialValue;

    var defaults = {
        width: 320,
        height: 240
    };
    this.options = $.extend(defaults, options);

    this.streaming = false;
    
    this.camera = document.getElementById('camera_' + this.fieldName);
    this.camera_icon_container = document.getElementById('camera_icon_container_' + this.fieldName);
    this.output = document.getElementById('output_' + this.fieldName);
    this.video = document.getElementById('video_' + this.fieldName);
    this.canvas = document.getElementById('canvas_' + this.fieldName);
    this.picture_preview = document.getElementById('picture_preview_' + this.fieldName);
    this.field = document.getElementById('' + this.fieldName);

    this.init();
}

Webcam.prototype = {
    init: function() {
        this.requestCameraAccess();
        this.setupVideoStream();
        this.registerEventToTakePicture();
        this.setInitialValue();
    },


    requestCameraAccess: function() {
        var self = this;

        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(function(stream) {
            self.video.srcObject = stream;
            self.video.play();
        })
        .catch(function(err) {
            console.log("Error: " + err);
        });
    },


    setupVideoStream: function() {
        var self = this;

        self.video.addEventListener('canplay', function(ev){
            if (!self.streaming) {
                self.video.setAttribute('width', self.options.width);
                self.video.setAttribute('height', self.optionsheight);
                self.canvas.setAttribute('width', self.options.width);
                self.canvas.setAttribute('height', self.options.height);
                self.streaming = true;
            }
        }, false);
    },


    registerEventToTakePicture: function() {
        var self = this;

        self.camera.addEventListener('click', function(ev){
            var context = self.canvas.getContext('2d');

            if (self.options.width && self.options.height) {
                self.canvas.width = self.options.width;
                self.canvas.height = self.options.height;
                context.drawImage(self.video, 0, 0, self.options.width, self.options.height);
            }
    
            var data = self.canvas.toDataURL('image/png');
            
            self.picture_preview.setAttribute('src', data);
            self.field.value = data;
    
            ev.preventDefault();
        }, false);
    },


    setInitialValue: function() {
        var self = this;

        if (self.initialValue) {
            self.picture_preview.setAttribute('src', self.initialValue);
            self.field.value = self.initialValue;
        }
    }
}