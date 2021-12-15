import React, { useState, useEffect } from "react";
import Blogs from "../Blogs/Blogs";
import Hero from "../Hero/Hero";
import axios from "axios";

const Home: React.FC = () => {
  const [items, setItems] = useState<IItemsArr[]>();
  const [search, setSearch] = useState<string>();
  const [query, setQuery] = useState<string>();
  const [val, setVal] = useState<boolean>();
  const [singleBlog, setSingleBlog] = useState<IItemsArr>();
  const url = "https://mwv-blogapi.herokuapp.com/api";
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        // console.log(response);
        // console.log(response.data.result);
        setItems(response.data.result);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    if (query) {
      axios
        .get(`https://mwv-blogapi.herokuapp.com/api/path/${query}`)
        .then((response) => {
          // console.log(response);
          setVal(true);
          setSingleBlog(response.data.result);
        })
        .catch((error) => console.log(error));
      console.log(singleBlog);
    }
  }, [query]);

  const updateSearch = (e: any) => {
    setSearch(e.target.value);
  };
  const getSearch = (e: any) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
    setVal(false);
  };
  return (
    <div>
      <Hero getSearch={getSearch} updateSearch={updateSearch} search={search} />
      <Blogs val={val} items={items} singleBlog={singleBlog} />
    </div>
  );
};

export default Home;
