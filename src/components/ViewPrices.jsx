import {useState,useEffect } from 'react'
import GreenButton from './GreenButton';
import TablePage from './TablePage'

import {getPrices} from '../utils/api';

export default function ViewPrices(props){

    return (
        <>
            <TablePage title = {"Price data"} fetchFunction = {getPrices} fetchKey = {"prices"} />
        </>
    )
} 