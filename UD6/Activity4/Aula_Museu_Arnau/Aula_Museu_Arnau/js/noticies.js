import { getNews,onSnapshot,collection,db } from "./firebase.js";


// let allNews = [];

// function saveNewsInVariable() {
//   onSnapshot(collection(db,"news"),(querySnapshot)=> {
    
//     querySnapshot.forEach(doc => {
//       let news = doc.data()
//       allNews.push([doc.id,news]);
//     })

//   })
// }

$(()=>{
  

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

            onSnapshot(collection(db,"news"),  (querySnapshot)=> {
              let newsToPrint = "";
              querySnapshot.forEach((doc) => {
                  
              
                      const news = doc.data();
                      
      
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
                             <button class=" text-center button-style llegir-mes" onClick="redirectToNoticia()">Llegir Mes</button>
                          </div>
                          <div class="flex justify-between text-lg items-center intermidium:p-1 intermidium:px-2">
                              <i class="fa fa-user-circle-o" aria-hidden="true"> ${news.autor}</i>
                              <div>
                                  <i class="fa fa-pencil cursor-pointer" aria-hidden="true"></i>
                                  <i class="fa fa-trash" aria-hidden="true"></i>
                                  <i class="fa fa-heart" aria-hidden="true"></i>
                              </div>
                          </div>
                      </div>
                  </div>
              `;
              
                                                      
              })
              // console.log(newsToPrint);
              $(".news-container").html(newsToPrint);
          
        

             
      })

         

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
            window.location.href = `../pages/news_editor.html?newsId=${encodeURIComponent(news.id)}`;
        })

      //   console.log( news.querySelector(".news-title"));

      //  console.log(news.querySelector(".div-news-image"));

        news.querySelector(".news-title").addEventListener('click', ()=> {
          window.location.href = `../pages/dins_noticia.html?newsId=${encodeURIComponent(news.id)}`;
        })

        // news.querySelector(".llegir-mes").addEventListener('click', ()=> {
        //   window.location.href = `../pages/dins_noticia.html?newsId=${encodeURIComponent(news.id)}`;
        // })

        const  redirectToNoticia =  ()=> {
          window.location.href = `../pages/dins_noticia.html?newsId=${encodeURIComponent(news.id)}`;
        }

        news.querySelector(".div-news-image").addEventListener('click', ()=> {
          window.location.href = `../pages/dins_noticia.html?newsId=${encodeURIComponent(news.id)}`;
        })

        let newsId = news.id;
        news.querySelector(".fa-trash").addEventListener('click',()=> {
         for(let i =0; i < allNews.length; i++) {
          if(allNews[i][0] === news.id) {
            allNews.splice(i,1);
            break;
          }
         }

         localStorage.setItem("allNews", JSON.stringify(allNews));
         window.location.reload();

        })
      });

})



