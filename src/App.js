import { useEffect, useRef, useState } from "react";
import "./App.css"
import Star from "./Star.js"

import { useKey } from "./useKey.js";
const tempMovieData = [
 
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },

  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];
const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];
const APIKEY = "493ccb25";

function App(){
  const [search , setSearch] = useState([])
  const [titleSearch , setTitleSearch] = useState();
  const [found , setFound] = useState();
  const [click , setClick] = useState("batman")
  const [movieDetail,setMovieDetail] = useState();
  const [close , setClose] = useState(false)
  const [r,setR] = useState([])
  function Detail(id){
    setClose(true)
    setMovieDetail(movieDetail=>movieDetail === id ? setClose(false) : id)
    
  }

  


  useEffect(function() {

    async function fetchMovie(){
      try{
      setFound("")
      const res = await fetch(`http://www.omdbapi.com/?apikey=${APIKEY}&s=${click}`)
      const data = await res.json();
      console.log(data)
      if(data.Response === "False") throw new Error("movie does found")
      setSearch(data.Search);  
    } catch(message){
      setFound(message)
    


    }
    }
   
    fetchMovie();
  } , [click])


 

  return <div className="App">
    <Container search={search} setTitleSearch={setTitleSearch}  titleSearch={titleSearch} setClick={setClick}
    found={found}
    movieDetail={movieDetail}
    close={close}
    Detail={Detail}
    setClose={setClose}
    setR={setR}
    r={r}
/>
    </div>
}

function Container({search , setTitleSearch , found , titleSearch , setClick , movieDetail ,setClose, close , Detail , r ,setR}){
  return <div className="container">
    <Navbar setTitleSearch={setTitleSearch} titleSearch={titleSearch} setClick={setClick} search={search}/>
    <MoviesYouWatch r={r}/>
    <div className="m">
    <MoviesOne search={search} found={found} Detail={Detail}/>
    <MoviesSecond movieDetail={movieDetail} close={close} setClose={setClose} setR={setR} r={r}/>
    </div> 
  </div>
}

function Navbar({setTitleSearch , titleSearch , setClick , search}){
  const inputEl = useRef(null)
  useKey("Enter" , function(){
    inputEl.current.focus()

    
  })
 
  return <nav className='nav'>
     <div>
      <span id='img'>🍿</span>
      <span id='logotext'>usePopcorn</span>
     </div>
     <div className="rish">
     <input placeholder='Search movies...' onChange={(e)=>{setTitleSearch(e.target.value)}} ref={inputEl}/> 
     <button id="search" onClick={()=>{setClick(titleSearch)}}>Search</button>
    </div>
    <span id='result'>Found {search.length} result</span>
  </nav>
}




function MoviesYouWatch({r}){
  const time = r.map((i)=>i.Runtime)
  let s = 0;
  for(let i = 0;i<time.length;i++){
    s = s + time[i]
  }
 
  return <div className='MoviesYouWatch'>
    <span>MOVIES YOU WATCH</span>
    <span>🍿{r.length}</span>
    <span>⌛ {s}</span>
  </div>
}

function MoviesOne({search , found , Detail  }){
  const [open , setOpen] = useState(true);
  return <div className='moviesone'>
    {found ? <span id="error">movie is not found</span> : <> <button className="btn" onClick={()=>{setOpen(!open)}}>+</button>
    {open ? <>
      {search.map((item)=> <li onClick={()=>Detail(item.imdbID)}>
    <img id='img' src={item.Poster} alt={item.Title} />
    <div>
     <span id='title'>{item.Title}</span>
     <span>{item.Year}</span> 
    </div>
  </li> )}
  </>:""}</>}
   
    
    
    

  </div>
}

function MoviesSecond({movieDetail , close ,setClose ,setR , r}){
  const [open , setOpen] = useState(true);
  const [newArr, setNewArr] = useState([])
  const [star , setStar] = useState()

  const count = useRef(0)



  useEffect(function(){
    if (star) count.current = count.current + 1;
  },[star])
  


  const isin = r.map((i)=>i.imdbID).includes(movieDetail)
 

  function Delete(imdbID){
    setR(r.filter((i)=> i.imdbID !== imdbID))
    
    

    
  }
  
  useKey("Escape",setClose)

  // useEffect(function(){
  //   function callback(e){
  //     if (e.code === "Escape"){
  //       setClose(false)
  //     }

  //   }


  //   document.addEventListener("keydown" , callback)

  //   return function(){
  //     document.removeEventListener("keydown" , callback)

  //   }
  // },[setClose])


  useEffect(function() {
    async function MoviesFullDetail(){
      const res = await fetch(`http://www.omdbapi.com/?apikey=${APIKEY}&i=${movieDetail}`);
      const data = await res.json()
      
      setNewArr(data)


    }
    MoviesFullDetail()
  } , [movieDetail])


  const { Poster , Title , Year , Genre , imdbRating , Plot , Actors , Director , imdbID ,Runtime

  } = newArr

  function Add(){
    const n = {
      imdbID,
      Poster,
      Title,
      Runtime : Number(Runtime.split(" ").at(0)),
      imdbRating,
      star,
      count : count.current
    }
    setR([...r,n])
    setClose(false)
   

  }





  return <div className='moviesSecond'>
    {close ? <> <div className='img'>
      <img id="msimg" src={Poster} alt={Title} />
      <div className='info'>
      <h3>{Title}</h3>
      <span>{Year}</span>
      <span>{Genre}</span>
      <span>⭐{ imdbRating} IMDB Rating</span>
    </div> </div> <div className='movieContent'>
      <div className='rating'>
       {isin ? "" :  <Star  maxRating ={10}  defaultRating = {1} onSetraing={setStar}/>}
       {isin ? <span>YOU RATED THIS MOVIE ALREDY </span> :<button id='btnadd' onClick={Add}>add to list</button> }
       
      </div>
    
      <div className='content'>
        <p>{Plot}</p>
        <p>{Actors}</p>
        <p>Directed by {Director}</p>
      </div>
    </div> </>: <><button className="btn" onClick={()=>{setOpen(!open)}}>+</button>
    {open ? <> {r.map((item)=><li key={item.imdbID} >
    <img id='img' src={item.Poster} alt={item.Title} />
    <div>
     <span id='title'>{item.Title}</span>
     <div className='w'>
          <span>⭐ {item.imdbRating}</span>
          <span>🌟 {item.star}</span>
          <span>⌛ {item.Runtime}</span>
          <button id="x" onClick={()=>Delete(item.imdbID)}>x</button>
      </div>
    </div>
  </li>)}</> : ""}</>}
    
    
  </div>
}





export default App;
