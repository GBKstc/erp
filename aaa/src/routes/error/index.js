import React from 'react'
import { Icon } from 'antd'
import { App } from '../app'
import styles from './index.less'

const Error = () => (<App>
  <div className={styles.error}>
    <Icon type="frown-o" />
    <h1>404 Not Found</h1>
  </div>
</App>)

export default Error
