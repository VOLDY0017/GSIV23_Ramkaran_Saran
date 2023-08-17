import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Card } from "antd";
import { Row, Col } from "reactstrap";
import logoImdb from "../logo/logoImdb.svg";
import greenStar from "../logo/greenStar.png";
import axios from "axios";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const img_path = "https://image.tmdb.org/t/p/w500";

function Details() {
    const location = useLocation();
    const { id } = location.state;
    const [movieData, setMovieData] = useState({});  

    const Navigate = useNavigate();
    useEffect (() => {
        const headers = {
            accept: "application/json",
            //Authorization: `api_key 07e901c426d5c220d6f55e92d009a559`,
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2U5MDFjNDI2ZDVjMjIwZDZmNTVlOTJkMDA5YTU1OSIsInN1YiI6IjY0ZGFmYWIzNzcxOWQ3MDEzZGQ2YTExMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6-BA8pS7NTFV1t89nrj0NC5Pf3KI-_dfz7zybcOi9Ls",
          };
        axios.get("https://api.themoviedb.org/3/movie/" + id + "?language=en-US",
        {headers: headers,})
        .then((res) => {
            let {data} = res;
            setMovieData(data);
            console.log(data);
        })
        .catch((err) => {
          alert("some error occured");
        })
    }, [])
    
  return (
    <div className="movie-details">
      <Card className="movie-detail-card">
        <div className="mb-2"><ArrowBackIcon onClick={() => Navigate('/')}/></div>
        <Row>
          <Col lg="2" className="">
            <div>
              <img
                className="w-100"
                src={img_path + movieData.poster_path}
              />
            </div>
          </Col>
          <Col lg="10" className="">
            <h2>{movieData.original_title}</h2>
            <h4>{movieData.release_date?.slice(0,4)} [{movieData.spoken_languages?.map(language => {
                return language.english_name + " ";
            }
            )}
            ]
            </h4>

              <div className="movie-detail-rating">
                <img
                  className="movie-detail-rating-img"
                  src={logoImdb}
                  alt="IMDB"
                />{" "}
                &nbsp; &nbsp; &nbsp;
                <b style={{fontSize: '18px'}}>{movieData.vote_average}</b>/10 &nbsp;
                <img
                  className="movie-detail-rating-img"
                  src={greenStar}
                  alt="star"
                />
                &nbsp;
                {parseInt(movieData.vote_count / 1000) > 0
                  ? parseInt(movieData.vote_count / 1000) + "K"
                  : movieData.vote_count}
              </div>
            <div className="movie-description-text">
                {movieData.overview}
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default Details;
