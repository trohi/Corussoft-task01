import styled from 'styled-components'
import React from 'react'

const ContainerDiv = styled.div`
    height: 500px;
    overflow-y: scroll
`

const Img = styled.img`
    display: flex;
    margin-top:40px;
    margin-left:auto;
    margin-right:auto
`

class Container extends React.Component{
    constructor(){
        super()
        let grayscale = "";
        //let blurValue = 0
        this.state = {imgUrl:'', apiUrl:`https://picsum.photos/400/400${grayscale}`, imgArray:[]}
        /*
       const grayScaleHandler = () => {
            grayscale = '?grayscale'
        }
        */
    }

    componentDidMount(){

        for(let i = 0; i< 10; i++ ){
        const ApiUrl = this.state.apiUrl
        fetch(ApiUrl)
        .then((response) => {
            console.log(response.url)
            this.setState({imgUrl: response.url})
            this.setState({imgArray:[...this.state.imgArray, response.url] })
            console.log(this.state.imgArray[0])
        })
     }
    }
    render(){
        return(
            <ContainerDiv>
                <h2>My First React Compoennt</h2>
                {
                    this.state.imgArray.map((url, index)=>{
                        return <Img src={url} key={index} alt={'img'+index}></Img>
                    })
                }
                <Img src={this.state.imgUrl} alt="img"></Img>
            </ContainerDiv>
        )
    }
}                                                                                                                                                                                                                                                                                                                                
export default Container