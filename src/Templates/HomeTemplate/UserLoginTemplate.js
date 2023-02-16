import React, { useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;



export const UserLoginTemplate = (props) => {
    
    const [{width, height}, setResize] = useState({
        width : Math.round(window.innerWidth),
        height :Math.round(window.innerHeight)
    })
    
    useEffect(() => {
      window.onresize = ()=>{
        setResize({
            width : Math.round(window.innerWidth),
            height : Math.round(window.innerHeight),
        })
      }
    
      return () => {
       
      }
    }, [])
    


    let { Component, ...restParam } = props;
    return <Route {...restParam} render={(propsRoute) => {
        return <>
            <Layout>
                <Sider width={width/2} style={{height: height, backgroundImage : `url("https://picsum.photos/${Math.round(width/2)}/${height}")`,backgroundSize :"100%"}}>
                    
                </Sider>
                    <Content>
                        <Component {...propsRoute} />
                    </Content>
            </Layout>

        </>
    }} />
}