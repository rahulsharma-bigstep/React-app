import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import "../index.css";

const Form = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch products and exchange rate together
        const [productsRes, currencyRes] = await Promise.all([
          axios.get("https://dummyjson.com/products"),
          axios.get("https://api.frankfurter.dev/v2/rate/USD/INR"),
        ]);

        setData(productsRes.data.products);
        setExchangeRate(currencyRes.data.rate);

        console.log("USD to INR Rate:", currencyRes.data.rate);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  async function submitHandler(e) {
    e.preventDefault();

    if (!query.trim()) {
      return;
    }

    try {
      const res = await axios.get(
        `https://dummyjson.com/products/search?q=${query}`
      );

      setData(res.data.products);
      setQuery("");
    } catch (error) {
      console.error("Search error:", error);
    }
  }

  return (
    <div className="form-container">

      <div className="form-header">
        <h1>Product Finder</h1>
        <p>Search through thousands of products</p>
      </div>

      <form className="search-form" onSubmit={submitHandler}>
        <input
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search and find..."
        />

        <button className="search-button" type="submit">
          Search
        </button>
      </form>

      <div className="products-grid">
        {data.map((ele) => {
          return (
            <Card
              key={ele.id}
              ele={ele}
              exchangeRate={exchangeRate}
            />
          );
        })}
      </div>

    </div>
  );
};

export default Form;