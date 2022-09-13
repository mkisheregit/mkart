import React, { useContext } from 'react';

import ProuductTemp from '../ProductTemplate/ProuductTemp';
import { CreateContextData } from '../../Contexts/ContextData';
import './Home.css';
import Login from '../Login/Login';
//import { createLoggedInContext } from '../../Contexts/LogInContext';

function Home(props) {
  const { data, isloggedIn } = useContext(CreateContextData);
  /*Display Login page if user is not loggedIn */
  //const { isloggedIn } = useContext(createLoggedInContext);

  if (!props.search) {
    return (
      <div className="home">
        {data.map((product) => {
          return <ProuductTemp product={product} key={product.id} />;
        })}
        {!isloggedIn && (
          <div className="warning">
            <Login
              message={'Login first to add items'}
              className="login-comp"
            />
          </div>
        )}
      </div>
    );
  } else {
    const filteredData = data.filter((product) => {
      return (
        product.category.includes(props.search) ||
        product.title.includes(props.search)
      );
    });

    return (
      <div className="home">
        {filteredData.length > 0 ? (
          filteredData.map((product) => {
            return <ProuductTemp product={product} key={product.id} />;
          })
        ) : (
          <p className="no-item-found">
            No item found of <b>{props.search}</b> category
          </p>
        )}
        {!isloggedIn && (
          <div className="warning">
            <Login
              message={'Login first to add items'}
              className="login-comp"
            />
          </div>
        )}
      </div>
    );
  }
}

export default Home;
