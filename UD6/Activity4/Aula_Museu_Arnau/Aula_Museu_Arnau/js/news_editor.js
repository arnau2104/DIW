import { saveNews,getNews,onSnapshot,collection,db } from "./firebase.js";

let user = JSON.parse(localStorage.getItem("userLoged"));

const urlParams = new URLSearchParams(window.location.search);
const newsId = urlParams.get("newsId");
let dbNews = [];
saveNewsInVariable();



// console.log(newsId);

if(newsId) {
   
  onSnapshot(collection(db,"news"),  (querySnapshot)=> {
   
    querySnapshot.forEach((doc) => {
        
    
            const news = doc.data();
          //  console.log("news from db:" , doc.id, "newstoImport: " , newsId) 
      if(doc.id == newsId){
        loadNews(news);
      }
    
                                            
    }) 
})

}

function saveNewsInVariable() {
  onSnapshot(collection(db,"news"),(querySnapshot)=> {
    
    querySnapshot.forEach(doc => {
      let news = doc.data()
      dbNews.push([doc.id, news]);
    })

  })
}

function loadNews(newsToLoad) {
  const config = newsToLoad;
    if (!config) {
      alert("No hay configuración guardada.");
      return;
    }

    console.log(newsToLoad)
   
    let newsTitle = newsToLoad.news_title;
    let newsCover = newsToLoad.news_cover
    const rows = JSON.parse(config.news_content);
    // console.log(rows)
    $(".row-container").empty(); // Limpiar todo antes de cargar
    rows.forEach(row => {
        let newRow = '<div class="row">';
        row.forEach(column => {
          newRow += column.length > 1 ? `<div class="column half">` : `<div class="column">`;
          column.forEach(element => {
            if (element.type === "paragraph") {
              newRow += `
                <div class="element">
                  <p class="editable">${element.content}</p>
                </div>`;
            } else if (element.type === "image") {

              newRow += `
                <div class="element">
                  <img src="${element.src}" alt="Imagen">
                </div>`;
            }
          });
          newRow += `</div>`;
        });

        newRow += `<button class="delete-row-btn">Eliminar fila</button></div>`;
        $(".row-container").append(newRow);
      
    });
    $(".image-preview").append(`<img src="${newsCover}">`);
    $(".edit-news-title").text(newsTitle);
}





function printTodayDate() {
  let fecha = new Date();
  let año = fecha.getFullYear();
  let mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Los meses comienzan en 0
  let dia = String(fecha.getDate()).padStart(2, "0");
  let today = año + "-" + mes + "-" + dia;
  return today;
}

function saveRows() {
  const rows = [];
  $(".row").each(function() {
    const row = [];
    $(this).find(".column").each(function() {
      const column = [];
      $(this).children(".element").each(function() {
        if ($(this).find("p").length) {
          column.push({
            type: "paragraph",
            content: $(this).find("p").text()
          });
        } else if ($(this).find("img").length) {
          let contentImage = "";
          getBase64FromFile($(".content-image")[0].files[0],function (base64){
            contentImage = base64;
            column.push({
              type: "image",
              src: contentImage
            });
    
            
          })
          
        }
      });
      row.push(column);
    });
    rows.push(row);
  });

  return rows;
}



$(function() {
  // Hacer los elementos de la toolbox arrastrables
  $(".tool").draggable({
    helper: "clone",
    revert: "invalid"
  });

  function initializeDroppable() {
    $(".column").droppable({
      accept: ".tool",
      drop: function(event, ui) {
        const type = ui.draggable.data("type");
        if ($(this).children().length >= 2 && $(this).hasClass("half")) {
          alert("Solo se permiten dos elementos por columna.");
          return;
        }
        if ($(this).children().length >= 1 && !$(this).hasClass("half")) {
          alert("Solo se permite un elemento en esta columna.");
          return;
        }

        let newElement;
        if (type === "paragraph") {
          newElement = $(
            `<div class="element">
              <p class="editable">Escribe aquí tu texto...</p>
            </div>`
          );
        } else if (type === "image") {
          newElement = $(
            `<div class="element">
              <input class="content-image"  type="file" accept="image/*" onchange="loadImage(event)" />
              <img class="news-image" src="" alt="Imagen" style="display: none;">
            </div>`
          );
        }

        $(this).append(newElement);
        makeElementsDraggable();
      }
    });
  }

  

  function makeElementsDraggable() {
    $(".element").draggable({
      helper: "original",
      revert: "invalid"
    });
  }

  $("#add-row").on("click", function() {
    const columnCount = $("#column-choice").val();
    let newRow = '<div class="row">';
    
    if (columnCount === "1") {
      newRow += `<div class="column"></div>`;
    } else {
      newRow += `
        <div class="column half"></div>
        <div class="column half"></div>`;
    }

    newRow += `
      <button class="delete-row-btn">Eliminar fila</button>
      </div>`;
    $("#builder .row-container").append(newRow);

    initializeDroppable();
    initializeDeleteButtons();
  });

  function initializeDeleteButtons() {
    $(".delete-row-btn").off("click").on("click", function() {
      $(this).closest(".row").remove();
    });
  }

  // Guardar configuración
  $("#save-config").on("click", function() {
    let allNews = JSON.parse(localStorage.getItem("allNews")) ?? [];
    const rows = saveRows();
    
    let contador = allNews.length;
    let newsTitle = $(".edit-news-title").text();
    let today = printTodayDate();
    let principalImage ="";
    getBase64FromFile($("#image-input")[0].files[0],function (base64){
      principalImage = base64;
      saveNewsInVariable(); 
      let lastNewsId = dbNews.length > 0 ? dbNews[dbNews.length - 1][0].slice(-1) : 0;         
              
      
      saveNews(`news${+lastNewsId + 1}`,newsTitle, user.name,today,JSON.stringify(rows),principalImage,"0")

      setTimeout(()=>window.location.href="../pages/noticies.html",1000);
    })
    
    
    //REVISAR DESPRES
    // let thisNewsExist = false;
    //     dbNews.forEach((index,news) => {
    //       if(news[0] == newsId) {
    //         news[index] = config;
    //         thisNewsExist = true;
    //         return;
    //       }
    //     })

    //     if(thisNewsExist == false) {
    //       dbNews.unshift(config) 
    //     }
    
    alert("Configuración guardada en el navegador.");
  });

  // Cargar configuración
  $("#load-config").on("click", ()=> {
    loadNews(0);
  } );

  initializeDroppable();
});

function loadImage(event) {
  const input = event.target;
  const reader = new FileReader();
  reader.onload = function() {
    const img = $(input).siblings("img");
    img.attr("src", reader.result);
    img.show();
    $(input).hide();
  };
  reader.readAsDataURL(input.files[0]);
}

function editParagraph(paragraph) {
  const $p = $(paragraph);
  const currentText = $p.text();
  const input = $(`<input type="text" value="${currentText}" />`);

  input.on("blur", function() {
    const newText = $(this).val();
    $p.text(newText);
    $p.show();
    $(this).remove();
  });

  $p.hide();
  $p.after(input);
  input.focus();
}

$(document).on('click', '.editable', function(e) {
  editParagraph(e.target);
});


export const editTitle = (title) => {
  const $h2 = $(title);
  const currentText = $h2.text();
  const input = $(`<input class="input-edit-news-title" type="text" placeholder="${currentText}" />`);

  input.on("blur", function() {
    const newText = $(this).val();
    if(newText.length!= 0) {
    $h2.text(newText);
    }
    $h2.show();
    $(this).remove();
    console.log($(".edit-news-title").text());
    
  });

  $h2.hide();
  $h2.after(input);
  input.focus();
  console.log($h2.text());
}

$(".edit-news-title").on('click', (e)=> {

editTitle(e.target);

})

function getBase64FromFile(img, callback){
  let fileReader = new FileReader();
  fileReader.addEventListener('load', function(e){

    callback(fileReader.result);
  });
  fileReader.readAsDataURL(img);
}





// Publicar noticia
  function publishNews() {

    let allNews = JSON.parse(localStorage.getItem("allNews")) ?? [];
    let contador = allNews.length;

       
        let newsTitle = $(".edit-news-title").text();
        let today = printTodayDate();
        let rows = saveRows();
         console.log($("#image-input")[0]);
        let principalImage ="";
        getBase64FromFile($("#image-input")[0].files[0],function (base64){
          principalImage = base64;
          saveNewsInVariable(); 
          let lastNewsId = dbNews.length > 0 ? dbNews[dbNews.length - 1][0].slice(-1) : 0;         
                  
          
          saveNews(`news${+lastNewsId + 1}`,newsTitle, user.name,today,JSON.stringify(rows),principalImage,"1")
  
          setTimeout(()=>window.location.href="../pages/noticies.html",1000);
        })
        
        //REVISAR
        // let thisNewsExist = false;
        // for (let i = 0; i < allNews.length; i++) {
        //   // console.log(allNews[0], "== ", newsId)
        //   if(allNews[i][0] == newsId) {
        //     // console.log(allNews[i]);
        //      config[0] = newsId;
        //      allNews.splice(i,1);
        //     //  allNews[i] = config;
        //      thisNewsExist = true;
        //     console.log("dins")
        //     break;
        //   }
        // }
      
       
       

  };

  $('#publicar').on('click', ()=> {
    publishNews();
  })



  function previewImage(input) {
    const previewContainer = document.querySelector('.image-preview');
    
   
    previewContainer.innerHTML = ''; 
  
    const file = input.files[0];
    if (file) {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(file); 
      img.alt = 'Imagen principal';
      previewContainer.appendChild(img);
    }
  }

  $("#image-input").on('change', (e)=> {
    previewImage(e.target)
  })

 
