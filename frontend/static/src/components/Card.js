import React from 'react';
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom';

function Card(props) {
  return (
    <React.Fragment>
        <div className='card'>
          <Link to={props.detailURL}>
            <div className='card-image'>
              <img src={props.image} alt=''/>
            </div>
          </Link>
          <p className='card-title'>{props.name}</p>
        </div>


    </React.Fragment>
  );
};

export default withRouter(Card);
