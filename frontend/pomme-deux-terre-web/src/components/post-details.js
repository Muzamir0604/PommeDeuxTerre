import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  { faStar } from '@fortawesome/free-solid-svg-icons'
class PostDetails extends Component {
  state = {
    highlighted: -1
  }
  highlightReview = high => evt => {
    this.setState({highlighted:high})
  }
  reviewClicked =  stars => evt => {
    fetch(`${process.env.REACT_APP_API_URL}/blog/posts/${this.props.post.id}/review_post/`,
      {
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Token ${this.props.token}`
        },
        body: JSON.stringify({
          stars: stars + 1
        })
      }).then (resp => resp.json())
      .then(res => this.getDetails())
      .catch(error => console.log(error))
  }
  getDetails = () => {
    fetch(`${process.env.REACT_APP_API_URL}/blog/posts/${this.props.post.id}/`,
      {
        method:'GET',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Token ${this.props.token}`
        }
      }).then (resp => resp.json())
      .then(res => this.props.updatePost(res))
      .catch(error => console.log(error))

  }

  render(){
    const mov = this.props.post;
    return (
      <React.Fragment>
      {this.props.post ? (
        <div>
            <h3>{mov.title}</h3>
            <FontAwesomeIcon icon={faStar} className ={mov.avg_rating > 0 ? 'orange': ''}/>
            <FontAwesomeIcon icon={faStar} className ={mov.avg_rating > 1 ? 'orange': ''}/>
            <FontAwesomeIcon icon={faStar} className ={mov.avg_rating > 2 ? 'orange': ''}/>
            <FontAwesomeIcon icon={faStar} className ={mov.avg_rating > 3 ? 'orange': ''}/>
            <FontAwesomeIcon icon={faStar} className ={mov.avg_rating > 4 ? 'orange': ''}/>
            ({mov.no_of_reviews})
            <p>{mov.description}</p>
            <div className="review-container">
              <h2>Review It !!!</h2>
              { [...Array(5)].map((e,i) => {
                return <FontAwesomeIcon key={i} icon={faStar} className ={ this.state.highlighted > i-1 ? 'purple': ''}
                  onMouseEnter={this.highlightReview(i)} onMouseLeave={this.highlightReview(-1)} onClick={this.reviewClicked(i)}/>
              })}
            </div>
        </div>
    ): null}
  </React.Fragment>)
  }
}

export default PostDetails;
