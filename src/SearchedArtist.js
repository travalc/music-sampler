import React, { Component } from 'react';
import './css/App.css';

class SearchedArtist extends Component {
  render() {
    let artist = {
      name: '',
      genres: [],
      images: [{url:''}]
    }
    artist = this.props.artist !== null ? this.props.artist : artist;
    const SA_CLASSES = "SearchedArtist row";
    return (
      <div>
        <div className={SA_CLASSES}>
          <div className="col-md-6">
              <h4 className="searchedArtistName">{artist.name}</h4>
              <div className="imageDiv">
                <img
                  alt={artist.name}
                  src={artist.images[0].url}
                />
              </div>
          </div>
          <div className="col-md-6">
            <p>Genres</p>
            <ul className="genreList">
              {
                artist.genres.map((genre, k) => {
                  return (
                    <li key={k}>{genre}</li>
                  )
                })
              }
              </ul>
          </div>
        </div>
        <hr/>
      </div>
    )
  }
}

export default SearchedArtist;
