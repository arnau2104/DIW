
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
  let allNews = JSON.parse(localStorage.getItem("allNews"));
//   console.log(allNews);
  for(let i = 0; i < allNews.length; i++) {
    if(allNews[i][0] == newsId) {
       newsToLoad = allNews[i];
      break;
    }
  }


  $(".news-title").html(newsToLoad[1]);
   $(".news-image").attr("src", newsToLoad[5]);
  $(".news-autor").html(newsToLoad[2]);
  $(".news-text").html(printNewsContent(newsToLoad[4]));
  
    
  
}


  


   
