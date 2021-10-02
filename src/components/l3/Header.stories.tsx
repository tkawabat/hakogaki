
import React from 'react';

import Header from './Header';

export default {
    title: 'l3/Header',
    component: Header,
};

export const show = () => {
    return (<Header title={'hoge'} />);
}
