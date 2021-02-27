import styled from 'styled-components'

const TagStyle = styled('div')`
    border-color: transparent;
    box-sizing: border-box;
    color: white;
    font-size: 14px;
    line-height: 1.5715;
    list-style: none;
    display: inline-block;
    height: auto;
    font-size: 14px;
    line-height: 20px;
    white-space: nowrap;
    background: #fafafa;
    box-shadow: 0px 0px 2px rgba(40, 41, 61, 0.04), 0px 4px 8px rgba(96, 97, 112, 0.16);
    border-radius: 20px;
    padding: 4px 8px;
    border: 1px solid transparent;
    opacity: 1;
    transition: all .3s;
    background-color: ${props => props.color};
    ${props => props.outline && `
      background-color: white;
      border: 1px solid #F2F2F2;
      color: #00937B;
    `};
`

const TagComponent = ({ color, outline, children, ...rest }) => {
  return (
    <TagStyle
      color={color}
      outline={outline}
      {...rest}
    >{children}</TagStyle>
  )
}

export default TagComponent
