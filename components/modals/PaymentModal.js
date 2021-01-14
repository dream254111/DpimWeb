import { Modal, Form, message } from 'antd'
import styled from 'styled-components'
import axios from 'axios'
import API from '../../helpers/api'
import { useEffect, useState } from 'react'
import bankImage from '../../api/json/bank.json'
import { maxWidth } from '../../helpers/breakpoint'

const Item = styled('div')`
  min-width: 32px;
  min-height: 32px;
  border-radius: 50%;
  background: rgba(67, 191, 154, 0.1);
  color: #43BF9A;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
`

const PaymentItem = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const PaymentMethod = styled('div')`
  display: flex;
  flex-direction: column;
  margin-top: 29px;
`

const PaymentText = styled('div')`
  font-size: 18px;
  font-weight: 400;
  color: #333333;
  margin: 0 0 0 16px;
  display: flex;
  flex-direction: column;
  p {
    margin: 0;
  }
`

const PaymentBank = styled('div')`
  display: flex;
  justify-content: flex-start;
  background-color: #FFFFFF;
  border: 1px solid #F2F2F2;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 20px;
  margin-top: 27px;
  ${maxWidth.md`
    flex-direction: column;
  `}
`

const BankImageContainer = styled('div')`
  display: flex;
  ${maxWidth.md`
  justify-content: center;
  align-items: center;
  `}

`

const BankImage = styled('img')`
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-position: center;
  width: 80px;
  height: 80px;
  ${maxWidth.md`
    max-width: 120px;
    width: 100%;
    height: auto;
    flex-direction: column;
  `}
`

const BankName = styled('div')`
  color: #333333;
  font-size: 18px;
`
const AccountName = styled('div')`
  color: #00937B;
  font-size: 18px;
  font-weight: bold;
`
const AccountNo = styled('div')`
  color: #00937B;
  font-size: 18px;
  font-weight: bold;
`
const TotalPrice = styled('div')`
  color: #00937B;
  font-size: 18px;
  font-weight: 700;
`

const BankInfo = styled('div')`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  ${maxWidth.md`
    margin-top: 16px;
  `}
`

const BankInfoItem = styled('div')`
  display: flex;
  margin-bottom: 8px;
  &:last-child {
    margin-bottom: 0;
  }
`

const BankInfoTitle = styled('div')`
  color: #333333;
  font-size: 18px;
  margin-right: 12px
`

const QrCode = styled('div')`
  display: flex;
  align-item: center;
  margin-left: 48px;
  ${maxWidth.md`
    justify-content: center;
    margin: 0;
  `}
`

const QrImage = styled('img')`
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-position: center;
  width: 128px;
  height: 128px;
  ${maxWidth.md`
    max-width: 128px;
    width: 100%;
    height: auto;
  `}
`

const AddLine = styled('div')`
  font-size: 18px;
  color: #41a0fc;
  font-weight: bold;
`

const PaymentModal = ({
  isOpen = false,
  onClose = () => { }
}) => {
  const [bank, setBank] = useState({})
  const [form] = Form.useForm()
  useEffect(() => {
    if (isOpen === true) {
      fetchData()
    }
  }, [isOpen])

  const closeModal = () => {
    form.resetFields()
    onClose()
  }
  const fetchData = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${API.url}/Student/GetAllPayment`
      })
      const responseWithData = response.data
      if (responseWithData.success) {
        setBank(responseWithData.data.data)
      }
    } catch (error) {
      message.error(error.message)
    }
  }
  const foundBankImage = bankImage.find(el => el.name === bank.bank_name)

  return (
    <Modal
      width={725}
      title='วิธีชำระเงิน'
      visible={isOpen}
      bodyStyle={{ padding: '0px 24px 24px 24px' }}
      style={{ top: 50 }}
      footer={null}
      onCancel={() => closeModal()}
    >
      <PaymentMethod>
        <PaymentItem>
          <Item>1</Item>
          <PaymentText>โอนผ่านโมบายแบงค์กิ้งหรือโอนผ่านเอทีเอ็มมายังบัญชีธนาคารของ DPIM</PaymentText>
        </PaymentItem>
        <PaymentBank>
          <BankImageContainer>
            {
              foundBankImage &&
                <BankImage src={foundBankImage.image} />
            }
          </BankImageContainer>
          <BankInfo>
            <BankInfoItem>
              <BankName>{bank.bank_name}</BankName>
            </BankInfoItem>
            <BankInfoItem>
              <BankInfoTitle>ชื่อบัญชี</BankInfoTitle>
              <AccountName>{bank.account_name}</AccountName>
            </BankInfoItem>
            <BankInfoItem>
              <BankInfoTitle>เลขที่บัญชี</BankInfoTitle>
              <AccountNo>{bank.account_no}</AccountNo>
            </BankInfoItem>
            <BankInfoItem>
              <BankInfoTitle>ยอดชำระเงินทั้งหมด</BankInfoTitle>
              <TotalPrice></TotalPrice>
            </BankInfoItem>
          </BankInfo>
        </PaymentBank>
      </PaymentMethod>

      <PaymentMethod>
        <PaymentItem>
          <Item>2</Item>
          <PaymentText>
            <p>เก็บหลักฐานการโอนเงินและแจ้งการชำระเงินทางไลน์ของ DPIM ที่</p>
            <AddLine>LINE {bank.line}</AddLine>
          </PaymentText>
        </PaymentItem>
        <QrCode>
          <QrImage src={bank.qr_code} />
        </QrCode>
      </PaymentMethod>

      <PaymentMethod>
        <PaymentItem>
          <Item>3</Item>
          <PaymentText>กรุณารอทีมงานยืนยันการชำระเงินภายใน 48 ชม. หลังจากมีการแจ้งการชำระเงิน</PaymentText>
        </PaymentItem>
      </PaymentMethod>
    </Modal>
  )
}

export default PaymentModal
