import React from 'react';
import { IndexedAccessType } from 'typescript';
import './App.css';


interface AppProps {

}
 
interface AppState {
  currentColor: string
  currentHex: string
  colors: Array<ColorsData>
  currentSaturation: string
  id: number
}

interface ColorsData {
  name: string,
  r: number,
  g: number,
  b: number,
  saturation: number,
  decNumber: number,
  id: number,
}
 
class App extends React.Component<AppProps, AppState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      currentColor: '',
      currentHex: '',
      currentSaturation: '',
      id: 0,
      colors: [
        {
          name: 'Red',
          r: 255,
          g: 0,
          b: 0,
          saturation: 0,
          decNumber: 16711680,
          id: 0,
        },
      ]
    }
  }
  

  handleSubmit = (e: any) => {
    e.preventDefault();
    if (this.state.currentColor.length>0 && this.state.currentHex.length === 6 && this.state.currentSaturation.length>0) {
      const {currentColor, currentHex, currentSaturation} = this.state
      const addColor = {
        name: currentColor, currentHex,
        r: parseInt(currentHex.slice(0, 2), 16),
        g: parseInt(currentHex.slice(2, 4), 16),
        b: parseInt(currentHex.slice(4, 6), 16),
        saturation: parseInt(currentSaturation),
        decNumber: parseInt(currentHex, 16),
        id: this.state.id + 1
      }
     
      this.setState({
        currentColor: '',
        currentHex: '',
        currentSaturation: '',
        id: addColor.id,
        colors: [...this.state.colors, addColor]
      },
      () => {
        localStorage.setItem("colors", JSON.stringify(this.state.colors))
      })

      
    }
    else (
      alert('error')
    )
  }

  componentDidMount() {
    const colors = localStorage.getItem("colors")
    if (colors) this.setState({ colors: JSON.parse(colors)})
  }


  handleRed = () => {
    const filteredR = this.state.colors.filter(color => color.r > 127)
    this.setState({
      colors: filteredR
    })
  }

  handleGreen = () => {
    const filteredG = this.state.colors.filter(color => color.g > 127)
    this.setState({
      colors: filteredG
    })
  }

  handleBlue = () => {
    const filteredB = this.state.colors.filter(color => color.b > 127)
    this.setState({
      colors: filteredB
    })
  }

  handleSaturation = () => {
    const filteredS = this.state.colors.filter(color => color.saturation > 50)
    this.setState({
      colors: filteredS
    })
  }

  handleClear = () => {
    this.setState({
      colors: JSON.parse(localStorage.colors)
    })
  }

  // deleteColor = (id: any) => {
  //   const colors = this.state.colors.filter(i => i.id !== id.id)
  //   this.setState({colors})
  // }
  
  render() { 
    return ( 
      <div>
        <h1>Sort By</h1>
        <button name="red" onClick={this.handleRed}>Red &#62; 50%</button> 
        <button name='green' onClick={this.handleGreen}>Green &#62; 50%</button> 
        <button name='blue' onClick={this.handleBlue}>Blue &#62; 50%</button> 
        <button name='saturation' onClick={this.handleSaturation}>Saturation &#62; 50%</button>
        <button name='clear' onClick={this.handleClear}>Clear</button>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <table >
            <tr>
              <th>ID</th>
              <th>Color</th>
              <th>RED</th>
              <th>GREEN</th>
              <th>BLUE</th>
              <th>Saturation %</th>
            </tr>
            <tbody>
            {this.state.colors.sort((a,b) => b.decNumber - a.decNumber).map((color, index) => (
              <tr>
                <td>{index+1}.</td>
                <td style={{backgroundColor: color.name}}>{color.name}</td>
                <td>{color.r}</td>
                <td>{color.g}</td>
                <td>{color.b}</td>
                <td>{color.saturation}</td>
                {/* <td><button onClick={this.deleteColor.bind(this, id)}></button></td> */}
              </tr>
            ))}
            </tbody>
          </table>
          <br />
          
          <input placeholder="Color name" pattern="[A-Za-z]{0,20}" type="text" value={this.state.currentColor} onChange={(e) => this.setState({currentColor: e.target.value})}/><br/>
          <input placeholder="Hex" pattern="[A-Fa-f0-9]{0,6}" type="text" value={this.state.currentHex} onChange={(e) => this.setState({currentHex: e.target.value})}/><br/>
          <input placeholder='Saturation' max="100" type="number" value={this.state.currentSaturation} onChange={(e) => this.setState({currentSaturation: e.target.value})}/><br/>
          <button type="submit">Submit</button>
          
        </form>
        
      </div>
     );
  }
}
 
export default App;

