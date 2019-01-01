document.body.style = `
    background: #018DED url(http://unsplash.it/1500/1000?image=881&blur=50);
    background-size: cover;
    font-family: 'helvetica neue';
    text-align: center;
    font-size: 10px;

    margin: 0;
    font-size: 2rem;
    display: flex;
    flex: 1;
    min-height: 100vh;
    align-items: center;
`
let wrapper = document.createElement("div")
wrapper.className = "clock"
wrapper.style = `
    width: 20rem;
    height: 20rem;
    border: 20px solid white;
    border-radius: 50%;
    margin: 50px auto;
    position: relative;
    padding: 2rem;
    box-shadow:
      0 0 0 4px rgba(0,0,0,0.1),
      inset 0 0 0 3px #EFEFEF,
      inset 0 0 10px black,
      0 0 10px rgba(0,0,0,0.2);
`
document.body.appendChild(wrapper)


class ClockElement extends HTMLElement {
    constructor () {
        super()
        let that = this

        this.clock_face = document.createElement("div")
        this.clock_face.className = "clock-face"

        this.hour = document.createElement("div")
        this.hour.className = `hand`
        this.hour.id = "hour-hand"
        this.clock_face.appendChild(this.hour)

        this.min = document.createElement("div")
        this.min.className = `hand`
        this.min.id = "min-hand"
        this.clock_face.appendChild(this.min)

        this.second = document.createElement("div")
        this.second.className = `hand`
        this.second.id ="second-hand"
        this.clock_face.appendChild(this.second)
        
        this.circul = document.createElement("div")
        this.circul.className = `circul`
        this.clock_face.appendChild(this.circul)

        this.three = document.createElement("div")
        this.three.className = `three`
        this.clock_face.appendChild(this.three)

        this.six = document.createElement("div")
        this.six.className = `six`
        this.clock_face.appendChild(this.six)

        this.nine = document.createElement("div")
        this.nine.className = `nine`
        this.clock_face.appendChild(this.nine)

        this.twelve = document.createElement("div")
        this.twelve.className = `twelve`
        this.clock_face.appendChild(this.twelve)


        this.shadow = this.attachShadow({mode: "open"})
        let style = document.createElement("style")
        style.textContent = `
            .clock-face {
                position: relative;
                width: 90%;
                height: 90%;
                transform: translateY(-3px); 
                margin: 5% auto;
            }
            .hand {
                width: 50%;
                background: black;
                position: absolute;
                top: 50%;
                transform-origin: 100%;
                transform: rotate(90deg);
                transition: all 0.05s;
            }
            
            #second-hand{
                border: 0.5px solid black;
                border-radius: 50%
            }
            #min-hand {
                border: 2px solid black;
                border-radius: 50%
            }
            #hour-hand {
                border: 3px solid blue;
                border-radius: 50%

            }
            .circul{
                top: 48%;
                left: 49%;
                position: absolute;
                
                background: black;
                border: 7px solid black;
                border-radius: 50%
            }
            .twelve {
              position: absolute;
              width: 3px;
              height: 15px;
              background: #fff;
              left: 0;
              top: -30px;
              right: 0;
              margin: 0 auto;
            }

            .three {
              position: absolute;
              width: 15px;
              height: 3px;
              background: #fff;
              top: 0;
              bottom: 0;
              right: -30px;
              margin: auto 0;
            }

            .six {
              position: absolute;
              width: 3px;
              height: 15px;
              background: #fff;
              left: 0;
              bottom: -30px;
              right: 0;
              margin: 0 auto;
            }

            .nine {
              position: absolute;
              width: 15px;
              height: 3px;
              background: #fff;
              top: 0;
              bottom: 0;
              left: -30px;
              margin: auto 0;
            }
            
        `

        this.shadow.appendChild ( style )
        this.shadow.appendChild ( this.clock_face )

        setInterval( function() {
				that.setDate();
			}, 1000 );

        this.setDate()
        
    }

    setDate() {

        this.secondHand = this.shadow.getElementById("second-hand")
        this.minsHand = this.shadow.getElementById('min-hand');
        this.hourHand = this.shadow.getElementById('hour-hand');

        this.now = new Date()
        
        this.seconds = this.now.getSeconds()
        this.secondsDegrees = ((this.seconds / 60) * 360) + 90
        this.secondsRule = `rotate(${this.secondsDegrees}deg)`
        this.secondHand.style.transform = `rotate(${this.secondsDegrees}deg)`     

        this.mins = this.now.getMinutes()
        this.minsDegrees = ((this.mins / 60) * 360) + ((this.seconds/60)*6) + 90
        this.minsRule = `rotate(${this.minsDegrees}deg)`
        this.minsHand.style.transform = `rotate(${this.minsDegrees}deg)`

        this.hours = this.now.getHours()
        this.hoursDegrees = ((this.hours / 12) * 360) + ((this.mins/60)*30) + 90
        this.hoursRule = `rotate(${this.hoursDegrees}deg)`
        this.hourHand.style.transform = `rotate(${this.hoursDegrees}deg)`
    }

}

customElements.define (
    "my-clock-element",
    ClockElement
)

let elem = document.createElement ("my-clock-element")
wrapper.appendChild(elem)




