```typescript jsx
import {Dialog, Button} from 'react-iaux';

const Test = ()=>{
    return (
        <div>
            <Dialog visible={this.state.show}>
                <div>一个也不能少</div>
            </Dialog>
            <Button onClick={()=>{this.setState({show:true})}}>SHOW</Button>
        </div>
    )
}
```
