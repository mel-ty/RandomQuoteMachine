import React from 'react';
import {useState} from 'react';
import './App.scss';


function Footer() {
  const [visibility, setVisibility] = useState(false);
  return (
    <div id='bottom'>
      <button id='references' onClick={() => setVisibility(!visibility)} className={visibility ? 'references-on' : 'references-off'}>References</button>
      <footer id='footer' className={visibility ? 'footer-on' : 'footer-off'}>
         <ul>
          <li><a href="https://www.flaticon.com/free-icons/twitter" title="twitter icons" target='_blank' rel="noreferrer">Twitter icons created by Google - Flaticon</a></li>
          <li><a href='https://www.freecodecamp.org/news/fetch-data-react/' target='_blank' rel="noreferrer">How to Fetch Data in React: Cheat Sheet + Examples</a></li>
          </ul>
       </footer>
    </div>
  )
};

class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: '',
      author: '',
      urlToTweet: '',
      color: '#BBE5ED',
      animation: 'text-animation-on'
    };
    this.fetching = this.fetching.bind(this)
    this.sendTweet = this.sendTweet.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
  }
  fetching() {
    const myRequest = new Request('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
    fetch(myRequest)
    .then(response => {
      if (response.ok) {
       return response.json()
      }
    })
    .then(quotesObj => {
      const randomIndex = Math.floor(Math.random()*quotesObj.quotes.length);
      this.setState({
        quote: quotesObj.quotes[randomIndex].quote,
        author: quotesObj.quotes[randomIndex].author
      })
    })
    .catch(error => console.log('Fetch API error: ', error))
  }
  
  sendTweet() {
    const appendToURL = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=';
    let tweetText = encodeURIComponent('"'+this.state.quote+'" - '+this.state.author);
    this.setState({
      urlToTweet: appendToURL+tweetText
    })
  }
  
  handleOnClick() {
    this.fetching();
    this.sendTweet();
    this.setState({animation: 'text-animation-off'});
    setTimeout(() => {
      this.setState({animation: 'text-animation-on'})
    }, 200);
    const colors=['#F9E0DC', '#D1D2DB', '#A894B3', '#C27085', '#ACA5B6', '#DAA9B6', '#9678BA', '#F78E69', '#6184D8'];
    const newColor = colors[Math.floor(Math.random()*colors.length)];
    this.setState({
      color: newColor
    });
  }

  componentDidMount() {
    this.fetching()
    this.sendTweet()
  }


render() {
    return(
  <div id='container'>
    <style>
      {`
      :root {
        --animation-color: ${this.state.color};
      }
      `}
      </style>
      <div id="quote-box">
        <p id='text' className={this.state.animation}>{this.state.quote}</p>
        <p id='author'>{this.state.author}</p>
        <div id='buttons'>
          <a id="tweet-quote" href={this.state.urlToTweet} target='_blank' rel="noreferrer"><img src='https://cdn-icons-png.flaticon.com/512/60/60580.png' alt='twitter-logo'/></a>
          <button id='new-quote' style={{backgroundColor: this.state.color}} onClick={this.handleOnClick}>Some words of wisdom</button>
        </div>
      </div>
      <Footer />
  </div>
  )
 }
};

export default MyApp;