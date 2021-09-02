const searchField = document.getElementById("search-field");
const bookInfoContainer = document.getElementById("book-info");
const errorMessage = document.getElementById("error-message");

/* ------------------------
Search Book
--------------------------- */

const searchBook = () => {
   const searchText = searchField.value;
   searchField.value = "";
   errorMessage.textContent = "";

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
   console.log(book);

   /* Error Handling */
   if (book.length === 0) {
      const div = document.createElement("div");
      div.innerHTML = `
      <h3 class="bg-danger text-center text-white p-5 rounded-3">
               Please Input a valid name
            </h3>
      `;
      errorMessage.appendChild(div);
   }
   bookInfoContainer.textContent = "";

   book.forEach((books) => {
      const imgUrl = `https://covers.openlibrary.org/b/id/${
         books.cover_i ? books.cover_i : "10909258"
      }-M.jpg`;

      console.log(books);

      if (
         books.title !== undefined &&
         books.author_name !== undefined &&
         books.first_publish_year !== undefined
      ) {
         const div = document.createElement("div");
         div.classList.add("col");
         div.innerHTML = `
                <div class="card h-100">
                     <img src="${imgUrl}" class="card-img-top" alt="..." />
                     <div class="card-body">
                        <h5 class="card-title">Book Title: ${books.title}</h5>
                        <p class="card-text">
                           <span class="fw-bold">Author Name: </span>${books.author_name}
                           <br/>
                           <span class="fw-bold" >Publisher: </span>${books.publisher}
                           <br/>
                           <span class="fw-bold" >First Publish Year: </span>${books.first_publish_year}
                        </p>
                     </div>
                     
                  </div>
    
    
    `;
         bookInfoContainer.appendChild(div);
      }
   });
};

/*  books.author_name.forEach((authors) => {
    console.log(authors);
 }); */
