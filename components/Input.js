import font from '../helpers/font'
import styled, { css } from 'styled-components'

const Input = styled('input')`
  box-sizing: border-box;
  position: relative;
${props => props.type === 'text' && css`
  border-radius: 5px;
  padding-left: 16px;
  font-size: 18px;
  line-height: 24px;
  font-weight: 400;
  margin: ${props => props.margin ? props.margin : ''};
  width: ${props => props.width ? props.width : ''};
  max-width: ${props => props.maxWidth ? props.maxWidth : ''};
  height: ${props => props.height ? props.height : ''};
  border-radius: ${props => props.borderRadius ? props.borderRadius : '5px'};
  border: ${props => props.border ? props.border : '1px solid #EAEAEA'};
  color: ${props => props.color || '#333333'};
  background-color: ${props => props.backgroundColor ? props.backgroundColor : '#FFFFFF'};
  outline: none;
  ::placeholder {
    color: #BDBDBD;
    font-family: ${font.regular};
  }
`}
`

const InputComponent = ({
  type,
  backgroundColor,
  color,
  width,
  height,
  borderRadius,
  border,
  margin,
  maxWidth,
  placeholder,
  className,
  ...rest

}) => {
  return (
    <Input
      type={type}
      backgroundColor={backgroundColor}
      color={color}
      width={width}
      height={height}
      borderRadius={borderRadius}
      border={border}
      margin={margin}
      maxWidth={maxWidth}
      placeholder={placeholder}
      className={className}
      {...rest}
    />
  )
}

export default InputComponent
