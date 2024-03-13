import React from "react"
import img1 from './assets/img1.jpg'
import img2 from './assets/img2.jpg'
import img3 from './assets/img3.jpg'
import img4 from './assets/img4.jpg'
import img5 from './assets/img5.jpg'
import hor1 from './assets/hor1.jpg'
import img9 from './assets/img9.jpg'
import img7 from './assets/img7.jpg'
import hor from './assets/hor.jpg'
import './home.css'
export default function Home(){
    const styles = {
        height:'240px',
        width: '200px'
    }
      
return(
  <>
    <h1 style={{color:' white'}}>Last Movie Premieres</h1>
  <div className="dark">
  
<div className="dari"> <img src={img1} alt="" style={styles} /></div>
<div className="dari" id="dar"> <img src={img2} alt=""  id="darit"/></div>
<div className="dari"> <img src={img3} alt="" style={styles} /></div>
<div className="dari"> <img src={img4} alt="" style={styles} /></div>
<div className="dari"> <img src={hor} alt="" style={styles} /></div>
  </div>
  <div className="watch"><h3>Watch in HD</h3></div>
  <div className="sec">
    <div className="sec1" id="sec1"><h4 style={{textAlign:'left'}}>Latest Movies</h4></div>
    <div className="sec1" id="s1"><h4>Most Anticipated Premieres</h4></div>
  </div>
  <div className="sec3">
    <div className="sec2"><img src={img5} alt="" id="sec2"/><p className="pae"><big><b>The Expendable Wills 2</b></big><br /> <br />tells the story of Andy Dufresne, played by Tim Robbins, who is wrongfully convicted of murder and sentenced to life in Shawshank State Penitentiary. The movie explores themes of hope, friendship, resilience, and the human spirit's ability to endure in the face of adversity.</p> 
    <button className="button">Watch in HD</button> <button className="button" style={{ backgroundColor:  '#333', width:'20px' }}> &gt; </button>
    </div>
    
    <div className="sec4" id="s2">
<img src={img9} alt="" style={{width: '120px', height: '170px'}} id="sec4"/>
<img src={hor1} alt="" style={{width: '120px', height: '170px'}} id="sec4"/>
    </div>
  </div>
  <div className="sec3">
  <div className="sec2"><img src={img7} alt="" id="sec2"/><p className="pae"><big><b>The Expendable Wills 2</b></big><br /> <br />tells the story of Andy Dufresne, played by Tim Robbins, who is wrongfully convicted of murder and sentenced to life in Shawshank State Penitentiary. The movie explores themes of hope, friendship, resilience, and the human spirit's ability to endure in the face of adversity.</p> 
    <button className="button">Watch in HD</button> <button className="button" style={{ backgroundColor:  '#333', width:'20px' }}> &gt; </button>
    </div>
    <div className="se" id="s2">
        <h3 style={{color:' white' }}>Facts And News</h3>
        <p style={{backgroundColor:' red',color:'white', width: '100px',}}>11Mar,2024</p>
        <p style={{color:'white'}}>Popcorn and movies go hand in hand</p>
        <p style={{backgroundColor:' red',color:'white', width: '100px'}}>8Mar,2024</p>
        <p style={{color:' white'}}>Movie trailers were originally shown after the feature</p>
        <p style={{backgroundColor:' red',color:'white', width: '100px'}}>2Mar,2024</p>
        <p style={{color:' white'}}>films like "Avengers: Endgame" and "Black Panther," the MCU has amassed billions of dollars at the box office.</p>
    </div>
  </div>
  </>
)
}