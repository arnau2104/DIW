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

     rows.push($(".edit-news-title").text());

    const config = JSON.stringify(rows);
    localStorage.setItem("postBuilderConfig", config);
    alert("Configuración guardada en el navegador.");
  });

  // Cargar configuración
  $("#load-config").on("click", function() {
    const config = localStorage.getItem("postBuilderConfig");
    if (!config) {
      alert("No hay configuración guardada.");
      return;
    }

    const rows = JSON.parse(config);
    console.log(rows)
    $(".row-container").empty(); // Limpiar todo antes de cargar
    rows.forEach(row => {
      if(!$.isArray(row) ) {
        $(".edit-news-title").text(row);
        console.log(row);
      }else {
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
      }
    });

    initializeDroppable();
    initializeDeleteButtons();
  });

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

     let news = `
     
                <div class="news news-style "> 
                <a href="./dins_noticia.html"><h4 class="font-bold  text-center text-xl intermidium:mb-2 intermidium:px-2 ">${$(".edit-news-title").text()}</h4></a> 
                <div class="w-72 tablet:w-3/5  intermidium:w-full">
                    <a href="./dins_noticia.html"><img class="rounded-md h-40 tablet:h-44" src="${$(".news-image").attr('src')}" alt="news 1"></a>
                </div>
                <div class="flex flex-col w-11/12 h-full intermidium:w-full intermidium:h-52" >
                    <div class="flex flex-col gap-2 items-center w-full h-44 ">
                        <div class="overflow-hidden rounded-md   p-1.5 intermidium:p-3"> 
                            <p>${$(".editable").text()}</p>
                        </div>
                        <a href="./dins_noticia.html"><button class="button-style">Llegir Mes</button></a>
                    </div>
                    <div class="flex justify-between text-lg items-center intermidium:p-1 intermidium:px-2">
                        <i class="fa fa-user-circle-o" aria-hidden="true"> Nom usuari</i>
                        <div>
                            <a href="./news_editor.html"><i class="fa fa-pencil " aria-hidden="true"></i></a>
                            <i class="fa fa-heart" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // console.log(news);
        
        allNews.unshift(news)


        
        localStorage.setItem("allNews", JSON.stringify(allNews));

        setTimeout(()=>window.location.href="../pages/noticies.html",1000);

  };
