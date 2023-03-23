import React from 'react'
import styled from 'styled-components'
import { Modal as ModalAntd, Switch } from 'antd'
import { connect } from 'react-redux'


const connector = connect(({ memberReducer }) => ({
    memberToken: memberReducer.member.token,
    memberDetail: memberReducer.member,
  }))


const ModalStyled = styled(ModalAntd)`
    .ant-modal-body {
        border-radius: 12px;
        background: rgba(219, 219, 219, 0.8);
        color: white;
    }
    .ant-modal-close-x {
        color: white;
    }

    .ant-modal-content {
        border-radius: 16px;
    }

    .ant-modal-footer {
        border-radius: 12px;
        background: #00937B;
        border-top: 0;
    }

    .ant-modal-content {
        background: #00937B;
    }

    .ant-btn-primary {
        background: #5AC3B1;
    }
`

const CustomSwitch = styled(Switch)`
    .ant-switch-checked {
        background-color: cyan !important;
    }
`

const Title = styled.div`
    color: #000;
    font-size: 20px;
    font-weight: 900;
    margin-bottom: 10px;
`

const Box = styled.div`
    font-size: 16px;
    color: #000;
    display: flex;
    padding: 6px;
    justify-content: space-between;
    margin-top: -1px;
    border-style: solid;
    border-width: 1px;
    border-color: black;
`

const Text = styled.div`
    width: 85%;
`


const CookieCustomModal = ({show, children, onHandleOk, onHandleCancel, memberToken}) => {

    const cookie = {
        "user_id": memberToken,
        "nec_cookie": false,
        "perf_cookie": false,
        "stat_cookie": false,
        "ads_cookie": false
      };
    
    const Ok = () => {
        onHandleOk(cookie);
        
    }

    const Cancel = () => {
        onHandleCancel();
    }

    const handleCookie1 = (checked) => {
        cookie.cookieOne = checked ? true : false;
        console.log(cookie)
    };
    const handleCookie2 = (checked) => {
        cookie.cookieTwo = checked ? true : false;
        console.log(cookie)

    };
    const handleCookie3 = (checked) => {
        cookie.cookieThree = checked ? true : false;
    };
    const handleCookie4 = (checked) => {
        cookie.cookieFour = checked ? true : false;
    };


    return (
        <div>
            <ModalStyled visible={show}  onOk={Ok} onCancel={Cancel}> 
                {children}
                <Title>การตั้งค่าความเป็นส่วนตัว</Title>
                <Box>
                    <Text>necessary cookie</Text>
                    <CustomSwitch onChange={handleCookie1} value={cookie} />
                </Box>
                <Box>
                    <Text>pref cookie</Text>
                    <CustomSwitch onChange={handleCookie2} value={cookie} />
                </Box>
                <Box>
                    <Text>stat cookie</Text>
                    <CustomSwitch onChange={handleCookie3} value={cookie} /></Box>
                <Box>
                    <Text>ads cookie</Text>
                    <CustomSwitch onChange={handleCookie4} value={cookie} /></Box>
            </ModalStyled>

        </div>
    )
}

export default connector(CookieCustomModal);
