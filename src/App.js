import React, { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [bookList, setBookList] = useState([]);
  const [isBookAdded, setIsBookAdded] = useState(false);

  const handleSearch = async () => {
    if (query.length > 0) {
      try {
        const response = await fetch(
          `http://64.227.142.191:8080/application-test-v1.1/books?title=${query}`
        );
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data.data || []);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }
  };

  const handleAddBook = (book) => {
    setBookList([...bookList, book]);
    setIsBookAdded(true);
  };

  return (
    <div
      style={{
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontSize: "20px",
      }}
    >
      <h1 style={{ fontSize: "36px" }}>Book Search and Add</h1>

      <div style={{ marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Search books by title..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            handleSearch();
          }}
          style={{
            marginRight: "20px",
            padding: "10px",
            fontSize: "18px",
            width: "300px",
            borderRadius: "5px",
            border: "2px solid #ccc",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "10px 20px",
            fontSize: "18px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      {query && (
        <div
          style={{
            marginTop: "20px",
            background: "#f9f9f9",
            padding: "20px",
            border: "2px solid #ccc",
            width: "350px",
            maxHeight: "250px",
            overflowY: "auto",
            fontSize: "18px",
          }}
        >
          <h3>Suggestions:</h3>
          <ul>
            {searchResults.length > 0 ? (
              searchResults.map((book) => (
                <li key={book.id} style={{ marginBottom: "10px" }}>
                  <strong>{book.title}</strong>
                  <button
                    onClick={() => handleAddBook(book)}
                    style={{
                      marginLeft: "20px",
                      padding: "8px 16px",
                      fontSize: "16px",
                      backgroundColor: "#2196F3",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Add
                  </button>
                </li>
              ))
            ) : (
              <p>No books found.</p>
            )}
          </ul>
        </div>
      )}

      <h2 style={{ fontSize: "30px", marginTop: "30px" }}>Your Book List</h2>
      {isBookAdded ? (
        <ul>
          {bookList.length > 0 ? (
            bookList.map((book, index) => (
              <li
                key={index}
                style={{ fontSize: "20px", marginBottom: "10px" }}
              >
                <strong>{book.title}</strong>
              </li>
            ))
          ) : (
            <p>No books in the list.</p>
          )}
        </ul>
      ) : (
        <p>No book added yet.</p>
      )}
    </div>
  );
}

export default App;
