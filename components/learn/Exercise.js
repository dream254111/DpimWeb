import styled from 'styled-components'
import { useState } from 'react'
import font from '../../helpers/font'
import { maxWidth } from '../../helpers/breakpoint'
import { Button, message, Popover, Select } from 'antd'
import _ from 'lodash'
const { Option } = Select

const Wrapper = styled('div')`
  margin-top: 32px;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 200px;
  ${maxWidth.md`
    width: 95%;
  `}

  table { 
    width: 100%; 
    border-collapse: collapse; 
    margin-top: 16px;
    }
  
  /* Zebra striping */
  tr:nth-of-type(odd) { 
    background: rgba(0,147,123, 0.04);
    }
  
  th { 
    background: white; 
    color: #838895;
    font-weight: bold;
    }
  tr th {
    text-align: center;  
  }
  td, th { 
    padding: 20px 32px; 
    border: none; 
    text-align: left; 
    font-size: 18px;
  
    }
  
`


const Title = styled('div')`
  font-size: 32px;
  font-family: ${font.bold};
`

const Video = styled('video')`
  margin-top: 24px;
  width: 100%;
  height: 30vh;
  border: unset;
  line-height: 0;
`

const Cover = styled('img')`
  margin-top: 16px;
  width: 100%;
`

const Card = styled('div')`
  margin-top: 32px;
  padding: 24px;
  border: 1px solid #F2F2F2;
  box-sizing: border-box;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
`

const CardNo = styled('div')`
  color: #828282;
`

const CardQuestion = styled('div')`
  margin-top: 12px;
`

const ChoiceWrapper = styled('div')`
  margin-top: 16px;
`

const Choice = styled('div')`
  margin: 8px 0;
  padding: 16px;
  background: #FFFFFF;
  border: 1px solid #F2F2F2;
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  ${props => props.active && `
    background: rgba(0, 147, 123, 0.08);
    border: 1px solid #00937B;
    ${ChoiceRadio} {
      border: 4px solid #00937B;
    }
  `}
  ${props => props.answerRight && `
    background: rgba(235, 87, 87, 0.08);
    border: 1px solid #EB5757;
  `}
`

const ChoiceRadio = styled('div')`
  min-width: 16px;
  min-height: 16px;
  border-radius: 50%;
  border: 1px solid #E0E0E0;
`

const ChoiceTitle = styled('div')`
  margin-left: 12px;
  color: #828282;
`

const Flex = styled('div')`
  display: flex;
  align-items: center;
`

const CheckAnswerButton = styled('div')`

`

const Icon = styled('img')`
  width: 28px;
  margin-right: 10px;
`

const Tr = styled('tr')`
  ${props => props.isWrong && `
    background-color: rgba(235, 87, 87, 0.08);
  `} 
`

const ExerciseComponent = ({
  exercises,
  onSubmit,
  isLatest,
  canUsePostTest
}) => {
  const [currentNo, setCurrentNo] = useState(0)
  const [answerId, setAnswerId] = useState(null)
  const [renderResult, setRenderResult] = useState(null)
  const [isClickCheckAnswer, setIsClickCheckAnswer] = useState(null)
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(null)
  const [matchAnswer, setMatchAnswer] = useState([])
  const [wrongMatchQuestion, setWrongMatchQuestion] = useState([])
  const checkAnswer = () => {
    try {
      if (answerId === null) throw new Error('กรุณาเลือกคำตอบก่อน')
      if (exercises[currentNo].is_answer_choice) {
        const choiceDetail = exercises[currentNo].choices.find(item => item.id === answerId)
        const isCorrect = choiceDetail.correct === 1
        if (isCorrect) {
          setIsCorrectAnswer(true)
          setRenderResult(
            <Flex> 
              <Icon src='/static/images/true.svg' />
              <div>คุณตอบถูกแล้ว</div>
            </Flex >
          )
        } else {
          setIsCorrectAnswer(false)
          setRenderResult(
            <Flex> 
              <Icon src='/static/images/false.svg' />
              <div>คุณตอบข้อนี้ผิด</div>
            </Flex>
          )
        }
      }

      if (exercises[currentNo].is_answer_match) {
        let _wrongMatchQuestion = JSON.parse(JSON.stringify(wrongMatchQuestion))
        _wrongMatchQuestion = []
        const matchKey = _.groupBy(exercises[currentNo].match, 'question')
        matchAnswer.map(ma => {
          const isCorrect = matchKey[ma.question][0].answer === ma.answer
          if (isCorrect === false) {
            _wrongMatchQuestion.push(ma.question)
          }
        })
        if (_wrongMatchQuestion.length > 0) {
          setIsCorrectAnswer(false)
          setRenderResult(
            <Flex> 
              <Icon src='/static/images/false.svg' />
              <div>คุณตอบข้อนี้ผิด</div>
            </Flex>
          )
        } else {
          setIsCorrectAnswer(true)
          setRenderResult(
            <Flex>
              <Icon src='/static/images/true.svg' />
              <div>คุณตอบถูกแล้ว</div>
            </Flex>
          )
        }
        setWrongMatchQuestion(_wrongMatchQuestion)
      }
      setIsClickCheckAnswer(true)
    } catch (error) {
      message.error(error.message)
    }
  }

  const nextChapter = () => {
    onSubmit()
  }
  const tryAgain = () => {
    setIsClickCheckAnswer(false)
  }

  const nextQuestion = () => {
    setAnswerId(null)
    setIsClickCheckAnswer(false)
    setCurrentNo(item => item + 1)
  }

  const getShuffledArr = arr => {
    if (arr.length === 1) {return arr};
    const rand = Math.floor(Math.random() * arr.length);
    return [arr[rand], ...getShuffledArr(arr.filter((_, i) => i != rand))];
  }

  const onChangeMatchAnswer = (question, answer, index) => {
    const _matchAnswer = JSON.parse(JSON.stringify(matchAnswer))
    const hasData = _matchAnswer.findIndex(item => item.index === index)
    const data = {
      index,
      question,
      answer
    }
    if (hasData !== -1) {
      _matchAnswer[hasData] = data
    } else {
      _matchAnswer.push(data)
    }
    setMatchAnswer(_matchAnswer)
  }

  const matchQuestions = exercises[currentNo].is_answer_match === true && exercises[currentNo].match.length > 0 && exercises[currentNo].match.map(item => item.question) || []
  const matchAnswers = exercises[currentNo].is_answer_match === true && exercises[currentNo].match.length > 0 && exercises[currentNo].match.map(item => item.answer) || []
  return (
    <Wrapper>
      <Title>คำถามท้ายบท</Title>
      {
        exercises[currentNo].video.original &&
        <Video id='video' controls autoplay>
          <source src={exercises[currentNo].video.original} type='video/mp4' />
        </Video>
      }
      {
        exercises[currentNo].image &&
        <Cover src={exercises[currentNo].image} />
      }
      <Card>
        <CardNo>ข้อที่ {currentNo + 1} จาก {exercises.length}</CardNo>
        <CardQuestion dangerouslySetInnerHTML={{ __html: exercises[currentNo].question }} />
        {
          exercises[currentNo].is_answer_choice &&
          <ChoiceWrapper>
            {
              exercises[currentNo].choices.map((item, index) => (
                <Choice
                  key={index}
                  active={item.id === answerId}
                  onClick={() => !isClickCheckAnswer && setAnswerId(item.id)}
                  answerRight={isClickCheckAnswer && item.correct !== 1 && item.id == answerId}
                >
                  <Flex>
                    <ChoiceRadio />
                    <ChoiceTitle>{item.answer}</ChoiceTitle>
                  </Flex>
                </Choice>
              ))
            }
          </ChoiceWrapper>
        }
        {
          exercises[currentNo].is_answer_match &&
          <table>
            <thead>
              <tr>
                <th>TIMELINE</th>
                <th>CUSTOMER JOURNEY STAGE</th>
              </tr>
            </thead>
            <tbody>
              {
                matchQuestions.length > 0 && matchQuestions.map((item, index) => (
                  <Tr
                    key={index}
                    isWrong={isClickCheckAnswer && wrongMatchQuestion.find(wm => wm === item)}
                  >
                    <td data-column='TIMELINE'>{item}</td>
                    <td data-column='CUSTOMER JOURNEY STAGE'>
                      <Select style={{ width: 160 }}
                        onChange={(ans) => onChangeMatchAnswer(item, ans, index)}
                      >
                        {
                          matchAnswers.map((ans, index) => (
                            <Option
                              value={ans}
                              key={index}
                            >{ans}</Option>
                          ))
                        }
                      </Select>
                    </td>
                  </Tr>
                ))
              }
            </tbody>
          </table>
        }
        {
          !isClickCheckAnswer &&
            <Button
              type='primary'
              style={{
                marginTop: '24px',
                display: 'block',
                marginLeft: 'auto'
              }}
              onClick={() => checkAnswer()}
            >ตรวจคำตอบ
            </Button>
        }
        {
          isCorrectAnswer === false && isClickCheckAnswer &&
            <Popover
              placement='topLeft'
              content={renderResult}
              trigger='click'
              visible={isClickCheckAnswer}
            >
              <Button
                type='primary'
                style={{
                  marginTop: '24px',
                  display: 'block',
                  marginLeft: 'auto'
                }}
                onClick={() => tryAgain()}
              >ลองใหม่
              </Button>
            </Popover>
        }
        {
          isCorrectAnswer === true && isClickCheckAnswer &&
            <Popover
              placement='topLeft'
              content={renderResult}
              trigger='click'
              visible={isClickCheckAnswer}
            >
              {
                currentNo + 1 === exercises.length ?
                  <Button
                    type='primary'
                    style={{
                      marginTop: '24px',
                      display: 'block',
                      marginLeft: 'auto'
                    }}
                    onClick={() => nextChapter()}
                  >บทต่อไป
                  </Button>
                  :
                  <Button
                    type='primary'
                    style={{
                      marginTop: '24px',
                      display: 'block',
                      marginLeft: 'auto'
                    }}
                    onClick={() => nextQuestion()}
                  >คำถามถัดไป
                  </Button>
            }
            </Popover>
        }
      </Card>
    </Wrapper>
  )
}

export default ExerciseComponent
