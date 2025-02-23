import { getNews,onSnapshot,collection,db,deleteNews } from "./firebase.js";





  function printNewsContent(rows) {
    let html = '';

    rows.forEach(row => {
       
        let newRow = '<div class="flex w-full flex-row mb-4 gap-3">';
        row.forEach(column => { 
            const columnWidth = 'w-full p-2';
            newRow += `<div class="${columnWidth} p-10">`;
          column.forEach(element => {
            if (element.type === "paragraph") {
              newRow += `
                
                  <p class="p-2">${element.content}</p>
               
              `;
            } else if (element.type === "image") {
              newRow += `
            
                  <img class="w-auto h-auto max-h-32 rounded-md" style="max-width: 100%; max-height: 800px; object-fit: contain;" src="${element.src}" alt="Imagen">
                
              `;
            }
          });
          newRow += `</div>`;
        });
        newRow += `</div>`; // Cierra la fila

        html += newRow;
      
    });
  
    return html;
  }


  const urlParams = new URLSearchParams(window.location.search);
const newsId = urlParams.get("newsId");
console.log(newsId);

if(newsId) {
  //test
  let newsToLoad;
  

  onSnapshot(collection(db,"news"), (querySnapshot)=> {

    querySnapshot.forEach((doc) => {
      let news = doc.data();

      if(doc.id == newsId) {
        $(".news-title").html(news.news_title);
        $(".news-image").attr("src", news.news_cover);
        $(".news-autor").html(news.autor);
        $(".news-text").html(printNewsContent(JSON.parse(news.news_content)));
      }
    })

  })

  $(".news").on("click", ".fa-heart", function () {
    $(this).toggleClass("text-red-600");
  })
  
  $(".news").on('click',".fa-pencil", function () {
      window.location.href = `../pages/news_editor.html?newsId=${encodeURIComponent(newsId)}`;
  })
  
  
    
  
}


  


   
