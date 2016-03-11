function setSearchItem(_searchItem) {
    grabRemoteImages(_searchItem);
}

$(function() {

    window.grabRemoteImages = function grabRemoteImages(_search) {
        var API_KEY = '1496184-d38dc287ea5160f8806d04508';
        $.getJSON("https://pixabay.com/api/?key=" + API_KEY + "&q=" + _search + "&image_type=photo&pretty=false", function(data) {

            for (var i = 0; i < data.hits.length; i++) {
                
                if (i <= 50) {

                    console.log("Width: " + data.hits[i].webformatWidth + " | Height: " + data.hits[i].webformatHeight + " | Count: " + i);

                    var _itemWidth = data.hits[i].webformatWidth;
                    var _itemHeight = data.hits[i].webformatHeight;

                    if ((_itemWidth >= '400' || _itemWidth <= '1000') && (_itemHeight >= '200' || _itemHeight <= '800')) {
                        $("#image-bay").append("<div class='col-lg-3 col-md-4 col-xs-6 thumb'><a class='thumbnail' href='#'><img id='img" + (i + 1) + "' class='img-rounded' src='' alt=''></a></div>");
                        document.getElementById("img" + (i + 1)).src = data.hits[i].webformatURL;
                        $("#img" + (i + 1)).addClass('animated jello').delay(500);
                        
                    }
                    
                    document.getElementById("img-count").innerHTML = i;

                }
            }
            // if (parseInt(data.totalHits) > 0)
            //     $.each(data.hits, function(i, hit) {
            //         console.log(hit.previewWidth);

            //         imageArray.push(hit.previewWidth);
            //     });
            // else {
            //     console.log('No hits');
            // }

        });
    }

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