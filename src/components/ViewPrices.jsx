import {useState,useEffect } from 'react'
import GreenButton from './primitives/GreenButton';
import TableContainer from './containers/TableContainer'

import {getPrices} from '../utils/api';

export default function ViewPrices(props){

    return (
        <>
            <TableContainer title = {"Price data"} fetchFunction = {getPrices} fetchKey = {"prices"} />
        </>
    )
} 