import Taro from '@tarojs/taro'
import { View, Button, Input } from '@tarojs/components'
import './index.scss'
// import { InputProps } from '@tarojs/components/types/Input'
// import { BaseEventOrigFunction } from '@tarojs/components/types/common'
// onInput={onChange}的时候需要定义

interface Props {
  count: number
  onChange: Function
  cartId: string
}

export default function Calc (props: Props) {
  const { count, onChange, cartId } = props
  return (
    <View className='calc-container'>
      <Button plain size='mini' onClick={() => { onChange(cartId, count - 1) }}>-</Button>
      <Input value={count + ''} disabled />
      <Button plain size='mini' onClick={() => { onChange(cartId, count + 1) }}>+</Button>
    </View>
  )
}

Calc.defaultProps = {
  onChange: () => {},
  count: 0,
  cartId: null
}
