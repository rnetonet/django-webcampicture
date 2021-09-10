const Webcam = function (fieldName, initialValue, width=320, height=240) {
  this.fieldName = fieldName;
  this.initialValue = initialValue;
  this.width = width;
  this.height = height;

  this.streaming = false;

  this.video = document.getElementById("video_" + this.fieldName);
  this.canvas = document.getElementById("canvas_" + this.fieldName);
  this.picture_preview = document.getElementById("picture_preview_" + this.fieldName);
  this.field = document.getElementById("" + this.fieldName);

  this.init();
};

Webcam.prototype = {
  init: function () {
    this.requestCameraAccess();
    this.setupVideoStream();
    this.registerEvents();
    this.setInitialValue();
  },

  requestCameraAccess: function () {
    var self = this;

    navigator.mediaDevices
      .getUserMedia({video: true, audio: false})
      .then(function (stream) {
        self.video.srcObject = stream;
        self.video.play();
      })
      .catch(function (err) {
        console.log("Error: " + err);
      });
  },

  setupVideoStream: function () {
    var self = this;

    self.video.addEventListener(
      "canplay",
      function (ev) {
        if (!self.streaming) {
          self.video.setAttribute("width", self.width);
          self.video.setAttribute("height", self.height);
          self.canvas.setAttribute("width", self.width);
          self.canvas.setAttribute("height", self.height);
          self.streaming = true;
        }
      },
      false
    );
  },

  _showVideo: function () {
    var self = this;

    self.video.play();
    self.picture_preview.style.display = "none";
    self.video.style.display = "block";
  },

  _showPreview: function () {
    var self = this;

    if (! self.picture_preview.src)
      return;

    self.video.pause();
    self.video.style.display = "none";
    self.picture_preview.style.display = "block";
  },

  registerEvents: function () {
    var self = this;

    self.video.addEventListener(
      "click",
      function (ev) {
        var context = self.canvas.getContext("2d");

        if (self.width && self.height) {
          self.canvas.width = self.width;
          self.canvas.height = self.height;
          context.drawImage(self.video, 0, 0, self.width, self.height);
        }

        var data = self.canvas.toDataURL("image/png");

        self.picture_preview.setAttribute("src", data);
        self.field.value = data;
        
        self._showPreview();
      },
      false
    );

    self.picture_preview.addEventListener("mouseenter", function (ev) {
      self._showVideo();
    });

    self.video.addEventListener("mouseleave", function (ev) {
      self._showPreview();
    });
  },

  setInitialValue: function () {
    var self = this;

    if (self.initialValue) {
      self.picture_preview.setAttribute("src", self.initialValue);
      self.field.value = self.initialValue;

      self._showPreview();
    } else {
      self._showVideo();
    }
  },
};
