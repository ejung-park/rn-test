import React from 'react';

class Posts extends React.Component {
  //컴포넌트생성시 생명주기 : constructor -> componentWillMount -> render
  constructor(props){
    super(props);
    this.state={
      posts : []
    }
  }

  componentWillMount() {

    var myHeaders = new Headers({
      'Content-Type': 'text/plain'
    });
    fetch(`http://192.168.0.89:8080/json/`, {
      method:'POST',
      headers: myHeaders
    })
    .then(result => result.json())
    .then(data => this.setState({
      posts:data
    }));

  }

  render() {
    const { posts } = this.state;
    const postsList = posts.map((post) => (
            <div key={post.me_id} id={post.me_id}>
                <h4>{post.me_name}</h4>
                <h4>{post.me_code}</h4>
            </div>
        ));
    return (
      <div>
        {postsList}
      </div>
    );
  }


}

function objToQueryString(obj) {
  const keyValuePairs = [];
  for (const key in obj) {
    keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
  }
  return keyValuePairs.join('&');
}
export default Posts;
