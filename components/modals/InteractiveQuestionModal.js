import { Modal, Button, message } from 'antd'
import styled from 'styled-components'
import font from '../../helpers/font'
import { useState } from 'react'
import _ from 'lodash'

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
  display: flex;
  align-items: center;
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
  font-size: 14px;
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

const ModalStyle = styled(Modal)`
  .ant-modal-close-x {
    display: none;
  }
`

const InteractiveQuestionModal = ({
  isOpen = false,
  onClose = () => {},
  interactive = {},
  onSubmit
}) => {
  const [answer, setAnswer] = useState({})
  const [isCheckAnswer, setIsCheckAnswer] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const checkAnswer = () => {
    setIsCheckAnswer(true)
    setIsLoading(true)
    if (answer.correct === 1) {
      message.success('คุณตอบถูกต้อง')
      setTimeout(() => {
        onSubmit()
      }, 1000)
    } else {
      message.warn('คุณตอบผิด กรุณาตอบใหม่')
    }
    setIsLoading(false)
  }
  const onSetAnswer = (obj) => {
    if (isCheckAnswer) {
      setIsCheckAnswer(false)
    }
    setAnswer(obj)
  }
  return (
    <ModalStyle
      width={800}
      bodyStyle={{ padding: '33px 24px 16px 24px' }}
      title={null}
      visible={isOpen}
      // onCancel={() => closeModal()}
      footer={null}
    >
      <PreExamTitle>คำถามระหว่างเรียน</PreExamTitle>
      <PreExamItems>
        <PreExamItem>
          {/* <PreExamWQuestion no={1} dangerouslySetInnerHTML={{ __html: interactive.name }} /> */}
          <PreExamWQuestion>
            <div>1.</div>
            <div style={{ marginLeft: '16px' }} dangerouslySetInnerHTML={{ __html: interactive.name }} />
          </PreExamWQuestion>
          <PreExamChoices>
            {
              interactive && interactive.answer && interactive.answer.map((choice, index) => (
                <PreExamChoice
                  active={answer.id === choice.id}
                  isCorrect={isCheckAnswer === true ? answer.id === choice.id ? answer.correct === 1 : null : null}
                  key={index}
                  onClick={() => onSetAnswer(choice)}
                >
                  <PreExamChoiceNo>{index + 1}.</PreExamChoiceNo>{choice.name}
                </PreExamChoice>
              ))
            }
          </PreExamChoices>
        </PreExamItem>
      </PreExamItems>
      <Button
        type='primary'
        loading={isLoading}
        style={{
          marginTop: '32px',
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'block'
        }}
        onClick={() => checkAnswer()}
      >ตรวจคำตอบ
      </Button>
    </ModalStyle>
  )
}

export default InteractiveQuestionModal
