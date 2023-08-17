import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import axios from "axios";
import { Input, Card, Pagination } from "antd";
import HomeIcon from "@mui/icons-material/Home";
import greenStar from "../logo/greenStar.png";
import { Link, NavLink, useNavigate } from "react-router-dom";

const { Search } = Input;
const img_path = "https://image.tmdb.org/t/p/w500";
const headers = {
  accept: "application/json",
  //Authorization: `api_key 07e901c426d5c220d6f55e92d009a559`,
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2U5MDFjNDI2ZDVjMjIwZDZmNTVlOTJkMDA5YTU1OSIsInN1YiI6IjY0ZGFmYWIzNzcxOWQ3MDEzZGQ2YTExMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6-BA8pS7NTFV1t89nrj0NC5Pf3KI-_dfz7zybcOi9Ls",
};


function Home() {
  
  const [moviesList, setMoviesList] = useState([]);
  const [cardData, setCardData] = useState("");
  const [pageId, setPageId] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [searchText, setSearchText] = useState("");

  const Navigate = useNavigate();
  
  useEffect(() => {
    if (moviesList?.length === 0) {
      getMovies(pageId);
    }
  }, []);

  const addCard = (moviesLists) => {
    let moviesData = [];
    moviesLists?.length > 0 &&
      moviesLists.map((movie) => {
        moviesData.push(
          <Card
            className="movie-card cursor-pointer"
            onClick={() =>
              Navigate("/movie-details", {
                replace: true,
                state: { id: movie.id },
              })
            }
          >
            {/* <Link to={"/movie-details?id=" + movie.id} > */}
            <div className="movie-img">
              <img className="w-100" src={img_path + movie.poster_path} />
            </div>

            <div className="movie-data pt-2">
              <Row className="m-0">
                <Col lg="9" className="p-0 movie-title">
                  <h6>{movie.original_title}</h6>
                </Col>
                <Col lg="3" className="p-0">
                  <div className="movie-rating">
                    {movie.vote_average}/10 &nbsp;
                    <img
                      className="movie-rating-img"
                      src={greenStar}
                      alt="star"
                    />
                  </div>
                </Col>
              </Row>
              <div className="movie-description">
                {movie.overview}
              </div>
            </div>
            {/* </Link> */}
          </Card>
        );
      });
    setCardData(moviesData);
  };

  const getMovies = (pageId) => {
    let payload = {
      page: pageId,
    };

    axios
      .get("https://api.themoviedb.org/3/discover/movie", {
        params: payload,
        headers: headers,
      })
      .then((res) => {
        let { data, page, total_results } = res;
        setMoviesList(data.results);
        setTotalPageCount(data.total_results > 5000 ? 5000 : data.total_results);
        addCard(data.results);
      })
      .catch((err) => {
        alert("some error occured");
      });
  };
  const onHomeClick = () => { 
    setPageId(1);
    setSearchText("");
    getMovies(1);
  } 

  const onSearch = (value, pageId) => {
    setSearchText(value);
    
    let payload = {
      query: value,
      page: pageId
    };
    axios
      .get("https://api.themoviedb.org/3/search/movie", {
        params: payload,
        headers: headers,
      })
      .then((res) => {
        let { data, page, total_pages } = res;
        setMoviesList(data.results);
        setTotalPageCount(data.total_pages > 5000 ? 5000 : data.total_pages);
        addCard(data.results);
      })
      .catch((err) => {
        alert("some error occured");
      });
    console.log(value);
  };

  const onPageChange = (pageId) => {
    setPageId(pageId);
    if(searchText !== ""){
      onSearch(searchText, pageId)
      return;
    }
    getMovies(pageId);
  };

  const onSeachChange = (e) => {
    console.log(e);
    setSearchText(e.target.value);
  }

  return (
    <div id="home">
      <div className="header-bar p-3 ">
        <Row>
          <Col lg="2" sm="4" className="align-center">
            <HomeIcon onClick={onHomeClick} className="cursor-pointer"/>
          </Col>
          <Col lg="8" sm="4">
            <Search
              placeholder="Search Movies"
              onSearch={(value) => onSearch(value, pageId)}
              style={{
                width: "100%",
              }}
              onChange={onSeachChange}
              value={searchText || ""}
            />
          </Col>
        </Row>
      </div>
      <div className="app-start">
        <div className="movies mt-2">
          <Row>
            {cardData &&
              cardData?.length &&
              cardData.map((data) => {
                return (
                  <Col sm="3" className="p-2">
                    {data}
                  </Col>
                );
              })}
          </Row>
        </div>
        <div className="home-pagination px-2">
          {moviesList && moviesList?.length > 0 && (
            <Pagination
              current={pageId}
              total={totalPageCount}
              showSizeChanger={false}
              onChange={onPageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
