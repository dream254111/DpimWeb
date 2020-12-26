import { Divider, Avatar } from 'antd'
import Router from 'next/router'
import Tag from './Tag'
import styled from 'styled-components'
import font from '../helpers/font'
const commaNumber = require('comma-number')
import { UserOutlined } from '@ant-design/icons'
import moment from 'moment'
moment.locale('th')

const CourseCard = styled('div')`
  background-color: white;
  border: 1px solid #F2F2F2;
  border-radius: 8px;
  width: 331px !important;
  margin-right: 16px;
  cursor: pointer;
`

const CourseCardHeader = styled('div')`
  padding: 12px;
`

const CourseCardImage = styled('div')`
  height: 170px;
  width: 100%;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  border-radius: 8px;
`

const CourseCardContent = styled('div')`
  padding: 12px;
`

const CourseCardTitle = styled('div')`
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  font-family: ${font.bold};
`


const CourseCardDetail = styled('div')`
  margin-top: 12px;
  display: flex;
  align-items: center;
`

const CourseCardIcon = styled('span')`

`

const CourseCardDetailText = styled('div')`
  margin-left: 7.33px;
  font-size: 12px;
`

const CourseCardItem = styled('div')`
  display: flex;
  align-items: center;
  :not(:first-child){
    margin-left: 14px;
  }
`


const AuthorContent = styled('div')`
  margin-top: 12px;
  display: flex;
  align-items: center;
`

const AuthorAvatar = styled('div')`
  width: 32px;
  height: 32px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: top;
  border-radius: 50%;
`

const AuthorName = styled('div')`
  margin-left: 8px;
  color: #828282;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 80%;
  height: 1.2em;
  white-space: nowrap;
`

const CourseTimeContent = styled('div')`
  margin-top: 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const CourseTimeText = styled('div')`
  font-size: 14px;
`

const CoursePrice = styled('div')`
  font-size: 20px;
  font-family: ${font.bold};
  color: #00937B;
`

const CourseTypeContent = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
`

const CourseCardComponent = ({
    id,
    categoryName,
    categoryColor,
    cover,
    cost,
    hasCertificate,
    instructors = [],
    totalLesson,
    startLearning,
    lessonTime,
    isHasCost,
    ...rest
  }) => {
  const instructorNames = instructors && instructors.map(item => `${item.first_name} ${item.last_name}`) || []

  const timeConvert = (n) => {
    const num = n
    const hours = (num / 60)
    const rhours = Math.floor(hours)
    const minutes = (hours - rhours) * 60
    const rminutes = Math.round(minutes)
    return `${rhours} ชั่วโมง ${rminutes} นาที`
  }

  return (
    <CourseCard onClick={() => Router.push(`/course/${id}`)} {...rest}>
      <CourseCardHeader>
        <CourseCardImage src={cover} />
        <CourseCardDetail>
          <CourseCardItem>
            <CourseCardIcon className='fa fa-book' />
            <CourseCardDetailText>{totalLesson} บทเรียน</CourseCardDetailText>
          </CourseCardItem>
          <CourseCardItem>
          <CourseCardIcon className='fa fa-calendar' />
            <CourseCardDetailText>{timeConvert(lessonTime)}</CourseCardDetailText>
          </CourseCardItem>
        </CourseCardDetail>
      </CourseCardHeader>
      <Divider style={{ margin: 0 }} />
      <CourseCardContent>
          <CourseCardTitle>{categoryName}</CourseCardTitle>
        <AuthorContent>
          <Avatar 
            icon={<UserOutlined />} 
            src={instructors.length > 0 && instructors[0].profile} size={32} />
          <AuthorName>{instructorNames.join(', ')}</AuthorName>
        </AuthorContent>
        <CourseTypeContent>
          <Tag color={categoryColor}>{categoryName}</Tag>
          {
            hasCertificate &&
            <Tag outline>รับรองใบประกาศฯ</Tag>
          }
        </CourseTypeContent>
        <CourseTimeContent>
          <CourseTimeText>เริ่มเรียน {startLearning && moment(startLearning).format('DD MMMM YYYY')}</CourseTimeText>
          <CoursePrice>{isHasCost ? `${commaNumber(cost)} บาท` : 'ฟรี'}</CoursePrice>
        </CourseTimeContent>
      </CourseCardContent>
    </CourseCard>
  )
}

export default CourseCardComponent