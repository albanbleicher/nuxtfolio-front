import Vue from "vue";
const locomotiveScroll = require("locomotive-scroll");

Object.defineProperty(Vue.prototype, "locomotiveScroll", {
  value: locomotiveScroll
});
