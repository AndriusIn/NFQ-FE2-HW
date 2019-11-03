import React from 'react';
import Card from './Card';
import axios from 'axios';
import {endpoints, getImageUrl} from '../config';

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            list: [],
            genres: [],
            selectedGenre: '-1',
            likedMovies: [],
        };

        this.toogleGenre = this.toogleGenre.bind(this);
    }

    componentDidMount() {
        axios
            .get(endpoints.mostPopularMovies())
            .then((data) => {
                this.setState({
                    list: data.data.results,
                });
                return axios.get(endpoints.genres());
            })
            .then((data) => {
                this.setState({
                    genres: data.data.genres,
                });
            });
    }

    toogleGenre(event) {
        var genreId = event.target.value;

        if (genreId === '-1')
        {
            axios
                .get(endpoints.mostPopularMovies())
                .then((data) => {
                    this.setState({
                        list: data.data.results,
                    });
                });
        }
        else
        {
            axios
                .get(endpoints.genreMovies(genreId))
                .then((data) => {
                    this.setState({
                        list: data.data.results,
                    });
                });
        }

        this.setState({
            selectedGenre: event.target.value,
        });
    }

    getLikedMovieId = (value) => {
        var likedMoviesArray = this.state.likedMovies;

        var index = likedMoviesArray.indexOf(value); 
        if (index > -1)
        {
            likedMoviesArray.splice(index, 1);
        }
        else
        {
            likedMoviesArray.push(value);
        }

        this.setState({
            likedMovies: likedMoviesArray,
        });
    }

    render() {
        return (
            <div>
                <h1 style={{margin : '20px'}}>Genres</h1>
                <select style={{margin : '20px'}} value={this.state.selectedGenre} onChange={this.toogleGenre}>
                    <option value="-1">Most Popular</option>
                    {this.state.genres.map((genre) => (
                        <option value={genre.id}>{genre.name}</option>
                    ))}
                </select>
                <br />
                {this.state.list.map((card) => (
                    <Card
                        key={card.id}
                        title={card.original_title}
                        backgroundImage={getImageUrl(card.backdrop_path)}
                        data={card.release_date}
                        voteAverage={card.vote_average}
                        voteCount={card.vote_count}
                        description={card.overview}
                        id={card.id}
                        pushLikedMovieId={this.getLikedMovieId}
                        isLiked={this.state.likedMovies.indexOf(card.id) > -1 ? true : false}
                    />
                ))}
            </div>
        );
    }
}

export default App;