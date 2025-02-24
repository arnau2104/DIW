let user = JSON.parse(localStorage.getItem("userLoged"));

const urlParams = new URLSearchParams(window.location.search);
const newsId = urlParams.get("newsId");
// console.log(newsId);

if(newsId) {
  //test
  let newsIdToLoad;
  let allNews = JSON.parse(localStorage.getItem("allNews"));
  // console.log(allNews)
  for(let i = 0; i < allNews.length; i++) {
    if(allNews[i][0] == newsId) {
       newsIdToLoad = i;
      break;
    }
  }
  
  loadNews(newsIdToLoad);  

  
}

function loadNews(newsNumber) {
  const config = JSON.parse(localStorage.getItem("allNews"));
    if (!config) {
      alert("No hay configuración guardada.");
      return;
    }

   
    let newsTitle = config[newsNumber][1];
    const rows = config[newsNumber][4];
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
                  <p class="editable" onclick="editParagraph(this)">${element.content}</p>
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

    $(".edit-news-title").text(newsTitle);

    // initializeDroppable();
    // initializeDeleteButtons();
  // ;

  // initializeDroppable();
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
          column.push({
            type: "image",
            src: $(this).find("img").attr("src")
          });
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
              <p class="editable" onclick="editParagraph(this)">Escribe aquí tu texto...</p>
            </div>`
          );
        } else if (type === "image") {
          newElement = $(
            `<div class="element">
              <input  type="file" accept="image/*" onchange="loadImage(event)" />
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
    let principalImage = $(".image-preview").find("img").attr("src");

     //rows.push($(".edit-news-title").text());
    
    const config =[`news${contador + 1}`,newsTitle, user.name,today,rows,principalImage,0];
    
    let thisNewsExist = false;
        allNews.forEach((index,news) => {
          if(news[0] == newsId) {
            news[index] = config;
            thisNewsExist = true;
            return;
          }
        })

        if(thisNewsExist == false) {
          allNews.unshift(config) 
        }
    localStorage.setItem("allNews", JSON.stringify(allNews));
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

function editTitle(title) {
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

document.querySelector("#image-input").addEventListener("change", (event) => {
  const file = event.target.files[0];
  base64Image(file).then((base64Image) => {
   
   
  }).catch((error) => {
    console.error("Error al convertir la imagen:", error);
  });
});
 

// Publicar noticia
  function publishNews() {

    let allNews = JSON.parse(localStorage.getItem("allNews")) ?? [];
    let contador = allNews.length;

        // console.log(news);
        let newsTitle = $(".edit-news-title").text();
        let today = printTodayDate();
        let rows = saveRows();
       
        let principalImage =  $(".image-preview img").attr("src"); // Espera el resultado del Base64
        const config = [`news${contador + 1}`,newsTitle, user.name,today,rows,principalImage,1];
        
        let thisNewsExist = false;
        for (let i = 0; i < allNews.length; i++) {
          // console.log(allNews[0], "== ", newsId)
          if(allNews[i][0] == newsId) {
            // console.log(allNews[i]);
             config[0] = newsId;
             allNews.splice(i,1);
            //  allNews[i] = config;
             thisNewsExist = true;
            console.log("dins")
            break;
          }
        }

        
          allNews.unshift(config) 
        
        localStorage.setItem("allNews", JSON.stringify(allNews));

        setTimeout(()=>window.location.href="../pages/noticies.html",1000);

  };



  function previewImage(input) {
    const previewContainer = document.querySelector('.image-preview');
    
   
    previewContainer.innerHTML = ''; //rmeove previous image
  
    const file = input.files[0];
    if (file) {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(file); 
      img.alt = 'Imagen principal';
      previewContainer.appendChild(img);
    }
  }

 
