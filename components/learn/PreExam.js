import styled from 'styled-components'
import Button from '../Button'
import font from '../../helpers/font'
import { useState } from 'react'

const PreExam = styled('div')`
  margin-top: 32px;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 200px;
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

const PreExamComponent = ({
  exams = [],
  onSelectChoice = () => {},
  onSubmit = () => {},
  nextChapterName = null
}) => {
  const [answers, setAnswer] = useState([]) 
  const onClickSelectChoice = (choiceId, courseExamId, answer) => {
    console.log('choiceId', choiceId, 'courseExamId', courseExamId, 'anwserId', answer)
    const data = {
      id: choiceId,
      course_exam_id: courseExamId,
      answer
    }
    const answerIndex = answers.findIndex(item => item.course_exam_id === courseExamId)
    console.log('answerIndex', answerIndex)
    const _answer = JSON.parse(JSON.stringify(answers))
    if (answerIndex !== -1) {
      _answer[answerIndex] = data
      setAnswer(_answer)
    } else {
      _answer.push(data)
      console.log('datsdf')
      setAnswer(_answer)
    }
  }
  return (
    <PreExam>
      {JSON.stringify(answers)}
      <PreExamTitle>แบบทดสอบก่อนเรียน</PreExamTitle>
      <PreExamItems>
        {
          exams.map((item, index) => (
            <PreExamItem key={index}>
              <PreExamWQuestion no={index + 1}>{item.question}</PreExamWQuestion>
              <PreExamChoices>
                {
                  item.list_answer.map((choice, index) => (
                    <PreExamChoice
                      // active={true}
                      key={index}
                      onClick={() => onClickSelectChoice(choice.id, choice.course_exam_id, choice.answer)}
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
        style={{float: 'right', marginTop: '32px'}}
        onClick={() => onSubmit}
      >{nextChapterName}</Button>
    </PreExam>
  )
}

export default PreExamComponent
