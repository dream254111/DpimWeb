import { Menu, Button, Row, Col } from 'antd'
import { useState } from 'react'
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons'
import font from '../../../../../helpers/font'
import MainLayout from '../../../../../layouts/main'
import styled from 'styled-components'

const Wrapper = styled('div')`
  width: 100%;
`

const MenuHeader = styled('div')`
  width: 100%;
  background-color: #00937B;
  padding: 12px 0;
  text-align: center;
  color: white;
  box-shadow: 0px 4px 16px rgba(8, 53, 106, 0.08);
  font-family: ${font.bold};
`

const VideoIframe = styled('iframe')`
  width: 100%;
  height: 70vh;
  border: unset;
  line-height: 0;
`

const DescriptionTitle = styled('div')`
  font-family: ${font.bold};
  background: #FFFFFF;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.04);
  padding: 12px 24px;
  text-align: left;
`

const DescriptionValue = styled('div')`
  min-height: 200px;
  max-height: 500px;
  padding: 24px;
  overflow-y: scroll;
`

const { SubMenu } = Menu

const LectureIdPage = () => {
  const [collapsed, setCollapsed] = useState(false)
  const htmlDecode = (content) => {
    if (process.browser) {
      const e = document.createElement('div')
      e.innerHTML = content
      return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue
    }
    return 'loading...'
  }
  return (
    <MainLayout>
      <Wrapper>
        <Row>
          <Col lg={6} style={{ backgroundColor: 'white' }}>
            <Menu
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode="inline"
              theme="light"
              toggleCollapsed={collapsed}
            >
              <Menu.Item key="1" icon={<PieChartOutlined />}>
                Option 1
              </Menu.Item>
              <Menu.Item key="2" icon={<DesktopOutlined />}>
                Option 2
              </Menu.Item>
              <Menu.Item key="3" icon={<ContainerOutlined />}>
                Option 3
              </Menu.Item>
              <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
                <Menu.Item key="5">Option 5</Menu.Item>
                <Menu.Item key="6">Option 6</Menu.Item>
                <Menu.Item key="7">Option 7</Menu.Item>
                <Menu.Item key="8">Option 8</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
                <Menu.Item key="9">Option 9</Menu.Item>
                <Menu.Item key="10">Option 10</Menu.Item>
                <SubMenu key="sub3" title="Submenu">
                  <Menu.Item key="11">Option 11</Menu.Item>
                  <Menu.Item key="12">Option 12</Menu.Item>
                </SubMenu>
              </SubMenu>
              <Menu.Item key="3" icon={<ContainerOutlined />}>
                Option 3
              </Menu.Item>
              <Menu.Item key="3" icon={<ContainerOutlined />}>
                Option 3
              </Menu.Item>
              <Menu.Item key="3" icon={<ContainerOutlined />}>
                Option 3
              </Menu.Item>
              <Menu.Item key="3" icon={<ContainerOutlined />}>
                Option 3
              </Menu.Item>
            </Menu>
          </Col>
          <Col lg={18}>
            <MenuHeader>
            เทคโนโลยีรีไซเคิลฝุ่นสังกะสีจากอุตสาหกรรมชุบเคลือบ สังกะสีแบบจุ่มร้อน (Hot-Dip...
              {/* <Button type="primary" onClick={() => setCollapsed(collapsed => !collapsed)} >
                {
                  collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                }
              </Button> */}
            </MenuHeader>
            <VideoIframe
              src='https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4?_=1'
              playing
              controls                  
            />
            <DescriptionTitle>คำอธิบาย</DescriptionTitle>
            <DescriptionValue>
              <p dangerouslySetInnerHTML={{ __html: htmlDecode('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry') }} />
            </DescriptionValue>
          </Col>
        </Row>
      </Wrapper>
    </MainLayout>
  )
}


LectureIdPage.getInitialProps = ({ query }) => {
  const lectureId = query.lectureId
  return {
    lectureId
  }
}


export default LectureIdPage