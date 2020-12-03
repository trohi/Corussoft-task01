import styled, {keyframes} from 'styled-components'
import React from 'react'

const ContainerDiv = styled.div`
    overflow-y: scroll;
    background: linear-gradient(80deg, green, darkolivegreen, teal);
    min-height: 100vh
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
    padding-right: 25px;
`

const Nav = styled.div`
    position: fixed;
    font-size: 1rem;
    background-color: black;
    width: 100%;
    height: 60px;
    padding-top: 2%;
    padding-bottom: 0%;
    border-bottom: 1px solid green;
`
const ButtonGrayscale = styled.button`
    width: 10%;
    display: inline;
    background-color: black;
    -webkit-backface-visibility:hidden;
    -webkit-border-before: 2px solid green;
    -webkit-border-radius: 20px;
    border: 2px solid green;
    height: 40px;
    border-radius: 20px;
    color: grey;
    line-height: 35px;
    font-family: Avenir;
    cursor: pointer;

    &:hover{
      text-transform: uppercase;
    }
`
const ButtonGrayscaleActive = styled(ButtonGrayscale)`
    background-color: green;
    color: black
`

const ButtonNormal = styled(ButtonGrayscale)`
    margin-left: 5%;
`
const ButtonNormalActive = styled(ButtonNormal)`
    background-color: green;
    color: black;
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
const Spin = keyframes`
    0%{ transform : rotate:(0deg)}
    100%{ transform : rotate(360deg)}
`

const Loader = styled.div`
    position: relative;
    border: 10px solid #f3f3f3;
    border-top: 10px solid green; 
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: ${Spin} 2s linear infinite;
    float:right;
    margin-top:-0.5%;
    margin-right:28%;
    margin-left:-15%
`

class Container extends React.Component{
    constructor(){
        super()
        let grayscale = "";
        //let blurValue = 0
        this.state = {
            apiUrl:`https://picsum.photos/500/500${grayscale}`,
            imgArray:[], 
            scrollEventCounter: 0,
            grayscale: false,
            normal:true,
            blurValue: "0",
            loading: false
            }

        window.onscroll = function(){scrollHandler()}
        
        const scrollHandler =()=>{
            if( window.scrollY >= document.body.clientHeight - 1000 && this.state.scrollEventCounter < 1){
                this.state.scrollEventCounter ++
                for(let i = 0; i< 10; i++ ){
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
        for(let i = 0; i < 10; i++){
            fetch(api)
            .then((response)=>{
                this.setState({imgArray: [...this.state.imgArray, response.url]})
            })
        }
    }

    helperFunctionforBlur = (api)=>{
        this.setState({loading: true})
        this.setState({apiUrl:api})
        for(let i = 0; i < 10; i++){
            fetch(api)
            .then((response)=>{
                 if(i >= 9){
                    this.setState({loading: false})
                } 
                this.setState({imgArray: [...this.state.imgArray, response.url]})
            })
        }
    }

    grayscaleHandler = () => {
        this.setState({grayscale: !this.state.grayscale})
        this.setState({normal: false})
        this.setState({imgArray:[]})
        if(this.state.blurValue !== "0"){
            this.helperFunction(`https://picsum.photos/500/500?grayscale&blur=${this.state.blurValue}`)
        } else {
            this.helperFunction(`https://picsum.photos/500/500?grayscale`)
        }
    }

    normalHandler = (e) => {
        if(e){
            e.preventDefault()
        }
        this.setState({normal: true})
        this.setState({grayscale: false})
        this.setState({imgArray:[]})
        if(this.state.blurValue !== "0"){
            this.helperFunction(`https://picsum.photos/500/500?blur=${this.state.blurValue}`)
        } else {
            this.helperFunction(`https://picsum.photos/500/500`)
        }
    }

    blurEffectHandler = (e) => {
        const targetValue = e.target.value
        this.setState({blurValue: targetValue})
        if(targetValue === "0"){
            this.setState({imgArray: []})
            this.helperFunctionforBlur(`https://picsum.photos/500/500`)
        } else if(this.state.grayscale){
            this.setState({imgArray: []})
            this.helperFunctionforBlur(`https://picsum.photos/500/500?grayscale&blur=${targetValue}`)
        } else {
            this.setState({imgArray: []})
            this.helperFunctionforBlur(`https://picsum.photos/500/500?blur=${targetValue}`)
        }
    }

    componentDidMount(){
        for(let i = 0; i< 10; i++ ){
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
                    this.state.grayscale ? <ButtonGrayscaleActive onClick={this.grayscaleHandler}>grayscale</ButtonGrayscaleActive> : <ButtonGrayscale onClick={this.grayscaleHandler}>grayscale</ButtonGrayscale>
                }
                {
                    this.state.normal ? <ButtonNormalActive onClick={this.normalHandler}>normal</ButtonNormalActive> : <ButtonNormal onClick={this.normalHandler}>normal</ButtonNormal>
                }
            <BlurHeader>Select blur strength : {this.state.blurValue}</BlurHeader>
            {
                this.state.loading ? <Loader></Loader>: <Slider type="range" min="0" max="10" defaultValue={this.state.blurValue} onClick={this.blurEffectHandler}></Slider>
            }
                
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