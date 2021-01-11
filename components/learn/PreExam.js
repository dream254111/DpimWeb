import styled from 'styled-components'
import Button from '../Button'
import font from '../../helpers/font'
import { useState } from 'react'
import _ from 'lodash'
import API from '../../helpers/api'
import axios from 'axios'
import { message } from 'antd'
import { connect } from 'react-redux'
import PreExamSummary from './PreExamSummary'
import { maxWidth } from '../../helpers/breakpoint'
import { stripHtml } from '../../helpers/util'

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
  exams = [],
  courseId,
  onSelectChoice = () => {},
  onSubmit = () => {},
  nextChapterName = null,
  isFinished,
  memberToken
}) => {
  const [answers, setAnswer] = useState([])
  const [isCheckAnswer, setIsCheckAnswer] = useState(false)
  const [answerResult, setAnswerResult] = useState({})

  const onClickSelectChoice = (choiceId, courseExamId, answer) => {
    if (isCheckAnswer === false) {
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
  const handleSubmit = () => {
    onSubmit()
    setAnswer([])
  }

  const checkAnswer = async (values) => {
    const answer = values.map(item => {
      return {
        course_exam_id: item.course_exam_id,
        answer: item.answer
      }
    })
    try {
      const request = {
        headers: {
          Authorization: memberToken
        },
        method: 'POST',
        url: `${API.url}/Course/send_answer_exam`,
        data: {
          is_pretest: true,
          course_id: courseId,
          answer
        }
      }
      const response = await axios(request)
      const responseWithData = response.data
      if (responseWithData.success) {
        setIsCheckAnswer(true)
        setAnswerResult(responseWithData.data)
      } else {
        throw new Error(responseWithData.error)
      }
    } catch (error) {
      message.error(error.message)
    }
  }

  return (
    <>
      {
        isCheckAnswer === true &&
          <PreExamSummary
            score={answerResult.score || 0}
            maxScore={answerResult.total_exam || 0}
            percent={answerResult.percent || 0}
            nextChapterName={nextChapterName}
            onClickNextChapter={() => handleSubmit()}
            isShowNextChapterButton={true}
          />
      }
      <PreExam>
        <PreExamTitle>แบบทดสอบก่อนเรียน</PreExamTitle>
        <PreExamItems>
          {
            exams.map((item, index) => (
              <PreExamItem key={index}>
                <PreExamWQuestion no={index + 1} dangerouslySetInnerHTML={{ __html: item.question }} />
                {/* <PreExamWQuestion>{stripHtml(item.question)}</PreExamWQuestion> */}
                <PreExamChoices>
                  {
                    item.list_answer.map((choice, index) => (
                      <PreExamChoice
                        active={!_.isEmpty(answers.find(a => a.id === choice.id))}
                        isCorrect={isCheckAnswer === true ? answers.find(a => a.id === choice.id) && answerResult.list_result && answerResult.list_result.length > 0 && answerResult.list_result.find(r => r.course_exam_id === item.id) && answerResult.list_result.find(r => r.course_exam_id === item.id).status : null}
                        key={index}
                        onClick={() => onClickSelectChoice(choice.id, choice.course_exam_id, choice.order)}
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
        {
          isCheckAnswer === false ?
            <Button
              type='primary'
              style={{ float: 'right', marginTop: '32px' }}
              onClick={() => checkAnswer(answers)}
            >
              ตรวจคำตอบ
            </Button>
            :
            <Button
              type='primary'
              style={{float: 'right', marginTop: '32px'}}
              onClick={() => handleSubmit()}
            >
              {nextChapterName}
            </Button>
        }
      </PreExam>
    </>
  )
}

export default connector(PreExamComponent)
