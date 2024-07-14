import styles from './Invitation.module.scss'

import classNames from 'classnames/bind'
import Section from '../shared/Section'
import Text from '../shared/Text'

const cx = classNames.bind(styles)

function Invitation({ message }: { message: string }) {
  return (
    <Section
      className={cx('container')}
      title={
        <div className={cx('wrap-header')}>
          <span className={cx('title')}>INVITATION</span>
          <span className={cx('sub-title')}>소중한 분들을 초대합니다</span>
        </div>
      }
    >
      <Text>{message}</Text>
    </Section>
  )
}

export default Invitation
