
let allNews = JSON.parse(localStorage.getItem("allNews"));

$(()=>{


    // console.log(allNews)
    if(allNews) {
      $.each(allNews, function(index,news) {

          // console.log(news);

          function printNewsContent(rows) {
              let html = '';

              rows.forEach(row => {
                if (Array.isArray(row)) { // Verifica si 'row' es un arreglo
                  let newRow = '<div class="flex flex-col>';
                  row.forEach(column => { 
                    newRow += column.length > 1 ? `<div class="column half">` : `<div class="column">`;
                    column.forEach(element => {
                      if (element.type === "paragraph") {
                        newRow += `
                          <div class="element">
                            <p>${element.content}</p>
                          </div>
                        `;
                      } else if (element.type === "image") {
                        newRow += `
                          <div class="element">
                            <img class="hidden" src="${element.src}" alt="Imagen">
                          </div>
                        `;
                      }
                    });
                    newRow += `</div>`;
                  });
                  
                  html += newRow;
                } 
              });
            
              return html;
            }

          let newsToPrint = `
                      <div class="news news-style" id="${news[0]}"> 
                      <a href="./dins_noticia.html"><h4 class="font-bold  text-center text-xl intermidium:mb-2 intermidium:px-2 ">${news[1]}</h4></a> 
                      <div class="w-72 tablet:w-3/5  intermidium:w-full">
                          <a href="./dins_noticia.html"><img class="rounded-md h-40 tablet:h-44 news-image" src="../Assets/Imgs/trastall_balena.JPG" alt="news 1"></a>
                      </div>
                      <div class="flex flex-col w-11/12 h-full intermidium:w-full intermidium:h-52" >
                          <div class="flex flex-col gap-2 items-center w-full h-44 ">
                              <div class="flex flex-col overflow-hidden rounded-md p-1.5 intermidium:p-3 w-full text-pretty news_content">
                                  ${printNewsContent(news[4])}           
                              </div>
                              <a href="./dins_noticia.html"><button class=" text-center button-style">Llegir Mes</button></a>
                          </div>
                          <div class="flex justify-between text-lg items-center intermidium:p-1 intermidium:px-2">
                              <i class="fa fa-user-circle-o" aria-hidden="true"> ${news[2]}</i>
                              <div>
                                  <i class="fa fa-pencil cursor-pointer" aria-hidden="true"></i>
                                  <i class="fa fa-heart" aria-hidden="true"></i>
                              </div>
                          </div>
                      </div>
                  </div>
              `;

          $(".news-container").append(newsToPrint);
      });
  }else {
    console.log("allNews empty")
  }

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




