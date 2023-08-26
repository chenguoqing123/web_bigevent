//每次调用$.get/$.post/$.ajax都会先调用这个函数
//这个函数可以拿到我们给ajax配置的对象
$.ajaxPrefilter(function(options){
options.url = 'http://www.liulongbin.top:3007' + options.url
})