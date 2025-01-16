
let allNews = JSON.parse(localStorage.getItem("allNews"));

$(()=>{

    // console.log(allNews)
    $.each(allNews, function(index,news) {

        // console.log(news);
        $(".news-container").append(news);
    });

    let likes = document.querySelectorAll(".fa-heart");



    likes.forEach((like) => {
        like.addEventListener('click', (e) => {
            if(!like.classList.contains("text-red-600")) {
                e.target.classList.add("text-red-600");
            }else {
                e.target.classList.remove("text-red-600");
            }
       
        });
      })

      let divNews = document.querySelectorAll(".news");

      divNews.forEach((news) => {
        console.log(news.id)
        news.querySelector(".fa-pencil").addEventListener('click', ()=> {
            window.location.href = `../pages/news_editor.html?newsId=${encodeURIComponent(news.id)}`
        })
      });

})




