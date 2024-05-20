import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import GreenButton from '../primitives/GreenButton';
import TableContainer from '../containers/TableContainer';
import BookAdd from './subpages/BookAdd';

import { getGenericRequest } from '../../utils/api';

export default function Books() {
  const [searchParams] = useSearchParams();
  const [subpage, setSubPage] = useState(searchParams.get('subpage'));

  return (
    <main className='d-flex flex-column flex-fill p-5'>
      <h2>Books</h2>
      <div className='d-flex justify-content-center spaced-div'>
        <GreenButton
          text={'View All'}
          clickFunction={() => {
            setSubPage('viewBooks');
          }}
        />
        <GreenButton
          text={'New Book'}
          clickFunction={() => {
            setSubPage('newBook');
          }}
        />
      </div>
      <section className='d-flex justify-content-center top-split mt-4 py-5'>
        {subpage === 'viewBooks' ? (
          <TableContainer
            title={'All Books'}
            fetchFunction={getGenericRequest}
            fetchParams={'books'}
            fetchKey={'books'}
          />
        ) : subpage === 'newBook' ? (
          <BookAdd />
        ) : null}
      </section>
    </main>
  );
}
