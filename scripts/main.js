"use strict";
var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-title="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = "hidden-detail";
var TINY_EFFECT_CLASS = "is-tiny";
var ESC_KEY = 27;

function setDetails(imageURL, titleText) {
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute("src", imageURL);
  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}
function imageFromThumb(thumbnail) {
  return thumbnail.getAttribute("data-image-url");
}
function titleFromThumb(thumbnail) {
  return thumbnail.getAttribute("data-image-title");
}
function setDetailsFromThumb(thumbnail) {
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}
function addThumbCLickHandler(thumb) {
  thumb.addEventListener("click", function(event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
    showDetails();
  });
}
function getThumbnailsArray() {
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}
function hideDetails() {
  document.body.classList.add(HIDDEN_DETAIL_CLASS);
}
function showDetails() {
  var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
  document.body.classList.remove(HIDDEN_DETAIL_CLASS);
  frame.classList.add(TINY_EFFECT_CLASS);
  setTimeout(function() {
    frame.classList.remove(TINY_EFFECT_CLASS);
  }, 5000);
}
function addKeyPressHandler() {
  document.body.addEventListener("keyup", function(event) {
    event.preventDefault();
    console.log(event.keyCode);
    if (event.keyCode === ESC_KEY) {
      console.log("escape key hit");
      hideDetails();
    }
  });
}
function initializeEvents() {
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbCLickHandler);
  addKeyPressHandler();
}
initializeEvents();
