import styled from 'styled-components'
import Button from '../Button'
import font from '../../helpers/font'
import { useState } from 'react'
import _ from 'lodash'
import API from '../../helpers/api'
import axios from 'axios'
import { message } from 'antd'
import { connect } from 'react-redux'
import PostExamSummary from './PostExamSummary'
import { maxWidth } from '../../helpers/breakpoint'

const PreExam = styled('div')`
  margin-top: 32px;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 200px;
  ${maxWidth.md`
    width: 95%;
  `}
`

const PreExamItems = styled('div')`

`

const PreExamItem = styled('div')`
  display: flex;
  flex-direction: column;
  :not(:first-child) {
    margin-top: 48px;
  }
  :first-child {
    margin-top: 16px;
  }
`

const PreExamWQuestion = styled('div')`
  font-size: 24px;
  position: relative;
  :after {
    content: '${props => props.no}';
    position: absolute;
    color: #C4C4C4;
    font-size: 18px;
    left: -6%;
    top: 7%;
  }
`

const PreExamChoices = styled('div')`
  margin-top: 48px;
`

const PreExamChoice = styled('div')`
  background: #FFFFFF;
  border: 1px solid #EAEAEA;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 8px;
  font-size: 20px;
  ${props => props.active === true && `
    background: rgba(0, 147, 123, 0.08);
    border: 1px solid #00937B;
    ${PreExamChoiceNo} {
      background: #00937B;
      color: white;
    }
  `}
  ${props => props.isCorrect === false && `
    background: rgba(235, 87, 87, 0.08);
  `}
  :not(:first-child) {
    margin-top: 16px;
  }
  cursor: pointer;
  display: flex;
  align-items: center;
`

const PreExamChoiceNo = styled('div')`
  background: white;
  color: black;
  border-radius: 4px;
  margin-right: 22px;
  min-width: 32px;
  min-height: 32px;
  font-size: 12px;
  border: 1px solid #F2F2F2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const PreExamTitle = styled('div')`
  font-size: 32px;
  font-family: ${font.bold};
`

const connector = connect(({ memberReducer }) => ({
  memberToken: memberReducer.member.token,
  memberDetail: memberReducer.member
}))

const PreExamComponent = ({
  courseId,
  exams = [],
  onSelectChoice = () => {},
  onSubmit = () => {},
  nextChapterName = null,
  memberToken,
}) => {
  const [answers, setAnswer] = useState([])
  const [isCheckAnswer, setIsCheckAnswer] = useState(false)
  const [answerResult, setAnswerResult] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const onClickSelectChoice = (choiceId, courseExamId, answer, isCorrect) => {
    if (isCorrect === false || isCorrect === null) {
      const data = {
        id: choiceId,
        course_exam_id: courseExamId,
        answer
      }
      const answerIndex = answers.findIndex(item => item.course_exam_id === courseExamId)
      const _answer = JSON.parse(JSON.stringify(answers))
      if (answerIndex !== -1) {
        _answer[answerIndex] = data
        setAnswer(_answer)
      } else {
        _answer.push(data)
        setAnswer(_answer)
      }
    }
  }

  const checkAnswer = async (values) => {
    console.log('values', values)
    setIsLoading(true)
    let answer = values.map(item => {
      return {
        course_exam_id: item.course_exam_id,
        answer: item.answer
      }
    })
    if (answerResult.list_result && answerResult.list_result.length > 0) {
      const resultFaileds = answerResult.list_result.filter(item => item.status === false)
      const resultFailedCourseExamIds = resultFaileds.map(item => item.course_exam_id)
      answer = answer.filter(item => resultFailedCourseExamIds.includes(item.course_exam_id))
      console.log('answer', answer)
    }
    try {
      const request = {
        headers: {
          Authorization: memberToken
        },
        method: 'POST',
        url: `${API.url}/Course/send_answer_exam`,
        data: {
          is_pretest: false,
          course_id: courseId,
          answer
        }
      }
      const response = await axios(request)
      const responseWithData = response.data
      console.log('responseWithData', responseWithData)
      if (responseWithData.success) {
        setIsCheckAnswer(true)
        setAnswerResult(responseWithData.data)
      } else {
        throw new Error(responseWithData.error)
      }
    } catch (error) {
      message.error(error.message)
    }
    setIsLoading(false)
  }
  const handleSubmit = () => {
    onSubmit(answers)
    setAnswer([])
  }

  return (
    <>
      {
        isCheckAnswer === true &&
          <PostExamSummary
            courseId={courseId}
            score={answerResult.score || 0}
            maxScore={answerResult.total_exam || 0}
            percent={answerResult.percent || 0}
          />
      }
      <PreExam>
        <PreExamTitle>แบบทดสอบหลังเรียน</PreExamTitle>
        <PreExamItems>
          {
            exams.map((item, index) => (
              <PreExamItem key={index}>
                <PreExamWQuestion no={index + 1} dangerouslySetInnerHTML={{ __html: item.question }} />
                <PreExamChoices>
                  {
                    item.list_answer.map((choice, index) => (
                      <PreExamChoice
                        active={!_.isEmpty(answers.find(a => a.id === choice.id))}
                        key={index}
                        isCorrect={isCheckAnswer === true ? answers.find(a => a.id === choice.id) && answerResult.list_result && answerResult.list_result.length > 0 && answerResult.list_result.find(r => r.course_exam_id === item.id) && answerResult.list_result.find(r => r.course_exam_id === item.id).status : null}
                        onClick={() => onClickSelectChoice(choice.id, choice.course_exam_id, choice.order, answerResult && answerResult.list_result === undefined ? null : answerResult.list_result.find(r => r.course_exam_id === item.id).status)}
                      >
                        <PreExamChoiceNo>{index + 1}.</PreExamChoiceNo>{choice.answer}
                      </PreExamChoice>
                    ))
                  }
                </PreExamChoices>
              </PreExamItem>

            ))
          }
        </PreExamItems>
        <Button
          type='primary'
          style={{ float: 'right', marginTop: '32px' }}
          onClick={() => checkAnswer(answers)}
          loading={isLoading}
          disabled={answerResult && answerResult.percent >= 80}
        >ตรวจคำตอบ
        </Button>
      </PreExam>

    </>
  )
}

export default connector(PreExamComponent)
