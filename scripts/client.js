function setSearchItem(_searchItem) {
    grabRemoteImages(_searchItem);
}

/*
*  Takes any string and pulls out the whole number only.
*  - No splitting occurs so all numbers are concatenated into 1 large number.
*/
window.getWholeNumberFromString = function getWholeNumberFromString(_val) {
    var output = '';
    
    for (var i = 0; i < _val.length; i++) {
        for (var b = 0; b < _val[i].length; b++) {
            if ( !_val[i].charAt(b).match(/[^,$\d]/) ) {
                output = output.concat("" + _val[i]);
            }
        }
    
    }
    
    return output;
}

// DOM READY - Section
$(function() {
    var holdLargeImages = [];

    window.grabRemoteImages = function grabRemoteImages(_search) {
        var API_KEY1 = '1496184-d38dc287ea5160f8806d04508';
        $.getJSON("https://pixabay.com/api/?key=" + API_KEY1 + "&q=" + _search + "&image_type=photo&pretty=false", function(data) {

            for (var i = 0; i < data.hits.length; i++) {

                if (i <= 50) {

                    //console.log("Width: " + data.hits[i].webformatWidth + " | Height: " + data.hits[i].webformatHeight + " | Count: " + i);
                    
                    // console.log("Large image url: " + data.hits[i].imageURL);

                    var _itemWidth = data.hits[i].webformatWidth;
                    var _itemHeight = data.hits[i].webformatHeight;


                    if ((_itemWidth >= '400' || _itemWidth <= '1000') && (_itemHeight >= '200' || _itemHeight <= '800')) {
                        $("#image-bay").append("<div class='col-lg-3 col-md-4 col-xs-6 thumb'><a class='thumbnail' href='#'><img id='img" + (i + 1) + "' class='img-rounded pic-sel' src='' alt='' data-toggle='modal' data-target='#lightbox' ></a></div>");
                        document.getElementById("img" + (i + 1)).src = data.hits[i].webformatURL;
                        $("#img" + (i + 1)).addClass('animated jello').delay(500);


                        $(".carousel-inner").append("<div class='item'><img id='sel-img" + (i + 1) + "' src='" + data.hits[i].webformatURL + "'></div>");


                    }

                    document.getElementById("img-count").innerHTML = i;


                }
            }

            // Selecting any image identifies that image as the active pic in the image slider
            $('img').click(function() {

                var selectedImgID = $(this).attr('id');
                var selectedImageNumber = getWholeNumberFromString(selectedImgID);
                // console.log("selectedImageNumber: " + selectedImageNumber);
                // console.log("Image click: " + $(this).attr('id') + " | Image to show: sel-" + selectedImgID);
                
                $('.item').removeClass('active');
                
                $('#sel-img' + selectedImageNumber).parent().addClass('active');
            });



        });
    }

    // Main Logo animation on mouseover.
    $("#head").mouseenter(function() {
        $(this).animate({
            letterSpacing: "+=15px"
        });
    });
    $("#head").mouseout(function() {
        $(this).animate({
            letterSpacing: "-=15px"
        });
    });
});