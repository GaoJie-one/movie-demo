import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getFormat } from '@/js/ajax';
import './index.scss'

export default function Detail() {
    const params = useParams()
    const [detailData, setDetailData] = React.useState({
        genres: [],
        production_companies: [],
        spoken_languages: []
    });
    useEffect(() => {
        getDetail()
    }, []);
    function getDetail() {
        getFormat(
            'https://api.themoviedb.org/3/movie/' + params.id,
            {
                api_key: '2ff0ae25c5a506f6a57ee216b194ba20',
                language: 'zh-CN',
                append_to_response: 'videos'
            },
            (res) => {
                console.log('获取电影详情成功', res);
                setDetailData(res);
            },
            (err) => {
                console.error('获取电影详情失败', err);
            }
        )
    }
    return (
        <div className='detail-page'>
            <h1>
                {detailData.title}
                <span>{detailData.title !== detailData.original_title ? '(' + detailData.original_title + ')' : ''}</span>
            </h1>
            <div className='introduction'>
                <img src={`https://image.tmdb.org/t/p/w500${detailData.backdrop_path}`} alt="" />
                <div className='info'>

                    <h3>发布日期：{detailData.release_date}</h3>
                    <h3>语言：
                        {detailData.spoken_languages.map((language, idx) => (
                            <span key={language.iso_639_1}>
                                {language.english_name}({language.name})
                                {idx !== detailData.spoken_languages.length - 1 ? ' / ' : ''}
                            </span>
                        ))}
                    </h3>
                    <ul className='tags'>
                        {
                            detailData.genres.map((genre) => (
                                <li key={genre.id}>{genre.name}</li>
                            ))
                        }
                    </ul>
                    <p>{detailData.overview}</p>
                </div>
            </div>
            <h2>制作公司</h2>
            <ul className='production-companies'>
                {
                    detailData.production_companies.map((company) => (
                        <li key={company.id}>
                            <img src={`https://image.tmdb.org/t/p/w500${company.logo_path}`} alt="" />
                            <h4>{company.name}({company.origin_country})</h4>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
