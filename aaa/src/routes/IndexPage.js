import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './IndexPage.css';

function IndexPage(match) {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>DVA</h1>
      {/* <div>{match.url}</div> */}
      {/* <Link to="/users">dash</Link> */}
    </div>
  );
}


export default IndexPage;
