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

  const [loading, setLoading] = useState<boolean>(true);

  const filters = [
    { tag: "Technology" },
    { tag: "Fashion" },
    { tag: "Science" },
    { tag: "Food" },
    { tag: "Travel" },
  ];

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

  const clearFilter = (e: any) => {
    if (filterTag) {
      axios
        .get(url)
        .then((response) => {
          setLoading(false);
          setItems(response.data.result);
        })
        .catch((error) => console.log(error));
      setLoading(true);
      setFilterTag("");
    }
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
        <div className="filter-head">
          <h2>Filter by Categories</h2>
          <p className="btn-clear" onClick={clearFilter}>
            Clear Filter
          </p>
        </div>
        <div className="filter-element-list">
          {filters.map((filter) => (
            <div className="filter-element" key={filter.tag}>
              <input
                type="radio"
                className="filter-radio"
                name={filter.tag}
                id={filter.tag}
                value={filter.tag}
                checked={filterTag === filter.tag}
                onChange={updateFilterSearch}
              />
              <label htmlFor={filter.tag}>{filter.tag}</label>
            </div>
          ))}
        </div>
      </div>
      <Blogs val={val} items={items} loading={loading} />
    </div>
  );
};

export default Home;
