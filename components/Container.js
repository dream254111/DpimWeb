import styled from 'styled-components'
import { minWidth } from '../helpers/breakpoint'

const ContainerStyle = styled('div')`
  position: ${props => props.position ? props.position : 'relative'};
  text-align: ${props => props.textAlign ? props.textAlign : ''};
  ${props => props.marginTop || props.marginBottom ? `
    margin-top: ${props.marginTop};
    margin-bottom: ${props.marginBottom};
  ` : `
    margin: 0 auto;
  `
  }
  ${props => props.paddingTop || props.paddingBottom ? `
    padding-top: ${props.paddingTop};
    padding-bottom: ${props.paddingBottom};
  ` : ''}

  max-width: ${props => props.maxWidth ? props.maxWidth : '1024px'};
  width: 90%;
  align-items: center;
  ${minWidth.sm`
    max-width: 750px;
  `}
  ${minWidth.md`
    max-width: 970px;
  `}
  ${minWidth.lg`
    max-width: ${props => props.maxWidth ? props.maxWidth : '1024px'};
  `}
`

const Container = ({ children, ...rest }) => {
  return (
    <ContainerStyle {...rest}>{children}</ContainerStyle>
  )
}

export default Container
