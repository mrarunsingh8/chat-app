(function () {
    window.addEventListener('load', function(e) {
        window.applicationCache.addEventListener('updateready', function(e) {
            if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
                window.applicationCache.update();
                window.applicationCache.swapCache();
            }
        }, false);
        window.applicationCache.addEventListener('noupdate', function(e){
            // start your app here
            console.log("no update Goes here.");
        }, false);
        window.applicationCache.addEventListener('cached', function(e){
            // start your app here
            console.log("cached Goes here.");
        }, false);

        window.applicationCache.addEventListener('error', function(e){
            console.log(arguments);
        }, false);

    }, false);



    function loadDeferredStyles(){
        var addStylesNode = document.getElementsByClassName("deferred-styles");
        var replacement = document.createElement("div");
        replacement.innerHTML = '';
        for (var i = 0; i < addStylesNode.length; i++) {
            replacement.innerHTML += addStylesNode[i].textContent;
        }
        if((replacement.innerHTML).trim() != ''){
            setTimeout(function(){
                document.body.innerHTML += replacement.innerHTML;
            },0);
        }
    }
    var raf = requestAnimationFrame || mozRequestAnimationFrame ||
        webkitRequestAnimationFrame || msRequestAnimationFrame;
    if (raf) raf(function() { window.setTimeout(loadDeferredStyles, 0); });
    else window.addEventListener('DOMContentLoaded', loadDeferredStyles);
})();


(function ($) {
    $(document).ready(function(){
        $(".submenu > a").click(function(e) {
            e.preventDefault();
            var $li = $(this).parent("li");
            var $ul = $(this).next("ul");

            if($li.hasClass("open")) {
                $ul.slideUp(350);
                $li.removeClass("open");
            } else {
                $(".nav > li > ul").slideUp(350);
                $(".nav > li").removeClass("open");
                $ul.slideDown(350);
                $li.addClass("open");
            }
        });
    });

    /*$("#input-image-upload").inputfile({
        uploadText: '<span class="glyphicon glyphicon-upload"></span> Select a file',
        removeText: '<span class="glyphicon glyphicon-trash"></span>',
        restoreText: '<span class="glyphicon glyphicon-remove"></span>',

        uploadButtonClass: 'btn btn-primary',
        removeButtonClass: 'btn btn-default'
    });*/
    if($('#input-image-upload').length){
        $('#input-image-upload').filestyle({
            onChange: function (param, elm) {
                var formData = new FormData();
                formData.append("file", elm[0].files[0]);
                $.ajax({
                    url: configData.baseUrl+'/upload',
                    type: 'POST',
                    cache : false,
                    enctype: 'multipart/form-data',
                    processData: false,
                    contentType: false,
                    dataType : 'json',
                    data: formData,
                    beforeSend:function () {

                    },
                    success:function (res) {
                        $(elm.attr("target")).val(res.fileData.filename);
                    }
                });
            }
        });
    }
})(jQuery);