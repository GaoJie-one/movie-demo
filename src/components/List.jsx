import React from 'react'
import { Link } from 'react-router-dom';

export default function List({ data = [] }) {
    return (
        <ul className='movie-list'>
            {data.map(item => (
                <Link to={`/detail/${item.id}`} key={item.id}>
                    <li>
                        <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="" />
                        <h2>{item.title}</h2>
                    </li>
                </Link>
            ))}
        </ul>
    )
}
