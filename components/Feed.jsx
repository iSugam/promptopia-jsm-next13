"use client"

import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {
        data.map(post => (
          <PromptCard
            key= {post._id}
            post = {post}
            handleTagClick={handleTagClick}
          />
        ))
      }
    </div>
  )
}

const Feed = () => {

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);;
  const [posts, setPosts] = useState([]);

  const filterSearch = (searchText) => {
    const regX = new RegExp(searchText, "i");
    return posts.filter(items => (
      regX.test(items.creator.username) ||
      regX.test(items.tag) ||
      regX.test(items.prompt)
    ))
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterSearch(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    )
  };

  const handleTagClick = (e) => {
    setSearchText(e);

    const tagResult = filterSearch(e);
    setSearchedResults(tagResult);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    }
    fetchPosts();
  }, [])
  
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
          type="text"
          placeholder='Search for a tag or a username...'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'  
        />
      </form>

      {searchText ?(
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
      />
      ) : <PromptCardList
        data={posts}
        handleTagClick={handleTagClick}
      />}
    </section>
  )
}

export default Feed