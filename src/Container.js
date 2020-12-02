import styled from 'styled-components'
import React from 'react'

const ContainerDiv = styled.div`
    /*height: 82.5vh; */
    overflow-y: scroll;
    background: linear-gradient(60deg, green, darkolivegreen, teal)
`

const Img = styled.img`
    display: flex;
    margin-top: 40px;
    margin-bottom: 10px;
    margin-left: auto;
    margin-right: auto;
    border-left: 2px solid teal;
    border-right: 2px solid green;
    padding-left: 25px;
    padding-right: 25px
`

/* window.onscroll = function(){myfunction()}

const myfunction =()=>{
    if( window.scrollY >= document.body.clientHeight - 1000){
        console.log("Vakat da se dohvate nove slike!")
    }
} */

class Container extends React.Component{
    constructor(){
        super()
        let grayscale = "";
        //let blurValue = 0
        this.state = {
            apiUrl:`https://picsum.photos/400/400${grayscale}`,
            imgArray:[], 
            scrollEventCounter: 0
            }

            window.onscroll = function(){myfunction()}
        

        const myfunction =()=>{
            if( window.scrollY >= document.body.clientHeight - 1000 && this.state.scrollEventCounter < 1){
                console.log("Vakat da se dohvate nove slike!")
                this.state.scrollEventCounter ++
                for(let i = 0; i< 15; i++ ){
                    const ApiUrl = this.state.apiUrl
                    fetch(ApiUrl)
                    .then((response) => {
                    //console.log(response.url)
                    this.setState({imgUrl: response.url})
                    this.setState({imgArray:[...this.state.imgArray, response.url] })
                    this.state.scrollEventCounter = 0
                    //console.log(this.state.imgArray[0])
                    })
                }
            }
        }

        /*
       const grayScaleHandler = () => {
            grayscale = '?grayscale'
        }
        */
    }

    componentDidMount(){

        for(let i = 0; i< 15; i++ ){
        const ApiUrl = this.state.apiUrl
        fetch(ApiUrl)
        .then((response) => {
            //console.log(response.url)
            this.setState({imgUrl: response.url})
            this.setState({imgArray:[...this.state.imgArray, response.url] })
            //console.log(this.state.imgArray[0])
        })
     }
    }

     myFunction=(e)=>{
        console.log(window.scrollY)
    }



    render(){
        return(
            <ContainerDiv onScroll={this.myFunction}>
                {
                    this.state.imgArray.map((url, index)=>{
                        return <Img src={url} key={index} alt={'img'+index}></Img>
                    })
                }
            </ContainerDiv>
        )
    }
}                                                                                                                                                                                                                                                                                                                                
export default Container