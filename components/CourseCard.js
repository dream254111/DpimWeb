import { Divider, Avatar, Progress } from 'antd'
import { Button } from '../components/index'
import Router from 'next/router'
import Tag from './Tag'
import styled from 'styled-components'
import font from '../helpers/font'
const commaNumber = require('comma-number')
import { UserOutlined } from '@ant-design/icons'
import moment from 'moment'
import { timeConvert } from '../helpers/util'
moment.locale('th')

const CourseCard = styled('div')`
  background-color: white;
  border: 1px solid #BDBDBD;
  border-radius: 8px;
  width: 331px !important;
  margin-right: 16px;
  cursor: pointer;
  transition: .5s ease;
  :hover {
    transform: scale(1.1);
  }
`

const CourseCardHeader = styled('div')`
  padding: 12px;
`

const CourseCardImage = styled('div')`
  height: 152px;
  width: 100%;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  border-radius: 16px;
`

const CourseCardContent = styled('div')`
  padding: 12px;
`

const CourseCardTitle = styled('div')`
  word-break: break-all;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 18px;
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
  font-size: 14px;
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
  padding-bottom: 32px;
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
  type='default',
  id,
  certId,
  name,
  categoryName,
  categoryColor,
  cover,
  cost,
  hasCertificate,
  instructors = [],
  totalLesson,
  startLearning,
  lessonTime,
  endDate,
  isHasCost,
  progress,
  batch,
  ...rest
}) => {
  const instructorNames = instructors.length > 0 && instructors.map(item => `${item.firstname} ${item.lastname}`) || []
  const onClickCard = () => {
    if (type === 'cert') {
      Router.push(`/profile/certificate/${certId}`)
    } else {
      Router.push(`/course/${id}`)
    }
  }
  return (
    <CourseCard
      onClick={onClickCard}
      {...rest}
    >
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
        <CourseCardTitle>{name}&nbsp;(รุ่น {batch})</CourseCardTitle>
        {
          type === 'default' &&
          <>
            <AuthorContent>
              <Avatar 
                icon={<UserOutlined />} 
                src={instructors.length > 0 && instructors[0].profile} size={32} />
              <AuthorName>{instructors.length > 0 && `${instructors[0].firstname} ${instructors[0].lastname}`}</AuthorName>
            </AuthorContent>
            <CourseTypeContent>
              <Tag color={categoryColor}>{categoryName}</Tag>
              {
                hasCertificate &&
                <Tag outline>มีใบประกาศฯ</Tag>
              }
            </CourseTypeContent>
            <CourseTimeContent>
              {
                 !startLearning &&
                   <CourseTimeText> </CourseTimeText>
              }
              {
                startLearning &&
                  <CourseTimeText>เริ่มเรียน {startLearning && moment(startLearning).add(543, 'year').format('DD MMMM YYYY')}</CourseTimeText>
              }
              <CoursePrice>{isHasCost ? `${commaNumber(cost)} บาท` : 'ฟรี'}</CoursePrice>
            </CourseTimeContent>
          </>
        }
        {
          type === 'progress' &&
          <>
          <ProgressBar>
            <Progress percent={progress.toFixed(2)} strokeColor='#00937B' />
          </ProgressBar>
          {
            progress !== 100 &&
            <ProgressButtom>
              <Button
                type='primary'
                onClick={(event) => {
                  event.stopPropagation()
                  Router.push(`/course/${id}/learn`)
                }}
              >เข้าสู่บทเรียน</Button>
              {/* <Text>ปิดระบบใน {endDate} วัน</Text> */}
            </ProgressButtom>
          }
          {
            progress === 100 &&
            <ProgressButtom>
              <RestartCourse
                onClick={(event) => {
                  event.stopPropagation()
                }}
              >เรียนใหม่</RestartCourse>
            </ProgressButtom>
          }
          </>
        }
        
      </CourseCardContent>
    </CourseCard>
  )
}

const RestartCourse = styled('div')`
  color: #00937B;
  font-size: 14px;
  font-family: ${font.bold};
`

const Text = styled('div')`
  font-size: 14px;
` 

const ProgressButtom = styled('div')`
  margin-top: 17px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ProgressBar = styled('div')`
  margin-top: 21px;
`


export default CourseCardComponent
