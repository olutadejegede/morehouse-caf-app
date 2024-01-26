import React from 'react';
import axios from 'axios';

function App() {
  //Declares a state variable data using the useState hook. It initializes as an empty array and will be used to store the fetched anime data
  const [data, setData] = React.useState([]);
  //Declares a state variable character using the useState hook. It initializes as an empty string and will hold the user's input for searching anime.
  const [character, setCharacter] = React.useState('');
  
  const url = `https://kitsu.io/api/edge/anime${character ? `?filter[text]=${character}` : ''}`;
//Uses the useEffect hook to fetch data from the API when the component mounts or the url variable changes. It calls an asynchronous fetchData function that makes a GET request to the url, retrieves the data, and updates the data state variable.
  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(url);
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [url]);

  const searchCharacter = async (event) => {
    if (event.key === 'Enter' && character.trim() !== '') {
      try {
        const response = await axios.get(url);
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className='app'>
      <div className='search'>
        <input
          value={character}
          onChange={(event) => setCharacter(event.target.value)}
          onKeyPress={searchCharacter}
          placeholder='Enter Anime'
          type='text'
        />
      </div>
      <div className='anime-container'>
        {data.map((anime) => (
          <div key={anime.id}>
            <div>{anime.attributes.canonicalTitle}</div>
            <div>{anime.attributes.averageRating}</div>
            {anime.attributes.posterImage && (
              <img
                className='anime-card'
                src={`${anime.attributes.posterImage.medium}`}
                alt={anime.attributes.canonicalTitle}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
