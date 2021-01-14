import styled from 'styled-components'
import font from '../../helpers/font'
import { CheckCircleOutlined  } from '@ant-design/icons'
import Button from '../Button'

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


const PreExamSummaryComponent = ({
  score,
  maxScore,
  nextChapterName,
  onClickNextChapter,
  percent,
  isShowNextChapterButton,
  ...rest
}) => {
  return (
    <PreExam {...rest}>
        <PreExamSummary>
          <div>
            <PreExamSummaryTitle>{'สรุปผลคะแนนแบบทดสอบก่อนเรียน'}</PreExamSummaryTitle>
            <PreExamSummaryDescription>
              <CheckCircleOutlined style={{color: '#43BF9A'}} />
              <PreExamSummaryScore>ผ่านการทดสอบหลักสูตร คุณตอบถูก {score} ข้อ จาก {maxScore} ข้อ = {percent.toFixed(2)}%</PreExamSummaryScore>
            </PreExamSummaryDescription>
          </div>
          {
            isShowNextChapterButton &&
            <Button type='primary' onClick={onClickNextChapter}>บทถัดไป : {nextChapterName}</Button>
          }
        </PreExamSummary>
    </PreExam>
  )
}

export default PreExamSummaryComponent
