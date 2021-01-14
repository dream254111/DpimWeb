import { Checkbox } from 'antd'
import styled from 'styled-components'

const CheckboxStyle = styled(Checkbox)`
  line-height: 2;
`

const CheckboxComponent = ({...rest}) => <CheckboxStyle {...rest} />

export default CheckboxComponent
