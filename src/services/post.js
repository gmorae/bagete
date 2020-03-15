import Request from './request'

export const post = (qtd, total) => Request.post('/', {qtd, total})