import DragItem from './DragItem';
import DropPanel from './DropPanel';

class Drag {
  static Item: typeof DragItem;
  static Panel: typeof DropPanel;
}

Drag.Item = DragItem;
Drag.Panel = DropPanel;
export default Drag;
