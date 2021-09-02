const searchField = document.getElementById("search-field");
const bookInfoContainer = document.getElementById("book-info");
const errorMessage = document.getElementById("error-message");
const countingResults = document.getElementById("result-count");
const showingSpinner = document.getElementById("show-spinner");

/* ------------------------
Search Book
--------------------------- */

const searchBook = () => {
   const searchText = searchField.value;
   searchField.value = "";

   // getting information from API
   const url = `https://openlibrary.org/search.json?q=${searchText}`;
   fetch(url)
      .then((res) => res.json())
      .then((data) => displayBookInfo(data));
   displaySpinner();
};

/* ------------------------
Display Search Result
--------------------------- */

const displayBookInfo = (book) => {
   const books = book.docs;
   console.log(book);

   /* handling error if user search by a invalid name */
   if (book.numFound === 0 && books.length === 0) {
      errorMessage.innerHTML = `
      <h3 class="bg-danger text-center text-white p-5 rounded-3">
               Please input a valid name
            </h3>

      `;
      showingSpinner.textContent = "";
   }

   bookInfoContainer.textContent = "";

   /* Showing Resutls */

   countingResults.innerHTML = `
   <div class="bg-success text-center text-white p-5 rounded-3 py-5">
   
   <h3 >Total Number Found: ${book.numFound}</h3>
   <h3 >Total Number of Books: ${books.length}</h3>
   </div>
   `;

   books.forEach((item) => {
      const imgUrl = `https://covers.openlibrary.org/b/id/${
         item.cover_i ? item.cover_i : "10909258"
      }-M.jpg`;

      searchField.value = "";
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
                <div class="card h-100">
                     <img src="${imgUrl}" class="card-img-top" alt="..." />
                     <div class="card-body">
                        <h5 class="card-title">Book Title: ${
                           item.title ? item.title : "N/A"
                        }</h5>
                        <p class="card-text">
                           <span class="fw-bold">Author Name: </span>${
                              item.author_name ? item.author_name[0] : "N/A"
                           }
                           <br/>
                           <span class="fw-bold" >Publisher: </span>${
                              item.publisher ? item.publisher[0] : "N/A"
                           }
                           <br/>
                           <span class="fw-bold" >First Publish Year: </span>${
                              item.first_publish_year
                                 ? item.first_publish_year
                                 : "N/A"
                           }
                        </p>
                     </div>
                     
                  </div>
    
    
    `;
      bookInfoContainer.appendChild(div);
      errorMessage.textContent = "";
      showingSpinner.textContent = "";
   });
};

/* Display Loading Spinner */
const displaySpinner = () => {
   showingSpinner.innerHTML = `
   <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
   </div>
   
   `;
   errorMessage.textContent = "";
   countingResults.textContent = "";
   bookInfoContainer.textContent = "";
};
