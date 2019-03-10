import * as React from 'react';
import * as moment from 'moment';

interface BaseProps {
    format: string;
}

export type CurrentTimeProps = {} & BaseProps & React.HTMLAttributes<HTMLDivElement>

export interface CurrentTimeState {
    now: number;
}

class CurrentTime extends React.PureComponent<CurrentTimeProps, CurrentTimeState> {
    static defaultProps = {
        format: 'YYYY-MM-DD HH:mm:ss',
    }
    timer: number = 0;
    state = {
        now: Date.now(),
    }

    componentDidMount() {
        this.tick();
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    tick() {
        this.timer = window.setTimeout(() => {
            this.setState({now: Date.now()}, () => {
                this.tick();
            });
        }, 1000);
    }

    render() {
        const {now} = this.state;
        const {format} = this.props;
        return (
            <div className="title">{moment(now).format(format)}</div>
        )
    }
}

export default CurrentTime;
