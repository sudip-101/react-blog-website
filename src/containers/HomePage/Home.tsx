import React, { useState, useEffect } from "react";
import Blogs from "../Blogs/Blogs";
import Hero from "../Hero/Hero";
import axios from "axios";
import "./Home.scss";
import Loader from "../../components/Loader/Loader";

const Home: React.FC = () => {
  const [items, setItems] = useState<IItemsArr[]>();
  const [search, setSearch] = useState<string>();
  const [query, setQuery] = useState<string>();
  const [filterTag, setFilterTag] = useState<string>();
  const [val, setVal] = useState<boolean>();
  // const [singleBlog, setSingleBlog] = useState<IItemsArr>();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const url = "https://mwv-blogapi.herokuapp.com/api";

  useEffect(() => {
    if (query) {
      axios
        .get(`https://mwv-blogapi.herokuapp.com/api/search?text=${query}`)
        .then((response) => {
          console.log(response.data);
          setLoading(false);
          setVal(true);
          // setSingleBlog(response.data.result);
          setItems(response.data.result);
        })
        .catch((error) => console.log(error));
    }
  }, [query]);

  const updateSearch = (e: any) => {
    setSearch(e.target.value);
    setFilterTag("");
  };
  const getSearch = (e: any) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
    setVal(false);
    setLoading(true);
  };

  useEffect(() => {
    console.log(filterTag);
    if (filterTag) {
      axios
        .get(`https://mwv-blogapi.herokuapp.com/api/tag/${filterTag}`)
        .then((response) => {
          console.log(response.data);
          setLoading(false);
          setVal(true);
          setItems(response.data.result);
        })
        .catch((error) => console.log(error));
    }
  }, [filterTag]);

  const updateFilterSearch = (e: any) => {
    console.log(e.target.value);
    setFilterTag(e.target.value);
    setLoading(true);
  };

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setLoading(false);
        setItems(response.data.result);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <Hero />
      <form className="search-form container" onSubmit={getSearch}>
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          required
          value={search}
          onChange={updateSearch}
        />
        <div>
          <button type="submit" className="btn btn-search">
            Search
          </button>
        </div>
      </form>
      <div className="filter-container container">
        <div className="filter-element">
          <input
            type="radio"
            name="tag"
            id="technology"
            value="Technology"
            checked={filterTag === "Technology"}
            onChange={updateFilterSearch}
          />
          <label htmlFor="technology">Technology</label>
        </div>
        <div className="filter-element">
          <input
            type="radio"
            name="tag"
            id="fashion"
            value="Fashion"
            checked={filterTag === "Fashion"}
            onChange={updateFilterSearch}
          />
          <label htmlFor="fashion">Fashion</label>
        </div>
        <div className="filter-element">
          <input
            type="radio"
            name="tag"
            id="science"
            value="Science"
            checked={filterTag === "Science"}
            onChange={updateFilterSearch}
          />
          <label htmlFor="science">Science</label>
        </div>
        <div className="filter-element">
          <input
            type="radio"
            name="tag"
            id="food"
            value="Food"
            checked={filterTag === "Food"}
            onChange={updateFilterSearch}
          />
          <label htmlFor="food">Food</label>
        </div>
        <div className="filter-element">
          <input
            type="radio"
            name="tag"
            id="travel"
            value="Travel"
            checked={filterTag === "Travel"}
            onChange={updateFilterSearch}
          />
          <label htmlFor="travel">Travel</label>
        </div>
      </div>
      <Blogs val={val} items={items} loading={loading} />
    </div>
  );
};

export default Home;
