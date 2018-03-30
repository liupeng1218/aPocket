(function(window,undefined){


    /**
     * 加载单个图片
     */
    function loading( src, callback ){
        var img = new Image();
        img.src = src;
        img.onload = function(){
            callback()
        }
    };
    

    //every是计算进度的回调函数，callback是全部加载完毕的回调函数
    /**
     * 加载数组图片
     * @param {Object} imgArray
     * @param {Object} callback
     * @param {Object} index
     */
    function loadImages( imgArray, every, callback){
        var len = imgArray.length;
        var count = len;
        var loaded = 0;

        if(!callback){
            callback = every;
            every = undefined;
        }

        while(count--){
            var img = imgArray[count];
            loading(img,function () {
                loaded++;
                every && every(loaded,len);
                // var text = parseInt(loaded/len *100)  + "%";
                // changeBar(text);
                if(loaded === len){
                    callback();
                    //return;
                }

            })
        }
    }
 
    //var $loadingbar = $( ".loadFont" );
    /**
     * 加载中进度条改变的函数
     */
    // function changeBar(text){
    //     $loadingbar.text(text);
    // }

    // window.helper = window.helper || {};
    // window.helper.loadImages = loadImages;

    window.loadImages = loadImages;

    /**
     * 执行加载数组图片
     */
     //changeBar(0);
    // loadImages(img,function(){
    //     console.log(0);
    // });
     
})(window);






