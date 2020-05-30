import Taro, { useState, useEffect, useMemo } from '@tarojs/taro'
import { View, Button, Text, Checkbox } from '@tarojs/components'
import { useDispatch, useSelector } from '@tarojs/redux'
import { increase, fetchCart } from '../../actions/cart'
import './index.scss'
import Calc from './components/Calc'

export default function Cart () {
  const dispatch = useDispatch()
  const data = [
    { id: '0', name: '苹果', price: 10, count: 5 },
    { id: '1', name: '西瓜', price: 12, count: 2 },
    { id: '2', name: '柠檬', price: 11, count: 1 }
  ]
  // useDidShow(() => {
  //   fetchCart(propsArr) // 直接放在函数组件或者useState会不停的运行fetch
  // })
  useMemo(() => {
    const data = [
      { id: '0', name: '苹果', count: 5 },
      { id: '1', name: '西瓜', count: 2 },
      { id: '2', name: '柠檬', count: 1 }
    ] // data放到外面，每次渲染引用都不一样，就会不停的执行，effect里执行了渲染操作，就会死循环
    dispatch(fetchCart(data))
    // useEffect第二个参数为空数组的话，只会在初次渲染执行（或者说保证参数不变的话可以避免渲染
    // 初始化最好放在useEffect/useMemo里
    // 默认情况下，effect 会在每轮组件渲染完成后执行。
    // 函数组件是个render函数，每次重新渲染都会调用
    // useMemo用于渲染期间，请不要在这个函数内部执行与渲染无关的操作
    // useEffect作用于渲染结束后的副作用，最后不好做一些渲染操作。
    // 但是网上的代码还是会使用useEffect获取异步渲染的数据
    Taro.showToast({
      title: 'fetch success'
    })
  }, [dispatch])
  const [carts, setCarts] = useState(() => {
    const ids: string[] = []
    const items = {}
    data.forEach(item => {
      items[item.id] = item
      ids.push(item.id)
    })
    // fetch()
    return {
      ids,
      items
    }
  })
  // const reduxState = useSelector((state: any) => state.cart)
  const onItemClick = (id: string, count: number) => {
    // propsArr[0].name='改'
    // setCarts([...propsArr])
    setCarts(prevState => {
      const { items } = prevState
      items[id].count += count
      return {
        ...prevState,
        items: {
          ...items
        }
      }
    })
    dispatch(increase(id))
  }

  // 购物车数量修改
  const onChangeItemCount = (id, count) => {
    count = count * 1
    setCarts(prevState => {
      prevState.items[id].count = count < 1 ? 1 : count
      return {
        ...prevState
      }
    })
  }

  // 选中购物车
  const onCheckbox = (e) => {
    const { id } = e.target.dataset
    setCarts(prevState => {
      const item = prevState.items[id]
      item.selected = !item.selected
      return {
        ...prevState
      }
    })
  }

  // 总价
  const summary = useMemo(() => {
    let sum = 0
    carts.ids.forEach(id => {
      const item = carts.items[id]
      if (item.selected) {
        sum += (item.price * item.count)
      }
    })
    return sum
  }, [carts])
  return (
    <View className='cartView'>
      {
        carts.ids.map(id => {
          const item = carts.items[id]
          return (
            <View
              key={id}
              className='cartView--item'
            >
              <Checkbox value={item.selected} data-id={item.id} onClick={onCheckbox} />
              <View>{item.name}</View>
              <View>￥{item.price}</View>
              <Calc cartId={item.id} count={item.count} onChange={onChangeItemCount} />
            </View>
          )
        })
      }
      <View className='cartView--summary'>
        <View className='cartView--payment'>
          <Text className='cartView--totalPrice'>总价：￥{summary}</Text>
          <Button
            className='cartView--summaryBtn'
            type='warn'
            size='mini'
          >结算</Button>
        </View>
      </View>
    </View>
  )
}


// Taro.setBackgroundTextStyle
Cart.config = {
  navigationBarTitleText: '购物车'
}
