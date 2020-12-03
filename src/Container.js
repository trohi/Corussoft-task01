import styled from 'styled-components'
import React from 'react'

const ContainerDiv = styled.div`
    overflow-y: scroll;
    background: linear-gradient(80deg, green, darkolivegreen, teal)
`

const Img = styled.img`
    display: flex;
    margin-top: 120px;
    margin-bottom: 10px;
    margin-left: auto;
    margin-right: auto;
    border-left: 2px solid teal;
    border-right: 2px solid green;
    padding-left: 25px;
    padding-right: 25px
`

const Nav = styled.div`
    position: fixed;
    font-size: 1rem;
    background-color: black;
    width: 100%;
    height: 60px;
    padding-top: 2%;
    padding-bottom: 2%;
    border-bottom: 1px solid green;
`
const ButtonGrayscale = styled.button`
    width: 10%;
    display: inline;
    background-color: black;
    border: 2px solid green;
    height: 40px;
    border-radius: 20px;
    color: grey;
    line-height: 35px;
    cursor: pointer;

    &:hover{
      text-transform: uppercase;
      width: 11%
    }
`
const ButtonGrayscaleActive = styled(ButtonGrayscale)`
    background-color: green;
    color: black
`

const ButtonNormal = styled(ButtonGrayscale)`
    margin-left: 5%
`
const ButtonNormalActive = styled(ButtonNormal)`
    background-color: green;
    color: black
`

const BlurHeader = styled.span`
    color: green;
    margin-left: 5%;
    margin-right: 1%
`

const Slider = styled.input`
    background:green;
    color:green;
    height:6px;
    cursor:pointer
`

class Container extends React.Component{
    constructor(){
        super()
        let grayscale = "";
        //let blurValue = 0
        this.state = {
            apiUrl:`https://picsum.photos/400/400${grayscale}`,
            imgArray:[], 
            scrollEventCounter: 0,
            grayscale: false,
            normal:true,
            blurValue: "0"
            }

        window.onscroll = function(){scrollHandler()}
        
        const scrollHandler =()=>{
            if( window.scrollY >= document.body.clientHeight - 1000 && this.state.scrollEventCounter < 1){
                this.state.scrollEventCounter ++
                for(let i = 0; i< 5; i++ ){
                    const ApiUrl = this.state.apiUrl
                    fetch(ApiUrl)
                    .then((response) => {
                    this.setState({imgUrl: response.url})
                    this.setState({imgArray:[...this.state.imgArray, response.url] })
                    this.state.scrollEventCounter = 0
                    })
                }
            }
        }     
    }

    helperFunction = (api) => {
        this.setState({apiUrl:api})
        for(let i =0; i < this.state.imgArray.length; i++){
            fetch(api)
            .then((response)=>{
                this.setState({imgArray: [...this.state.imgArray, response.url]})
            })
        }
    }

    grayscaleHandler = () => {
        this.setState({grayscale: !this.state.grayscale})
        this.setState({normal: false})
        this.setState({imgArray:[]})
        if(this.state.blurValue !== "0"){
            this.helperFunction(`https://picsum.photos/400/400?grayscale&blur=${this.state.blurValue}`)
        } else {
            this.helperFunction(`https://picsum.photos/400/400?grayscale`)
        }
    }

    normalHandler = () => {
        this.setState({normal: true})
        this.setState({grayscale: false})
        this.setState({imgArray:[]})
        if(this.state.blurValue !== "0"){
            this.helperFunction(`https://picsum.photos/400/400?blur=${this.state.blurValue}`)
        } else {
            this.helperFunction(`https://picsum.photos/400/400`)
        }
    }

    blurEffectHandler = (e) => {
        console.log(e.target.value)
        const targetValue = e.target.value
        this.setState({blurValue: targetValue})
        if(targetValue === "0"){
            this.normalHandler()
        } else if(this.state.grayscale){
            this.setState({imgArray:[]})
            this.helperFunction(`https://picsum.photos/400/400?grayscale&blur=${targetValue}`)
        } else {
            this.setState({imgArray:[]})
            this.helperFunction(`https://picsum.photos/400/400?blur=${targetValue}`)
    }
}

    componentDidMount(){
        for(let i = 0; i< 15; i++ ){
        const ApiUrl = this.state.apiUrl
        fetch(ApiUrl)
        .then((response) => {
            this.setState({imgUrl: response.url})
            this.setState({imgArray:[...this.state.imgArray, response.url] })
            //console.log(this.state.imgArray[0])
        })
     }
    }


    render(){
        return(
            <div>
                <Nav>
                {
                    this.state.grayscale ? <ButtonGrayscaleActive onClick={this.grayscaleHandler}>greyscale</ButtonGrayscaleActive> : <ButtonGrayscale onClick={this.grayscaleHandler}>greyscale</ButtonGrayscale>
                }
                {
                    this.state.normal ? <ButtonNormalActive onClick={this.normalHandler}>normal</ButtonNormalActive> : <ButtonNormal onClick={this.normalHandler}>normal</ButtonNormal>
                }
            <BlurHeader>Select blur strength : {this.state.blurValue}</BlurHeader>
                <Slider type="range" min="0" max="10" defaultValue="0" onChange={this.blurEffectHandler}></Slider>
                </Nav>
                <ContainerDiv>
                    {
                        this.state.imgArray.map((url, index)=>{
                            return <Img src={url} key={index} alt={'img'+index}></Img>
                        })
                    }
                </ContainerDiv>
            </div>
        )
    }
}                                                                                                                                                                                                                                                                                                                                
export default Container