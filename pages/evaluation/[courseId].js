import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { message, Button, Input } from 'antd'
import font from '../../helpers/font'
import MainLayout from '../../layouts/main'
import styled from 'styled-components'
import API from '../../helpers/api'
import Container from '../../components/Container'
import Router from 'next/router'
import _ from 'lodash'
const { TextArea } = Input

const Title = styled('div')`
  font-size: 32px;
  font-family: ${font.bold};
`

const Cards = styled('div')`
  margin-top: 16px;
`

const Card = styled('div')`
  background-color: white;
  padding: 24px;
  border: 1px solid #F2F2F2;
  box-shadow: 0px 4px 16px rgba(8, 53, 106, 0.08);
  border-radius: 4px;
  margin: 8px 0;
`

const CardTitle = styled('div')`

`
const Choices = styled('div')`
  margin-top: 8px;
  display: flex;
  align-items: center;
  margin: 8px -8px -8px -8px;
  flex-wrap: wrap;
`

const ChoiceButton = styled('div')`
  background: #FFFFFF;
  border: 1px solid #F2F2F2;
  box-sizing: border-box;
  border-radius: 4px;
  min-width: 111px;
  padding: 16px;
  margin: 8px;
  cursor: pointer;
  text-align: center;
  ${props => props.active && `
    background: #00937B;
    color: white;
    font-family: ${font.bold};
  `}
`

const SubmitButtonWrapper = styled('div')`
  margin-top: 32px;
  text-align: center;
`


const connector = connect(({ memberReducer }) => ({
  memberToken: memberReducer.member.token,
  memberDetail: memberReducer.member,
}))

const SurveyPage = ({
  memberToken,
  courseId
}) => {
  useEffect(() => {
    fetchCourseDetail()
  }, [])

  const [courseDetail, setCourseDetail] = useState({})
  const [score, setScores] = useState([])
  
  const fetchCourseDetail = async () => {
    try {
      const response = await axios({
        headers: {
          'Authorization': memberToken
        },
        method: 'GET',
        url: `${API.url}/Course/course_by_id?course_id=${courseId}`
      })
      const responseWithData = response.data
      if (responseWithData.success) {
        const courseDetail = responseWithData.data
        if (courseDetail.can_use_evaluation === false) {
          message.error('คุณยังไม่สามารถทำแบบประเมินหลักสูตรได้')
          Router.push('/')
        }
        console.log('courseDetail', courseDetail)
        setCourseDetail(courseDetail)
      } else {
        throw new Error(responseWithData.error)
      }
    } catch (error) {
      message.error(error.message)
    }
  }

  const handleSubmit = async () => {
    try {
      if (score.length === 0) throw new Error('กรุณาเลือกคำตอบ')
      const response = await axios({
        headers: {
          'Authorization': memberToken
        },
        method: 'POST',
        url: `${API.url}/Course/send_answer_evaluation`,
        data : {
          course_id: courseId,
          answer: score
        }
      })
      const responseWithData = response.data
      if (responseWithData.success) {
        Router.push('/profile')
      } else {
        throw new Error(responseWithData.error)
      }
    } catch (error) {
      message.error(error.message)
    }
  }

  const handleClickChoice = (choiceId, evaluationId) => {
    const _score = JSON.parse(JSON.stringify(score))
    const data = {
      course_evaluation_id: evaluationId,
      course_evaluation_choices_id: choiceId,
    }
    const oldData = score.find(item => +item.course_evaluation_id === +evaluationId)
    if (oldData) {
      const index = score.findIndex(item => +item.course_evaluation_id === +evaluationId)
      _score[index] = {
        ...oldData,
        ...data
      }
    } else {
      _score.push(data)
    }
    setScores(_score)
  }
  
  const handleChangeSuggestion = (evaluationId, answer, answerLength) => {
    const _score = JSON.parse(JSON.stringify(score))
    const data = {
      course_evaluation_id: evaluationId,
      answer,
    }
    if (answerLength === 0) {
      data.course_evaluation_choices_id = 0
    }
    const oldData = score.find(item => +item.course_evaluation_id === +evaluationId)
    if (oldData) {
      const index = score.findIndex(item => +item.course_evaluation_id === +evaluationId)
      _score[index] = {
        ...oldData,
        ...data
      }
    } else {
      _score.push(data)
    }
    setScores(_score)
  }
  
  const evaluations = courseDetail.evaluation || []
  return (
    <MainLayout>
      <Container paddingTop='34px' paddingBottom='87px'>
        <Title>แบบประเมินหลักสูตร</Title>
        <Cards>
          {
            evaluations.map((item, index) => (
              <Card
                key={index}
              >
                <CardTitle>{index + 1}. {item.question}</CardTitle>
                <Choices>
                  {
                    item.answer.map((ans, index2) => (
                      <ChoiceButton
                        key={index2}
                        active={score.find(s => s.course_evaluation_id === item.id && s.course_evaluation_choices_id === ans.id)}
                        onClick={() => handleClickChoice(ans.id, item.id)}
                      >{ans.choice}</ChoiceButton>
                    ))
                  }
                </Choices>
                {
                  item.is_free_fill_text &&
                  <Suggestion>
                    {
                      item.answer.length !== 0 &&
                      <SuggestionTitle>ข้อเสนอแนะ</SuggestionTitle>
                    }
                    <TextArea
                      rows='5'
                      placeholder={item.answer.length !== 0 ? 'ข้อเสนอแนะ (หากมี)' : 'โปรดระบุ'} 
                      value={score.find(s => s.course_evaluation_id === item.id) && score.find(s => s.course_evaluation_id === item.id).answer}
                      onChange={(event) => handleChangeSuggestion(item.id, event.target.value, item.answer.length)}
                    />
                  </Suggestion>
                }
              </Card>
            ))
          }
        </Cards>
        <SubmitButtonWrapper>
          <Button
            type='primary'
            onClick={() => handleSubmit()}
          >ส่งแบบประเมิน</Button>
        </SubmitButtonWrapper>
      </Container>
    </MainLayout>
  )
  
}


const Suggestion = styled('div')`
  margin-top: 16px;
`


const SuggestionTitle = styled('div')`

`

SurveyPage.getInitialProps = ({ query }) => {
  const { courseId } = query
  return {
    courseId
  }
}

export default connector(SurveyPage)

