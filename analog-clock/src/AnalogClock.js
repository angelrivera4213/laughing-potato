import React from 'react';

export default class AnalogClock extends React.PureComponent {
    constructor (props) {
        super(props);

        this.state = {
            mounted: false
        };
    }

    componentDidMount () {
        this.setState({
            mounted: true,
            now: new Date()
        });

        this._intervalID = setInterval(() => {
            this.setState({
                now: new Date()
            })
        }, 1000);
    }

    componentWillUnmount () {
        clearInterval(this._intervalID);
    }

    render () {
        const { now, mounted } = this.state;

        if (!mounted) {
            return null;
        }

        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        // console.table({
        //     hours,
        //     minutes,
        //     seconds
        // });
        const hourHandRads = ((2 * Math.PI * Math.max(hours - 12, 0)) / 12) + (((2 * Math.PI * minutes) /(12 * 60))) - (Math.PI / 2);
        console.log('hourHandRotation', hourHandRads);
        const hourStyle = {
            transform: `translateX(50%) rotate(${hourHandRads}rad)`
        };
        const minuteHandRads = ((2 * Math.PI * minutes) / 60) + ((2 * Math.PI * seconds) / (60 * 60)) - (Math.PI / 2) ;
        console.log('minuteHandRads', minuteHandRads);
        const minuteStyle = {
            transform: `translateX(50%) rotate(${minuteHandRads}rad)`
        };
        const secondHandRads = ((2 * Math.PI * seconds) / 60) - (Math.PI / 2);
        const secondStyle = {
            transform: `translateX(50%) translateY(-1px) rotate(${secondHandRads}rad)`
        };
        console.log('seconds', seconds);
        const numbers = [];
        for (let num = 0; num < 12; num++) {
            numbers.push(
                <div
                    className='clock-number'
                    style={{
                        transform: `translateY(-${150 * 0.90}px) rotate(${(2 * Math.PI * (num + 1)) / 12}rad)`,
                        transformOrigin: `50% calc(50% + ${150 * 0.90}px)`,
                        fontSize: '20px',
                        fontWeight: 'bold'
                    }}
                >
                    <div
                        style={{
                            transform: `rotate(-${(2 * Math.PI * (num + 1)) / 12}rad)`,
                        }}
                    >
                        <span>
                            {num + 1}
                        </span>
                    </div>
                </div>
            );
        }

        return (
            <div className='analog-clock-container'>
                <div
                    className='analog-clock'
                >
                    <div className='hour-hand' style={hourStyle}>
                        <div className='tick' />
                    </div>
                    <div className='minute-hand' style={minuteStyle}>
                        <div className='tick' />
                    </div>
                    <div className='seconds-hand' style={secondStyle} />
                    {numbers}
                </div>
            </div>
        );
    }
}
