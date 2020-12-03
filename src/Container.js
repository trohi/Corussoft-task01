import styled from 'styled-components'
import React from 'react'

const ContainerDiv = styled.div`
    overflow-y: scroll;
    background: linear-gradient(80deg, green, darkolivegreen, teal)
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

const Nav = styled.div`
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

const ButtonNormal = styled(ButtonGrayscale)`
  margin-left: 5%
`
const BlurHeader = styled.span`
  color: green;
  margin-left: 5%;
  margin-right: 1%
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
            loading:false
            }

            window.onscroll = function(){scrollHandler()}
        
        const scrollHandler =()=>{
            if( window.scrollY >= document.body.clientHeight - 1000 && this.state.scrollEventCounter < 1){
                console.log("Vakat da se dohvate nove slike!")
                this.state.scrollEventCounter ++
                for(let i = 0; i< 5; i++ ){
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
    }

    grayscaleHandler = () => {
        this.setState({apiUrl:"https://picsum.photos/400/400?grayscale"})
        this.setState({imgArray:[]})
        for(let i = 0; i < this.state.imgArray.length; i++){
            fetch(`https://picsum.photos/400/400?grayscale`)
            .then((response)=>{
                this.setState({imgArray:[...this.state.imgArray, response.url]})
            })
        }
    }

    normalHandler = () => {
        this.setState({apiUrl:"https://picsum.photos/400/400"})
        this.setState({imgArray:[]})
        for(let i = 0; i < this.state.imgArray.length; i++){
            fetch(`https://picsum.photos/400/400`)
            .then((response)=>{
                this.setState({imgArray:[...this.state.imgArray, response.url]})
            })
        }
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


    render(){
        return(
            <div>
                <Nav>
                <ButtonGrayscale onClick={this.grayscaleHandler}>grayscale</ButtonGrayscale >
                <ButtonNormal onClick={this.normalHandler}>normal</ButtonNormal>
                <BlurHeader>Select blur strength :</BlurHeader>
                <select>
                    <option value="0" disabled selected>0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
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