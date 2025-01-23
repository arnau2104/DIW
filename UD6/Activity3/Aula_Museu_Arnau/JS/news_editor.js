

const urlParams = new URLSearchParams(window.location.search);
const newsId = urlParams.get("newsId");
console.log(newsId);



if(newsId) {
  //test
  let newsIdToLoad;
  let allNews = JSON.parse(localStorage.getItem("allNews"));
  console.log(allNews)
  for(let i = 0; i < allNews.length; i++) {
    if(allNews[i][0] == newsId) {
       newsIdToLoad = i;
      break;
    }
  }
  
  loadNews(newsIdToLoad);

  

  // console.log(newsText)
  // console.log(newsToLoad);

  // let text = [{type: "paragraph", content: newsContent(".news-text")}];
  // console.log(text)
  
  // localStorage.setItem("postBuilderConfig", JSON.stringify(newsToLoad));
  
  
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

function loadNews(newsNumber) {
  const config = JSON.parse(localStorage.getItem("allNews"));
    if (!config) {
      alert("No hay configuración guardada.");
      return;
    }

    // const config = JSON.parse(config);
    let newsTitle = config[newsNumber][1];
    const rows = config[newsNumber][4];
    console.log(rows)
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

    initializeDroppable();
    initializeDeleteButtons();
  ;

  initializeDroppable();
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
    

    let newsTitle = $(".edit-news-title").text();
    let today = printTodayDate();

     //rows.push($(".edit-news-title").text());
    let contador = allNews.length;
    const config =[`news${contador + 1}`,newsTitle, "Arnau",today,rows,0];
    allNews.unshift(config)
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

  // Guardar configuración
  function publishNews() {

    let allNews = JSON.parse(localStorage.getItem("allNews")) ?? [];
    let contador= allNews.length;

    //  let news = `
     
    //             <div class="news news-style" id="news${contador}"> 
    //             <a href="./dins_noticia.html"><h4 class="font-bold  text-center text-xl intermidium:mb-2 intermidium:px-2 ">${$(".edit-news-title").text()}</h4></a> 
    //             <div class="w-72 tablet:w-3/5  intermidium:w-full">
    //                 <a href="./dins_noticia.html"><img class="rounded-md h-40 tablet:h-44 news-image" src="${$(".news-image").attr('src')}" alt="news 1"></a>
    //             </div>
    //             <div class="flex flex-col w-11/12 h-full intermidium:w-full intermidium:h-52" >
    //                 <div class="flex flex-col gap-2 items-center w-full h-44 ">
    //                     <div class="overflow-hidden rounded-md   p-1.5 intermidium:p-3 w-full text-pretty"> 
    //                         <p class="news-text">${$(".editable").text()}</p>
    //                     </div>
    //                     <a href="./dins_noticia.html"><button class="button-style">Llegir Mes</button></a>
    //                 </div>
    //                 <div class="flex justify-between text-lg items-center intermidium:p-1 intermidium:px-2">
    //                     <i class="fa fa-user-circle-o" aria-hidden="true"> Nom usuari</i>
    //                     <div>
    //                        <i class="fa fa-pencil " aria-hidden="true"></i>
    //                         <i class="fa fa-heart" aria-hidden="true"></i>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     `;

       

          //   function putDefaulttNews (iterations) {

          //     let newContador = contador + 1;

          //     for(let i = 0; i<iterations; i++) {

          //     let defaultNews = `<div class="news news-style" id="news${newContador++}">
          //     <a href="./dins_noticia.html"><h4 class="font-bold  text-center text-xl intermidium:mb-2 intermidium:px-2 ">Transllat de la ballena al museu del Ramis</h4></a>
          //     <div class="w-72 tablet:w-3/5  intermidium:w-full">
          //         <a href="./dins_noticia.html"><img class="rounded-md h-40 tablet:h-44 news-image " src="../Assets/Imgs/trastall_balena.JPG" alt="news 1"></a>
          //     </div>
          //     <div class="flex flex-col w-11/12 h-full intermidium:w-full intermidium:h-52" >
          //         <div class="flex flex-col gap-2 items-center w-full h-44 ">
          //             <div class="overflow-hidden rounded-md   p-1.5 intermidium:p-3 w-full text-pretty"> 
          //                 <p class="class="news-text"">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae erat convallis, ultricies eros eget, cursus purus. Fusce sagittis, risus sit amet feugiat scelerisque, nisi lorem posuere dui, in fermentum arcu arcu ac quam. Quisque ut augue auctor, aliquet nisl eget, sollicitudin est.</p>
          //                 <p class="news-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae erat convallis, ultricies eros eget, cursus purus. Fusce sagittis, risus sit amet feugiat scelerisque, nisi lorem posuere dui, in fermentum arcu arcu ac quam. Quisque ut augue auctor, aliquet nisl eget, sollicitudin est.</p>
          //             </div>
          //             <a href="./dins_noticia.html"><button class="button-style">Llegir Mes</button></a>
          //         </div>
          //         <div class="flex justify-between text-lg items-center intermidium:p-1 intermidium:px-2">
          //             <i class="fa fa-user-circle-o" aria-hidden="true"> Nom usuari</i>
          //             <div>
          //                 <i class="fa fa-pencil " aria-hidden="true"></i>
          //                 <i class="fa fa-heart " aria-hidden="true"></i>
          //             </div>
          //         </div>
          //     </div>
          // </div>`;
          
          // allNews.push([`news${newContador}`,defaultNews]);
          //     }

          //   }

            // allNews.shift();
           
            // putDefaulttNews(8);


        // console.log(news);
        let newsTitle = $(".edit-news-title").text();
        let today = printTodayDate();
        let rows = saveRows();
        const config = [`news${contador + 1}`,newsTitle, "Arnau",today,rows,1];
        
        allNews.unshift(config) 
        localStorage.setItem("allNews", JSON.stringify(allNews));

        setTimeout(()=>window.location.href="../pages/noticies.html",1000);

  };
