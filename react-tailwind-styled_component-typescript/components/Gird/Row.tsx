import type { NextComponentType } from 'next'
import { ReactNode } from 'react'
import styled from 'styled-components'



interface RowType {
    children?: ReactNode,
    justify?: 'center' | 'flex-start' | 'felx-end' | 'space-between' |  'space-around' | 'stretch',
    items?:  'center' | 'flex-end' | 'flex-start' | 'stretch',
    wrap?: boolean
}

const MyRow = styled.div<RowType>`
    width: 100%;
    display: flex;
    flex-wrap:  ${({wrap}) =>  wrap === false ? 'no-wrap' : 'wrap'};
    justify-content: ${({justify}) => justify || 'flex-start'};
    align-items: ${({items}) => items || 'flex-start'};
`



const Row = ({ children , justify, items, wrap }: RowType) => {
    return (
        <MyRow justify={justify} items={items} wrap={wrap}>
            {children}
        </MyRow>
    )
}

export default Row;