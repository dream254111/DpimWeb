import styled, { css } from 'styled-components'
import font from '../helpers/font'

const Button = styled('button')`
  box-sizing: border-box;
  white-space: nowrap;
  cursor: pointer;
  margin: ${props => props.margin ? props.margin : ''};
  width: ${props => props.width ? props.width : ''} ;
  height: ${props => props.height ? props.height : ''};
  font-weight: ${props => props.fontWeight ? props.fontWeight : ''};
  display: ${props => props.display ? props.display : ''};
  padding: ${props => props.padding ? props.padding : ''};
  border: ${props => props.border ? props.border : ''};
  border-radius: ${props => props.borderRadius ? props.borderRadius : ''};
  color: ${props => props.color ? props.color : ''};
  background: ${props => props.backgroundColor ? props.backgroundColor : ''};
  font-family: ${props => props.fontFamily || font.regular};
  font-size: ${props => props.fontSize ? props.fontSize : ''};
  lint-height: ${props => props.lineHeight ? props.lineHeight : ''};

${props => props.type === 'normal' && css`
  font-weight: ${props => props.fontWeight ? props.fontWeight : 'bold'};
  border: ${props => props.border || '1px solid #00937B'};
  border-radius: ${props => props.borderRadius || '4px'};
  color: ${props => props.color ? props.color : '#ffffff'};
  background: ${props => props.backgroundColor || '#00937B'};

    ${props => props.size === 'small' && css`
      padding: 8px 16px 8px 16px;
      font-size: ${props => props.fontSize || '12px'};
`}

    ${props => props.size === 'medium' && css`
      padding: 8px 24px 8px 24px;
      font-size: ${props => props.fontSize || '16px'};
`}

    ${props => props.size === 'large' && css`
      padding: 8px 72px 8px 72px;
      font-size: ${props => props.fontSize || '18px'};
`}
`}

${props => props.type === 'tag' && css`
  font-size: 12px;
  font-weight: normal;
  border: none;
  border-radius: 20px;
  box-shadow: 0px 0px 2px rgba(40, 41, 61, 0.04);
  padding: 4px 8px;
  color: #FFFFFF;
  font-weight: 400;
`}

${props => props.type === 'website' && css`
  padding: ${props => props.padding || '16px 12px'};
  border-radius: ${props => props.borderRadius || '4px'};
  background: #FFFFFF;
  border: 1px solid #41A0FC;
  color: #41A0FC;
  font-size: 12px;
  text-align: left;
`}
`

const ButtonStyle = ({
  color,
  backgroundColor,
  size,
  border,
  children,
  type,
  margin,
  onClick,
  width,
  height,
  borderRadius,
  fontWeight,
  display,
  padding,
  fontFamily,
  fontSize,
  lineHeight,
  ...rest
}) => {
  return (
    <Button
      color={color}
      backgroundColor={backgroundColor}
      size={size}
      border={border}
      type={type}
      margin={margin}
      onClick={onClick}
      width={width}
      height={height}
      borderRadius={borderRadius}
      fontWeight={fontWeight}
      display={display}
      padding={padding}
      fontFamily={fontFamily}
      fontSize={fontSize}
      lineHeight={lineHeight}
      {...rest}
    >
      {children}
    </Button>
  )
}

export default ButtonStyle
