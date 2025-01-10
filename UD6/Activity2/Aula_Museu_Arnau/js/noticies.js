let likes = document.querySelectorAll(".fa-heart");

likes.forEach((like) => {
    like.addEventListener('click', (e) => {
        if(!like.classList.contains("text-red-600")) {
            e.target.classList.add("text-red-600");
        }else {
            e.target.classList.remove("text-red-600");
        }
   
    });
  });