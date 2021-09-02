/* ------------------------
Search Book
--------------------------- */

const searchBook = () => {
   const searchField = document.getElementById("search-field");
   const searchText = searchField.value;

   //    console.log(searchFieldText);

   // getting information from API
   const url = `https://openlibrary.org/search.json?q=${searchText}`;
   fetch(url)
      .then((res) => res.json())
      .then((data) => displayBookInfo(data.docs));
};

/* ------------------------
Display Search Result
--------------------------- */

const displayBookInfo = (book) => {
   const bookInfoContainer = document.getElementById("book-info");

   bookInfoContainer.textContent = "";
   book.forEach((books) => {
      const imgUrl = `https://covers.openlibrary.org/b/id/${books.cover_i}-L.jpg`;
      const noImgUrl = `https://covers.openlibrary.org/b/id/undefined-L.jpg`;

      console.log(books);
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
                <div class="card h-100">
                     <img src="${imgUrl}" class="card-img-top" alt="..." />
                     <div class="card-body">
                        <h5 class="card-title">Book Title: ${books.title}</h5>
                        <p class="card-text">
                           Author Name: 
                        </p>
                     </div>
                     <div class="card-footer">
                        <small class="text-muted"
                           >Last updated 3 mins ago</small
                        >
                     </div>
                  </div>
    
    
    `;
      bookInfoContainer.appendChild(div);
   });
};

/*  books.author_name.forEach((authors) => {
    console.log(authors);
 }); */
