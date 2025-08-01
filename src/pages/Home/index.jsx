import React, { useEffect, useState } from 'react'
import Search from '@c/Search'
import List from '@c/List';
import { getFormat } from '@/js/ajax';
import './index.scss'

export default function Home() {
    const [movieList, setMovieList] = useState([]);
    useEffect(() => {
        getList()
    }, []);
    function getList(value) {
        let params = {
            api_key: '2ff0ae25c5a506f6a57ee216b194ba20',
            language: 'zh-CN',
        }
        if (value) {
            params = {
                ...params,
                query: value
            }
        }
        getFormat(
            'https://api.themoviedb.org/3/discover/movie',
            params,
            (res) => {
                console.log('获取电影列表成功', res);
                setMovieList(res.results);
            },
            (err) => {
                console.error('获取电影列表失败', err);
            }
        )
    }
    function handleSearch(value) {
        getList(value);
    }
    return (
        <div className='home-page'>
            <Search onSearch={handleSearch} />
            <List data={movieList} />
        </div>
    )
}
