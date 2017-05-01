import React, { Component } from 'react';
import './css/App.css';

class RelatedArtists extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTrack:'',
      playing: false,
    }
  }
  playTrack(audio, url) {
    if (this.state.playing === false) {
      audio.play();
      this.setState({
        currentTrack: url,
        playing: true,
        audio
      });
    } else {
      if (this.state.currentTrack === url) {
        this.state.audio.pause();
        this.setState({
          playing: false
        });
      } else {
        this.state.audio.pause();
        audio.play();
        this.setState({
          playing: true,
          currentTrack: url,
          audio
        })
      }
    }
  }
  componentWillUnmount() {
    if (this.state.audio) {
      this.state.audio.pause();
    }
  }
  render() {
    const relatedArtists = this.props.relatedArtists;
    const searchedArtist = this.props.artist;
    console.log(this.props);
    return (
      <div>
        <h2>Artists Similar To {searchedArtist.name}</h2>
        <div className="RelatedArtists">
          {
            relatedArtists.map((artist, k) => {
              return (
                <div className="relatedArtist" key={k}>
                <div className="imageDiv" onClick={() => this.playTrack(artist.topTrack, artist.trackURL)}>
                  <img
                    className="raImage"
                    src={artist.image}
                    alt={artist.name}

                  />
                  <div className="playControl">
                    {
                      this.state.currentTrack === artist.trackURL && this.state.playing === true
                        ? <span>| |</span>
                        : <span>&#9654;</span>
                    }
                  </div>
                  </div>
                  <h6>{artist.name}</h6>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default RelatedArtists;
