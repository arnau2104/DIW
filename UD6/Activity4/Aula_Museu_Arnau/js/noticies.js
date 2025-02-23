import { getNews,onSnapshot,collection,db,deleteNews } from "./firebase.js";
let userLoged = JSON.parse(localStorage.getItem('userLoged'));





$(()=>{

        function printNews() {
          onSnapshot(collection(db,"news"),  (querySnapshot)=> {
            let newsToPrint = "";
            querySnapshot.forEach((doc) => {
                
            
                    const news = doc.data();
                    
              if(news.status == "1"){
                      newsToPrint += `
                      <div class="news news-style" id="${doc.id}"> 
                      <h4 class="font-bold  text-center text-xl intermidium:mb-2 intermidium:px-2 cursor-pointer news-title">${news.news_title}</h4>
                      <div class="w-72 tablet:w-3/5  intermidium:w-full">
                          <img class="div-news-image rounded-md h-40 tablet:h-44" src=${news.news_cover} alt="news 1">
                      </div>
                      <div class="flex flex-col w-11/12 h-full intermidium:w-full intermidium:h-52" >
                          <div class="flex flex-col gap-2 items-center w-full h-44 ">
                              <div class="flex flex-col overflow-hidden rounded-md p-1.5 intermidium:p-3 w-full text-pretty news_content">
                                  ${printNewsContent(JSON.parse(news.news_content))}           
                              </div>
                            <button class=" text-center button-style llegir-mes">Llegir Mes</button>
                          </div>
                          <div class="flex justify-between text-lg items-center intermidium:p-1 intermidium:px-2">
                              <i class="fa fa-user-circle-o" aria-hidden="true"> ${news.autor}</i>
                              <div>
                              ${userLoged && userLoged[1].edit_news == 1 ?                          
                                 ` <i class="fa fa-pencil cursor-pointer" aria-hidden="true"></i>
                                  <i class="fa fa-trash" aria-hidden="true"></i>` : ""
                              }
                                 <i class="fa fa-heart" aria-hidden="true"></i>
                              </div>
                          </div>
                      </div>
                  </div>
              `;
              }
            
                                                    
            })
            // console.log(newsToPrint);
            $(".news-container").html(newsToPrint);
        
      

           
    })
        }
  

          function printNewsContent(rows) {
              let html = '';

              rows.forEach(row => {
                if (Array.isArray(row)) { 
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

           userLoged && userLoged[1].edit_news == 0 ? $('.fa-plus').remove() : '';
            printNews();

         

    let likes = document.querySelectorAll(".fa-heart");




    $(".news-container").on("click", ".fa-heart", function () {
      $(this).toggleClass("text-red-600");
    })

      let divNews = document.querySelectorAll(".news");

      
       
        $(".news-container").on('click',".fa-pencil", function () {
          let newsId = $(this).closest(".news").attr("id");
            window.location.href = `../pages/news_editor.html?newsId=${encodeURIComponent(newsId)}`;
        })
    

        $(".news-container").on('click',".news-title", function () {
          let newsId = $(this).closest(".news").attr("id");
          window.location.href = `../pages/dins_noticia.html?newsId=${encodeURIComponent(newsId)}`;
        })

        $(".news-container").on('click',".llegir-mes", function () {
          let newsId = $(this).closest(".news").attr("id");
          window.location.href = `../pages/dins_noticia.html?newsId=${encodeURIComponent(newsId)}`;
        })

     
       $(".news-container").on('click',".div-news-image", function () {
          let newsId = $(this).closest(".news").attr("id");
          window.location.href = `../pages/dins_noticia.html?newsId=${encodeURIComponent(newsId)}`;
        })  
       
        let newsIdToDelete;
        $(".news-container").on('click',".fa-trash", function () {
         
           newsIdToDelete = $(this).closest(".news").attr("id");
          $('.news-container').append(`
            <div class="confirmacio-borrar-noticia">
                    <i class="fa fa-times" aria-hidden="true"></i>
                    <p>Estas segur que vols borrar l'usuari?</p>
                    <button class="btn-confirmacio-borrar">Borrar</button>
                </div>
            `)
        });

        $(document).on('click', '.btn-confirmacio-borrar',function (){ 
            //  console.log(newsIdToDelete)
            deleteNews(newsIdToDelete); 
            $(".confirmacio-borrar-noticia").remove(); 
        })

        $(document).on('click', '.confirmacio-borrar-noticia .fa-times',()=> {
          $(".confirmacio-borrar-noticia").remove();
        })
            
  })

    





