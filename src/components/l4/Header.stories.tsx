import React from 'react'

import Header from './Header'

export default {
    title: 'l4/Header',
    component: Header,
}

export const show = () => {
    return <Header title={'hoge'} />
}
