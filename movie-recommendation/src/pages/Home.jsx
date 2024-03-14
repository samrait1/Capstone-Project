import React from "react"
import Main from "../components/Main"
import Row from "../components/Row"
import requests from "../Requests"

// https://api.themoviedb.org/3/movie/now_playing?api_key=d9a2926d310b627aa44739b657eac1e2&language=en-US&page=1
const Home = () => {

  return (
    <div>
     <Main genre="popular"/>
     <Row title="UpComing" fetchURL={requests.requestUpcoming} rowID= '1' genre="upcoming" />
     <Row title="Popular" fetchURL={requests.requestPopular} rowID= '2' genre="popular"/>
     <Row title="Top Rated" fetchURL={requests.requestTopRated} rowID= '3' genre="top_rated"/>
     <Row title="Trending" fetchURL={requests.requestTrending} rowID='4' genre="popular"/>
     <Row title="Horror" fetchURL={requests.requestHorror} rowID='5'/>
    </div>
  )
}

export default Home