let allNews = JSON.parse(localStorage.getItem("allNews"));

$(()=>{

    // console.log(allNews)
    $.each(allNews, function(index,news) {

        // console.log(news);
        $(".news-container").append(news);
    });

   

})