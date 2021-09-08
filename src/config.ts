const $ = process.env

export const NODE_ENV = $.NODE_ENV || 'development'

export const API_URL =
    (NODE_ENV === 'development' && 'http://127.0.0.1:5000/graphql') ||
    (NODE_ENV === 'production') && 'https://c-terapias-api.herokuapp.com/graphql' || ''