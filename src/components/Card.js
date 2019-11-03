import React from 'react';

class Card extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDescription: false,
        }
    }

    toogleDescription = () => {
        this.setState({
            isDescription: !this.state.isDescription,
        });
    }

    toogleLike = () => {
        this.props.pushLikedMovieId(this.props.id);
    }

    render() {
        const {title, backgroundImage, data, voteAverage, voteCount, description, isLiked} = this.props;

        return (
            <div className="card">
                <div
                    className="card__image"
                    style={{
                        backgroundImage: `url('${backgroundImage}')`
                    }}
                />
                
                <div className="card__title">
                    {title}
                </div>
            
                <div className="card__like">
                    <i className="fa fa-heart-o"/>
                </div>
            
                <div className="card__subtitle">
                    <span>{data}</span>
                    <span>{voteAverage} ({voteCount} votes)</span>
                </div>
                <div className="card-info">
                    <button className="card-info__likeButton" style={{marginBottom : '10px'}} onClick={this.toogleLike}>{isLiked ? 'Unlike' : 'Like'}</button>
                    <div className="card-info__header">SUMMARY</div>
                    <button className="card-info__hideButton" onClick={this.toogleDescription}>Toogle Description</button>
                    <div className="card-info__description">
                        {this.state.isDescription ? description : ''}
                    </div>
                </div>
            </div>
        )
    }
}

export  default  Card;