import styled from 'styled-components'
import { Button } from 'antd'

const ButtonStyle = styled(Button)`
  padding: 8px 16px;
  line-height: 0;
  border-radius: 4px;
  font-size: ${props => props.fontSize ? props.fontSize : '16px'};
  font-weight: ${props => props.fontWeight ? props.fontWeight : 'bold'};
  color: ${props => props.color};
  border: 1px solid #00937B;
  border-color: ${props => props.borderColor};
`

const ButtonStyleComponent = ({
  fontSize,
  children,
  color,
  fontWeight,
  borderColor,
  ...rest
}) => {
  return (
    <ButtonStyle
      fontSize={fontSize}
      color={color}
      fontWeight={fontWeight}
      borderColor={borderColor}
      {...rest}
    >
      {children}
    </ButtonStyle>
  )
}

export default ButtonStyleComponent
