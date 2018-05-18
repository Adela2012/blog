import React, { Component } from 'react';
import './style.scss';
import Flex from '../../components/flex'


function Item(props) {
    return (
        <div className="flexbox-item" style={props.style}>{props.children}</div>
    )
}
function Items(props) {
    let num = props.num || 3
    const ARR = []
    for (let i = 1; i <= num; i++) {
        ARR.push(i)
    }
    return ARR.map(item => {
        return (
            <Item key={item} style={props.style}>{item}</Item>
        )
    })
}

class FlexDemo extends Component {
    render() {
        return (
            <div className="flex-container">
                <h2>1. Flex 容器</h2>
                <p><code>display: flex;</code></p>
                <div className="flex">
                    <Items />
                </div>
                <div>
                    <ul className="ul-list">
                        <code>
                            <li>1.1 flex-direction</li>
                            <li>1.2 flex-wrap</li>
                            <li>1.3 flex-flow</li>
                            <li>1.4 justify-content</li>
                            <li>1.5 align-items</li>
                            <li>1.6 align-content</li>
                        </code>
                    </ul>
                </div>

                <section>
                    <h2>1.1 flex-direction</h2>
                    <p><code>flex-direction: row | row-reverse | column | column-reverse;</code></p>
                    <p>flex-direction属性决定主轴的方向（即项目的排列方向）。</p>
                    <p><code>flex-direction: row</code></p>
                    <Flex className="flexbox" direction="row"><Items num={3} /></Flex>
                    
                    <p><code>flex-direction: row-reverse</code></p>
                    <Flex className="flexbox" direction="row-reverse"><Items num={3} /></Flex>

                    <p><code>flex-direction: column</code></p>
                    <Flex className="flexbox" direction="column"><Items num={3} /></Flex>

                    <p><code>flex-direction: column-reverse</code></p>
                    <Flex className="flexbox" direction="column-reverse"><Items num={3} /></Flex>
                </section>

                <section>
                    <h2>1.2 flex-wrap</h2>
                    <p><code>flex-wrap: nowrap | wrap | wrap-reverse;</code></p>
                    <p>flex-wrap属性定义，如果一条轴线排不下，如何换行。</p>
                    <p><code>flex-wrap: wrap</code></p>
                    <Flex className="flexbox" wrap="wrap"><Items num={12} /></Flex>

                    <p><code>flex-wrap: nowrap</code></p>
                    <Flex className="flexbox" wrap="nowrap"><Items num={12} /></Flex>

                    <p><code>flex-wrap: wrap-reverse</code></p>
                    <Flex className="flexbox" wrap="wrap-reverse"><Items num={12} /></Flex>
                </section>

                <section>
                    <h2>1.3 flex-flow</h2>
                    <p><code>flex-flow: flex-direction || flex-wrap;</code></p>
                    <p>flex-flow属性是 <code>flex-direction</code> 属性和 <code>flex-wrap</code> 属性的简写形式，默认值为row nowrap。</p>
                </section>

                <section>
                    <h2>1.4 justify-content</h2>
                    <p><code>justify-content: flex-start | center | flex-end | space-between | space-around;</code></p>
                    <p>justify-content属性定义了项目在主轴上的对齐方式。</p>

                    <p><code>justify-content: flex-start</code></p>
                    <Flex className="flexbox" justify="start"><Items num={3} /></Flex>


                    <p><code>justify-content: center</code></p>
                    <Flex className="flexbox" justify="center"><Items num={3} /></Flex>


                    <p><code>justify-content: flex-end</code></p>
                    <Flex className="flexbox" justify="end"><Items num={3} /></Flex>


                    <p><code>justify-content: space-between</code></p>
                    <Flex className="flexbox" justify="between"><Items num={3} /></Flex>


                    <p><code>justify-content: space-around</code></p>
                    <Flex className="flexbox" justify="around"><Items num={3} /></Flex>
                </section>

                <section>
                    <h2>1.5 align-items</h2>
                    <p><code>align-items: flex-start | center | flex-end | strench | baseline;</code></p>
                    <p>flex-wrap属性定义，如果一条轴线排不下，如何换行。</p>

                    <p><code>algin-items: flex-start</code></p>
                    <Flex className="flexbox" align="start"><Items num={3} /></Flex>

                    <p><code>algin-items: center</code></p>
                    <Flex className="flexbox" align="center"><Items num={3} /></Flex>

                    <p><code>algin-items: flex-end</code></p>
                    <Flex className="flexbox" align="end"><Items num={3} /></Flex>

                    <p><code>algin-items: stretch</code></p>
                    <Flex className="flexbox" align="stretch"><Items num={3} style={{height: 'auto'}}/></Flex>

                    <p><code>algin-items: baseline</code></p>
                    <Flex className="flexbox" align="baseline"><Items num={3} /></Flex>
                </section>

                <section>
                    <h2>1.6 align-content</h2>
                    <p><code>align-content: flex-start | center | flex-end | stretch | space-between | space-around;</code></p>
                    <p>align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。</p>
                    <p><code>align-content: flex-start</code></p>
                    <Flex className="flexbox" wrap="wrap" direction="row" alignContent="start"><Items num={20} /></Flex>

                    <p><code>align-content: center</code></p>
                    <Flex className="flexbox" wrap="wrap" direction="row" alignContent="center"><Items num={20} /></Flex>

                    <p><code>align-content: flex-end</code></p>
                    <Flex className="flexbox" wrap="wrap" direction="row" alignContent="end"><Items num={20} /></Flex>

                    <p><code>align-content: stretch</code></p>
                    <Flex className="flexbox" wrap="wrap" direction="row" alignContent="stretch"><Items num={20} /></Flex>

                    <p><code>align-content: space-between</code></p>
                    <Flex className="flexbox" wrap="wrap" direction="row" alignContent="between"><Items num={20} /></Flex>

                    <p><code>align-content: space-around</code></p>
                    <Flex className="flexbox" wrap="wrap" direction="row" alignContent="around"><Items num={20} /></Flex>
                </section>

                <div style={{ height: '600px' }}></div>
            </div>
        )
    }
}
export default FlexDemo;