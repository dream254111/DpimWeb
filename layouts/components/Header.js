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

const PicProfile = styled('img')`
  box-sizing: border-box;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-position: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid #FFFFFF;
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

const Header = () => {
  // open/close Dropdown
  const [isClick, setIsClick] = useState(false)
  const [isLogin, setisLogin] = useState(false)
  const handleClick = () => {
    setIsClick(!isClick)
  }
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

  return (
    <Wrapper ref={wrapperRef}>
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
          />
          <NavMenu isClick={isClick}>
            <NavItem>
              <Link href='/'>
                <a>คอร์สเรียน</a>
              </Link>
            </NavItem>
            <NavItem>
              <Link href='/'>
                <a>ข่าวประชาสัมพันธ์</a>
              </Link>
            </NavItem>
            <NavItem>
              <Link href='/'>
                <a>วิธีการใช้งาน</a>
              </Link>
            </NavItem>
            <NavItem rightBorder>
              <Link href='/faq'>
                <a>คำถามที่พบบ่อย</a>
              </Link>
            </NavItem>
            {
              !isLogin &&
                <>
                  <NavItemBtn>
                    <Button
                      type='normal'
                      size='small'
                      backgroundColor='#ffffff'
                      color='#00937B'
                      onClick={() => setisLogin(!isLogin)}
                    >
                      เข้าสู่ระบบ
                    </Button>
                  </NavItemBtn>
                  <NavItemBtn>
                    <Button
                      type='normal'
                      size='small'
                    >
                      สมัครสมาชิก
                    </Button>
                  </NavItemBtn>
                </>
            }
            {
              isLogin &&
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
          <NavProfile isLogin={isLogin} onClick={handleClick}>
            <HamburgerContainer isLogin={isLogin}>
              <Hamburger src='/static/images/hamburger.png' isLogin={isLogin} />
              {
              isLogin &&
                <>
                  <PicProfile src='/static/images/ProfileImage.png' />
                  <p>อธิราช</p>
                  <Chevron src='/static/images/vector.png' />
                  <DropdownMenu isClick={isClick} onClick={(event) => {
                    event.stopPropagation()
                  }}>
                    <DropdownItem>
                      <Link href='/'>
                        <a>โปรไฟล์ส่วนตัว</a>
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link href='/'>
                        <a>คอร์สของฉัน</a>
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link href='/'>
                        <a>ใบประกาศนียบัตร</a>
                      </Link>
                    </DropdownItem>
                    <DropdownItem onClick={() => setisLogin(!isLogin)}>
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

export default Header
