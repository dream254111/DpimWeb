import styled from 'styled-components'
import font from '../../helpers/font'
import { CheckCircleOutlined } from '@ant-design/icons'
import Button from '../Button'
import Router from 'next/router'

const PreExam = styled('div')`
  margin: 0 auto;
  width: 95%;
`

const PreExamSummary = styled('div')`
  padding: 16px 32px;
  margin-top: 32px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: rgba(0, 147, 123, 0.08);
  align-items: flex-end;
  border: 1px solid #00937B;
  box-sizing: border-box;
  border-radius: 4px;
  ${props => props.isPass === false && `
    background: rgba(235, 87, 87, 0.08);
    border: 1px solid #EB5757;
  `}
`


const PreExamSummaryTitle = styled('div')`
  font-size: 32px;
  font-family: ${font.bold};
  color: #00937B;
`

const PreExamSummaryScore = styled('div')`
  font-size: 16px;
  margin-left: 16px;
`

const PreExamSummaryDescription = styled('div')`
  display: flex;
  align-items: center;
  margin-top: 16px;
`

const PostExamSummaryComponent = ({
  courseId,
  score,
  maxScore,
  onClickNextChapter,
  percent,
  isShowEvaluationButton,
  ...rest
}) => {
  const isPass = percent > 80
  const textRender = () => {
    if (isPass) {
      return 'ผ่านการทดสอบหลักสูตร'
    } else {
      return 'ยังไม่ผ่านแบบทดสอบ'
    }
  }
  return (
    <PreExam {...rest}>
      <PreExamSummary isPass={isPass}>
        <div>
          <PreExamSummaryTitle>สรุปผลคะแนนแบบทดสอบหลังเรียน</PreExamSummaryTitle>
          <PreExamSummaryDescription>
            <CheckCircleOutlined style={{ color: '#43BF9A' }} />
            <PreExamSummaryScore>{textRender()} คุณตอบถูก {score} ข้อ จาก {maxScore} ข้อ = {percent.toFixed(2)}%</PreExamSummaryScore>
          </PreExamSummaryDescription>
        </div>
        {
          (isPass) &&
            <Button
              type='primary'
              onClick={() => Router.push(`/evaluation/${courseId}`)}
              disabled={!isShowEvaluationButton}
            >
              ให้คะแนนประเมิน
            </Button>
        }
      </PreExamSummary>
    </PreExam>
  )
}

export default PostExamSummaryComponent
