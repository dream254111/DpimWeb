import {
  useState,
  useRef,
  useEffect,
} from 'react'
import styled, { css } from 'styled-components'
import Link from 'next/link'
import {
  Button,
  Input,
} from '../../components/index'
import font from '../../helpers/font'
import { maxWidth } from '../../helpers/breakpoint'
import { LoginModal } from '../../components/modals'
import { connect } from 'react-redux'
import Router from 'next/router'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { onMemberLogout } from '../../stores/memberReducer'
import { useRouter } from 'next/router'

const Wrapper = styled('div')``

const Nav = styled('div')`
  box-sizing: border-box;
  background-color: #FFFFFF;
  width: 100%;
  height: 64px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
`

const NavbarContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1376px;
  width: 94%;
  margin: 0 auto;
${maxWidth.md`
`}

`

const NavLogo = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 36px;

`

const NavIcon = styled('img')`
  background-image: url(${props => props.src});
  background-position: center;
  background-repeat: no-repeat;
`

const Hamburger = styled('img')`
  box-sizing: border-box;
  background-image: url(${props => props.src});
  background-position: center;
  background-repeat: no-repeat;
  margin: ${({ isLogin }) => !isLogin ? '' : '0 0 0 9.33px'};
  display: none;
  ${maxWidth.md`
    display: flex;
  `}
`

const NavMenu = styled('div')`
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-left: auto;

  ${maxWidth.md`
  display: ${({ isClick }) => !isClick ? 'none' : 'flex'};
  flex-direction: column;
  width: 100%;
  max-height: 100vh;
  position: absolute;
  top: 57px;
  left: 0;
  border: 1px solid #F2F2F2;
  box-shadow: 0px 2px 4px rgba(40, 41, 61, 0.04), 0px 8px 16px rgba(96, 97, 112, 0.16);
  border-radius: 4px;
  transition: 0.4s all ease-in-out;
`}
`

const NavItem = styled('div')`
  margin-right: 32px;
  position: relative;
  display: ${props => props.display ? 'none' : ''};
  a {
    color: #333333;
    text-decoration: none;
    line-height: 24px;
    font-size: 16px;
    font-family: ${font.regular};
    text-align: center;
    ${props => props.logout && css`
      color: #EB5757;
     `}
  }
  ${({ rightBorder }) => rightBorder && css`
    &:after {
      position: absolute;
      content: '';
      width: 2px;
      height: 32px;
      background-color: #E0E0E0;
      right: -24px;
      top: -3px;
    }
    ${maxWidth.md`
    &:after {
      display: none;
    } 
  `}
  `}
  ${maxWidth.md`
    padding: 0;
    box-sizing: border-box;
    background-color: #FFFFFF;
    padding: 16px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    z-index: 1;
`}
`

const NavItemBtn = styled('div')`
  margin-left: 24px;
${maxWidth.md`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FFFFFF;
  padding: 16px;
  margin: 0;
  z-index: 1;
`}
`

const NavProfile = styled('div')`
box-sizing: border-box;
position: relative;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
  p {
    font-size: 14px;
    line-height: 20px;
    color: #333333;
    max-width: ${({ isLogin }) => !isLogin ? '' : '200px'};
    font-family: ${font.regular};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: clip;
  }

  ${maxWidth.md`
  display: flex;
  margin-left: auto;
    p {
      display: none;
    }
  `}
`

const PicProfile = styled(Avatar)`
  margin-left: 4px;
  margin-right: 4px;
`

const Chevron = styled('img')`
  box-sizing: border-box;
  background-image: url(${props => props.src});
  background-repeat: no-repeat:
  background-position: center;
  margin-right: 12px;
  margin-left: 12px;
  ${maxWidth.md`
  display: none;
  `}
`

const DropdownMenu = styled('div')`
  background-color: #FFFFFF;
  display: ${({ isClick }) => isClick ? 'flex' : 'none'};
  position: absolute;
  flex-direction: column;
  width: 200px;
  max-height: 100vh;
  border: 1px solid #F2F2F2;
  box-shadow: 0px 2px 4px rgba(40, 41, 61, 0.04), 0px 8px 16px rgba(96, 97, 112, 0.16);
  border-radius: 4px;
  right: 0px;
  top: 58px;
  z-index: 1;
${maxWidth.md`
  display: none;
`}
`

const DropdownItem = styled('div')`
  margin-left: 16px;
  margin-bottom: 16px;
  a {
    text-decoration: none;
    color: #333333;
    font-family: ${font.regular};
  }
  :nth-child(1) {
    margin-top: 16px
  }
  :nth-child(4) {
    a {
      color: #EB5757;
    }
  }
  ${maxWidth.md`
  display: block;
  margin: 0;
  `}
`

const HamburgerContainer = styled('div')`
  box-sizing: border-box;
  min-width: ${({ isLogin }) => !isLogin ? '40px' : '40px'};
  min-height: ${({ isLogin }) => !isLogin ? '40px' : '44px'};
  border-radius: ${({ isLogin }) => !isLogin ? '50%' : '24px'};
  background-color: #F2F2F2;
  border-radius: ${({ isLogin }) => !isLogin ? '50%' : '24px'};
  display: ${({ isLogin }) => !isLogin ? 'none' : 'flex'};
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: 24px;
${maxWidth.md`
  display: flex;
`}
`
const StyledInput = styled(Input)`
  ${maxWidth.md`
    margin: 0;
  `}
`

const connector = connect(({ memberReducer }) => ({
  memberToken: memberReducer.member.token,
  memberDetail: memberReducer.member,
}))

const Header = ({
  memberDetail,
  memberToken,
  dispatch
}) => {
  // open/close Dropdown
  const [isClick, setIsClick] = useState(false)
  const [isLogin, setisLogin] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const handleClick = () => {
    setIsClick(!isClick)
  }

  const { push } = useRouter()
  
  const useOutsideClick = (ref) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsClick(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref])
  }
  const wrapperRef = useRef(null)
  useOutsideClick(wrapperRef)

  const handleOnEnterSearch = (e) => {
    if (e.key === 'Enter') {
      push(`/course?search=${e.target.value}`)
    }
  }

  return (
    <Wrapper ref={wrapperRef}>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
      <Nav>
        <NavbarContainer>
          <NavLogo>
            <Link href='/'>
              <a>
                <NavIcon src='/static/images/logo.png' />
              </a>
            </Link>
          </NavLogo>
          <StyledInput
            type='text'
            placeholder='ค้นหาคอร์ส'
            maxWidth='300px'
            width='100%'
            margin='0 24px 0 0'
            backgroundColor='#F6F6F6'
            height='40px'
            onKeyDown={handleOnEnterSearch}
          />
          <NavMenu isClick={isClick}>
            <NavItem>
              <Link href='/course'>
                <a>คอร์สเรียน</a>
              </Link>
            </NavItem>
            <NavItem>
              <Link href='/news'>
                <a>ข่าวประชาสัมพันธ์</a>
              </Link>
            </NavItem>
            <NavItem>
              <Link href='/howto'>
                <a>วิธีการใช้งาน</a>
              </Link>
            </NavItem>
            <NavItem rightBorder>
              <Link href='/faq'>
                <a>คำถามที่พบบ่อย</a>
              </Link>
            </NavItem>
            {
              !memberToken &&
                <>
                  <NavItemBtn>
                    <Button
                      fontSize='12px'
                      color='#00937B'
                      // onClick={() => setisLogin(!isLogin)}
                      onClick={() => setIsLoginModalOpen(true)}

                    >
                      เข้าสู่ระบบ
                    </Button>
                  </NavItemBtn>
                  <NavItemBtn>
                    <Button
                      type='primary'
                      fontSize='12px'
                      onClick={() => Router.push('/register')}
                    >
                      สมัครสมาชิก
                    </Button>
                  </NavItemBtn>
                </>
            }
            {
              memberToken &&
                <>
                  <NavItem display='none'>
                    <Link href='/'>
                      <a>โปรไฟล์ส่วนตัว</a>
                    </Link>
                  </NavItem>
                  <NavItem display='none'>
                    <Link href='/'>
                      <a>คอร์สของฉัน</a>
                    </Link>
                  </NavItem>
                  <NavItem display='none'>
                    <Link href='/'>
                      <a>ใบประกาศนียบัตร</a>
                    </Link>
                  </NavItem>
                  <NavItem display='none'>
                    <Link href='/'>
                      <a style={{ color: '#EB5757' }}>
                        ออกจากระบบ
                      </a>
                    </Link>
                  </NavItem>
                </>
            }
          </NavMenu>
          <NavProfile isLogin={memberToken} onClick={handleClick}>
            <HamburgerContainer isLogin={memberToken}>
              <Hamburger src='/static/images/hamburger.png' isLogin={memberToken} />
              {
              memberToken &&
                <>
                  <PicProfile
                    size={28}
                    src={memberDetail.profile_path}
                    icon={<UserOutlined />}
                  />
                  <div>{memberDetail.firstname}</div>
                  <Chevron src='/static/images/vector.png' />
                  <DropdownMenu isClick={isClick} onClick={(event) => {
                    event.stopPropagation()
                  }}>
                    <DropdownItem>
                      <Link href='/profile/basic-information'>
                        <a>โปรไฟล์ส่วนตัว</a>
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link href='/profile/courses'>
                        <a>คอร์สของฉัน</a>
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link href='/profile/certificate'>
                        <a>ใบประกาศนียบัตร</a>
                      </Link>
                    </DropdownItem>
                    <DropdownItem onClick={() => dispatch(onMemberLogout())}>
                      <Link href='/'>
                        <a>ออกจากระบบ</a>
                      </Link>
                    </DropdownItem>
                  </DropdownMenu>
                </>
            }
            </HamburgerContainer>
          </NavProfile>
        </NavbarContainer>
      </Nav>
    </Wrapper>
  )
}

export default connector(Header)
