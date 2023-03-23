import styled from 'styled-components'
import { Button } from 'antd'
import CookieCustomModal from './modals/CustomCookieModal'
import { useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'


const connector = connect(({ memberReducer }) => ({
    memberToken: memberReducer.member.token,
    memberDetail: memberReducer.member,
  }))


const Container = styled.div`
    width: 80%;
    height: 135px;
    background: #00937B;
    backdrop-filter: blur(0px);
    padding: 16px 24px;
    display: block;
    position: fixed;
    bottom: 10px;
    justify-content: space-between;
    margin: 0 10%;
    border-radius: 5px;
    
`

const TextWrapper = styled.div`
    color: white;
    font-size: 18px;
    margin: 0 60px 0 0;
    font-weight: 500;

    span {
        margin-left: 5px;
        cursor: pointer;
        white-space: pre-line;
        text-decoration: underline;

        a {
          color: #fff;
        }
    }
`

const ButtonWrapper = styled.div`
    width: 40%;
    button {
        font-size: 16px;
        height: 35px !important;
        margin-left: 5px;
        width: 130px;
        border-radius: 5px;
        font-weight: 900;
    }
`

const TextContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 15px 4%;
`

const CookieBanner = ({memberToken}) => {
  const [visible, setVisible] = useState(true);
  const [show, setShow] = useState(false);
  const [cookie, setCookie] = useState({
    "user_id": "",
    "nec_cookie": false,
    "perf_cookie": false,
    "stat_cookie": false,
    "ads_cookie": false
  });

  const showModal = () => {
    setShow(true);
  };

  const handleConfirm = () => {
    cookie.user_id = memberToken;
    cookie.nec_cookie = true;
    cookie.perf_cookie = true;
    cookie.stat_cookie = true;
    cookie.ads_cookie = true;
    
    handlePostCookie(cookie);
    setShow(false);
    setVisible(false);
    console.log(cookie);
  };

  const handleReject = () => {
    setVisible(false);
  };

  const handleOk = (value) => {
    handlePostCookie(value);
    setShow(false);
    setVisible(false);
  };
  const handleCancel = () => {
    setShow(false);
  };

  const handleSetCookies = (value) => {
    setCookie(value);
  };

  const handleGetCookie = () => {
    axios.post(`https://dpimacademy-apis.dpim.go.th/dpimapinet6/api/pdpa/query`, {user_id: memberToken})
      .then(res => {
        const checkCookie = res.data;
        console.log(checkCookie);
        if(res.data.data.length > 0)
          setVisible(false);
      })
  }

  const handlePostCookie = (cookie) => {
    axios.post(`https://dpimacademy-apis.dpim.go.th/dpimapinet6/api/pdpa/add`, cookie)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  handleGetCookie();

  return (
    <>
      {visible && (<Container >
          <TextContainer>
              <TextWrapper>
                เว็บไซต์นี้ใช้คุกกี้
                <div></div>เราใช้คุกกี้เพื่อเพิ่มประสิทธิภาพ และประสบการณ์ที่ดีในการใช้งานเว็บไซต์ คุณสามารถเลือกตั้งค่าความยินยอมการใช้คุกกี้ได้ โดยคลิก 
                "การตั้งค่าคุกกี้"
                <span><a href="https://www.dpim.go.th//images/cookies.html" target="_blank" rel="noopener noreferrer">นโบายคุกกี้</a></span>
              </TextWrapper>
              <ButtonWrapper>
                  <Button onClick={showModal} handleCookie={handleSetCookies}>
                      การตั้งค่าคุกกี้
                  </Button>
                  <Button onClick={handleReject}>
                      ปฏิเสธทั้งหมด
                  </Button>
                  <Button onClick={handleConfirm}>
                      ยอมรับทั้งหมด
                  </Button>
              </ButtonWrapper>
          </TextContainer>

          <CookieCustomModal show={show} onHandleOk={handleOk} onHandleCancel={handleCancel}>
          </CookieCustomModal>

      </Container>
      )}
    </>
  )
}

export default connector(CookieBanner);
