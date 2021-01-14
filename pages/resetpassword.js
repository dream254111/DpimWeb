import MainLayout from '../layouts/main'
import { ResetPasswordModal } from '../components/modals'
import { useState } from 'react'
import styled from 'styled-components'
import Router from 'next/router'

const Wrapper = styled('div')`
  height: 80vh;  
`

const ResetPasswordPage = ({ token }) => {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <MainLayout>
      <Wrapper>
        <ResetPasswordModal
          isOpen={isOpen}
          onClose={() => {
            Router.push('/')
            setIsOpen(false)
          }}
          token={token}
        />
      </Wrapper>
    </MainLayout>
  )
}

ResetPasswordPage.getInitialProps = ({ query }) => {
  const { token } = query
  return { token }
}

export default ResetPasswordPage
