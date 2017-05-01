import React, { Component } from 'react';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import SearchedArtist from './SearchedArtist';
import RelatedArtists from './RelatedArtists';
import './css/App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchArtist: null,
      relatedArtists: [],
      query: ''
    }
  }
  search() {
    const BASE_URL = 'https://api.spotify.com/v1/search';
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
    let artistArray = [];
    let search_url = `${BASE_URL}?q=${this.state.query}&type=artist&limit=1`;
    fetch(search_url, { //Get information for searched artist
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
      const artist = json.artists.items[0];
      this.setState({searchArtist: artist});
      let RA_URL = `https://api.spotify.com/v1/artists/${artist.id}/related-artists`;
      fetch(RA_URL, { //get information on related artists
        method: 'GET'
      })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        const numberOfArtists = json.artists.length;

        json.artists.forEach(item => { //get top track for each artist
          let image = item.images.length > 0 ? item.images[0].url : 'http://www.acsu.buffalo.edu/~rslaine/imageNotFound.jpg';
          let name = item.name;
          var topTrack;
          let ra_album_url = `${ALBUM_URL}${item.id}/top-tracks?country=US&`;
          fetch(ra_album_url, {
            method: 'GET'
          })
          .then(response => response.json())
          .then(json => {
            topTrack = json.tracks[0];
            let audio = new Audio(topTrack.preview_url);
            let relatedArtist = {
              name: name,
              image: image,
              topTrack: audio,
              trackURL: topTrack.preview_url
            };
            artistArray.push(relatedArtist);
            console.log(numberOfArtists);
            if (artistArray.length === numberOfArtists) {
              this.setState({relatedArtists: artistArray});
            }

          })

        })

      })

    })


  }
  render() {
    const APP_CLASSES = "App container-fluid"
    return (
      <div className={APP_CLASSES}>
        <div className="App-title"><h1>Spotify Recommended Artists Sampler</h1></div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Enter an artist name"
              value={this.state.query}
              onChange={event => {this.setState({query: event.target.value, searchArtist: null, relatedArtists: []})}}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.search();
                }
              }}
            />
            <InputGroup.Addon onClick={() => this.search()}>
              <Glyphicon glyph="search"></Glyphicon>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>

          {
            this.state.searchArtist !== null
            ?

              <SearchedArtist
                artist={this.state.searchArtist}
              />

            : <div></div>
            }

            {
              this.state.relatedArtists !== null && this.state.searchArtist !== null
              ?
                <div>
                  <RelatedArtists
                    relatedArtists={this.state.relatedArtists}
                    artist={this.state.searchArtist}
                  />
                </div>
              : <div></div>
            }

      </div>
    )
  }
}

export default  App;
