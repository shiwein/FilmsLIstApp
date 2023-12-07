import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {createMoviesThunk, deleteMovieThunk, findAllMoviesThunk} from "./movies-thunks";
import {userLikesMovieThunk} from "../likes/likes-thunks";
import {profileThunk} from "../users/users-thunks";

const Movies = () => {
    const {currentUser} = useSelector((state) => state.users)
    const {movies} = useSelector((state) => state.movies)
    const [movie, setMovie] = useState({title: 'New Movie'})
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(findAllMoviesThunk())
        dispatch(profileThunk())
    }, [])
    return(
        <>
            <h1>Movies</h1>
            {
                currentUser &&
                <h2>Welcome {currentUser.username}</h2>
            }
            <ul className="list-group">
                <li className="list-group-item">
                    <button className="btn btn-success float-end" onClick={() => {
                        dispatch(createMoviesThunk(
                            {
                                title: movie.title
                            }
                        ))
                    }}>Create</button>
                    <input
                        className="form-control w-75"
                        onChange={(e) =>
                            setMovie({...movie, title: e.target.value})}
                        value={movie.title}/>
                </li>
                {
                    movies.map((movie) =>
                        <li className="list-group-item"
                            key={movie._id}>
                            <i onClick={() => {
                                dispatch(deleteMovieThunk(movie._id))
                            }}
                                className="bi bi-trash float-end"></i>

                            <i onClick={() => {
                                dispatch(userLikesMovieThunk({
                                    uid: 111, mid: movie.imdbID
                                }))
                            }} className="float-end bi bi-hand-thumbs-up me-2"></i>
                            <i className="float-end bi bi-hand-thumbs-down me-2"></i>


                            {movie.title}
                        </li>
                    )
                }
            </ul>
        </>
    )
}

export default Movies;